import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


const AuthModal = ({ setShowModal, isSignUp }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    console.log(email, password, confirmPassword)


    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match!')
                return
            }
            setLoading(true)
            const response = await axios.post(`${import.meta.env.env.VITE_BACKEND_URL}/${isSignUp ? 'signup' : 'login'}`, { email, password })
            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201
            if (success && isSignUp) navigate('/onboarding')
            if (success && !isSignUp) navigate('/dashboard')

            window.location.reload()

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="auth-modal bg-slate-700">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>

            <h2 className="text-pink-800">{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p className="text-slate-50">By clicking Submit, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleSubmit} className="bg-slate-700">
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                {/* <input className="secondary-button" type="submit" onClick={handleSubmit}/> */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="secondary-button"
                    type="submit"
                >
                    {
                        loading ? "loading..." : "Submit"
                    }
                </button>
            </form>

            <hr />
            <h2>GET STARTED</h2>

        </div>
    )
}
export default AuthModal