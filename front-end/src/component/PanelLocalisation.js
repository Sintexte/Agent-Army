import "mapbox-gl";
import { useEffect, useState } from 'react';
import Map, { Source ,Layer,  } from 'react-map-gl';
import { useSelector } from 'react-redux';
import * as React from 'react';
import * as turf from '@turf/turf';


const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#0d6efd'
  }
};


export default function PanelLocalisation() {
  const stylmenu = {
    position:"absolute",
    zIndex:"5", 
    right:"0px", 
    margin:"30px",
    width:"18em",
    backgroundColor:"#ffffff",
    maxHeight:"13em", 
    borderRadius:"10px", 
    color:"#0d6efd", 
    fontSize:"15px",
    overflowY:"hidden"
  }

  const stylmenuzoom = {
    position:"absolute",
    zIndex:"5", 
    right:"0px", 
    bottom:"0px",
    margin:"30px",
    width:"3em",
    backgroundColor:"#ffffff",
    maxHeight:"13em", 
    borderRadius:"5px", 
    color:"#0d6efd", 
    fontSize:"15px",
    overflowY:"hidden"
  }

  const [locationarray, setLocationarray] = useState([])
  const [maplocalisation, setMapLocalisation] = useState({
    longitude: -7.603869,
    latitude: 33.589886,
    zoom: 12, 
    })
  const stylemenuelement = {paddingBottom:"6px",paddingTop:"6px",textAlign:"center",borderTop:"1px solid #EEE"}
  const stylemenuelement_zoom = {paddingBottom:"6px",paddingTop:"6px",textAlign:"center",borderTop:"1px solid #EEE", fontSize:"15px"}
  const zoomconstant = 0.5
  let features_map = []
  const { token } = useSelector((state)=>state.userconnection)

  useEffect(()=>{
    //init map localisation
    
    //deleting the ad
    //console.log("deleting the ad");
    //console.log(document.getElementsByClassName("mapboxgl-compact"))
    if(document.getElementsByClassName("mapboxgl-compact").length){document.getElementsByClassName("mapboxgl-compact")[0].innerText="test"}

    fetch('allocation', {
      method: 'POST',
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({"token":token})
    }).then((res0)=>{
        if(res0.status === 200){
            res0.json().then((data)=>{
                setLocationarray(data)
            })
        }
    })
  }, [])

  

  return (
    <>
    
    <div style={stylmenu}>
      <div style={{fontWeight:"480",paddingTop:"4px",marginBottom:"15px",padding:"8px",paddingLeft:"10px", paddingTop:"15px",fontSize:"20px",paddingBottom:"0px", textAlign:"center"}}>Agents</div>
      <div style={{height:"100%",overflowY:"auto",paddingBottom:"10px"}}>
        {locationarray.map((elem)=>{
          features_map.push({type: 'Feature', geometry: {type: 'Point', coordinates: [elem.longitude,elem.latitude]}})
          return (<div style={stylemenuelement} className="agentlocationelement" 
                      onClick={()=>{
                        setMapLocalisation({
                          longitude: elem.longitude,
                          latitude: elem.latitude,
                          zoom: 18, 
                        })
                      }}>
                    Agent {elem.username}</div>)
        })}
      </div>
    </div>
    <div style={stylmenuzoom}>
      <div style={stylemenuelement_zoom} class="agentlocationelement" onClick={()=>{setMapLocalisation({longitude: maplocalisation.longitude,latitude: maplocalisation.latitude,zoom: (maplocalisation.zoom+zoomconstant)})}}>+</div>
      <div style={stylemenuelement_zoom} class="agentlocationelement" onClick={()=>{setMapLocalisation({longitude: maplocalisation.longitude,latitude: maplocalisation.latitude,zoom: (maplocalisation.zoom-zoomconstant)})}}>-</div>
    </div>
    
    <Map
      {...maplocalisation}
      onMove={evt => setMapLocalisation(evt.viewState)}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      >
      <Source id="my-data" type="geojson" data={{type: 'FeatureCollection',
            features: features_map
          }}>
            <Layer {...layerStyle} />
          </Source>
      
    </Map>
    </>)
}