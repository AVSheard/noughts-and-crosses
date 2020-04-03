/** @format */

import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import Reset from "./components/Reset";
import Statistics from "./components/Statistics";

function App() {
	return (
		<div>
			<Header />
			<Statistics />
			<Reset />
			<Grid />
		</div>
	);
}

export default App;
