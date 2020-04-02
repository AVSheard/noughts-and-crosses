/** @format */

import React, { Component } from "react";

const cross = "x";
const nought = "o";

export default class Grid extends Component {
	state = {
		turn: true,
		values: ["", "", "", "", "", "", "", "", ""]
	};

	handleClick = (index) => {
		this.setState((currentState) => {
			const arr = [...currentState.values];
			if (this.state.turn) {
				arr[index] = nought;
			} else {
				arr[index] = cross;
			}
			return { values: arr, turn: !currentState.turn };
		});
	};

	render() {
		return (
			<div className="grid-container">
				{this.state.values.map((entry, index) => {
					return (
						<div
							className="grid-item"
							key={index}
							onClick={() => {
								this.handleClick(index);
							}}>
							{entry}
						</div>
					);
				})}
			</div>
		);
	}
}
