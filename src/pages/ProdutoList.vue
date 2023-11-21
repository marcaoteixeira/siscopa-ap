<template>
  <q-page class="my-page">
    <q-card class="my-card">
      <h6>Administração Produto</h6>
      <div align="right">
        <router-link :to="{ name: 'produtonew' }">
          <q-btn
            icon="add_circle"
            label="Novo"
            push
            color="primary"
            class="my-button"
          />
        </router-link>
      </div>
      <table border="solid" align="center">
        <thead>
          <tr>
            <th>IDE</th>
            <th>Produto</th>
            <th>Preço</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="produto in produtos" :key="produto.ide_produto">
            <td style="width: 10px">{{ produto.ide_produto }}</td>
            <td style="width: 150px">{{ produto.nom_produto }}</td>
            <td style="width: 40px">{{ formatNumber(produto.num_preco) }}</td>
            <td style="width: 130px">
              <router-link
                :to="{
                  name: 'produtoupdate',
                  params: { id: produto.ide_produto },
                }"
              >
                <q-btn push color="primary" icon="edit" title="Editar"> </q-btn>
              </router-link>

              &nbsp;&nbsp;

              <q-btn
                push
                color="negative"
                icon="delete_forever"
                title="Excluir"
                @click="
                  showModalproduto(produto.ide_produto, produto.nom_produto)
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
              >Você tem certeza que deseja excluir
              <b>{{ this.nomeProduto }}?</b>
            </span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn
              flat
              label="Excluir"
              color="negative"
              @click="deleteProduto()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
      .post(process.env.api_back + "produto/list")
      .then((res) => {
        console.log(res);
        this.produtos = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      produtos: [],
      deleteProdutoId: -1,
    };
  },
  methods: {
    formatNumber(vnumber) {
      const formattedNumber = vnumber.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return formattedNumber;
    },
    clearpage() {
      this.$router.go("/produto/produtoupdate");
    },
    showModalproduto(ide_produto, nom_produto) {
      this.deleteProdutoId = ide_produto;
      this.nomeProduto = nom_produto;
      console.log(this.nomeProduto);
      this.showdelete = true;
    },
    deleteProduto() {
      axios
        .delete(process.env.api_back + "produto/delete/" + this.deleteProdutoId)
        .then((this.showdelete = false), this.clearpage())
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
