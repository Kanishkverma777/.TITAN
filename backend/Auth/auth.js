const Gym = require('../Modals/gym');
const jwt = require('jsonwebtoken');


const auth = async (req,res,next) =>{
    try{
        let token = req.cookies?.cookie_token;
        
        if (!token && req.headers.authorization) {
            if (req.headers.authorization.startsWith('Bearer ')) {
                token = req.headers.authorization.split(' ')[1];
            } else {
                token = req.headers.authorization;
            }
        }

        if(!token){
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        const jwtSecret = process.env.JWT_SecretKey || 'default_titan_secret_key_12345';
        const decode = jwt.verify(token, jwtSecret);
        
        req.gym = await Gym.findById(decode.gym_id).select('-password');
        if (!req.gym) {
            return res.status(401).json({ error: 'User not found' });
        }

        next();

    }catch(err){
        res.status(401).json({ error: 'Token is not valid' });
    }
}

module.exports = auth;