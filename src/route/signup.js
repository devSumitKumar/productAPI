const express = require("express")
const router = express.Router()
const { handleSaveUser } = require("../controllers/user")

router.post("/", handleSaveUser)

module.exports = router