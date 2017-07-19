<template>
	<div class="outerwrap">
		<span class="phrase" v-bind:class="{ active: phrase.value.length }">{{phrase.value}}</span>
		<span class="phrase__desc" v-bind:class="{ active: phrase.desc.length }">{{phrase.desc}}</span>
	</div>
</template>

<script>
import db from '../firebase';

export default {
	name: 'Home',
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
			source: db.ref('phrases/'),
			readyCallback(e) {
				this.updatePhrase();
			}
		}
	},
	methods: {
		updatePhrase() {
			let random = Math.floor(Math.random() * this.phrases.length - 0.1);
			
			if(this.phrases[random]) {
				this.phrase.value = this.phrases[random].value;
				this.phrase.desc = this.phrases[random].desc || '';
			} else {
				this.phrase.value = this.phrases[0].value;
				this.phrase.desc = this.phrases[0].desc || '';
			}
		}
	}
}
</script>