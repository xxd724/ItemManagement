export default {
	updateUserInfo(state, userInfo) {
		uni.setStorageSync("UserInfo", userInfo); //本地储存用户信息
		state.UserInfo = userInfo; //修改store数据
	},
	//设置导航栏选项卡
	setInformation(state, information) {
		uni.setStorageSync("Information", information);
		state.Information = information;
	}
}
