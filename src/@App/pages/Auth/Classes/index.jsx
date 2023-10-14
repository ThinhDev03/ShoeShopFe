import BasicPage from '@App/components/customs/BasicPage';
import classesService from '@App/services/classes.service';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Components/Table/components/CoreTableActions';
import useCoreTable from '@Core/Components/Table/hooks/useCoreTable';
import { Box } from '@mui/material';
import { useRequest } from 'ahooks';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Classes() {
   const navigate = useNavigate()
   const classRequests = useRequest(classesService.list, {
      manual: true,
      onError: () => {
         mutate({
            data: []
         });
      }
   });

   const { run: getClasses, mutate } = classRequests;
   const classTableHandler = useCoreTable(classRequests);

   const { runAsync: deleteClass } = useRequest(classesService.delete, {
      manual: true,
      onSuccess: async() => {
         // SUCCESS MESSGE
         await classTableHandler.handleFetchData()
      },
      onError: () => {
         // ERROR MESSGE
      }
   });

   useEffect(() => {
      getClasses();
   }, []);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor('_id', {
            header: 'Mã bài viết'
         }),
         columnHelper.accessor('className', {
            header: 'Tên Lớp'
         }),
         columnHelper.accessor('grade', {
            header: 'Cấp học'
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const subject = row?.original;
               return (
                  <Box>
                     <CoreTableActionEdit callback={() => navigate('/classes/update/' + subject?._id)}/>
                     <CoreTableActionDelete callback={() => deleteClass(subject?._id)} content='Bạn có muốn xoá môn học này?'/>
                  </Box>
               );
            }
         })
      ];
   }, []);

   return (
      <BasicPage currentPage='Classes'>
         <CoreTable columns={columns} {...classTableHandler} data={classTableHandler?.data?.classes} />
      </BasicPage>
   );
}
