import React, { useEffect, useRef } from 'react';
import { observer, inject } from 'mobx-react';
import { History } from 'history';
import { useLocation } from 'react-router-dom';
import { get, map } from 'lodash';

import PersonaStore from '../../stores/personaStore';

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
  personaStore: PersonaStore;
  history: History;
}

const Persona: React.FC<IProps> = ({ personaStore }) => {
  const { search, pathname } = useLocation();
  const firstRender = useRef(true);
  const { getPersonaName, persona } = personaStore;
  const currentPath = pathname.substring(pathname.lastIndexOf('/') + 1);

  const hasCategories = () => {
    if (personaStore.persona) return get(personaStore, 'persona.sideboxes', []);
    return null;
  };

  useEffect(() => {
    if (currentPath) personaStore.getSearchTerms(currentPath);

    return () => {
      personaStore.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (currentPath) personaStore.getSearchTerms(currentPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (personaStore.loading) return <Loading />;

  return (
    <section>
      {personaStore.persona ? (
        <>
          <Breadcrumb
            crumbs={[
              { text: 'Home', url: '/' },
              { text: 'Personas', url: '' },
              { text: getPersonaName, url: '' },
            ]}
          />

          <div className="results__search-box">
            <CategoryCard store={personaStore} category={persona} />
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
                {!!personaStore.results.length && !personaStore.loading && (
                  <p>
                    {personaStore.view === 'grid'
                      ? `${
                          personaStore.totalItems > 25 ? 'Over 25' : personaStore.totalItems
                        } services found`
                      : `${personaStore.serviceWithLocations} services shown. Some services are only available online or by phone`}
                  </p>
                )}
              </div>
            </div>

            {personaStore.view === 'grid' ? (
              <ResultsListView store={personaStore} />
            ) : (
              <ResultsMapView store={personaStore} />
            )}
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </section>
  );
};

export default inject('personaStore')(observer(Persona));
