const express = require('express')
const { createAddress, getAddressByUser, getSelectedAddress, updateAddress, deleteAddress, getAddressById } = require('../controller/addressController')
const userAuth = require('../middlewares/userAuth')

const router = express.Router()

router.post('/',userAuth,createAddress)
router.get('/:user',getAddressByUser)
router.get('/selectedAddress/:user',getSelectedAddress)
router.get('/getAddressById/:id',getAddressById)
router.put('/:id',userAuth,updateAddress)
router.delete('/:id',userAuth,deleteAddress)



module.exports =router