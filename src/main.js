import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ServerTable } from 'vue-tables-2';

dom.watch();
library.add(fas);

Vue.use(ServerTable);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

new Vue({
  el: '#app',
  render: h => h(App)
})
