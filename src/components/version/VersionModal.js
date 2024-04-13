import React,{useState,useEffect,useMemo} from 'react'
import { Modal, Button } from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux';
import useDownloader from 'react-use-downloader';
import {setVersionInfo,setIgnoreVersion} from '../../store/actions/version';
import {VERSION_STATUS,version as currentVer} from '../../constants/version';
import {compareVer} from '../../utils/version';
const VersionItem = ({ version, desc }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <h4>v{version}</h4>
      <p>{desc}</p>
    </div>
  )
}
function VersionModal() {
  const versionInfo = useSelector(state => state.version);
  const dispatch = useDispatch();
  const initModal = () => {
    dispatch(setVersionInfo({
      showModal: false
    }))
  }
  const [ignoreBtn, setIgnoreBtn] = useState({ text: "Ignore", show: true, disabled: false })
  const [closeBtnText, setCloseBtnText] = useState("Close")
  const [confirmBtn, setConfirmBtn] = useState({ text: "Confirmer", show: true, disabled: false })
  const [title, setTitle] = useState('')
  const [downloadModal, setDownloadModal] = useState(false);
  const [tip, setTip] = useState('')
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();

  const history = useMemo(() => {
    if (!versionInfo.history) return []
    let arr = []
    for (const ver of versionInfo.history) {
      if (compareVer(currentVer, ver.version) < 0) arr.push(ver)
    }
    return arr
  }, [versionInfo])

  const handleCancel = () => {
    dispatch(setVersionInfo({ showModal: false }))
  }

  const handleIgnore = () => {
 //   dispatch(setIgnoreVersion(versionInfo.version))
    handleCancel()
  }

  const handleDownload = async () => {
    dispatch(setVersionInfo({
      status: VERSION_STATUS.downloading,
      downloadProgress: {
        total: 0,
        current: 0,
      },
    }))
    const url = "https://upload.wikimedia.org/wikipedia/commons/4/4d/%D0%93%D0%BE%D0%B2%D0%B5%D1%80%D0%BB%D0%B0_%D1%96_%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D1%81_%D0%B2_%D0%BF%D1%80%D0%BE%D0%BC%D1%96%D0%BD%D1%8F%D1%85_%D0%B2%D1%80%D0%B0%D0%BD%D1%96%D1%88%D0%BD%D1%8C%D0%BE%D0%B3%D0%BE_%D1%81%D0%BE%D0%BD%D1%86%D1%8F.jpg";
    //const url = `https://raw.githubusercontent.com/armelgeek/real-veto-react/master/releases/download/lgbva-v${versionInfo.version}.exe`;
    download(url, `lgbva-v${versionInfo.version}.exe`)
  }
  const handleConfirm = () => {
    switch (versionInfo.status) {
      case VERSION_STATUS.available:
        handleDownload()
        break
      case VERSION_STATUS.downloaded:
         handleCancel();
        break
      case VERSION_STATUS.failed:
        handleDownload()
        break

      case VERSION_STATUS.unknown:
      default:
       // openUrl('https://github.com/lyswhut/lx-music-mobile#readme')
        break
    }
    // setVersionInfo({ showModal: false })
    // Navigation.dismissOverlay(componentId)
  }

   useEffect(() => {
    switch (versionInfo.status) {
      case VERSION_STATUS.available:
        setTitle("🌟 Nouvelle version trouvée 🌟")
        setTip('')
        setIgnoreBtn({ text: "Ignorer", show: true, disabled: false })
        setConfirmBtn({ text: "Mettre à jour", show: true, disabled: false })
        // setTip("Update")
        setCloseBtnText("Fermer")
        break
      case VERSION_STATUS.downloading:
        setTitle("🌟 Nouvelle version trouvée 🌟")
        setTip(`Telechargement en cours ...`)
        if (ignoreBtn.show) setIgnoreBtn({ text: "Ignorer", show: false, disabled: true })
        if (!confirmBtn.disabled) setConfirmBtn({ text: "Installer", show: true, disabled: true })
        setCloseBtnText("Background download")
        break
      case VERSION_STATUS.downloaded:
        setTitle("🚀 Program update 🚀")
        setTip('')
        if (ignoreBtn.show) setIgnoreBtn({ text: "Ignorer", show: false, disabled: true })
        setConfirmBtn({ text: "Installer", show: true, disabled: false })
        setCloseBtnText("Fermer")
        break
      case VERSION_STATUS.checking:
        setTitle("⏳ Checking for updates ⏳")
        setTip("")
        setIgnoreBtn({ text: "Ignorer", show: false, disabled: true })
        setConfirmBtn({ text: "Mettre à jour", show: false, disabled: true })
        setCloseBtnText("Fermer")
        break
      case VERSION_STATUS.failed:
        setTitle("❌ Download failed ❌")
        setTip("The download of the installation package failed. You can try again or go to the project address to manually download the new version update.")
        setIgnoreBtn({ text: "Ignore", show: true, disabled: false })
        setConfirmBtn({ text: "Retry", show: true, disabled: false })
        setCloseBtnText("Fermer")
        break
      case VERSION_STATUS.unknown:
        setTitle("❓ Failed to get the latest version information ❓")
        setTip("Failed to obtain the latest version information, it is recommended to manually go to the project address to check if there is a new version")
        setIgnoreBtn({ text: "Ignore", show: false, disabled: true })
        setConfirmBtn({ text: "Project Homepage", show: true, disabled: false })
        setCloseBtnText("Fermer")
        break
      case VERSION_STATUS.latest:
      default:
        setTitle("🎉 The current version is already the latest 🎊")
        setTip('')
        setIgnoreBtn({ text: "Ignorer", show: false, disabled: true })
        setConfirmBtn({ text: "Mettre à jour", show: false, disabled: true })
        setCloseBtnText("Fermer")
        break
    }
  }, [versionInfo])

  return (
    <>
      <Modal
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={versionInfo.showModal}>
        <Modal.Body style={{
        	position: 'relative' 
        }}>
	        <div style={{
	        	position: 'absolute',
	        	top:3,
	        	right: 8 
	        }}>
	        	<button  onClick={handleCancel} className="btn btn-xs">x</button>
	        </div>
        	<h3 className="pb-2">{title}</h3>
          	<h5 className="pb-1">Nouvelle version: {versionInfo.version}</h5>
            <h5 className="pb-1">Version actuelle: {currentVer}</h5>
            {
              versionInfo.desc
                ? (
                    <div >
                      <h5>Description du mis à jour : </h5>
                      <div className="bg-light" style={{ paddingLeft: 10, marginTop: 5,paddingTop: 3,paddingBottom:3 }}>
                        <p>{versionInfo.desc}</p>
                      </div>
                    </div>
                  )
                : null
            }
            {
              history.length
                ? (
                    <div>
                      <h5>History version: </h5>
                      <div>
                        {history.map((item, index) => <VersionItem key={index} version={item.version} desc={item.desc} />)}
                      </div>
                    </div>
                  )
                : null
            }
            {versionInfo.status == VERSION_STATUS.downloading && (
              <div className="d-flex flex-row justify-content-between">
                
                  <progress id="file" value={percentage} max="100" style={{
                      width: '100vh'
                  }} />
                  <button style={{
                    marginLeft: 10
                  }} onClick={() => cancel()}>❌</button>
              </div>
            )}
        </Modal.Body>
        <Modal.Footer>
          <div>
          {
            ignoreBtn.show
              ? (
                  <button className="btn btn-default mx-2 btn-sm" disabled={ignoreBtn.disabled}  onClick={handleIgnore}>
                    <h5>{ignoreBtn.text}</h5>
                  </button>
                )
              : null
          }
          {
            confirmBtn.show
              ? (
                  <button className="btn btn-primary btn-sm" disabled={confirmBtn.disabled}  onClick={handleConfirm}>
                    <h5>{isInProgress ? 'Télechargement en cours  ...' : confirmBtn.text}</h5>
                  </button>
                )
              : null
          }
        </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default VersionModal