<template>
	<view class="details">
		<view class="details-header">
			<view class="details-header-item" v-if="this.outboundData.auditstate === 0">
				<view class="under-review">
					审核中
				</view>
			</view>
			<view class="details-header-item" v-if="this.outboundData.auditstate === 1">
				<view class="header-title">
					已驳回
				</view>
				<view class="header-content">
					驳回原因：{{this.outboundData.reason}}
				</view>
			</view>
			<view class="details-header-item" v-if="this.outboundData.auditstate === 2">
				已通过审核
			</view>
		</view>
		<view class="details-container">
			<view class="details-container-list">
				<view class="container-list-item">
					<view class="container-list-item-left">
						库存地点:
					</view>
					<view class="container-list-item-right">
						{{this.outboundData.address.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						一级分类:
					</view>
					<view class="container-list-item-right">
						{{this.outboundData.firstClassification.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						二级分类:
					</view>
					<view class="container-list-item-right">
						{{this.outboundData.secondClassification.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						物品名称:
					</view>
					<view class="container-list-item-right">
						{{this.outboundData.designation.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						品牌:
					</view>
					<view class="container-list-item-right">
						{{this.outboundData.brand.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						规格:
					</view>
					<view class="container-list-item-right">
						{{this.outboundData.norms.split("-")[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						领用数量:
					</view>
					<view class="container-list-item-right">
						{{this.outboundData.amount}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						申请人:
					</view>
					<view class="container-list-item-right">
						{{this.outboundData.applicant}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						领用人:
					</view>
					<view class="container-list-item-right">
						{{this.outboundData.receiver}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						领用时间:
					</view>
					<view class="container-list-item-right">
						<uni-dateformat :date="this.outboundData.deliveryTime" format="yyyy年MM月dd日"></uni-dateformat>
					</view>
				</view>
			</view>
		</view>
		<view class="details-footer" v-if="this.outboundData.auditstate === 2 ? 'false' : 'true'">
			<button v-if="this.outboundData.auditstate === 0" class="details-footer-btn" type="default"
				@click="revoke">撤销审核</button>
			<button v-if="this.outboundData.auditstate === 1" class="details-footer-btn" type="default"
				@click="resubmit">重新提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			// this.outboundData = this.$router.currentRoute.query;
			this.outboundData = JSON.parse(options.params);
		},
		data() {
			return {
				outboundData: []
			}
		},
		methods: {
			revoke() {
				let that = this;
				uni.showModal({
					content: "确定要撤销审核吗?撤销之后所有数据将重新填写",
					success: function(res) {
						if (res.confirm) {
							that._deleteOutbound({
								_id: that.outboundData._id
							})
						}
					}
				})
			},
			resubmit() {
				const params = this.outboundData;
				uni.navigateTo({
					url: `/pages/afreshcollection/afreshcollection?params=${JSON.stringify(params)}`
				})
			},
			async _deleteOutbound(data) {
				const res = await this.$http.delete_outbound(data);
				if (res) {
					uni.showToast({
						title: res.msg,
						icon: "success"
					})
					setTimeout(() => {
						uni.redirectTo({
							url: "/pages/outbound/outbound"
						})
					}, 1500)
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '@/pages/details/outboundDetail/css/outboundDetail.scss'
</style>
