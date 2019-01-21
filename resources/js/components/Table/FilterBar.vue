<template>
	<div class="filter-bar">
		<div class="inline field">
			<label class="hidden">Search: </label>
			<input type="text" v-model="filterText" class="three wide column" @keyup.enter="doFilter" placeholder="Search ..">
			<button class="ui primary button hidden" @click="doFilter">Go</button>
			<button class="ui button hidden" @click="resetFilter">Reset</button>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				filterText: ''
			}
		},
		methods: {
			///// use vue-event
			doFilter () {
				this.$events.fire('filter-set', this.filterText)
			},
			resetFilter () {
				this.filterText = ''  // clear the text in text input
				this.$events.fire('filter-reset')
			}
			/////
		}
	}
</script>

<style lang="scss">
	.filter-bar{
		float: left; margin-bottom: 10px;

		label{
			font-weight: bold;
		}

		input[type="text"]{
			border: 1px solid #E4E7ED; height: 36px; border-radius: 2px; outline: none; padding: 0px 10px; min-width: 230px; margin: 0px 0px 0px 10px;

			&:focus{
				border-color: #cad5fe;
			}
		}

		.button {
			background: #5bc0de; border: 1px solid #5bc0de; line-height: 30px; padding: 0px 15px; border-radius: 3px; color: #fff; margin: 0px 4px; outline: none; cursor: pointer;
		}

		.button.primary {
			background: #fff; border: 1px solid #ddd; line-height: 30px; padding: 0px 15px; border-radius: 3px; color: #5bcbec; outline: none; cursor: pointer;
		}
	}
</style>
