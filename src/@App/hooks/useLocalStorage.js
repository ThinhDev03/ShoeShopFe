import { useState } from "react";

// Hook
export default function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = localStorage.getItem(key);
			return value ? JSON.parse(value) : value;
		} catch (error) {
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};
	return [storedValue, setValue];
}
