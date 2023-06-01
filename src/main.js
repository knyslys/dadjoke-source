import "./assets/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import Particles from "vue3-particles";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(autoAnimatePlugin);
app.use(createPinia());
app.use(router);
app.use(Particles);

app.mount("#app");
