export function errorDebug(error: any, identityCode: any) {
	let err = new Error();
	const message = `
        Identity Code  📢 :: ${identityCode}
        StackTrace 🚀 :: ${err.stack}
    `;
	const errorResult = {
		statusCode: error.message,
		responseBody: error.data,
		stackTrace: message,
	};

	return errorResult;
}
