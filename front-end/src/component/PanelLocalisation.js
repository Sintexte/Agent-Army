import { useEffect } from 'react';
import Map from 'react-map-gl';
import { useSelector } from 'react-redux';


export default function PanelLocalisation() {
  const { token } = useSelector((state)=>state.userconnection)
  useEffect(()=>{
    console.log(token);
  }, [])

  return <Map
    initialViewState={{
      longitude: 0.0,
      latitude: 0.0,
      zoom: 3.5, 
      
    }}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  />;
}