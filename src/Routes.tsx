export const ROUTES = {
    HOME: "/",
    CHATS: "/chats",
    MESSAGES: "/messages",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    CHATS: "Чаты",
    MESSAGES: "Сообщения"
};