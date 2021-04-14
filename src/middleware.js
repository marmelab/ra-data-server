import { Component, method } from "@layr/component";
import { serveComponent } from "@layr/component-express-middleware";

export const createDataProvider = (handler) => {
    class DataProvider extends Component {
        @method() getList(resource, params) {
            return handler.getList(resource, params);
        }
        @method() getOne(resource, params) {
            return handler.getOne(resource, params);
        }
        @method() getMany(resource, params) {
            return handler.getMany(resource, params);
        }
        @method() getManyReference(resource, params) {
            return handler.getManyReference(resource, params);
        }
        @method() update(resource, params) {
            return handler.update(resource, params);
        }
        @method() updateMany(resource, params) {
            return handler.updateMany(resource, params);
        }
        @method() create(resource, params) {
            return handler.create(resource, params);
        }
        @method() delete(resource, params) {
            return handler.delete(resource, params);
        }
        @method() deleteMany(resource, params) {
            return handler.deleteMany(resource, params);
        }
    }

    return serveComponent(DataProvider);
};
