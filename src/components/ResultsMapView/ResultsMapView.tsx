import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import find from 'lodash/find';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { latLngBounds, LatLngBounds } from 'leaflet';
import { observer } from 'mobx-react';

import { ActivityMarker, GroupMarker, ServiceMarker, ClubMarker } from './icons';

import './MapView.scss';
import { IServiceLocation, IService } from '../../types/types';
import SearchResultCard from '../SearchResultCard';

interface IProps {
  store?: any;
}

const CENTRE_OF_KINGSTON: [number, number] = [51.378583, -0.280582];
const TOP_LEFT_CORNER: [number, number] = [51.412437, -0.329297];
const BOTTOM_RIGHT_CORNER: [number, number] = [51.403871, -0.288459];

const ResultsMapView: React.FC<IProps> = ({ store }) => {
  const [bounds] = useState<LatLngBounds>(latLngBounds(TOP_LEFT_CORNER, BOTTOM_RIGHT_CORNER));

  const addMarkers = (results: IService[]) => {
    if (results) {
      map(results, (result: IService) => {
        if (result.service_locations) {
          result.service_locations.forEach((location: IServiceLocation) =>
            bounds.extend([location.location.lat, location.location.lon])
          );
        }
      });
    }
  };

  const getMarker = (type: string) => {
    switch (type) {
      case 'service':
        return ServiceMarker;
      case 'group':
        return GroupMarker;
      case 'activity':
        return ActivityMarker;
      case 'club':
        return ClubMarker;
      default:
        break;
    }
  };

  useEffect(() => {
    if (store && store.results) addMarkers(store.results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!store) {
    return null;
  }

  return (
    <main className="flex-container">
      <div className="flex-col--9 flex-col--mobile--12 map">
        <MapContainer center={CENTRE_OF_KINGSTON} attributionControl={false} bounds={bounds}>
          <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png" />
          {store.results.map((result: IService) => {
            const organisation = find(store.organisations, ['id', result.organisation_id]) || null;
            if (result.service_locations) {
              return result.service_locations.map((serviceLocation: IServiceLocation) => {
                return (
                  <Marker
                    key={serviceLocation.id}
                    position={[serviceLocation.location.lat, serviceLocation.location.lon]}
                    icon={getMarker(result.type)}
                  >
                    <Popup>
                      <SearchResultCard
                        result={result}
                        organisation={organisation}
                        mapView={true}
                      />
                    </Popup>
                  </Marker>
                );
              });
            }

            return null;
          })}
        </MapContainer>
      </div>
      <div className="flex-col--3 flex-col--mobile--12 map__key--container">
        <h3 className="map__key--heading">Map key</h3>
        <div className="map__key">
          <p className="map__key--description">
            <FontAwesomeIcon icon="paper-plane" className="map__key-icon map__key-icon--activity" />
            Activity
          </p>
          <p className="map__key--description">
            <FontAwesomeIcon icon="clipboard" className="map__key-icon map__key-icon--service" />
            Service
          </p>
          <p className="map__key--description">
            <FontAwesomeIcon icon="users" className="map__key-icon map__key-icon--group" />
            Group
          </p>
          <p className="map__key--description">
            <FontAwesomeIcon icon="tshirt" className="map__key-icon map__key-icon--club" />
            Club
          </p>
        </div>
      </div>
    </main>
  );
};

export default observer(ResultsMapView);
