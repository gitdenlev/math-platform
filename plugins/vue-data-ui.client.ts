import { defineNuxtPlugin } from "#app";
import { VueDataUi } from "vue-data-ui";
import "vue-data-ui/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VueDataUi", VueDataUi);
});
