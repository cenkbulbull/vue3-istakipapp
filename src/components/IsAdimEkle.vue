<template>
	<div class="add-work">
		<button v-if="!formGoster" @click="formGoster=true">İş Adımı Ekle</button>
		<form @submit.prevent="handleSubmit" v-if="formGoster">
			<h4>Yeni İş Adımı</h4>
			<input type="text" placeholder="İş Adımı" required v-model="isAdimi">
			<button>Ekle</button>
		</form>
	</div>
</template>
<script>
	import {ref} from "vue"
	import useDocument from "../composables/useDocument"
	export default{
		props:["is"],
		setup(props){
			const isAdimi=ref(null)
			const formGoster = ref(false)

			const {belgeGuncelle} = useDocument("isler",props.is.id)

			const handleSubmit = async()=>{
				const yeniIsAdimi={
					isAdimi:isAdimi.value,
					id:Math.floor(Math.random()*100000)
				}
				//console.log(yeniIsAdimi)

				const res = await belgeGuncelle({
					isAdimlar:[...props.is.isAdimlar,yeniIsAdimi]
				})

				isAdimi.value=null
				formGoster.value=false
			}

			return{isAdimi,formGoster,handleSubmit}
		}
	}
</script>
<style scoped>
    .add-work{
        text-align: center;
        margin-top:40px;
    }

    form {
        max-width: 100%;
        text-align: left;
    }
</style>