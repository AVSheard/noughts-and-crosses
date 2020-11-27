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
		twoAndOneCheck(doubleValue, singleValue, boxFilled) {
			const { blocks } = this.state;

			// check if two crosses/noughts and a blank space occupy a row and then call function to fill blank space
			winConditions.forEach((condition) => {
				if (
					blocks[condition[0]].value === doubleValue &&
					blocks[condition[1]].value === doubleValue &&
					blocks[condition[2]].value === singleValue &&
					!boxFilled
				) {
					boxFilled = true;
					const toFill = doubleValue ? 2 : 1;
					this.handleClick(condition[toFill]);
				} else if (
					blocks[condition[0]].value === doubleValue &&
					blocks[condition[2]].value === doubleValue &&
					blocks[condition[1]].value === singleValue &&
					!boxFilled
				) {
					boxFilled = true;
					const toFill = doubleValue ? 1 : 0;
					this.handleClick(condition[toFill]);
				} else if (
					blocks[condition[2]].value === doubleValue &&
					blocks[condition[1]].value === doubleValue &&
					blocks[condition[0]].value === singleValue &&
					!boxFilled
				) {
					boxFilled = true;
					const toFill = doubleValue ? 0 : 2;
					this.handleClick(condition[toFill]);
				}
			});

			// Pass on whether a box got filled with a boolean
			return boxFilled;
		}

		// Handle AI turn on normal mode
		xTurnNormal() {
			let boxFilled = false;

			// Fill in final box if two x's are in a row
			boxFilled = this.twoAndOneCheck("x", "", boxFilled);

			// Fill in final box if two o's are in a row
			if (!boxFilled) {
				boxFilled = this.twoAndOneCheck("o", "", boxFilled);
			}

			// If no box is filled call easy or hard mode function to fill a box
			if (!boxFilled) {
				if (endOfGameInfo.difficulty === "easy") {
					this.xTurnEasy();
				} else {
					this.xTurnHard();
				}
			}
		}

		xTurnHard() {
			let boxFilled = false;

			boxFilled = this.twoAndOneCheck("", "x", boxFilled);

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
				} else if (
					endOfGameInfo.difficulty === "normal" ||
					endOfGameInfo.difficulty === "hard"
				) {
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
