/*
 * Created Date: 03-02-2023, 21:00 pm
 * Author: Nghiêm Mạnh Cường
 * Email: nghiemmanhcuong98@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import { useTheme } from '@emotion/react';
import { Box, Button, Table, TableContainer, TablePagination } from '@mui/material';
import { rankItem } from '@tanstack/match-sorter-utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CoreTableBody from './components/CoreTableBody';
import CoreTableHeader from './components/CoreTableHeader';
import { FilterAltOffOutlined } from '@mui/icons-material';
import Scrollbar from '@App/components/customs/Scrollbar';

export const columnHelper = createColumnHelper();

const CoreTable = (props) => {
   const {
      data,
      columns,
      page,
      limit,
      total,
      handleFetchData,
      loading,
      isPagination,
      query,
      clientPanigation = true
   } = props;

   const defaultData = React.useMemo(() => []);
   const pagination = React.useMemo(
      () => ({
         pageIndex: page,
         pageSize: limit
      }),
      [page, limit]
   );
   const [paginationState, setPaginationState] = useState({ pageIndex: 0, pageSize: 10, totalPage: 1 });

   const {
      palette: { neutral }
   } = useTheme();
   const table = useReactTable({
      data: data ?? defaultData,
      columns: columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
         pagination
      },
      manualPagination: true,
      debugTable: true
   });

   return (
      <TableContainer
         sx={{
            height: '100%',
            border: 'none',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
         }}>
         <Scrollbar
            sx={{
               flex: 1
            }}>
            <Table stickyHeader sx={{ minWidth: 'max-content', width: '100%', height: '100%' }} size='small'>
               <CoreTableHeader columns={columns} table={table} />
               <CoreTableBody table={table} loading={loading} />
            </Table>
         </Scrollbar>

         {isPagination && (
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                  pt: 1,
                  backgroundColor: neutral.ultralight,
                  padding: '6px'
               }}>
               <TablePagination
                  component='div'
                  count={clientPanigation ? data.length : total}
                  page={table.getState().pagination.pageIndex}
                  SelectProps={{
                     sx: {
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        '&>.MuiTablePagination-select': {
                           padding: '8px',
                           width: 'fit-content',
                           border: '1px solid #ccc',
                           borderRadius: '4px'
                        },
                        '&>.MuiTablePagination-select:focus': { bgcolor: 'transparent' },
                        '&>.MuiTablePagination-selectLabel': { fontWeight: 600 }
                     }
                  }}
                  onPageChange={(_, value) => {
                     if (clientPanigation) setPaginationState({ ...paginationState, pageIndex: value });
                     else handleFetchData({ page: value, ...query });
                  }}
                  labelRowsPerPage='Số hàng'
                  labelDisplayedRows={({ page }) => {
                     return `Trang ${page + 1}/${table.getPageCount()}`;
                  }}
                  showFirstButton
                  showLastButton
                  rowsPerPage={table.getState().pagination.pageSize}
                  onRowsPerPageChange={(e) => {
                     if (clientPanigation) setPaginationState({ ...paginationState, pageSize: e.target.value });
                     else handleFetchData({ limit: e.target.value, ...query });
                  }}
               />
            </Box>
         )}
      </TableContainer>
   );
};

CoreTable.defaultProps = {
   data: [],
   columns: [],
   page: 0,
   limit: 10,
   total: 10,
   handleFetchData: () => {},
   loading: false,
   isPagination: true,
   query: {},
   clientPanigation: true
};

CoreTable.propTypes = {
   data: PropTypes.array,
   columns: PropTypes.array.isRequired,
   pageIndex: PropTypes.number,
   limit: PropTypes.number,
   total: PropTypes.number,
   handleFetchData: PropTypes.func,
   loading: PropTypes.bool,
   isPagination: PropTypes.bool,
   clientPanigation: PropTypes.bool,
   query: PropTypes.object
};

export default React.memo(CoreTable);
