<template>
	<form @submit.prevent="handleSubmit">
		<h3>Giriş Sayfası</h3>
		<input type="email" placeholder="Lütfen Email adresini giriniz" v-model="email">
		<input type="password" placeholder="Lütfen Parolanozı giriniz" v-model="parola">
		<button>Giriş</button>
		<div v-if="hata" class="error">
			{{hata}}
		</div>
	</form>
</template>
<script>
	import useLogin from "@/composables/useLogin"
	import {ref} from "vue"
	import {useRouter} from "vue-router"
	export default{
		setup(){
			const {hata,login} = useLogin()
			const email = ref("")
			const parola = ref("")

			const router = useRouter()

			const handleSubmit = async ()=>{
				const res = await login(email.value,parola.value)
				if (!hata.value) {
					console.log("giriş yapıldı")
					router.push("/")
				}
			}
			return {email,parola,handleSubmit,hata}
		}
	}
</script>
<style>
	
</style>