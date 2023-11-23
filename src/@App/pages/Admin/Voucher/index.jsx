import BasicPage from '@App/components/customs/BasicPage';
import { ROLE } from '@App/configs/role';
import PermissionRestricted from '@App/routers/components/PermissionRestricted';
import { columnHelper } from '@Core/Components/Table/CoreTable';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Components/Table/components/CoreTableActions';
import React, { useMemo } from 'react';

function Voucher() {
   const columns = useMemo(() => {
      return [
         columnHelper.accessor((row, index) => index + 1, {
            header: 'STT'
         }),
         columnHelper.accessor('voucher_name', {
            header: 'Tên voucher'
         }),
         columnHelper.accessor('discount', {
            header: 'Số tiền giảm'
         }),
         columnHelper.accessor('point_discount', {
            header: 'Mô tả'
         }),
         columnHelper.accessor('start_date', {
            header: 'Ngày bắt đầu'
         }),
         columnHelper.accessor('end_date', {
            header: 'Ngày kết thúc'
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const subject = row?.original;
               return (
                  <Box>
                     <CoreTableActionEdit callback={() => navigate(subject._id)} />
                     <PermissionRestricted roleNames={ROLE[1]}>
                        <CoreTableActionDelete callback={() => {}} content='Bạn có muốn xoá voucher?' />
                     </PermissionRestricted>
                  </Box>
               );
            }
         })
      ];
   }, []);
   return (
      <BasicPage currentPage='Voucher'>
         {/* <CoreTable columns={columns} loading={isFetching} data={data} isPagination={true} /> */}
      </BasicPage>
   );
}

export default Voucher;
