export type User = {
    id: string;
    name: string;
    totalComments: number;
    avatar?: string;
};

export type Post = {
    id: number;
    userId: number;
    content: string;
    commentCount: number;
    image?: string;
};

export type TopUsersResponse = {
    users: User[];
    timestamp: string;
};

export type PostsResponse = {
    type: "popular" | "latest";
    posts: Post[];
    timestamp: string;
};
