<template>
	<section id="order">
		<section id="list">
			<template v-if="$store.state.orderList.length > 0">
				<ul>
					<template v-for="(item, index) in $store.state.orderList">
						<li class="order_list" :class="{take_out : item.takeOut, complete : item.complete}" :data-id="item.id">
							<div>
								<span class="name" title="제품명">{{item.name}}</span>
								<span class="value" title="수량">
									<button type="button" class="xi xi-minus-min" title="수량 감소" @click.prevent="valueChange($store.state.orderList, index, -1)" v-if="!item.complete"><span>수량 감소</span></button><span>{{item.value}}</span><button type="button" class="xi xi-plus-min" title="수량 증가" @click.prevent="valueChange($store.state.orderList, index, 1)" v-if="!item.complete"><span>수량 증가</span></button>
								</span>
								<span class="price" title="정상 금액">{{replaceNum(item.totalPrice)}}</span>
								<a href="#" class="xi xi-coupon" title="쿠폰 적용" v-if="!item.takeOut && !item.complete" @click.prevent="$EventBus.$emit('popupOpen', item,'coupon')"><span>쿠폰</span></a>
								<span class="xi xi-coupon disabled_btn" v-else><span>쿠폰</span></span>
								<a href="#" class="xi xi-trash-o" title="삭제" @click.prevent="valueChange($store.state.orderList, index, 0)" v-if="!item.complete"><span>삭제</span></a><span class="xi xi-trash-o disabled_btn" v-else><span>삭제</span></span>
							</div>
							<template v-for="(t, i) in item.coupon">
								<div class="coupon" :data-id="t.id">
									<span class="name" title="쿠폰명">{{t.name}}</span>
									<span class="value" title="수량">
										<button type="button" class="xi xi-minus-min" title="수량 감소" @click.prevent="valueChange(item.coupon, i, -1)" v-if="!item.complete"><span>수량 감소</span></button><span>{{t.value}}</span><button type="button" class="xi xi-plus-min" title="수량 증가" @click.prevent="valueChange(item.coupon, i, 1)" v-if="!item.complete"><span>수량 증가</span></button>
									</span>
									<span class="price" title="쿠폰 할인 금액">{{replaceNum(t.totalPrice)}}</span>
									<a href="#" class="xi xi-trash-o" title="삭제" @click.prevent="valueChange(item.coupon, i, 0)" v-if="!item.complete"><span>삭제</span></a>
									<span class="xi xi-trash-o disabled_btn" v-else><span>삭제</span></span>
								</div>
							</template>
						</li>
					</template>
				</ul>
			</template>
		</section>
		<section id="total_price">
			<p>{{replaceNum(sumPrice)}}</p>
		</section>
		<section id="payment_btn">
			<button type="button" @click="$EventBus.$emit('popupOpen', null,'card')">카드 결제</button><button type="button" @click="$EventBus.$emit('popupOpen', null,'cash')">현금 결제</button>
		</section>
		<section id="order_btn">
			<button type="button" class="bg_blue" @click.prevent="orderComplete">주문 완료</button><button type="button" class="bg_red" @click.prevent="orderCancel">주문 취소</button>
		</section>
	</section>
</template>
<script>
export default {
	created(){
		this.$EventBus.$on("order", (e) => {
			const _id = Number(e.currentTarget.dataset.id);
			const fi = this.$store.state.orderList.findIndex((val) => val.id === _id && val.complete === false);
			if(fi > -1){
				this.valueChange(this.$store.state.orderList, fi, 1);
			}else{
				const i = this.$store.state.productList.findIndex((val) => val.id === _id);
				if(i > -1){
					this.$store.state.orderList.push({
						takeOut : this.$store.state.productList[i].takeOut,
						id : this.$store.state.productList[i].id,
						name : this.$store.state.productList[i].name,
						value : 1,
						price : this.$store.state.productList[i].price,
						totalPrice : this.$store.state.productList[i].price,
						coupon : [],
						complete : false
					});
				};
			};
		});
		this.$EventBus.$on("reSumPrice", () => {
			this.$computed.sumPrice()
		});
	},
	computed : {
		sumPrice(){
			let productSum = 0, couponSum = 0;
			const orderLength = this.$store.state.orderList.length;
			for(let i = 0; i < orderLength; i++){
				if(!this.$store.state.orderList[i].complete){
					const couponLength = this.$store.state.orderList[i].coupon.length;
					productSum += this.$store.state.orderList[i].totalPrice;
					for(let n = 0; n < couponLength; n++){
						couponSum += this.$store.state.orderList[i].coupon[n].totalPrice;
					};
				};
			};
			this.$store.state.paymentToTal = productSum;
			this.$store.state.paymentDiscount = couponSum;
			this.$store.state.paymentResult = productSum + couponSum - this.$store.state.paymentComplete;
			return this.$store.state.paymentResult;
		}
	},
	methods : {
		confirm(text){
			return confirm(text);
		},
		valueChange(list, index, n){
			if(list[index].value + n > 0 && n !== 0){
				list[index].value = list[index].value + n;
				list[index].totalPrice = list[index].price * list[index].value;
			}else{
				confirm('선택 상품을 삭제 하시겠습니까?') && list.splice(index, 1);
			};
		},
		orderReset(){
			this.$store.state.orderList = [];
			this.$store.state.paymentToTal = 0;
			this.$store.state.paymentDiscount = 0;
			this.$store.state.paymentResult = 0;
			this.$store.state.paymentComplete = 0;
		},
		orderComplete(){
			const i = this.$store.state.orderList.findIndex((val) => val.complete === false);
			let text = (i > -1) ? "완료되지 않은 주문이 있습니다.\n주문을 취소 하시겠습니까?" : "주문을 완료 하시겠습니까?";
			if(confirm(text)){
				this.orderReset();
			};
		},
		orderCancel(){
			if(confirm("주문을 취소 하시겠습니까?")){
				this.orderReset();
			};
		}
	}
};
</script>