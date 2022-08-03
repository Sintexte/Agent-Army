import PanelHome from "./PanelHome";

function PanelBody(props){
    const stylebody ={
        margin:'20px'
    }
    let page = props.bodypage
    switch (page) {
        case 'localisation':
            return(
                <div style={stylebody}>
                    localisation
                </div>
            )
            break;
        case 'user':
            return(
                <div>
                    page1
                </div>
            )
            break
        default:
            return(
                <div style={stylebody}>
                    <PanelHome />
                </div>
            )
            break;
    }

    
}

export default PanelBody;