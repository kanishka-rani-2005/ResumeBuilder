import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

//   console.log("AUTH HEADER:", authHeader); // DEBUG

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("DECODED:", decoded); // DEBUG
    req.userId = decoded.id;
    next();
  } catch (error) {
    // console.log("JWT ERROR:", error.message); // DEBUG
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;
