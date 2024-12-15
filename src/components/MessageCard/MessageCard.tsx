import React from 'react';
import { Card, Badge } from 'react-bootstrap';

interface MessageProps {
    status: string;
    text: string;
    dateCreate: string;
    dateUpdate: string;
    dateFinish: string;
}

const MessageCard: React.FC<MessageProps> = ({ status, text, dateCreate, dateUpdate, dateFinish }) => {
    const formatDate = (date: string) => {
        return date === "0001-01-01T00:00:00Z"
            ? "Не завершено"
            : new Date(date).toLocaleString();
    };

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Card.Title>
                    {text}
                </Card.Title>
                <Card.Text><Badge bg={status === "завершён" ? "success" : "warning"}>{status}</Badge></Card.Text>
                <hr />
                <div className="text-muted">
                    <p>Создано: {new Date(dateCreate).toLocaleString()}</p>
                    <p>Обновлено: {new Date(dateUpdate).toLocaleString()}</p>
                    <p>Завершено: {formatDate(dateFinish)}</p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default MessageCard;