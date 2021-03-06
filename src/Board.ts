import { Svg } from '@svgdotjs/svg.js';
import { Teleport } from "./Teleport";

export class Board {
	width: number;
	height: number;
	padding: number;

	constructor(public size: number, public teleports: Teleport[]) {
		this.width = 40;
		this.height = 40;
		this.padding = 10;
	}

	apply_teleports(position: number): number {
		// player can only jump once
		// todo find & apply teleport +-
		for (let teleport of this.teleports) {
			if (position == teleport.source) {
				position = teleport.destination;
				break;
			}
		}
		return position;
	}

	on_teleport(position: number): boolean {
		for (let teleport of this.teleports) {
			if (position == teleport.source) {
				return true;
			}
		}
		return false;
	}

	draw_board(draw: Svg) {

		for (var x = 0; x < 10; x++) {
			for (var y = 0; y < 10; y++) {
				draw.rect(this.height, this.width).move(((this.width + this.padding) * x), (this.height + this.padding) * y).fill({ color: "grey" });

			}
		}

	}
	draw_line(draw: Svg, x1: number, y1: number, x2: number, y2: number) {

		let lx1 = x1;
		let lx2 = x2;
		let ly1 = y1;
		let ly2 = y2;
		draw.line(((this.width + this.padding) * lx1 + this.width / 2), ((this.height + this.padding) * ly1 + this.height / 2), ((this.width + this.padding) * lx2 + this.width / 2), ((this.height + this.padding) * ly2 + this.height / 2)).stroke({ color: '#f06' });
	}

	render(draw: Svg) {
		this.draw_board(draw);
		for (let teleport of this.teleports) {
			let x1 = (teleport.source - 1) % 10;
			let y1 = Math.floor((teleport.source - 1) / 10);
			let x2 = (teleport.destination - 1) % 10;
			let y2 = Math.floor((teleport.destination - 1) / 10);
			this.draw_line(draw, x1, y1, x2, y2);
		}



	}
}
