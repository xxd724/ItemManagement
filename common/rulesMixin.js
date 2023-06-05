export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					userRules: {
						userName: {
							rules: [{
									required: true,
									errorMessage: "请输入账号"
								},
								{
									validateFunction: this.validateUserName
								}
							]
						},
						password: {
							rules: [{
									required: true,
									errorMessage: "请输入密码"
								},
								{
									validateFunction: this.validatePassword
								}
							]
						}

					},
					userNameReg: /^[a-zA-Z0-9_-]{6,16}$/,
					passwordReg: /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,16}$/

				}
			},
			methods: {
				validateUserName(rule, value, data, callback) {
					switch (true) {
						case !this.userNameReg.test(value):
							callback("账号只能为英文字母，数字，下划线或者短横线组成");
							break;
						default:
							return true
					}
				},
				validatePassword(rule, value, data, callback) {
					switch (true) {
						case !this.passwordReg.test(value):
							callback("由字母、数字、特殊字符，任意2种组成");
							break;
						default:
							return true
					}
				}
			}
		})
	}
}
