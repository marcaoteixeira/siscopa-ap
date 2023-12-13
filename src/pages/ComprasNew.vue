<template>
  <q-page class="my-page">
    <q-card class="my-card">
      <h6>Lançamento de Compras</h6>
      <span>
        <q-select
          :model-value="modelusuario"
          @update:model-value="atribuiUsuario"
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
      >-->
        <br />
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
      </div>
    </q-card>
    <hr />
    <!--  <q-table
      flat
      bordered
      title="Compras"
      :rows="compras"
      :columns="columns"
      row-key="ide_compra"
      color="grey"
    /> -->
    <!--<GridCompras /> -->
    <br />
    <q-dialog v-model="showdelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_forever" color="negative" text-color="white" />
          <span class="q-ml-sm"
            >Você tem certeza que deseja excluir a compra
            <b>{{ this.nomeProduto }}?</b>
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
//import GridCompras from "src/components/GridCompras.vue";
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";

const columns = [
  {
    name: "name",
    required: true,
    label: "IDE",
    align: "left",
    field: "ide_compra",
    sortable: true,
  },
  {
    name: "produto",
    align: "center",
    label: "Produto",
    field: "nom_produto",
    sortable: true,
  },
  { name: "qtd", label: "QTD", field: "qtd_produto", sortable: true },
  { name: "dat_compra", label: "Data da Compra", field: "dat_compra" },
];

export default defineComponent({
  name: "ComprasNew",
  components: {
    //GridCompras,
  },
  setup() {
    return {
      modelusuario: ref(null),
      modelproduto: ref(null),
      showdelete: ref(false),
      columns,
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
        this.modelusuario = this.usuarios.find(
          (c) => c.ide_usuario == this.$route.params.id
        );
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
      componentKey: 0,
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        //timeStyle: "short",
        timeZone: "UTC",
      }).format(date);
    },
    atribuiUsuario(usuario) {
      this.modelusuario = usuario;
      console.log(process.env.API_PROD);
      this.$forceUpdate(this.modelusuario);
      //this.$forceUpdate(this.modelusuario);
      this.carregaListacompras();
    },
    carregaListacompras() {
      axios
        .post(
          process.env.api_back + "compra/list/" + this.modelusuario.ide_usuario
        )
        .then((res) => {
          console.log(res);
          this.compras = res.data;
          //this.$forceUpdate(this.modelusuario);
          console.log(this.compras);
        })
        .catch((err) => {
          console.log(err);
          this.compras = [];
        });
    },
    showModalcompra(ide_compra, nom_produto) {
      this.deleteCompraId = ide_compra;
      this.nomeProduto = nom_produto;
      //console.log(this.nomeUsuario);
      this.showdelete = true;
    },
    deleteCompra() {
      axios
        .delete(process.env.api_back + "compra/delete/" + this.deleteCompraId)
        .then(
          (this.showdelete = false),
          (this.compras = this.compras.filter(
            (c) => c.ide_compra != this.deleteCompraId
          ))
        )
        .catch((error) => {
          console.log(error);
          this.showdelete = ref(false);
        });
    },

    cadastro() {
      const agora = new Date();
      console.log(agora);
      //this.$swal('Cadastro com Sucesso!');
      axios
        .post(process.env.api_back + "compra/new", {
          ide_produto: this.modelproduto.ide_produto,
          nom_produto: this.modelproduto.nom_produto,
          num_preco: this.modelproduto.num_preco,
          ide_usuario: this.modelusuario.ide_usuario,
          qtd_produto: this.qtd_produto,
          dat_compra: this.dat_compra,
          ind_pago: this.ind_pago,
          nom_usuario_criador: this.nom_usuario_criador,
          dat_criacao: agora,
          nom_usuario_ultima_alteracao: this.nom_usuario_ultima_alteracao,
          dat_ultima_alteracao: this.dat_ultima_alteracao,
        })
        .then(
          this.$router.push({
            name: "compralist",
            params: { id: this.modelusuario.ide_usuario },
          })
        )
        //this.atribuiUsuario(this.modelusuario))
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
