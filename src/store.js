"use strict";
export default {
	state : {
		productList : [
			{
				takeOut : true,
				id : 1,
				title : "아메리카노 take out",
				name : "아메리카노",
				price : 500
			},{
				takeOut : false,
				id : 2,
				title : "아메리카노",
				name : "아메리카노",
				price : 1000
			},{
				takeOut : false,
				id : 3,
				title : "카페라떼",
				name : "카페라떼",
				price : 1500
			},{
				takeOut : false,
				id : 4,
				title : "카라멜 마끼야또",
				name : "카라멜 마끼야또",
				price : 2000
			}
		],
		orderList : [],
		paymentToTal : 0,
		paymentDiscount : 0,
		paymentResult : 0,
		paymentComplete : 0,
		income : 0
	}
};