<template>
  <v-list-item
    @click="check()"
  >
    <v-list-item-avatar>
      <v-icon
        class="white--text"
        :class="{'green': task.completed == 1, 'amber': task.completed == 0}"
      >assignment</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="task.title"></v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click.stop="removeTask()">
        <v-icon color="grey lighten-1">delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    task: {
      required: true,
    },
  },

  methods: {
    ...mapActions([
      'remove',
      'checked',
    ]),

    /**
     * Mark task complete
     */
    check() {
      this.checked(this.task.id)
        .then(() => {
          this.$emit('checked');
        });
    },

    /**
     * Delete task
     */
    removeTask() {
      this.remove(this.task.id)
        .then(() => {
          this.$emit('removed');
        });
    },
  },
};
</script>
