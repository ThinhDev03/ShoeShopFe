import { default as BaseService } from '@Core/Api/BaseService';

class ColorService extends BaseService {
    BASE_ENDPOINT = '/color';

    constructor(params) {
        super(params);
        this.setRequest();
    }

    createColor(data) {
        return this.create(data);
    }

    getAll() {
        return this.request(this.BASE_ENDPOINT);
    }

    deleteColor(id) {
        return this.delete(id);
    }

    getOne(id) {
        return this.find(id);
    }

    updateOne(data, id, method = 'post') {
        return this.update(data, id, method);
    }
}

const colorService = new ColorService();
export default colorService;
