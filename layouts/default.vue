<template>
	<div class="universe">
		<nuxt />
	</div>
</template>

<style lang="scss">
:root {
	--blue: rgb(41, 56, 148);
	--red: rgb(233, 66, 53);
	--darkGray: rgb(27, 27, 27);
	--lightGray: rgb(107, 107, 101);
	--concrete: rgb(207, 209, 199);
	--sand: rgb(223, 224, 217);
	--white: rgb(255, 255, 255);
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
