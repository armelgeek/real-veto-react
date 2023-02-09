import { SET_VERSION_INFO } from '../../constants/actions'
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
  }, action) {
    const { type, payload } = action
    switch (type) {
      case SET_VERSION_INFO:
        return {
        ...state,
        ...payload
      }
      default:
        return state
    }
  }
  