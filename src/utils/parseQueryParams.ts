import { IRequest } from "../types/Request";

export class QueryParams {

    parse(req: IRequest){
        const protocol = req.secure ? 'https' : (req.headers['x-forwarded-proto'] || 'http');
        const url = req.url ? new URL(req.url, `${protocol}://${req.headers.host}`) : new URL(`${protocol}://${req.headers.host}`);
        return Object.fromEntries(url.searchParams.entries())
    }
}