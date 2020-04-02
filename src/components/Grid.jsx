/** @format */

import React, { Component } from "react";

export default class Grid extends Component {
	state = {
		turn: true,
		values: [
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
				{this.state.values.map((entry, index) => {
					return (
						<div className="grid-item" key={index}>
							{entry.value}
						</div>
					);
				})}
			</div>
		);
	}
}
