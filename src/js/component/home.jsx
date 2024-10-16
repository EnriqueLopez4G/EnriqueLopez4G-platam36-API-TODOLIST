import React from "react";
import MainCard from "./MainCard";

//create your first component
const Home = () => {
	return (
		<div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
			<p style = {{color: 'rgba(86,7,12,0.5)',  fontSize: '6rem', fontWeight: '200' }}>
				todos
			</p>
			<MainCard/>
		</div>
	);
};

export default Home;
