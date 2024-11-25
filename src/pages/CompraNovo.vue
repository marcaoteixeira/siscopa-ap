<template>
  <q-page class="my-page">
    <q-card class="my-card">
      <q-card-section>
        <h5>Cadastro de Compras</h5>
        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="max-width: 500px">
            <q-select
              v-model="modelusuario"
              :options="usuarios"
              option-value="ide_usuario"
              option-label="nom_usuario"
              hint="Usuário"
            />
            <q-select
              v-model="modelproduto"
              :options="produtos"
              option-value="ide_produto"
              option-label="nom_produto"
              hint="Produto"
              name="ide_produto"
            />
            <q-input
              outlined
              v-model="qtd_produto"
              type="number"
              filled
              hint="Quantidade"
              name="qtd_produto"
              style="max-width: 90px"
            /><br />
            <q-input
              v-model="dat_compra"
              filled
              type="date"
              hint="Data da compra"
              name="dat_compra"
              style="max-width: 150px"
            />
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
      modelusuario: ref(null),
      modelproduto: ref(null),
    };
  },

  created() {
    axios
      .post(process.env.api_back + "produto/list")
      .then((res) => {
        console.log(res);
        this.produtos = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(process.env.api_back + "usuario/list")
      .then((res) => {
        console.log(res);
        this.usuarios = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  data() {
    return {
      ide_usuario: "",
      ide_produto: "",
      qtd_produto: 1,
      dat_compra: "",
      ind_pago: "",
      nom_usuario_criador: "",
      dat_criacao: "",
      nom_usuario_ultima_alteracao: "",
      dat_ultima_alteracao: "",
      produtos: [],
      usuarios: [],
      compras: [],
      deleteCompraId: -1,
    };
  },

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        //timeStyle: "short",
        //timeZone: "UTC",
      }).format(date);
    },

    clearpage() {
      this.$router.go("/produto/comprasnew");
    },
    cadastro() {
      const agora = new Date();
      console.log(agora);
      //this.$swal('Cadastro com Sucesso!');
      axios
        .post(process.env.api_back + "compra/new", {
          ide_produto: this.modelproduto.ide_produto,
          ide_usuario: this.modelusuario.ide_usuario,
          qtd_produto: this.qtd_produto,
          dat_compra: this.dat_compra,
          ind_pago: this.ind_pago,
          nom_usuario_criador: this.nom_usuario_criador,
          dat_criacao: agora,
          nom_usuario_ultima_alteracao: this.nom_usuario_ultima_alteracao,
          dat_ultima_alteracao: this.dat_ultima_alteracao,
        })
        .then(this.$router.push({ name: "compralist" }))
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
