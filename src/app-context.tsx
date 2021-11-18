import React from 'react';

export const AppContext = React.createContext(
	{
		changePage : (page:string) => {},
	}
);