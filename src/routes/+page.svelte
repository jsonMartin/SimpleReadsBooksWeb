<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Modal } from 'flowbite-svelte';
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
			class="w-full py-10 md:py-20 px-4 md:px-5 bg-green-600 bg-opacity-40 flex-col justify-start items-center inline-flex"
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

		<section>
			<div class="flex flex-row flex-wrap">
				<!-- <div class="p-4 basis-7/12 md:basis-full"> -->
				<div class="p-4 md:basis-7/12">
					<img
						class="rounded-lg w-full"
						src="images/hunnie-bunnys-garden-mockup.png"
						alt="book mockup cover"
					/>
					<div class="self-stretch text-center text-gray-900 lg:text-2xl text-xl font-normal p-3">
						<p class="mb-2">
							Hunnie Bunny’s Garden is a delightful blend of entertainment and education that
							provides endless opportunities for learning and discovery.
						</p>
						<p class="mb-2">
							This charming story is a wonderful testament to the beauty of nature and the joy that
							gardening can bring.
						</p>
						<p class="font-medium pt-3">Add Hunnie Bunny’s Garden to your child’s library today!</p>
					</div>
				</div>

				<div class="p-4 basis-full md:basis-5/12 flex flex-col justify-start items-center">
					<div
						class="md:mt-[70px] xl:mt-[90px] text-center text-black text-xl lg:text-2xl xl:text-3xl font-normal"
					>
						Release Date <span class="font-medium">August 1, 2023</span>
					</div>

					<Button color="primary" size="xl" class="mt-10">
						Buy on Amazon &nbsp;

						<svg
							aria-hidden="true"
							class="mr-2 ml-1 w-6 h-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
							/></svg
						>
					</Button>
					<img style="scale:1.25" src="/images/hunnie-bunny-reading-book.png" class="mt-10" />
				</div>
			</div>
		</section>
	</main>
</div>

<Footer footerType="socialmedia" class="bg-[#420063] w-[100vw]">
	<div style="max-width: 1280px" class="m-auto">
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
