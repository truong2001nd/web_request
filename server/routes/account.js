const express = require('express');
const router = express.Router()
const argon2d = require('argon2');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/admin.js')

const Account = require('../models/account.js')
const Permission = require('../models/permission.js');

router.post('/',verifyToken, async (req,res) => {
    const{username,password,permission,manage} = req.body
    if(!username||!password)
        return res.status(400).json({success:false, message:'Missing username and/or password'});
    

    try {
        const account = await Account.findOne({username: username})
        if(account){
            return res.status(400).json({success:false, message:'User not found'});
        }
        const hashedPassword = await argon2d.hash(password)
        const permissionObject = await Permission.findById(permission).lean();
        if (!permissionObject) {
            return res.status(400).json({ success: false, message: 'Invalid permission' });
        }
        const newAccount = new Account ({
            username,
            password:hashedPassword,
            permission:permissionObject._id,
            manage:req.adminId

        })
        await newAccount.save()
        const accessToken = jwt.sign(
			{
                 accountId: newAccount._id,
             },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})
        
    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


module.exports = router