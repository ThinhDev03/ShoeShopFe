export default function sleep(ms = 1000, callback) {
   return new Promise((resolve) =>
      setTimeout(() => {
         resolve();
         if (callback) {
            callback();
         }
      }, ms)
   );
}
