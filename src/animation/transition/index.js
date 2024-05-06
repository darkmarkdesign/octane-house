import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';

/* Other Animation Import */
import Slider from '../slider/slider';
import Split from '../../utils/split';
import SmoothScroll from '../../utils/scroll';
import Parallax from '../image/parallax';
import Whipe from '../image/whipe';
import Line from '../line/linein';
import SlideUp from '../text/title';
import SlideParagraph from '../text/paragraph';
import FooterLogo from '../logo/footerLogo';
import Fade from '../fade/fade';

/* Transition Animation and preloader Import */
import Preloader from '../preloader/preloader';
import animationLeave from './animationLeave';
import homeEnter from './homeEnter';
import workEnter from './workEnter';
import detailEnter from './detailEnter';
import aboutEnter from './aboutEnter'; 
import servicesEnter from './servicesEnter'; 

export default class Transition {
	constructor() {
		this.barba = barba;
		this.scroll = new SmoothScroll();
		this.pageTrans();
	}

	pageTrans() {
		this.barba.use(barbaPrefetch);
		this.barba.init({
			preventRunning: true,
			transitions: [
				{
					name: 'global-leave-transition',
					sync: true,
					leave: ({ current }) => {
						return animationLeave(current.container);
					},
				},
				
				{
					name: 'detail-transition',
					sync: true,
					to: {
						namespace: ['detail'],
					},
					once({ next }) {
						new Split();
						new SlideUp();
						new SlideParagraph();
						new Parallax();
						new Line();
						new Whipe();
						new FooterLogo();
						new Fade();
						detailEnter(next.container);
					},
					beforeEnter({ next }) {
						next.container.classList.add('is-transition');
					},
					enter: ({ next }) => {
						return detailEnter(next.container);
					},
					after({ next }) {
						new Parallax();
						new Whipe();
						new Line();
						new SlideUp();
						new SlideParagraph();
						new Fade();
						new FooterLogo();
						next.container.classList.remove('is-transition');
					},
					leave({ current }) {
						return animationLeave(current.container);
					},
				},
			],
		});

		this.barba.hooks.beforeEnter(() => {
			new Split();
		});

		this.barba.hooks.before(() => {
			document.body.style.cursor = 'wait';
			this.scroll.stopScroll();
		});

		this.barba.hooks.after(() => {
			document.body.style.cursor = 'auto';
			window.scrollTo(0, 0);
			this.scroll.startScroll();
		});
	}
}
