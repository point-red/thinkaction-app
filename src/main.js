"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var pinia_1 = require("pinia");
var main_app_vue_1 = require("./main-app.vue");
var router_1 = require("./router");
var vue3_google_login_1 = require("vue3-google-login");
// unocss
require("@unocss/reset/tailwind.css");
require("./assets/css/main.css");
require("virtual:uno.css");
require("uno.css");
// highlightjs
require("highlight.js/styles/atom-one-dark.css");
require("highlight.js/lib/common");
var vue_plugin_1 = require("@highlightjs/vue-plugin");
// notificaton
var vue3_notification_1 = require("@kyvg/vue3-notification");
// cleave
var cleave_js_1 = require("cleave.js");
// tippy
var vue_tippy_1 = require("vue-tippy");
require("tippy.js/dist/tippy.css");
var dayjs_1 = require("dayjs");
var relativeTime_1 = require("dayjs/plugin/relativeTime");
dayjs_1.default.extend(relativeTime_1.default);
var app = (0, vue_1.createApp)(main_app_vue_1.default);
app.directive('cleave', {
    mounted: function (el, binding) {
        el.cleave = new cleave_js_1.default(el, binding.value || {});
    }
});
app.directive('click-outside', {
    mounted: function (element, binding, vnode) {
        element.clickOutsideEvent = function (event) {
            var _a, _b;
            //  check that click was outside the el and his children
            if (!(element === event.target || element.contains(event.target))) {
                // and if it did, call method provided in attribute value
                (_b = (_a = vnode.props) === null || _a === void 0 ? void 0 : _a['on:onClickOutside']) === null || _b === void 0 ? void 0 : _b.call(_a, event);
                // binding.value(); run the arg
            }
        };
        document.body.addEventListener('click', element.clickOutsideEvent);
    },
    unmounted: function (element) {
        document.body.removeEventListener('click', element.clickOutsideEvent);
    }
});
app.use(vue_tippy_1.plugin);
app.use(router_1.default);
app.use(vue_plugin_1.default);
app.use(vue3_notification_1.default);
app.use((0, pinia_1.createPinia)());
app.use(vue3_google_login_1.default, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
});
app.mount('#app');
