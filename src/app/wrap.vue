<template>
	<section id="wrap">
		<header-component></header-component>
		<main>
			<product-component></product-component>
			<order-component></order-component>
		</main>
		<popup-component></popup-component>
	</section>
</template>
<script>
import header from "./layout/header.vue";
import product from "./layout/product.vue";
import order from "./layout/order.vue";
import popup from "./layout/popup.vue";
export default {
	components : {
		"header-component" : header,
		"product-component" : product,
		"order-component" : order,
		"popup-component" : popup
	}
};
</script>