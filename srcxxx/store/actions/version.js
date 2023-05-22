import {
  SET_VERSION_INFO,
  SET_IGNORE_VERSION
} from "../../constants/actions";
import {getVersionInfo,compareVer} from '../../utils/version';
import {VERSION_STATUS} from '../../constants/version';
import {version as versionDefault} from '../../constants/version'

export const setVersionInfo = versionInfo => {
  return {
    type: SET_VERSION_INFO,
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
     : compareVer(versionDefault, versionInfo.version) < 0
       ? VERSION_STATUS.available
       : VERSION_STATUS.latest

  const { version } = getState()

  if (version.ignoreVersion != versionInfo.version && versionInfo.status == VERSION_STATUS.available) {
    //versionInfo.showModal = true
    dispatch(setVersionInfo(versionInfo))
   //toggleModal({title: 'My title'})
  } else {
    //versionInfo.showModal = false
    dispatch(setVersionInfo(versionInfo))
  }
  // console.log(compareVer(process.versions.app, versionInfo.version))
  // console.log(process.versions.app, versionInfo.version)
}
export const setIgnoreVersion = version => async(dispatch, getState) => {
  dispatch({
    type: SET_IGNORE_VERSION,
    payload: version,
  })
  localStorage.setItem("vetoo_version_ignore",version);
}