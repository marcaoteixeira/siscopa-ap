<template>
  <q-page class="my-page">
    <q-card class="my-card">
      <h6>Administração Usuário</h6>
      <div align="right">
        <router-link :to="{ name: 'usuarionew' }">
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
            <th>Usuário</th>
            <th>Ponto</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.ide_usuario">
            <td style="width: 10px">{{ usuario.ide_usuario }}</td>
            <td style="width: 320px">{{ usuario.nom_usuario }}</td>
            <td style="width: 50px">{{ usuario.tex_login }}</td>
            <td style="width: 80px">{{ usuario.num_telefone }}</td>
            <td style="width: 100px">{{ usuario.tex_email }}</td>
            <td style="width: 130px">
              <router-link
                :to="{
                  name: 'usuarioupdate',
                  params: { id: usuario.ide_usuario },
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
                  showModalusuario(usuario.ide_usuario, usuario.nom_usuario)
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
              <b>{{ this.nomeUsuario }}?</b>
            </span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn
              flat
              label="Excluir"
              color="negative"
              @click="deleteUsuario()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- <div :class="{ modal: true, 'is-active': showModal }">
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
      </div> -->
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
      deleteUsuarioId: -1,
    };
  },
  methods: {
    clearpage() {
      this.$router.go("/usuario/usuarioupdate");
    },
    showModalusuario(ide_usuario, nom_usuario) {
      this.deleteUsuarioId = ide_usuario;
      this.nomeUsuario = nom_usuario;
      console.log(this.nomeUsuario);
      this.showdelete = true;
    },
    deleteUsuario() {
      axios
        .delete(process.env.api_back + "usuario/delete/" + this.deleteUsuarioId)
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
