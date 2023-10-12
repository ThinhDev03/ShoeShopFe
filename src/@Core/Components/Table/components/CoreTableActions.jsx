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
import { useConfirm } from '@Core/Components/Confirm/CoreConfirm';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';


export const CoreTableActionDelete = ({ callback = () => {}, content = '' }) => {
    const confirm = useConfirm();

    const handleDelete = () => {
        confirm({
            content: content,
            isIcon: true,
            color:'error',
            onOk: callback
        });
    };

    return (
        <Tooltip title='Xoá'>
            <IconButton color='error' onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    );
};

export const CoreTableActionEdit = ({ callback = () => {} }) => {
    return (
        <Tooltip title='Sửa'>
            <IconButton color='success' onClick={callback}>
                <RateReviewRoundedIcon />
            </IconButton>
        </Tooltip>
    );
};

export const CoreTableActionView = ({ callback = () => {} }) => {
    return (
        <Tooltip title='Xem chi tiết'>
            <IconButton color='success' onClick={callback}>
                <RemoveRedEyeIcon />
            </IconButton>
        </Tooltip>
    );
};

export const CoreTableActionChangeStatus= ({ callback = () => {} }) => {
    return (
        <Tooltip title='Thay đổi trạng thái'>
            <IconButton color='primary' onClick={callback}>
                <ShoppingCartRoundedIcon />
            </IconButton>
        </Tooltip>
    );
};

// icon thay đổi trạng thái Teacher
export const CoreTableActionStatusChange= ({ row, callback = (id) => {} , content = 'Chắc chắc chuyển trạng thái giáo viên ?' }) => {
    const confirm = useConfirm();
    const handleDelete = () => {
        confirm({
            content: content,
            isIcon: true,
            color:'error',
            onOk: ()=>callback(row.original._id) 
        });
    };
    return (
        <Tooltip title='Thay đổi trạng thái giáo viên'>
            <IconButton color='error' onClick={handleDelete}>
            <DeleteIcon />
            </IconButton>
        </Tooltip>
    );
};

