import React from "react";
import MainCard from "./MainCard";
import UserForm from "./UserForm";

//create your first component
const Home = () => {
	return (
		<div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
			<UserForm/>
		</div>
	);
};

export default Home;
