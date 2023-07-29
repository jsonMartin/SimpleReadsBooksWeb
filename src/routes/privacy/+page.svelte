<script>
	const h2Class = 'text-gray-900 text-2xl font-bold';
	const h3Class = 'text-gray-900 text-xl font-semibold pb-0.5 leading-normal';
	const pClass = 'text-gray-500 text-sm font-normal leading-normal';

	import { goto } from '$app/navigation';
	import { Button } from 'flowbite-svelte';
	import ButtonBack from '../terms/ButtonBack.svelte';
</script>

<div class="max-w-2xl m-auto mb-5">
	<section class="w-full flex flex-col justify-center items-center my-10">
		<h1 class="text-4xl font-extrabold">Privacy Policy</h1>
		<h6 class="text-gray-500">Last updated on July 26th, 2023</h6>

		<ButtonBack />
	</section>

	<p class="font-normal text-gray-900 pb-5">
		At <a href="simplereadsbooks.com" class="text-blue-400">simplereadsbooks.com</a>, we take your
		privacy seriously. This Privacy Policy outlines the types of personal information we collect
		from visitors to our website and how we use, disclose, and protect that information.
		<br /><br />
		By accessing or using simplereadsbooks.com, you consent to the collection, use, and disclosure of
		your personal information in accordance with this policy.
	</p>

	<div class="p-1">
		<h2 class={h2Class}>1. Information We Collect</h2>
		<div class="pb-2">
			<div class="pl-5">
				<h3 class={h3Class}>1.1 Personal Information</h3>
				<p class={pClass}>
					We may collect certain personally identifiable information, such as your name, email
					address, and any additional information you voluntarily provide to us through contact
					forms or subscription forms.
				</p>

				<h3 class={h3Class}>1.2 Log Files</h3>
				<p class={pClass}>
					Like many other websites, we automatically gather certain non-personal information about
					your visit. This information may include your IP address, browser type, operating system,
					referring website, pages visited, and the date and time of your visit. This data is used
					to analyze trends, administer the site, and track user engagement, but it does not
					personally identify you.
				</p>
			</div>
		</div>
	</div>

	<div class="p-1">
		<h2 class={h2Class}>2. Use of Collected Information</h2>
		<div class="pb-2">
			<div class="pl-5">
				<h3 class={h3Class}>2.1 Personal Information</h3>
				<p class={pClass}>
					We may use your personal information to respond to your inquiries, provide the services
					you request, and communicate with you about our website, products, and services. We may
					also use this information to send you promotional materials or newsletters, but you will
					always have the option to opt-out of receiving such communications.
				</p>

				<h3 class={h3Class}>2.2 Log Files</h3>
				<p class={pClass}>
					The non-personal information collected is used to improve our website's content and
					functionality, enhance user experience, and analyze user trends. It may also be used for
					troubleshooting purposes and to ensure the security and integrity of our website.
				</p>
			</div>
		</div>
	</div>

	<div class="p-1">
		<h2 class={h2Class}>3. Sharing of Collected Information</h2>
		<div class="pb-2">
			<div class="pl-5">
				<h3 class={h3Class}>3.1 Third-Party Service Providers</h3>
				<p class={pClass}>
					We may share your personal information with third-party service providers who assist us in
					operating our website, conducting our business, or providing services to you. These
					service providers have access to your personal information only as necessary to perform
					their functions and are obligated to protect its confidentiality.
				</p>

				<h3 class={h3Class}>3.2 Legal Requirements</h3>
				<p class={pClass}>
					We may disclose your personal information if required to do so by law or if we believe
					that such action is necessary to comply with legal obligations, protect and defend our
					rights or property, prevent fraud, or ensure the safety of our users.
				</p>
			</div>
		</div>
	</div>

	<div class="p-1">
		<h2 class={h2Class}>4. Security</h2>
		<p class={pClass}>
			We implement reasonable security measures to protect your personal information from
			unauthorized access, disclosure, alteration, or destruction. However, no data transmission
			over the internet or electronic storage method is 100% secure, and we cannot guarantee
			absolute security.
		</p>
	</div>

	<div class="p-1">
		<h2 class={h2Class}>5. External Links</h2>
		<p class={pClass}>
			Our website may contain links to third-party websites. We have no control over the content,
			privacy practices, or security of these websites. Therefore, we encourage you to review the
			privacy policies of any third-party sites you visit.
		</p>
	</div>

	<div class="p-1">
		<h2 class={h2Class}>6. Children's Privacy</h2>
		<p class={pClass}>
			Our website is not intended for individuals under the age of 13. We do not knowingly collect
			personal information from children. If you are a parent or guardian and believe that your
			child has provided us with personal information, please contact us, and we will promptly
			remove that information from our records.
		</p>
	</div>

	<div class="p-1">
		<h2 class={h2Class}>7. Changes to the Privacy Policy</h2>
		<p class={pClass}>
			We reserve the right to modify or update this Privacy Policy at any time. Any changes will be
			effective immediately upon posting the revised policy on our website. We encourage you to
			review this policy periodically for any updates.
		</p>
	</div>

	<div class="p-1">
		<h2 class={h2Class}>8. Contact Us</h2>
		<p class={pClass}>
			If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy
			practices, please contact us at <a
				href="mailto:debbie@simplereadsbooks.com"
				class="text-blue-400">debbie@simplereadsbooks.com</a
			>.
		</p>
	</div>
</div>
