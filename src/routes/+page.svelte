<script>
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Modal,
		Badge
	} from 'flowbite-svelte';
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterBrand,
		FooterLink
	} from 'flowbite-svelte';

	let defaultModal = false;
</script>

<div class="max-w-screen-xl m-auto">
	<header>
		<Navbar let:hidden let:toggle color="form" style="display:none;">
			<NavBrand href="/">
				<img
					src="https://flowbite.com/docs/images/logo.svg"
					class="mr-3 h-6 sm:h-9"
					alt="Flowbite Logo"
				/>
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					Simple Reads Books
				</span>
			</NavBrand>
			<NavHamburger on:click={toggle} />
			<NavUl {hidden}>
				<NavLi href="/" active={true}>Home</NavLi>
				<NavLi href="/about">About</NavLi>
				<NavLi href="/services">Services</NavLi>
				<NavLi href="/pricing">Pricing</NavLi>
				<NavLi href="/contact">Contact</NavLi>
			</NavUl>
		</Navbar>

		<img
			class="max-w-screen-2xl m-auto"
			src="/images/banner.png"
			width="100%"
			alt="Simple Reads Books Banner"
			loading="lazy"
			style="aspect-ratio:288/85"
		/>
	</header>

	<main>
		<section
			class="w-full py-10 md:py-20 px-4 md:px-5 bg-[#009933] bg-opacity-40 flex-col justify-start items-center inline-flex"
		>
			<div class="justify-start items-center inline-flex">
				<div class="self-stretch justify-between items-start gap-2.5 inline-flex">
					<div
						class="text-center text-gray-900 lg:text-4xl xs:text-normal sm:text-2xl md:text-3xl font-normal md:px-10"
					>
						Simple Reads Books encourages children to explore nature through entertaining stories
						filled with colorful illustrations
					</div>
				</div>
			</div>
		</section>

		<!-- TODO: Refactor into component -->
		<section>
			<div class="flex flex-row flex-wrap">
				<!-- <div class="p-4 basis-7/12 md:basis-full"> -->
				<div class="p-4 md:basis-7/12">
					<img
						class="rounded-lg w-full"
						src="images/hunnie-bunnys-garden-mockup.png"
						alt="book mockup cover"
					/>
					<div class="self-stretch text-center text-gray-900 md:text-xl lg:text-2xl text-xl p-3">
						<p class="mb-2">
							Hunnie Bunny’s Garden is a delightful blend of entertainment and education that
							provides endless opportunities for learning and discovery.
						</p>
						<p class="mb-2">
							This charming story is a wonderful testament to the beauty of nature and the joy that
							gardening can bring.
						</p>
						<p class="pt-3 text-shadow-black-sm">
							Add Hunnie Bunny’s Garden to your child’s library today!
						</p>
					</div>
				</div>

				<div class="p-4 basis-full md:basis-5/12 flex flex-col justify-start items-center">
					<div
						class="md:mt-[70px] xl:mt-[90px] text-center text-black text-xl lg:text-2xl xl:text-3xl font-normal"
					>
						Release Date <span class="font-medium text-shadow">August 1, 2023</span>
					</div>

					<Button disabled color="primary" size="xl" class="mt-10">
						<svg
							class="mr-3"
							style="color: white"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 512 512"
							><title>ionicons-v5_logos</title>
							<path
								d="M48.48,378.73a300.52,300.52,0,0,0,152.89,95.92,262.57,262.57,0,0,0,159.3-17.25,225.52,225.52,0,0,0,66.79-47,6.36,6.36,0,0,0-2-8.53,11.76,11.76,0,0,0-8-.05,401.92,401.92,0,0,1-116.55,39.34,358.13,358.13,0,0,1-127.29-8.83,446.73,446.73,0,0,1-119.1-60.49,5,5,0,0,0-6.06,6.9Z"
								fill="white"
							/>
							<path
								d="M387.15,388.44a168.11,168.11,0,0,1,48.94-2.23l.67.13a10,10,0,0,1,7.37,12.05A204.71,204.71,0,0,1,429,444.47a2.55,2.55,0,0,0,1.66,3.18,2.51,2.51,0,0,0,2.23-.37A83.31,83.31,0,0,0,464,382.86a12.44,12.44,0,0,0-10.22-13.22A95.75,95.75,0,0,0,384.91,384a2.55,2.55,0,0,0-.57,3.55A2.52,2.52,0,0,0,387.15,388.44Z"
								fill="white"
							/>
							<path
								d="M304.24,324.92a164,164,0,0,1-28.92,25.3A135.16,135.16,0,0,1,208.63,369a99.49,99.49,0,0,1-57.49-19.85,97.25,97.25,0,0,1-27.36-100.28,112.35,112.35,0,0,1,65.3-69.06,367.67,367.67,0,0,1,104.7-15.55V127A37.82,37.82,0,0,0,261,94.72a59.9,59.9,0,0,0-31.17,4.08,48.89,48.89,0,0,0-27.13,34.67,12,12,0,0,1-12.58,6.72l-50.9-4.5a11.38,11.38,0,0,1-8.38-10.16,103.66,103.66,0,0,1,36.61-63.45A143.86,143.86,0,0,1,257.85,32a146.24,146.24,0,0,1,84.27,27.67,86.82,86.82,0,0,1,30.7,70.22V258.8a84.46,84.46,0,0,0,8,31.28l15.87,23.23a13,13,0,0,1,0,11.23L349.7,364.25a12.5,12.5,0,0,1-12.68-.44A244.84,244.84,0,0,1,304.24,324.92Zm-10.6-116.83a257.68,257.68,0,0,0-44,2.89A63,63,0,0,0,208,242.54a63,63,0,0,0,3.07,54,40.6,40.6,0,0,0,47.11,12.19,78.61,78.61,0,0,0,35.46-55.58V208.09"
								fill="white"
							/>
						</svg>
						Buy on Amazon &nbsp;

						<svg
							aria-hidden="true"
							class="mr-2 ml-1 w-6 h-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
							/>
						</svg>
					</Button>
					<img style="scale:1.25" src="/images/hunnie-bunny-reading-book.png" class="mt-10" />
				</div>
			</div>
		</section>

		<section class="w-full">
			<div
				class="bg-[rgba(0,102,204,0.44)] p-2.5 flex flex-row items-center justify-between w-full relative"
			>
				<img
					class="hidden sm:flex col-span-3 max-w-[20%] animate-bounce-custom"
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
					class="hidden sm:flex col-span-3 max-w-[20%] animate-rotate-custom"
					src="images/mr_frog_sitting.png"
					loading="lazy"
				/>
			</div>

			<!--				<img class="w-[191px] h-[170px] left-[1210px] top-[47px] absolute" src="https://via.placeholder.com/191x170" />-->
			<!--				<img class="w-[252px] h-[190px] left-[257px] top-[27px] absolute origin-top-left rotate-180" src="https://via.placeholder.com/252x190" />-->
		</section>
	</main>
</div>

<Footer footerType="socialmedia" class="bg-[#420063]">
	<div class="m-auto max-w-screen-xl">
		<div class="sm:flex sm:items-center sm:justify-between">
			<FooterBrand
				href="https://flowbite.com"
				src="https://flowbite.com/docs/images/logo.svg"
				alt="Flowbite Logo"
				name="Simple Reads Books"
				style="filter:invert(1)"
			/>
			<FooterLinkGroup
				ulClass="flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0 dark:text-gray-400"
			>
				<FooterLink href="/">Terms & Conditions</FooterLink>
				<FooterLink href="/">Privacy Policy</FooterLink>
				<FooterLink href="/">Reviews</FooterLink>
			</FooterLinkGroup>
		</div>
		<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

		<!-- TODO: Footer copyright defualts to current year (server writes this) -->
		<FooterCopyright href="/" by="Simple Reads Books, Inc." spanClass="text-white text-sm" />
	</div>
</Footer>

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
			transform: scaleX(0.95);
		}
		100% {
			transform: scaleX(1);
		}
	}

	.animate-rotate-custom {
		animation: rotate 2s ease-in-out infinite;
	}
</style>
