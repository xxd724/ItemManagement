<template>
	<view class="container">
		<view class="container-form">
			<uni-forms class="form" ref="form" :modelValue="formData">
				<uni-forms-item label="账号:" name="userName">
					<uni-easyinput :inputBorder="false" class="form-input" v-model.trim="formData.userName" type="text"
						placeholder="请输入6~16位账号">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="密码:" name="password">
					<uni-easyinput :inputBorder="false" class="form-input" type="password"
						v-model.trim="formData.password" placeholder="请输入6~16位密码">
					</uni-easyinput>
				</uni-forms-item>
				<button type="default" @click="_userLoginVildate" class="login-btn">登 录</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		onReady() {
			this.$refs.form.setRules(this.userRules);
		},
		data() {
			return {
				formData: {
					userName: "",
					password: ""
				}
			}
		},
		methods: {
			async _userLoginVildate() {
				let userInfo = await this.$refs.form.validate();
				userInfo.password = this.$md5("_ad$%#x@" + userInfo.password);
				const user = await this.$http.user_login(userInfo);
				if (user) {
					this.updateUserInfo(user);
					uni.showToast({
						title: "登录成功",
						icon: "success"
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/index/index'
						})
					}, 1500)
				}
			},
			...mapMutations(["updateUserInfo"])
		}
	}
</script>

<style lang="scss">
	@import '@/pages/login/css/login.scss'
</style>
