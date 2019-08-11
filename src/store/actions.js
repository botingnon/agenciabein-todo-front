import Vue from 'vue';

export default {
  /**
   * Login.
   *
   * @param context
   * @param params email and password
   */
  authenticated(context, { email, password }) {
    context.commit('SET_LOADING', true);
    context.commit('SET_USER', null);
    context.commit('SET_TOKEN', null);

    return Vue.axios.post('/auth/login', { email, password })
      .then((res) => {
        const { data } = res;

        context.commit('SET_LOADING', false);
        context.commit('SET_USER', data.user);
        context.commit('SET_TOKEN', data.token);

        return true;
      })
      .catch((err) => {
        context.commit('SET_LOADING', false);
        return err;
      });
  },

  /**
   * Register user.
   *
   * @param context
   * @param params name, email, password, cPassword
   */
  register(context, {
    name, email, password, cPassword,
  }) {
    context.commit('SET_LOADING', true);

    return Vue.axios.post('/auth/register', {
      name, email, password, c_password: cPassword,
    })
      .then(() => {
        context.commit('SET_LOADING', false);

        return true;
      })
      .catch((err) => {
        context.commit('SET_LOADING', false);
        return err;
      });
  },

  /**
   * Load tasks.
   *
   * @param context
   * @param showAll Show all tasks
   */
  getTasks(context, showAll = false) {
    context.commit('SET_LOADING', true);
    context.commit('SET_TASKS', []);

    const query = showAll ? '?show_all=1' : '';

    return Vue.axios.get(`/task${query}`)
      .then((res) => {
        const { data } = res;

        context.commit('SET_LOADING', false);
        context.commit('SET_TASKS', data);
      })
      .catch(() => {
        context.commit('SET_LOADING', false);
      });
  },

  /**
   * Insert task.
   *
   * @param context
   * @param title
   */
  insertTask(context, title) {
    context.commit('SET_LOADING', true);

    return Vue.axios.post('/task', { title })
      .then((res) => {
        const { data } = res;

        context.commit('SET_LOADING', false);

        return data;
      })
      .catch(() => {
        context.commit('SET_LOADING', false);
      });
  },

  /**
   * Delete task.
   *
   * @param context
   * @param id
   */
  remove(context, id) {
    context.commit('SET_LOADING', true);

    return Vue.axios.delete(`/task/${id}`)
      .then((res) => {
        const { data } = res;

        context.commit('SET_LOADING', false);

        return data;
      })
      .catch(() => {
        context.commit('SET_LOADING', false);
      });
  },

  /**
   * Chek task.
   *
   * @param context
   * @param id
   */
  checked(context, id) {
    context.commit('SET_LOADING', true);

    return Vue.axios.put(`/task/${id}`, {})
      .then((res) => {
        const { data } = res;

        context.commit('SET_LOADING', false);

        return data;
      })
      .catch(() => {
        context.commit('SET_LOADING', false);
      });
  },

  /**
   * Clear token.
   *
   * @param context
   * @param title
   */
  clearToken(context) {
    context.commit('SET_TOKEN', null);
  },
};
