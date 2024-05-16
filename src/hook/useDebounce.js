import { useEffect, useState } from 'react';

export const useDebounce = value => {
	const [valueDebounce, setValueDebounce] = useState('');
	useEffect(() => {
		const handle = setTimeout(() => {
			setValueDebounce(value);
		}, 400);

		return () => {
			clearTimeout(handle);
		};
	}, [value]);

	return valueDebounce;
};
