import {ref} from "vue"
import {authRef} from "../firebase/config"

const hata = ref(null)

const signup = async (email,parola,kullaniciAd) => {
	hata.value=null

	try{
		const res = await authRef.createUserWithEmailAndPassword(email, parola)
		if (!res) {
			throw new Error("Üye olma işlemi gerçekleşmedi")
		}
		await res.user.updateProfile({
			displayName:kullaniciAd
		})
		hata.value=null
		//console.log(res)
		return res
	}catch(error){
		hata.value=error.message
	}
}

const useSignup = () =>{
	return {hata,signup}
}

export default useSignup