<template>
  <q-page class="my-page">
    <q-card class="my-card">
      <h6>Lançamento de Compras</h6>
      <span>
        <q-select
          v-model="modelusuario"
          :options="usuarios"
          option-value="ide_usuario"
          option-label="nom_usuario"
          hint="Usuário"
          name="ide_usuario"
        />
        <q-select
          v-model="modelproduto"
          :options="produtos"
          option-value="ide_produto"
          option-label="nom_produto"
          hint="Produto"
          name="ide_produto"
        />

        <!-- <span>Escolha o Usuário:</span>&nbsp;
        <select class="my-select" name="ide_usuario" v-model="ide_usuario">
          <option
            v-for="usuario in usuarios"
            :key="usuario.ide_usuario"
            :value="usuario.ide_usuario"
            name="usuario.ide_usuario"
          >
            {{ usuario.nom_usuario }}
          </option>
        </select> </span
      ><br /><br />
      <span>
        <span>Escolha o produto:</span>&nbsp;
        <select class="my-select" name="ide_produto" v-model="ide_produto">
          <option
            v-for="produto in produtos"
            :key="produto.ide_produto"
            :value="produto.ide_produto"
            name="produto.ide_produto"
          >
            {{ produto.nom_produto }}
          </option>
        </select> </span
      >--><br />
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
      </span>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";

export default defineComponent({
  setup() {
    return {
      modelusuario: ref(null),
      modelproduto: ref(null),
    };
  },
  created() {
    axios
      .post("http://localhost:8080/produto/list")
      .then((res) => {
        console.log(res);
        this.produtos = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("http://localhost:8080/usuario/list")
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
      ide_produto: "",
      ide_usuario: "",
      qtd_produto: "",
      dat_compra: "",
      produtos: [],
      usuarios: [],
    };
  },
  methods: {
    clearpage() {
      this.$router.go("/produto/produtoupdate");
    },
  },
});
</script>
<style scoped>
.my-card {
  width: 100%;
  height: 100%;
  max-width: 850px;
  padding: 5px 15px 10px 15px;
}
.my-input {
  width: 350px;
  height: 30px;
  background-color: rgb(250, 253, 253);
  font-size: medium;
  cursor: pointer;
}
.my-page {
  padding: 15px 15px 15px 15px;
}
.my-button {
  text-align: right;
  margin-bottom: 10px;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
