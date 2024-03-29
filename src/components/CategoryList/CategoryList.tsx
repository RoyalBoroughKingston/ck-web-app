import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

// helpers
import { apiBase } from '../../config/api';
import { ICategory } from '../../types/types';
import './CategoryList.scss';

// components
import Button from '../Button';

interface IProps extends RouteComponentProps {
  categories: ICategory[];
  covid?: boolean;
  showCollectionImage?: boolean;
}

const CategoryList: React.FunctionComponent<IProps> = ({
  history,
  categories,
  covid = false,
  showCollectionImage = false,
}) => (
  <Fragment>
    {categories.map(({ name, id, slug, icon, image_file_id }) =>
      showCollectionImage ? (
        <Link
          key={id}
          to={`/collections/${slug}`}
          className="search__cateogry-list__link-with-image"
        >
          {image_file_id && (
            <img
              className="search__cateogry-list__image"
              src={`${apiBase}/collections/categories/${id}/image.svg?v=`}
              alt={name}
            />
          )}
          {name}
        </Link>
      ) : (
        <Button
          category={true}
          text={name}
          key={id}
          size="small"
          icon={icon}
          onClick={() => {
            history.push({
              pathname: `/collections/${slug}`,
            });
          }}
          covid={covid}
        />
      )
    )}
  </Fragment>
);

export default withRouter(observer(CategoryList));
