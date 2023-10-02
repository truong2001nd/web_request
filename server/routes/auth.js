const express = require('express');
const router = express.Router()
const argon2d = require('argon2');
const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin.js');


router.post('/reg', async (req,res)=>{
    const {username,password} = req.body;
    
    if(!username||!password)
        return res.status(400).json({success:false, message:'Missing username and/or password'});
    try {
        const admin = await Admin.findOne({username: username})
        //check username ddax ton tai chua
        if(admin){
            return res.status(400).json({success:false, message:'User not found'});
        }
        // ma hoa mk
        const hashedPassword = await argon2d.hash(password)
        const newAdmin = new Admin ({username,password:hashedPassword})
        await newAdmin.save()

        // return token 
        const accessToken = jwt.sign(
			{ AdminId: newAdmin._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})
        
    }

    catch(err)  {
		console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
} )
// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
	const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const admin = await Admin.findOne({ username })
		if (!admin)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// Username found
		const passwordValid = await argon2d.verify(admin.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// All good
		// Return token
		const accessToken = jwt.sign(
			{ adminId: admin._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User logged in successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router