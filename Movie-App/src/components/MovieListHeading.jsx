import React from 'react';
import SearchBox from './SearchBox';

const MovieListHeading = (props) => {
	return (
	  <>
		<div className="bg-gray-800 w-full p-3 md:p-10 h-[50%] flex items-center justify-center">
		  <h1 className="text-[#F9C209] font-Holtwood text-lg md:text-3xl">{props.heading}</h1>
		  <div className="flex items-center justify-center w-full">
			<div className="w-full md:w-1/2">
			  <SearchBox onSearch={props.onSearch} />
			</div>
		  </div>
		</div>
	  </>
	);
  };

export default MovieListHeading;
