<script>
	import { Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</svelte:head>

<section class="bg-white dark:bg-gray-900">
	{#if $page?.error?.message !== 'Not Found'}
		<h1 class="rounded-sm shadow p-5 w-full text-center bold">Error: {$page?.error?.message}</h1>
	{/if}

	<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
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

			<Button
				class="bg-[#BDFD4F] !text-black hover:bg-blue-400"
				size="lg"
				on:click={() => goto('/home')}
			>
				<svg
					class="w-4 h-4 mr-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 5H1m0 0 4 4M1 5l4-4"
					/>
				</svg>
				Go back
			</Button>
		</div>
	</div>
</section>
