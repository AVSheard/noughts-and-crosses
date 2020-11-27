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
	class Grid extends Component {
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

		// handles a human player move
		handleClick = (index) => {
			// Check that selected box is empty and that the game is not over
			if (this.state.blocks[index].value === "" && endOfGameInfo.inPlay) {
				// Update turn number
				endOfGameInfo.turns++;

				// Fill in target box and twitch turn to next player
				this.setState((currentState) => {
					const arr = [...currentState.blocks];
					arr[index].value = this.state.noughtTurn ? nought : cross;
					return { blocks: arr, noughtTurn: !currentState.noughtTurn };
				});
			}
		};

		// Handle AI turn on easy mode
		xTurnEasy() {
			// Select a random number between 0-8
			let move = Math.floor(Math.random() * 9);

			// Fill in selected box if empty otherwise call this function again
			if (this.state.blocks[move].value === "") {
				this.handleClick(move);
			} else {
				this.xTurnEasy();
			}
		}

		// Function to check if two crosses/noughts and a blank space occupy a row and then call function to fill blank space
		twoAndBlankCheck(noughtOrCross, boxFilled) {
			const { blocks } = this.state;

			// check if two crosses/noughts and a blank space occupy a row and then call function to fill blank space
			winConditions.forEach((condition) => {
				if (
					blocks[condition[0]].value === noughtOrCross &&
					blocks[condition[1]].value === noughtOrCross &&
					blocks[condition[2]].value === "" &&
					!boxFilled
				) {
					boxFilled = true;
					this.handleClick(condition[2]);
				} else if (
					blocks[condition[0]].value === noughtOrCross &&
					blocks[condition[2]].value === noughtOrCross &&
					blocks[condition[1]].value === "" &&
					!boxFilled
				) {
					boxFilled = true;
					this.handleClick(condition[1]);
				} else if (
					blocks[condition[2]].value === noughtOrCross &&
					blocks[condition[1]].value === noughtOrCross &&
					blocks[condition[0]].value === "" &&
					!boxFilled
				) {
					boxFilled = true;
					this.handleClick(condition[0]);
				}
			});

			// Pass on whether a box got filled with a boolean
			return boxFilled;
		}

		// Handle AI turn on normal mode
		xTurnNormal() {
			let boxFilled = false;

			// Fill in final box if two x's are in a row
			boxFilled = this.twoAndBlankCheck("x", boxFilled);

			// Fill in final box if two o's are in a row
			if (!boxFilled) {
				boxFilled = this.twoAndBlankCheck("o", boxFilled);
			}

			// If no box is filled call easy mode function to fill a box
			if (!boxFilled) {
				this.xTurnEasy();
			}
		}

		componentDidUpdate(prevProps, prevState) {
			const { blocks } = this.state;

			// Check if either side has won
			if (prevState.blocks !== blocks) {
				winConditions.forEach((condition) => {
					if (
						blocks[condition[0]].value === blocks[condition[1]].value &&
						blocks[condition[0]].value === blocks[condition[2]].value &&
						blocks[condition[0]].value !== ""
					) {
						// Work out which side has won
						endOfGameInfo.winner = this.state.noughtTurn
							? "Crosses"
							: "Noughts";

						// End the game
						endOfGameInfo.inPlay = false;

						// Highlight boxes in winning row
						this.setState((currentState) => {
							const arr = [...currentState.blocks];
							arr[condition[0]].classes = "grid-item win";
							arr[condition[1]].classes = "grid-item win";
							arr[condition[2]].classes = "grid-item win";
							return { classes: arr };
						});
					}
					// End game if neither side has won
					else if (endOfGameInfo.turns === 9) {
						endOfGameInfo.winner = "Neither of you";
						endOfGameInfo.inPlay = false;
					}
				});
			}

			// initiate AI turn if applicable
			if (
				this.state.noughtTurn === false &&
				endOfGameInfo.turns < 9 &&
				endOfGameInfo.AIOn
			) {
				// Call AI function after short time delay
				if (endOfGameInfo.difficulty === "easy") {
					setTimeout(() => {
						this.xTurnEasy();
					}, 500);
				} else if (endOfGameInfo.difficulty === "normal") {
					setTimeout(() => {
						this.xTurnNormal();
					}, 500);
				}
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
