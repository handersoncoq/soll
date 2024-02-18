import { GroupDetail } from "./GroupDetails";

export interface User {
    firstName: string,
    lastName: string,
    address: string,
    profilePic?: string,
    reputationScore: number,
    totalSavings?: number,
    groups?: GroupDetail[],
}