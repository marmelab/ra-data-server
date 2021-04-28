import inMemoryDb from "./utils/inMemoryDb.js";
import data from "./data.js";

const db = inMemoryDb(data);

const handlers = {
    async getList(resource, params) {
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
        return {
            body: {
                data: db[resource].getOne(params.id, { ...params }),
            },
            status: 200,
        };
    },
    async getMany(resource, params) {
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
        params.ids.forEach((id) =>
            db[resource].updateOne(id, {
                ...params.data,
            })
        );
        return { body: { data: params.ids }, status: 200 };
    },
    async create(resource, params) {
        return {
            body: {
                data: db[resource].addOne({ ...params.data }),
            },
            status: 200,
        };
    },
    async delete(resource, params) {
        return {
            body: { data: db[resource].removeOne(params.id) },
            status: 200,
        };
    },
    async deleteMany(resource, params) {
        params.ids.forEach((id) => db[resource].removeOne(id));
        return { body: { data: params.ids }, status: 200 };
    },
};

export default handlers;
