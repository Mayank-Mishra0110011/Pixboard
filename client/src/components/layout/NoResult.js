import React from 'react';
import noresult from './noresult.gif';

export default function NoResult() {
	return (
		<div className="row justify-content-center my-5 py-5" style={{ width: '100%' }}>
			<img src={noresult} alt="noResult" style={{ width: '500px', margin: 'auto', display: 'block' }} />
		</div>
	);
}
