<template>
	<div id="popup" class="popup" v-if="display">
		<section>
			<h2>{{popupTitle}}</h2>
			<dl v-if="payment">
				<dt>상품 금액</dt>
				<dd class="price">{{replaceNum(totalPrice)}}</dd>
				<template v-if="discount.length > 0">
					<dt>할인 내역</dt>
					<dd>
						<dl>
							<template v-for="item in discount">
								<dt>{{item.name}}</dt>
								<dd class="price">{{replaceNum(item.price)}}</dd>
							</template>
						</dl>
					</dd>
				</template>
				<dt>총 결제 금액</dt>
				<dd class="price">{{replaceNum(resultPrice)}}</dd>
			</dl>
			<span v-if="payment"><button type="button" @click.prevent="complete">결제 완료</button><button type="button" class="bg_red" @click.prevent="close">결제 취소</button></span>
			<span v-else><button type="button" data-id="1" value="5" @click.prevent="selectCoupon">5% 쿠폰</button><button type="button" data-id="2" value="10" @click.prevent="selectCoupon">10% 쿠폰</button></span>
			<a href="#" class="xi xi-close close" v-if="!payment" @click.prevent="close"><span>닫기</span></a>
		</section>
	</div>
</template>
<script>
export default {
	data(){
		return {
			display : false,
			popupTitle : "",
			totalPrice : 0,
			payment : false,
			discount : [],
			resultPrice : 0,
			item : false
		};
	},
	created(){
		this.$EventBus.$on("popupOpen", (item, type) => {
			this.display = true;
			this.item = item;
			if(type === "cash" || type === "card"){
				if(this.$store.state.paymentToTal <= 0){
					this.display = false;
					alert("결제할 상품이 없습니다.");
					return false;
				};
				this.payment = true;
				this.totalPrice = this.$store.state.paymentToTal;
				this.discount.push({
					name : "쿠폰 할인",
					price : this.$store.state.paymentDiscount
				});
				if(type === "cash"){
					this.popupTitle = "현금 결제";
					this.discount.push({
						name : "현금 할인",
						price : Math.round(-this.$store.state.paymentResult * 0.05)
					});
					this.resultPrice = this.$store.state.paymentResult + Math.round(-this.$store.state.paymentResult * 0.05);
				};
				if(type === "card"){
					this.popupTitle = "카드 결제";
					this.resultPrice = this.$store.state.paymentResult;
				};
			}else if(type === "coupon"){
				this.popupTitle = "쿠폰 선택";
				this.payment = false;
				this.discount = [];
			};
		});
	},
	methods : {
		close(){
			this.display = false;
			this.popupTitle = "";
			this.totalPrice = 0;
			this.payment = false;
			this.discount = [];
			this.resultPrice = 0;
			this.item = false;
		},
		selectCoupon(e){
			const couponIndex = this.item.coupon.findIndex((val) => val.id === e.currentTarget.dataset.id);
			if(couponIndex > -1){
				this.item.coupon[couponIndex].value += 1;
				this.item.coupon[couponIndex].totalPrice = this.item.coupon[couponIndex].price * this.item.coupon[couponIndex].value;
			}else{
				this.item.coupon.push({
					id : e.currentTarget.dataset.id,
					name : e.currentTarget.value,
					value : 1,
					price : -(this.item.price * (e.currentTarget.value / 100)),
					totalPrice : -(this.item.price * (e.currentTarget.value / 100))
				});
			};
			this.close();
		},
		complete(){
			this.$store.state.orderList.forEach((val, index, arr) => {
				val.complete = true;
			});
			this.$store.state.income += this.$store.state.paymentResult;
			this.$store.state.paymentToTal = 0;
			this.$store.state.paymentDiscount = 0;
			this.$store.state.paymentResult = 0;
			this.$store.state.paymentComplete = this.$store.state.paymentResult;
			this.close();
		}
	}
};
</script>