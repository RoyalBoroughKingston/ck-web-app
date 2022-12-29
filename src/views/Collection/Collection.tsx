import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { History } from 'history';
import { useLocation } from 'react-router-dom';

import CollectionStore from '../../stores/collectionStore';

// components
import Breadcrumb from '../../components/Breadcrumb';
import CategoryCard from '../../components/CategoryCard';

interface IProps {
  location: Location;
  collectionStore: CollectionStore;
  history: History;
}

const Collection: React.FC<IProps> = ({ collectionStore }) => {
  const { pathname } = useLocation();
  const { getCategoryName, category } = collectionStore;

  console.log('[Collection] --> collectionStore category', collectionStore.category);

  useEffect(() => {
    const currentPath = pathname.substring(pathname.lastIndexOf('/') + 1);
    console.log('pathname:', currentPath);
    if (currentPath) collectionStore.getSearchTerms(currentPath);

    return () => {
      console.log('cleanup --> collectionStore.clear()');
      collectionStore.clear();
    };
  }, []);
  return (
    <section>
      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          { text: getCategoryName, url: '' },
        ]}
      />

      <div className="results__search-box">
        <CategoryCard store={collectionStore} category={category} />
      </div>
    </section>
  );
};

export default inject('collectionStore')(observer(Collection));
