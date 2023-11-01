import { createRouter, createWebHashHistory } from "vue-router";
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
