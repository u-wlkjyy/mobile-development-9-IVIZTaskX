<template>
	<view>
		<view class="main-box">
			<view class="main">
				<view class="title">用户登录</view>
				<view class="form-control">
					<label for="" class="input_name">手机号码</label>
					<input type="text" class="input_control" v-model="phone">
				</view>
				<view class="form-control">
					<label for="" class="input_name">密码</label>
					<input type="password" class="input_control" v-model="password">
				</view>
				<view class="register" @click="gotoRegister">用户注册</view>
				<view class="login" @click="loginEvent">登录</view>

				<view class="option">
					<view class="forget" @click="gotoForget">忘记密码？</view>
					<view class="code-login" @click="codeLogin">免密登录</view>

				</view>
			</view>
		</view>


	</view>
</template>
<style>
	@import url('@/static/common.css');
</style>
<style scoped>
	.main {
		width: 40vw;
		background-color: rgba(255, 255, 255, .7);
		border-radius: 15rpx;
		padding-top: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		backdrop-filter: blur(10rpx);
		-webkit-backdrop-filter: blur(10rpx);



	}



	.forget {
		color: rgb(145, 193, 231);
		font-size: 0.3rem;
	}

	.register {
		width: 100%;
		height: 30rpx;
		/* color: white; */
		border: 1px solid rgb(25, 150, 240);
		color: rgb(25, 150, 240);
		font-size: 0.4rem;
		text-align: center;
		line-height: 30rpx;
		border-radius: 5rpx;
		margin-top: 15rpx;
	}

	.code-login {
		color: rgb(25, 150, 240);
		font-size: 0.3rem;

	}

	.option {
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.login {

		width: 100%;
		height: 30rpx;
		/* color: white; */
		background-color: rgb(25, 150, 240);
		color: white;
		font-size: 0.4rem;
		text-align: center;
		line-height: 30rpx;
		border-radius: 5rpx;
		margin-top: 15rpx;
	}

	.close {
		text-align: right;
		/* padding-right: 10rpx; */
		font-size: 0.3rem;
	}

	.form-control {
		margin-top: 20rpx;
	}

	.input_name {
		font-size: 0.30rem;
	}

	.input_control {
		margin-top: 2rpx;
		width: 100%;
		height: 30rpx;
		border: 2px solid rgb(247, 247, 247);
		background-color: rgb(252, 252, 252);
	}

	.input_control:hover {
		background-color: white;
		box-shadow: 0 2rpx rgb(64, 150, 220);
	}

	.title {
		text-align: center;
		font-size: 0.6rem;
	}

	.main-box {
		display: flex;
		justify-content: center;
		margin-top: 5vh;
		font-size: 0.5rem;
		color: rgb(77, 100, 116);
	}
</style>
<script>
	import request from '@/static/request/request.js'
	export default {
		data() {
			return {
				phone: null,
				password: null
			}
		},
		methods: {
			gotoForget(){
				uni.navigateTo({
					url:'/pages/auth/forget'
				})
			
			},
			isEmpty(value, msg) {
				if (value == null || value == '') {
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					throw new Error(msg)
					return false
				}
				return true
			},
			gotoRegister(){
				uni.navigateTo({
					url:'/pages/auth/register'
				})
				
			},
			loginEvent() {
				this.isEmpty(this.phone, '手机号码不能为空')
				this.isEmpty(this.password, '密码不能为空')
				var uri = ''
				var postdata = {}
				if (this.phone.length == 11) {
					uri = '/api/phone/login'
					postdata = {
						'phone': this.phone,
						'password': this.password
					}
				} else {
					uri = '/login'
					postdata = {
						'username': this.phone,
						'password': this.password
					}
				}

				request.post(uri, postdata).then((res) => {
					if (res.data.code == 200) {
						uni.setStorageSync('auth_token', res.data.token)
						uni.showToast({
							title: '登录成功',
							icon: 'success'
						})
						uni.redirectTo({
							url: "/pages/index/index"
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}

				})

			},
			codeLogin() {
				uni.navigateTo({
					url: '/pages/auth/code-login'
				})
			}
		}
	}
</script>

<style>

</style>