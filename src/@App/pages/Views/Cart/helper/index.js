export const compareArrays = (arr1, arr2) => {
   if (arr1.length === 0 || arr2.length === 0) {
      return false;
   }

   const setArr1 = new Set(arr1.map((item) => item.product_id));
   const setArr2 = new Set(arr2);

   return JSON.stringify(Array.from(setArr1)) === JSON.stringify(Array.from(setArr2));
};
