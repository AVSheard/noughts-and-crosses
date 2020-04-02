/** @format */

import { decorate, observable } from "mobx";

export class EndOfGameInfo {
	constructor() {
		this.inPlay = true;
		this.winner = "";
	}
}

decorate(EndOfGameInfo, {
	inPlay: observable,
	winner: observable
});

export const endOfGameInfo = new EndOfGameInfo();
