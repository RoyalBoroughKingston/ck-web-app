import { IServiceLocation } from '../types/types';
import get from 'lodash/get';

export const queryRegex = (key: string) => new RegExp('([?&])' + key + '=.*?(&|$)', 'i');

export const querySeparator = (query: string) => (query.includes('?') ? '&' : '?');

export const getLocationName = (locations: IServiceLocation[]) =>
  locations.map((location: IServiceLocation) =>
    location.name ? location.name : get(location, 'location.address_line_1', '')
  );

export const removeQuotesRegex = new RegExp(/^["']|["']$|["]/, 'g');

export const capitalise = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const titleCase = (fieldName: string = ''): string => {
  if (!fieldName) return '';

  // safely ignore as fieldName will default to empty string if not provided
  // @ts-ignore
  return fieldName
    .toLowerCase()
    .split('.')
    .pop()
    .split('-')
    .map(val =>
      val
        .split(' ')
        .map(word => word && word.replace(word[0], word[0].toUpperCase()))
        .join(' ')
    )
    .join(' ');
};
