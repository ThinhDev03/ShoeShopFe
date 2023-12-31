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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HttpsIcon from '@mui/icons-material/Https';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ReplayIcon from '@mui/icons-material/Replay';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export const CoreTableActionDelete = ({ callback = () => {}, content = '' }) => {
   const confirm = useConfirm();

   const handleDelete = () => {
      confirm({
         content: content,
         isIcon: true,
         color: 'error',
         onOk: callback
      });
   };

   return (
      <Tooltip title='Ẩn'>
         <IconButton onClick={handleDelete}>
            <RemoveCircleIcon fontSize='small' />
         </IconButton>
      </Tooltip>
   );
};

export const CoreTableReplay = ({ callback = () => {}, content = '', okText = 'Hủy đơn hàng' }) => {
   const confirm = useConfirm();

   const handleDelete = () => {
      confirm({
         content: content,
         isIcon: true,
         color: 'error',
         okText,
         onOk: callback
      });
   };

   return (
      <Tooltip title={okText}>
         <IconButton onClick={handleDelete}>
            <ReplayIcon fontSize='small' />
         </IconButton>
      </Tooltip>
   );
};

export const CoreTableActionLock = ({ callback = () => {}, content = '' }) => {
   const confirm = useConfirm();

   const handleLock = () => {
      confirm({
         content: content,
         isIcon: true,
         color: 'error',
         okText: 'Khóa',
         onOk: callback
      });
   };

   return (
      <Tooltip title='Khóa'>
         <IconButton onClick={handleLock}>
            <HttpsIcon fontSize='small' />
         </IconButton>
      </Tooltip>
   );
};

export const CoreTableActionEdit = ({ callback = () => {} }) => {
   return (
      <Tooltip title='Sửa'>
         <IconButton onClick={callback}>
            <BorderColorIcon fontSize='small' />
         </IconButton>
      </Tooltip>
   );
};

export const CoreTableActionView = ({ callback = () => {}, title = 'Xem chi tiết' }) => {
   return (
      <Tooltip title={title}>
         <IconButton onClick={callback}>
            <RemoveRedEyeIcon fontSize='small' />
         </IconButton>
      </Tooltip>
   );
};

export const CoreTableActionChangeStatus = ({ callback = () => {} }) => {
   return (
      <Tooltip title='Thay đổi trạng thái'>
         <IconButton onClick={callback}>
            <ShoppingCartRoundedIcon fontSize='small' />
         </IconButton>
      </Tooltip>
   );
};

// icon thay đổi trạng thái Teacher
export const CoreTableActionStatusChange = ({
   row,
   callback = (id) => {},
   content = 'Chắc chắc chuyển trạng thái giáo viên ?'
}) => {
   const confirm = useConfirm();
   const handleDelete = () => {
      confirm({
         content: content,
         isIcon: true,
         color: 'error',
         onOk: () => callback(row.original._id)
      });
   };
   return (
      <Tooltip title='Thay đổi trạng thái giáo viên'>
         <IconButton onClick={handleDelete}>
            <DeleteIcon fontSize='small' />
         </IconButton>
      </Tooltip>
   );
};

export const CoreTableVariation = ({ callback = () => {} }) => {
   return (
      <Tooltip title='Tạo biến thể sản phẩm'>
         <IconButton onClick={callback}>
            <AddCircleOutlineIcon fontSize='small' />
         </IconButton>
      </Tooltip>
   );
};
