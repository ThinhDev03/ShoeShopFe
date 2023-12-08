import { default as BaseService } from '@Core/Api/BaseService';

class StatisticService extends BaseService {
   BASE_ENDPOINT = '/statistic';

   constructor(params) {
      super(params);
      this.setRequest();
   }

   getBestSeller(params) {
      return this.find('best-seller', params);
   }
   getRevenueAll() {
      return this.find('revenue-all');
   }
   getTopRate(params) {
      return this.find('top-rate', params);
   }
   getRevenue() {
      return this.find('revenue');
   }
}

const statisticService = new StatisticService();
export default statisticService;
