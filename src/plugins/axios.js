/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';
import store from '../store'
import route from '../router'

const config = {
  baseURL: process.env.baseURL || process.env.VUE_APP_BASE_API_URL || '',
  timeout: 60 * 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
};

const _axios = axios.create(config);

_axios.interceptors.request.use((config) => {
  if (store.state.auth.token) {
    config.headers.Authorization = `Bearer ${store.state.auth.token}`;
  }

  return config;
});

_axios.interceptors.response.use(
  response => {
    if (response.headers['x-authorization']) {
      store.commit('SET_TOKEN', response.headers['x-authorization'].replace(/\"/g, ''));
    }

    return response;
  },
  error => {
    if (401 === error.response.status) {
      store.commit('SET_TOKEN', null);
      route.push('/');
      return;
    }

    return Promise.reject(error);
  },
);

Plugin.install = function axiosplugin(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
