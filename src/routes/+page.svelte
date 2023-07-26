<script>
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

	let defaultModal = false;
</script>

<div class="m-auto max-w-screen-xl w-full">
	<header class="w-full relative">
		<Navbar
			let:hidden
			let:toggle
			color="form"
			navClass="w-full md:absolute md:bg-transparent p-3"
			navDivClass="mx-auto flex flex-wrap justify-between items-center max-w-screen-xl animate-flipInX"
			class="max-w-screen-xl"
		>
			<NavBrand href="/">
				<div class="md:hidden flex flex-row justify-center items-center min-w-min">
					<img src="images/logo.png" class="mr-3 h-6 sm:h-9" alt="logo" />
					<span class="self-center whitespace-nowrap sm dark:text-white font-[Itim]">
						Simple Reads Books
					</span>
				</div>
			</NavBrand>

			<NavHamburger on:click={() => toggle()} />

			<NavUl
				{hidden}
				nonActiveClass="md:text-white md:font-bold"
				activeClass="font-extrabold text-white underline bg-green-400 md:bg-transparent"
				ulClass="flex flex-col p-3 mt-3 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium bg-gray-100 md:bg-transparent"
				divClass="w-full md:block md:w-auto md:bg-black md:bg-opacity-[.15] md:rounded-full md:mr-2 md:mt-2 md:[transform:perspective(250px)_translateZ(0)_rotateX(5deg)]"
				color="green"
			>
				<NavLi href="/" active={true}>Welcome</NavLi>
				<NavLi href="/about">About</NavLi>
				<NavLi href="/services">Products</NavLi>
				<NavLi href="/pricing">Books</NavLi>
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
			class="w-full py-10 md:py-20 px-4 md:px-5 bg-[#009933] bg-opacity-40 flex-col justify-start items-center inline-flex font-[Itim]"
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

		<section class="w-full font-[Itim]">
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
					alt="Mr. Frog sitting"
				/>
			</div>
		</section>
	</main>

	<Footer footerType="socialmedia" class="bg-[#420063]">
		<div class="m-auto max-w-screen-xl">
			<div class="grid grid-flow-row grid-cols-12 sm:items-center sm:justify-between gap-4 mb-2">
				<FooterBrand
					href="/"
					src="images/logo.png"
					alt="Simple Reads Books"
					name="Simple Reads Books"
					class="text-white"
					spanClass="text-white text-md md:text-xl font-[Itim] whitespace-nowrap hidden sm:block"
					imgClass="h-10 pr-3"
					aClass="flex flex-row items-center min-w-[fit-content] mr-3 col-span-3 hidden sm:flex"
				/>

				<FooterLinkGroup
					ulClass="flex flex-wrap items-center mb-6 text-xs sm:text-sm lg:text-base text-white sm:mb-0 dark:text-gray-400 min-w-[fit-content] justify-center sm:justify-end md:justify-center col-start-1 sm:col-start-4 col-end-13 md:col-end-10 h-full"
				>
					<FooterLink href="/">Terms & Conditions</FooterLink>
					<FooterLink href="/">Privacy Policy</FooterLink>
					<FooterLink href="/">Reviews</FooterLink>
				</FooterLinkGroup>

				<div class="w-full rounded-xl col-start-1 md:col-start-10 col-end-13">
					<p class="text-white text-xs pb-1 bg-transparent">Subscribe to our e-mail list!</p>

					<ButtonGroup class="rounded-none w-full">
						<Input
							type="email"
							placeholder="name@gmail.com"
							size="sm"
							class="!rounded-none !rounded-tl !rounded-bl"
						>
							<svg
								slot="left"
								aria-hidden="true"
								class="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
								/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg
							>
						</Input>

						<Button color="primary" size="xs">Subscribe</Button>
					</ButtonGroup>
				</div>
			</div>

			<!-- TODO: Footer copyright defaults to current year (server writes this) -->
			<!-- <FooterCopyright href="/" by="Simple Reads Books, Inc." spanClass="text-gray-200 text-xs" /> -->

			<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
			<div
				class="flex flex-col sm:flex-row items-center justify-center sm:items-center sm:justify-between"
			>
				<FooterCopyright
					href="/"
					by="Simple Reads Books, Inc."
					spanClass="text-xs text-white italic"
				/>
				<div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0 text-white">
					<FooterIcon href="/" class="text-white">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"
							><path
								fill-rule="evenodd"
								d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
								clip-rule="evenodd"
							/></svg
						>
					</FooterIcon>
					<FooterIcon href="/" class="text-white">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"
							><path
								fill-rule="evenodd"
								d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
								clip-rule="evenodd"
							/></svg
						>
					</FooterIcon>
					<FooterIcon href="/" class="text-white">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"
							><path
								d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
							/></svg
						>
					</FooterIcon>
					<FooterIcon href="/" class="text-white">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"
							><path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clip-rule="evenodd"
							/></svg
						>
					</FooterIcon>
				</div>
			</div>
		</div>
	</Footer>
</div>

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
