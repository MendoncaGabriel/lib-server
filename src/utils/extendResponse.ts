import { ServerResponse } from "http";
import { IResponse } from "../types/Response";
import { setHeaderResponse } from "../utils/setHeaderResponse";

export function extendResponse(res: ServerResponse): IResponse {
    const extendedRes = res as IResponse;

    extendedRes.send = function (data?: string | Buffer, encoding?: string): IResponse {
        let contentType: string;

        switch (true) {
            case typeof data === "object":
                contentType = "json";
                setHeaderResponse(extendedRes, contentType);
                extendedRes.end(JSON.stringify(data), encoding);
                break;

            case typeof data === "string":
                if (data.trim().startsWith("<") && data.trim().endsWith(">")) {
                    contentType = "html";
                } else if (data.endsWith(".css")) {
                    contentType = "css";
                } else if (data.endsWith(".js")) {
                    contentType = "js";
                } else if (data.endsWith(".xml")) {
                    contentType = "xml";
                } else if (data.endsWith(".svg")) {
                    contentType = "svg";
                } else if (data.endsWith(".pdf")) {
                    contentType = "pdf";
                } else if (data.endsWith(".ico")) {
                    contentType = "ico";
                } else if (data.endsWith(".jpg") || data.endsWith(".jpeg")) {
                    contentType = "jpg";
                } else if (data.endsWith(".png")) {
                    contentType = "png";
                } else if (data.endsWith(".gif")) {
                    contentType = "gif";
                } else if (data.endsWith(".mp3")) {
                    contentType = "mp3";
                } else if (data.endsWith(".wav")) {
                    contentType = "wav";
                } else if (data.endsWith(".mp4")) {
                    contentType = "mp4";
                } else if (data.endsWith(".webm")) {
                    contentType = "webm";
                } else if (data.endsWith(".zip")) {
                    contentType = "zip";
                } else if (data.endsWith(".7z")) {
                    contentType = "7z";
                } else {
                    contentType = "text";
                }
                setHeaderResponse(extendedRes, contentType);
                extendedRes.end(data, encoding);
                break;

            case Buffer.isBuffer(data):
                contentType = "binary";
                setHeaderResponse(extendedRes, contentType);
                extendedRes.end(data, encoding);
                break;

            default:
                contentType = "text";
                setHeaderResponse(extendedRes, contentType);
                extendedRes.end(String(data), encoding);
                break;
        }

        return extendedRes;
    };

    extendedRes.locals = {};

    return extendedRes;
}
