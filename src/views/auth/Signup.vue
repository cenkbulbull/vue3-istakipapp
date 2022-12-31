<template>
	<form @submit.prevent="handleSubmit">
		<h3>Kayıt Sayfası</h3>
		<input type="text" placeholder="Lütfen Kullanıcı adınızı giriniz" v-model="kullaniciAd">
		<input type="email" placeholder="Lütfen Email adresini giriniz" v-model="email">
		<input type="password" placeholder="Lütfen Parolanozı giriniz" v-model="parola">
		<button>Üye Ol</button>
		<div v-if="hata" class="error">
			{{hata}}
		</div>
	</form>
</template>
<script>
	import useSignup from "@/composables/useSignup"
	import {ref} from "vue"
	export default{
		setup(){
			const {hata,signup} = useSignup()
			const email = ref("")
			const parola = ref("")
			const kullaniciAd = ref("")
			const handleSubmit = async ()=>{
				const res = await signup(email.value,parola.value,kullaniciAd.value)
				if (!hata.value) {
					console.log("kullanıcı üye oldu")
				}
			}
			return {email,parola,kullaniciAd,handleSubmit,hata}
		}
	}
</script>
<style>
	
</style>