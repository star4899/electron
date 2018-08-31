"use strict";
import "./scss/common.scss";
import "./scss/ui.scss";


import Vue from 'vue';
import Vuex from 'vuex';
import wrap from './app/wrap.vue';
import VuexStore from "./store";
import plugin from "./plugin";
Vue.use(Vuex);
const store = new Vuex.Store(VuexStore);

Vue.use(plugin);

Vue.prototype.$EventBus = new Vue();
new Vue({
	el : "#wrap",
	store,
	render : c => c(wrap)
});