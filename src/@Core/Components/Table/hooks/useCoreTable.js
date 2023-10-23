/*
 * Created Date: 03-02-2023, 21:00 pm
 * Author: Nghiêm Mạnh Cường
 * Email: nghiemmanhcuong98@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import { useCallback } from 'react';

const DEFAULT_RESPONSE = {
   data: [],
   page_size: 10,
   page_index: 1,
   total: 1
};

const useCoreTable = (requests) => {
   const { data = DEFAULT_RESPONSE, loading, runAsync } = requests;
   console.log(data)
   const handleFetchData = useCallback((params) => {
      const query = {
         ...params,
         page_size: 10
      };
      return runAsync(query);
   }, []);

   return {
      data: data,
      pageSize: Number(data?.limit) ?? 10,
      pageIndex: Number(data?.page) ?? 1,
      total: Number(data?.totalPages),
      handleFetchData,
      loading
   };
};

export default useCoreTable;
