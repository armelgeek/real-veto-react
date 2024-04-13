import { useHistory } from "react-router-dom";
import axios from 'axios'
const SetupInterceptors = () => {
    let history = useHistory();
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        var status = error.response.status;
        if (status === 403) {
            localStorage.removeItem("user-veto");
            history.push("/signin");
        }
        return Promise.reject(error);
    });
}

export default SetupInterceptors;
