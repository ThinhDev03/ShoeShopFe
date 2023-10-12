/*
 * Created Date: 04-02-2023, 10:45 pm
 * Author: Nghiêm Mạnh Cường
 * Email: nghiemmanhcuong98@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) ...
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import httpStatusCode from '@App/configs/httpStatusCode';
import authService, { authEndpoint } from '@App/services/auth.service';
import axios from 'axios';
import queryString from 'query-string';

const createInstance = (baseUrl, middleware = () => {}) => {
   const options = {
      baseURL: baseUrl,
      withCredentials: true,
      headers: {
         'X-Requested-With': 'XMLHttpRequest'
      },
      paramsSerializer: {
         serializer: (params) => {
            return queryString.stringify(params);
         }
      }
   };

   const instance = axios.create(options);
   instance.interceptors.request.use(
      async (requestConfig) => {
         await Promise.all(middleware(requestConfig));
         return requestConfig;
      },
      (requestError) => {
         return Promise.reject(requestError);
      }
   );

   instance.interceptors.response.use(
      (response) => {
         if (response && response.data) {
            return response.data;
         } else {
            return response;
         }
      },
      async (error) => {
         // let isRefetch = true;
         // const config = error.response?.config || {};
         // const { url } = config;
         // // console.log(authEndpoint.base + '/' + authEndpoint.refestToken, 'url');
         // const originalRequest = error.config;

         // // Kiểm tra xem lỗi có phải do token hết hạn hay không
         // if (
         //    httpStatusCode.UNAUTHORIZED &&
         //    url !== authEndpoint.base + '/' + authEndpoint.refestToken &&
         //    !originalRequest._retry
         // ) {
         //    originalRequest._retry = true;
         //    if (isRefetch) {
         //       isRefetch = false;
         //       try {
         //          await authService.refeshToken();
         //          isRefetch = true;
         //          // Gửi lại request đã bị gián đoạn với token mới
         //          return instance(originalRequest);
         //       } catch (error) {
         //          isRefetch = true;
         //       }
         //    }
         //    // Lấy token mới
         // }
         return Promise.reject(error);
      }
   );

   return instance;
};

export default createInstance;
