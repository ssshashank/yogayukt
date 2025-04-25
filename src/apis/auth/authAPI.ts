import { APIType, AuthType } from "@/constants/network";
import { HttpResponse } from "@/models/httpResponse.models";
import { HttpService } from "@/services/http.service";
import { errorDebug } from "@/utils/error.utils";
import { Network } from "@/utils/network.utils";

const AuthAPI = {
    signup: async function(data: Object) {
        const _url = `${Network(APIType.AUTH)}${AuthType.SIGNUP}`;
        const httpService = new HttpService({
            URL: _url,
            dataToSend: data,
        });
        try {
            const response: HttpResponse = await httpService.sendPostRequest();
            return response;
        } catch (error) {
            return errorDebug(error, "AuthAPI.signup");
        }
    },
    login: async function(data: Object) {
        const _url = `${Network(APIType.AUTH)}${AuthType.LOGIN}`;
        const httpService = new HttpService({
            URL: _url,
            dataToSend: data
        });
        try {
            const response = await httpService.sendPostRequest();
            return response;
        } catch (error) {
            return errorDebug(error, "AuthAPI.login");
        }
    },
    forgotPassword: async function(data: Object) { },
    verifyPassword: async function(data: Object) { },
};

export { AuthAPI };
