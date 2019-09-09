import { observable, action, computed } from 'mobx';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import axios from 'axios';
import queryString from 'query-string';

import { apiBase } from '../config/api';
import { IParams, ICategory, IPersona } from '../types/types';

export default class ResultsStore {
  @observable keyword: string | null = null;
  @observable categoryId: string = '';
  @observable category: ICategory | null = null;
  @observable personaId: string = '';
  @observable persona: IPersona | null = null;
  @observable organisations: any[] = [];
  @observable is_free: boolean = false;
  @observable wait_time: string = 'null';
  @observable order: 'relevance' | 'location' = 'relevance';
  @observable results: [] = [];
  @observable loading: boolean = false;

  @computed
  get isKeywordSearch() {
    return !this.keyword === null;
  }

  @action
  clear() {
    this.categoryId = '';
    this.category = null;
    this.personaId = '';
    this.persona = null;
    this.is_free = false;
    this.wait_time = 'null';
    this.order = 'relevance';
    this.results = [];
    this.loading = false;
    this.organisations = [];
  }

  @action
  getCategory = async () => {
    try {
      const category = await axios.get(`${apiBase}/collections/categories/${this.categoryId}`);
      this.category = get(category, 'data.data', '');
    } catch (e) {
      console.error(e);
    }
  };

  @action
  getPersona = async () => {
    try {
      const persona = await axios.get(`${apiBase}/collections/personas/${this.personaId}`);
      this.persona = get(persona, 'data.data', '');
    } catch (e) {
      console.error(e);
    }
  };

  getSearchTerms = () => {
    const searchTerms = queryString.parse(window.location.search);

    this.setSearchTerms(searchTerms);
  };

  @action
  setSearchTerms = async (searchTerms: { [key: string]: any }) => {
    forEach(searchTerms, (key, value) => {
      if (value === 'category') {
        this.categoryId = key;
      }

      if (value === 'persona') {
        this.personaId = key;
      }

      if (value === 'is_free') {
        this.is_free = key === 'true' ? true : false;
      }

      if (value === 'wait_time') {
        this.wait_time = key;
      }
    });

    if (this.categoryId) {
      await this.getCategory();
    }

    if (this.personaId) {
      await this.getPersona();
    }

    this.setParams();
  };

  setParams = async () => {
    const params: IParams = {};

    if (this.category) {
      params.category = get(this.category, 'name');
    }

    if (this.persona) {
      params.persona = get(this.persona, 'name');
    }

    if (this.is_free) {
      params.is_free = this.is_free;
    }

    if (this.wait_time !== 'null') {
      params.wait_time = this.wait_time;
    }

    params.order = this.order;

    await this.fetchResults(params);
  };

  @action
  fetchResults = async (params: IParams) => {
    this.loading = true;
    try {
      const results = await axios.post(`${apiBase}/search?page=1`, params);
      this.results = get(results, 'data.data', []);

      forEach(this.results, (service: any) => {
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

  updateQueryStringParameter = (key: string, value: string | boolean) => {
    const query = window.location.search;
    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    const separator = query.indexOf('?') !== -1 ? '&' : '?';

    if (query.match(re)) {
      return query.replace(re, '');
    } else {
      return query + separator + key + '=' + value;
    }
  };
}
