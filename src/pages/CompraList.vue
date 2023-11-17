<template>
  <q-page class="my-page">
    <q-card class="my-card">
      <span v-for="usuario in usuarios" :key="usuario.ide_usuario">
        <h5>{{ usuario.nom_usuario }}</h5></span
      >
      <div align="right">
        <router-link :to="{ name: 'comprasnew' }">
          <q-btn
            icon="add_circle"
            label="Novo"
            push
            color="primary"
            class="my-button"
          />
        </router-link>
      </div>
    </q-card>
    <hr />
    <table border="solid" align="left">
      <thead>
        <tr>
          <th>IDE</th>
          <th>Produto</th>
          <th>QTD.</th>
          <th>Data Compra</th>
          <th>Ação</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="compra in compras" :key="compra.ide_compra">
          <td style="width: 10px; text-align: right">
            {{ compra.ide_compra }}
          </td>
          <td style="width: 450px">{{ compra.nom_produto }}</td>
          <td style="width: 20px; text-align: center">
            {{ compra.qtd_produto }}
          </td>
          <td style="width: 280px; text-align: right">
            {{ formatDate(compra.dat_compra) }}
          </td>
          <td style="width: 30px">
            <q-btn
              push
              color="negative"
              icon="delete_forever"
              title="Excluir"
              @click="showModalcompra(compra.ide_compra, compra.nom_produto)"
            />
          </td>
        </tr>
      </tbody>
    </table>
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
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";

export default defineComponent({
  setup() {
    return {
      showdelete: ref(false),
    };
  },
  created() {
    axios
      .post("http://localhost:8080/usuario/list")
      .then((res) => {
        console.log(res);
        this.usuarios = res.data;
        this.usuarios = this.usuarios.filter(
          (c) => c.ide_usuario == this.$route.params.id
        );
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("http://localhost:8080/compra/list/" + this.$route.params.id)
      .then((res) => {
        console.log(res);
        console.log(this.$route.params.id);
        this.compras = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      usuario: "",
      compras: [],
      usuarios: [],
      deleteCompraId: -1,
    };
  },
  methods: {
    formatNumber(vnumber) {
      if (vnumber == null) {
        return 0;
      }
      const formattedNumber = vnumber.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return formattedNumber;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        //timeStyle: "short",
        timeZone: "UTC",
      }).format(date);
    },
    showModalcompra(ide_compra, nom_produto) {
      this.deleteCompraId = ide_compra;
      this.nomeProduto = nom_produto;
      //console.log(this.nomeUsuario);
      this.showdelete = true;
    },
    deleteCompra() {
      axios
        .delete("http://localhost:8080/compra/delete/" + this.deleteCompraId)
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
