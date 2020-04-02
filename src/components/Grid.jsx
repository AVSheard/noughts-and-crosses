/** @format */

import React, { Component } from "react";

export default class Grid extends Component {
	state = {
		turn: true,
		nums: [
			{ value: "" },
			{ value: "" },
			{ value: "" },
			{ value: "" },
			{ value: "" },
			{ value: "" },
			{ value: "" },
			{ value: "" },
			{ value: "" }
		]
	};

	render() {
		return (
			<div className="grid-container">
				{this.state.nums.map((num, index) => {
					return (
						<div className="grid-item" key={index}>
							{num.value}
						</div>
					);
				})}
			</div>
		);
	}
}
