<script>
	import SearchIcon from '../icons/SearchIcon.svelte';
	import UserIcon from '../icons/UserIcon.svelte';
	import Logo from './Logo.svelte';

	const links = ['Home', 'Holidays', 'Destinations', 'Flights', 'Offers', 'Contacts'];
</script>

<header>
	<nav>
		<Logo />
		<h4>GLOBE EXPRESS</h4>
	</nav>

	<div class="nav-container">
		<nav>
			{#each links as link}
				<p>
					{link}
				</p>
			{/each}
		</nav>

		<div class="menu-container">
			<SearchIcon />
			<UserIcon />
		</div>
	</div>
</header>

<style>
	header {
		width: 100%;
		padding: 1rem 2rem;
		position: absolute;
		z-index: 100;
		display: flex;
		gap: 0.5rem;
		align-items: center;
		justify-content: space-between;
		color: white;
		background: rgba(0, 0, 0, 0.001);
		backdrop-filter: blur(4px);
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1rem;
		text-transform: uppercase;
	}

	.nav-container {
		display: flex;
		align-items: center;
		gap: 3rem;
	}

	.menu-container {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
