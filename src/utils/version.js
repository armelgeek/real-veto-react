import axios from 'axios';
import {VERSION_STATUS} from '../constants/version'
export const compareVer = (currentVer, targetVer) => {
  console.log('currentVersion',currentVer,'targetVer',targetVer);
  // treat non-numerical characters as lower version
  // replacing them with a negative number based on charcode of each character
  const fix = s => `.${s.toLowerCase().charCodeAt(0) - 2147483647}.`

  currentVer = ('' + currentVer).replace(/[^0-9.]/g, fix).split('.')
  targetVer = ('' + targetVer).replace(/[^0-9.]/g, fix).split('.')
  const c = Math.max(currentVer.length, targetVer.length)
  for (let i = 0; i < c; i++) {
    // convert to integer the most efficient way
    currentVer[i] = ~~currentVer[i]
    targetVer[i] = ~~targetVer[i]
    if (currentVer[i] > targetVer[i]) return 1
    else if (currentVer[i] < targetVer[i]) return -1
  }
  return 0
}
const sizeFormate = size => {
  // https://gist.github.com/thomseddon/3511330
  if (!size) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const number = Math.floor(Math.log(size) / Math.log(1024))
  return `${(size / Math.pow(1024, Math.floor(number))).toFixed(2)} ${units[number]}`
}

const temporaryDirectoryPath = () =>{
  
}

const stopDownload = () =>{
  
}
const downloadFile = () =>{
  
}
const installExe = () =>{

}

export const getVersionInfo = (retryNum = 0) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://raw.githubusercontent.com/armelgeek/real-veto-react/master/publish/version.json`)
    .then((v)=> {
      resolve(v.data)
    }).catch(err => reject(err));
  })
}

export const downloadNewVersion = async(version, onDownload = noop) => {
  const url = `https://raw.githubusercontent.com/armelgeek/real-veto-react/master/releases/download/lgbva-v${version}.exe`
  /**let savePath = temporaryDirectoryPath + '/lx-music-mobile.apk'

  if (downloadJobId) await stopDownload(downloadJobId)

  const { jobId, promise } = downloadFile(url, savePath, {
    progressInterval: 500,
    connectionTimeout: 20000,
    readTimeout: 30000,
    begin({ statusCode, contentLength }) {
      onDownload(contentLength, 0)
      // switch (statusCode) {
      //   case 200:
      //   case 206:
      //     break
      //   default:
      //     onDownload(null, contentLength, 0)
      //     break
      // }
    },
    progress({ contentLength, bytesWritten }) {
      onDownload(contentLength, bytesWritten)
    },
  })
  downloadJobId = jobId
  return promise.then(() => {
    apkSavePath = savePath
    return updateApp()
  })**/
}

export const updateApp = async() => {
  if (!apkSavePath) throw new Error('apk Save Path is null')
  await installExe(apkSavePath, 'APP_PROVIDER_NAME')
}
