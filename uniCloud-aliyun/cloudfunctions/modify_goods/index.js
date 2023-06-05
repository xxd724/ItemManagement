'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(event);
	//event为客户端上传的参数
	const {
		address,
		firstClassification,
		secondClassification,
		designation,
		brand,
		norms,
		amount,
		qualityTime,
		_id,
		num
	} = event;
	const total = amount - num;
	const result = await db.collection('goods')
		.aggregate()
		.match({
			address,
			designation
		})
		.end()
	await db.collection('goods').doc(result.data[0]._id).update({
		total: String(Number(result.data[0].total) + Number(total))
	})
	const res = await db.collection('assemble').doc(_id).update({
		address,
		firstClassification,
		secondClassification,
		designation,
		brand,
		norms,
		amount,
		qualityTime
	})

	//返回数据给客户端
	return res.affectedDocs ? {
		code: 0,
		data: {
			msg: "修改成功"
		}
	} : {
		code: 1,
		msg: "修改失败"
	}
};
