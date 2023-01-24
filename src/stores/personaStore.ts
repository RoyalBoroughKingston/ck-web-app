import { observable, action, computed } from 'mobx';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import size from 'lodash/size';
import axios from 'axios';
import queryString from 'query-string';

import { apiBase } from '../config/api';
import {
  IParams,
  ICategory,
  IOrganisation,
  IService,
  IGeoLocation,
  TOrderBy,
  TResultsView,
} from '../types/types';

import { queryRegex, querySeparator, titleCase } from '../utils/utils';

export default class PersonaStore {
  @observable personaSlug: string = '';
  @observable persona: ICategory | null = null;
  @observable organisations: IOrganisation[] | null = [];
  @observable is_free: boolean = false;
  @observable wait_time: string = 'null';
  @observable order: TOrderBy = 'relevance';
  @observable results: IService[] = [];
  @observable loading: boolean = true;
  @observable currentPage: number = 1;
  @observable totalItems: number = 0;
  @observable itemsPerPage: number = 25;
  @observable postcode: string = '';
  @observable locationCoords: IGeoLocation | {} = {};
  @observable view: TResultsView = 'grid';

  @action
  clear() {
    this.personaSlug = '';
    this.persona = null;
    this.is_free = false;
    this.wait_time = 'null';
    this.order = 'relevance';
    this.results = [];
    this.loading = false;
    this.organisations = [];
    this.currentPage = 1;
    this.totalItems = 0;
    this.itemsPerPage = 25;
    this.postcode = '';
    this.locationCoords = {};
    this.view = 'grid';
  }

  @computed
  get getPersonaName() {
    return this.persona && this.persona.name ? this.persona.name : titleCase(this.personaSlug);
  }

  @action
  geCollectionBySlug = async () => {
    if (!this.personaSlug) return;

    try {
      const response = await axios.get(`${apiBase}/collections/personas/${this.personaSlug}`);

      if (get(response, 'data.data.disabled', false)) {
        this.loading = false;
      } else {
        this.persona = get(response, 'data.data', '');
      }
    } catch (e) {
      this.loading = false;
    }
  };

  getSearchTerms = (personaSlug = '') => {
    this.personaSlug = personaSlug;
    const searchTerms = queryString.parse(window.location.search);

    this.setSearchTerms(searchTerms);
  };

  @action
  setSearchTerms = async (searchTerms: { [key: string]: any }) => {
    forEach(searchTerms, (key, value) => {
      if (value === 'is_free') {
        this.is_free = key === 'true' ? true : false;
      }

      if (value === 'wait_time') {
        this.wait_time = key;
      }

      if (value === 'page') {
        this.currentPage = Number(key);
      }
    });

    if (this.personaSlug) await this.geCollectionBySlug();

    if (this.persona) this.setParams();
  };

  setParams = async () => {
    const params: IParams = {};

    params.persona = this.getPersonaName;

    if (this.is_free) {
      params.is_free = this.is_free;
    }

    if (this.wait_time !== 'null') {
      params.wait_time = this.wait_time;
    }

    if (size(this.locationCoords)) {
      params.location = this.locationCoords;
    }

    params.order = this.order;

    await this.fetchResults(params);
  };

  @action
  fetchResults = async (params: IParams) => {
    this.loading = true;
    try {
      const results = await axios.post(`${apiBase}/search?page=${this.currentPage}`, params);
      this.results = get(results, 'data.data', []);
      this.totalItems = get(results, 'data.meta.total', 0);
      this.itemsPerPage = get(results, 'data.meta.per_page', 25);

      forEach(this.results, (service: IService) => {
        // @ts-ignore
        this.organisations.push(service.organisation_id);
      });

      this.getOrganisations();
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  };

  @action
  getOrganisations = async () => {
    const organisations = await axios.get(
      `${apiBase}/organisations?filter[id]=${this.organisations}`
    );
    this.organisations = get(organisations, 'data.data', []);
    this.loading = false;
  };

  @action
  toggleIsFree = () => {
    this.is_free = !this.is_free;
  };

  updateQueryStringParameter = (
    key: string,
    value: string | boolean | number,
    query: string = window.location.search
  ) => {
    const re = queryRegex(key);
    const separator = querySeparator(query);

    if (query.match(re)) {
      return query.replace(re, `$1${key}=${value}$2`);
    } else {
      return `${query}${separator}${key}=${value}`;
    }
  };

  removeQueryStringParameter = (key: string, query: string = window.location.search) => {
    const re = queryRegex(key);

    if (query.match(re)) {
      return query.replace(re, '$2');
    }

    return query;
  };

  @action
  paginate = (page: number) => {
    this.currentPage = page;
    this.results = [];
    this.loading = true;
  };

  @action
  geolocate = async () => {
    try {
      const geolocation = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.postcode},UK&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );

      const location = get(geolocation, 'data.results[0].geometry.location', {});

      this.locationCoords = {
        lon: location.lng,
        lat: location.lat,
      };
    } catch (e) {
      console.error(e);
    }
  };

  @action
  toggleView = (view: 'map' | 'grid') => {
    this.view = view;
  };

  @action
  orderResults = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.order = e.target.value as 'relevance' | 'distance';
    this.results = [];

    this.setParams();
  };

  @computed
  get serviceWithLocations() {
    const locations = this.results.filter(service => service.service_locations.length);

    const totalLocations = locations.reduce((total, location) => {
      total += location.service_locations.length;
      return total;
    }, 0);

    return totalLocations;
  }
}
