'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		userId,
		filePath
	} = event;
	const user = await db.collection('user').doc(userId).get();
	const oldUrl = user.data[0].avatar;
	try {
		await uniCloud.deleteFile({
			filePath: [oldUrl]
		})
	} catch (e) {
		console.log(e);
	}

	await db.collection('user').doc(userId).update({
		avatar: filePath
	})
	return {
		code: 0,
		data: {
			msg: "头像更换成功"
		}
	}
};
