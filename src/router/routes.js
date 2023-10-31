const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "produtoupdate",
        path: "/produtoupdate/:id",
        component: () => import("src/pages/ProdutoUpdate.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "produtonew",
        path: "/produto",
        component: () => import("pages/ProdutoNew.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "produtolist",
        path: "/produtolist",
        component: () => import("pages/ProdutoList.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "usuarioupdate",
        path: "/usuarioupdate/:id",
        component: () => import("src/pages/UsuarioUpdate.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "usuarionew",
        path: "/usuario",
        component: () => import("pages/UsuarioNew.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
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
