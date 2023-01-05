import React, { Fragment } from 'react';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import find from 'lodash/find';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { IService } from '../../types/types';

// componnets
import SearchResultCard from '../SearchResultCard';
import Loading from '../Loading';

interface IProps {
  store: any;
}

const ResultsListView: React.FC<IProps> = ({ store }) => {
  const history = useHistory();

  if (store.loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <main className="results__container">
        {!!store.results.length ? (
          store.results.map((result: IService) => {
            const organisation = find(store.organisations, ['id', result.organisation_id]) || null;

            return <SearchResultCard key={result.id} result={result} organisation={organisation} />;
          })
        ) : (
          <h1>No results found</h1>
        )}
      </main>

      <div className="flex-container flex-container--justify pagnation__container">
        {store.totalItems > store.itemsPerPage && (
          <Pagination
            activePage={store.currentPage}
            itemsCountPerPage={store.itemsPerPage}
            totalItemsCount={store.totalItems}
            pageRangeDisplayed={10}
            onChange={(pageNumber: number) => {
              store.paginate(pageNumber);
              history.push({
                search: store.updateQueryStringParameter('page', pageNumber),
              });
            }}
            prevPageText={
              <span>
                <FontAwesomeIcon icon="chevron-left" /> Prev
              </span>
            }
            nextPageText={
              <span>
                Next <FontAwesomeIcon icon="chevron-right" />
              </span>
            }
            innerClass="pagination"
            activeClass="pagination--active"
            itemClass="pagination--number-container"
            linkClass="pagination--text-number-link"
            linkClassPrev="pagination--text-nav-link"
            linkClassNext="pagination--text-nav-link"
            itemClassPrev="pagination--text-nav-container"
            itemClassNext="pagination--text-nav-container"
            hideFirstLastPages={true}
          />
        )}
      </div>
    </Fragment>
  );
};

export default observer(ResultsListView);
