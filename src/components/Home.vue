<template>
	<div class="outerwrap">
		<span class="logo__wrap" v-bind:class="{ hide: !logoActive }">
			<img src="https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/39059_10150239415975434_7563380_n.jpg?oh=1534a11fb7ee8d4c400de7478c7324ac&oe=5A0349F6" alt="AEF Mark Horner" class="logo">
		</span>
		<div class="phrase__wrap">
			<span class="phrase" v-bind:class="{ active: phrase.value.length }">{{phrase.value}}</span>
			<span class="phrase__desc" v-bind:class="{ active: phrase.desc.length }">{{phrase.desc}}</span>
			<img v-bind:src="phrase.gif" class="phrase__gif" alt="">
		</div>		
	</div>
</template>

<script>
import db from '../firebase';

export default {
	name: 'Home',
	data() {
		return {
			phrasesObj: {},
			phrases: [],
			phrase: {
				value: '',
				desc: '',
				gif: ''
			},
			easterEggArr: [],
			easterEggTarget: 'sherm'.split(''),
			logoActive: false,
			requestedPhrase: this.$route.params.phrase || ''
		}
	},
	firebase: {
		phrasesObj: {
			source: db.ref('phrases/'),
			asObject: true,
			readyCallback(e) {
				for(const prop in this.phrasesObj) {
					this.phrases.push(this.phrasesObj[prop]);
				}

				this.updatePhrase();
			}
		}
	},
	created() {
		window.addEventListener('keydown',this.onKeydown.bind(this));
	},
	methods: {
		updatePhrase() {
			if(this.requestedPhrase) {
				this.phrase = this.phrasesObj[this.requestedPhrase];
			} else {
				let random = this.getRandom();

				if(this.phrases[random]) {
					this.phrase = this.phrases[random];
					this.phrases.splice(random,1);
				} else {
					this.phrase = this.phrases[0];
				}
			}
		},
		getRandom() {
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
		}
	}
}
</script>