<template>
	<view class="approvalDetail">
		<view class="details-header">
			<view class="details-header-item">
				<view class="header-title">
					操作目的: 出库借用
				</view>
				<view class="header-content">
					({{this.approvalData.auditstate === 0 ? '待审核' : (this.approvalData.auditstate === 1 ? '已驳回' : "已审核")}})
				</view>
			</view>
		</view>
		<view class="details-container">
			<view class="details-container-list">
				<view class="container-list-item">
					<view class="container-list-item-left">
						库存地点:
					</view>
					<view class="container-list-item-right">
						{{this.approvalData.address.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						一级分类:
					</view>
					<view class="container-list-item-right">
						{{this.approvalData.firstClassification.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						二级分类:
					</view>
					<view class="container-list-item-right">
						{{this.approvalData.secondClassification.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						物品名称:
					</view>
					<view class="container-list-item-right">
						{{this.approvalData.designation.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						品牌:
					</view>
					<view class="container-list-item-right">
						{{this.approvalData.brand.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						规格:
					</view>
					<view class="container-list-item-right">
						{{this.approvalData.norms.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						领用数量:
					</view>
					<view class="container-list-item-right">
						{{this.approvalData.amount}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						申请人:
					</view>
					<view class="container-list-item-right">
						{{this.approvalData.applicant}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						领用人:
					</view>
					<view class="container-list-item-right">
						{{this.approvalData.receiver}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						领用时间:
					</view>
					<view class="container-list-item-right">
						<uni-dateformat :date="this.approvalData.deliveryTime" format="yyyy-MM-dd"></uni-dateformat>
					</view>
				</view>
			</view>
		</view>
		<view class="details-footer">
			<view v-if="this.approvalData.auditstate === 0" class="footer-btn">
				<button class="details-footer-btn confirm" type="default" @click="_through">确认通过</button>
				<button class="details-footer-btn" type="warn" @click="overrule">驳回</button>
			</view>
			<view class="footer-content" v-if="this.approvalData.auditstate === 1">
				给予驳回原因：{{this.approvalData.reason}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.approvalData = JSON.parse(options.params);
		},
		data() {
			return {
				approvalData: []
			}
		},
		methods: {
			async _through() {
				const res = await this.$http.update_auditstate({
					_id: this.approvalData._id,
					designation: this.approvalData.designation,
					address: this.approvalData.address,
					amount: this.approvalData.amount,
					auditstate: this.approvalData.auditstate
				})
				if (res.status === 0) {
					uni.showToast({
						title: res.msg,
						icon: 'success'
					})
				} else {
					uni.showToast({
						title: res.msg,
						icon: "success"
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/approval/approval'
						})
					}, 1500)
				}
			},
			overrule() {
				let that = this;
				uni.showModal({
					title: "驳回原因",
					editable: true,
					success: function(res) {
						if (res.confirm) {
							if (res.content === '') {
								uni.showToast({
									title: "请填写驳回原因",
									icon: "none"
								})
								return
							};
							that._update_approval({
								_id: that.approvalData._id,
								auditstate: that.approvalData.auditstate,
								reason: res.content
							});
						}
					}
				})
			},
			async _update_approval(data) {
				const result = await this.$http.update_approval(data);
				if (result) {
					uni.showToast({
						title: result.msg,
						icon: "success"
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/approval/approval'
						})
					}, 1500)
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '@/pages/details/approvalDetail/css/approvalDetail.scss'
</style>
