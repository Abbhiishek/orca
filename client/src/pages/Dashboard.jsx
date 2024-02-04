import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [genreUsers, setGenreUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId
    let navigate = useNavigate()
    const explore = () => {
        navigate('/explore')
    }

    const getUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
                params: { userId }
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getGenreUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/genre-users`, {
                params: { genre: user?.genre }
            })
            setGenreUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => {
        if (user) {
            getGenreUsers()
        }
    }, [user])

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/addmatch`, {
                userId,
                matchedUserId
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }


    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId)

    const filteredGenreUsers = genreUsers?.filter(genreUser => !matchedUserIds.includes(genreUser.user_id))


    console.log('filteredGenreUsers ', filteredGenreUsers)
    return (
        <>
            <nav className="bg-gradient-to-r from-fuchsia-950 to-indigo-950">
                <div className="animate-ping" onClick={explore}>🔍</div>
            </nav>
            {user &&
                <div className="dashboard">
                    <ChatContainer user={user} />

                    <div className="swipe-container bg-fuchsia-200">

                        <img src="../src/assets/bgswipe.jpg" />

                        <div className="card-container">

                            {filteredGenreUsers?.map((genreUser) =>
                                <TinderCard
                                    className="swipe"
                                    key={genreUser.user_id}
                                    onSwipe={(dir) => swiped(dir, genreUser.user_id)}
                                    onCardLeftScreen={() => outOfFrame(genreUser.name)}>
                                    <div
                                        style={{ backgroundImage: "url(" + genreUser.url + ")" }}
                                        className="card">
                                        <h1>{genreUser.name}</h1>
                                        <div className="mt-96 animate-pulse">
                                            <h3 className="font-mono text-6xl">{genreUser.bio}</h3>
                                        </div>
                                    </div>



                                </TinderCard>
                            )}
                            <div className="swipe-info">
                                {lastDirection ? <p className="text-4xl font-mono font-bold text-violet-950">You swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}
export default Dashboard