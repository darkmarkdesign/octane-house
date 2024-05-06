import infoHover from './hover/infoHover';
import Slider from './slider/slider';
import MenuOpen from './menu/menuOpen';
import Draggable from './slider/draggable';

export default class Animation {
	constructor() {
		this.init();
	}

	init() {
		new MenuOpen();
		new Slider();
		new draggable();
		infoHover();
	}
}
