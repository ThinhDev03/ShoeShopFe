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

import { Box, CircularProgress, Pagination, Table, TableContainer, TablePagination } from '@mui/material';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CoreTableBody from './components/CoreTableBody';
import CoreTableHeader from './components/CoreTableHeader';
import Scrollbar from '@App/components/customs/Scrollbar';

export const columnHelper = createColumnHelper();

const CoreTable = (props) => {
   const { data, columns, pageSize, handleSetCurrentPage, loading, isPagination, query } = props;
   console.log(pageSize);
   const pagination = React.useMemo(
      () => ({
         pageIndex: 1,
         pageSize: pageSize
      }),
      [pageSize]
   );

   const table = useReactTable({
      data: data ?? [],
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
            position: 'relative',
            border: 'none',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
         }}>
         <Scrollbar
            sx={{
               flex: 1,
               height: '100%'
            }}>
            <Table stickyHeader sx={{ minWidth: 'max-content', width: '100%' }} size='small'>
               <CoreTableHeader columns={columns} table={table} />
               <CoreTableBody table={table} loading={loading} />
            </Table>
         </Scrollbar>

         {isPagination && (
            <Box
               sx={({ palette }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  pt: 1,
                  backgroundColor: palette.neutral.ultralight,
                  padding: '4px'
               })}>
               <Pagination
                  onChange={(_, page) => {
                     handleSetCurrentPage(page);
                  }}
                  count={pageSize}
                  variant='outlined'
                  shape='rounded'
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
   count: 10,
   handleFetchData: () => {},
   handleSetCurrentPage: () => {},
   loading: false,
   isPagination: true,
   query: {},
   clientPanigation: true
};

CoreTable.propTypes = {
   data: PropTypes.array,
   columns: PropTypes.array.isRequired,
   limit: PropTypes.number,
   total: PropTypes.number,
   handleFetchData: PropTypes.func,
   loading: PropTypes.bool,
   isPagination: PropTypes.bool,
   clientPanigation: PropTypes.bool,
   query: PropTypes.object
};

export default React.memo(CoreTable);
