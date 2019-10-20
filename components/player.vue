<template>
	<div class="player">
		<div
			v-if="player.avatar"
			class="player__portrait filled"
			:style="{
				backgroundImage: `url('${player.avatar}')`
			}"
		></div>
		<div v-else class="player__portrait"></div>
		<div class="player__details">
			<div class="player-role">Team Player /</div>
			<div class="player-name">
				<div v-if="player.name" class="player-username">
					{{ player.name }}
				</div>
				<div v-else class="invite-player">
					<select
						v-model="selectedPlayer"
						class="select-css"
						@change="addToRoster"
					>
						<option disabled value="" hidden>Invite Player</option>
						<template v-for="friend in players">
							<option
								v-if="!friend.teammate"
								:key="friend.name"
								:value="friend.name"
								>{{ friend.name }}</option
							>
						</template>
					</select>
				</div>
			</div>
			<div v-if="player.badge" class="player-status">
				<div class="readiness">Ready</div>
				<div v-if="player.badge" class="player-badge">
					<img src="~/assets/images/gf-pts-g.svg" alt="" />
					<span class="superscript">74</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		player: Object,
		players: Array
	},
	data: () => ({
		selectedPlayer: ''
	}),
	methods: {
		addToRoster() {
			this.$root.$emit('addTeammate', this.selectedPlayer)
			this.selectedPlayer = ''
		}
	}
}
</script>

<style lang="scss" scoped>
.player {
	margin-right: 1rem;
	max-width: 140px;
	min-width: 140px;
	&__portrait {
		background-color: var(--sand);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border: 1px solid var(--concrete);
		border-radius: 6px;
		margin-bottom: 1rem;
		min-height: 187px;
		overflow: hidden;
		transition: box-shadow 400ms ease-in;
		width: 100%;
		&.filled {
			box-shadow: 0px 0px 12px 2px var(--concrete);
		}
		img {
			display: block;
		}
	}
}
.player-role {
	color: var(--lightGray);
	margin-bottom: 0.5rem;
}
.player-name {
	margin-bottom: 1rem;
}
.readiness {
	border: 1px solid;
	display: inline-block;
	margin: 0 0.5rem 0 0;
	padding: 0.25rem;
	text-transform: uppercase;
}
.player-badge {
	display: inline-block;
	margin-bottom: 1rem;
	img {
		display: inline-block;
	}
	.superscript {
		color: var(--red);
	}
}
.invite-player {
	cursor: pointer;
}

select option {
	padding: 0 0.25rem;
}
select option:disabled {
	display: none;
}
.select-css {
	cursor: pointer;
	display: block;
	font-size: 16px;
	font-family: inherit;
	color: inherit;
	padding: 0 0.25em;
	width: calc(100% + 2px);
	max-width: 100%;
	box-sizing: border-box;
	border: 0;
	border-radius: 0;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	margin: -1px 0 0 -0.25em;
	background: transparent;
	background-image: url('~assets/images/gf-caret-right.svg');
	background-repeat: no-repeat;
	background-position: right 0.7em top 50%;
	background-size: 8px 12px;
	letter-spacing: -0.5px;
}
.select-css::-ms-expand {
	display: none;
}
.select-css:focus {
	outline: none;
}
.select-css option {
	font-weight: normal;
}
</style>
