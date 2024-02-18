import { User } from "./User";

export interface ChatMessage {
    text: string;
    own: boolean;
    timestamp: Date;
    sender: User;
    pinned?: boolean;
    fromGroupLeader?: boolean
}