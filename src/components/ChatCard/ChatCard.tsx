import {Chat} from "../../modules/types.ts";
import {FC} from "react";
import "./ChatCard.css"

type ChatCardProps = {
    chat: Chat;
}

const ChatCard: FC<ChatCardProps> = ({chat}) => {
    return (
        <a href={`/chats/${chat.id}`} className="contact-card">
            <div className="avatar">
                <img src={chat.img} alt="Avatar"/>
            </div>
            <div className="contact-info">
                <h3>{chat.name}</h3>
                <p>{chat.info}</p>
            </div>
        </a>
    );
};

// const ChatCard: FC<ChatCardProps> = ({chat}) => {
//     return (
//         <div className="profile-container">
//             <div className="profile-image">
//                 <img
//                     src={chat.img || 'https://stekloinstrument.ru/image/avatarka.png'}
//                     alt={chat.name}
//                 />
//             </div>
//             <div className="profile-details">
//                 <h2>{chat.name}</h2>
//                 <p><b>Имя пользователя:</b> {chat.nickname}</p>
//                 <p><b>Друзья:</b> {chat.friends}</p>
//                 <p><b>Подписчики:</b> {chat.subscribers}</p>
//                 <p><b>Информация:</b> {chat.info}</p>
//             </div>
//         </div>
//     )
// }

export default ChatCard;