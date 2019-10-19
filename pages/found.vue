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
					<h1>A match has been found for you!</h1>
					<div class="body">
						<p>
							We’ve found a compatible opponent for you to play
							Squad Battles with in FIFA 19
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
							By tapping accept, you agree to play a match that
							may last for up to 30 minutes.
						</div>
					</div>
				</div>
			</div>
			<div class="searching searching--ready">
				<div class="label">
					Accept
				</div>
				<div class="time">-00:17</div>
				<div class="action">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 22 12"
						data-v-2a183b29=""
					>
						<path
							d="M16 0l6 6-6 6V7.2H0V4.8h16z"
							data-v-2a183b29=""
						></path>
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
	background-color: var(--darkGray);
	color: var(--white);
	// margin-bottom: 4rem;
	// padding: 8rem 1rem 2.25rem;

	// mix-blend-mode: multiply;

	.header {
		margin-bottom: 1.5rem;
	}
	h1 {
		margin-bottom: 1.5rem;
	}
	.body {
		margin-bottom: 3.5rem;
	}
}
.lobby-area {
	display: grid;
	// grid-column-gap: 3rem;
	grid-template-columns: 4rem 1fr;
	margin-bottom: 2.25rem;
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
	// align-items: center;
	display: grid;
	grid-template-columns: 4rem 1fr;
	margin-bottom: 2rem;
	.label {
		&:before {
			background-color: var(--white);
			content: '';
			display: block;
			height: 2px;
			margin-top: 0.5rem;
			width: 12px;
		}
	}
}
.queue-count {
	font-family: 'AkzidenzGroteskBQ';
}
</style>
