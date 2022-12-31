<template>
	<div v-if="hataDocument" class="error">
		{{hataDocument}}
	</div>
	<div v-if="is" class="work-details">
		<div class="work-info">
			<div class="image">
				<img :src="is.resimUrl" alt="">
			</div>
			<h2>{{is.baslik}}</h2>
			<p class="username">Oluşturan : {{is.kullaniciAd}}</p>
			<p class="description">{{is.aciklama}}</p>
			<button v-if="kullaniciIs" @click="handleDelete">İşi Sil</button>
		</div>
		<div class="work-list">
			<h2>İş Adımları</h2>
			<IsAdimEkle v-if="kullaniciIs" :is="is"/>
			<div class="work-list">
				<div v-if="!is.isAdimlar.length">Henüz iş eklenmedi</div>
				<div v-for="isAdim in is.isAdimlar" :key="isAdim.id" class="single-work">
					<div class="details">
						<h3>{{isAdim.isAdimi}}</h3>
					</div>
					<button v-if="kullaniciIs" @click="handleClick(isAdim.id)">Sil</button>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	import getDocument from "@/composables/getDocument"
	import useDocument from "@/composables/useDocument"
	import useStorage from "@/composables/useStorage"
	import getUser from "@/composables/getUser"
	import {useRouter} from "vue-router"
	import{computed} from "vue"
	import IsAdimEkle from '@/components/IsAdimEkle.vue'

	export default{
		components:{IsAdimEkle},
		props:["id"],
		setup(props){
			const {hataDocument,belge:is}=getDocument("isler",props.id)
			const {kullanici} = getUser()
			const kullaniciIs = computed(()=>{
				return is.value && kullanici.value && kullanici.value.uid == is.value.kullaniciId
			})

			const  {belgeSil,belgeGuncelle} = useDocument("isler",props.id)
			const {resimSil} = useStorage()
			const router = useRouter()

			const handleDelete = async() =>{
				await resimSil(is.value.fileYol)
				await belgeSil()

				router.push({name:'Home'})
			}

			const handleClick=async(id)=>{
				const isAdimlar = is.value.isAdimlar.filter((adim) =>adim.id!=id)
				await belgeGuncelle({isAdimlar})
			}

			return {hataDocument,is,kullaniciIs,handleDelete,handleClick}
		}
	}
</script>
<style>
	
</style>