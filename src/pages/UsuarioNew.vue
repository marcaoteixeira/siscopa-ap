<template>
  <q-page class="my-page">
    <q-card class="my-card">
      <q-card-section>
        <h5>Cadastro de Usuários</h5>
        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="max-width: 500px">
            <q-input
              outlined
              v-model="nom_usuario"
              label="Nome do Usuário"
              name="nom_usuario"
            />
            <q-input
              outlined
              v-model="tex_login"
              label="Login"
              name="tex_login"
            />
            <q-input
              outlined
              v-model="num_telefone"
              label="Telefone"
              name="num_telefone"
            />
            <q-input
              outlined
              v-model="tex_email"
              label="E-mail"
              name="tex_email"
            />
            <div>
              <q-checkbox
                left-label
                v-model="ind_bloqueado"
                label="Usuário bloqueado"
              />
            </div>
            <div class="my-button">
              <q-btn push color="primary" label="Cadastrar" @click="cadastro" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent, toDisplayString } from "vue";
import { ref } from "vue";

export default defineComponent({
  setup() {
    return {
      text: ref(""),
      ph: ref(""),
      dense: ref(false),
    };
  },
  data() {
    return {
      nom_usuario: null,
      tex_login: null,
      num_telefone: null,
      tex_email: null,
      nom_usuario_criador: null,
      dat_criacao: null,
      nom_usuario_ultima_alteracao: null,
      dat_ultima_alteracao: null,
      ind_bloqueado: false,
    };
  },

  methods: {
    clearpage() {
      this.$router.go("/usuariolist");
    },
    cadastro() {
      const agora = new Date();
      console.log(agora);
      //this.$swal('Cadastro com Sucesso!');
      axios
        .post(process.env.api_back + "usuario/new", {
          nom_usuario: this.nom_usuario,
          tex_login: this.tex_login,
          num_telefone: this.num_telefone,
          tex_email: this.tex_email,
          nom_usuario_criador: this.nom_usuario_criador,
          dat_criacao: agora,
          nom_usuario_ultima_alteracao: this.nom_usuario_ultima_alteracao,
          dat_ultima_alteracao: this.dat_ultima_alteracao,
          ind_bloqueado: this.ind_bloqueado,
        })
        .then(this.$router.push({ name: "usuariolist" }))
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 650px
  padding: auto
.my-page
  padding: 15px 15px 15px 15px
.my-button
  text-align: right
</style>
