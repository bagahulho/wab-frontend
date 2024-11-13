import {Chat} from "../../modules/types.ts";
import {FC} from "react";
import "./ChatCard.css"
import {Link} from "react-router-dom";
import mock_img from "../../assets/defaultIcon.png"
type ChatCardProps = {
    chat: Chat;
}

const ChatCard: FC<ChatCardProps> = ({chat}) => {
    return (
        <Link to={`/chats/${chat.id}`} className="contact-card">
            <div className="avatar">
                <img src={chat.img || mock_img} alt="Avatar"/>
            </div>
            <div className="contact-info">
                <h3>{chat.name}</h3>
                <p>{chat.info}</p>
            </div>
        </Link>
    );
};

export default ChatCard;