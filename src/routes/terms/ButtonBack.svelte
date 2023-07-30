<script>
	import { goto } from '$app/navigation';
	import { Button, Heading } from 'flowbite-svelte';

	const pClass = 'text-sm text-gray-500 font-normal leading-normal pb-2';
</script>

<Button class="bg-primary-500 text-white mt-[24px]" size="lg" on:click={() => goto('/home')}>
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
