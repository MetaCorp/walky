import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from "shards-react";

import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

import MarkerImg from './assets/marker.png'

import "shards-ui/dist/css/shards.min.css"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const containerStyle = {
  width: '100vw',
  height: '100vh'
};
 
const center = {
  lat: 47.52772633436567,
  lng: 2.872425022026164
};

const SimpleMap = ({ }) => {
  const [map, setMap] = React.useState(null)
  const [steps, setSteps] = React.useState([])
  
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleAddStep = (e) => {
    const { latLng } = e
    const lat = latLng.lat()
    const lng = latLng.lng()

    const newStep = {
      position: {
        lat,
        lng
      }
    }
    
    setSteps([...steps, newStep])
  }

  const handleMarkerDrag = (e, index) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const newSteps = [...steps]
    newSteps[index] = { ...newSteps[index], position: { lat, lng } }

    setSteps(newSteps)
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 320, backgroundColor: 'white', zIndex: 1, boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)', padding: '24px 24px' }}>
        <h1>Walk</h1>
        <hr />
        <ListGroup style={{ paddingLeft: 0, listStyle: 'none' }}>
          {steps.map(step => <ListGroupItem>{step.position.lat + ',' + step.position.lng}</ListGroupItem>)}
        </ListGroup>
      </div>

      <LoadScript
        googleMapsApiKey="AIzaSyD1JFsWdhANdmjBfZ9DZogLgkHN8QuVw8U"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleAddStep}
        >
          {steps.map((step, i) => (
          <Marker
            key={i}
            position={step.position}
            draggable
            onDrag={e => handleMarkerDrag(e, i)}
            // icon={<img src={MarkerImg} />} // TODO : change size
          />
        ))}
        <Polyline path={steps.map(step => step.position)} />
        </GoogleMap>
      </LoadScript>

    </div>
  );
}

export default SimpleMap;