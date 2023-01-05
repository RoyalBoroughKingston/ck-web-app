import L from 'leaflet';

import activityPin from '../../assets/images/icons/maps/activity-pin.svg';
import servicePin from '../../assets/images/icons/maps/service-pin.svg';
import groupPin from '../../assets/images/icons/maps/group-pin.svg';
import clubPin from '../../assets/images/icons/maps/club-pin.svg';

export const ActivityMarker = L.icon({
  iconUrl: activityPin,
  iconSize: [50, 95],
});
export const ServiceMarker = L.icon({
  iconUrl: servicePin,
  iconSize: [50, 95],
});
export const GroupMarker = L.icon({
  iconUrl: groupPin,
  iconSize: [50, 95],
});
export const ClubMarker = L.icon({
  iconUrl: clubPin,
  iconSize: [50, 95],
});
