<template>
  <v-app-bar
      app
      clipped-left
    >
    <v-toolbar-title class="hidden-sm-and-down">Gerenciador de tarefas</v-toolbar-title>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <v-text-field
      flat
      solo-inverted
      hide-details
      label="O que precisa fazer?"
      append-icon="add"
      v-model="taskTitle"
      v-on:keyup.enter="insert()"
      :disabled="loading"
    ></v-text-field>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <v-btn icon @click="exit()">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    taskTitle: '',
  }),

  computed: {
    ...mapState({
      loading: state => state.loading,
    }),
  },

  methods: {
    ...mapActions([
      'insertTask',
      'clearToken',
    ]),

    /**
     * Exit of the app
     */
    exit() {
      this.clearToken();
      this.$router.push('/');
    },

    /**
     * Mark task complete
     */
    insert() {
      if (!this.taskTitle) {
        return;
      }

      this.insertTask(this.taskTitle)
        .then(() => {
          this.taskTitle = '';
          this.$emit('inserted');
        });
    },
  },

};
</script>
