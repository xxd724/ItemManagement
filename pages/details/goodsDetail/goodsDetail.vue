<template>
	<view class="goodsDetail">
		<view class="details-header">
		</view>
		<view class="details-container">
			<view class="details-container-list">
				<view class="container-list-item">
					<view class="container-list-item-left">
						库存地点:
					</view>
					<view class="container-list-item-right">
						{{this.goodsList.address.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						一级分类:
					</view>
					<view class="container-list-item-right">
						{{this.goodsList.firstClassification.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						二级分类:
					</view>
					<view class="container-list-item-right">
						{{this.goodsList.secondClassification.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						物品名称:
					</view>
					<view class="container-list-item-right">
						{{this.goodsList.designation.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						品牌:
					</view>
					<view class="container-list-item-right">
						{{this.goodsList.brand.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						规格:
					</view>
					<view class="container-list-item-right">
						{{this.goodsList.norms.split('-')[0]}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						库存数量:
					</view>
					<view class="container-list-item-right">
						{{this.goodsList.amount}}
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						入库时间:
					</view>
					<view class="container-list-item-right">
						<uni-dateformat :date="this.goodsList.storageTime" format="yyyy年MM月dd日"></uni-dateformat>
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						保质期:
					</view>
					<view class="container-list-item-right">
						<uni-dateformat :date="this.goodsList.qualityTime" format="yyyy年MM月dd日止"></uni-dateformat>
					</view>
				</view>
				<view class="container-list-item">
					<view class="container-list-item-left">
						备注:
					</view>
					<view class="container-list-item-right">
						{{this.goodsList.remarks}}
					</view>
				</view>
			</view>
		</view>
		<view class="details-footer" v-if="UserInfo.status === 2">
			<button type="warn" @click="modifygoods">修改信息</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.goodsList = JSON.parse(options.params);
		},
		data() {
			return {
				goodsList: []
			}
		},
		methods: {
			modifygoods() {
				const params = this.goodsList;
				uni.navigateTo({
					url: `/pages/modifygoods/modifygoods?params=${JSON.stringify(params)}`
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/pages/details/goodsDetail/css/goodsDetail.scss'
</style>
