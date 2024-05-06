import infoHover from './hover/infoHover';
import gsap from 'gsap';
import SmoothScroll from '../../utils/scroll';

/* Other Animation Import */
import Slider from '../slider/slider';
import Split from '../../utils/split';

import Parallax from '../image/parallax';
import Whipe from '../image/whipe';
import Line from '../line/linein';
import SlideUp from '../text/title';
import SlideParagraph from '../text/paragraph';
import FooterLogo from '../logo/footerLogo';
import Fade from '../fade/fade';
import Preloader from '../preloader/preloader';

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
