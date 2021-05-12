# Serverside Data Provider For React-Admin using remote procedure call (RPC)

Serverside Data Provider for [react-admin](https://github.com/marmelab/react-admin), the frontend framework for building admin applications on top of REST/GraphQL services.

[![react-admin-demo](https://marmelab.com/react-admin/img/react-admin-demo-still.png)](https://vimeo.com/268958716)

ra-data-provider is still under development

## Installation

```sh
npm install --save ra-data-server
```

## Usage

### On express server

```js
import express from "express";
import { expressDataProvider } from "ra-data-server";

const handlers = {
    getList: ...,
    ...
};

const dataProviderMiddleware = expressDataProvider(handlers);

const app = express();
app.use(express.json());
app.use("/admin", dataProviderMiddleware);
app.listen("3000");
```

### Or on a fastify server

```js
import fastify from "fastify";
import { fastifyDataProvider } from "ra-data-server";

const handlers = {
    getList: ...,
    ...
};

const app = fastify();
app.post("/admin", fastifyDataProvider(handlers));
app.listen("3000", function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
});
```

### On the front

```jsx
// in src/App.js
import * as React from "react";
import { Admin, Resource } from "react-admin";
import { serverSideDataProvider } from "ra-data-server";

import { PostList } from "./posts";

const App = () => (
    <Admin dataProvider={serverSideDataProvider("http://localhost:3000/admin")}>
        <Resource name="posts" list={PostList} />
    </Admin>
);

export default App;
```

### implementing a serverside dataProvider handler

The handler to pass to expressDataProvider has mostly the same type signature as the client side dataProvider.
The only difference being the result that is of the form:

```js
{
    body: // json containing the traditional result of a dataProvider if all is good, an error object otherwise
    status: // the status code 200 if all is good
}
```

```js
 const dataProvider = {
    async getList(
        resource,
        {
            pagination: { page, perPage },
            sort: { field, order },
            filter,
        }
    ) {
        // handle the logic to get the list for the resource using the params

        return {
            status: 200,
            body: {
                data: [/* The returned records */],
                total: // the total number of record matching the given filter,
                validUntil: // optional validity date
            },
        };
    }
    async getOne(
        resource,
        { id }
    ) {
        // handle the logic to get the record
        return {
            status: 200,
            body: {
                data: // the fetched record,
                validUntil: // optional validity date
            },
        };
    }
    async getMany(
        resource,
        { ids }
    ) {
        // handle the logic to get the records
        return {
            status: 200,
            body: {
                data: [/* the fetched record */],
                validUntil: // optional validity date
            },
        };
    }
    async getManyReference(
        resource,
        {
            target,
            id,
            pagination: { page, perPage },
            sort: { field, order },
            filter
        }
    ) {
        // handle the logic to get the records
        return {
            status: 200,
            body: {
                data: [/* the returned records */],
                total: // the total number of record matching the given filter,
                validUntil: // optional validity date
            },
        };
    }
    async update(
        resource,
        { id, data, previousData }
    ) {
        // handle the update logic
        return {
            status: 200,
            body: {
                data: /* the updated record */,
                validUntil: // optional validity date
            },
        };
    }
    async updateMany(
        resource,
        { ids, data }
    ) {
        // handle the updateMany logic
        return {
            status: 200,
            body: {
                data: [/* the updated records ids */],
                validUntil: // optional validity date
            },
        };
    }
    async create(
        resource,
        { data }
    ) {
        // handle the create logic
        return {
            status: 200,
            body: {
                data: /* the created record */,
                validUntil: // optional validity date
            },
        };
    }
    async delete(
        resource,
        { id, previousData }
    ) {
        // handle the delete logic
        return {
            status: 200,
            body: {
                data: /* the deleted record */,
            },
        };
    }
    async deleteMany(
        resource,
        { ids }
    ) {
        // handle the deleteMany logic
        return {
            status: 200,
            body: {
                ids: /* the ids of the deleted record */,
            },
        };
    }
};
```

## License

This data provider is licensed under the MIT License, and sponsored by [marmelab](https://marmelab.com).
