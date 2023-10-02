const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/admin.js')


const permission = require('../models/permission.js')

// tao quyen 
router.post('/',verifyToken, async (req, res) => {
    const {title,description,manage} = req.body
    if(!title){
        return res
        .status(400)
        .json({ success: false, message: 'Title is required' })
    }
    try {
		const newPermission = new permission({
			title,
			description,
			manage: req.adminId

            
			
		})

		await newPermission.save()

		res.json({ success: true, message: 'Happy learning!', permission: newPermission })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
   
})

// xem tat ca quyen quyen da tao
router.get('/',verifyToken, async (req, res) => {
	try {
		const permissions = await permission.find( )
		
		res.json({ success: true, permissions })
		console.log(req.adminId)
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

//update lại permission
router.put('/update/:id',verifyToken, async (req, res) => {
	const {title,description, } = req.body

	if(!title){
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })
	}
	try{
		let updatePermission = {
			title: title ,
			description: description || '',
		} 
		//id của permission
		const updatePermissionCondition = {_id:req.params.id}
	


		updatePermission = await permission.findOneAndUpdate(
			updatePermissionCondition,
			updatePermission,
			{ new: true }
		)
		
		if (!updatePermission)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})
		res.json({
			success: true,
			message: 'Excellent progress!',
			post: updatePermission
		})	
			
	}
	catch(err){
		console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
router.delete('/delete/:id',verifyToken, async (req,res) => {
	try {
		const deletePermissionConditi = {_id:req.params.id}
		
		const deletePermission = await permission.findByIdAndDelete(deletePermissionConditi)
		if (!deletePermissionConditi) {
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})
		}
		res.json({ success: true, permission: deletePermission })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
module.exports = router