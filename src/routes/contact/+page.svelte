<script lang="ts">
	import { Button, Input, Label, Modal, Textarea } from 'flowbite-svelte';
	import { CheckSolid, PenSolid } from 'flowbite-svelte-icons';

	const WEB3_FORM_PUBLIC_ACCESS_KEY = '7915d9f2-0f8d-4606-be62-fb349ea54199';
	const WEB3_FORM_URL = 'https://api.web3forms.com/submit';

	const form = {
		email: '',
		subject: '',
		message: ''
	};

	const isValidEmail = (email) => {
		const re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;

		return re.test(String(email).toLowerCase());
	};

	let confirmModal = false;

	$: isEmailValid = isValidEmail(form.email);
	$: isSubjectValid = form.subject.length > 3;
	$: isMessageValid = form.message.length > 5;
	$: isFormValid = isEmailValid && isSubjectValid && isMessageValid;

	function resetForm() {
		form.email = '';
		form.subject = '';
		form.message = '';
	}

	function handleSubmit(e: Event) {
		const json = JSON.stringify({
			access_key: WEB3_FORM_PUBLIC_ACCESS_KEY,
			...form
		});

		fetch(WEB3_FORM_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: json
		})
			.then((response: any) => {
				if (response.status >= 400) {
					alert(`Error sending form... \n\n[${response.status}] ${response.statusText}`);
					return;
				}

				console.log('Form successfully submitted');
				console.log(response);
				resetForm();
				confirmModal = true;
			})
			.catch((error) => {
				console.error(JSON.stringify(error));
				alert('Unknown error encounted submitting form');
			});
	}
</script>

<Modal bind:open={confirmModal} size="xs" autoclose>
	<div class="text-center">
		<CheckSolid class="mx-auto mb-4 w-14 h-14 text-green-600 dark:text-green-400" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Your message has been sent successfully.
			<br /><br />
			We will get back to you soon 😊
		</h3>
		<Button color="green" class="mr-2">OK</Button>
	</div>
</Modal>

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
		<h2
			class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
		>
			Contact Us
		</h2>
		<p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
			Have any questions or comments? Let me know how we can help.
		</p>

		<form
			id="contact-form"
			name="contact"
			method="POST"
			class="space-y-8"
			on:submit|preventDefault={(e) => handleSubmit(e)}
		>
			<div>
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Your email</label
				>
				<Label class="space-y-2">
					<Input
						type="email"
						name="email"
						placeholder="yourname@gmail.com"
						size="md"
						color={form.email.length === 0 ? 'base' : isEmailValid ? 'green' : 'red'}
						bind:value={form.email}
					>
						<svg
							slot="left"
							aria-hidden="true"
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
							/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg
						>
					</Input>
				</Label>
			</div>
			<div>
				<label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Subject</label
				>
				<Label class="space-y-2">
					<Input
						type="text"
						name="subject"
						placeholder="Subject"
						size="md"
						color={form.subject.length === 0 ? 'base' : isSubjectValid ? 'green' : 'red'}
						bind:value={form.subject}
					>
						<PenSolid slot="left" class="w-5 h-5" />
					</Input>
				</Label>
			</div>
			<div class="sm:col-span-2">
				<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
					>Your message</label
				>
				<Textarea
					type="text"
					name="message"
					id="message"
					rows="6"
					placeholder="Leave a comment..."
					bind:value={form.message}
				/>
			</div>
			<button
				type="submit"
				class={'py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' +
					' ' +
					(!isFormValid && 'opacity-40')}
				color="primary"
				disabled={!isFormValid}>Send message</button
			>
		</form>
	</div>
</section>
