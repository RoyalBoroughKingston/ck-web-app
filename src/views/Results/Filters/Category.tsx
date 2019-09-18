import React from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';

import ResultsStore from '../../../stores/resultsStore';
import CategoryFilter from '../Filters/CategoryFilter';
import '../Results.scss';

interface IProps {
  resultsStore?: ResultsStore;
}

const Category: React.FunctionComponent<IProps> = ({ resultsStore }) => {
  if (!resultsStore) {
    return null;
  }

  return (
    <div className="flex-container">
      <div className="flex-col flex-col--12 flex-col--mobile--12">
        <h1 className="results__keyword-heading">Results for</h1>
      </div>
      {(resultsStore.category || resultsStore.persona) && (
        <div className="flex-container category__info flex-container--mobile-no-padding">
          <div className="flex-col flex-col--7 flex-col--mobile--12">
            <h2>
              {resultsStore && resultsStore.category
                ? get(resultsStore, 'category.name')
                : get(resultsStore, 'persona.name')}
            </h2>
            <div>
              <p className="category__info--intro">
                {resultsStore && resultsStore.category
                  ? get(resultsStore, 'category.intro')
                  : get(resultsStore, 'persona.intro')}
              </p>
            </div>
          </div>
          <CategoryFilter />
        </div>
      )}
    </div>
  );
};

export default inject('resultsStore')(observer(Category));
