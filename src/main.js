import "core-js/stable";
import Vue from "vue";
import App from "./App.vue";
import store from "./pages/components/nav/store";
import vuetify from "./extra/plugins/vuetify";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./extra/routes/routes";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./pages/components/nav/icons"
import axios from "axios";

axios.defaults.baseURL = "http://184.73.231.88:5000/api";
Vue.use(CoreuiVue);
Vue.use(ElementUI);
Vue.config.productionTip = false;
export const bus = new Vue();
new Vue({
    vuetify,
    router,
    store,
    icons,
    render: (h) => h(App),
}).$mount("#app");