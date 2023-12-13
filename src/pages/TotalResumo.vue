<template>
  <q-page class="my-page">
    <q-card class="my-card">
      <h6>Totais por Usuário</h6>
      
      <table border="solid" align="center">
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Telefone</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.ide_usuario">
            <td style="width: 320px">{{ usuario.nom_usuario }}</td>
            <td style="width: 80px">{{ usuario.num_telefone }}</td>
            <td style="width: 80px">{{ usuario.total }}</td>
          </tr>
        </tbody>
      </table>
      <br />

      
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
      showdelete: ref(false),
    };
  },
  created() {
    axios
      .post(process.env.api_back + "compra/pesquisatotal")
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
      deleteUsuarioId: -1,
    };
  },
  methods: {
    
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
