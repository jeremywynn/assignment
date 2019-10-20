<template>
	<div class="universe">
		<nuxt />
	</div>
</template>

<style lang="scss">
#__nuxt {
	display: flex;
	flex-direction: column;
	min-height: 100%;
	width: 100%;
}
#__layout {
	display: flex;
	flex-direction: column;
	min-height: 100%;
	width: 100%;
}
.button {
	padding: 1rem;
	&--blue {
		background-color: var(--blue);
		&:disabled {
			opacity: 0.5;
		}
	}
	&--darkGray {
		background-color: var(--darkGray);
		&:disabled {
			opacity: 0.5;
		}
	}
}
</style>
