<template>
	<view class="approval">
		<view class="approval-header">
			<view class="approval-header-left" :class="approval ? 'active' : ''" @click="changeApproved(0)">
				待审批
			</view>
			<view class="approval-header-right" :class="approval ? '' : 'active'" @click="changeApproved(1)">
				已审批
			</view>
		</view>
		<view class="approval-container">
			<scroll-view class="scrollView" scroll-y="true" :enable-back-to-top="true" :show-scrollbar="false">
				<view class="scrollView-item" v-for="(item,index) in approved" :key="index">
					<view class="scrollView-item-left">
						<view class="item-content">
							订单号: {{item.c_id}}
						</view>
						<view class="item-content">
							物品名称: {{item.designation.split('-')[0]}}
						</view>
						<view class="item-content">
							操作员: {{item.applicant}}
						</view>
						<view class="item-content">
							操作目的: 出库借用
						</view>
					</view>
					<view class="scrollView-item-right">
						<view class="item-result">
							<view v-if="item.auditstate === 0">待审核</view>
							<view v-if="item.auditstate === 2">已审核</view>
							<view style="color: #ff0000;" v-if="item.auditstate === 1">已驳回</view>
						</view>
						<view class="item-click" @click="goApprovalDetail(item._id)">
							审批详情
						</view>
					</view>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.checkIsLogin() && this._initApproval();
			if (this.UserInfo.status !== 1) {
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}
		},
		data() {
			return {
				approval: true,
				// notApproved: [], 
				approved: [],
				approvalList: []
			}
		},
		methods: {
			async _initApproval() {
				const approvalList = await this.$http.get_outbound();
				this.approvalList = approvalList.sort((a, b) => b.creat_time - a.creat_time);
				if (this.approval) {
					this.approved = this.approvalList.filter(item => item.auditstate === 0);
				}
			},
			changeApproved(auditstate) {
				if (auditstate === 0) {
					this.approval = true;
					this.approved = this.approvalList.filter(item => item.auditstate === 0);
				} else if (auditstate === 1) {
					this.approval = false;
					this.approved = this.approvalList.filter(item => item.auditstate === 1 || item.auditstate === 2);
				}
			},
			goApprovalDetail(Id) {
				const params = this.approved.filter(item => item._id === Id);
				uni.navigateTo({
					url: `/pages/details/approvalDetail/approvalDetail?params=${JSON.stringify(params[0])}`
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/pages/approval/css/approval.scss'
</style>
