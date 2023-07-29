<script>
	import { CarouselTransition, Carousel } from 'flowbite-svelte';
	import ButtonAmazon from '../home/ButtonAmazon.svelte';

	const images = [
		{
			id: 0,
			imgurl: '/images/hunnie-bunnys-garden-book-cover-front-1.png'
		},
		{
			id: 1,
			imgurl: '/images/hunnie-bunnys-garden-book-cover-back-1.png'
		},
		{
			id: 2,
			imgurl: '/images/hunnie-bunnys-garden-page-1.png'
		},

		{
			id: 3,
			imgurl: '/images/hunnie-bunnys-garden-page-2.png'
		},
		{
			id: 4,
			imgurl: '/images/hunnie-bunnys-garden-book-cover.png'
		}
	];

	function generateTestImage(randomSizeLimit = 400, fixedSizeLimit = 200) {
		const id = Math.random() * 100000000;

		return {
			id,
			name: 'Test image ' + id,
			imgurl: `https://picsum.photos/${
				Math.floor(Math.random() * randomSizeLimit) + fixedSizeLimit
			}/${Math.floor(Math.random() * randomSizeLimit) + fixedSizeLimit}?random=6`,
			attribution: 'picsum photos'
		};
	}
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justiy-center items-center">
	<div id="carousel-wrapper" class="dark m-2 sm:m-6 md:m-10">
		<!-- <CarouselTransition -->
		<Carousel
			{images}
			showCaptions={false}
			showIndicators={false}
			transitionType="fade"
			transitionParams={{ delay: 300, duration: 500 }}
			classSlide="flex items-center justify-center h-[100%] w-[100%] !rounded-none !bg-transparent"
			classDiv="w-[100%] !h-[300px] sm:!h-[400px] !rounded-none !bg-transparent"
			classImg="!bg-none rounded-md animate-[fadeIn_1s_ease-in_1] h-full"
			_thumbClass="p-1 rounded-lg"
			classThumb="p-0 rounded-md shadow-xl hover:outline hover:outline-red-500"
			classThumbDiv="bg-transparent"
			thumbBtnClass="m-2"
			indicatorDivClass="bg-gray-500"
			indicatorClass="bg-purple-500"
		/>
	</div>

	<div
		class="bg-gray-100 m-auto md:m-10 p-8 sm:p-16 prose prose-sm sm:prose-xs h-[fit-content] mb-10"
	>
		<h1 class="text-2xl sm:text-3xl">Hunnie Bunny's Garden</h1>
		<p>
			Hunnie Bunny’s Garden is an enchanting picture book that brings children closer to nature,
			instills valuable virtues and ignites a sense of responsibility towards our environment.
		</p>

		<p>
			Through the endearing character of Hunnie Bunny, it’s a delightful blend of entertainment and
			education. This book also promotes discussions about nature, gardening, sustainability, and
			healthy eating. If you are looking for a children’s book that offers both a charming story and
			important life lessons, Hunnie Bunny’s Garden is the book for you!
		</p>

		<h2 class="p-0 mt-[5px]">$17.99</h2>

		<ButtonAmazon fullWidth />
	</div>
</div>
