import ajax from '../../http.js'

export const user_login = data => ajax({
	name: "user_login",
	data
})
export const init_information = data => ajax({
	name: "init_information",
	data
})
export const update_user_avatar = data => ajax({
	name: "update_user_avatar",
	data
})
export const update_nickname = data => ajax({
	name: "update_nickname",
	data
})
