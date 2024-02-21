<template>
  <div align="right">
    <q-btn
      push
      color="black"
      icon="print"
      label="Imprimir"
      @click="exportToPDF"
      v-close-popup
    />
  </div>
  <hr />

  <q-page class="my-page">
    <q-card class="my-card">
      <div>
        <q-checkbox
          v-model="ind_pago"
          @update:model-value="carregaListaTotais"
          left-label
          label="Pago"
        />
      </div>
      <q-input
          v-model="dat_compra_inicio"
          filled
          type="date"
          hint="Data Início"
          name="dat_compra_inicio"
          style="max-width: 150px"
        />
        <q-input
          v-model="dat_compra_fim"
          filled
          type="date"
          hint="Data Fim"
          name="dat_compra_fim"
          style="max-width: 150px"
        />
      <h6>Totais por Usuário</h6>
      <div id="total-resumo">
        <table border="solid" align="center">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.ide_usuario">
              <td style="width: 320px">{{ usuario.nom_usuario }}</td>
              <span v-if="usuario.total > 0">
                <td class="my-totaln" style="width: 80px">
                  {{ formatNumber(usuario.total) }}
                </td>
              </span>
              <span v-else-if="usuario.total <= 0">
                <td class="my-totalp" style="width: 80px">
                  {{ formatNumber(-usuario.total) }}
                </td>
              </span>
            </tr>
            <tr>
              <td colspan="2">
                <h8 class="my-totaln">
                  <b>Total: {{ formatNumber(this.totalCompras()) }}</b>
                </h8>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";
import html2pdf from "html2pdf.js";

export default defineComponent({
  setup() {
    return {
      showdelete: ref(false),
    };
  },
  created() {
    axios
    
      .post(process.env.api_back + "compra/pesquisatotal",{
          ind_pago: this.ind_pago,
          dat_compra_inicio: this.dat_compra_inicio,
          dat_compra_fim: this.dat_compra_fim,
        })
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
      output: null,
      usuarios: [],
      deleteUsuarioId: -1,
      ind_pago: 0,
      dat_compra_inicio: "",
      dat_compra_fim: "",
    };
  },
  methods: {
    carregaListaTotais() {
      axios
      .post(process.env.api_back + "compra/pesquisatotal", {
          ind_pago: this.ind_pago,
          dat_compra_inicio: this.dat_compra_inicio,
          dat_compra_fim: this.dat_compra_fim,
        })
      .then((res) => {
        console.log(res);
        this.usuarios = res.data;
      })
      .catch((err) => {
        console.log(err);
        this.usuarios = [];
      });
    },
    exportToPDF() {
      html2pdf(document.getElementById("total-resumo"), {
        margin: 1,
        filename: "totalresumo.pdf",
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
    totalCompras() {
      var total = 0;
      if (this.usuarios == [] || this.usuarios.length == 0) return 0;
      for (var i = 0; i < this.usuarios.length; i++) {
        total += this.usuarios[i].total;
        //total += (this.compras.num_preco[i])
      }
      return total;
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
.my-totaln {
  color: red;
}
.my-totalp {
  color: green;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
