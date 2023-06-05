import ajax from '../../http.js'

export const add_registration = data => ajax({
	name: "add_registration",
	data
})
export const add_collection = data => ajax({
	name: "add_collection",
	data
})
export const get_outbound = data => ajax({
	name: "get_outbound",
	data
})
export const get_search_data = data => ajax({
	name: "get_search_data",
	data
})
export const update_auditstate = data => ajax({
	name: "update_auditstate",
	data
})
export const update_approval = data => ajax({
	name: "update_approval",
	data
})
export const delete_outbound = data => ajax({
	name: "delete_outbound",
	data
})
export const update_collection = data => ajax({
	name: "update_collection",
	data
})
export const init_goods = data => ajax({
	name: "init_goods",
	data
})
export const init_collection = data => ajax({
	name: "init_collection",
	data
})
export const init_registration = data => ajax({
	name: "init_registration",
	data
})
export const get_goods = data => ajax({
	name: "get_goods",
	data
})
export const modify_goods = data => ajax({
	name: 'modify_goods',
	data
})
export const modify_approval = data => ajax({
	name: 'modify_approval',
	data
})
export const modify_management = data => ajax({
	name: 'modify_management',
	data
})
