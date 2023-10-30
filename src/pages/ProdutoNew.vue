<template>
  <q-page class="my-page">
    <q-card class="my-card">
      <q-card-section>
        <h5>Cadastro de Produtos</h5>
        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="max-width: 500px">
            <q-input
              outlined
              v-model="nom_produto"
              label="Nome do produto"
              name="nom_produto"
            />
            <q-input
              outlined
              v-model="num_preco"
              label="Preço"
              name="num_produto"
            />
            <div>
              <q-checkbox
                left-label
                v-model="ind_bloqueado"
                label="Produto não disponível"
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
      nom_produto: null,
      num_preco: null,
      nom_usuario_criador: null,
      dat_criacao: null,
      nom_usuario_ultima_alteracao: null,
      dat_ultima_alteracao: null,
      ind_bloqueado: false,
    };
  },

  methods: {
    clearpage() {
      this.$router.go("/produtolist");
    },
    cadastro() {
      const agora = new Date();
      console.log(agora);
      //this.$swal('Cadastro com Sucesso!');
      axios
        .post("http://localhost:8080/produto/new", {
          nom_produto: this.nom_produto,
          num_preco: this.num_preco,
          nom_usuario_criador: this.nom_usuario_criador,
          dat_criacao: agora,
          nom_usuario_ultima_alteracao: this.nom_usuario_ultima_alteracao,
          dat_ultima_alteracao: this.dat_ultima_alteracao,
          ind_bloqueado: this.ind_bloqueado,
        })
        .then(this.$router.push({ name: "produtolist" }))
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
