import { app, BrowserWindow } from "electron";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Forza production se non sei in dev
const isDev = process.env.NODE_ENV === "development" && !app.isPackaged;
const PORT = 3001;

let mainWindow;
let server;

async function createWindow() {
  try {
    console.log(`👉 Avvio Next.js in modalità ${isDev ? "development" : "production"}...`);

    // Importa Next.js dinamicamente
    const next = (await import("next")).default;
    
    // Calcola la directory corretta
    let appDir;
    if (isDev) {
      appDir = path.join(__dirname, "..");
    } else {
      // In produzione, la struttura è:
      // TestNextElectron.app/Contents/Resources/app/
      appDir = path.join(__dirname, "..");
    }

    console.log("📁 App directory:", appDir);
    console.log("📦 Is packaged:", app.isPackaged);
    console.log("🔧 Is dev:", isDev);

    const nextApp = next({
      dev: isDev,
      dir: appDir,
    });

    const handle = nextApp.getRequestHandler();
    await nextApp.prepare();
    console.log("✅ Next.js pronto");

    server = http.createServer((req, res) => handle(req, res));
    await new Promise((resolve, reject) => {
      server.listen(PORT, (err) => {
        if (err) reject(err);
        console.log(`🚀 Next.js server su http://localhost:${PORT}`);
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

    await mainWindow.loadURL(`http://localhost:${PORT}`);

    if (isDev) {
      mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
      mainWindow = null;
    });

  } catch (err) {
    console.error("❌ Errore durante l'inizializzazione:", err);
    app.quit();
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (server) {
    server.close();
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("before-quit", () => {
  if (server) {
    server.close();
  }
});