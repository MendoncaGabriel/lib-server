import { IncomingMessage, ServerResponse } from 'node:http';
import { IRequest } from '../types/Request';
import { IResponse } from '../types/Response';

export function adaptRequest(req: IncomingMessage): IRequest {
  return req as IRequest; // Aqui você pode adicionar a conversão necessária para incluir params, query, etc.
}

export function adaptResponse(res: ServerResponse): IResponse {
  return res as IResponse; // Aqui você pode adicionar a conversão necessária se precisar
}
