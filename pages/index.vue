<template>
	<div class="shell">
		<transition name="fade" mode="out-in">
			<div v-if="playerStatus !== 'initial'" class="shell__inner"></div>
		</transition>
		<img
			src="~/assets/images/fifa-19-ronaldo-fg-lg@3x.png"
			alt=""
			:class="['shell-bg', { active: playerStatus !== 'initial' }]"
		/>
		<appHeader />
		<transition name="fade" mode="out-in">
			<div v-if="playerStatus === 'initial'" class="start">
				<div class="brow">
					<div class="back">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 22 10"
						>
							<path d="M6 0L0 5l6 5V6h16V4H6z" />
						</svg>
					</div>
					<div class="venue">Matchmaking Lobby</div>
				</div>
				<div class="lobby">
					<div class="lobby__main">
						<div class="lobby-header">
							<div class="lobby-owner">
								<h1 class="owner-name">steveroesler’s lobby</h1>
								<div class="lobby-access">
									<img
										src="~/assets/images/gf-lock.svg"
										alt=""
									/>
								</div>
							</div>
						</div>
						<div class="lobby-tag">FIFA 19</div>
						<div v-if="teammates" class="players">
							<player
								v-for="teammate in teammates"
								:key="teammate.name"
								:player="teammate"
								:players="players"
							/>
							<player
								v-if="teammates.length < 4"
								:player="invitation"
								:players="players"
							/>
						</div>
					</div>
					<div class="settings">
						<gameOptions
							v-for="option in options"
							:key="option.name"
							:option="option"
						/>
					</div>
					<div class="play" @click="playNow">
						<div class="play__label">Play Now</div>
						<div class="play__queue">4,021 in Queue</div>
						<div class="play__trigger">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 22 12"
							>
								<path d="M16 0l6 6-6 6V7.2H0V4.8h16z" />
							</svg>
						</div>
					</div>
				</div>
			</div>
			<matchmaking v-else :teammates="teammates" />
		</transition>
	</div>
</template>

<script>
import appHeader from '@@/components/app-header.vue'
import gameOptions from '@@/components/game-options.vue'
import matchmaking from '@@/components/matchmaking.vue'
import player from '@@/components/player.vue'

export default {
	components: {
		appHeader,
		gameOptions,
		matchmaking,
		player
	},
	data: () => ({
		options: [
			{
				title: 'Type',
				values: [{ name: 'Competitive' }, { name: 'Cooperative' }]
			},
			{
				title: 'Gamemode',
				values: [
					{ name: 'Squad Battles' },
					{ name: 'Ultimate Team' },
					{ name: 'Kick Off' },
					{ name: 'Skill Games' },
					{ name: 'Practice Arena' }
				]
			},
			{
				title: 'Lobby Status',
				values: [{ name: 'Invite Only' }, { name: 'Public' }]
			}
		],
		invitation: {
			name: null,
			avatar: null
		},
		maxPlayers: 6,
		players: [
			{
				name: 'mistevs',
				avatar: require(`../assets/images/gf-avatar-02@3x.jpg`),
				teammate: false
			},
			{
				name: 'kevincoenegrachts',
				avatar: require(`../assets/images/gf-avatar-03@3x.jpg`),
				teammate: false
			},
			{
				name: 'marlovliestra',
				avatar: require(`../assets/images/gf-avatar-04@3x.jpg`),
				teammate: false
			},
			{
				name: 'oradziuk',
				avatar: require(`../assets/images/gf-avatar-05@3x.jpg`),
				teammate: false
			},
			{
				name: 'jeredev',
				avatar: require(`../assets/images/gf-avatar-06@3x.jpg`),
				teammate: false
			}
		],
		searchStartTimestamp: null,
		selectedGameOptions: [
			{
				title: 'Type',
				value: 'Competitive'
			},
			{
				title: 'Gamemode',
				value: 'Squad Battles'
			},
			{
				title: 'Lobby Status',
				value: 'Invite Only'
			}
		],
		teamLeader: {
			name: 'steveroesler',
			avatar: require(`../assets/images/gf-avatar-01@3x.jpg`),
			badge: true
		},
		teammates: []
	}),
	computed: {
		playerStatus() {
			return this.$store.state.status
		}
	},
	mounted() {
		this.initializeApp()
		this.$root.$on('addTeammate', player => {
			this.addTeammate(player)
		})
		this.$root.$on('reInitialize', () => {
			this.initializeApp()
		})
		this.$root.$on('setGameOption', option => {
			this.setGameOption(option)
		})
	},
	methods: {
		setGameOption(option) {
			const pertinentOption = this.selectedGameOptions.findIndex(
				gameOption => gameOption.title === option.optionTitle
			)
			this.selectedGameOptions[pertinentOption].value = option.optionValue
		},
		addTeammate(teammate) {
			if (teammate) {
				const chosenPlayer = this.players.find(
					player => player.name === teammate
				)
				const chosenPlayerIndex = this.players.findIndex(
					player => player.name === teammate
				)
				this.players[chosenPlayerIndex].teammate = true
				this.teammates.push(chosenPlayer)
			}
		},
		cancelSearch() {
			this.$store.dispatch('editStatus', 'initial')
			this.$router.push({
				name: 'index'
			})
		},
		initializeApp() {
			this.players.forEach(player => {
				player.teammate = false
			})
			this.teammates = []
			this.teammates.push(this.teamLeader)
		},
		playNow() {
			this.$store.dispatch('editStatus', 'searching')
		}
	}
}
</script>

