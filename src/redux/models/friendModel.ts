import { FriendTypeEnum } from "utils/enums";

export interface Friend {
    id: number;
    username: string;
}

export interface FriendActionPayload<T> {
    friendType: FriendTypeEnum;
    actionContext?: T;
}
