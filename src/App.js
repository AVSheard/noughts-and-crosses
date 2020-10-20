import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import Reset from "./components/Reset";

function App() {
	return (
		<div>
			<Header />
			<Reset />
			<Grid />
		</div>
	);
}

export default App;
