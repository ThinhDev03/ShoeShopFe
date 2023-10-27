import { useRef, useState } from 'react';

const useDebounce = (callback, timeout) => {
   const timerId = useRef(null);
   const [isDone, setIsDone] = useState(false);
   timeout = timeout || 500;
   return [
      (...args) => {
         if (timerId.current) {
            clearTimeout(timerId.current);
            timerId.current = null;
            setIsDone(true);
         }
         timerId.current = setTimeout(() => {
            setIsDone(false);
            callback(...args);
         }, timeout);
      },
      isDone
   ];
};

export default useDebounce;
