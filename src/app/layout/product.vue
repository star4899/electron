<template>
	<section id="product">
		<ul>
			<template v-for="item in $store.state.productList">
				<li :class="{take_out : item.takeOut}">
					<a href="#" :title="item.title" :data-id="item.id" @click.prevent="$EventBus.$emit('order', $event)">
						<span class="name">{{item.name}}</span>
						<span class="price">{{replaceNum(item.price)}}</span>
					</a>
				</li>
			</template>
		</ul>
	</section>
</template>