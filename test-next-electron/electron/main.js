import { app, BrowserWindow } from "electron";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import next from "next";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV !== "production";
const PORT = 3001; // Usa 3001 come nello script dev:electron

let mainWindow;

async function createWindow() {
  try {
    console.log(`👉 Avvio Next.js in modalità ${isDev ? "development" : "production"}...`);

    const nextApp = next({
      dev: isDev,
      dir: path.join(__dirname, ".."),
    });

    const handle = nextApp.getRequestHandler();
    await nextApp.prepare();
    console.log("✅ Next.js pronto");

    const server = http.createServer((req, res) => handle(req, res));
    await new Promise((resolve, reject) => {
      server.listen(PORT, (err) => {
        if (err) reject(err);
        console.log(`🚀 Next.js server in ascolto su http://localhost:${PORT}`);
        resolve();
      });
    });

    mainWindow = new BrowserWindow({
      width: 1280,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    const startUrl = `http://localhost:${PORT}`;
    console.log("🌐 Carico URL:", startUrl);
    await mainWindow.loadURL(startUrl);

    if (isDev) {
      mainWindow.webContents.openDevTools();
    }

  } catch (err) {
    console.error("❌ Errore durante l'inizializzazione:", err);
    app.quit();
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});