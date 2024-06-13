<template>
	<view class="content">
		<button @click="jump360">360全景页面</button>
		
	</view>
</template>
<style>
	
</style>
<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
			jump360(){
				uni.navigateTo({
					url:'/pages/reserve/reserve'
				})
			}

		}
	}
</script>