<style lang="scss">
.shell {
	position: relative;
	&__inner {
		background: url(~assets/images/gfinity-g-pos.svg) no-repeat bottom right;
		bottom: 0;
		height: 100%;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
	}
	.shell-bg {
		right: 0;
		height: 100%;
		position: absolute;
		top: 4.75rem;
		mix-blend-mode: multiply;
		object-fit: contain;
		pointer-events: none;
		transform: translate(40%, -54%);
		transition: 1000ms;
		user-select: none;
		z-index: 1;
		&.active {
			object-fit: cover;
			transform: translate(0);
		}
	}
}
.start {
	background-color: var(--sand);
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	position: relative;
}
.brow {
	border-bottom: 1px solid var(--concrete);
	display: grid;
	grid-column-gap: 1.5rem;
	grid-template-columns: auto 1fr;
	padding: 1rem 0;
	padding-left: 1rem;
	padding-right: 1rem;
	position: relative;
	z-index: 2;
}
.back {
	cursor: pointer;
	padding-top: 0.25rem;
	svg {
		height: 10px;
		width: 22px;
		path {
			fill: var(--darkGray);
		}
	}
}
.lobby {
	background-color: var(--sand);
	display: flex;
	flex: 1;
	flex-direction: column;
}
.lobby-owner {
	display: flex;
	margin-bottom: 0.4rem;
}
.owner-name {
	font-size: inherit;
	margin-right: 1rem;
}
.lobby__main {
	flex: 1;
	padding: 0.9rem 1rem 0;
	position: relative;
	z-index: 2;
}
.lobby-access {
	flex: 0 0 auto;
	padding-top: 0.85rem;
}
.lobby-tag {
	background-color: var(--darkGray);
	border-radius: 0 100px 100px 0;
	color: var(--white);
	display: inline-block;

	font-family: 'AkzidenzGroteskBQ';
	font-size: 10px;
	letter-spacing: 1.5px;

	margin: 0 1rem 0.5rem 0;
	padding: 0.025rem 0.4rem 0rem 0.3rem;
}
.players {
	display: flex;
	margin: 1rem 0;
	overflow-x: auto;
	position: relative;
	z-index: 2;
}
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
			box-shadow: 0px 0px 12px 4px var(--concrete);
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
.readiness {
	border: 1px solid;
	display: inline-block;
	margin: 0 0.5rem 0 0;
	padding: 0.1rem 0.2rem 0.1rem 0.25rem;
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
.settings {
	padding: 0 1rem;
	position: relative;
	z-index: 2;
}
.play {
	background-color: var(--blue);
	color: #fff;
	cursor: pointer;
	display: grid;
	grid-column-gap: 2rem;
	grid-template-columns: 1fr 1fr 22px;
	padding: 2rem 1rem;
	position: relative;
	z-index: 2;
	&__trigger {
		display: flex;
		justify-content: flex-end;
		padding-top: 0.275rem;
		svg {
			height: 12px;
			width: 22px;
			path {
				fill: #fff;
			}
		}
	}
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
</style>
