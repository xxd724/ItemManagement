'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		_id,
		address,
		firstClassification,
		secondClassification,
		designation,
		brand,
		norms,
		receiver,
		amount,
		deliveryTime
	} = event;
	await db.collection('outbound').doc(_id).update({
		address,
		firstClassification,
		secondClassification,
		designation,
		brand,
		norms,
		receiver,
		amount,
		deliveryTime,
		auditstate: 0
	})
	return {
		code: 0,
		data: {
			msg: "提交成功"
		}
	}
};
