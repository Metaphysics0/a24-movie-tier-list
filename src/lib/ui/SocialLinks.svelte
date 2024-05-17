<script lang="ts">
	import Icon from '@iconify/svelte';

	const LINKS: ISocialLink[] = [
		{
			name: 'github',
			href: 'https://github.com/Metaphysics0/a24-movies',
			icon: 'mdi:github'
		}
	];

	interface ISocialLink {
		name?: string;
		href: string;
		icon: any;
	}
</script>

<section class="mx-auto flex h-max w-fit items-center">
	{#each LINKS as link}
		<a
			href={link.href}
			target="_blank"
			rel="noreferrer"
			class="mx-3 h-full opacity-50 transition ease-in-out hover:opacity-100"
		>
			<Icon icon={link.icon} height="35" />
		</a>
	{/each}
</section>
