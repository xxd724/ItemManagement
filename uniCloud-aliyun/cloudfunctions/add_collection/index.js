'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		address,
		firstClassification,
		secondClassification,
		designation,
		brand,
		norms,
		applicant,
		receiver,
		amount,
		deliveryTime
	} = event;
	let c_id = "c" + Date.now();
	await db.collection('outbound').add({
		c_id,
		address,
		firstClassification,
		secondClassification,
		designation,
		brand,
		norms,
		applicant,
		receiver,
		amount,
		deliveryTime,
		auditstate: 0,
		create_time: Date.now()
	})
	return {
		code: 0,
		data: {
			msg: "已出库领用，待审核"
		}
	}



};
