import { Room } from '@mui/icons-material';
import GoogleMapReact from 'google-map-react';
import { COLOR } from '../../styles/color';

const LAT = 21.00263419424935;
const LNG = 105.84652268495866;

const defaultProps = {
  center: {
    lat: LAT,
    lng: LNG,
  },
  zoom: 20,
};

const Map = () => {
  const Marker = () => (
    <div style={{ color: COLOR.red }}>
      <Room />
    </div>
  );

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC_FSJqfEnnt5LRtncvaObrRANIik5nLF0' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={LAT} lng={LNG} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
