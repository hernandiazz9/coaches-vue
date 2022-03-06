import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
import router from "./router";
import store from "./store";
import BaseCard from "./component/UI/BaseCard.vue";
import BaseButton from "./component/UI/BaseButton.vue";
import BaseBadge from "./component/UI/BaseBadge.vue";
import BaseSpinner from "./component/UI/BaseSpinner.vue";
import BaseDialog from "./component/UI/BaseDialog.vue";

app.use(router);
app.use(store);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-badge", BaseBadge);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);

app.mount("#app");
