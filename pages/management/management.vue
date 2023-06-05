<template>
	<view class="management">
		<view class="management-header">
			<view class="header">
				<view class="header-searchinput">
					<input type="search" class="search-input" v-model="searchVal" placeholder="请输入搜索内容">
				</view>
				<view class="header-select">
					<uni-data-select :localdata="classify" v-model="value" :clear="false" @change="changeselect">
					</uni-data-select>
				</view>
				<view class="header-searchbtn">
					<button class="search-btn" @click="search">搜索</button>
				</view>
			</view>
		</view>
		<view class="management-container">
			<uni-table :border="false" :loading="loading" :stripe="true" emptyText="暂无更多数据">
				<uni-tr>
					<uni-th width="80" align="center">序号</uni-th>
					<uni-th width="115" align="center">物品名称</uni-th>
					<uni-th width="90" align="center">库存数量</uni-th>
					<uni-th width="90" align="center">库存地点</uni-th>
				</uni-tr>
				<uni-tr @row-click="rowClick(item._id)" v-for="(item,index) in tableData" :key="index">
					<uni-td align="center">{{index + 1}}</uni-td>
					<uni-td align="center">{{item.designation.split('-')[0]}}</uni-td>
					<uni-td align="center">{{item.total}}</uni-td>
					<uni-td align="center">{{item.address.split('-')[0]}}</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box" v-if="this.totals >10">
				<uni-pagination :show-icon="false" :page-size="pageSize" :current="pageCurrent" :total="totals"
					@change="changepage" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this._initTableData();
		},
		data() {
			return {
				value: 0,
				text: "我好",
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
				searchVal: '', //输入搜索框的内容
				tableData: [], //总数居
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				totals: 0,
				loading: false,
				goodsList: []
			}
		},
		methods: {
			async _initTableData() {
				const registration = await this.$http.init_goods();
				this.goodsList = registration;
				if (registration) {
					this.getData(1, this.goodsList)
				}
			},
			changeselect(e) {
				this.value = e;
			},
			//获取不同页数的数据
			changepage(e) {
				this.getData(e.current, this.goodsList);
			},
			// 搜索
			search() {
				//判断需要搜索的条件
				if (this.searchVal === '') {
					uni.showModal({
						content: '无法搜索！请输入正确的数据！',
						showCancel: false,
						confirmColor: '#000',
					})
					return
				}
				let data = [];
				if (this.value === 0) {
					this.goodsList.forEach(item => {
						if (item.firstClassification.includes(this.searchVal)) {
							data.push(item)
						}
					})
				} else if (this.value === 1) {
					this.goodsList.forEach(item => {
						if (item.secondClassification.includes(this.searchVal)) {
							data.push(item)
						}
					})
				} else if (this.value === 2) {
					this.goodsList.forEach(item => {
						if (item.designation.includes(this.searchVal)) {
							data.push(item)
						}
					})
				} else if (this.value === 3) {
					this.goodsList.forEach(item => {
						if (item.total.includes(this.searchVal)) {
							data.push(item)
						}
					})
				} else {
					this.goodsList.forEach(item => {
						if (item.address.includes(this.searchVal)) {
							data.push(item)
						}
					})
				}
				this.goodsList = data;
				this.getData(1, this.goodsList);
			},
			getData(pageCurrent, ListData) {
				this.loading = true;
				this.pageCurrent = pageCurrent;
				this.ListData = ListData
				this.request({
					pageSize: this.pageSize,
					pageCurrent: pageCurrent,
					ListData: ListData,
					success: res => {
						this.tableData = res.data;
						this.totals = res.totals;
						this.loading = false;
					}
				})
			},
			request(options) {
				const {
					pageSize,
					pageCurrent,
					ListData,
					success
				} = options;
				let totals = ListData.length;
				let data = ListData.filter((item, index) => {
					const idx = index - (pageCurrent - 1) * pageSize;
					return idx < pageSize && idx >= 0;
				})
				setTimeout(() => {
					typeof success === 'function' && success({
						data: data,
						totals: totals
					})
				}, 500)
			},
			//每一行的点击事件
			rowClick(Id) {
				const params = this.goodsList.filter(item => item._id === Id);
				uni.navigateTo({
					url: `/pages/goodslist/goodslist?params=${JSON.stringify(params[0])}`
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/pages/management/css/management.scss';
</style>
