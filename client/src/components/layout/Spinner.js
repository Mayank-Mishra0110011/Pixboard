import React from 'react';
import spinner from './spinner.gif';

export default function Spinner() {
	return (
		<div className="row justify-content-center my-5 py-5" style={{ width: '100%' }}>
			<img src={spinner} alt="Loading..." style={{ width: '200px', margin: 'auto', display: 'block' }} />
		</div>
	);
}
