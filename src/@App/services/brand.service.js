import BaseService from '@Core/Api/BaseService';

class BrandService extends BaseService {
    BASE_ENDPOINT = 'brand';

    constructor(params) {
        super(params);
        this.setRequest();
    }

    getAll() {
        return this.request(this.BASE_ENDPOINT);
    }

    createBrand(data) {
        return this.create(data);
    }

    deleteBrand(id) {
        return this.delete(id);
    }

    getOne(id) {
        return this.find(id);
    }

    updateOne(data, id, method = 'post') {
        return this.update(data, id, method);
    }
}

const brandService = new BrandService();
export default brandService;
