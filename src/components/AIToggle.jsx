import React, { Component } from "react";
import { observer } from "mobx-react";
import { endOfGameInfo } from "../stores/endOfGameInfo";
import DifficultyToggle from "./DifficultyToggle";

export default observer(
	class AIToggle extends Component {
		state = { displayDiff: true };

		handleClick = (bool) => {
			endOfGameInfo.AIOn = bool;
			this.setState(() => {
				return { displayDiff: bool };
			});
		};

		render() {
			return (
				<>
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
					{this.state.displayDiff && <DifficultyToggle />}
				</>
			);
		}
	}
);
