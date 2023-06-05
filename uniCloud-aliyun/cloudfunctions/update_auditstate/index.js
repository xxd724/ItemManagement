'use strict';
const db = uniCloud.database();
const $ = db.command;
exports.main = async (event, context) => {
	const {
		_id,
		designation,
		address,
		amount,
		auditstate
	} = event;
	const result = await db.collection('goods')
		.aggregate()
		.match({
			designation,
			address,
		})
		.end()
	if (result.affectedDocs === 0) {
		return {
			code: 0,
			data: {
				msg: "此地区库存无该物品",
				status: 0
			}
		}
	} else {
		const num = result.data[0].total - amount;
		if (num < 0) {
			return {
				code: 0,
				data: {
					msg: "此地区库存不足，剩余" + result.data[0].total,
					status: 0
				}
			}
		} else {
			await db.collection('outbound').doc(_id).update({
				auditstate: 2,
			})
			await db.collection('goods').doc(result.data[0]._id).update({
				total: String(Number(result.data[0].total) - Number(amount))
			})
			return {
				code: 0,
				data: {
					msg: "已通过审批",
					status: 1
				}
			}
		}
	}
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: "审核通过"
		}
	}
};
