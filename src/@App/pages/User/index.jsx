import BasicPage from '@App/components/customs/BasicPage';
import userService from '@App/services/user.service';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import useCoreTable from '@Core/Components/Table/hooks/useCoreTable';
import { useRequest } from 'ahooks';
import React, { useEffect, useMemo } from 'react';

export default function User() {
   const userRequests = useRequest(userService.getTeacher, {
      manual: true,
      onError: () => {
         mutate({
            data: []
         });
      }
   });

   const { run: getUser, mutate } = userRequests;
   const userTableHandler = useCoreTable(userRequests);

   useEffect(() => {
      getUser();

      //! tempfix
      (async () => {
         if (!userTableHandler?.data?.data.length) {
            userTableHandler.data.data = await userService.getTeacher();
            console.log(userTableHandler);
         }
      })();
   }, []);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor('displayName', {
            header: 'Tên Giáo Viên'
         }),
         columnHelper.accessor('email', {
            header: 'Email'
         }),
         columnHelper.accessor('phone', {
            header: 'Điện thoại'
         })
      ];
   }, []);

   return (
      <BasicPage currentPage='User'>
         <CoreTable columns={columns} {...userTableHandler} data={userTableHandler?.data?.data} />
      </BasicPage>
   );
}
