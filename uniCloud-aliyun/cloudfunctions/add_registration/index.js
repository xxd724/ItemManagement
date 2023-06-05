'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		address,
		firstClassification,
		secondClassification,
		designation,
		brand,
		norms,
		amount,
		storageTime,
		qualityTime,
		remarks,
		applicant
	} = event;
	let r_id = "r" + Date.now();
	await db.collection('assemble').add({
		r_id,
		address,
		firstClassification,
		secondClassification,
		designation,
		brand,
		norms,
		amount,
		storageTime,
		qualityTime,
		remarks,
		applicant,
		create_time: Date.now()
	})
	const result = await db.collection('goods')
		.aggregate()
		.match({
			designation
		})
		.end()
	if (result.affectedDocs === 0) {
		await db.collection('goods').add({
			address,
			firstClassification,
			secondClassification,
			designation,
			total: amount
		})
	} else if (result.affectedDocs) {
		let arr = result.data.filter(item => item.address === address);
		if (arr.length === 0) {
			await db.collection('goods').add({
				address,
				firstClassification,
				secondClassification,
				designation,
				total: amount
			})
		} else {
			await db.collection('goods').doc(arr[0]._id).update({
				total: String(Number(arr[0].total) + Number(amount))
			})
		}
	}
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: "入库成功"
		},
	}
}
