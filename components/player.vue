<template>
	<div class="player carousel-cell">
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
					<v-select
						v-model="selectedPlayer"
						:items="players"
						item-text="name"
						label="Invite Player"
						solo
						@change="addToRoster"
					></v-select>
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
	data() {
		return {
			selectedPlayer: null
		}
	},
	// init() {
	// 	this.$nextTick(() => {
	// 		this.$flickity = new Flickity(this.$el, this.options)
	// 		this.$emit('init', this.$flickity)
	// 	})
	// },
	methods: {
		addToRoster() {
			// alert(this.selectedPlayer)  // Returns the name
			this.$root.$emit('addTeammate', this.selectedPlayer)
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
	display: inline-block;
}
</style>
