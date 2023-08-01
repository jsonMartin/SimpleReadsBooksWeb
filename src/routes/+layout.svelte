<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Modal,
		ButtonGroup,
		Input,
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterBrand,
		FooterLink,
		FooterIcon
	} from 'flowbite-svelte';
	import { CldImage } from 'svelte-cloudinary';
	import { MAX_PAGE_WIDTH } from '$lib/style';

	let defaultModal = false;

	// Hide allow overflow from the banner to overlap other parts of the page.
	const OVERFLOW_ANIMATION_TIME = 2000;
	let hideOverflow = true;
	setTimeout(() => {
		hideOverflow = false;
	}, OVERFLOW_ANIMATION_TIME);

	$: headerClass = hideOverflow
		? 'w-full relative overflow-hidden relative'
		: 'w-full relative overflow-visible relative';
</script>

<svelte:head>
	<meta
		name="description"
		content="bunny garden animals nature squirrel frog vegetables woods spring summer children books picture book"
	/>
	<meta
		property="og:title"
		content="bunny garden animals nature squirrel frog vegetables woods spring summer children books picture book"
	/>
	<meta property="og:description" content="Simple Reads Books and Hunnie Bunny's Garden" />
	<meta
		property="og:image"
		content="https://res.cloudinary.com/simple-reads-books/image/upload/c_limit,w_2880/f_auto/q_auto/banner?_a=BBEHUxAE0"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="My Page Title" />
	<meta name="twitter:description" content="This is a description of my page for SEO purposes." />
	<meta
		name="twitter:image"
		content="https://res.cloudinary.com/simple-reads-books/image/upload/c_limit,w_2880/f_auto/q_auto/banner?_a=BBEHUxAE0"
	/>

	<!-- Google Analytics -->
	<!--
		<script async src="https://www.googletagmanager.com/gtag/js?id="></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-9YTEE5C1YT');
	</script>
	-->
</svelte:head>

