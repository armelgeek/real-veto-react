import { SET_VERSION_INFO,SET_IGNORE_VERSION } from '../../constants/actions'
import { VERSION_STATUS } from '../../constants/version'
export default function (state = {
    status: VERSION_STATUS.checking,
    downloadProgress: {
      total: 0,
      current: 0,
    },
    showModal: false,
    version: null,
    desc: '',
    history: [],
    ignoreVersion: null
  }, action) {
    const { type, payload } = action
    switch (type) {
      case SET_VERSION_INFO:
        return {
          ...state,
          ...payload
        }
      break;
      case SET_IGNORE_VERSION: 
        return {
          ...state,
          ignoreVersion: payload
        }
      break;
      default:
        return state
    }
  }
  