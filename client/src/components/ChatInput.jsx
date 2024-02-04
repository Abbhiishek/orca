import { useState } from 'react'
import axios from 'axios'

const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages }) => {
    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea
        }

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/message`, { message })
            getUserMessages()
            getClickedUsersMessages()
            setTextArea("")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="chat-input">
            <textarea className="border-2 border-[#2b0d40]" placeholder="Ask your favourite artist..." value={textArea} onChange={(e) => setTextArea(e.target.value)} />
            <button className="secondary-button" onClick={addMessage}>Submit</button>
        </div>
    )
}

export default ChatInput