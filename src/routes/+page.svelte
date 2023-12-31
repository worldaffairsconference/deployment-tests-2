<!-- <script lang="ts">
	import { z } from 'zod';

	import Component from '$lib/Component.svelte';
	import { docStore } from '$lib/firebase';

	const test = docStore(
		'test/hi',
		z.object({ test: z.boolean() }).strict(),
		z.object({ test: z.boolean().catch(true) })
	);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<pre><code>{JSON.stringify($test, null, 2)}</code></pre>

<Component />
<Component />
<Component />
<Component /> -->

<script lang="ts">
	import 'swiper/css';
	import 'swiper/css/navigation';

	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';
	// Icons
	import IoIosPlayCircle from 'svelte-icons/io/IoIosPlayCircle.svelte';
	import TiArrowLeft from 'svelte-icons/ti/TiArrowLeft.svelte';
	import TiArrowRight from 'svelte-icons/ti/TiArrowRight.svelte';
	import { Navigation, Swiper } from 'swiper';
	import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/svelte';
	import * as THREE from 'three';
	import ThreeGlobe from 'three-globe';

	import { browser } from '$app/environment';
	import branksome from '$lib/images/logos/branksome.webp';
	// Importing the school images
	import ucc from '$lib/images/logos/ucc.webp';
	// Importing showcase images
	import showcase1 from '$lib/images/showcase/showcase_1.webp';
	import showcase2 from '$lib/images/showcase/showcase_2.webp';
	import showcase3 from '$lib/images/showcase/showcase_3.webp';
	import showcase4 from '$lib/images/showcase/showcase_4.webp';
	import showcase5 from '$lib/images/showcase/showcase_5.webp';
	import showcase6 from '$lib/images/showcase/showcase_6.webp';
	import showcase7 from '$lib/images/showcase/showcase_7.webp';
	import ckHoffler from '$lib/images/speakers/ck_hoffler.webp';
	import davidOwen from '$lib/images/speakers/david_owen.webp';
	import edwardSnowden from '$lib/images/speakers/edward_snowden.webp';
	import geoffreyHinton from '$lib/images/speakers/geoffrey_hinton.webp';
	import johnStackhouse from '$lib/images/speakers/john_stackhouse.webp';
	import marcGarneau from '$lib/images/speakers/marc_garneau.webp';
	import mehdiHasan from '$lib/images/speakers/mehdi_hasan.webp';
	// Importing the speaker images
	import mlk from '$lib/images/speakers/mlk.webp';
	import scottGalloway from '$lib/images/speakers/scott_galloway.webp';
	import thumbnail2019 from '$lib/images/thumbnails/2019.webp';
	import thumbnail2020 from '$lib/images/thumbnails/2020.webp';
	// Importing video thumbnails
	import thumbnail2023 from '$lib/images/thumbnails/2023.webp';

	// Constants
	const SPREAD = 700; // How spread out the stars are
	const TOTAL_STARS = 1500; // How many stars there are

	interface Showcase {
		image: string;
		title: string;
		description: string;
	}

	interface Speaker {
		name: string;
		title: string;
		image: string;
		specialRole?: string;
	}

	interface Theme {
		name: string;
		year: number;
		thumbnail: string;
		videoURL: string;
	}

	const speakers: Speaker[] = [
		{
			name: 'Martin Luther King III',
			title: 'American Human Rights Activist',
			image: mlk,
			specialRole: 'Keynote Speaker'
		},
		{
			name: 'Edward Snowden',
			title: 'Former NSA Consultant & Whistleblower',
			image: edwardSnowden,
			specialRole: 'Famous Speaker'
		},
		{
			name: 'Ck Hoffler',
			title: 'CEO of The CK Hoffler Firm',
			image: ckHoffler
		},
		{
			name: 'Scott Galloway',
			title: 'Professor of Marketing at NYU Stern School of Business',
			image: scottGalloway
		},
		{
			name: 'Marc Garneau',
			title: 'Former Canadian Astronaut',
			image: marcGarneau
		},
		{
			name: 'Mehdi Hasan',
			title: 'British-American Political Journalist, Broadcaster and Author',
			image: mehdiHasan
		},
		{
			name: 'John Stackhouse',
			title: 'Former Editor-in-Chief of The Globe and Mail',
			image: johnStackhouse
		},
		{
			name: 'David Owen',
			title: 'Former British Foreign Secretary',
			image: davidOwen
		},
		{
			name: 'Dr Geoffrey Hinton',
			title: '2018 recipient of the Turing Award for Computer Science',
			image: geoffreyHinton
		}
	];

	let showcases: Showcase[] = [
		{
			image: showcase1,
			title: 'The Future of Space Exploration',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, quisquam.'
		},
		{
			image: showcase2,
			title: 'The Future of the Internet',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, quisquam.'
		},
		{
			image: showcase3,
			title: 'The Future of Democracy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, quisquam.'
		},
		{
			image: showcase4,
			title: 'The Future of Criminality',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, quisquam.'
		},
		{
			image: showcase5,
			title: 'The Future of Business',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, quisquam.'
		},
		{
			image: showcase6,
			title: 'The Future of Artificial Intelligence',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, quisquam.'
		},
		{
			image: showcase7,
			title: 'The Future of Artificial Intelligence',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, quisquam.'
		}
	];

	let themes: Theme[] = [
		{
			name: 'Hybrid Thinking',
			year: 2023,
			thumbnail: thumbnail2023,
			videoURL: 'https://www.youtube.com/watch?v=svfMVfYeOd8'
		},
		{
			name: 'World Gone',
			year: 2020,
			thumbnail: thumbnail2020,
			videoURL: 'https://www.youtube.com/watch?v=KveYOMD7fp0'
		},
		{
			name: '20/20 Vision',
			year: 2019,
			thumbnail: thumbnail2019,
			videoURL: 'https://www.youtube.com/watch?v=GUycwPz_Kds'
		}
	];

	let canvasElement: HTMLCanvasElement;
	let gsapScope: Element;

	if (browser) {
		gsap.registerPlugin(ScrollTrigger);
	}

	onMount(() => {
		// Initializing the globe
		const Globe = new ThreeGlobe({ animateIn: false })
			.globeImageUrl('./map.webp')
			.bumpImageUrl('./earth-topology.webp')
			.atmosphereColor('rgba(82, 167, 220, 1)')
			.atmosphereAltitude(0.12);

		// Rotate the globe on the diagonal axis
		Globe.rotateY(Math.PI / 2);

		// Custom globe material
		const globeMaterial = Globe.globeMaterial() as THREE.MeshPhongMaterial;
		globeMaterial.bumpScale = 10;

		new THREE.TextureLoader().load('./earth-water.webp', (texture) => {
			globeMaterial.specularMap = texture;
			globeMaterial.specular = new THREE.Color('#020263');
			globeMaterial.shininess = 0;
		});

		// Setup scene
		const scene = new THREE.Scene();

		scene.add(Globe);

		// Setup camera
		const camera = new THREE.PerspectiveCamera();
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		camera.position.x = 0;
		camera.position.y = 121;
		camera.position.z = 125;

		scene.add(camera);

		// Lighting
		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
		directionalLight.position.set(1, 1, 1);
		scene.add(new THREE.AmbientLight(0xcccccc));
		scene.add(directionalLight);

		// Stars
		const starsGeometry = new THREE.BufferGeometry();
		const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

		const starVertices: Array<number> = [];

		for (let i = 0; i < TOTAL_STARS; i++) {
			const x = THREE.MathUtils.randFloatSpread(SPREAD);
			const y = THREE.MathUtils.randFloatSpread(SPREAD);
			const z = THREE.MathUtils.randFloatSpread(SPREAD);

			starVertices.push(x, y, z);
		}

		starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

		const stars = new THREE.Points(starsGeometry, starMaterial);
		scene.add(stars);

		let renderer: THREE.WebGLRenderer;

		// Render loop
		const animate = () => {
			renderer.render(scene, camera);
			Globe.rotateY(-0.0005);
			requestAnimationFrame(animate);
		};

		// Handles resizing the window
		const handleWindowResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		};

		const createScene = () => {
			renderer = new THREE.WebGLRenderer({
				antialias: true,
				canvas: canvasElement,
				alpha: true
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			animate();
		};

		window.addEventListener('resize', handleWindowResize);
		createScene();

		const ctx = gsap.context(() => {
			// Timeline for camera movement
			gsap
				.timeline({
					scrollTrigger: {
						trigger: '#home',
						start: 'top top',
						end: 'bottom+=6700 center',
						pin: '#home',
						scrub: true
						// markers: true,
					}
				})
				.to(camera.position, {
					duration: 1,
					y: 110,
					z: 60,
					ease: 'power2.out'
				})
				// Make the globe zoom in and position to the left side of the screen
				.to(camera.position, {
					duration: 0.75,
					x: 125,
					y: 10,
					z: 150,
					ease: 'power2.out',
					delay: 0.25
				})
				.to(camera.position, {
					delay: 0.75
				})
				.to(camera.position, {
					duration: 1.25,
					x: 0,
					y: -75,
					z: 175,
					ease: 'sine.out'
				});

			const textTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: '#container',
					start: 'top+=900 center',
					end: 'top+=2100 center',
					scrub: true
					// markers: true,
				}
			});

			// Reveals the statistics
			textTimeline
				.to('#stats', {
					opacity: 1,
					y: 10,
					duration: 4,
					display: 'block'
				})
				.to('#stats', {
					opacity: 0,
					duration: 1,
					y: -10,
					display: 'hidden',
					delay: 5
				});

			const speakerTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: '#stats',
					start: 'top+=3300 center',
					end: 'top+=5500 center',
					scrub: true
					// markers: true,
				}
			});

			speakerTimeline.from('#speakers', {
				display: 'hidden',
				opacity: 0,
				y: 10,
				duration: 1,
				ease: 'sine.out'
			});

			speakerTimeline.to('#speakers', {
				opacity: 0,
				duration: 1,
				y: -10,
				display: 'hidden',
				delay: 1.5
			});

			gsap.to(starVertices, {
				scrollTrigger: {
					trigger: '#pastThemes',
					start: 'top-=200% bottom',
					end: 'top bottom',
					scrub: true,
					// markers: true,
					onUpdate: (self) => {
						// Removing last 10 items from starVertices array on scrolltrigger on each update
						const starsRendered =
							starVertices.length - Math.floor(starVertices.length * self.progress);

						starsGeometry.setAttribute(
							'position',
							new THREE.Float32BufferAttribute(starVertices.slice(0, starsRendered), 3)
						);
					}
				}
			});

			gsap.from('#pastThemes', {
				scrollTrigger: {
					trigger: '#pastThemes',
					start: 'top bottom'
					// markers: true,
				},
				duration: 1,
				opacity: 0,
				y: 100,
				ease: 'sine.out'
			});

			gsap.from('#hostedBy', {
				scrollTrigger: {
					trigger: '#hostedBy',
					start: 'top bottom'
					// markers: true,
				},
				duration: 0.8,
				opacity: 0,
				y: 50,
				ease: 'sine.out'
			});

			gsap.from('#title', {
				duration: 0.9,
				opacity: 0,
				y: 100,
				ease: 'sine.out'
			});

			return () => ctx.revert();
		}, gsapScope);
	});

	let swiperInstance: Swiper;

	const prevSlide = () => {
		swiperInstance.slidePrev();
	};

	const nextSlide = () => {
		swiperInstance.slideNext();
	};
