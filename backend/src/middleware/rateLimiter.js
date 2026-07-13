// import ratelimit from "../config/upstash.js";

// const rateLimiter = async (req, res, next) => {
//     try {
//         const {success} = await ratelimit.limit("my-limit-key"); // Use a unique key for each user or IP address in production
//         if (!success) {
//             return res.status(429).json({ message: "Too many requests, please try again later." });
//         }
//         next(); // Call the next middleware function

//     } catch (error) {
//         console.error("Error in rate limiter:", error);
//         next(error); // Pass the error to the next middleware (error handler)
//     }
// }

// export default rateLimiter;

import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    // Rate limiter disabled
    return next();

    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later."
            });
        }
        next();
    } catch (error) {
        console.error("Error in rate limiter:", error);
        next(error);
    }
};

export default rateLimiter;