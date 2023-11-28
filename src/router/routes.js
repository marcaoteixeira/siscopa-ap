import { createRouter, createWebHashHistory } from "vue-router";

// API Desenvolvimento
const useapi = process.env.API_DEV;
// API Produção
//const useapi = process.env.API_PROD

const routes = [
  {
    path: "/",
    component: () => import("pages/Home.vue"),
    children: [
      {
        name: "produtoupdate",
        path: "/produtoupdate/:id",
        component: () => import("src/pages/ProdutoUpdate.vue"),
      },
      {
        name: "produtonew",
        path: "/produto",
        component: () => import("pages/ProdutoNew.vue"),
      },
      {
        name: "produtolist",
        path: "/produtolist",
        component: () => import("pages/ProdutoList.vue"),
      },
      {
        name: "usuarioupdate",
        path: "/usuarioupdate/:id",
        component: () => import("src/pages/UsuarioUpdate.vue"),
      },
      {
        name: "usuarionew",
        path: "/usuario",
        component: () => import("pages/UsuarioNew.vue"),
      },
      {
        name: "usuariolist",
        path: "/usuariolist",
        component: () => import("pages/UsuarioList.vue"),
      },
      {
        name: "comprasnew",
        path: "/comprasnew/:id",
        component: () => import("pages/ComprasNew.vue"),
      },
      {
        name: "compranovo",
        path: "/compra",
        component: () => import("pages/CompraNovo.vue"),
      },
      {
        name: "compralist",
        path: "/compralist/:id",
        component: () => import("pages/CompraList.vue"),
      },
      {
        name: "extratocompra",
        path: "/extratocompra",
        component: () => import("src/pages/ExtratoCompra.vue"),
      },
      {
        name: "totalcompra",
        path: "/totalcompra",
        component: () => import("src/pages/TotalCompra.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
