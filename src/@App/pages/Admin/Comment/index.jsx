import BasicPage from '@App/components/customs/BasicPage';
import { ROLE } from '@App/configs/role';
import PermissionRestricted from '@App/routers/components/PermissionRestricted';
import commentService from '@App/services/commnet.service';
import { useConfirm } from '@Core/Components/Confirm/CoreConfirm';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import { CoreTableActionDelete } from '@Core/Components/Table/components/CoreTableActions';
import { errorMessage, successMessage } from '@Core/Helper/Message';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

function Comment() {
   const { id } = useParams();

   const confirm = useConfirm();
   const { data, isFetching, refetch } = useQuery(['comment', id], async () => {
      const data = await commentService.find(id);
      return data.data;
   });

   const deleteComment = async (id) => {
      try {
         await commentService.delete(id);
         successMessage('Xóa bình luận thành công');
         refetch();
      } catch (error) {
         errorMessage('Xóa bình luận thất bại ');
      }
   };

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            header: 'STT',
            cell: ({ row }) => {
               return <Box width={100}>{row.index + 1}</Box>;
            }
         }),
         columnHelper.accessor('user_name', {
            header: 'Tên khách hàng'
         }),
         columnHelper.accessor('rate', {
            header: 'Đánh giá sao'
         }),
         columnHelper.accessor('description', {
            header: 'Nội dung bình luận'
         }),

         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const comment = row?.original;
               return (
                  <Box sx={{ display: 'flex' }}>
                     <PermissionRestricted roleNames={ROLE[1]}>
                        <CoreTableActionDelete
                           callback={async () => deleteComment(comment._id)}
                           content='Bạn có muốn xoá bình luận?'
                        />
                     </PermissionRestricted>
                  </Box>
               );
            }
         })
      ];
   }, []);

   console.log(data);
   return (
      <BasicPage currentPage='Products'>
         <CoreTable columns={columns} data={data} handleFetchData={refetch} isPagination={true} loading={isFetching} />
      </BasicPage>
   );
}
export default Comment;
