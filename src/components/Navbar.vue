<template>
	<div class="navbar">
		<nav>
			<!--<img src="@/assets/logo.png" alt="">-->
			<h1>
				<router-link style="color: #fff;" :to="{name:'Home'}">İş Takip</router-link>
			</h1>
			<div class="links">
				<div v-if="kullanici">
					<router-link class="btn" :to="{name:'IsOlustur'}">İş Oluştur</router-link>
					<button @click="handleClick">Çıkış</button>
				</div>
				<div v-if="!kullanici">
					<router-link class="btn" :to="{name:'Signup'}">Üye Ol</router-link>
					<router-link class="btn" :to="{name:'Login'}">Giriş</router-link>
				</div>
			</div>
		</nav>
	</div>
</template>
<script>
	import useLogout from "../composables/useLogout"
	import getUser from "../composables/getUser"
	import {useRouter} from "vue-router"
	export default{
		setup(){
			const {logout} = useLogout()
			const router = useRouter()
			const {kullanici} = getUser()

			//console.log(kullanici)

			const handleClick= async ()=>{
				await logout()
				router.push({name:"Login"})
			}
			return{handleClick,kullanici}
		}
	}
</script>