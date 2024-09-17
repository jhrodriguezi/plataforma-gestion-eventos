import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Token not provied" });

    jwt.verify(token, process.env.AUTH_TOKEN_SECRET as string, (err, usr) => {
        if(err) return res.status(403).json({ message: "Token not valid" });
        req.body.user = usr;
        next();
    })
}