</script>

<svelte:head>
	<title>World Affairs Conference</title>
	<meta
		name="description"
		content="North America's largest and Canada's oldest annual student-run current events conference."
	/>
</svelte:head>

<div bind:this={gsapScope}>
	<section
		class="pt-[10rem] md:pt-44 lg:pt-[13.5rem] text-center flex flex-col items-center h-screen w-screen absolute top-0 left-0 z-30"
		id="title"
	>
		<div class="w-5/6 mx-auto">
			<h1
				class="text-[2.9rem] leading-none sm:text-6xl lg:text-[5.5rem] text-white font-bold mb-5 lg:mb-6 tracking-[-0.03em]"
			>
				World Affairs Conference
			</h1>
			<p class="text-zinc-400 text-md lg:text-[1.3rem] mb-3.5 md:px-32 lg:px-48">
				North America's largest and Canada's oldest annual student-run current events conference.
			</p>
		</div>

		<div class="flex gap-4 mb-6 text-xl lg:text-2xl">
			<span class="text-primary">#BeThere</span>
			<span class="text-secondary">#RollWAC</span>
		</div>

		<div class="flex gap-1.5 flex-col sm:flex-row">
			<div class="relative">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-zinc-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
						<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
					</svg>
				</div>
				<input
					type="text"
					class="border text-sm rounded-lg block w-56 md:w-80 pl-10 p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white focus:ring-zinc-400 focus:border-zinc-400 outline-none"
					placeholder="name@school.com"
				/>
			</div>
			<button
				class="bg-gradient-to-r from-primary to-secondary rounded-lg px-6 py-2 text-white text-sm"
			>
				Get Notified
			</button>
		</div>
	</section>

	<section class="pt-[10rem] md:pt-44 lg:pt-[13.5rem] text-center relative h-screen" id="home">
		<div class="absolute w-full h-screen flex justify-center inset-0 -z-50" id="container">
			<div
				class="absolute top-[20%] sm:top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-[20%] sm:-translate-y-1/4 w-5/6 mx-auto opacity-0 hidden transition-opacity"
				id="stats"
			>
				<h2 class="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-10">WAC has reached:</h2>
				<dl
					class="max-w-screen-md gap-8 mx-auto text-white flex justify-between flex-wrap text-center [&>*]:mx-auto"
				>
					<div class="flex flex-col items-center justify-center mx-auto">
						<dt class="mb-2 text-5xl sm:text-6xl md:text-[5.4rem] font-bold tracking-tight">
							10k+
						</dt>
						<dd class="text-zinc-400">students</dd>
					</div>
					<div class="flex flex-col items-center justify-center mx-auto">
						<dt class="mb-2 text-5xl sm:text-6xl md:text-[5.4rem] font-bold tracking-tight">35+</dt>
						<dd class="text-zinc-400">countries</dd>
					</div>
					<div class="flex flex-col items-center justify-center mx-auto">
						<dt class="mb-2 text-5xl sm:text-6xl md:text-[5.4rem] font-bold tracking-tight">80+</dt>
						<dd class="text-zinc-400">schools</dd>
					</div>
				</dl>
			</div>
			<div
				class="absolute w-full h-screen flex text-left gap-10 sm:gap-6 flex-col py-16"
				id="speakers"
			>
				<div
					class="flex justify-between sm:justify-normal sm:flex-col gap-6 mx-6 sm:mx-10 md:mx-20"
				>
					<h2 class="text-center text-3xl sm:text-7xl font-bold text-white tracking-tight">
						2023 Speakers
					</h2>
					<div class="self-end">
						<button
							on:click={prevSlide}
							class="h-10 w-10 sm:h-[3.15rem] sm:w-[3.15rem] p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 ease-in"
							aria-label="Go to Previous Speaker"
						>
							<TiArrowLeft />
						</button>
						<button
							on:click={nextSlide}
							class="h-10 w-10 sm:h-[3.15rem] sm:w-[3.15rem] p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 ease-in"
							aria-label="Go to Next Speaker"
						>
							<TiArrowRight />
						</button>
					</div>
				</div>
				<div class="grow overflow-hidden relative">
					<div
						class="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[160vw] sm:w-[130vw]"
					>
						<SwiperContainer
							spaceBetween={20}
							slidesPerView={3}
							class="flex gap-6 w-full h-full"
							loop={true}
							navigation
							on:init={(swiper) => {
								swiperInstance = swiper.detail[0];
							}}
							breakpoints={{
								'@0.7': {
									slidesPerView: 4
								},
								'@0.9': {
									slidesPerView: 5
								},
								'@1.00': {
									slidesPerView: 6 // TODO: use pixel breakpoints
								}
							}}
						>
							{#each speakers as speaker}
								<SwiperSlide class="rounded-md relative overflow-hidden">
									<img
										src={speaker.image}
										alt="{speaker.name}'s Headshot"
										class="w-full rounded-lg h-full object-cover transition-all"
									/>

									<div
										class="absolute bottom-0 w-full backdrop-blur-[8px] bg-zinc-900/30 h-20 px-3 flex"
									>
										<div class="my-auto">
											<h3 class="font-semibold text-white sm:text-lg md:text-xl">
												{speaker.name}
											</h3>
											<p class="text-zinc-300 text-[0.6rem] md:text-xs">
												{speaker.title}
											</p>
										</div>
									</div>
									<div
										class="absolute top-3 left-3 p-2 bg-zinc-900/50 rounded-md text-xs text-white"
									>
										{speaker.specialRole || 'Plenary Speaker'}
									</div>
								</SwiperSlide>
							{/each}
						</SwiperContainer>
					</div>
				</div>
				<a
					class="font-semibold text-zinc-200 text-center sm:text-lg"
					href="/speakers"
					target="_blank"
					rel="noopener noreferrer"
				>
					View the Rest of Our 2023 Speakers →
				</a>
			</div>
			<canvas bind:this={canvasElement} />
		</div>
	</section>

	<section class="mx-4 sm:mx-6 mb-32 relative" id="pastThemes">
		<h3 class="text-center text-white text-7xl mb-11 font-bold tracking-tight">Past Themes</h3>
		<div class="flex flex-col lg:flex-row gap-3">
			{#each themes as theme}
				<a
					class="relative w-full group hover:scale-[1.025] transition-all duration-300 ease-in-out"
					href={theme.videoURL}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={theme.thumbnail}
						alt="{theme.name} Thumbnail"
						class="w-full object-cover h-[26rem] group-hover:saturate-100 saturate-[0.5] transition-all duration-500"
					/>
					<div
						class="absolute w-max flex justify-center items-center flex-col gap-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
					>
						<div class="text-[2.5rem] font-bold tracking-tight">
							{theme.name}
						</div>
						<div class="h-24 w-24">
							<IoIosPlayCircle />
						</div>
						<div class="text-5xl font-bold tracking-tighter">
							{theme.year}
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section class="bg-white py-12 px-30 mb-32">
		<h3 class="text-3xl md:text-4xl font-semibold uppercase text-center tracking-tight mb-5">
			Hosted By
		</h3>

		<div
			class="flex flex-col md:flex-row gap-7 md:gap-32 items-center justify-center"
			id="hostedBy"
		>
			<img src={branksome} alt="Branksome Hall Logo" class="h-24 rounded-md w-auto" width={96} />
			<img src={ucc} alt="Upper Canada College Logo" class="h-24 rounded-md w-auto" width={96} />
		</div>
	</section>

	<section class="w-screen h-[90vh] relative select-none">
		<SwiperContainer class="w-full h-full" loop={true} modules={[Navigation]} navigation>
			{#each showcases as showcase}
				<SwiperSlide class="relative">
					<img src={showcase.image} alt={showcase.description} class="w-full h-full object-cover" />
					<div class="absolute bottom-14 left-14 tracking-tight">
						<h4 class="text-white font-semibold">
							{showcase.title}
						</h4>
						<p class="text-zinc-300">{showcase.description}</p>
					</div>
				</SwiperSlide>
			{/each}
		</SwiperContainer>

		<div class="absolute top-16 left-16 z-50">
			<h3 class="text-white text-5xl font-semibold tracking-tight">World Affairs Conference</h3>
		</div>
	</section>

	<section
		class="w-screen bg-zinc-900 px-12 md:px-28 py-20 flex justify-between lg:items-center flex-col lg:flex-row gap-7"
		id="action"
	>
		<h3 class="uppercase">
			<div class="text-2xl sm:text-4xl text-zinc-300 font-semibold tracking-tighter">Stay</div>
			<div class="text-3xl sm:text-7xl text-secondary font-bold tracking-tighter">Updated</div>
		</h3>
		<div>
			<h3 class="text-white font-semibold mb-4 sm:mb-5 sm:text-2xl">Sign up for WAC updates</h3>
			<div class="flex gap-1.5 flex-col sm:flex-row">
				<div class="relative">
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							aria-hidden="true"
							class="w-5 h-5 text-zinc-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
						</svg>
					</div>
					<input
						type="text"
						class="border text-sm rounded-lg block w-full sm:w-64 md:w-96 pl-10 p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white focus:ring-zinc-400 focus:border-zinc-400 outline-none"
						placeholder="name@school.com"
					/>
				</div>
				<button
					class="bg-gradient-to-r from-primary to-secondary rounded-lg px-6 py-2 text-white text-sm"
				>
					Get Notified
				</button>
			</div>
		</div>
	</section>
</div>

<style>
	:global(.swiper-button-next),
	:global(.swiper-button-prev) {
		right: 10px;
		padding: 30px;
		color: #ffffff !important;
		fill: black !important;
		stroke: black !important;
	}
</style>
