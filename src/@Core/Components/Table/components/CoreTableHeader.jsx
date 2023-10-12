/*
 * Created Date: 03-02-2023, 21:00 pm
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

import React from 'react';
import { styled } from '@mui/material/styles';
import { flexRender } from '@tanstack/react-table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  }));

const CoreTableHeader = ({ table }) => {
    return (
        <TableHead>
            {table.getHeaderGroups().map((headerGroup,index) => (
                <TableRow key={index}>
                    {headerGroup.headers.map((header,index) => (
                        <StyledTableCell key={index} width={header.column.columnDef.width}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                        </StyledTableCell>
                    ))}
                </TableRow>
            ))}
        </TableHead>
    );
};

CoreTableHeader.propTypes = {
    table: PropTypes.object.isRequired
};

export default React.memo(CoreTableHeader);
