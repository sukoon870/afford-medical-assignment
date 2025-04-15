import React, { useState } from "react";
import useSWR from "swr";
import { fetchLatestPosts } from "../services/api";
import PostCard from "../components/Posts/PostCard";
import Layout from "../components/Layout/Layout";

const FeedPage: React.FC = () => {
    const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

    const {
        data: posts,
        error,
        isLoading,
        isValidating,
        mutate,
    } = useSWR("/posts?type=latest", () => fetchLatestPosts(), {
        refreshInterval: autoRefresh ? 30000 : 0, // Refresh every 30 seconds if autoRefresh is true
        revalidateOnFocus: autoRefresh,
        revalidateOnReconnect: true,
        dedupingInterval: 5000, // Prevent duplicate requests within 5 seconds
    });

    return (
        <Layout>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Live Feed
                    </h1>
                    <p className="text-gray-600">Latest posts in real-time</p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Auto-refresh:</span>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={autoRefresh}
                            onChange={() => setAutoRefresh((prev) => !prev)}
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>

            {isLoading && !posts && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">
                        Failed to fetch latest posts. Please try again later.
                    </span>
                </div>
            )}

            {!isLoading && !error && (!posts || posts.length === 0) && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">
                        No posts found in the feed. Check back later!
                    </span>
                </div>
            )}

            {isValidating && posts && posts.length > 0 && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">Refreshing feed...</span>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts &&
                    posts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={() => mutate()}
                    className="btn inline-flex items-center"
                    disabled={isValidating}
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
                    Refresh Feed Now
                </button>
            </div>
        </Layout>
    );
};

export default FeedPage;
