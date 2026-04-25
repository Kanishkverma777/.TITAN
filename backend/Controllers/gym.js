const Gym = require('../Modals/gym')
const Member = require('../Modals/member');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken');

exports.register = async(req,res)=>{
    try{
        const {userName ,password, gymName, profilePic,email} = req.body;

        const isExist = await Gym.findOne({userName});
        if(isExist){
            return res.status(400).json({error:"UserName already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newGym = new Gym({
            userName,
            password: hashPassword,
            gymName,
            profilePic,
            email
        });

        await newGym.save();
        res.status(201).json({message:"Gym registered successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}

const cookieOptions = {
    httpOnly: true,
    secure: true, // Required for cross-site cookies on Render
    sameSite: 'none', // Required for Vercel to talk to Render
    maxAge: 24 * 60 * 60 * 1000 // 1 day
};

exports.login = async(req,res)=>{
    try{
        const {userName,password} = req.body;

        const gym = await Gym.findOne({ userName });
        
        if(gym && await bcrypt.compare(password,gym.password)){
            const token = jwt.sign({gym_id: gym._id}, process.env.JWT_SecretKey, {expiresIn: '1d'});
            
            res.cookie('cookie_token', token, cookieOptions).json({
                message: 'Logged in successfully',
                gym: {
                    _id: gym._id,
                    userName: gym.userName,
                    gymName: gym.gymName,
                    profilePic: gym.profilePic,
                    email: gym.email
                }
            });

        }else{
            res.status(400).json({ error: 'Invalid credentials' });
        }


    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});



exports.sendOtp = async (req,res)=>{
    try{

        const {email} = req.body;
        const gym = await Gym.findOne({email});
        if(gym){

            const buffer = crypto.randomBytes(4); // Get random bytes
            const token = (buffer.readUInt32BE(0) % 900000 + 100000).toString(); // Modulo to get a 6-digit number
            gym.resetPasswordToken = token;
            gym.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry date

            await gym.save();

            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'Password Reset OTP',
                text: `Your OTP for password reset is: ${token}. It is valid for 1 hour.`
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({message: "OTP sent to your email"});
  
        }else{
            return res.status(400).json({ error: 'Gym not found' });
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}


exports.checkOtp = async(req,res)=>{
    try{
        const {email,otp} = req.body;
        const gym = await Gym.findOne({
            email,
            resetPasswordToken: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if(!gym){
            return res.status(400).json({error: "Invalid or expired OTP"});
        }

        res.status(200).json({message:"OTP is Successfully Verified"})

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}


exports.resetPassword=async(req,res)=>{
    try{
        const {email,newPassword} = req.body;

        const gym = await Gym.findOne({email});

        if(!gym){
            return res.status(400).json({ error: 'Some Technical Issue , please try again later' });
        }

        const salt = await bcrypt.genSalt(10);
        gym.password = await bcrypt.hash(newPassword, salt);
        gym.resetPasswordToken = undefined;
        gym.resetPasswordExpires = undefined;

        await gym.save();

        res.status(200).json({message:"Password Reset Successfully"})

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}


exports.logout = async(req,res)=>{
    res.clearCookie('cookie_token', cookieOptions).json({ message: 'Logged out successfully' });
}

exports.updateGym = async (req, res) => {
    try {
        const { gymName, email, profilePic, address, contact } = req.body;
        const gym = await Gym.findByIdAndUpdate(
            req.gym._id,
            { gymName, email, profilePic, address, contact },
            { new: true }
        ).select('-password');
        
        res.status(200).json({ message: "Gym updated successfully", gym });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
}

exports.getOverview = async (req, res) => {
    try {
        const gymId = req.gym._id;
        const totalMembers = await Member.countDocuments({ gym: gymId });
        
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        const monthlyMembers = await Member.countDocuments({
            gym: gymId,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });

        const next3Days = new Date(now);
        next3Days.setDate(now.getDate() + 3);
        const expiring3Days = await Member.countDocuments({
            gym: gymId,
            nextBillDate: { $gte: now, $lte: next3Days }
        });

        const next4Days = new Date(now);
        next4Days.setDate(now.getDate() + 4);
        const next7Days = new Date(now);
        next7Days.setDate(now.getDate() + 7);
        const expiring7Days = await Member.countDocuments({
            gym: gymId,
            nextBillDate: { $gte: next4Days, $lte: next7Days }
        });

        const expiredMembers = await Member.countDocuments({
            gym: gymId,
            nextBillDate: { $lt: now }
        });

        res.status(200).json({
            totalMembers,
            monthlyMembers,
            expiring3Days,
            expiring7Days,
            expiredMembers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
}