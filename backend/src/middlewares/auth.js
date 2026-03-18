const jwt = require('jsonwebtoken');

function authMiddleware(req,res,next){
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).json({ error: 'Token não informado.' });
    }
}