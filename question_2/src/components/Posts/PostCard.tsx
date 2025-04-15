import React, { useMemo } from "react";
import { Post } from "../../types";
import { getRandomPostImage } from "../../utils/imageUtils";

type PostCardProps = {
    post: Post;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const postImage = useMemo(() => getRandomPostImage(post.id), [post.id]);

    return (
        <div className="card overflow-hidden">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={postImage}
                    alt={`Post ${post.id}`}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                        User ID: {post.userId}
                    </span>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {post.commentCount}{" "}
                        {post.commentCount === 1 ? "comment" : "comments"}
                    </div>
                </div>
                <p className="text-gray-700 mb-2">{post.content}</p>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <button className="btn-secondary text-sm">
                            <svg
                                className="w-4 h-4 mr-1 inline"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                            Comment
                        </button>
                    </div>
                    <span className="text-xs text-gray-500">
                        Post ID: {post.id}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
