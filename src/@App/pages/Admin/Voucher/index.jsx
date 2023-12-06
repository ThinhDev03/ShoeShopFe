import BasicPage from '@App/components/customs/BasicPage';
import { ROLE } from '@App/configs/role';
import PermissionRestricted from '@App/routers/components/PermissionRestricted';
import voucherService from '@App/services/voucher.service';
import CoreTable, { columnHelper } from '@Core/Components/Table/CoreTable';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Components/Table/components/CoreTableActions';
import { Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
function Voucher() {
   const { data, refetch, isFetching } = useQuery(['getVoucher'], async () => {
      const res = await voucherService.list();
      return res.data;
   });

   const { mutate: deleteVoucher } = useMutation({
      mutationFn: async (voucherId) => {
         return await voucherService.delete(voucherId);
      },
      onSuccess: () => {
         refetch();
         successMessage('Xóa voucher thành công');
      }
   });
   
   const navigate = useNavigate();

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((row, index) => index + 1, {
            header: 'STT'
         }),
         columnHelper.accessor('voucher_name', {
            header: 'Tên voucher'
         }),
         columnHelper.accessor('discount', {
            header: 'Số tiền giảm (VND)'
         }),
         columnHelper.accessor('point_discount', {
            header: 'Điều kiện giảm giá (VND)'
         }),

         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const voucher = row?.original;
               return (
                  <Box>
                     <CoreTableActionEdit callback={() => navigate(`update/${voucher._id}`)} />
                     <PermissionRestricted roleNames={ROLE[1]}>
                        <CoreTableActionDelete
                           callback={() => deleteVoucher(voucher._id)}
                           content='Bạn có muốn xoá voucher?'
                        />
                     </PermissionRestricted>
                  </Box>
               );
            }
         })
      ];
   }, []);
   return (
      <BasicPage currentPage='Voucher'>
         <CoreTable columns={columns} loading={isFetching} data={data} isPagination={true} />
      </BasicPage>
   );
}

export default Voucher;