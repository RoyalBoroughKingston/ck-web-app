import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import Checkbox from '../../../../components/Checkbox';
import ResultsStore from '../../../../stores/resultsStore';
import Button from '../../../../components/Button';

import './CategoryFilter.scss';

interface IProps extends RouteComponentProps {
  resultsStore?: ResultsStore;
}

@inject('resultsStore')
@observer
class CategoryFilter extends Component<IProps> {
  render() {
    const { resultsStore, history } = this.props;

    if (!resultsStore || !history) {
      return null;
    }

    return (
      <div className="flex-col flex-col--5 flex-col--tablet-large--7 flex-col--medium--6 flex-col--mobile--12 flex-col--tablet--12">
        <div
          className="flex-container flex-container--mobile-no-padding category__filters"
          aria-label={`${resultsStore.results.length} services found. Refine results`}
        >
          <div className="flex-col flex-col--4 flex-col--tablet-large--4 flex-col--mobile--6 flex-col--medium--4 flex-col--tablet--6 flex-col--mobile-small--5 flex-container--mobile-no-padding">
            <p
              className="category_filters--header--cost"
              aria-label={resultsStore.is_free ? 'View paid services' : 'View free services'}
            >
              Cost
            </p>
            <Checkbox
              id="is_free"
              label="Free"
              checked={resultsStore.is_free}
              onChange={() => {
                resultsStore.toggleIsFree();
                history.push({
                  search: resultsStore.updateQueryStringParameter('is_free', resultsStore.is_free),
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
              light={resultsStore.view !== 'grid'}
              onClick={() => resultsStore.toggleView('grid')}
            />
            <Button
              text="Map"
              icon="map"
              size="small"
              light={resultsStore.view !== 'map'}
              onClick={() => resultsStore.toggleView('map')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CategoryFilter);
