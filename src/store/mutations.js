export default {
  /**
   * Set loading.
   * @param state
   * @param loading
   */
  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  /**
   * Set task.
   * @param state
   * @param tasks
   */
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },

  /**
   * Set user.
   * @param state
   * @param user
   */
  SET_USER(state, user) {
    state.auth.user = user;
  },

  /**
   * Set token.
   * @param state
   * @param token
   */
  SET_TOKEN(state, token) {
    localStorage.token = token;
    state.auth.token = token;
  },
};
