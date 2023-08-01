<script lang="ts">
	import { Carousel, Badge } from 'flowbite-svelte';
	import ButtonAmazon from '../../../lib/components/ButtonAmazon.svelte';
	import { page } from '$app/stores';
	import { getProductById } from '$lib/data/products';
	import ButtonBack from '../../terms/ButtonBack.svelte';
	import { ExclamationCircleSolid } from 'flowbite-svelte-icons';
	import { wrapTextInParagraphTags } from '$lib/helpers';
	import { CldImage } from 'svelte-cloudinary';

	export let data;

	const { id } = $page.params;
	const { products } = data;
	const product: any = getProductById(products, id);

	$: isBook = product?.type === 'book';
</script>

<svelte:head>
	{#if product}
		<title>{product.title}</title>
	{/if}
</svelte:head>

{#if product}
	<div
		class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-1 w-full justiy-center items-center justify-items-center"
	>
		<div id="carousel-wrapper" class="dark m-2 sm:m-6 md:m-10">
			<Carousel
				images={product.images}
				showCaptions={false}
				showIndicators={false}
				classSlide="flex items-center justify-center h-[100%] w-[100%] !rounded-none !bg-transparent"
				classDiv="w-[100%] !h-[300px] sm:!h-[400px] !rounded-none !bg-transparent"
				classImg="!bg-none rounded-md animate-[fadeIn_.2s_ease-in-out_1] h-full"
				classThumb="p-0 rounded-md shadow-xl hover:outline hover:outline-red-500"
				classThumbDiv="bg-transparent"
				thumbBtnClass="m-2"
				indicatorDivClass="bg-gray-500"
				indicatorClass="bg-purple-500"
			/>
		</div>

		<div class="bg-gray-100 p-8 sm:p-10 md:p-16 prose prose-sm sm:prose-xs sm:m-5 md:m-8 lg:m-10">
			<h1 class="text-2xl sm:text-3xl">{product.title}</h1>

			{#if isBook}
				<div class="pt-0 mt-[-20px]">
					<span class="text-xs font-light align-middle">Available in </span>
					<Badge color="green">Hardcover</Badge>
					<Badge color="green">Paperback</Badge>
					<Badge color="green">Kindle</Badge>
				</div>
			{/if}

			{@html wrapTextInParagraphTags(product.description)}

			<h2 class="p-0 mt-[5px]">
				${product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
			</h2>

			<ButtonAmazon fullWidth />
		</div>
	</div>
{:else}
	<div class="text-center pt-2">
		<h1
			class="text-3xl sm:text-4xl text-center text-red-500 flex flex-row justify-center items-center"
		>
			<ExclamationCircleSolid class="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2" />
			No product found
		</h1>
		<h6 class="text-md text-center">We couldn't find a match based on the provided product ID.</h6>
		<ButtonBack />
	</div>

	<CldImage
		width={2100}
		height="100%"
		aspectRatio={2100 / 1500}
		src="hunnie-bunny-reading-a-book-to-mr-squirrel"
		quality={80}
		class="w-full"
	/>
{/if}
