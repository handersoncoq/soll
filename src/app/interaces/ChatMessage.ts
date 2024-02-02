export interface ChatMessage {
    text: string;
    own: boolean;
    timestamp: Date;
    senderName: string;
    pinned?: boolean;
    fromGroupLeader?: boolean
}