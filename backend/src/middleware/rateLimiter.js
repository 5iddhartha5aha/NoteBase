import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key"); // Use a unique key for each user or IP address in production
        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }
        next(); // Call the next middleware function

    } catch (error) {
        console.error("Error in rate limiter:", error);
        next(error); // Pass the error to the next middleware (error handler)
    }
}

export default rateLimiter;