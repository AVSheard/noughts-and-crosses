import React, { Component } from "react";
import { observer } from "mobx-react";
import { endOfGameInfo } from "../stores/endOfGameInfo";
import AIGrid from "./AIGrid";
import TwoPlayerGrid from "./TwoPlayerGrid";

export default observer(
	class Grid extends Component {
		render() {
			return endOfGameInfo.AIOn ? <AIGrid /> : <TwoPlayerGrid />;
		}
	}
);
