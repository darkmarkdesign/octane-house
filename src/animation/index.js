import infoHover from './hover/infoHover';

import Slider from './slider/slider';
import MenuOpen from './menu/menuOpen';

export default class Animation {
	constructor() {
		this.init();
	}

	init() {
		new MenuOpen();
		new Slider();
		
		infoHover();
	}
}
