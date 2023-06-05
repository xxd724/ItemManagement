<template>
	<view>
		<view class="index-header">
			<view class="header-icon" @click="gear">
				<uni-icons type="gear" color="#fff" size="30"></uni-icons>
				<view class="gear" v-if="IsShow">
					<view class="gear-item" @click="_approved">
						审批权限
					</view>
					<view class="gear-item" @click="_management">
						物品管理员权限
					</view>
				</view>
			</view>
			<view class="header-info">
				<view class="header-img" @click="changeAvatar">
					<image :src="UserInfo.avatar" mode="aspectFill"></image>
				</view>
				<view class="header-title" @click="changeNickname">
					{{UserInfo.nickname}}
				</view>
			</view>
		</view>
		<view class="index-container">
			<view class="container-list">
				<view class="container-list-item" @click="goRegistration">
					<uni-icons type="image" size="50"></uni-icons>
					<view>入库登记</view>
				</view>
				<view class="container-list-item" @click="goOutbound">
					<uni-icons type="image" size="50"></uni-icons>
					<view>出库管理</view>
				</view>
				<view class="container-list-item" @click="goApproval">
					<uni-icons type="image" size="50"></uni-icons>
					<view>物品审批</view>
				</view>
				<view class="container-list-item" @click="goManagement">
					<uni-icons type="image" size="50"></uni-icons>
					<view>物品管理</view>
				</view>
				<view class="container-list-item" @click="goStatistics">
					<uni-icons type="image" size="50"></uni-icons>
					<view>报表统计</view>
				</view>

			</view>
			<button class="logout-btn" type="default" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				IsShow: false
			}
		},
		onLoad() {
			this.checkIsLogin();
			this._initInformation();
		},
		methods: {
			async _approved() {
				const res = await this.$http.modify_approval({
					_id: this.UserInfo._id
				});
				if (res) {
					this.updateUserInfo(res)
				}
			},
			async _management() {
				const result = await this.$http.modify_management({
					_id: this.UserInfo._id
				});
				if (result) {
					this.updateUserInfo(result)
				}
			},
			gear() {
				this.IsShow = !this.IsShow;
			},
			async _initInformation() {
				if (this.$store.state.Information === null) {
					const informations = await this.$http.init_information();
					this.setInformation(informations);
				}
			},
			goRegistration() {
				uni.navigateTo({
					url: "/pages/registration/registration"
				})
			},
			goOutbound() {
				uni.navigateTo({
					url: "/pages/outbound/outbound"
				})
			},
			goApproval() {
				if (this.UserInfo.status !== 1) {
					uni.showToast({
						title: "您没有审批权限"
					})
					return
				}
				uni.navigateTo({
					url: "/pages/approval/approval"
				})
			},
			goManagement() {
				uni.navigateTo({
					url: "/pages/management/management"
				})
			},
			goStatistics() {
				uni.navigateTo({
					url: '/pages/statistics/statistics'
				})
			},
			logout() {
				uni.removeStorageSync('UserInfo');
				uni.redirectTo({
					url: '/pages/login/login'
				})
			},
			//修改头像
			changeAvatar() {
				uni.showModal({
					title: "是否更换头像",
					success: (res) => {
						if (res.confirm) {
							uni.chooseImage({
								count: 1,
								success: async res => {
									const cloudPath = res.tempFiles[0].name || Date.now()
										.toString() + res.tempFilePaths[0]
										.substr(res.tempFilePaths[0].lastIndexOf("."));
									const filePath = await this._uploadFile(res.tempFilePaths[0],
										res.tempFiles[0].name ||
										Date.now().toString() + res.tempFilePaths[0].substr(res
											.tempFilePaths[0]
											.lastIndexOf(".")));
									this._updateUserAvatar(filePath);
								}
							})
						}
					}
				})

			},
			async _uploadFile(filePath, cloudPath) {
				const {
					fileID
				} = await uniCloud.uploadFile({
					filePath,
					cloudPath
				})
				return fileID;
			},
			// 上传图片内容
			async _updateUserAvatar(filePath) {
				const {
					msg
				} = await this.$http.update_user_avatar({
					userId: this.UserInfo._id,
					filePath
				})
				uni.showToast({
					title: msg,
					icon: "success"
				})
				this.updateUserInfo({
					...this.UserInfo,
					avatar: filePath
				});
			},
			changeNickname() {
				uni.showModal({
					title: "是否更换昵称",
					editable: true,
					success: async res => {
						if (res.confirm) {
							if (res.content === '') {
								uni.showToast({
									title: "请输入新的昵称",
									icon: "none"
								})
								return
							};
							const result = await this.$http.update_nickname({
								_id: this.UserInfo._id,
								nickname: res.content
							})
							uni.showToast({
								title: result,
								icon: "success"
							})
							this.updateUserInfo({
								...this.UserInfo,
								nickname: res.content
							})
						}
					}
				})
			},
			...mapMutations(['setInformation', 'updateUserInfo'])
		},
		// computed:{
		// 	...mapState([])
		// }
	}
</script>

<style lang="scss">
	@import '@/pages/index/css/index.scss'
</style>
