import { APIType, AuthType } from "@/constants/network";
import { HttpResponse } from "@/models/httpResponse.models";
import { HttpService } from "@/services/http.service";
import { errorDebug } from "@/utils/error.utils";
import { Network } from "@/utils/network.utils";

const AuthAPI = {
	signup: async function (data: Object) {
		const url = `${Network(APIType.AUTH)}${AuthType.SIGNUP}`;
		const httpService = new HttpService({
			URL: url,
			dataToSend: data,
		});
		try {
			const response: HttpResponse = await httpService.sendPostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "AuthAPI.signup");
		}
	},
	login: async function (data: Object) {},
	forgotPassword: async function (data: Object) {},
	verifyPassword: async function (data: Object) {},
};

export { AuthAPI };
