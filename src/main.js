import { createApp } from "vue";
import App from "./App.vue";

import TheHeader from "./components/TheHeader.vue";
import TheSearch from "./components/TheSearch.vue";
import TheFilter from "./components/TheFilter.vue";

const app = createApp(App);

app.component("the-header", TheHeader);
app.component("the-search", TheSearch);
app.component("the-filter", TheFilter);

app.mount("#app");
