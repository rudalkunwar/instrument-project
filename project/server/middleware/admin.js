const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    const token = req.headers["x-access-token"];
    console.log(token);
    console.log(req.headers);
    console.log("here i am");

  
 

    if (!token) {
        return res.status(403).json({ message: "Please login first" });
    }

    try {
        const decode = jwt.verify(token, 'shhhh');
        req.user = decode;
   

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
