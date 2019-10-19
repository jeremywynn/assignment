<template>
	<div class="shell">
		<img
			src="~/assets/images/fifa-19-ronaldo-fg-lg@3x.png"
			alt=""
			class="shell-bg"
		/>
		<appHeader />
		<div class="arena">
			<div class="matchmaking">
				<div class="interior">
					<div class="header">Matchmaking Lobby</div>
					<h1>Searching for compatible components</h1>
					<div class="body">
						<p>
							We’re searching our database of players to pair you
							with an opponent of similar skill
						</p>
					</div>
					<div class="lobby-area">
						<div class="label">Lobby</div>
						<div class="participants">
							<div class="participant">
								<img
									src="~/assets/images/avatar-01@3x.png"
									alt=""
								/>
							</div>
						</div>
					</div>
					<div class="queue-area">
						<div class="label"></div>
						<div class="queue">
							<span class="queue-count">4,021</span> in Queue
						</div>
					</div>
				</div>
			</div>
			<div class="searching">
				<div class="label">
					Searching<span class="ellipses"
						><span class="dot">.</span><span class="dot">.</span
						><span class="dot">.</span></span
					>
				</div>
				<div class="time">01:42</div>
				<div class="cancel" @click="cancelSearch">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
						<g fill-rule="evenodd">
							<path
								d="M2.05.636L13.364 11.95l-1.414 1.414L.636 2.05z"
							/>
							<path
								d="M11.95.636L.636 11.95l1.414 1.414L13.364 2.05z"
							/>
						</g>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import appHeader from '@@/components/app-header.vue'
export default {
	components: {
		appHeader
	},
	methods: {
		cancelSearch() {
			this.$store.dispatch('editStatus', 'initial')
			this.$router.push({
				name: 'index'
			})
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
	.header {
		margin-bottom: 1.5rem;
	}
	h1 {
		margin-bottom: 1.5rem;
	}
	.body {
		margin-bottom: 4rem;
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
	img {
		border: 2px solid;
		border-radius: 50%;
		height: 46px;
		padding: 4px;
		width: 46px;
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
	grid-template-columns: 1fr 3rem 14px;
	position: absolute;
	.cancel {
		cursor: pointer;
		svg {
			height: 14px;
			width: 14px;
			g {
				fill: var(--white);
			}
		}
	}
	.ellipses {
		.dot {
			// animation: ellipses 2100ms infinite linear;
			opacity: 0;
			// transition: opacity 400ms;
			&:nth-child(1) {
			}
			&:nth-child(2) {
				animation-delay: 700ms;
			}
			&:nth-child(3) {
				animation-delay: 1400ms;
			}
		}
	}
	// &:before {
	// 	background-color: var(--blue);
	// 	bottom: 0;
	// 	content: '';
	// 	display: block;
	// 	height: 100%;
	// 	left: 0;
	// 	position: absolute;
	// 	right: 0;
	// 	top: 0;
	// 	transition: transform 1000ms;
	// 	transform: scaleX(0.2);
	// 	transform-origin: left;
	// 	width: 100%;
	// 	z-index: -1;
	// }
}
@keyframes ellipses {
	0% {
		opacity: 0;
	}
	25%,
	75% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>
