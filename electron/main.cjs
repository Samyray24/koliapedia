const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1240,
    height: 820,
    minWidth: 960,
    minHeight: 640,
    title: 'Коляпедия — Официальное приложение про Колю',
    backgroundColor: '#0b0f19',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const distPath = path.join(__dirname, '../dist/index.html');

  // If built dist exists, load local file, otherwise load local dev server
  if (fs.existsSync(distPath)) {
    win.loadFile(distPath);
  } else {
    win.loadURL('http://localhost:5173');
  }

  // Handle window close
  win.on('closed', () => {
    // dereference
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
