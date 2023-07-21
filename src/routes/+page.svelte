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

<Navbar let:hidden let:toggle rounded color="form">
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

<img src="/images/banner.png" width="100%" alt="Simple Reads Books Banner" />

<div class="p-10">
	<h1>Test UI Components</h1>

	<hr />
	<br />

	<Button on:click={() => (defaultModal = true)} class="mb-5">Default modal</Button>

	<Modal title="Terms of Service" bind:open={defaultModal} autoclose>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			With less than a month to go before the European Union enacts new consumer privacy laws for
			its citizens, companies around the world are updating their terms of service agreements to
			comply.
		</p>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25
			and is meant to ensure a common set of data rights in the European Union. It requires
			organizations to notify users as soon as possible of high-risk data breaches that could
			personally affect them.
		</p>
		<svelte:fragment slot="footer">
			<Button on:click={() => alert('Handle "success"')}>I accept</Button>
			<Button color="alternative">Decline</Button>
		</svelte:fragment>
	</Modal>

	<Footer footerType="logo" class="bg-purple-300">
		<div class="sm:flex sm:items-center sm:justify-between">
			<FooterBrand
				href="https://flowbite.com"
				src="https://flowbite.com/docs/images/logo.svg"
				alt="Flowbite Logo"
				name="Simple Reads Books"
			/>
			<FooterLinkGroup
				ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
			>
				<FooterLink href="/">About</FooterLink>
				<FooterLink href="/">Privacy Policy</FooterLink>
				<FooterLink href="/">Licensing</FooterLink>
				<FooterLink href="/">Contact</FooterLink>
			</FooterLinkGroup>
		</div>
		<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
		<FooterCopyright href="/" by="Flowbite™" />
	</Footer>
</div>
