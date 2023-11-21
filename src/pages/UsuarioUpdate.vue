<template>
  <q-page class="my-page">
    <q-card class="my-card">
      <q-card-section>
        <h5>Alteração de Produtos</h5>
        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="max-width: 500px">
            <q-input
              outlined
              v-model="nom_usuario"
              label="Nome do usuário"
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
              <q-btn push color="primary" label="Atualizar" @click="update" />
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
  created() {
    axios
      .get(process.env.api_back + "usuario/" + this.$route.params.id)
      .then((res) => {
        console.log(res);
        this.ide_usuario = res.data.ide_usuario;
        this.nom_usuario = res.data.nom_usuario;
        this.tex_login = res.data.tex_login;
        this.num_telefone = res.data.num_telefone;
        this.tex_email = res.data.tex_email;
        this.nom_usuario_criador = res.data.nom_usuario_criador;
        this.dat_criacao = res.data.dat_criacao;
        this.nom_usuario_ultima_alteracao =
          res.data.nom_usuario_ultima_alteracao;
        this.dat_ultima_alteracao = res.data.dat_ultima_alteracao;
        this.ind_bloqueado = res.data.ind_bloqueado;
      })
      .catch((err) => {
        console.log(err);
        this.$router.push({ name: "usuariolist" });
      });
  },

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
      this.$router.go("/usuario/usuarioupdate");
    },
    update() {
      const agora = new Date();
      console.log(agora);
      axios
        .put(process.env.api_back + "usuario/update", {
          ide_usuario: this.ide_usuario,
          nom_usuario: this.nom_usuario,
          tex_login: this.tex_login,
          num_telefone: this.num_telefone,
          tex_email: this.tex_email,
          nom_usuario_criador: this.nom_usuario_criador,
          dat_criacao: this.dat_criacao,
          nom_usuario_ultima_alteracao: agora,
          dat_ultima_alteracao: this.dat_ultima_alteracao,
          ind_bloqueado: this.ind_bloqueado,
        })
        .then(this.$router.push({ name: "usuariolist" }))
        .catch((err) => {
          console.log(err);
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
