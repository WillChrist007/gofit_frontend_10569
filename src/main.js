import { createApp } from 'vue'
import App from './App.vue'

//import router
import router from './router'

//import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

//import toastvication
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import html2pdf from 'html2pdf.js';

const app = createApp(App)

app.use(router)
app.use(Toast)
app.use(html2pdf)

app.mount('#app')