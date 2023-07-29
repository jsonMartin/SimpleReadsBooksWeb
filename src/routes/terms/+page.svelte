<script>
	import ButtonBack from './ButtonBack.svelte';

	import { goto } from '$app/navigation';
	import { Button, Heading } from 'flowbite-svelte';

	const pClass = 'text-sm text-gray-500 font-normal leading-normal pb-2';
</script>

<div class="m-auto max-w-2xl mt-10">
	<section class="w-full flex flex-col justify-center items-center mb-10">
		<h1 class="text-4xl font-extrabold">Terms and Conditions</h1>
		<h6 class="text-gray-500">Last updated on July 26th, 2023</h6>

		<ButtonBack />
	</section>

	<section>
		<h1 class="text-2xl font-bold pb-0.5">Acceptance of Terms</h1>
		<p class={pClass}>
			By accessing or using the Simple Reads Books website, you acknowledge that you have read,
			understood, and agree to be bound by these Terms and Conditions. If you do not agree to these
			terms, please refrain from using the website.
		</p>

		<h1 class="text-2xl font-bold pb-0.5">Intellectual Property</h1>
		<p class={pClass}>
			All content on the Simple Reads Books website, including but not limited to text, graphics,
			logos, images, and any other materials, is the intellectual property of Simple Reads Books and
			the author, Deborah C. Martin (hereinafter referred to as “author”), and is protected by
			copyright laws. You may not reproduce, distribute, modify, or use any content from the website
			without the author's prior written consent.
		</p>

		<h1 class="text-2xl font-bold pb-0.5">Use of the Website</h1>
		<p class={pClass}>
			You agree to use the Simple Reads Books website only for lawful purposes and in a manner that
			does not infringe upon the rights of others or restrict or inhibit their use and enjoyment of
			the website. You shall not engage in any activity that could harm, disable, or impair the
			website or interfere with any other party's use of the website.
		</p>

		<h1 class="text-2xl font-bold pb-0.5">User-Generated Content</h1>
		<p class={pClass}>
			You may have the opportunity to contribute content to the Simple Reads Books website, such as
			comments or reviews. By submitting any user-generated content, you grant Simple Reads Books
			and the author a non-exclusive, worldwide, royalty-free, perpetual, and irrevocable right to
			use, reproduce, modify, adapt, publish, translate, distribute, and display such content in any
			media. You represent and warrant that you have the necessary rights to grant this license and
			that your content does not infringe upon any third-party rights.
		</p>

		<h1 class="text-2xl font-bold pb-0.5">Links to Third-Party Websites</h1>
		<p class={pClass}>
			The Simple Reads Books website may contain links to third-party websites for your convenience
			and reference. The inclusion of any link does not imply endorsement or approval by Simple
			Reads Books or the author of the linked website. You acknowledge and agree that Simple Reads
			Books and the author are not responsible for the availability or accuracy of such third-party
			websites, and your use of them is at your own risk.
		</p>

		<h1 class="text-2xl font-bold pb-0.5">Limitation of Liability</h1>
		<p class={pClass}>
			In no event shall Simple Reads Books or the author be liable for any direct, indirect,
			incidental, special, or consequential damages arising out of or in connection with your use of
			the website or its content. This includes, but is not limited to, any loss or damage caused by
			viruses, bugs, errors, omissions, or inaccuracies in the content or the transmission of
			information to or from the website.
		</p>

		<h1 class="text-2xl font-bold pb-0.5">Indemnification</h1>
		<p class={pClass}>
			You agree to indemnify and hold harmless Simple Reads Books and the author and their
			affiliates, officers, directors, employees, and agents from any claim, demand, or damage,
			including reasonable attorneys' fees, arising out of or in connection with your use of the
			Simple Reads Books website, your violation of these Terms and Conditions, or your violation of
			any rights of another party.
		</p>

		<h1 class="text-2xl font-bold pb-0.5">Modifications</h1>
		<p class={pClass}>
			Simple Reads Books and the author reserve the right to modify or update these Terms and
			Conditions at any time without prior notice. Your continued use of the website after any
			changes signifies your acceptance of the modified Terms and Conditions.
		</p>

		<h1 class="text-2xl font-bold pb-0.5">Governing Law</h1>
		<p class={pClass}>
			These Terms and Conditions shall be governed by and construed in accordance with the laws of
			the State of California. Any legal action or proceeding arising out of or relating to these
			Terms and Conditions or your use of the Simple Reads Books website shall be exclusively
			brought in the courts located in Orange County, California.
		</p>

		<h1 class="text-2xl font-bold pb-0.5">Severability</h1>
		<p class={pClass}>
			If any provision of these Terms and Conditions is found to be invalid or unenforceable, the
			remaining provisions shall continue to be valid and enforceable to the fullest extent
			permitted by law.
		</p>

		<p class={pClass + ' mb-2 mt-4 text-xs'}>
			By using the Simple Reads Books website, you acknowledge that you have read, understood, and
			agree to these Terms and Conditions. If you have any questions or concerns, please contact
			<a href="mailto:debbie@simplereadsbooks.com" class="text-blue-400"
				>debbie@simplereadsbooks.com.</a
			>
		</p>
	</section>
</div>
