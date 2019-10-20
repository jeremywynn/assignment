<template>
	<div class="arena">
		<div :class="['matchmaking', { found: playerStatus === 'matched' }]">
			<div class="interior">
				<div class="header">Matchmaking Lobby</div>
				<h1 v-if="playerStatus === 'searching'">
					Searching for compatible components
				</h1>
				<h1 v-else>
					A match has been found for you!
				</h1>
				<div class="body">
					<p v-if="playerStatus === 'searching'">
						We’re searching our database of players to pair you with
						an opponent of similar skill
					</p>
					<p v-else>
						We’ve found a compatible opponent for you to play
						{{ gamemode }} with in FIFA 19
					</p>
				</div>
				<div class="lobby-area">
					<div class="label">Lobby</div>
					<div class="participants">
						<div
							v-for="teammate in teammates"
							:key="teammate.name"
							class="participant"
						>
							<img :src="teammate.avatar" :alt="teammate.name" />
						</div>
					</div>
				</div>
				<div class="queue-area">
					<div class="label"></div>
					<div v-if="playerStatus === 'searching'" class="queue">
						<span class="queue-count">4,021</span> in Queue
					</div>
					<div v-else class="queue">
						By tapping accept, you agree to play a match that may
						last for up to 30 minutes.
					</div>
				</div>
			</div>
		</div>
		<div
			:class="[
				'searching',
				{ 'searching--ready': playerStatus === 'matched' },
				{ 'searching--disabled': playerStatus === 'playing' }
			]"
			@click="acceptMatch"
		>
			<div class="cta-components">
				<div class="label">
					<template v-if="playerStatus === 'searching'">
						Searching<span class="ellipses"
							><span class="dot">.</span><span class="dot">.</span
							><span class="dot">.</span></span
						>
					</template>
					<template v-if="playerStatus === 'matched'">
						Accept
					</template>
					<template v-if="playerStatus === 'playing'">
						Match underway<span class="ellipses"
							><span class="dot">.</span><span class="dot">.</span
							><span class="dot">.</span></span
						>
					</template>
				</div>
				<div v-if="playerStatus !== 'playing'" class="time">
					<span v-if="playerStatus === 'matched'">-</span
					><span id="timer">00:00</span>
				</div>
				<div class="action">
					<svg
						v-if="playerStatus === 'searching'"
						class="cancel"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 14 14"
						@click="cancelSearch"
					>
						<g fill-rule="evenodd">
							<path
								d="M2.05.636L13.364 11.95l-1.414 1.414L.636 2.05z"
							/>
							<path
								d="M11.95.636L.636 11.95l1.414 1.414L13.364 2.05z"
							/>
						</g>
					</svg>
					<svg
						v-if="playerStatus === 'matched'"
						class="accept"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 22 12"
					>
						<path d="M16 0l6 6-6 6V7.2H0V4.8h16z"></path>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	transition: {
		name: 'test',
		mode: 'out-in',
		enterClass: 'entering'
	},
	props: {
		teammates: Array
	},
	data: () => ({
		bypassQueueTimerID: null,
		queueTimerID: null,
		reInitializeID: null,
		timerID: null
	}),
	computed: {
		gamemode() {
			const chosenGamemode = this.$parent.selectedGameOptions.find(
				gameOption => gameOption.title === 'Gamemode'
			)
			return chosenGamemode.value
		},
		playerStatus() {
			return this.$store.state.status
		}
	},
	destroyed() {
		window.clearInterval(this.timerID)
		window.clearInterval(this.queueTimerID)
		window.clearTimeout(this.bypassQueueTimerID)
		window.clearTimeout(this.reInitializeID)
	},
	mounted() {
		this.startTimer(document.querySelector('#timer'))
		// Make match found in 10 seconds from now
		this.bypassQueueTimerID = window.setTimeout(() => {
			this.$store.dispatch('editStatus', 'matched')
			window.clearInterval(this.queueTimerID)
			this.startTimer(document.querySelector('#timer'))
		}, 10000)
	},
	methods: {
		acceptMatch() {
			if (this.playerStatus === 'matched') {
				window.clearInterval(this.timerID)
				this.$store.dispatch('editStatus', 'playing')
				this.reInitializeID = window.setTimeout(() => {
					this.$store.dispatch('editStatus', 'initial')
					this.$root.$emit('reInitialize')
				}, 5000)
			}
		},
		cancelSearch() {
			this.$store.dispatch('editStatus', 'initial')
		},
		startTimer(display) {
			const start = Date.now()
			let timeElapsed
			let minutes
			let seconds
			function timer() {
				timeElapsed = (Date.now() - start) / 1000
				minutes = (timeElapsed / 60) | 0
				seconds = timeElapsed % 60 | 0
				minutes = minutes < 10 ? '0' + minutes : minutes
				seconds = seconds < 10 ? '0' + seconds : seconds
				display.textContent = minutes + ':' + seconds
			}
			timer()
			this.queueTimerID = window.setInterval(timer, 1000)
		}
	}
}
</script>

<style lang="scss" scoped>
.back {
	padding-top: 0.25rem;
	svg {
		height: 10px;
		width: 22px;
		path {
			fill: var(--darkGray);
		}
	}
}
.matchmaking {
	background-color: var(--blue);
	color: var(--white);
	transition: background-color 1000ms;
	.header {
		margin-bottom: 1.5rem;
	}
	h1 {
		margin-bottom: 1.5rem;
	}
	.body {
		margin-bottom: 4rem;
	}
	&.found {
		background-color: var(--darkGray);
	}
}
.lobby-area {
	display: grid;
	grid-template-columns: 4rem 1fr;
	margin-bottom: 2rem;
	.label {
		padding-top: 12px;
	}
}
.participant {
	border: 2px solid;
	border-radius: 50%;
	display: inline-block;
	padding: 4px;
	img {
		border-radius: 50%;
		display: block;
		height: 42px;
		width: 42px;
	}
}
.queue-area {
	align-items: center;
	display: grid;
	grid-template-columns: 4rem 1fr;
	margin-bottom: 2rem;
	.label {
		&:before {
			background-color: var(--white);
			content: '';
			display: block;
			height: 2px;
			width: 12px;
		}
	}
}
.queue-count {
	font-family: 'AkzidenzGroteskBQ';
}
.searching {
	.cta-components {
		align-items: center;
		display: grid;
		grid-column-gap: 1.5rem;
		grid-template-columns: 1fr 3rem 14px;
		padding: 2.25rem 1.5rem;
	}
	.accept {
		cursor: pointer;
	}
	.cancel {
		cursor: pointer;
		height: 14px;
		transition: transform 400ms;
		width: 14px;
		g {
			fill: var(--white);
		}
		&:hover,
		&:focus,
		&:active {
			transform: scale(1.2);
		}
	}
	.ellipses {
		.dot {
			animation: ellipses 2000ms infinite linear;
			opacity: 0;
			&:nth-child(2) {
				animation-delay: 400ms;
			}
			&:nth-child(3) {
				animation-delay: 800ms;
			}
		}
	}
	&--ready {
		cursor: pointer;
		.cta-components {
			grid-template-columns: 1fr 3rem 22px;
		}
	}
	&--disabled {
		background-color: rgba(#293894, 0.5);
		cursor: default;
	}
}
@keyframes ellipses {
	0% {
		opacity: 0;
	}
	20%,
	80% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>
