<template>
	<view class="box-main">

		<view class="video-control">

			<view class="item">


				<view class="display-box">
					<image :src="item_1" class="max" @load="load_succ(1)"></image>
				</view>

				<view v-if="loading_item_1" class="loading-box">
					<image :src="loading_gif" mode="" class="loading"></image>

				</view>
			</view>
			<view class="item">
				<view class="display-box">
					<image :src="item_2" class="max" @load="load_succ(2)"></image>

				</view>
				<view v-if="loading_item_2" class="loading-box">
					<image v-if="loading_item_2" :src="loading_gif" mode="" class="loading"></image>

				</view>
			</view>
		</view>

	</view>


	<uni-popup ref="popup" type="bottom">
		<view class="main">
			<uni-collapse>

				<view v-for="i in render_open_bottom">



					<view v-if="i.type == 0" @click="click_do(i.click_do,i.subtype)">
						<uni-list-item class="ix" :title="i.title" :disabled="i.disable"></uni-list-item>
					</view>


					<uni-collapse-item class="ix" v-if="i.type == 1" :title="i.title" :disabled="i.disable">
						<uni-list @click="click_do(j.click_do,j.subtype)" v-for="j in i.sub">
							<uni-list-item class="ix" :title="j.title" :disabled="j.disable"></uni-list-item>
						</uni-list>

					</uni-collapse-item>


				</view>

			</uni-collapse>
		</view>
	</uni-popup>

	<view class="tabar">
		<view @click="tabarEvent('focus')">
			<view>
				<image src="../../static/focus.png" mode="" class="icon"></image>

			</view>
			<view>
				专注
			</view>
		</view>
		<view style="margin-left: 5vw;" @click="tabarEvent('calibration')">
			<view>
				<image src="../../static/calibration.png" mode="" class="icon"></image>

			</view>
			<view>
				标定
			</view>
		</view>
		<view style="margin-left: 5vw;" @click="tabarEvent('close')">
			<view>
				<image src="../../static/close_icon.png" mode="" class="icon"></image>

			</view>
			<view>
				关闭
			</view>
		</view>
	</view>

</template>
<style>
	@import url('../../static/common.css');
</style>
<style scoped>
	.icon {
		width: 2vw;
		height: 1.8vw;
	}



	.tabar {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		font-size: 1vw;
		max-height: 10%;


	}


	.video-control {
		display: flex;
		gap: 20rpx;
		height: 100vh;
		/* padding-left: 2vw; */
		/* padding-right: 2vw; */
		justify-content: space-evenly;
		position: relative;
		top: 5%;

	}

	.hidden {
		display: none;
	}

	.item {
		width: 80vh;
		height: 80vh;
		background-color: #f5f5f5;
		position: relative;
	}

	.loading {
		width: 30%;
		height: 30%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

	}

	.loading-box {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
		position: absolute;
		top: 0;
		left: 0;
		/* transition: all 300ms; */
	}

	.max {
		width: 100%;
		height: 100%;
	}

	.display-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 990;
	}
</style>
<script>
	import request from '@/static/request/request.js'
	export default {
		data() {
			return {
				loading_gif: '/static/loading.gif',
				item_1: null,
				item_2: null,
				loading_item_1: true,
				loading_item_2: true,
			}
		},
		onLoad() {
			request.get('/api/camera/getOriginal').then(res => {
				this.item_1 = request.base_url(res.data.data.left)

			})
			request.get('/api/camera/getPanoramicImage').then((res) => {
				this.item_2 = request.base_url(res.data.msg)
			})
		},
		methods: {
			load_succ(index) {
				console.log(index);
				if (index == 1) {
					setTimeout(() => {
						this.loading_item_1 = false
					}, 1000)
				} else {
					setTimeout(() => {
						this.loading_item_2 = false
					}, 1000)
				}
			},
			get_picture(type, quji = false) {
				if (type == '360') {
					var uri = '/api/camera/getPanoramicImage'
				} else if (this.quji || quji) {
					var uri = '/api/camera/getOriginal'
				} else {
					var uri = '/api/camera/getFisheyeImage'
				}
				return new Promise((resolve, reject) => {
					request.get(uri).then((res) => {
						// resolve(request.base_url(res.data.data[type]))
						if (type == '360') resolve(request.base_url(res.data.msg))
						else resolve(request.base_url(res.data.data[type]))
					})
				})
			},
			tabarEvent(type) {
				if (type == 'close') {
					// 关闭应用
					uni.redirectTo({
						url: '/pages/index/index'
					})

					return;
				}
				if (type == 'calibration') {
					this.render_open_bottom = [{
							'type': 0,
							'disable': !this.display_quji,
							'title': (this.quji ? '取消去畸' : '去畸'),
							'click_do': 'quji'
						},
						{
							'type': 1,
							'disable': false,
							'title': '摄像头列表',
							'sub': [{
								'click_do': 'front',
								'title': '前',
								'disable': false,
								'subtype': 'monitor'
							}, {
								'click_do': 'left',
								'title': '左',
								'disable': false,
								'subtype': 'monitor'
							}, {
								'click_do': 'right',
								'title': '右',
								'disable': false,
								'subtype': 'monitor'
							}, {
								'click_do': 'back',
								'title': '后',
								'disable': false,
								'subtype': 'monitor'
							}]
						}
					]
				}
				if (type == 'focus') {
					this.render_open_bottom = [{
							'type': 0,
							'disable': false,
							'title': '前',
							'click_do': 'front',
							'subtype': 'focus'
						}, {
							'type': 0,
							'disable': false,
							'title': '后',
							'click_do': 'back',
							'subtype': 'focus'
						}, {
							'type': 0,
							'disable': false,
							'title': '左',
							'click_do': 'left',
							'subtype': 'focus'
						}, {
							'type': 0,
							'disable': false,
							'title': '右',
							'click_do': 'right',
							'subtype': 'focus'
						}, {
							'type': 0,
							'disable': false,
							'title': '360',
							'click_do': '360',
							'subtype': 'focus'
						}

					]
				}

				this.$refs.popup.open();
			},
			click_do(event, subtype = null) {
				if (subtype == 'monitor') {
					// console.log(this.get_picture(event));
					this.get_picture(event).then((res) => {
						this.item_2 = res
						this.loading_item_2 = true
						this.display_quji = true
						this.last = event
					})
					this.$refs.popup.close()
				}
				if (event == 'quji') {
					this.quji = !this.quji
					this.get_picture(this.last).then((res) => {
						this.item_2 = res
						this.loading_item_2 = true
					})
					this.$refs.popup.close()
				}
				if (subtype == 'focus') {
					this.get_picture(event, true).then((res) => {
						this.item_1 = res
						this.loading_item_1 = true
						this.display_back = false
					})
					this.$refs.popup.close()
				}
			}

		}
	}
</script>

<style>

</style>