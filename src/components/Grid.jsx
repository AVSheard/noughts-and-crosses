/** @format */

import React, { Component } from "react";

const cross = "x";
const nought = "o";
const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

export default class Grid extends Component {
	state = {
		noughtTurn: true,
		values: ["", "", "", "", "", "", "", "", ""]
	};

	handleClick = (index) => {
		if (this.state.values[index] === "") {
			this.setState((currentState) => {
				const arr = [...currentState.values];
				if (this.state.noughtTurn) {
					arr[index] = nought;
				} else {
					arr[index] = cross;
				}
				return { values: arr, noughtTurn: !currentState.noughtTurn };
			});
		}
	};

	componentDidUpdate(prevProps, prevState) {
		const { values } = this.state;
		if (prevState !== values) {
			winConditions.forEach((condition) => {
				if (
					values[condition[0]] === values[condition[1]] &&
					values[condition[0]] === values[condition[2]] &&
					values[condition[0]] !== ""
				) {
					console.log("win");
				}
			});
		}
	}

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
