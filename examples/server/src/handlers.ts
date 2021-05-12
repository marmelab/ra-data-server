import inMemoryDb from "./utils/inMemoryDb";
import data from "./data";
import { DataProviderServerProxy } from "../../../src/types";

const db = inMemoryDb(data);

let queryCount = 0;

const handlers: DataProviderServerProxy = {
    async getList(resource, params) {
        queryCount++;
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: [field, order],
            range: [(page - 1) * perPage, page * perPage - 1],
            filter: params.filter,
        };
        return {
            body: {
                data: db[resource].getAll(query),
                total: db[resource].getCount({
                    filter: params.filter,
                }),
            },
            status: 200,
        };
    },
    async getOne(resource, params) {
        queryCount++;
        return {
            body: {
                data: db[resource].getOne(params.id, { ...params }),
            },
            status: 200,
        };
    },
    async getMany(resource, params) {
        queryCount++;
        return {
            body: {
                data: db[resource].getAll({
                    filter: { id: params.ids },
                }),
            },
            status: 200,
        };
    },
    async getManyReference(resource, params) {
        queryCount++;
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: [field, order],
            range: [(page - 1) * perPage, page * perPage - 1],
            filter: { ...params.filter, [params.target]: params.id },
        };
        return {
            body: {
                data: db[resource].getAll(query),
                total: db[resource].getCount({
                    filter: query.filter,
                }),
            },
            status: 200,
        };
    },
    async update(resource, params) {
        queryCount++;
        return {
            body: {
                data: db[resource].updateOne(params.id, {
                    ...params.data,
                }),
            },
            status: 200,
        };
    },
    async updateMany(resource, params) {
        queryCount++;
        params.ids.forEach((id) =>
            db[resource].updateOne(id, {
                ...params.data,
            })
        );
        return { body: { data: params.ids }, status: 200 };
    },
    async create(resource, params) {
        queryCount++;
        return {
            body: {
                data: db[resource].addOne({ ...params.data }),
            },
            status: 200,
        };
    },
    async delete(resource, params) {
        queryCount++;
        return {
            body: { data: db[resource].removeOne(params.id) },
            status: 200,
        };
    },
    async deleteMany(resource, params) {
        params.ids.forEach((id) => db[resource].removeOne(id));
        return { body: { data: params.ids }, status: 200 };
    },
    // because why not ?
    async countRequestSinceServerStart() {
        return { body: { data: queryCount }, status: 200 };
    },
};

export default handlers;
