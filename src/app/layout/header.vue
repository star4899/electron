<template>
	<header>
		<h1>POS(webpack, vueJS, scss)</h1>
		<dl>
			<dt>개발자</dt>
			<dd>정승용</dd>
			<dt>버전</dt>
			<dd>1.0</dd>
			<dt>총 수입</dt>
			<dd>{{replaceNum(totalIncome)}}</dd>
		</dl>
	</header>
</template>
<script>
export default {
	computed : {
		totalIncome(){
			return this.$store.state.income;
		}
	}
};
</script>