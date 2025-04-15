import { env } from "./env";
import fs from "fs";
import path from "path";
import axios from "axios";
import { Post, TokenResponse } from "./types";

const loadAuthConfig = () => {
    try {
        const authConfigPath = path.join(__dirname, "../auth.json");
        return JSON.parse(fs.readFileSync(authConfigPath, "utf-8"));
    } catch (error) {
        console.error("Failed to load auth configuration", error);
        throw new Error("Could not load authentication configuration");
    }
};

/**
 * Authenticates with the server and gets a new access token
 * @returns Token response with access token and expiration
 */
export const getAuthToken = async (): Promise<TokenResponse> => {
    try {
        const response = await axios.post(
            `${env.TEST_SERVER_ENDPOINT}/auth`,
            loadAuthConfig(),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data as TokenResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                `Failed to authenticate with the server: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
        throw new Error("Failed to authenticate with the server");
    }
};

export class TokenManager {
    private static accessToken: string | null = null;
    private static expiresAt: number = 0;
    private static renewalTimer: NodeJS.Timeout | null = null;
    private static tokenFilePath: string = path.join(
        __dirname,
        "../.token-cache.json"
    );

    private constructor() {}

    public static initialize(): void {
        TokenManager.loadTokenFromStorage();
    }
    private static loadTokenFromStorage(): void {
        try {
            if (fs.existsSync(TokenManager.tokenFilePath)) {
                const tokenData = JSON.parse(
                    fs.readFileSync(TokenManager.tokenFilePath, "utf-8")
                );
                const currentTime = Math.floor(Date.now() / 1000);
                if (tokenData.expiresAt > currentTime + 600) {
                    TokenManager.accessToken = tokenData.accessToken;
                    TokenManager.expiresAt = tokenData.expiresAt;
                    TokenManager.scheduleRenewal();
                }
            }
        } catch (error) {
            console.warn("Failed to load token from storage", error);
        }
    }

    private static saveTokenToStorage(): void {
        try {
            fs.writeFileSync(
                TokenManager.tokenFilePath,
                JSON.stringify(
                    {
                        accessToken: TokenManager.accessToken,
                        expiresAt: TokenManager.expiresAt,
                    },
                    null,
                    2
                ),
                "utf-8"
            );
        } catch (error) {
            console.warn("Failed to save token to storage", error);
        }
    }

    private static scheduleRenewal(): void {
        if (TokenManager.renewalTimer) {
            clearTimeout(TokenManager.renewalTimer);
        }

        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilRenewal = Math.max(
            0,
            (TokenManager.expiresAt - currentTime - 600) * 1000
        );

        TokenManager.renewalTimer = setTimeout(async () => {
            await TokenManager.renewToken();
        }, timeUntilRenewal);
    }

    private static async renewToken(): Promise<void> {
        try {
            const tokenResponse = await getAuthToken();
            TokenManager.accessToken = tokenResponse.access_token;

            TokenManager.expiresAt = tokenResponse.expires_in;
            TokenManager.saveTokenToStorage();
            TokenManager.scheduleRenewal();
        } catch (error) {
            console.error("Failed to renew token", error);
            TokenManager.renewalTimer = setTimeout(async () => {
                await TokenManager.renewToken();
            }, 60000);
        }
    }

    public static async getAccessToken(): Promise<string> {
        const currentTime = Math.floor(Date.now() / 1000);
        if (
            !TokenManager.accessToken ||
            TokenManager.expiresAt <= currentTime + 600
        ) {
            await TokenManager.renewToken();
        }

        if (!TokenManager.accessToken) {
            throw new Error("Failed to get a valid access token");
        }

        return TokenManager.accessToken;
    }
}

TokenManager.initialize();

/**
 * Fetches all users from the test server
 * @returns Array of users with id and name
 */
export const getUsers = async () => {
    try {
        const accessToken = await TokenManager.getAccessToken();

        const response = await axios.get(`${env.TEST_SERVER_ENDPOINT}/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.data.users) {
            throw new Error("No users found");
        }

        return response.data.users as Record<string, string>;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                `Failed to fetch users: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
        throw new Error("Failed to fetch users");
    }
};

/**
 * Fetches all posts for a specific user
 * @param userId ID of the user whose posts to fetch
 * @returns Array of Post objects
 */
export const getUserPosts = async (userId: number): Promise<Post[]> => {
    try {
        const accessToken = await TokenManager.getAccessToken();

        const response = await axios.get(
            `${env.TEST_SERVER_ENDPOINT}/users/${userId}/posts`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.data.posts) {
            throw new Error(`No posts found for user ${userId}`);
        }

        return response.data.posts as Post[];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                `Failed to fetch posts for user ${userId}: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
        throw new Error(`Failed to fetch posts for user ${userId}`);
    }
};

/**
 * Fetches all comments for a specific post
 * @param postId ID of the post whose comments to fetch
 * @returns Array of Comment objects
 */
export const getPostComments = async (postId: number): Promise<Comment[]> => {
    try {
        const accessToken = await TokenManager.getAccessToken();

        const response = await axios.get(
            `${env.TEST_SERVER_ENDPOINT}/posts/${postId}/comments`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.data.comments) {
            throw new Error(`No comments found for post ${postId}`);
        }

        return response.data.comments as Comment[];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                `Failed to fetch comments for post ${postId}: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
        throw new Error(`Failed to fetch comments for post ${postId}`);
    }
};
