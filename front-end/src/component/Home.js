import { useSelector } from "react-redux";
import Login from "./Login"
import Panel from "./Panel"
function Home(){
    const { connected } = useSelector((state)=>state.userconnection);
    console.log(connected);
    return(
        <div>
            {connected ? <Panel/> : <Login/>}
        </div>
    )
}

export default Home;