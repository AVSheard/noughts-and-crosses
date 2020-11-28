import React, { Component } from "react";
import { observer } from "mobx-react";
import { endOfGameInfo } from "../stores/endOfGameInfo";

export default observer(
	class DifficultyToggle extends Component {
		handleClick = (diff) => {
			endOfGameInfo.difficulty = diff;
			console.log(endOfGameInfo.difficulty);
		};

		render() {
			return (
				<form>
					<p>Choose difficulty:</p>
					<label>Easy</label>
					<input
						type="radio"
						id="easy"
						name="difficulty"
						value="easy"
						onClick={() => {
							this.handleClick("easy");
						}}></input>
					<label>Normal</label>
					<input
						type="radio"
						id="normal"
						name="difficulty"
						value="normal"
						onClick={() => {
							this.handleClick("normal");
						}}></input>
					<label>Hard</label>
					<input
						type="radio"
						id="hard"
						name="difficulty"
						value="hard"
						onClick={() => {
							this.handleClick("hard");
						}}></input>
					<label>Very Hard</label>
					<input
						type="radio"
						id="veryHard"
						name="difficulty"
						value="veryHard"
						defaultChecked
						onClick={() => {
							this.handleClick("veryHard");
						}}></input>
				</form>
			);
		}
	}
);
