import {
  SET_VERSION_INFO
} from "../../constants/actions";
import {getVersionInfo} from '../../utils/version';
export const setVersionInfo = versionInfo => {
  return {
    type: "SET_VERSION_INFO",
    payload: versionInfo,
  }
}
export const checkVersion = () => async(dispatch, getState) => {
  let versionInfo
  try {
    const { version, desc, history } = await getVersionInfo()
    versionInfo = {
      version,
      desc,
      history,
    }
  } catch (err) {
    versionInfo = {
      version: '0.0.0',
      desc: null,
      history: [],
    }
  }
  versionInfo.status =
   versionInfo.version == '0.0.0'
     ? VERSION_STATUS.unknown
     : compareVer(process.versions.app, versionInfo.version) < 0
       ? VERSION_STATUS.available
       : VERSION_STATUS.latest

  const { version } = getState()

  if (version.ignoreVersion != versionInfo.version && versionInfo.status == VERSION_STATUS.available) {
    versionInfo.showModal = true
    dispatch(setVersionInfo(versionInfo))
   // showVersionModal()
  } else {
    versionInfo.showModal = false
    dispatch(setVersionInfo(versionInfo))
  }
  // console.log(compareVer(process.versions.app, versionInfo.version))
  // console.log(process.versions.app, versionInfo.version)
}
