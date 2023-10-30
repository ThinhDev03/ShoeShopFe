import { useEffect, useRef, useState } from 'react';

function useDebounceInput(value, delay = 300) {
   const [debounceValue, setDebounceValue] = useState('');
   const timer = useRef(null);
   useEffect(() => {
      timer.current = setTimeout(() => {
         setDebounceValue(value);
      }, delay);
      return () => clearTimeout(timer.current);
   }, [value, delay]);
   return debounceValue;
}

export default useDebounceInput;
