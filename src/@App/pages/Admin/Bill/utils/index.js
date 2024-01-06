export const BILL_STATUS = ['PENDING', 'PACKING', 'TRANSPORT', 'RECEIVED', 'CANCELED'];

export const billStatus = [
   {
      label: 'Đang xử lý',
      value: 'PENDING'
   },
   {
      label: 'Đang đóng gói',
      value: 'PACKING'
   },
   {
      label: 'Đang vận chuyển',
      value: 'TRANSPORT'
   },
   {
      label: 'Đã giao',
      value: 'RECEIVED'
   },
   {
      label: 'Hủy đơn hàng',
      value: 'CANCELED'
   }
];

export const billStatusUser = [
   {
      label: 'Tất cả',
      value: 'all'
   },

   {
      label: 'Đã giao',
      value: 'RECEIVED'
   },
   {
      label: 'Hủy đơn hàng',
      value: 'CANCELED'
   }
];

export const paymentMethodOptions = [
   {
      label: 'Thanh toán khi nhận hàng',
      value: 'PAYMENT_ON_DELIVEY'
   },
   {
      label: 'Thanh toán trước',
      value: 'PAYMENT_IN_ADVANCE'
   }
];

export const paymentMethod = {
   PAYMENT_ON_DELIVEY: 'Thanh toán khi nhận hàng',
   PAYMENT_IN_ADVANCE: 'Thanh toán trước'
};

export const paymentStatus = {
   PAID: 'Đã thanh toán',
   UNPAID: 'Chưa thanh toán'
};

export const paymentStatusOptions = [
   {
      label: 'Đã thanh toán',
      value: 'PAID'
   },
   {
      label: 'Chưa thanh toán',
      value: 'UNPAID'
   }
];

export const transferStatus = {
   PENDING: 'Đang xử lý',
   PACKING: 'Đang đóng gói',
   TRANSPORT: 'Đang vận chuyển',
   RECEIVED: 'Đã giao',
   CANCELED: 'Hủy đơn hàng'
};

export const roleHistory = {
   ADMIN: 'Admin',
   EMPLOYEE: 'Nhân viên'
};
