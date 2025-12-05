import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("anonymous"); // we can add user id to make ratelimit by user it works if i have authentification
    if (!success) {
      return res
        .status(429)
        .json({ message: "too many requests , please try again later " });
    }
    next();
  } catch (error) {
    console.log("ratelimite error ", error);
    next(error);
  }
};
export default ratelimiter;
