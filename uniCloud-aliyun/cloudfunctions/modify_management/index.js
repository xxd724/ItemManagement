'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		_id
	} = event;
	const res = await db.collection('user').doc(_id).update({
		status: 2
	})
	if (res.affectedDocs) {
		const result = await db.collection('user').doc(_id).get()
		console.log(result, "eee");
		return {
			code: 0,
			data: result.data[0]
		}
	}

};
