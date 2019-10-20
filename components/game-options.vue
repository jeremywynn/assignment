<template>
	<div :class="['selection', { revealed: revealed }]">
		<div
			v-for="(value, index) in option.values"
			:key="value.name"
			class="selection-group"
		>
			<div
				v-if="index === 0"
				class="option chosen"
				@click="revealed = !revealed"
			>
				<div class="option__label">{{ option.title }}</div>
				<div class="option__value">{{ defaultOption }}</div>
				<div class="option__trigger">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8">
						<path
							d="M10.11.251l1.828 1.83-5.843 5.843L.25 2.08 2.08.25l4.014 4.015z"
						/>
					</svg>
				</div>
			</div>
			<transition-expand>
				<div v-show="revealed" id="options" class="options">
					<div
						v-if="defaultOption !== value.name"
						:key="value.id"
						class="option"
						@click="updateOption(option.title, value.name)"
					>
						<div class="option__label"></div>
						<div class="option__value">{{ value.name }}</div>
						<div class="option__trigger"></div>
					</div>
				</div>
			</transition-expand>
		</div>
	</div>
</template>

<script>
import TransitionExpand from '@@/components/TransitionExpand.vue'
export default {
	components: {
		TransitionExpand
	},
	props: {
		option: Object
	},
	data() {
		return {
			defaultOption: this.option.values[0].name,
			revealed: false
		}
	},
	methods: {
		updateOption(optionTitle, optionValue) {
			this.defaultOption = optionValue
			this.$root.$emit('setGameOption', { optionTitle, optionValue })
			this.revealed = false
		}
	}
}
</script>

<style lang="scss" scoped>
.selection {
	border-top: 1px solid var(--concrete);
	cursor: pointer;
	&.revealed {
		.option {
			svg {
				transform: rotate(180deg);
			}
			&:not(.chosen) {
				&:hover,
				&:focus,
				&:active {
					background-color: var(--darkGray);
					color: var(--white);
				}
			}
		}
	}
}
.option {
	display: grid;
	grid-column-gap: 2rem;
	grid-template-columns: 1fr 1fr 22px;
	padding: 0.825rem 0;
	&__trigger {
		display: flex;
		justify-content: flex-end;
		padding-top: 0.275rem;
		svg {
			height: 8px;
			width: 12px;
		}
	}
}
.expand-enter-active,
.expand-leave-active {
	transition-property: height;
}
</style>
