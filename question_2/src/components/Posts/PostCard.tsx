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
                    className="w-full h-full object-cover rounded-lg"
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
                    <span className="text-xs text-gray-500">
                        Post ID: {post.id}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
