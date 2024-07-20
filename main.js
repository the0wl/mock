// main.js
import { app, BrowserWindow } from "electron";
import { spawn } from "child_process";

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("./ui/index.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // Inicia o servidor Express
  serverProcess = spawn("node", ["--env-file=.env", "./ui-api/server.js"], { stdio: "inherit" });

  serverProcess.on("error", (err) => {
    console.error(`Erro ao iniciar o servidor: ${err}`);
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  // Finaliza o processo do servidor Express ao fechar todas as janelas do Electron
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});
