import { app, BrowserWindow } from "electron";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV === "development"

function createWindow() {
  const windowOption = {
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    }
  }
  const window = new BrowserWindow({...windowOption})

  if(isDev) window.loadURL('http://localhost:3000')
  else window.loadFile(path.join(__dirname, "../out/index.html"))

}

app.whenReady().then(createWindow).catch((err) => console.log("qualcosa è andato storto", err))
app.on('window-all-closed', () => {
  if(process.platform !== "darwin") app.quit()
})