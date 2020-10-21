import React, { Component } from "react";
import { observer } from "mobx-react";
import { endOfGameInfo } from "../stores/endOfGameInfo";

export default observer(
	class AIToggle extends Component {
		handleClick = (bool) => {
			endOfGameInfo.AIOn = bool;
		};

		render() {
			return (
				<form>
					<p>Choose game type:</p>
					<label>One Player</label>
					<input
						type="radio"
						id="onePlayer"
						name="gameType"
						value="onePlayer"
						defaultChecked
						onClick={() => {
							this.handleClick(true);
						}}></input>
					<label>Two Player</label>
					<input
						type="radio"
						id="twoPlayer"
						name="gameType"
						value="twoPlayer"
						onClick={() => {
							this.handleClick(false);
						}}></input>
				</form>
			);
		}
	}
);
