import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {Disconnected} from "../redux/userconnection"

function Disconnect(){
    const { connected } = useSelector((state)=>state.userconnection);
    const dispatch = useDispatch()
    Disconnected()
    return(
        <>
            Disconnecting ...
            {connected ? dispatch(Disconnected()) : <Navigate to="/" />}
        </>
    )
}

export default Disconnect;