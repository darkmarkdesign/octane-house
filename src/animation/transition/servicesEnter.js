import gsap from 'gsap';

export default function servicesEnter(container) {
	const el = {
		head: container.querySelectorAll('[data-animation="trans-head"]'),
		text: container.querySelectorAll('[data-animation="trans-txt"]'),
		heroBtm: container.querySelectorAll('.hero_btm_item'),
		heroLine: container.querySelector('[data-animation="hero-line"]'),
		transition: document.querySelector('.transition'),
		whipe: container.querySelectorAll('.trans_whipe'),
		img: container.querySelectorAll('.detail_img'),
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
			'<+0.975',
		)		
		.to(
			el.whipe,
			{
				height: '0%',
				duration: 1.9,
				ease: 'expo.out',
			},
			'<+1',
		)

		.from(
			el.heroLine,
			{
				width: '0%',
				duration: 2,
				ease: 'expo.inOut',
			},
			'<-0.15',
		)
		.from(
			el.text.querySelectorAll('.line_inner'),
			{
				yPercent: 100,
				duration: 1,
				ease: 'power3.out',
				stagger: { each: 0.1 },
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
				yPercent: 100,
				duration: 1.2,
				ease: 'power3.out',
				stagger: { each: 0.15 },
			},
			'<+.2',
		);

	return tl;
}
