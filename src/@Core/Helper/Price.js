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

export function financial(x) {
   return Number.parseFloat(x).toFixed(0);
}

const toFormatMoney = (number, space = '.', currencyUnit = 'đ') => {
   if (!number || number === 0) {
      return 0 + currencyUnit;
   }
   return (
      financial(number)
         .toString()
         .replace(/\B(?=(\d{3})+(?!\d))/g, space) +
      ' ' +
      currencyUnit
   );
};

export function toDiscountedPrice(originalPrice, discountPercentage) {
   // Kiểm tra xem giá ban đầu và tỷ lệ giảm giá có hợp lệ không
   if (originalPrice < 0 || discountPercentage < 0 || discountPercentage > 100) {
      return 'Invalid input'; // Trả về thông báo lỗi nếu có giá trị không hợp lệ
   }

   const sale = discountPercentage ? discountPercentage : 0;

   const discountAmount = (originalPrice * sale) / 100;
   const discountedPrice = originalPrice - discountAmount;

   return discountedPrice;
}

export default toFormatMoney;
