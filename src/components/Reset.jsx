import React, { Component } from "react";
import { endOfGameInfo } from "../stores/endOfGameInfo";
import { observer } from "mobx-react";

export default observer(
	class Reset extends Component {
		render() {
			return (
				!endOfGameInfo.inPlay && (
					<div className="finalMessage">
						{endOfGameInfo.winner} have won the game!
						<form>
							<button>New Game</button>
						</form>
					</div>
				)
			);
		}
	}
);
