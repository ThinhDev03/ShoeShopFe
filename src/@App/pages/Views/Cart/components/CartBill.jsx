import { useCart } from '@App/redux/slices/cart.slice';
import voucherService from '@App/services/voucher.service';
import toFormatMoney from '@Core/Helper/Price';
import { Box, Button, Checkbox, FormLabel, Modal, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 500,
   height: 'fit-content',
   bgcolor: 'background.paper',
   px: 2,
   py: 2,
   outline: 'none',
   borderRadius: '8px'
};
const CartBill = ({ totalPrice }) => {
   const [open, setOpen] = useState(false);
   const navigate = useNavigate();
   const [checkBoxVoucher, setCheckBoxVoucher] = useState(null);
   const [currentVoucher, setCurrentVoucher] = useState(null);
   const [isApplyVoucher, setIsApplyVoucher] = useState(false);
   const { cart } = useCart();
   const { data: vouchers, isLoading: loading } = useQuery(
      ['getVoucher-cart', totalPrice],
      async () => {
         const res = await voucherService.list({ point_discount: totalPrice });
         return res.data;
      },
      { initialData: [] }
   );

   const handleClose = () => {
      setOpen(false);
   };

   const handlePurchase = () => {
      if (currentVoucher) {
         if (!vouchers.some((v) => v.discount === currentVoucher.discount)) {
            setCurrentVoucher(null);
            setIsApplyVoucher(false);
            return;
         }
         navigate(isApplyVoucher ? '/shipping?ship=s' : '/shipping');
      } else {
         navigate('/shipping');
      }
   };
   const price = isApplyVoucher ? totalPrice - parseFloat(currentVoucher?.discount) : totalPrice;

   return (
      <>
         <Stack gap='20px' sx={{ bgcolor: '#f1f1f1', pb: '20px', pt: '5px', px: 3 }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', py: 1, borderBottom: '2px solid black' }}>
               Đơn hàng
            </Typography>
            <Box>
               <FormLabel sx={{ display: 'block', fontSize: '20px', fontWeight: 'bold', mb: 2 }}>
                  CHỌN KHUYẾN MÃI
               </FormLabel>
               <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box
                     onClick={() => setOpen(true)}
                     sx={{
                        border: isApplyVoucher ? '2px solid #F15E2C' : '2px solid #ccc',
                        borderRadius: '6px',
                        height: '40px',
                        width: '100%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                        fontSize: '13px',
                        color: isApplyVoucher ? '#F15E2C' : '#000'
                     }}>
                     {currentVoucher?.voucher_name || 'Chọn voucher'}
                  </Box>
                  <Button
                     onClick={() => {
                        if (!vouchers.some((v) => v.discount === currentVoucher.discount)) {
                           setCurrentVoucher(null);
                           setIsApplyVoucher(false);
                           return;
                        }
                        setIsApplyVoucher(true);
                        localStorage.setItem('shose_voucher', currentVoucher.discount);
                     }}
                     sx={{ width: '140px' }}>
                     Áp dụng
                  </Button>
               </Box>
            </Box>
            <Box sx={{ borderBottom: '2px dashed #000', my: '2px' }}></Box>
            <Stack
               gap={2}
               sx={{
                  color: '#808080',
                  fontWeight: 'bold',
                  fontSize: '18px'
               }}>
               <Box display='flex' justifyContent='space-between'>
                  <Box component='p' m={0}>
                     Đơn hàng
                  </Box>
                  <Box component='p' m={0}>
                     {toFormatMoney(totalPrice)}
                  </Box>
               </Box>
               <Box display='flex' justifyContent='space-between'>
                  <Box component='p' m={0}>
                     Giảm
                  </Box>
                  <Box component='p' m={0}>
                     - {isApplyVoucher ? toFormatMoney(currentVoucher?.discount) : '0đ'}
                  </Box>
               </Box>
            </Stack>
            <Box sx={{ borderBottom: '2px dashed #000', my: '2px' }}></Box>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#000',
                  fontSize: '20px',
                  fontWeight: 'bold'
               }}>
               <Box component='p' m={0}>
                  Tạm tính
               </Box>
               <Box component='p' m={0}>
                  {toFormatMoney(price)}
               </Box>
            </Box>
            <Button
               onClick={handlePurchase}
               fullWidth
               sx={{ textTransform: 'uppercase', py: '10px', fontWeight: 'bold' }}
               disabled={cart?.length === 0}>
               Tiếp tục thanh toán
            </Button>
         </Stack>

         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='parent-modal-title'
            aria-describedby='parent-modal-description'>
            <Box sx={{ ...style, width: 500 }}>
               <Typography textAlign='center' color='primary.main' mb={3}>
                  Danh sách voucher
               </Typography>
               {vouchers.map((voucher, index) => {
                  return (
                     <Stack
                        gap={2}
                        key={index}
                        direction='row'
                        mb={3}
                        sx={{ boxShadow: '.125rem .125rem .3125rem rgba(0,0,0,.07)' }}>
                        <Box
                           sx={{
                              alignItems: 'center;',
                              borderLeft: '2px dashed #fff;',
                              display: 'flex;',
                              flexDirection: 'column;',
                              justifyContent: 'center;',
                              position: 'relative',
                              backgroundColor: '#F15E2C',
                              width: '120px',
                              color: '#fff'
                           }}>
                           VOUCHER
                        </Box>
                        <Box>
                           <Typography>{voucher.voucher_name}</Typography>
                           <Typography>Giảm tối đa: {toFormatMoney(voucher.discount)}</Typography>
                           <Typography>Cho đơn hàng: {toFormatMoney(voucher.point_discount)}</Typography>
                        </Box>
                        <Box sx={{ alignSelf: 'center' }}>
                           <Checkbox
                              checked={voucher._id === checkBoxVoucher?._id}
                              onChange={() => {
                                 setCheckBoxVoucher(voucher);
                              }}
                           />
                        </Box>
                     </Stack>
                  );
               })}
               {vouchers.length === 0 && <Typography>Không có voucher nào.</Typography>}
               <Stack direction='row' justifyContent='flex-end' gap={1}>
                  <Button variant='outlined' onClick={handleClose}>
                     Quay lại
                  </Button>
                  {vouchers.length !== 0 && (
                     <Button
                        onClick={() => {
                           setCurrentVoucher(checkBoxVoucher);
                           handleClose();
                           setIsApplyVoucher(false);
                           localStorage.removeItem('shose_voucher');
                        }}>
                        Chọn
                     </Button>
                  )}
               </Stack>
            </Box>
         </Modal>
      </>
   );
};

export default CartBill;
