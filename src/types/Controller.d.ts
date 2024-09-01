import { Request } from "./Request";
import { Response } from "./Response";

export interface Controller {
    (req: Request, res: Response ): void;
}