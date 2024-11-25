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
      <div>
        <q-checkbox
          v-model="ind_pago"
          @update:model-value="carregaListacompras"
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
      <div align="right">
        <q-btn
          icon="add_circle"
          label="Pagar"
          push
          color="primary"
          class="my-button"
          @click="showModalpgto()"
        />

        <!-- <router-link
          :to="{
            name: 'pagarcompra',
            params: { id: modelusuario.ide_usuario },
          }"
        > -->

        <q-dialog v-model="showpgto" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="payments" color="primary" text-color="white" />
              <span class="q-ml-sm"
                >Você tem certeza que deseja confirmar o pagamento?
              </span>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="negative" v-close-popup />
              <q-btn
                flat
                label="Pagar"
                color="primary"
                @click="pagarCompra()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- </router-link> -->
      </div>
      <br />
    </q-card>

    <table border="solid" align="left">
      <div id="cliente-extrato">
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
              <span v-if="modelTotal > 0">
                <h6 class="my-totaln">Total: {{ formatNumber(modelTotal) }}</h6>
              </span>
              <span v-else-if="modelTotal <= 0">
                <h6 class="my-totalp">
                  Total: {{ formatNumber(-modelTotal) }}
                </h6>
              </span>
            </td>
          </tr>
        </tbody>
      </div>
      <div align="right">
        <q-btn
          push
          color="black"
          icon="print"
          label="Imprimir"
          @click="exportToPDF"
          v-close-popup
        />
        <p></p>
      </div>
    </table>
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
      modelusuario: ref(null),
      modelTotal: ref(null),
    };
  },
  created() {
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
      usuarios: [],
      compras: [],
      deleteCompraId: -1,
      showpgto: false,
      ind_pago: false,
      dat_compra_inicio: "",
      dat_compra_fim: "",
    };
  },
  methods: {
    totalCompras() {
      var total = 0;
      if (this.compras == [] || this.compras.length == 0) return 0;
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
      axios
        /*.post(
          process.env.api_back + "compra/list/" + this.modelusuario.ide_usuario
        )*/
        .post(process.env.api_back + "compra/pesquisa", {
          ide_usuario: this.modelusuario.ide_usuario,
          ind_pago: this.ind_pago,
          dat_compra_inicio: this.dat_compra_inicio,
          dat_compra_fim: this.dat_compra_fim,
        })
        .then((res) => {
          console.log(res);
          this.compras = res.data;
          this.modelTotal = this.totalCompras();
        })
        .catch((err) => {
          console.log(err);
          this.compras = [];
          this.modelTotal = this.totalCompras();
        });
    },
    showModalpgto() {
      this.showpgto = true;
    },
    pagarCompra() {
      const agora = new Date();
      console.log(agora);
      axios
        .put(process.env.api_back + "compra/pagar/", {
          ide_usuario: this.modelusuario.ide_usuario,
          dat_pagamento: agora,
          dat_ultima_alteracao: agora,
        })
        .then((this.showpgto = false), (this.modelTotal = 0), this.clearpage())
        .catch((err) => {
          console.log(err);
          this.showpgto = false;
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
    exportToPDF() {
      html2pdf(document.getElementById("cliente-extrato"), {
        margin: 1,
        filename: "totalresumo.pdf",
      });
    },
    clearpage() {
      this.$router.go("/extratocompra");
    },
  },
});
//comentario commit
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
