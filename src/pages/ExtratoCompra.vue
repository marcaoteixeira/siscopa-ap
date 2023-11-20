<template>
  <q-page class="my-page">
    <q-card class="my-card">
      <h6>Extrato Compras</h6>
      <q-select
        :model-value="modelusuario"
        @update:model-value="atribuiUsuario"
        :options="usuarios"
        option-value="ide_usuario"
        option-label="nom_usuario"
        hint="Usuário"
      />
      <div align="right">
        <!-- <router-link
          :to="{
            name: 'pagarcompra',
            params: { id: modelusuario.ide_usuario },
          }"
        > -->
        <q-btn
          icon="add_circle"
          label="Pagar"
          push
          color="primary"
          class="my-button"
          @click="pagarCompra()"
        />
        <!-- </router-link> -->
      </div>
      <br />
    </q-card>
    <table border="solid" align="left">
      <thead>
        <tr>
          <th>IDE</th>
          <th>Produto</th>
          <th>QTD.</th>
          <th>Preço</th>
          <th>Data Compra</th>
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
          <td style="width: 40px">{{ formatNumber(compra.num_preco) }}</td>
          <td style="width: 280px; text-align: right">
            {{ formatDate(compra.dat_compra) }}
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <h6>Total: {{ formatNumber(modelTotal) }}</h6>
          </td>
        </tr>
      </tbody>
    </table>
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
      modelTotal: ref(null),
    };
  },
  created() {
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
      usuarios: [],
      compras: [],
      deleteCompraId: -1,
    };
  },
  methods: {
    totalCompras() {
      var total = 0;
      if (this.compras == [] || this.compras.length == 0) return 5;
      for (var i = 0; i < this.compras.length; i++) {
        total += this.compras[i].num_preco * this.compras[i].qtd_produto;
        //total += (this.compras.num_preco[i])
      }
      return total;
    },
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
      this.carregaListacompras();
    },
    carregaListacompras() {
      console.log("oi " + this.modelusuario.ide_usuario);
      axios
        .post(
          "http://localhost:8080/compra/list/" + this.modelusuario.ide_usuario
        )
        .then((res) => {
          console.log(res);
          this.compras = res.data;
          this.modelTotal = this.totalCompras();
        })
        .catch((err) => {
          console.log(err);
          this.compras = [];
        });
    },
    pagarCompra() {
      const agora = new Date();
      console.log(agora);
      axios
        .put("http://localhost:8080/compra/pagar/", {
          ide_usuario: this.modelusuario.ide_usuario,
          dat_ultima_alteracao: agora,
        })
        .then(this.$router.push({ name: "extratocompra" }))
        .catch((err) => {
          console.log(err);
        });
    },
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
