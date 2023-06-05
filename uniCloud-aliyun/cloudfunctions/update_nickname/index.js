'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		_id,
		nickname
	} = event;
	await db.collection('user').doc(_id).update({
		nickname
	})

	//返回数据给客户端
	return {
		code: 0,
		msg: '昵称修改成功'
	}
};
