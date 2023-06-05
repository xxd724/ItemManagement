'use strict';
const db = uniCloud.database();
const $ = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		_id,
		auditstate,
		reason
	} = event;
	await db.collection('outbound').doc(_id).update({
		auditstate: 1,
		reason: $.set(reason)
	})

	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: "已驳回"
		}
	}
};
