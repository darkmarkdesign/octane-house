import gsap from 'gsap';

export default function homeEnter(container) {
	const el = {
		head: container.querySelector('[data-animation="trans-head"]'),
		text: container.querySelector('[data-animation="trans-txt"]'),
		heroBtm: container.querySelectorAll('.hero_btm_item'),
		heroLineTop: container.querySelector('[data-animation="hero-line-top"]'),
		heroLineBtm: container.querySelector('[data-animation="hero-line-btm"]'),
		transition: document.querySelector('.transition'),
		stars: container.querySelectorAll('.hero_stars'),
	};
	gsap.set(el.transition, { display: 'block' });

	const tl = gsap.timeline({
		onComplete: () => {
			gsap.set(el.transition, { transform: 'translateY(100%)' });
			gsap.set(el.transition, { display: 'none' });
		},
	});

	tl
		.to(el.transition, {
			transform: 'translateY(-100%)',
			duration: 1.9,
			ease: 'expo.inOut',
		})
		.from(
			container,
			{
				y: '100vh',
				duration: 1.8,
				ease: 'expo.inOut',
			},
			'<',
		)
		.from(
			el.head.querySelectorAll('.char'),
			{
				yPercent: 100,
				duration: 1.2,
				ease: 'power4.out',
				stagger: { each: 0.08 },
			},
			'<+1.2',
		)
		.from(
			el.heroLineTop,
			{
				xPercent: -100,
				duration: 1,
				ease: 'expo.inOut',
			},
			'>',
		)
		.from(
			el.heroLineBtm,
			{
				xPercent: 100,
				duration: 1,
				ease: 'expo.inOut',
			},
			'<-0.15',
		)
		.from(
			el.text.querySelectorAll('.line_inner'),
			{
				yPercent: 150,
				duration: 1,
				ease: 'power3.out',
				stagger: { each: 0.041 },
			},
			'<+0.7',
		)
		.from(
			el.stars,
			{
				opacity: 0,
				duration: 1,
				ease: 'sine.out',
			},
			'<+.1',
		)
		.from(
			el.heroBtm,
			{
				yPercent: 150,
				duration: 1.2,
				ease: 'power3.out',
				stagger: { each: 0.05 },
			},
			'<+.2',
		);

	return tl;
}
