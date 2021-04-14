import { Component, method, expose, primaryIdentifier } from "@layr/component";
import { serveComponent } from "@layr/component-express-middleware";

export const createDataProvider = (handler) => {
    class DataProvider extends Component {
        @primaryIdentifier() id;
        @expose({ call: true }) @method() getList(resource, params) {
            return handler.getList(resource, params);
        }
        @expose({ call: true }) @method() getOne(resource, params) {
            return handler.getOne(resource, params);
        }
        @expose({ call: true }) @method() getMany(resource, params) {
            return handler.getMany(resource, params);
        }
        @expose({ call: true }) @method() getManyReference(resource, params) {
            return handler.getManyReference(resource, params);
        }
        @expose({ call: true }) @method() update(resource, params) {
            return handler.update(resource, params);
        }
        @expose({ call: true }) @method() updateMany(resource, params) {
            return handler.updateMany(resource, params);
        }
        @expose({ call: true }) @method() create(resource, params) {
            return handler.create(resource, params);
        }
        @expose({ call: true }) @method() delete(resource, params) {
            return handler.delete(resource, params);
        }
        @expose({ call: true }) @method() deleteMany(resource, params) {
            return handler.deleteMany(resource, params);
        }
    }

    return serveComponent(DataProvider);
};