<div id="page-container">
	<div id="header-container" class="m-auto max-w-screen-xl w-full overflow-hidden">
		<!-- Use visibility:hidden instead of conditionally rendering -->
		<!-- This is to prevent the animation from firing unnecessarily -->
		<!-- TODO: Extract this to component-->
		<header class={headerClass} style={$page.error && 'visibility: hidden; height: 0'}>
			<Navbar
				let:hidden
				let:toggle
				color="form"
				navClass="w-full md:absolute md:bg-transparent bg-[#FF5A1F] text-white p-3"
				navDivClass="mx-auto flex flex-wrap justify-between items-center max-w-screen-xl animate-flipInX"
				class="max-w-screen-xl"
			>
				<NavBrand href="/">
					<div class="md:hidden flex flex-row justify-center items-center min-w-min">
						<CldImage
							width={128}
							height="fit-content"
							aspectRatio={1750 / 1424}
							src="logo"
							class="mr-3 h-6 sm:h-9"
							alt="logo"
						/>

						<span
							class="self-center whitespace-nowrap sm dark:text-white font-[Itim] text-md sm:text-lg"
						>
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
					<NavLi
						href="/home"
						active={$page.url.pathname.includes('home') || $page.url.pathname === '/'}
						nonActiveClass="md:hover:transform md:hover:scale-125 md:text-white md:font-bold"
						activeClass="bg-primary-500 md:hover:transform md:hover:scale-125 text-white md:bg-transparent md:font-extrabold md:underline"
					>
						<span>Welcome</span>
					</NavLi>
					<NavLi
						href="/about"
						active={$page.url.pathname.includes('about')}
						class="hover:font-bolder"
						nonActiveClass="md:hover:transform md:hover:scale-125 md:text-white md:font-bold"
						activeClass="bg-primary-500 md:hover:transform md:hover:scale-125 text-white md:bg-transparent md:font-extrabold md:underline"
					>
						<span>About</span>
					</NavLi>

					<NavLi
						href="/products"
						active={$page.url.pathname.includes('products')}
						nonActiveClass="md:hover:transform md:hover:scale-125 md:text-white md:font-bold"
						activeClass="bg-primary-500 md:hover:transform md:hover:scale-125 text-white md:bg-transparent md:font-extrabold md:underline"
					>
						<span>Books & Products</span>
					</NavLi>

					<NavLi
						href="/contact"
						nonActiveClass="md:hover:transform md:hover:scale-125 md:text-white md:font-bold"
						activeClass="bg-primary-500 md:hover:transform md:hover:scale-125 text-white md:bg-transparent md:font-extrabold md:underline"
					>
						<span>Contact</span>
					</NavLi>
				</NavUl>
			</Navbar>

			<CldImage
				src="banner"
				width={MAX_PAGE_WIDTH * 2}
				aspectRatio={338 / 100}
				height="100%"
				alt="Simple Reads Books Banner"
				sizes="100vw"
				class="max-w-screen-2xl m-auto"
			/>

			<CldImage
				src="hunnie-bunnie-peering-over"
				width={450}
				aspectRatio={7 / 5}
				height="100%"
				alt="Hunnie Bunny Peering Over"
				class="absolute bottom-[-9px] right-[-5px] sm:bottom-[-12px] md:bottom-[-22px] md:right-[-10px] lg:bottom-[-22px] lg:right-[-5px] h-16 sm:h-20 md:h-40 lg:h-40 animate-slideUp !w-fit"
			/>

			<CldImage
				src="hunnie-bunnie-reading"
				width={450}
				aspectRatio={7 / 5}
				height="100%"
				alt="Hunnie Bunny Reading"
				class="absolute hidden sm:block sm:left-[-4%] md:left-[-3%] left-[-4%] bottom-[0px] rotate-3 sm:h-[100px] md:h-[140px] h-[80px] animate-slideInFromLeft !w-fit"
			/>
		</header>

		{#if $page.error}
			<slot />
		{:else}
			<main>
				<slot />
			</main>

			<Footer footerType="socialmedia" class="bg-[#420063]">
				<div class="m-auto max-w-screen-xl">
					<div
						class="grid grid-flow-row grid-cols-12 sm:items-center sm:justify-between gap-4 mb-2"
					>
						<FooterBrand
							href="/"
							src="https://res.cloudinary.com/simple-reads-books/image/upload/w_128,f_webp,q_auto/SRBooksLogo_uyvnpj.png"
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
							<FooterLink href="/terms">Terms & Conditions</FooterLink>
							<FooterLink href="/privacy">Privacy Policy</FooterLink>
							<FooterLink href="/" aClass="hidden">Reviews</FooterLink>
						</FooterLinkGroup>

						<div class="w-full rounded-xl col-start-1 md:col-start-10 col-end-13">
							<p class="text-white text-xs pb-1 bg-transparent">Subscribe for e-mail updates!</p>

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
									>
										<path
											d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
										/>
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
									</svg>
								</Input>

								<Button color="primary" size="xs" on:click={() => (defaultModal = true)}
									>Subscribe
								</Button>
							</ButtonGroup>
						</div>
					</div>

					<!-- TODO: Footer copyright defaults to current year (server writes this) -->
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
							<FooterIcon
								href="https://facebook.com/deborah.martin.3154"
								target="_blank"
								class="text-white"
							>
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path
										fill-rule="evenodd"
										d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
										clip-rule="evenodd"
									/>
								</svg>
							</FooterIcon>
							<FooterIcon
								href="https://instagram.com/debbiemartin064"
								target="_blank"
								class="text-white"
							>
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path
										fill-rule="evenodd"
										d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
										clip-rule="evenodd"
									/>
								</svg>
							</FooterIcon>
							<FooterIcon
								href="https://twitter.com/DeborahCMartin"
								target="_blank"
								class="text-white"
							>
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path
										d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
									/>
								</svg>
							</FooterIcon>
						</div>
					</div>
				</div>
			</Footer>
		{/if}
	</div>

	<Modal title="E-mail not ready yet" bind:open={defaultModal} autoclose>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			E-mail subscription not ready yet
		</p>
	</Modal>
</div>
