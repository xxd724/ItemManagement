<template>
	<view>
		<view class="afreshcollection">
			<uni-forms ref="form" class="form" :modelValue="formData">
				<uni-forms-item label="库存地点" required :rules="[{'required': true,errorMessage: '必选项，请选择库存地址'}]"
					name="address">
					<uni-data-select class="form-select" :value="(this.afreshData.address.split('-')[1]) || ''"
						:localdata="addressList" placeholder="请选择库存地点" @change="changeaddress" :clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="一级分类" required :rules="[{'required': true,errorMessage: '必选项，请选择一级分类'}]"
					name="firstClassification">
					<uni-data-select class="form-select"
						:value="(this.afreshData.firstClassification.split('-')[1]) || ''"
						:localdata="firstClassificationList" placeholder="请选择一级分类" @change="changefirstClassification"
						:clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="二级分类" required :rules="[{'required': true,errorMessage: '必选项，请选择二级分类'}]"
					name="secondClassification">
					<uni-data-select class="form-select" :disabled="prohibit"
						:value="(this.afreshData.secondClassification.split('-')[1]) || ''"
						:localdata="secondClassificationList" placeholder="请选择二级分类" @change="changesecondClassification"
						:clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="名称" required :rules="[{'required': true,errorMessage: '必选项，请选择名称'}]"
					name="designation">
					<uni-data-select class="form-select" :disabled="forbid"
						:value="(this.afreshData.designation.split('-')[1]) || 'num'" :localdata="designationList"
						placeholder="请选择名称" @change="changedesignation" :clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="品牌" name="brand">
					<uni-data-select class="form-select" :value="(this.afreshData.brand.split('-')[1]) || ''"
						:localdata="brandList" placeholder="请选择品牌" @change="changebrand" :clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="规格" name="norms">
					<uni-data-select class="form-select" :value="(this.afreshData.norms.split('-')[1]) || ''"
						:localdata="normsList" placeholder="请选择规格" @change="changenorms" :clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="申请人:" name="applicant">
					{{this.afreshData.applicant}}
				</uni-forms-item>
				<uni-forms-item label="领用人" required :rules="[{'required': true,errorMessage: '必填项，请填写领用人'}]"
					name="receiver">
					<uni-easyinput class="form-input" :inputBorder="false" v-model="formData.receiver" type="text"
						placeholder="请输入名字">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="数量" required :rules="[{'required': true,errorMessage: '必填项，请输入数量'}]"
					name="amount">
					<uni-easyinput class="form-input" :inputBorder="false" v-model="formData.amount" type="text"
						placeholder="请输入出库数量">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="出库时间" required :rules="[{'required': true,errorMessage: '必选项，请选择出库时间'}]"
					name="deliveryTime">
					<uni-datetime-picker type="datetime" returnType="timestamp" v-model="formData.deliveryTime"
						@change="changedeliveryTime">
					</uni-datetime-picker>
				</uni-forms-item>
				<button type="submit" class="submit-btn" @click="_confirm">确定</button>
				<button type="reset" class="reset-btn" @click="resetting">重置</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.afreshData = JSON.parse(options.params);
			this.formData = this.afreshData;
			this.addressList = this.$store.state.Information.address;
			this.firstClassificationList = this.$store.state.Information.firstClassification;
			const val = this.afreshData.firstClassification.split('-')[1];
			const value = this.afreshData.secondClassification.split('-')[1];
			this.secondClassificationList = this.firstClassificationList[val].secondClassification;
			this.designationList = this.firstClassificationList[val].secondClassification[value].designation;

			this.brandList = this.$store.state.Information.brand;
			this.normsList = this.$store.state.Information.norms;
		},
		data() {
			return {
				formData: {
					address: "",
					firstClassification: "",
					secondClassification: "",
					designation: "",
					brand: "",
					norms: "",
					applicant: "",
					receiver: "",
					amount: "",
					deliveryTime: ""
				},
				prohibit: true,
				forbid: true,
				afreshData: {},
				addressList: [],
				firstClassificationList: [],
				secondClassificationList: [],
				designationList: [],
				brandList: [],
				normsList: [],
				num: ''
			}
		},
		methods: {
			//库存地点切换事件
			changeaddress(e) {
				e && (this.formData.address = this.addressList[e].text + '-' + e);
			},
			//一级分类切换事件
			changefirstClassification(e) {
				if (e) {
					this.formData.firstClassification = this.firstClassificationList[e].text + '-' + e;
					this.prohibit = false;
					this.secondClassificationList = this.firstClassificationList[e].secondClassification;
					this.forbid = true;
					this.num = "";
					this.formData.secondClassification = '';
					this.formData.designation = '';
				}
			},
			//二级分类切换事件
			changesecondClassification(e) {
				if (e) {
					this.formData.secondClassification = this.secondClassificationList[e].text + '-' + e;
					this.forbid = false;
					this.num = "";
					this.formData.designation = '';
					this.designationList = this.secondClassificationList[e].designation;
				}
			},
			//名称切换事件
			changedesignation(e) {
				e && (this.formData.designation = this.designationList[e].text + '-' + e);
			},
			//品牌切换事件
			changebrand(e) {
				this.num = e;
				e && (this.formData.brand = this.brandList[e].text + '-' + e);
			},
			//规格切换事件
			changenorms(e) {
				e && (this.formData.norms = this.normsList[e].text + '-' + e);
			},
			changedeliveryTime(e) {
				this.formData.deliveryTime = e;
			},
			async _confirm() {
				//确定之后发送数据到云数据库
				await this.$refs.form.validate().then(res => {
					this._sendData({
						...res,
						_id: this.afreshData._id
					});
				})
			},
			async _sendData(data) {
				const result = await this.$http.update_collection(data);
				if (result) {
					uni.showToast({
						title: result.msg,
						icon: 'success'
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/outbound/outbound'
						})
					}, 1500)
				}
			},
			resetting() {
				this.$refs.form.clearValidate();
				this.formData.address = "";
				this.formData.firstClassification = '';
				this.formData.secondClassification = ';'
				this.formData.designation = '';
				this.formData.brand = '';
				this.formData.norms = '';
				this.formData.amount = '';
				this.formData.receiver = '';
				this.formData.deliveryTime = '';
				uni.showToast({
					title: "已重置",
					icon: "success"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/pages/afreshcollection/css/afreshcollection.scss';
</style>
