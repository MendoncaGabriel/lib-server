import { IResponse } from "../types/Response";

export function setHeaderResponse(res: IResponse, type: string) {
    switch (type) {
        case "json":
            res.setHeader("Content-Type", "application/json");
            break;
        case "html":
            res.setHeader("Content-Type", "text/html");
            break;
        case "text":
            res.setHeader("Content-Type", "text/plain");
            break;
        case "binary":
            res.setHeader("Content-Type", "application/octet-stream");
            break;
        case "css":
            res.setHeader("Content-Type", "text/css");
            break;
        case "js":
            res.setHeader("Content-Type", "application/javascript");
            break;
        case "xml":
            res.setHeader("Content-Type", "application/xml");
            break;
        case "svg":
            res.setHeader("Content-Type", "image/svg+xml");
            break;
        case "pdf":
            res.setHeader("Content-Type", "application/pdf");
            break;
        case "ico":
            res.setHeader("Content-Type", "image/x-icon");
            break;
        case "jpg":
        case "jpeg":
            res.setHeader("Content-Type", "image/jpeg");
            break;
        case "png":
            res.setHeader("Content-Type", "image/png");
            break;
        case "gif":
            res.setHeader("Content-Type", "image/gif");
            break;
        case "mp3":
            res.setHeader("Content-Type", "audio/mpeg");
            break;
        case "wav":
            res.setHeader("Content-Type", "audio/wav");
            break;
        case "mp4":
            res.setHeader("Content-Type", "video/mp4");
            break;
        case "webm":
            res.setHeader("Content-Type", "video/webm");
            break;
        case "zip":
            res.setHeader("Content-Type", "application/zip");
            break;
        case "7z":
            res.setHeader("Content-Type", "application/x-7z-compressed");
            break;
        default:
            res.setHeader("Content-Type", "text/plain");
    }
}
