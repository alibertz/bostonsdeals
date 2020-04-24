import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

const Map = withScriptjs(withGoogleMap((props) =>
    <div className="expandedCard">
        <h4 className="address">{props.address}</h4>
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: props.lat, lng: props.lng }}
            >

            <Marker 
                defaultPosition={{ lat:props.lat, lng:props.lng }}
            />
        </GoogleMap>        
    </div>

    
))

export default Map;