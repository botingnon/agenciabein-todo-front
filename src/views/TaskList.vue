<template>
  <v-app id="inspire">
    <app-bar @inserted="reload()" />
    <v-content>
      <v-card
          class="mx-auto"
          :loading="loading"
        >
        <v-card-text
          class="text-center"
          v-if="tasks.length === 0"
        >
          Nenhuma tarefa
        </v-card-text>
        <v-list v-else>
          <task
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @removed="reload()"
            @checked="reload()"
          />
        </v-list>
      </v-card>
    </v-content>

    <v-footer app padless>
      <v-bottom-navigation
          v-model="bottomNav"
        >
        <v-btn value="pending">
          <span>Pendentes</span>
          <v-icon>radio_button_unchecked</v-icon>
        </v-btn>
        <v-btn value="completed">
          <span>Exibir Completos</span>
          <v-icon>check_circle_outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppBar from '../components/AppBar.vue';
import Task from '../components/Task.vue';

export default {
  data: () => ({
    bottomNav: 'pending',
  }),

  computed: {
    ...mapState({
      loading: state => state.loading,
      tasks: state => state.tasks,
    }),
  },

  methods: {
    ...mapActions([
      'getTasks',
    ]),

    /**
     * Reload tasks
     */
    reload() {
      const showAll = (this.bottomNav === 'completed');
      this.getTasks(showAll);
    },

  },

  watch: {
    bottomNav() {
      this.reload();
    },
  },

  components: {
    AppBar,
    Task,
  },

  mounted() {
    this.reload();
  },

};
</script>
