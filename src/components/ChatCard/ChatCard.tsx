import {Chat} from "../../modules/types.ts";
import {FC} from "react";
import "./ChatCard.css"
import {Link} from "react-router-dom";
import mock_img from "../../assets/defaultIcon.png"
type ChatCardProps = {
    chat: Chat;
    onAddToMessage: () => void;
}

const ChatCard: FC<ChatCardProps> = ({chat, onAddToMessage}) => {
    return (
        <>
        <div className="contact-card">
            <Link to={`/chats/${chat.id}`} className="contact-card link">
                <div className="avatar">
                    <img src={chat.img || mock_img} alt="Avatar"/>
                </div>
                <div className="contact-info">
                    <h3>{chat.name}</h3>
                    <p>{chat.info}</p>
                </div>
            </Link>
            <button
                className="add-btn"
                onClick={onAddToMessage}
            >
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95043 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95044C4.00437 6.17301 6.173 4.00437 8.95043 3.35288C10.9563 2.88238 13.0437 2.88238 15.0496 3.35288C17.827 4.00437 19.9956 6.173 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496Z" stroke="#0095FF" strokeWidth="1.5"/>
                    <path d="M20.6471 15.0496C21.1176 13.0437 21.1176 10.9563 20.6471 8.95043C19.9956 6.173 17.827 4.00437 15.0496 3.35288C13.0437 2.88238 10.9563 2.88238 8.95043 3.35288C6.173 4.00437 4.00437 6.17301 3.35288 8.95044C2.88237 10.9563 2.88237 13.0437 3.35288 15.0496C4.00437 17.827 6.17301 19.9956 8.95043 20.6471" stroke="#363853" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M14.5 12H9.5M12 14.5L12 9.5" stroke="#0095FF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </button>
        </div>
        </>
    );
};

export default ChatCard;