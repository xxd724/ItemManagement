'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await db.collection('outbound')
		.aggregate()
		.end()

	return {
		code: 0,
		data: res.data
	}
};
