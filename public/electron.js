const { app, BrowserWindow, screen: electronScreen } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
require('./server/index.js');
/**const Service = require('./service.js');
const scriptsFolder = path.join(path.dirname(__filename));
const scriptPath = path.join(scriptsFolder, 'server/index.js');
**/
//module.exports.uninstall = service.uninstall.bind(service);
const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: electronScreen.getPrimaryDisplay().workArea.width,
    height: electronScreen.getPrimaryDisplay().workArea.height,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      devTools: isDev
    }
  });

/**const service = new Service({
  name: 'veto-service',
  description: 'Local veto server',
  script: scriptPath,
  runAsAgent: true,
  runAsUser: true,
});

service.on('install', () => {
  service.start();
  console.log(`${scriptPath} started.`);
});
service.on('alreadyinstalled', () => {
  console.log(`${scriptPath} already installed.`);
});
service.on('invalidinstallation', () => {
  console.log(`${scriptPath} is invalid.`);
});
service.on('uninstall', () => {

  console.log(`${scriptPath} is uninstalled.`);
});
service.on('error', (e) => {
  console.log(e);
  console.log(`${scriptPath} errors.`);
});
service.on('uninstall', () => {
  console.log('Uninstall complete.');
  console.log('The service exists: ', typeof service.exists === 'function' ? service.exists() : service.exists);
});
service.install();**/
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;
  mainWindow.loadURL(startURL);
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    mainWindow.loadURL(url);
  });
};
app.whenReady().then(() => {
  createMainWindow();
  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
