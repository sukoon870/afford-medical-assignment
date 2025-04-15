import axios from "axios";
import { User, Post, TopUsersResponse, PostsResponse } from "../types";

const BASE_URL = "http://localhost:3001";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchTopUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get<TopUsersResponse>("/users");
        return response.data.users;
    } catch (error) {
        console.error("Error fetching top users:", error);
        throw error;
    }
};

export const fetchTrendingPosts = async (): Promise<Post[]> => {
    try {
        const response = await api.get<PostsResponse>("/posts?type=popular");
        return response.data.posts;
    } catch (error) {
        console.error("Error fetching trending posts:", error);
        throw error;
    }
};

export const fetchLatestPosts = async (): Promise<Post[]> => {
    try {
        const response = await api.get("/posts?type=latest");
        return response.data.posts;
    } catch (error) {
        console.error("Error fetching latest posts:", error);
        throw error;
    }
};

export default api;
