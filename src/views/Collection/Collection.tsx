import React, { useEffect, useRef } from 'react';
import { observer, inject } from 'mobx-react';
import { History } from 'history';
import { useLocation } from 'react-router-dom';
import { get, map } from 'lodash';

import CollectionStore from '../../stores/collectionStore';

// types
import { ISidebox } from '../../types/types';

// components
import Breadcrumb from '../../components/Breadcrumb';
import CategoryCard from '../../components/CategoryCard';
import SideboxCard from '../../components/SideboxCard';
import ResultsListView from '../../components/ResultsListView';
import ResultsMapView from '../../components/ResultsMapView';
import Loading from '../../components/Loading';
import NotFound from '../NotFound';

interface IProps {
  location: Location;
  collectionStore: CollectionStore;
  history: History;
}

const Collection: React.FC<IProps> = ({ collectionStore }) => {
  const { search, pathname } = useLocation();
  const firstRender = useRef(true);
  const { getCategoryName, category } = collectionStore;
  const currentPath = pathname.substring(pathname.lastIndexOf('/') + 1);

  const hasCategories = () => {
    if (collectionStore.category) return get(collectionStore, 'category.sideboxes', []);
    return null;
  };

  useEffect(() => {
    if (currentPath) collectionStore.getSearchTerms(currentPath);

    return () => {
      collectionStore.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (currentPath) collectionStore.getSearchTerms(currentPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (collectionStore.loading) return <Loading />;

  return (
    <section>
      {collectionStore.category ? (
        <>
          <Breadcrumb
            crumbs={[
              { text: 'Home', url: '/' },
              { text: 'Collections', url: '' },
              { text: getCategoryName, url: '' },
            ]}
          />

          <div className="results__search-box">
            <CategoryCard store={collectionStore} category={category} />
          </div>
          <div className="results__list">
            {hasCategories() && (
              <div className="sideboxes__container">
                {map(hasCategories(), (sidebox: ISidebox) => {
                  return <SideboxCard sidebox={sidebox} />;
                })}
              </div>
            )}

            <div className="flex-container flex-container results__filter-bar">
              <div className="flex-col flex-col--4 flex-col--tablet--12 flex-col--mobile--12 results__container-count">
                {!!collectionStore.results.length && !collectionStore.loading && (
                  <p>
                    {collectionStore.view === 'grid'
                      ? `${
                          collectionStore.totalItems > 25 ? 'Over 25' : collectionStore.totalItems
                        } services found`
                      : `${collectionStore.serviceWithLocations} services shown. Some services are only available online or by phone`}
                  </p>
                )}
              </div>
            </div>

            {collectionStore.view === 'grid' ? (
              <ResultsListView store={collectionStore} />
            ) : (
              <ResultsMapView store={collectionStore} />
            )}
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </section>
  );
};

export default inject('collectionStore')(observer(Collection));
