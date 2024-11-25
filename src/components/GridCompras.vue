<template>
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
</template>
<script>
import { defineComponent } from "vue";
import ComprasNew from "src/pages/ComprasNew.vue";

export default defineComponent({
  name: "GridCompras",
  props: {},
  data() {
    return {
      compras: "",
    };
  },
});
</script>

<style scoped></style>
