<script>
	import { Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ButtonBack from './terms/ButtonBack.svelte';
</script>

<svelte:head>
	<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
	<title>Uh oh</title>
</svelte:head>

<section class="bg-white dark:bg-gray-900 h-[100vh] flex flex-col items-center">
	{#if $page?.error?.message !== 'Not Found'}
		<h1 class="rounded-sm shadow p-5 w-full text-center bold bg-red-500 text-white">
			Error: {$page?.error?.message}
		</h1>
	{/if}

	<div
		class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 my-auto h-[100%] flex items-center"
	>
		<div class="mx-auto max-w-screen-sm text-center">
			<lottie-player
				src="https://lottie.host/5824a45e-3640-4d4f-8085-c82b1a40ca91/4RT9fuVtBk.json"
				background="#fff"
				speed="1"
				class="sm:w-[600px] sm:h-[600px]"
				loop
				autoplay
				direction="1"
				mode="normal"
			/>
			<h1 class="mb-4 text-2xl font-extrabold text-red-600 dark:text-red-500">Page Not Found</h1>
			<p class="mb-10 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
				Uh oh! That page doesn’t exist 😲
			</p>

			<ButtonBack />
		</div>
	</div>
</section>
