import { Request, Response, NextFunction } from "express";
import {
    DataProviderServerProxy,
    DataProviderTypes,
    Params,
    dataProviderTypes,
} from "./types";

import { callHandler } from "./callHandler";

export const expressDataProvider = (handler: DataProviderServerProxy) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const type: DataProviderTypes = req.body.type;
        const resource: string = req.body.resource;
        const params: Params<typeof type> = req.body.params;

        if (!dataProviderTypes.includes(type)) {
            return next();
        }

        return callHandler(handler, type, resource, params)
            .then((response) => {
                res.status(response.status);
                res.json(response.body);
            })
            .catch(next);
    };
};
