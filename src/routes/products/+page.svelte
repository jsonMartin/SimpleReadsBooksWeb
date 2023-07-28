<script>
	import { CarouselTransition, Carousel, A } from 'flowbite-svelte';

	const images = [
		{
			id: 0,
			name: 'Test image 1',
			imgurl: 'https://picsum.photos/600/600?random=1',
			attribution: 'picsum.photos'
		},
		{
			id: 1,
			name: 'Test image 2',
			imgurl: 'https://picsum.photos/600/600?random=2',
			attribution: 'picsum.photos'
		},
		{
			id: 2,
			name: 'Test image 3',
			imgurl: 'https://picsum.photos/600/600?random=3',
			attribution: 'picsum.photos'
		},
		{
			id: 3,
			name: 'Test image 4',
			imgurl: 'https://picsum.photos/600/600?random=4',
			attribution: 'picsum.photos'
		},
		{
			id: 4,
			name: 'Test image 5',
			imgurl: 'https://picsum.photos/600/600?random=5',
			attribution: 'picsum.photos'
		},
		{
			id: 5,
			name: 'Test image 6',
			imgurl: `https://picsum.photos/${Math.floor(Math.random() * 400) + 200}/${
				Math.floor(Math.random() * 400) + 200
			}?random=6`,
			attribution: 'picsum.photos'
		},
		{
			id: 6,
			name: 'Test image 7',
			imgurl: `https://picsum.photos/${Math.floor(Math.random() * 400) + 200}/${
				Math.floor(Math.random() * 400) + 200
			}?random=7`,
			attribution: 'picsum.photos'
		},
		{
			id: 7,
			name: 'Test image 8',
			imgurl: `https://picsum.photos/${Math.floor(Math.random() * 400) + 200}/${
				Math.floor(Math.random() * 400) + 200
			}?random=8`,
			attribution: 'picsum.photos'
		}
	];
</script>

<div class="max-w-4xl">
	<div id="carousel-wrapper" class="dark">
		<!-- <CarouselTransition -->
		<Carousel
			{images}
			showCaptions={false}
			showIndicators={false}
			transitionType="fade"
			transitionParams={{ delay: 300, duration: 500 }}
			classSlide="flex items-center justify-center h-[100%] w-[100%] !rounded-none !bg-transparent"
			classDiv="!h-[600px] w-[100%] !rounded-none !bg-transparent mt-2"
			classImg="!bg-red-800 rounded-md animate-[fadeIn_1s_ease-in_1]"
			_thumbClass="p-1 rounded-lg"
			classThumb="p-0 rounded-md shadow-xl hover:outline hover:outline-red-500"
			classThumbDiv="bg-transparent"
			thumbBtnClass="m-2"
			indicatorDivClass="bg-gray-500"
			indicatorClass="bg-purple-500"
		/>
	</div>
</div>
