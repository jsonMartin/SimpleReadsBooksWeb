<script>
	import { goto } from '$app/navigation';
	import ButtonAmazon from '../../lib/components/ButtonAmazon.svelte';

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
		Input,
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterBrand,
		FooterLink,
		FooterIcon
	} from 'flowbite-svelte';

	import { CldImage } from 'svelte-cloudinary';
</script>

<svelte:head>
	<title>Welcome to Simple Reads Books</title>
</svelte:head>

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
		<div
			class="p-4 md:basis-7/12"
			role="button"
			tabindex="0"
			on:keypress={(e) => {
				if (e.key === 'Enter') {
					goto('/products/hunnie-bunnys-garden');
				}
			}}
			on:click={() => goto('/products/hunnie-bunnys-garden')}
		>
			<a href="/products/hunnie-bunnys-garden">
				<CldImage
					width={1616}
					height="100%"
					aspectRatio={1413 / 983}
					class="rounded-lg w-full"
					src="hunnie-bunnys-garden-table"
					alt="book mockup cover"
					quality={75}
					loading="eager"
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
			</a>
		</div>

		<div class="p-4 basis-full md:basis-5/12 flex flex-col justify-start items-center">
			<div
				class="md:mt-[70px] xl:mt-[90px] text-center text-black text-xl lg:text-2xl xl:text-3xl font-normal mb-10 md:mb-20"
			>
				<div
					class="text-center text-black text-3xl lg:text-4xl xl:text-5xl font-normal mb-2 underline"
				>
					Hunnie Bunny's Garden
				</div>
				<mark class="px-2 bg-[#B9D6B8] rounded">Available Now</mark>
			</div>

			<ButtonAmazon />

			<CldImage
				width={1420}
				height="100%"
				aspectRatio={2100 / 1500}
				style="scale:1.25"
				src="hunnie-bunny-reading-book"
				alt="hunnie bunny reading"
				class="mt-16"
			/>
		</div>
	</div>
</section>

<section class="w-full font-[Itim]">
	<div
		class="bg-[rgba(0,102,204,0.44)] p-2.5 flex flex-row items-center justify-between w-full relative"
	>
		<CldImage
			width={472}
			height="100%"
			aspectRatio={2100 / 1500}
			class="hidden sm:flex col-span-3 !max-w-[20%] !h-fit   animate-[rotateSlow_1s_ease-in_infinite]"
			src="mr-squirrel-sitting"
			alt="Mr. Frog sitting"
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

		<CldImage
			width={382}
			height="100%"
			aspectRatio={252 / 191}
			class="hidden sm:flex col-span-3 !max-w-[20%] !h-fit animate-[bouncefrog_1s_ease-in_infinite]"
			src="mr-frog-sitting"
			alt="Mr. Frog sitting"
		/>
	</div>
</section>

<style>
</style>
