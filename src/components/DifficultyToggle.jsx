import React, { Component } from "react";

export default class DifficultyToggle extends Component {
	render() {
		return (
			<form>
				<p>Choose difficulty:</p>
				<label>Easy</label>
				<input type="radio" id="easy" name="difficulty" value="easy"></input>
				<label>Normal</label>
				<input
					type="radio"
					id="normal"
					name="difficulty"
					value="normal"></input>
			</form>
		);
	}
}
