<template>
	<view class="statisticsDetail">
		<view class="details-header">
		</view>
		<view class="details-container">
			<view class="details-container-list">
				<view class="container-list-item">
					<view class="container-list-item-left">
						操作类型:
					</view>
					<view class="container-list-item-right" v-if="this.statisticsList.r_id">
						入库
					</view>
					<view class="container-list-item-right" v-else>
						出库({{this.statisticsList.auditstate === 0  ? '审核中' : (this.statisticsList.auditstate === 1 ? '已驳回' : '已审核')}})
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						库存地点:
					</view>
					<view class="container-list-item-right">
						{{this.statisticsList.address.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						一级分类:
					</view>
					<view class="container-list-item-right">
						{{this.statisticsList.firstClassification.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						二级分类:
					</view>
					<view class="container-list-item-right">
						{{this.statisticsList.secondClassification.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						物品名称:
					</view>
					<view class="container-list-item-right">
						{{this.statisticsList.designation.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						品牌:
					</view>
					<view class="container-list-item-right">
						{{this.statisticsList.brand.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						规格:
					</view>
					<view class="container-list-item-right">
						{{this.statisticsList.norms.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						{{this.statisticsList.r_id ? '入库数量' : '领用数量'}}:
					</view>
					<view class="container-list-item-right">
						{{this.statisticsList.amount}}
					</view>
				</view>
				<view class="container-list-item" v-if="this.statisticsList.c_id">
					<view class="container-list-item-left">
						申请人:
					</view>
					<view class="container-list-item-right">
						{{this.statisticsList.applicant}}
					</view>
				</view>
				<view class="container-list-item" v-if="this.statisticsList.c_id">
					<view class="container-list-item-left">
						领用人:
					</view>
					<view class="container-list-item-right">
						{{this.statisticsList.receiver}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						{{this.statisticsList.r_id ? '入库时间' : '领用时间'}}:
					</view>
					<view class="container-list-item-right">
						<uni-dateformat :date="this.statisticsList.storageTime || this.statisticsList.deliveryTime"
							format="yyyy-MM-dd"></uni-dateformat>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.statisticsList = JSON.parse(options.params);
		},
		data() {
			return {
				statisticsList: []
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '@/pages/details/statisticsDetail/css/statisticsDetail.scss'
</style>
