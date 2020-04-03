/** @format */

import { decorate, observable } from "mobx";

export class EndOfGameInfo {
	constructor() {
		this.inPlay = true;
		this.winner = "";
		this.turns = 0;
	}
}

decorate(EndOfGameInfo, {
	inPlay: observable,
	winner: observable,
	turns: observable
});

export const endOfGameInfo = new EndOfGameInfo();
