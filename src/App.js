import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import Reset from "./components/Reset";
import AIToggle from "./components/AIToggle";
import DifficultyToggle from "./components/DifficultyToggle";

function App() {
	return (
		<div>
			<Header />
			<AIToggle />
			<DifficultyToggle />
			<Reset />
			<Grid />
		</div>
	);
}

export default App;
