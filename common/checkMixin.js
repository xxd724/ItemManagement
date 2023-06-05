import {
	mapState,
	mapMutations
} from 'vuex'
export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {

				}
			},
			methods: {
				checkIsLogin() {
					return new Promise(resolve => {
						if (this.UserInfo) {
							resolve()
						} else {
							uni.navigateTo({
								url: "/pages/login/login"
							})
						}
					})
				},
				...mapMutations(['updateUserInfo'])
			},
			computed: {
				...mapState(['UserInfo'])
			}
		})
	}
}
