<template>
	<div class="outerwrap">
		<span class="logo__wrap" v-bind:class="{ hide: !logoActive }">
			<img src="https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/39059_10150239415975434_7563380_n.jpg?oh=1534a11fb7ee8d4c400de7478c7324ac&oe=5A0349F6" alt="AEF Mark Horner" class="logo">
		</span>
		<div class="phrase__wrap">
			<span class="phrase" v-bind:class="{ active: phrase.value.length }">{{phrase.value}}</span>
			<span class="phrase__desc" v-bind:class="{ active: phrase.desc.length }">{{phrase.desc}}</span>
			<img v-if="phrase.gif" v-bind:src="phrase.gif" class="phrase__gif" alt="">
		</div>
		<button class="btn--secondary phrase__next" v-on:click="goToRandomPhrase()">Random</button>
	</div>
</template>

<script>
import db from '../firebase';
import router from "../router";

export default {
	name: 'Home',
	data() {
		return {
			phrases: [],
			phrase: {
				value: '',
				desc: '',
				gif: ''
			},
			easterEggArr: [],
			easterEggTarget: 'sherm'.split(''),
			logoActive: false
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
	created() {
		window.addEventListener('keydown',this.onKeydown.bind(this));
		window.addEventListener('hashchange',this.updatePhrase.bind(this));
	},
	methods: {
		updatePhrase() {
			const index = this.$route.params.phrase ? this.phrases.findIndex(el => el['.key'] === this.$route.params.phrase) : null;

			if(index) {
				this.phrase = this.phrases[index];
			} else {
				this.goToRandomPhrase();
			}
		},
		goToPhrase(phrase) {
			if(phrase) {
				router.push(`/phrases/${phrase}`);
			} else {
				this.goToRandomPhrase();
			}
		},
		goToRandomPhrase() {
			this.random = this.getRandomNumber();

			if(this.phrases[this.random]) {
				var phrase = this.phrases[this.random];
			} else {
				var phrase = this.phrases[0];
			}

			this.goToPhrase(phrase['.key']);
		},
		getRandomNumber() {
			return Math.floor(Math.random() * this.phrases.length - 0.1);
		},
		onKeydown(e) {
			(e.which === 37 || e.which === 39) && this.updatePhrase();

			if(!this.logoActive) {
				this.easterEgg(e.key);
			}
		},
		easterEgg(key) {
			if(key === this.easterEggTarget[this.easterEggArr.length]) {
				this.easterEggArr.push(key);
			} else {
				this.easterEggArr = [];
			}

			if(this.easterEggArr.join('') === this.easterEggTarget.join('')) {
				this.logoActive = true;
			}
		},
		next() {
			this.getRandomPhrase();
		}
	}
}
</script>