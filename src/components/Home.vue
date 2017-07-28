<template>
	<div class="outerwrap">
		<span class="logo__wrap" v-bind:class="{ hide: !logoActive }">
			<img src="https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/39059_10150239415975434_7563380_n.jpg?oh=1534a11fb7ee8d4c400de7478c7324ac&oe=5A0349F6" alt="AEF Mark Horner" class="logo">
		</span>		
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
	},
	methods: {
		updatePhrase() {
			let random = this.getRandom();

			if(this.phrases[random]) {
				this.phrase.value = this.phrases[random].value;
				this.phrase.desc = this.phrases[random].desc || '';
				this.phrases.splice(random,1);
			} else {
				this.phrase.value = this.phrases[0].value;
				this.phrase.desc = this.phrases[0].desc || '';
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