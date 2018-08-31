"use strict";
export default {
	install(Vue, option){
		Vue.prototype.replaceNum = function(n){
			return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}
};