<template>
	<view class="outbound">
		<view class="outbound-header">
			<view class="header">
				<view class="header-searchinput">
					<input type="search" class="search-input" v-model="searchVal" placeholder="请输入搜索内容">
				</view>
				<view class="header-select">
					<uni-data-select :localdata="classify" v-model="value" :clear="false">
					</uni-data-select>
				</view>
				<view class="header-searchbtn">
					<button class="search-btn" @click="_search">搜索</button>
				</view>
			</view>
		</view>
		<view class="outbound-container">
			<uni-table :border="false" :loading="loading" :stripe="true" emptyText="暂无更多数据">
				<uni-tr>
					<uni-th width="60" align="center">订单号</uni-th>
					<uni-th width="70" align="center">物品名称</uni-th>
					<uni-th width="60" align="center">领用人</uni-th>
					<uni-th width="110" align="center">领用时间</uni-th>
					<uni-th width="70" align="center">审批状态</uni-th>
				</uni-tr>
				<uni-tr @row-click="rowClick(item._id)" v-for="(item,index) in tableData" :key="index">
					<uni-td align="center">
						<text class="outbound-table-td">{{item.c_id}}</text>
					</uni-td>
					<uni-td align="center">{{item.designation.split("-")[0]}}</uni-td>
					<uni-td align="center">{{item.receiver}}</uni-td>
					<uni-td align="center">
						<uni-dateformat :date="item.deliveryTime" format="yyyy-MM-dd"></uni-dateformat>
					</uni-td>
					<uni-td align="center"
						:class="item.auditstate === 2 ? 'cb' : (item.auditstate === 0 ? 'cg' : 'cr')">
						{{item.auditstate === 2 ? '已审核' : (item.auditstate === 0 ? '审核中' : '已驳回')}}
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box" v-if="this.total > 10">
				<uni-pagination :show-icon="false" :page-Size="pageSize" :current="pageCurrent" :total="total"
					@change="changepage" />
			</view>
		</view>
		<view class="outbound-footer">
			<button type="warn" class="footer-btn" @click="gocollection">出库领用</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.checkIsLogin() && this._initTableData();
		},
		data() {
			return {
				value: 0,
				classify: [{
						value: 0,
						text: "一级分类"
					},
					{
						value: 1,
						text: "二级分类"
					},
					{
						value: 2,
						text: "物品名称"
					},
					{
						value: 3,
						text: "数量"
					},
					{
						value: 4,
						text: "库存地点"
					}
				],
				// title: "",
				searchVal: '', //输入搜索框的内容
				tableData: [], //总数居
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,
				tableList: [] //初始化获取后端返回的数据
			}
		},
		methods: {
			async _initTableData() {
				//调用接口获取后台返回的数据
				const tableList = await this.$http.get_outbound();
				this.tableList = tableList;
				if (tableList) {
					this.getData(1);
				}
			},
			gocollection() {
				uni.navigateTo({
					url: '/pages/collection/collection'
				})
			},
			//获取不同页数的数据
			changepage(e) {
				this.getData(e.current);
			},
			// 搜索
			async _search() {
				if (this.searchVal === '') {
					uni.showToast({
						title: "请输入搜索内容",
						icon: "none"
					})
					return
				}
				const searchList = await this.$http.get_search_data({
					searchTitle: this.value,
					searchVal: this.searchVal
				})
				this.tableList = searchList;
				if (searchList) {
					uni.showToast({
						title: searchList.msg,
						icon: "success"
					})
					this.getData(1)
				}
			},
			getData(pageCurrent) {
				this.loading = true;
				this.pageCurrent = pageCurrent;
				this.request({
					pageSize: this.pageSize,
					pageCurrent: pageCurrent,
					success: res => {
						this.tableData = res.data.sort((a, b) => b.create_time - a.create_time);
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
				// this.$router.push({
				// 	path: '/pages/details/outboundDetail/outboundDetail',
				// 	query: params[0]
				// })
				uni.navigateTo({
					url: `/pages/details/outboundDetail/outboundDetail?params=${JSON.stringify(params[0])}`
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/pages/outbound/css/outbound.scss';
</style>
