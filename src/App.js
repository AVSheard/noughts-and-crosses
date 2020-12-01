import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import AIToggle from "./components/AIToggle";
import DifficultyToggle from "./components/DifficultyToggle";

function App() {
	return (
		<div>
			<Header />
			<AIToggle />
			<DifficultyToggle />
			<Grid />
		</div>
	);
}

export default App;
