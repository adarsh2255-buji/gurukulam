import jwt from 'jsonwebtoken';

const generateToken = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, 
    { expiresIn: '24h' });
        res.cookie('jwt', token, {
        httpOnly: true,
        secure : process.env.NODE_ENV === 'production' ? true : false,
        sameSite : 'strict',
        maxAge :30 * 24 * 60 * 60 * 1000
    });
    return token;
}

export default generateToken; 