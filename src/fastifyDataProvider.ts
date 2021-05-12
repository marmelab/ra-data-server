import { FastifyReply, FastifyRequest } from "fastify";
import { DataProviderServerProxy, DataProviderTypes, Params } from "./types";

import { callHandler } from "./callHandler";

export const fastifyDataProvider = (handler: DataProviderServerProxy) => {
    return (request: FastifyRequest<any>, reply: FastifyReply) => {
        const type: DataProviderTypes = request.body.type;
        const resource: string = request.body.resource;
        const params: Params<typeof type> = request.body.params;

        return callHandler(handler, type, resource, params).then((response) => {
            reply.statusCode = response.status;
            reply.send(response.body);
        });
    };
};
