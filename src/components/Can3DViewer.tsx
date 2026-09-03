import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { RotateCw, Volume2, Sparkles, X, Flame, RotateCcw } from 'lucide-react';

interface Can3DViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Can3DViewer: React.FC<Can3DViewerProps> = ({ isOpen, onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [openCount, setOpenCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('koliapedia_cans_opened')) || 0;
    } catch {
      return 0;
    }
  });
  const [sipMessage, setSipMessage] = useState(false);

  // References for 3D objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const tabGroupRef = useRef<THREE.Group | null>(null);
  const holeMeshRef = useRef<THREE.Mesh | null>(null);
  const canGroupRef = useRef<THREE.Group | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  const particleVelocitiesRef = useRef<THREE.Vector3[]>([]);
  const isEruptingRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);

  // Mouse drag interaction
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0.005 });

  // Generate procedural Coca-Cola can texture
  const createCanTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // 1. Red metallic gradient background
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#be123c');
      grad.addColorStop(0.2, '#f43f5e');
      grad.addColorStop(0.4, '#e11d48');
      grad.addColorStop(0.6, '#be123c');
      grad.addColorStop(0.8, '#9f1239');
      grad.addColorStop(1, '#be123c');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. White curved dynamic wave ribbon
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.beginPath();
      ctx.moveTo(0, 360);
      ctx.bezierCurveTo(250, 420, 500, 270, 750, 330);
      ctx.bezierCurveTo(880, 360, 960, 380, 1024, 340);
      ctx.lineTo(1024, 400);
      ctx.bezierCurveTo(750, 420, 500, 340, 250, 470);
      ctx.lineTo(0, 420);
      ctx.closePath();
      ctx.fill();

      // Silver top & bottom strips
      ctx.fillStyle = 'rgba(226, 232, 240, 0.85)';
      ctx.fillRect(0, 20, canvas.width, 10);
      ctx.fillRect(0, canvas.height - 35, canvas.width, 8);

      // Top text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ORIGINAL KOLYA TASTE  •  СВЕЖЕСТЬ НИКОЛАЯ  •  ORIGINAL KOLYA TASTE', canvas.width / 2, 45);

      // Main Brand Logo: "Кока-Коля" in authentic cursive
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2 - 10);
      ctx.rotate(-0.12);

      // Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 4;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic bold 110px "Brush Script MT", "Segoe Script", cursive, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Кока-Коля', 0, 0);

      ctx.shadowColor = 'transparent';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillStyle = '#fef08a';
      ctx.fillText('100% НАТУРАЛЬНЫЙ НИКОЛАЙ', 0, 75);
      ctx.restore();

      // Nutrition & facts
      ctx.font = '14px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.textAlign = 'center';
      ctx.fillText('0% САХАРА  |  100% ХАРИЗМА  |  0.5L  |  ГОСТ 2026', canvas.width / 2, canvas.height - 15);

      // Condensation water droplets
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      for (let i = 0; i < 70; i++) {
        const dx = Math.random() * canvas.width;
        const dy = Math.random() * canvas.height;
        const r = Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.arc(dx, dy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  };

  // Setup Three.js scene
  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    const width = mountRef.current.clientWidth || 460;
    const height = 440;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    mountRef.current.replaceChildren(renderer.domElement);

    // 3. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.9); // cool rim light
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffedd5, 1.2, 10);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    // 4. Can Container Group
    const canGroup = new THREE.Group();
    canGroupRef.current = canGroup;
    scene.add(canGroup);

    // Aluminum Materials
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      metalness: 0.9,
      roughness: 0.22,
    });

    // Body Material with Canvas Texture
    const texture = createCanTexture();
    const bodyMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.55,
      roughness: 0.28,
    });

    // Geometry parts:
    // A. Main Cylindrical Can Body
    const bodyGeom = new THREE.CylinderGeometry(1.05, 1.05, 2.6, 64, 1, true);
    const bodyMesh = new THREE.Mesh(bodyGeom, bodyMaterial);
    canGroup.add(bodyMesh);

    // B. Top Neck Taper (Сужение к крышке)
    const neckGeom = new THREE.CylinderGeometry(0.9, 1.05, 0.3, 64);
    const neckMesh = new THREE.Mesh(neckGeom, aluminumMaterial);
    neckMesh.position.y = 1.3 + 0.15;
    canGroup.add(neckMesh);

    // C. Top Metallic Rim
    const rimGeom = new THREE.TorusGeometry(0.91, 0.05, 16, 64);
    rimGeom.rotateX(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeom, aluminumMaterial);
    rimMesh.position.y = 1.6;
    canGroup.add(rimMesh);

    // D. Top Flat Lid (Крышка банки)
    const lidGeom = new THREE.CylinderGeometry(0.9, 0.9, 0.04, 64);
    const lidMesh = new THREE.Mesh(lidGeom, aluminumMaterial);
    lidMesh.position.y = 1.58;
    canGroup.add(lidMesh);

    // E. Punch Hole (Овальное отверстие)
    const holeGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.05, 32);
    holeGeom.scale(1, 1, 1.5);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x090d16 });
    const holeMesh = new THREE.Mesh(holeGeom, holeMat);
    holeMesh.position.set(0, 1.605, 0.38);
    holeMesh.visible = false; // appears when opened
    holeMeshRef.current = holeMesh;
    canGroup.add(holeMesh);

    // F. Bottom Bevel & Base
    const baseBevelGeom = new THREE.CylinderGeometry(1.05, 0.85, 0.25, 64);
    const baseBevelMesh = new THREE.Mesh(baseBevelGeom, aluminumMaterial);
    baseBevelMesh.position.y = -1.3 - 0.125;
    canGroup.add(baseBevelMesh);

    // G. 3D Pull Tab (Кольцо-ключ)
    const tabGroup = new THREE.Group();
    tabGroup.position.set(0, 1.61, 0.05); // pivot at center rivet
    tabGroupRef.current = tabGroup;

    // Rivet
    const rivetGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
    const rivetMesh = new THREE.Mesh(rivetGeom, aluminumMaterial);
    tabGroup.add(rivetMesh);

    // Tab lever blade
    const bladeGeom = new THREE.BoxGeometry(0.28, 0.02, 0.55);
    const bladeMesh = new THREE.Mesh(bladeGeom, aluminumMaterial);
    bladeMesh.position.set(0, 0.01, 0.22);
    tabGroup.add(bladeMesh);

    // Pull ring hole (Колечко для пальца)
    const ringGeom = new THREE.TorusGeometry(0.18, 0.04, 12, 32);
    ringGeom.rotateX(Math.PI / 2);
    const ringMesh = new THREE.Mesh(ringGeom, aluminumMaterial);
    ringMesh.position.set(0, 0.02, -0.22);
    tabGroup.add(ringMesh);

    canGroup.add(tabGroup);

    // H. 3D Soda Fizz Particle Eruption System
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = 0;
      particlePositions[i * 3 + 1] = 1.6;
      particlePositions[i * 3 + 2] = 0.38;
      particleVelocities.push(new THREE.Vector3(0, 0, 0));
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.09,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    particlesMeshRef.current = particles;
    particleVelocitiesRef.current = particleVelocities;
    canGroup.add(particles);

    // Set initial gentle tilt
    canGroup.rotation.x = 0.25;
    canGroup.rotation.y = -0.3;

    // 5. Animation Loop
    let running = true;
    const animate = () => {
      if (!running) return;

      // Handle inertia / auto-spin when not dragging
      if (!isDraggingRef.current && canGroupRef.current) {
        canGroupRef.current.rotation.y += rotationVelocityRef.current.y;
        canGroupRef.current.rotation.x += rotationVelocityRef.current.x;

        // Dampen manual drag velocity gradually
        rotationVelocityRef.current.x *= 0.94;
        rotationVelocityRef.current.y = rotationVelocityRef.current.y * 0.95 + 0.003 * 0.05;

        // Limit tilt angle
        canGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.7, canGroupRef.current.rotation.x));
      }

      // Animate 3D soda eruption particles
      if (isEruptingRef.current && particlesMeshRef.current) {
        const positions = particlesMeshRef.current.geometry.attributes.position.array as Float32Array;
        let anyAlive = false;

        for (let i = 0; i < particleCount; i++) {
          const v = particleVelocitiesRef.current[i];
          if (v.lengthSq() > 0.0001) {
            positions[i * 3] += v.x;
            positions[i * 3 + 1] += v.y;
            positions[i * 3 + 2] += v.z;

            // Gravity
            v.y -= 0.008;

            if (positions[i * 3 + 1] > -1) {
              anyAlive = true;
            }
          }
        }
        particlesMeshRef.current.geometry.attributes.position.needsUpdate = true;

        if (!anyAlive) {
          isEruptingRef.current = false;
          (particlesMeshRef.current.material as THREE.PointsMaterial).opacity = 0;
        }
      }

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // 6. Cleanup
    return () => {
      running = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      bodyGeom.dispose();
      neckGeom.dispose();
      rimGeom.dispose();
      lidGeom.dispose();
      holeGeom.dispose();
      baseBevelGeom.dispose();
      bladeGeom.dispose();
      ringGeom.dispose();
      particleGeom.dispose();
      texture.dispose();
    };
  }, [isOpen]);

  // Open 3D Can Handler
  const handleOpen3DCan = useCallback(() => {
    if (isOpened) return;

    // 1. Web Audio API realistic procedure sound
    sounds.playCanOpen();

    // 2. Animate 3D pull tab rotation
    if (tabGroupRef.current) {
      const tab = tabGroupRef.current;
      let step = 0;
      const openInterval = setInterval(() => {
        step++;
        tab.rotation.x = -Math.min(1.2, step * 0.15); // tilt pull tab back 70 degrees
        tab.position.y = 1.61 + step * 0.012;
        if (step >= 8) {
          clearInterval(openInterval);
        }
      }, 20);
    }

    // 3. Show punched drink hole
    if (holeMeshRef.current) {
      holeMeshRef.current.visible = true;
    }

    // 4. Trigger 3D Particle Eruption
    if (particlesMeshRef.current) {
      const positions = particlesMeshRef.current.geometry.attributes.position.array as Float32Array;
      (particlesMeshRef.current.material as THREE.PointsMaterial).opacity = 0.9;
      isEruptingRef.current = true;

      for (let i = 0; i < 180; i++) {
        // Reset to hole position
        positions[i * 3] = (Math.random() - 0.5) * 0.15;
        positions[i * 3 + 1] = 1.61;
        positions[i * 3 + 2] = 0.38 + (Math.random() - 0.5) * 0.15;

        // Violent upward trajectory
        particleVelocitiesRef.current[i] = new THREE.Vector3(
          (Math.random() - 0.5) * 0.09,
          Math.random() * 0.18 + 0.12,
          (Math.random() - 0.5) * 0.09
        );
      }
      particlesMeshRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 5. Confetti blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#ffffff', '#fbbf24', '#f43f5e'],
    });

    setIsOpened(true);

    // 6. Update persist count
    const next = openCount + 1;
    setOpenCount(next);
    try {
      localStorage.setItem('koliapedia_cans_opened', String(next));
    } catch {
      // ignore
    }
  }, [isOpened, openCount]);

  // Mouse Drag / Touch controls for 360 rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !canGroupRef.current) return;
    const deltaX = e.clientX - prevMousePosRef.current.x;
    const deltaY = e.clientY - prevMousePosRef.current.y;

    canGroupRef.current.rotation.y += deltaX * 0.012;
    canGroupRef.current.rotation.x += deltaY * 0.012;

    rotationVelocityRef.current = {
      x: deltaY * 0.003,
      y: deltaX * 0.003,
    };

    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Reset Can
  const handleReset = () => {
    sounds.playPop();
    setIsOpened(false);
    setSipMessage(false);
    if (tabGroupRef.current) {
      tabGroupRef.current.rotation.x = 0;
      tabGroupRef.current.position.y = 1.61;
    }
    if (holeMeshRef.current) {
      holeMeshRef.current.visible = false;
    }
  };

  const handleSip = () => {
    sounds.playFanfare();
    setSipMessage(true);
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.5 } });
    setTimeout(() => setSipMessage(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-700/80 rounded-3xl p-6 shadow-2xl overflow-hidden text-center">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-600/25 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/70 hover:bg-slate-800 transition-colors z-30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="relative z-10 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-1.5 border border-rose-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Настоящий 3D WebGL
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Интерактивная 3D-баночка <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Кока-Коли</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Вращайте мышкой на 360° и нажмите для открытия с хрустом и пшиком!</span>
          </p>
        </div>

        {/* 3D WebGL Canvas Container */}
        <div
          ref={mountRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleOpen3DCan}
          className="relative w-full h-[370px] cursor-grab active:cursor-grabbing flex items-center justify-center rounded-2xl overflow-hidden bg-slate-950/40 border border-slate-800/60 my-3 shadow-inner"
        >
          {/* Subtle Hint Badge */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 text-[10px] font-medium text-slate-400 pointer-events-none z-10">
            {isOpened ? '✨ Открыто! Можно вращать и делать глоток' : '🖱️ Тяните мышкой для вращения • Кликните для открытия'}
          </div>
        </div>

        {/* Interactive Action Controls */}
        <div className="space-y-3 relative z-10">
          {!isOpened ? (
            <button
              onClick={handleOpen3DCan}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-sm tracking-wide shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Volume2 className="w-5 h-5 animate-bounce" />
              <span>ОТКРЫТЬ 3D БАНОЧКУ СО ЗВУКОМ!</span>
            </button>
          ) : (
            <div className="space-y-3 animate-scaleUp">
              <div className="p-3 rounded-2xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center justify-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>
                  {sipMessage
                    ? 'Глоток сделан! Уровень харизмы Николая: 1000%! 🥤✨'
                    : 'Кока-Коля открыта! Наслаждайтесь ледяной свежестью!'}
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleSip}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-black text-xs shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
                >
                  СДЕЛАТЬ ГЛОТОК 🥤
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Новая баночка
                </button>
              </div>
            </div>
          )}

          {/* Stats footer */}
          <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-3 pt-1">
            <span>🥤 Открыто баночек: <strong className="text-amber-400">{openCount}</strong></span>
            <span>•</span>
            <span className="text-slate-400">WebGL 60 FPS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
