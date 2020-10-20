import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import Reset from "./components/Reset";
import AIToggle from "./components/AIToggle";

function App() {
	return (
		<div>
			<Header />
			<AIToggle />
			<Reset />
			<Grid />
		</div>
	);
}

export default App;
