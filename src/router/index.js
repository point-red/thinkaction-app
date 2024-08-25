"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_router_1 = require("vue-router");
var routes_1 = require("@/modules/auth/routes");
var routes_2 = require("@/modules/main/routes");
var routes_3 = require("@/modules/template/routes");
var routes = [
    routes_1.routes,
    routes_2.routes,
    routes_3.routes,
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: function () { return Promise.resolve().then(function () { return require('../modules/main/views/page-not-found.vue'); }); }
    }
];
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(import.meta.env.BASE_URL),
    routes: routes
});
exports.default = router;
