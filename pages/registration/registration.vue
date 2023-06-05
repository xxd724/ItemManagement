<template>
	<view>
		<view class="registration">
			<uni-forms ref="form" class="form" :modelValue="formData">
				<uni-forms-item label="库存地点" required :rules="[{'required': true,errorMessage: '必选项，请选择库存地址'}]"
					name="address">
					<uni-data-select class="form-select" :localdata="addressList" placeholder="请选择库存地点"
						@change="changeaddress" :clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="一级分类" required :rules="[{'required': true,errorMessage: '必选项，请选择一级分类'}]"
					name="firstClassification">
					<uni-data-select class="form-select" :localdata="firstClassificationList" placeholder="请选择一级分类"
						@change="changefirstClassification" :clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="二级分类" required :rules="[{'required': true,errorMessage: '必选项，请选择二级分类'}]"
					name="secondClassification">
					<uni-data-select class="form-select" :disabled="prohibit" :localdata="secondClassificationList"
						placeholder="请选择二级分类" @change="changesecondClassification" :clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="名称" required :rules="[{'required': true,errorMessage: '必选项，请选择名称'}]"
					name="designation">
					<uni-data-select class="form-select" v-model="num" :disabled="forbid" :localdata="designationList"
						placeholder="请选择名称" @change="changedesignation" :clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="品牌" name="brand">
					<uni-data-select class="form-select" :localdata="brandList" placeholder="请选择品牌"
						@change="changebrand" :clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="规格" name="norms">
					<uni-data-select class="form-select" :localdata="normsList" placeholder="请选择规格"
						@change="changenorms" :clear="false">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="数量" required :rules="[{'required': true,errorMessage: '必选项，请输入数量'}]"
					name="amount">
					<uni-easyinput class="form-input" :inputBorder="false" v-model="formData.amount" type="number"
						placeholder="请输入入库数量">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="入库时间" required :rules="[{'required': true,errorMessage: '必选项，请选择入库时间'}]"
					name="storageTime">
					<uni-datetime-picker type="datetime" returnType="timestamp" v-model="formData.storageTime"
						@change="changestorageTime">
					</uni-datetime-picker>
				</uni-forms-item>
				<uni-forms-item label="保质时间" name="qualityTime">
					<uni-datetime-picker type="datetime" returnType="timestamp" v-model="formData.qualityTime"
						@change="changequalityTime">
					</uni-datetime-picker>
				</uni-forms-item>
				<uni-forms-item label="备注" name="remarks">
					<uni-easyinput type="text" class="form-input" v-model="formData.remarks" :inputBorder="false"
						placeholder="请输入内容">
					</uni-easyinput>
				</uni-forms-item>
				<button type="submit" class="submit-btn" @click="_confirm">确定</button>
				<button type="reset" class="reset-btn" @click="resetting">重置</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.addressList = this.$store.state.Information.address;
			this.firstClassificationList = this.$store.state.Information.firstClassification;
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
					amount: "",
					storageTime: "",
					qualityTime: "",
					remarks: ""
				},
				prohibit: true,
				forbid: true,
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
				this.num = e;
				e && (this.formData.designation = this.designationList[e].text + '-' + e);
			},
			//品牌切换事件
			changebrand(e) {
				e && (this.formData.brand = this.brandList[e].text + '-' + e);
			},
			//规格切换事件
			changenorms(e) {
				e && (this.formData.norms = this.normsList[e].text + '-' + e);
			},
			changestorageTime(e) {
				this.formData.storageTime = e;
			},
			changequalityTime(e) {
				this.formData.qualityTime = e;
			},
			async _confirm() {
				await this.$refs.form.validate().then(res => {
					const applicant = this.UserInfo.userName;
					this._sendData({
						...res,
						applicant
					});
				})
			},
			async _sendData(e) {
				const result = await this.$http.add_registration(e);
				if (result) {
					uni.showToast({
						title: result.msg,
						icon: 'success'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/index/index'
						})
					}, 2000)
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
				this.formData.storageTime = '';
				this.formData.qualityTime = '';
				this.formData.remarks = '';
				uni.showToast({
					title: "已重置",
					icon: "success"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/pages/registration/css/registration.scss';
</style>
