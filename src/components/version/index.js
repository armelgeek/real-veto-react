import React, { useMemo, memo, useState, useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { VERSION_STATUS,version } from '../../constants/version'
import {setVersionInfo} from '../../store/actions/version';
import Modal, {
  reducer as modal,
  actions as ModalActions,
} from "react-redux-modal-flex";
const { toggleModal, modifyOkModal } = ModalActions;
const currentVer = version
export default memo(() => {
  const versionInfo = useSelector(state => state.version);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('')
  const handleOpenVersionModal = () => {
    dispatch(setVersionInfo({
      showModal: true
    }))
  }

  useEffect(() => {
    switch (versionInfo.status) {
      case VERSION_STATUS.available:
        setTitle("🌟 New version found 🌟")
        // setTip(t('version_btn_new'))
        break
      case VERSION_STATUS.downloading:
        setTitle("🌟 New version found 🌟")
        break
      case VERSION_STATUS.downloaded:
        setTitle("version_title_update")
        break
      case VERSION_STATUS.checking:
        setTitle("⏳ Checking for updates ⏳")
        break
      case VERSION_STATUS.failed:
        setTitle("❌ Download failed ❌")
        break
      case VERSION_STATUS.unknown:
        setTitle("❓ Failed to get the latest version information ❓")
        break
      case VERSION_STATUS.latest:
      default:
        setTitle("The software is up to date, please enjoy it~🥂")
        break
    }
  }, [versionInfo])

  return (
    <div className="pr-2">
       
        {versionInfo.status == VERSION_STATUS.available ? (
        <div>
          <button className="btn btn-primary btn-sm" onClick={handleOpenVersionModal}>🌟 Nouvelle version trouvée 🌟 🚀</button>
        </div>
        ):(
          <div>
            <h3 className="text-white">Version actuelle:  {currentVer}</h3>
          </div>
        )}
         
    </div>
  )
})