<template>
	<div class="outerwrap--admin">
		<form class="form">
			<h1 class="alpha">Admin panel</h1>
			<label class="form__control">
				<div class="form__input-wrap">
					<input class="form__input" placeholder="What Mark said..." v-model="phrase.value" name="value" type="text">
				</div>
			</label>
			<label class="form__control">
				<div class="form__input-wrap">
					<input class="form__input" placeholder="Why Mark said it..." name="desc" v-model="phrase.desc" type="text">
				</div>
			</label>
			<button v-on:click="addItem()" type="button" class="btn--primary">Submit</button>
		</form>
	</div>
</template>

<script>
import db from '../firebase';

export default {
	name: 'Admin',
	data() {
		return {
			phrases: [],
			phrase: {
				value: '',
				desc: ''
			}
		}
	},
	firebase: {
		phrases: {
			source: db.ref('phrases')
		}
	},
	methods: {
		addItem() {
			db.ref('phrases/').push(this.phrase);
			this.phrase.value = '';
			this.phrase.desc = '';
		}
	}
}
</script>