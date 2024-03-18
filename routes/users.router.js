const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users.controller');

router.get("/api/v1/users", controllers.findAllUsers);

router.post("/api/v1/users", controllers.createNewUser);

router.post("/api/v1/users/login", controllers.login);

module.exports = router;