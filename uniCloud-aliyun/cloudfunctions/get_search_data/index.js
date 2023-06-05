'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		searchTitle,
		searchVal
	} = event;
	if (searchTitle === 0) {
		const res = await db.collection('outbound')
			.aggregate()
			.match({
				firstClassification: new RegExp(searchVal)
			})
			.end()
		return {
			code: 0,
			msg: "搜索成功",
			data: res.data
		}
	} else if (searchTitle === 1) {
		const res1 = await db.collection('outbound')
			.aggregate()
			.match({
				secondClassification: new RegExp(searchVal)
			})
			.end()
		return {
			code: 0,
			msg: "搜索成功",
			data: res1.data
		}
	} else if (searchTitle === 2) {
		const res2 = await db.collection('outbound')
			.aggregate()
			.match({
				designation: new RegExp(searchVal)
			})
			.end()
		return {
			code: 0,
			msg: "搜索成功",
			data: res2.data
		}
	} else if (searchTitle === 3) {
		const res3 = await db.collection('outbound')
			.aggregate()
			.match({
				norms: new RegExp(searchVal)
			})
			.end()
		return {
			code: 0,
			msg: "搜索成功",
			data: res3.data
		}
	} else {
		const res4 = await db.collection('outbound')
			.aggregate()
			.match({
				address: new RegExp(searchVal)
			})
			.end()
		return {
			code: 0,
			msg: "搜索成功",
			data: res4.data
		}
	}
};
