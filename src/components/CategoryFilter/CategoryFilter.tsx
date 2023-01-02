import React from 'react';
import { useHistory } from 'react-router-dom';

// components
import Checkbox from '../Checkbox';
import Button from '../Button';

import './CategoryFilter.scss';

interface IProps {
  store?: any;
}

const CategoryFilter: React.FC<IProps> = ({ store }) => {
  const history = useHistory();

  if (!store || !history) {
    return null;
  }

  return (
    <div className="flex-col flex-col--5 flex-col--tablet-large--7 flex-col--medium--6 flex-col--mobile--12 flex-col--tablet--12">
      <div
        className="flex-container flex-container--mobile-no-padding category__filters"
        aria-label={`${store.results.length} services found. Refine results`}
      >
        <div className="flex-col flex-col--4 flex-col--tablet-large--4 flex-col--mobile--6 flex-col--medium--4 flex-col--tablet--6 flex-col--mobile-small--5 flex-container--mobile-no-padding">
          <p
            className="category__filters--header--cost"
            aria-label={store.is_free ? 'View paid services' : 'View free services'}
          >
            Cost
          </p>
          <Checkbox
            id="is_free"
            label="Free"
            checked={store.is_free}
            onChange={() => {
              store.toggleIsFree();
              history.push({
                search: store.updateQueryStringParameter('is_free', store.is_free),
              });
            }}
          />
        </div>
        <div className="flex-col flex-col--7 flex-col--tablet-large--8 flex-col--mobile--6 flex-col--medium--8 flex-col--tablet--6 flex-col--mobile-small--7 flex-container--mobile-no-padding view-filter__search-bar">
          <p className="view-filter--header">View As</p>
          <Button
            text="Grid"
            icon="th-large"
            size="small"
            light={store.view !== 'grid'}
            onClick={() => store.toggleView('grid')}
          />
          <Button
            text="Map"
            icon="map"
            size="small"
            light={store.view !== 'map'}
            onClick={() => store.toggleView('map')}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
