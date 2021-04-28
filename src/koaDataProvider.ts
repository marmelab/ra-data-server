import { DataProviderServerProxy, DataProviderTypes, Params } from "./types";

import { callHandler } from "./callHandler";

export const koaDataProvider = (handler: DataProviderServerProxy) => {
    return async (ctx: any, next: any) => {
        const body = ctx.request.body;
        const type: DataProviderTypes = body.type;
        const resource: string = body.resource;
        const params: Params<typeof type> = body.params;

        return callHandler(handler, type, resource, params)
            .then((response) => {
                ctx.status = response.status;
                ctx.body = response.body;
            })
            .catch(next);
    };
};
