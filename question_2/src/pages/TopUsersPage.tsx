import React from "react";
import useSWR from "swr";
import { fetchTopUsers } from "../services/api";
import UserCard from "../components/Users/UserCard";
import Layout from "../components/Layout/Layout";

const TopUsersPage: React.FC = () => {
    const {
        data: users,
        error,
        isLoading,
        mutate,
    } = useSWR("/users", () => fetchTopUsers(), {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 10000, // Prevent duplicate requests within 10 seconds
    });

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Top Users
                </h1>
                <p className="text-gray-600">
                    Users with the most commented posts
                </p>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">
                        Failed to fetch top users. Please try again later.
                    </span>
                </div>
            )}

            {!isLoading && !error && (!users || users.length === 0) && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">
                        No users found. Check back later!
                    </span>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
                {users &&
                    users.map((user, index) => (
                        <UserCard key={user.id} user={user} rank={index + 1} />
                    ))}
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={() => mutate()}
                    className="btn inline-flex items-center"
                >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                    Refresh Data
                </button>
            </div>
        </Layout>
    );
};

export default TopUsersPage;
