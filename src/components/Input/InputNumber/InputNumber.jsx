import React from 'react';

export const InputNumber = ({ defaultValue, onChange }) => {
	return (
		<input type="tel" value={defaultValue} onChange={onChange} className="tag-orange" />
	)
};