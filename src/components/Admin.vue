<template>
	<div class="outerwrap--admin">
		<div class="innerwrap">
			<h1 class="alpha">Admin panel</h1>
			<form class="form">
				<h2 class="gamma">New phrase</h2>
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
				<label class="form__control">
					<div class="form__input-wrap">
						<input class="form__input" placeholder="The URL of a gif which describes the situation..." name="gif" v-model="phrase.gif" type="text">
					</div>
				</label>
				<button @click="addItem()" type="button" class="btn--primary">Submit</button>
			</form>
			<h2 class="beta">Existing phrases:</h2>
			<ul class="phrasebook">
				<li class="phrasebook__item" v-for="(phrase, index) in phrases" v-bind:key="index">
					<form class="phrasebook__values">
						<input @input="updatePhrase(index)" type="text" class="phrasebook__value" v-bind:value="phrase.value" v-model="phrases[index].value">
						<input @input="updatePhrase(index)" type="text" class="phrasebook__value" v-bind:value="phrase.desc" v-model="phrases[index].desc">
						<input @input="updatePhrase(index)" type="text" class="phrasebook__value" v-bind:value="phrase.gif" v-model="phrases[index].gif">
					</form>
					<img class="phrasebook__image" v-bind:src="phrase.gif" alt="">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import db from '../firebase';

export default {
	name: 'Admin',
	data() {
		return {
			phrases: [],
			defaultPhrase: {
				value: '',
				desc: '',
				gif: ''
			},
			phrase: {
				value: '',
				desc: '',
				gif: ''
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
			this.phrase = this.defaultPhrase;
		},
		updatePhrase: function (index) {
			let original = this.phrases[index];
			let phrase = { ...original };
			delete phrase['.key'];

			this.$firebaseRefs.phrases.child(original['.key']).set(phrase)
		}
	}
}
</script>