import React from "react";
import MainCard from "./MainCard";

//create your first component
const Home = () => {
	return (
		<div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
			<MainCard/>
		</div>
	);
};

export default Home;
