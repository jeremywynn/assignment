<template>
	<header class="app-header">
		<div class="logo">
			<a href="">
				<img src="~/assets/images/gfinity-logo-neg.svg" alt="" />
			</a>
			<transition name="fade" mode="out-in">
				<div v-if="playerStatus !== 'initial'" class="tab">
					<div class="back" @click="goBack">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 22 10"
						>
							<path d="M6 0L0 5l6 5V6h16V4H6z" />
						</svg>
					</div>
				</div>
			</transition>
		</div>
		<div class="menu-area">
			<div class="game-title">FIFA 19</div>
			<div class="menu-trigger"></div>
		</div>
	</header>
</template>

<script>
export default {
	computed: {
		playerStatus() {
			return this.$store.state.status
		}
	},
	methods: {
		goBack() {
			localStorage.setItem('status', 'initial')
			this.$store.dispatch('editStatus', 'initial')
		}
	}
}
</script>

<style lang="scss">
.app-header {
	display: grid;
	grid-template-columns: auto 1fr;
	position: relative;
	z-index: 2;
	width: 100%;
}
.logo {
	background-color: var(--darkGray);
	padding: 2.85rem 1rem;
	position: relative;
	z-index: 2;
	img {
		display: block;
		height: 14px;
		width: 73px;
	}
}
.tab {
	align-items: center;
	background-color: var(--darkGray);
	display: flex;
	height: 100%;
	justify-content: center;
	left: 0;
	position: absolute;
	top: 100%;
	width: 100%;
	.back {
		cursor: pointer;
		svg {
			height: 10px;
			width: 22px;
			path {
				fill: var(--white);
			}
		}
	}
}
.menu-area {
	align-items: center;
	// background-color: var(--sand);
	display: grid;
	grid-column-gap: 2rem;
	grid-template-columns: 1fr auto;
	padding: 1.5rem;
}
.game-title {
	text-align: right;
	white-space: nowrap;
}
.menu-trigger {
	cursor: pointer;
	position: relative;
	width: 20px;
	&:after,
	&:before {
		background-color: var(--darkGray);
		content: '';
		display: block;
		height: 3px;
		width: 100%;
	}
	&:after {
	}
	&:before {
		margin-bottom: 6px;
	}
}
</style>
