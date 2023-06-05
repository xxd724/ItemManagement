<template>
	<view class="statistics">
		<view class="statistics-header">
			<radio-group @change="radioChange" class="radioGroup">
				<label for="v1">
					<view class="radioGroup-item">
						<text>库存地点选择</text>
						<radio value="radio1" id="v1" style="transform:scale(0.7)" />
					</view>
					<view class="header-item">
						<uni-data-select :localdata="selectList" placeholder="请选择库存地点" @change="changeselect"
							:clear="false">
						</uni-data-select>
						<button type="warn" @click="search" class="search-btn">搜索</button>
					</view>
				</label>
				<label for="v2">
					<view class="radioGroup-item">
						<text>入库时间选择</text>
						<radio value="radio2" id="v2" style="transform:scale(0.7)" />
					</view>
					<view class="header-item">
						<uni-datetime-picker type="daterange" returnType="timestamp" v-model="daterange"
							rangeSeparator="至" @change="changelog">
						</uni-datetime-picker>
						<button type="warn" @click="search" class="search-btn">搜索</button>
					</view>
				</label>
				<label for="v3">
					<view class="radioGroup-item">
						<text>出库时间选择</text>
						<radio value="radio3" id="v3" style="transform:scale(0.7)" />
					</view>
					<view class="header-item">
						<uni-datetime-picker type="daterange" returnType="timestamp" v-model="range" rangeSeparator="至"
							@change="changrange">
						</uni-datetime-picker>
						<button type="warn" @click="search" class="search-btn">搜索</button>
					</view>
				</label>
			</radio-group>
			<view class="search-btn-box">

			</view>
		</view>
		<view class="statistics-container">
			<uni-table class="table" :border="false" :loading="loading" :stripe="true" emptyText="暂无更多数据">
				<uni-tr class="table-tr">
					<uni-th width="50" align="center">订单号</uni-th>
					<uni-th width="62" align="center">订单类型</uni-th>
					<uni-th width="62" align="center">物品名称</uni-th>
					<uni-th width="62" align="center">操作员</uni-th>
					<uni-th width="77" align="center">操作时间</uni-th>
					<uni-th width="62" align="center">库存数量</uni-th>
				</uni-tr>
				<uni-tr @row-click="rowClick(item._id)" v-for="(item,index) in tableData" :key="index">
					<uni-td align="center">
						<text class="table-td">{{item.r_id || item.c_id}}</text>
					</uni-td>
					<uni-td align="center">{{item.r_id ? '入库' : '出库'}}</uni-td>
					<uni-td align="center" class="table-td">{{item.designation.split('-')[0]}}</uni-td>
					<uni-td align="center">{{item.applicant}}</uni-td>
					<uni-td align="center">
						<uni-dateformat :date="item.deliveryTime || item.storageTime" format="yyyy-MM-dd">
						</uni-dateformat>
					</uni-td>
					<uni-td align="center">{{item.amount}}</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box" v-if="this.total > 10">
				<uni-pagination :show-icon="false" :page-size="pageSize" :current="pageCurrent" :total="total"
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
				radioval: '',
				daterange: '',
				range: '',
				selectText: {},
				tableData: [], //总数居
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,
				tableList: [],
				selectList: [{
						value: 0,
						text: "深圳龙华区"
					},
					{
						value: 1,
						text: "深圳宝安区"
					},
					{
						value: 2,
						text: "深圳福田区"
					},
					{
						value: 3,
						text: "深圳龙岗区"
					},
					{
						value: 4,
						text: "深圳盐田区"
					},
					{
						value: 5,
						text: "深圳光明区"
					}
				]
			}
		},
		methods: {
			async _initTableData() {
				const registration = await this.$http.init_registration();
				const collection = await this.$http.init_collection();
				this.tableList = registration.concat(collection);
				if (this.tableList) {
					this.getData(1, this.tableList);
				}
			},
			radioChange(e) {
				this.radioval = e.detail.value;
			},
			changeselect(e) {
				this.selectText = e;
			},
			changelog(e) {
				this.daterange = e;
			},
			changrange(e) {
				this.range = e;
			},
			search() {
				if (this.radioval === '') {
					uni.showToast({
						title: '请选择需要搜索的内容',
						icon: "none",
					})
					return
				} else if (this.radioval === 'radio1') {
					if (this.selectText === '') {
						uni.showToast({
							title: '请选择库存地点',
							icon: 'none'
						})
						return
					}
					let data = [];
					const result = this.selectList[this.selectText].text;
					this.tableList.forEach(item => {
						if (item.address.indexOf(result) !== -1) {
							data.push(item)
						}
					})
					this.tableList = data;
					this.getData(1, this.tableList);
				} else if (this.radioval === 'radio2') {
					if (this.daterange === '') {
						uni.showToast({
							title: "请选择入库时间",
							icon: 'none'
						})
						return
					}
					let list = []
					this.tableList.forEach(item => {
						if (this.daterange[0] < item.storageTime && item.storageTime < this.daterange[1]) {
							list.push(item)
						}
					})
					this.tableList = list;
					this.getData(1, this.tableList)
				} else if (this.radioval === 'radio3') {
					if (this.range === '') {
						uni.showToast({
							title: "请选择出库时间",
							icon: 'none'
						})
						return
					}
					let dateList = [];
					this.tableList.forEach(item => {
						if (this.range[0] < item.deliveryTime && item.deliveryTime < this.range[1]) {
							dateList.push(item)
						}
					})
					this.tableList = dateList;
					this.getData(1, this.tableList);
				}
			},
			//获取不同页数的数据
			changepage(e) {
				this.getData(e.current, this.tableList);
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
					ListData,
					success
				} = options;
				let total = ListData.length;
				let data = ListData.filter((item, index) => {
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
				const params = this.tableList.filter(item => item._id === Id);
				uni.navigateTo({
					url: `/pages/details/statisticsDetail/statisticsDetail?params=${JSON.stringify(params[0])}`
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/pages/statistics/css/statistics.scss'
</style>
