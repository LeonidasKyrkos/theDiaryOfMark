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
				<button v-on:click="addItem()" type="button" class="btn--primary">Submit</button>
			</form>
			<h2 class="beta">Existing phrases:</h2>
			<ul class="phrasebook">
				<li class="phrasebook__item" v-for="(phrase, index) in phrases" v-bind:key="phrase.index">
					<div class="phrasebook__values">
						<span class="phrasebook__value">{{ phrase.value }}</span>
						<span class="phrasebook__desc">{{ phrase.desc }}</span>
					</div>					
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
		}
	}
}
</script>