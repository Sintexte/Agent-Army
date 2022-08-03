import PanelForm from "./PanelForm";
import PanelHome from "./PanelHome";
import PanelLocalisation from "./PanelLocalisation";
import PanelUser from "./PanelUser";

function PanelBody(props){
    const stylebody ={
        padding:'20px',
        height:"100vh",
        overflowX: "hidden",
        overflowY: "auto"
    }
    let page = props.bodypage
    switch (page) {
        case 'localisation':
            return(
                <div style={stylebody}>
                    <PanelLocalisation />
                </div>
            )
        case 'user':
            return(
                <div style={stylebody}>
                    <PanelUser />
                </div>
            )
        case 'form':
            return(
                <div style={stylebody}>
                    <PanelForm />
                </div>
            )
        case 'analytics':
            return(
                <div style={stylebody}>
                    analytics
                </div>
            )
        default:
            return(
                <div style={stylebody}>
                    <PanelHome />
                </div>
            )
    }

    
}

export default PanelBody;