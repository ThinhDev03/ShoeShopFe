/*
 * Created Date: 04-02-2023, 10:45 pm
 * Author: Nghiêm Mạnh Cường
 * Email: nghiemmanhcuong98@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) Đỗ Thành trung
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import middlewares from './Middleware';
import createInstance from './Axios';

class BaseService {
   BASE_URL = import.meta.env.VITE_BASE_URL;

   BASE_ENDPOINT = '';

   DEFAULT_LIMIT = 10;

   DEFAULT_PAGE = 1;

   PRIMARY_KEY = 'id';

   DEFAULT_SORT = 'createdAt -1';

   ALL_MIDDLEWARES = {
      ...middlewares
   };
   constructor(props) {
      this.setRequest();
   }

   /**
    * @param {AxiosRequestConfig} requestConfig
    * @returns
    */
   middleware = (requestConfig) => {
      const arr = Object.values(this.ALL_MIDDLEWARES).map((m) => {
         if (typeof m === 'function') {
            return m(requestConfig);
         }

         return m;
      });
      return arr;
   };

   setRequest() {
      this.request = createInstance(this.BASE_URL, this.middleware);

      this.requestParams = {
         page: this.DEFAULT_PAGE,
         limit: this.DEFAULT_LIMIT,
         sort: this.DEFAULT_SORT
      };
   }

   /**
    * @param {Object} query
    * @returns
    */
   list = (query = {}, path) => {
      const params = {
         ...this.requestParams,
         ...query
      };

      const url = path ? this.BASE_ENDPOINT + path : this.BASE_ENDPOINT;
      return this.request.get(url, { params });
   };

   /**
    * @param {string} id
    * @returns
    */
   find = (id, query = {}) => {
      const url = `${this.BASE_ENDPOINT}/${id}`;
      return this.request.get(url, query);
   };

   /**
    * @param {Object} data
    * @returns
    */
   create = (data) => {
      return this.request.post(this.BASE_ENDPOINT + '/create', data);
   };

   /**
    * @param {Object} data
    * @returns
    */
   update = (data, id, method = 'post') => {
      if (id) {
         return this.request[method](`${this.BASE_ENDPOINT}/update/${id}`, data);
      }
      return this.request[method](`${this.BASE_ENDPOINT}/update/${data[this.PRIMARY_KEY]}`, data);
   };
   /**
    * @param {Object} data
    * @returns
    */
   save = (data) => {
      if (data.hasOwnProperty(this.PRIMARY_KEY) && data[this.PRIMARY_KEY]) {
         return this.update(data);
      } else {
         return this.create(data);
      }
   };

   /**
    * @param {string} id
    * @returns
    */
   delete = (id) => {
      return this.request.delete(this.BASE_ENDPOINT + '/remove/' + id);
   };
}

export default BaseService;
