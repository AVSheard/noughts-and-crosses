import React, { Component } from "react";
import { endOfGameInfo } from "../stores/endOfGameInfo";
import { observer } from "mobx-react";

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
	[2, 4, 6],
];

export default observer(
	class TwoPlayerGrid extends Component {
		state = {
			noughtTurn: true,
			blocks: [
				{ value: "", classes: "grid-item" },
				{ value: "", classes: "grid-item" },
				{ value: "", classes: "grid-item" },
				{ value: "", classes: "grid-item" },
				{ value: "", classes: "grid-item" },
				{ value: "", classes: "grid-item" },
				{ value: "", classes: "grid-item" },
				{ value: "", classes: "grid-item" },
				{ value: "", classes: "grid-item" },
			],
		};

		handleClick = (index) => {
			if (this.state.blocks[index].value === "" && endOfGameInfo.inPlay) {
				endOfGameInfo.turns++;
				this.setState((currentState) => {
					const arr = [...currentState.blocks];
					arr[index].value = this.state.noughtTurn ? nought : cross;
					return { blocks: arr, noughtTurn: !currentState.noughtTurn };
				});
			}
		};

		componentDidUpdate(prevProps, prevState) {
			const { blocks } = this.state;
			if (prevState.blocks !== blocks) {
				winConditions.forEach((condition) => {
					if (
						blocks[condition[0]].value === blocks[condition[1]].value &&
						blocks[condition[0]].value === blocks[condition[2]].value &&
						blocks[condition[0]].value !== ""
					) {
						endOfGameInfo.winner = this.state.noughtTurn
							? "Crosses"
							: "Noughts";
						endOfGameInfo.inPlay = false;
						this.setState((currentState) => {
							const arr = [...currentState.blocks];
							arr[condition[0]].classes = "grid-item win";
							arr[condition[1]].classes = "grid-item win";
							arr[condition[2]].classes = "grid-item win";
							return { classes: arr };
						});
					} else if (endOfGameInfo.turns === 9) {
						endOfGameInfo.winner = "Neither of you";
						endOfGameInfo.inPlay = false;
					}
				});
			}
		}

		render() {
			return (
				<div className="grid-container">
					{this.state.blocks.map((block, index) => {
						return (
							<div
								className={block.classes}
								key={index}
								onClick={() => {
									this.handleClick(index);
								}}>
								{block.value}
							</div>
						);
					})}
				</div>
			);
		}
	}
);
