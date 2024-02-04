import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        name: "",
        gender_identity: "Man",
        genre: "",
        bio: "",
        url: "",
        matches: []

    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user`, { formData })
            console.log(response)
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    return (

        <div className="bg-emerald-700 w-full w-max-96 h-[100vh] flex justify-end">
            <div className="flex items-center justify-start">
                <h1 className="mr-10 leading-relaxed justify-start font-maliki text-6xl text-slate-50  ">SWIPE<br /><a className="text-pink-400 font-maliki text-8xl">&</a> <br />GROOVE <a className="text-2xl text-orange-500">■</a></h1>
            </div>
            <div className="rounded-3xl bg-[#012929] border-2 border-pink-400 h-3/4 w-2/3 mr-4 mt-20 flex items-center shadow-2xl shadow-green-300">

                <form className="flex flex-col justify-start w-full ml-10">

                    <input type="text" placeholder="Your Name" className="mt-2 p-1 rounded-md bg-gray-100 mb-2 text-sm w-72 border-2 border-green-300" name="name" required={true} value={formData.name} onChange={handleChange} />
                    <div className="flex items-center mb-2">
                        <input type="radio" id="man-gender-identity" name="gender_identity" value="man" className="mr-1" onChange={handleChange} checked={formData.gender_identity === "man"} />
                        <label htmlFor="man-gender-identity" className="mr-4 text-sky-400">Male</label>
                        <input type="radio" id="woman-gender-identity" name="gender_identity" value="woman" className="mr-1" onChange={handleChange} checked={formData.gender_identity === "woman"} />
                        <label htmlFor="woman-gender-identity" className="mr-4 text-sky-400">Female</label>
                        <input type="radio" id="more-gender-identity" name="gender_identityr" value="more" className="mr-1" onChange={handleChange} checked={formData.gender_identity === "more"} />
                        <label htmlFor="more-gender-identity" className="mr-1 text-sky-400">Other</label>
                    </div>
                    <input type="text" placeholder="Genre" className="p-1 rounded-md bg-gray-100 mb-2 text-sm w-72 border-2 border-green-300" name="genre" required={true} value={formData.genre} onChange={handleChange} />
                    <input type="text" placeholder="Add a Cool Bio" className="p-1 rounded-md bg-gray-100 mb-2 text-sm w-72 border-2 border-green-300" name="bio" required={true} value={formData.bio} onChange={handleChange} />
                    <input type="url" className="mt-2 p-1 rounded-md bg-gray-200 mb-2 text-sm w-72 border-2 border-green-300" name="url" id="url" onChange={handleChange} required={true} />
                    <button className="bg-emerald-500 text-white py-2 px-4 rounded-xl w-40 justify-start" onClick={handleSubmit}>SUBMIT</button>
                </form>

                <img className="mr-4 mt-4 mb-0 h-[70vh] " src="../src/assets/frog.png" placeholder="Add a cool pic" />
            </div>
        </div>

    )
}
export default OnBoarding