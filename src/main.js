import "core-js/stable";
import Vue from "vue";
import App from "./App.vue";
import store from "./pages/components/nav/store";
import vuetify from "./extra/plugins/vuetify";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./extra/routes/routes";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./pages/components/nav/icons";
import locale from "element-ui/lib/locale/lang/es";
import axios from "axios";

axios.defaults.baseURL = "http://184.73.231.88:5000/api";
Vue.use(CoreuiVue);
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

const ignoredMessage =
    "The .native modifier for v-on is only valid on components but it was used on <div>.";
Vue.config.warnHandler = (message, vm, componentTrace) => {
    if (message !== ignoredMessage) {
        console.error(message + componentTrace);
    }
};

export const bus = new Vue();
new Vue({
    vuetify,
    router,
    store,
    icons,
    render: (h) => h(App),
}).$mount("#app");