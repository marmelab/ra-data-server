import Collection from "./Collection.js";

const inMemoryDb = (data) => {
    const resources = Object.keys(data).reduce((acc, key) => {
        return { ...acc, [key]: new Collection(data[key]) };
    }, {});

    return resources;
};

export default inMemoryDb;
