<script>
	import ButtonAmazon from './ButtonAmazon.svelte';

	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Modal,
		Badge,
		Label,
		ButtonGroup,
		InputAddon,
		Input
	} from 'flowbite-svelte';
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterBrand,
		FooterLink,
		FooterIcon
	} from 'flowbite-svelte';
	import { fade } from 'svelte/transition';

	let defaultModal = false;
</script>

<section
	class="w-full py-10 md:py-20 px-4 md:px-5 bg-[#009933] bg-opacity-40 flex-col justify-start items-center inline-flex font-[Itim]"
>
	<div class="justify-start items-center inline-flex">
		<div class="self-stretch justify-between items-start gap-2.5 inline-flex">
			<div
				class="text-center text-gray-900 lg:text-4xl xs:text-normal sm:text-2xl md:text-3xl font-normal md:px-10"
			>
				Simple Reads Books encourages children to explore nature through entertaining stories filled
				with colorful illustrations
			</div>
		</div>
	</div>
</section>

<!-- TODO: Refactor into component -->
<section>
	<div class="flex flex-row flex-wrap font-[Itim]">
		<!-- <div class="p-4 basis-7/12 md:basis-full"> -->
		<div class="p-4 md:basis-7/12">
			<img
				class="rounded-lg w-full"
				src="images/hunnie-bunnys-garden-mockup.png"
				alt="book mockup cover"
			/>
			<div class="self-stretch text-center text-gray-900 md:text-xl lg:text-2xl text-xl p-3">
				<p class="mb-2">
					Hunnie Bunny’s Garden is a delightful blend of entertainment and education that provides
					endless opportunities for learning and discovery.
				</p>
				<p class="mb-2">
					This charming story is a wonderful testament to the beauty of nature and the joy that
					gardening can bring.
				</p>
				<p class="pt-3 text-shadow-black-xs text-black">
					Add Hunnie Bunny’s Garden to your child’s library today!
				</p>
			</div>
		</div>

		<div class="p-4 basis-full md:basis-5/12 flex flex-col justify-start items-center">
			<div
				class="md:mt-[70px] xl:mt-[90px] text-center text-black text-xl lg:text-2xl xl:text-3xl font-normal mb-10"
			>
				Release Date <mark class="px-2 bg-[#B9D6B8] rounded">August 15, 2023</mark>
			</div>

			<ButtonAmazon />
			<img style="scale:1.25" src="/images/hunnie-bunny-reading-book.png" class="mt-10" />
		</div>
	</div>
</section>

<section class="w-full font-[Itim]">
	<div
		class="bg-[rgba(0,102,204,0.44)] p-2.5 flex flex-row items-center justify-between w-full relative"
	>
		<img
			class="hidden sm:flex col-span-3 max-w-[20%] animate-rotate-custom"
			src="images/mr_squirrel_sitting.png"
			loading="lazy"
		/>

		<div class="flex flex-row gap-2.5 items-center justify-center col-span-6 m-auto">
			<div class="flex flex-col gap-0 items-center justify-start">
				<div class="text-gray-900 text-center relative self-stretch">
					<span>
						<p class="text-xl md:text-2xl lg:text-3xl text-normal text-shadow-sm mb-5">
							Coming Soon!
						</p>
						<div class="mt-30">
							<span class="md:text-xl lg:text-2xl"
								>Hunnie Bunny’s Garden Mystery
								<br />
								Hunnie Bunny’s Special Gift
								<br />
								Hunnie Bunny’s Christmas Wish
							</span>
						</div></span
					>
				</div>
			</div>
		</div>

		<img
			class="hidden sm:flex col-span-3 max-w-[20%] animate-bounce-custom"
			src="images/mr_frog_sitting.png"
			loading="lazy"
			alt="Mr. Frog sitting"
		/>
	</div>
</section>

<style>
	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px);
		}
	}

	.animate-bounce-custom {
		animation: bounce 1s infinite steps(50);
	}

	@keyframes rotate {
		0% {
			transform: scaleX(1);
		}
		50% {
			transform: scaleX(0.98);
		}
		100% {
			transform: scaleX(1);
		}
	}

	.animate-rotate-custom {
		animation: rotate 2s ease-in-out infinite;
	}
</style>
