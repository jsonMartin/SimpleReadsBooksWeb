<script>
	import { Card, Heading, Span } from 'flowbite-svelte';
	import ButtonAmazon from '../../lib/components/ButtonAmazon.svelte';
	import AvailableInFormat from '$lib/components/AvailableInFormat.svelte';

	export let data;
	const { products } = data;
</script>

<h1 class="text-5xl sm:text-6xl md:text-7xl text-center font-bold mt-4 md:mt-8">Books</h1>
<div
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-4 md:gap-8 justify-items-center mt-4 sm:mt-6 md:mt-10 mx-3 sm:mx-4 md:mx-6"
>
	{#each products as product, i}
		<Card padding="none" class={'h-fit' + ' ' + (i > 0 ? 'opacity-40' : '')}>
			<a href={'/products/' + product.id} class="flex justify-center items-center">
				<img
					class="rounded-t-lg object-cover w-full"
					src={product.images[0].imgurl}
					alt={'Product image' + i}
				/>
			</a>
			<div class="px-5 py-5 pt-2">
				<h1 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
					{product.title}
					<AvailableInFormat divClass="pt-0 -mt-[8px]" showText={false} />
				</h1>

				<p class="text-sm text-gray-400 mt-1.5 sm:mt-3">
					{product.description.split('\n')[0]}
				</p>

				<div class="flex justify-between items-center mt-5">
					<span class="text-xl font-medium text-gray-900 dark:text-white">
						${product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
					</span>
					<ButtonAmazon size="sm" />
				</div>
			</div>
		</Card>
	{/each}
</div>

<h1 class="text-5xl sm:text-6xl md:text-7xl text-center font-bold mt-4 md:mt-10 mb-4 lg:mb-8">
	Products
</h1>
<Heading
	tag="h1"
	class="mb-0 animate-bounce text-center"
	customSize="text-2xl font-extrabold sm:text-4xl md:text-5xl"
>
	<Span gradient>Coming soon...</Span>
</Heading>
<img
	alt="Hunnie Bunny Reading Book"
	src="/images/hunnie-bunny-reading-a-book-to-mr-squirrel.png"
	class="w-full p-1 sm:p-8 md:p-32 block -mt-4 sm:-mt-8 md:-mt-32 !mb-0 !pb-0"
/>
