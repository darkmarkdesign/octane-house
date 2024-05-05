import gsap from 'gsap';

export default function animationLeave(container) {
	const transContainer = document.querySelector('.transition');
	const head = document.querySelector('[data-animation="trans-head"]');

	const tl = gsap.timeline({
		onComplete: () => {
			gsap.set(transContainer, { transform: 'translateY(100%)' });
		},
	});
	
	tl.to(head('.char'),
		{
			yPercent: -100,
			duration: 1.2,
			ease: 'power4.out',
			stagger: { each: 0.08 },
		});	
	tl.to(transContainer, {
		transform: 'translateY(0%)',
		duration: 1.9,
		ease: 'expo.inOut',
	}, 0.25);
	tl.to(
		container,
		{
			y: '-100vh',
			duration: 1.8,
			ease: 'expo.inOut',
		},
		'<+0.15',
	);

	return tl;
}
