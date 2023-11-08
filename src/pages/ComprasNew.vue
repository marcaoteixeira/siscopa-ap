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
      <div class="my-button">
        <q-btn push color="primary" label="Cadastrar" @click="cadastro" />
      </div> </q-card
    ><br />
    <table border="solid" align="center">
      <thead>
        <tr>
          <th>IDE</th>
          <th>Produto</th>
          <th>QTD.</th>
          <th>Ação</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="compra in compras" :key="compra.ide_compra">
          <td style="width: 10px">{{ compra.ide_compra }}</td>
          <td style="width: 50px">{{ compra.ide_produto }}</td>
          <td style="width: 80px">{{ compra.qtd_produto}}</td>
          <td style="width: 130px">
            <q-btn
              push
              color="negative"
              icon="delete_forever"
              title="Excluir"
              @click="
                showModalcompra(compra.ide_compra)
              "
            />
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <q-dialog v-model="showdelete" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="delete_forever"
              color="negative"
              text-color="white"
            />
            <span class="q-ml-sm"
              >Você tem certeza que deseja excluir a compra?
            </span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn
              flat
              label="Excluir"
              color="negative"
              @click="deleteCompra()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

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
      showdelete: ref(false),
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
    carregaListacompras(ide_compra) {
      axios.post("http://localhost:8080/compra/list") +
      this.modelusuario.ide_usuario
        .then((res) => {
          console.log(res);
          this.usuarios = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showModalcompra(ide_compra) {
      this.deleteCompraId = ide_compra;
      //this.nomeUsuario = nom_usuario;
      //console.log(this.nomeUsuario);
      this.showdelete = true;
    },
    deleteCompra() {
      axios
        .delete("http://localhost:8080/compra/delete/" + this.deleteCompraId)
        .then((this.showdelete = false), this.clearpage())
        .catch((error) => {
          console.log(error);
          this.showdelete = ref(false);
        });
    },
    clearpage() {
      this.$router.go("/produto/comprasnew");
    },
    cadastro() {
      const agora = new Date();
      console.log(agora);
      //this.$swal('Cadastro com Sucesso!');
      axios
        .post("http://localhost:8080/compra/new", {
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
        .then(this.$router.push({ name: "comprasnew" }))
        .catch((err) => {
          console.log(err.response);
        });
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
