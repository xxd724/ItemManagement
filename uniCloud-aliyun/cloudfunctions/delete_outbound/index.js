'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		_id
	} = event;
	await db.collection('outbound').doc(_id).remove()

	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: "撤销成功"
		}
	}
};
