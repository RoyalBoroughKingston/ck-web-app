import React from 'react';
import get from 'lodash/get';

// components
import CategoryFilter from '../CategoryFilter';

import '../../views/Results/Results.scss';

interface IProps {
  category?: any;
  store?: any;
}

const CategoryCard: React.FC<IProps> = ({ category = null, store = null }) => {
  if (!category) {
    return null;
  }
  console.log('[CategoryCard] --> category:', category, ', store:', store);

  return (
    <div className="flex-container">
      {category && (
        <div className="flex-container category__info flex-container--mobile-no-padding">
          <div className="flex-col flex-col--7 flex-col--tablet-large--5 flex-col--medium--6 flex-col--mobile--12 flex-col--tablet--12">
            <h2>{get(category, 'name', '').replace('COVID-19:', '')}</h2>
            <div>
              <p className="category__info--intro">{get(category, 'intro')}</p>
            </div>
          </div>
          <CategoryFilter store={store} />
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
