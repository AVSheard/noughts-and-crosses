import React, { Component } from "react";

export default class AIToggle extends Component {
	render() {
		return (
			<form>
				<p>Choose game type:</p>
				<input
					type="radio"
					id="onePlayer"
					name="gameType"
					value="onePlayer"></input>
				<label for="onePlayer">One Player</label>
				<input
					type="radio"
					id="twoPlayer"
					name="gameType"
					value="twoPlayer"></input>
				<label for="twoPlayer">Two Player</label>
			</form>
		);
	}
}
