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

const toFormatMoney = (number, space = '.', currencyUnit = 'đ') => {
   if (!number || number === 0) {
      return 0 + currencyUnit;
   }
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, space) + currencyUnit;
};

export default toFormatMoney;
