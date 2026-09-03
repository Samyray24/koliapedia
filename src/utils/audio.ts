// Web Audio API sound generator for meme sounds without external dependencies

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.soundEnabled) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  // Пшик газировки (Кока-Коля)
  public playFizz() {
    const ctx = this.getContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(8000, ctx.currentTime + 0.3);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.38);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
  }

  // Реалистичное открывание жестяной баночки (щелчок ключа + мощный пшик газа + шипение)
  public playCanOpen() {
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    // 1. Металлический щелчок ключа (Crack / Snap)
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'sawtooth';
    snapOsc.frequency.setValueAtTime(1400, t);
    snapOsc.frequency.exponentialRampToValueAtTime(180, t + 0.06);

    snapGain.gain.setValueAtTime(0.4, t);
    snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);
    snapOsc.start(t);
    snapOsc.stop(t + 0.08);

    // 2. Мощный выход газа под давлением (Pshhh)
    const noiseDuration = 0.9;
    const bufferSize = Math.floor(ctx.sampleRate * noiseDuration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const gasNoise = ctx.createBufferSource();
    gasNoise.buffer = buffer;

    const gasFilter = ctx.createBiquadFilter();
    gasFilter.type = 'bandpass';
    gasFilter.Q.setValueAtTime(3.5, t);
    gasFilter.frequency.setValueAtTime(4500, t);
    gasFilter.frequency.exponentialRampToValueAtTime(1600, t + 0.5);

    const gasGain = ctx.createGain();
    gasGain.gain.setValueAtTime(0.001, t);
    gasGain.gain.linearRampToValueAtTime(0.48, t + 0.02); // резкий взрывной фронт
    gasGain.gain.exponentialRampToValueAtTime(0.12, t + 0.3);
    gasGain.gain.exponentialRampToValueAtTime(0.001, t + noiseDuration);

    gasNoise.connect(gasFilter);
    gasFilter.connect(gasGain);
    gasGain.connect(ctx.destination);

    gasNoise.start(t + 0.01);

    // 3. Последующее шипение вырывающихся пузырьков (Bubbles Fizz)
    const fizzNoise = ctx.createBufferSource();
    fizzNoise.buffer = buffer;

    const fizzFilter = ctx.createBiquadFilter();
    fizzFilter.type = 'highpass';
    fizzFilter.frequency.setValueAtTime(5500, t);

    const fizzGain = ctx.createGain();
    fizzGain.gain.setValueAtTime(0.001, t + 0.1);
    fizzGain.gain.linearRampToValueAtTime(0.2, t + 0.25);
    fizzGain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

    fizzNoise.connect(fizzFilter);
    fizzFilter.connect(fizzGain);
    fizzGain.connect(ctx.destination);

    fizzNoise.start(t + 0.1);
  }

  // Звук клика / Pop
  public playPop() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  }

  // Звук Большого Адронного Коляйдера (Sci-Fi Whoosh / Charge)
  public playCollider() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.82);
  }

  // Победные фанфары Коли
  public playFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      const startTime = ctx.currentTime + idx * 0.1;
      const duration = idx === notes.length - 1 ? 0.6 : 0.2;

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    });
  }

  // Мультяшный прыжок / Боинг
  public playBoing() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.15);
    osc.frequency.linearRampToValueAtTime(250, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }

  // Меланхоличный звук (Мелан-Коля)
  public playMelancholy() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [440, 392, 349.23, 329.63]; // A4, G4, F4, E4
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.2);

      const startTime = ctx.currentTime + idx * 0.2;
      const duration = 0.5;

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    });
  }

  // Сканирование Коляриметра (Bleeps)
  public playScan() {
    const ctx = this.getContext();
    if (!ctx) return;

    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + i * 150, ctx.currentTime + i * 0.08);

      const startTime = ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.07);
    }
  }
}

export const sounds = new SoundEngine();
