import express, { Request, Response, NextFunction } from "express";
import { env } from "./env";
import { getUsers, getUserPosts, getPostComments } from "./test-server-utils";
import { PostWithCommentCount, UserWithCommentCount } from "./types";
import cors from "cors";

const cache = {
    users: new Map<string, UserWithCommentCount>(),
    posts: new Map<number, PostWithCommentCount>(),
    lastUpdated: 0,
    // 30sec
    cacheExpiration: 30 * 1000,
};

const app = express();
app.use(
    cors({
        methods: ["GET", "POST"],
        origin: ["http://localhost:3000"],
    })
);
app.use(express.json());

const refreshDataIfNeeded = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const now = Date.now();
    if (
        now - cache.lastUpdated > cache.cacheExpiration ||
        cache.users.size === 0
    ) {
        try {
            await refreshAllData();
            next();
        } catch (error) {
            console.error("Failed to refresh data:", error);
            res.status(500).json({
                error: "Failed to retrieve data from the server",
            });
        }
    } else {
        next();
    }
};

const refreshAllData = async () => {
    console.log("Refreshing data...");
    cache.users.clear();
    cache.posts.clear();

    const users = await getUsers();

    for (const userId in users) {
        const userName = users[userId];

        cache.users.set(userId, {
            id: userId,
            name: userName,
            totalComments: 0,
        });

        try {
            const posts = await getUserPosts(parseInt(userId));

            for (const post of posts) {
                try {
                    const comments = await getPostComments(post.id);
                    const commentCount = comments.length;

                    cache.posts.set(post.id, {
                        id: post.id,
                        userId: post.userId,
                        content: post.content,
                        commentCount: commentCount,
                        // timestamp not provided in the api so using post id as proxy
                        timestamp: post.id,
                    });

                    const userCached = cache.users.get(userId);
                    if (userCached) {
                        userCached.totalComments += commentCount;
                    }
                } catch (error) {
                    console.error(
                        `Failed to get comments for post ${post.id}:`,
                        error
                    );
                }
            }
        } catch (error) {
            console.error(`Failed to get posts for user ${userId}:`, error);
        }
    }

    cache.lastUpdated = Date.now();
    console.log("Data refresh complete");
};

app.get("/", (req: Request, res: Response): void => {
    res.send("Social Media Analytics API");
});

app.get("/users", refreshDataIfNeeded, (req: Request, res: Response): void => {
    const topUsers = Array.from(cache.users.values())
        .sort((a, b) => b.totalComments - a.totalComments)
        .slice(0, 5)
        .map((user) => ({
            id: user.id,
            name: user.name,
            totalComments: user.totalComments,
        }));

    res.json({
        users: topUsers,
        timestamp: new Date().toISOString(),
    });
});

app.get("/posts", refreshDataIfNeeded, (req: Request, res: Response): void => {
    const type = (req.query?.type as string) || "popular";

    if (type !== "popular" && type !== "latest") {
        res.status(400).json({
            error: "Invalid type parameter. Use 'popular' or 'latest'.",
        });
        return;
    }

    const posts = Array.from(cache.posts.values());
    let resultPosts: PostWithCommentCount[] = [];

    if (type === "popular") {
        const maxComments = Math.max(...posts.map((post) => post.commentCount));
        resultPosts = posts
            .filter((post) => post.commentCount === maxComments)
            .map((post) => ({
                id: post.id,
                userId: post.userId,
                content: post.content,
                commentCount: post.commentCount,
            }));
    } else {
        resultPosts = posts
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
            .slice(0, 5)
            .map((post) => ({
                id: post.id,
                userId: post.userId,
                content: post.content,
                commentCount: post.commentCount,
            }));
    }

    res.json({
        type,
        posts: resultPosts,
        timestamp: new Date().toISOString(),
    });
});

app.listen(env.PORT || 3000, () => {
    console.log(`Server is running on port ${env.PORT || 3000}`);
    refreshAllData().catch((error) => {
        console.error("Initial data refresh failed:", error);
    });
});
