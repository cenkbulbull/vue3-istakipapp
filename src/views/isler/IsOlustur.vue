<template>
	<div>
		<form @submit.prevent="handleSubmit">
			<h4>İş Oluştur</h4>
			<input type="text" placeholder="İş Başlık" v-model="baslik">
			<textarea placeholder="İş Açıklama" v-model="aciklama"></textarea>
			<label>İş Tanıtıcı Resim</label>
			<input type="file" @change="handleChange">
			<input type="datetime-local" v-model="basTarih">
			<div class="error">
				{{fileHata}}
			</div>
			<button>İş Oluştur</button>
		</form>
	</div>
</template>
<script>
	import {ref} from "vue"
	import useStorage from "@/composables/useStorage"
	import useCollection from "@/composables/useCollection"
	import getUser from "@/composables/getUser"
	import {tarih} from '@/firebase/config'
	import {useRouter} from "vue-router"
	export default{
		setup(){
			const router = useRouter()
			const baslik = ref("")
			const aciklama = ref("")
			const basTarih = ref("")

			const file = ref(null)
			const fileHata = ref(null)

			const {resimYukle,url,fileYol} = useStorage()
			const {hataCollection,belgeEkle} = useCollection("isler")
			const {kullanici} = getUser()

			const gecerliTipler=["image/jpeg","image/png"]

			const handleSubmit = async () =>{
				//console.log(baslik.value,aciklama.value,basTarih.value)

				if (file.value) {
					await resimYukle(file.value)
					//console.log("resim yüklendi", url.value)
					const res=await belgeEkle({
						baslik:baslik.value,
						aciklama:aciklama.value,
						kullaniciId:kullanici.value.uid,
						kullaniciAd:kullanici.value.displayName,
						resimUrl:url.value,
						fileYol:fileYol.value,
						isAdimlar:[],
						isTarih:Date.parse(basTarih.value.toString()),
						olusturulmaTarihi:tarih()
					})
					if (!hataCollection.value) {
						//console.log("iş eklendi")
						router.push({name:"IsDetay",params:{id:res.id}})
					}
				}

			}

			const handleChange= (e) =>{
				let secilen = e.target.files[0]
				//console.log(secilen)
				if (secilen && gecerliTipler.includes(secilen.type)) {
					file.value = secilen
					fileHata.value = null
				}else{
					file.value = null
					fileHata.value = "Lütfen png ya da jpeg uzantılı dosyalar seçiniz"
				}
			}

			return {baslik,aciklama,basTarih,handleSubmit,handleChange,fileHata}
		}
	}
</script>
<style scoped>

	input [type="file"]{
		border:0;
		padding: 0;
	}
	label{
		font-size: 17px;
		display: block;
		margin-top: 30px;
	}

	form {
		margin-top: -30px;
	}

</style>