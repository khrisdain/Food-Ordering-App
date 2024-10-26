import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization; 
    if (!authHeader) { return res.status(401).json({ success: false, message: "Not Authorized, Login again" })}


    try {
        // Extract the token from the "Bearer <token>" string
        const token = authHeader.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Automatically attach the user ID to the request body
        req.body.userId = decodedToken.id;
        
        next();
    } catch (error) {
        console.error("Error in authentication:", error);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authMiddleware;
