'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		userName,
		password
	} = event;
	const res = await db.collection('user')
		.aggregate()
		.match({
			userName,
			password
		})
		.project({
			password: 0
		})
		.end()
	//返回数据给客户端
	return res.affectedDocs ? {
		code: 0,
		msg: "获取用户信息成功",
		data: res.data[0]
	} : {
		code: 1,
		msg: "获取用户信息失败，请检查账号或密码"
	}
};
