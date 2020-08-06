import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { ListGroup, ListGroupItem } from "shards-react";

import Marker from './assets/marker.png'

import "shards-ui/dist/css/shards.min.css"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  state = {
    steps: []
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  handleAddStep = ({ x, y, lat, lng, event }) => {
    const newStep = {
      lat,
      lng
    }
    
    this.setState({
      steps: [...this.state.steps, newStep]
    })
  }

  renderPolylines = (google, maps) => {
    var flightPath = new google.maps.Polyline({
      path: [ { "lat": 53.480759, "lng": -2.242631 },{ "lat": 51.507351, "lng": -0.127758 },{ "lat": 55.953252, "lng": -3.188267 } ],
      geodesic: true,
      strokeColor: '#33BD4E',
      strokeOpacity: 1,
      strokeWeight: 5
    });

    flightPath.setMap(google.map);
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 320, backgroundColor: 'white', zIndex: 1, boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)', padding: '24px 24px' }}>
          <h1>Walk</h1>
          <hr />
          <ListGroup style={{ paddingLeft: 0, listStyle: 'none' }}>
            {this.state.steps.map(step => <ListGroupItem>{step.lat + ',' + step.lng}</ListGroupItem>)}
          </ListGroup>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD1JFsWdhANdmjBfZ9DZogLgkHN8QuVw8U' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.handleAddStep}
          // onGoogleApiLoaded={({map, maps}) => this.renderPolylines(map, maps)}>
        >
          {this.state.steps.map(step => (
            <div
              style={{ marginTop: -36, marginLeft: -18 }}
              lat={step.lat}
              lng={step.lng}
            >
              <img
                src={Marker}
                width={36}
              />
            </div>
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;