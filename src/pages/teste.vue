<template>
  <div>
    <h1 class="title">Administração Produto</h1>
    <div>
      <table class="table" align="center">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="produto in produtos" :key="produto.ide_produto">
            <td style="text-align: left">{{ produto.nom_produto }}</td>
            <td style="text-align: left">{{ produto.num_preco }}</td>
            <td>
              <router-link
                :to="{
                  name: 'produtoedit',
                  params: { id: produto.ide_produto },
                }"
                ><q-btn push color="primary" label="Editar" /></router-link
              >&nbsp;&nbsp;
              <q-btn
                color="negative"
                label="Excluir"
                @click="showModalproduto(produto.ide_produto)"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="signal_wifi_off"
              color="primary"
              text-color="white"
            />
            <span class="q-ml-sm"
              >You are currently not connected to any network.</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div :class="{ modal: true, 'is-active': showModal }">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Você deseja realmente excluir essa Comissão???
              </p>
              <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </header>
            <div class="card-content">
              <div class="content">
                <img src="../../../public/img/warning.jpg" alt="Atenção" />
                <br />
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item" @click="hideModal()"
                >Cancelar</a
              >
              <a href="#" class="card-footer-item" @click="deleteComis()"
                >Excluir</a
              >
            </footer>
          </div>
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          @click="hideModal()"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
import axios from "axios";

export default {
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
  },
  data() {
    return {
      produtos: [],
      showModal: false,
      deleteProdutoId: -1,
    };
  },
  methods: {
    hideModal() {
      this.showModal = false;
    },
    showModalcomissao(ide_produto) {
      this.deleteProdutoId = ide_produto;
      this.showModal = true;
    },
    deleteComis() {
      axios
        .delete("http://localhost:8080/produto/delete/" + this.deleteProdutoId)
        .then(
          (this.showModal = false),
          (this.produtos = this.comissoes.filter(
            (c) => c.id != this.deleteProdutoId
          ))
        )
        .catch((error) => {
          console.log(error);
          this.showModal = false;
        });
    },
  },
};
</script>
<style scoped></style>
