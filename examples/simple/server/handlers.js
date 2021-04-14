import inMemoryDb from "./utils/inMemoryDb.js";
import data from "./data.js";

const db = inMemoryDb(data);

const handlers = {
    getList: (resource, type, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: [field, order],
            range: [(page - 1) * perPage, page * perPage - 1],
            filter: params.filter,
        };
        return {
            data: db[resource].getAll(query),
            total: db[resource].getCount({
                filter: params.filter,
            }),
        };
    },
    getOne(resource, params) {
        return {
            data: db[resource].getOne(params.id, { ...params }),
        };
    },
    getMany(resource, params) {
        return {
            data: db[resource].getAll({
                filter: { id: params.ids },
            }),
        };
    },
    getManyReference(resource, params) {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: [field, order],
            range: [(page - 1) * perPage, page * perPage - 1],
            filter: { ...params.filter, [params.target]: params.id },
        };
        return {
            data: db[resource].getAll(query),
            total: db[resource].getCount({
                filter: query.filter,
            }),
        };
    },
    update(resource, params) {
        return {
            data: db[resource].updateOne(params.id, {
                ...params.data,
            }),
        };
    },
    updateMany(resource, params) {
        params.ids.forEach((id) =>
            db[resource].updateOne(id, {
                ...params.data,
            })
        );
        return { data: params.ids };
    },
    create(resource, params) {
        return {
            data: db[resource].addOne({ ...params.data }),
        };
    },
    delete(resource, params) {
        return { data: db[resource].removeOne(params.id) };
    },
    deleteMany(resource, params) {
        params.ids.forEach((id) => db[resource].removeOne(id));
        return { data: params.ids };
    },
};

export default handlers;
