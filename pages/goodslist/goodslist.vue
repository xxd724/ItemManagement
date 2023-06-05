<template>
	<view class="goodsList">
		<uni-table :border="false" :loading="loading" :stripe="true" emptyText="暂无更多数据">
			<uni-tr>
				<uni-th width="95" align="center">订单号</uni-th>
				<uni-th width="100" align="center">物品名称</uni-th>
				<uni-th width="90" align="center">入库员</uni-th>
				<uni-th width="90" align="center">入库时间</uni-th>
			</uni-tr>
			<uni-tr @row-click="rowClick(item._id)" v-for="(item,index) in tableData" :key="index">
				<uni-td align="center">
					<text class="outbound-table-td">{{item.r_id}}</text>
				</uni-td>
				<uni-td align="center">{{item.designation.split("-")[0]}}</uni-td>
				<uni-td align="center">{{item.applicant}}</uni-td>
				<uni-td align="center">
					<uni-dateformat :date="item.storageTime" format="yyyy-MM-dd"></uni-dateformat>
				</uni-td>
			</uni-tr>
		</uni-table>
		<view class="uni-pagination-box" v-if="this.total > 12">
			<uni-pagination :show-icon="false" :page-Size="pageSize" :current="pageCurrent" :total="total"
				@change="changepage" />
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.dataList = JSON.parse(options.params);
			this._getGoods();
		},
		data() {
			return {
				dataList: [],
				tableData: [], //总数居
				// 每页数据量
				pageSize: 12,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,
				tableList: [] //初始化获取后端返回的数据
			}
		},
		methods: {
			async _getGoods() {
				const res = await this.$http.get_goods({
					designation: this.dataList.designation,
					address: this.dataList.address
				})
				this.tableList = res;
				if (res) {
					this.getData(1)
				}
			},
			//获取不同页数的数据
			changepage(e) {
				this.getData(e.current);
			},
			getData(pageCurrent) {
				this.loading = true;
				this.pageCurrent = pageCurrent;
				this.request({
					pageSize: this.pageSize,
					pageCurrent: pageCurrent,
					success: res => {
						this.tableData = res.data.sort((a, b) => a.create_time - b.create_time);
						this.total = res.total;
						this.loading = false;
					}
				})
			},
			request(options) {
				const {
					pageSize,
					pageCurrent,
					value,
					success
				} = options;
				// this.tableList = uni.getStorageSync('outbound');
				let total = this.tableList.length;
				let data = this.tableList.filter((item, index) => {
					const idx = index - (pageCurrent - 1) * pageSize;
					return idx < pageSize && idx >= 0;
				})
				setTimeout(() => {
					typeof success === 'function' && success({
						data: data,
						total: total
					})
				}, 500)
			},
			//每一行的点击事件
			rowClick(Id) {
				const params = this.tableData.filter(item => item._id === Id);
				uni.navigateTo({
					url: `/pages/details/goodsDetail/goodsDetail?params=${JSON.stringify(params[0])}`
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/pages/goodslist/css/goodsList.scss'
</style>
