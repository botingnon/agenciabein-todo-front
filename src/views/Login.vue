<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12" :loading="loading">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title v-if="isRegistering">Registro</v-toolbar-title>
                <v-toolbar-title v-else>Autenticação</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="formLoginValid">
                  <v-text-field
                    label="Nome"
                    type="text"
                    v-model="name"
                    name="name"
                    :rules="nameRules"
                    :required="isRegistering"
                    v-if="isRegistering"
                    autocomplete="off"
                  ></v-text-field>

                  <v-text-field
                    label="E-mail"
                    type="text"
                    v-model="email"
                    name="email"
                    :rules="emailRules"
                    required
                    autocomplete="off"
                  ></v-text-field>

                  <v-text-field
                    label="Senha"
                    type="password"
                    v-model="password"
                    name="password"
                    :rules="passwordRules"
                    required
                    autocomplete="off"
                  ></v-text-field>

                  <v-text-field
                    label="Confirmar Senha"
                    type="password"
                    v-model="cPassword"
                    name="c_password"
                    :rules="passwordRules"
                    :required="isRegistering"
                    v-if="isRegistering"
                    autocomplete="off"
                  ></v-text-field>
                </v-form>
                <v-alert dense v-if="message">
                  {{ message }}
                </v-alert>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="secondary"
                  small
                  @click="isRegistering = true"
                  v-if="isRegistering === false"
                >
                  Registrar
                </v-btn>
                <v-btn
                  color="secondary"
                  small
                  @click="isRegistering = false"
                  v-if="isRegistering"
                >
                  Cancelar
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  small
                  :disabled="formLoginValid === false"
                  @click="login()"
                  v-if="isRegistering === false"
                >
                  Entrar
                </v-btn>
                <v-btn
                  color="primary"
                  small
                  :disabled="formLoginValid === false"
                  @click="registrar()"
                  v-if="isRegistering === true"
                >
                  Registrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'login',

  data: () => ({
    isRegistering: false,
    formLoginValid: false,
    message: '',
    name: '',
    nameRules: [
      v => !!v || 'Nome é obrigatório',
      v => /[A-Za-z0-9]{3,12}/.test(v) || 'Nome deve conter de 3 a 12 caracteres',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail é obrigatório',
      v => /.+@.+/.test(v) || 'E-mail inválido',
    ],
    password: '',
    cPassword: '',
    passwordRules: [
      v => !!v || 'Senha é obrigatório',
      v => /[A-Za-z0-9]{3,12}/.test(v) || 'Senha deve conter de 3 a 12 caracteres',
    ],
  }),

  computed: {
    ...mapState({
      loading: state => state.loading,
    }),
  },

  methods: {
    ...mapActions([
      'authenticated',
      'register',
    ]),

    /**
     * Login
     */
    login() {
      this.message = '';
      const { email, password } = this;

      this.authenticated({ email, password })
        .then((data) => {
          if (data === true) {
            this.$router.push('/task');
            return;
          }

          this.message = (data.response.status === 400)
            ? data.response.data.error.message : 'Erro ao entrar';
        });
    },

    /**
     * Registrar
     */
    registrar() {
      this.message = '';
      const {
        name, email, password, cPassword,
      } = this;

      if (password !== cPassword) {
        this.message = 'Confirmação de senha não confere com a senha';
        return;
      }

      this.register({
        name, email, password, cPassword,
      })
        .then((data) => {
          if (data === true) {
            this.isRegistering = false;
            this.message = 'Registrado com sucesso, efetuar login';
            return;
          }

          this.message = (data.response.status === 400)
            ? data.response.data.error.message : 'Erro ao registrar';
        });
    },
  },
};
</script>
