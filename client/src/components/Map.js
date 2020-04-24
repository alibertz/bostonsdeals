import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

const Map = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        >

        <Marker 
            defaultPosition={{ lat:props.lat, lng:props.lng }}
        />
    </GoogleMap>        
))

export default Map;