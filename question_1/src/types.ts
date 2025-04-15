export type UserWithCommentCount = {
    id: string;
    name: string;
    totalComments: number;
};

export type PostWithCommentCount = {
    id: number;
    userId: number;
    content: string;
    commentCount: number;
    timestamp?: number;
};

export type Post = {
    id: number;
    userId: number;
    content: string;
};
export type Comment = {
    id: number;
    postId: number;
    content: string;
};

export type TokenResponse = {
    token_type: string;
    access_token: string;
    expires_in: number;
};
