import axios from "axios";
import { errorDebug } from "@/utils/error.utils";
import { HTTPStatusCode } from "@/constants/network";
import { HttpResponse } from "@/models/httpResponse.models";

interface HTTPServiceConfig {
    contentType?: string;
    URL?: string;
    authToken?: string;
    isAuthRequired?: boolean;
    dataToSend?: object;
}
export class HttpService {
    private _URL?: string;
    private _dataToSend?: object;

    constructor({
        contentType = "application/json; charset=UTF-8",
        URL,
        authToken,
        isAuthRequired = false,
        dataToSend,
    }: HTTPServiceConfig = {}) {
        this._URL = URL;
        this._dataToSend = dataToSend;
    }

    /**
     * @Function SEND_POST_REQUEST()
     * @Methods axios.POST()
     * @Returns An Object
     */
    async sendPostRequest(): Promise<HttpResponse> {
        try {
            const response = await axios.post(
                this._URL || "", // URL Passing
                this._dataToSend, // Data-Body Passing
            );
            return {
                statusCode: response?.status,
                responseBody: response?.data,
            };
        } catch (error: any) {
            const errorResult: HttpResponse = errorDebug(
                error?.response?.data,
                "httpCall.sendPostRequest()",
            );
            return {
                statusCode: errorResult?.statusCode,
                responseBody: errorResult?.responseBody,
            };
        }
    }

    /**
   * @Function SEND_GET_REQUEST()
   * @Methods axios.GET()
   * @Returns An Object
   */

    async sendGetRequest(): Promise<HttpResponse> {
        try {
            const response = await axios.get(this._URL || "");
            return {
                statusCode: response?.status,
                responseBody: response?.data,
            };
        } catch (error: any) {
            const errorResult: HttpResponse = errorDebug(
                error?.response?.data,
                "httpCall.sendGetRequest()",
            );
            return {
                statusCode: errorResult?.statusCode,
                responseBody: errorResult?.responseBody,
            };
        }
    }

    /**
     * @Function SEND_PUT_REQUEST()
     * @Methods axios.PUT()
     * @Returns An Object
     */

    async sendPutRequest(): Promise<HttpResponse> {
        try {
            const response = await axios.put(this._URL || "", this._dataToSend);
            return {
                statusCode: response.status,
                responseBody: response.data,
            };
        } catch (error: any) {
            const errorResult: HttpResponse = errorDebug(
                error.response.data,
                "httpCall.sendPutRequest()",
            );
            return {
                statusCode: errorResult.statusCode,
                responseBody: errorResult.responseBody,
            };
        }
    }

    //TODO:- Implementation
    async sendDeleteRequest(): Promise<void> { }

    /**
     * @Function SEND_POST_REQUEST()
     * @Methods axios.POST()
     * @Returns An Object
     */

    async sendUploadImagePostRequest(): Promise<HttpResponse> {
        try {
            const response = await axios.post(
                this._URL || "", // URL Passing
                this._dataToSend, // Data-Body Passing
            );
            return {
                statusCode: response?.status,
                responseBody: response?.data,
            };
        } catch (error: any) {
            const errorResult: HttpResponse = errorDebug(
                error?.response?.data,
                "httpCall.sendPostRequest()",
            );
            return {
                statusCode: errorResult?.statusCode,
                responseBody: errorResult?.responseBody,
            };
        }
    }
}
