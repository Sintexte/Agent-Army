import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem
  } from 'cdbreact';
import { useState } from 'react';
  import { Link } from 'react-router-dom';
import PanelBody from './PanelBody';

function PanelMenu(){

    const [page, setPage] = useState(false)
    return(
      <div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
      >
      <CDBSidebar textColor="#fff" backgroundColor="#0d6efd" style={{}}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>} style={{borderBottom: '0px'}}>
          <div onClick={()=>{setPage("")}}
            className="text-decoration-none"
            style={{ color: 'inherit', cursor:'pointer',userSelect:"none"}}
          >
            Admin Agent
          </div>
          <div style={{width:'44%',height:'2px',backgroundColor:"white"}}></div>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content text-white" style={{padding:"0px"}}>
          <CDBSidebarMenu textColor="#fff" >
            <div onClick={()=>{setPage("localisation")}} >
              <CDBSidebarMenuItem icon="map" className='headermenu' style={{margin:"0px 15px"}}>
                <span style={{paddingLeft:"15%"}}>
                Localisation
                </span>
              </CDBSidebarMenuItem>
            </div>
            <div onClick={()=>{setPage("localisation")}}>
              <CDBSidebarMenuItem icon="user" className='headermenu' style={{margin:"0px 15px"}}>
                <span style={{paddingLeft:"15%"}}>
                Utulisateurs
                </span>
              </CDBSidebarMenuItem>
            </div>
            <div onClick={()=>{setPage("localisation")}}>
              <CDBSidebarMenuItem icon="archive" className='headermenu' style={{margin:"0px 15px"}}>
                {/*icon=exclamation-circle*/}
                <span style={{paddingLeft:"15%"}}>
                  Formulaire
                </span>
              </CDBSidebarMenuItem>
            </div>
            <div onClick={()=>{setPage("localisation")}}>
              <CDBSidebarMenuItem icon="chart-line" className='headermenu' style={{margin:"0px 15px"}}>
                <span style={{paddingLeft:"15%"}}>
                  Analytics
                </span>
              </CDBSidebarMenuItem>
            </div>
            <Link to="/disconnect" >
                <CDBSidebarMenuItem icon="power-off" className='headermenu' style={{margin:"0px 15px"}}>
                  <span style={{paddingLeft:"15%"}}>
                    Disconnect
                  </span>
                </CDBSidebarMenuItem>
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            agent force
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <PanelBody bodypage={page}/>
    </div>
    )
}


export default PanelMenu;

//https://www.devwares.com/docs/contrast/react/navigation/sidebar/
//https://icons.getbootstrap.com/#usage