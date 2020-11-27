import { decorate, observable } from "mobx";

export class EndOfGameInfo {
	constructor() {
		this.inPlay = true;
		this.winner = "";
		this.turns = 0;
		this.AIOn = true;
		this.difficulty = "hard";
	}
}

decorate(EndOfGameInfo, {
	inPlay: observable,
	winner: observable,
	turns: observable,
	difficulty: observable,
});

export const endOfGameInfo = new EndOfGameInfo();
