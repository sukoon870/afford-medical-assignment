import React, { useMemo } from "react";
import { User } from "../../types";
import { getRandomAvatar, getRandomColor } from "../../utils/imageUtils";

type UserCardProps = {
    user: User;
    rank: number;
};

const UserCard: React.FC<UserCardProps> = ({ user, rank }) => {
    const avatar = useMemo(() => getRandomAvatar(user.id), [user.id]);
    const bgColor = useMemo(() => getRandomColor(), []);

    return (
        <div
            className={`card flex items-center p-6 ${bgColor} border border-gray-200`}
        >
            <div className="relative flex-shrink-0">
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {rank}
                </div>
                <img
                    src={avatar}
                    alt={`${user.name}'s avatar`}
                    className="w-16 h-16 rounded-full bg-white p-1"
                />
            </div>
            <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                    {user.name}
                </h3>
                <p className="text-gray-600 text-sm">User ID: {user.id}</p>
                <div className="mt-1 flex items-center">
                    <span className="text-blue-600 font-medium">
                        {user.totalComments}
                    </span>
                    <span className="ml-1 text-gray-500 text-sm">
                        total comments
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
