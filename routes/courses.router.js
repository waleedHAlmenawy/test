const express = require('express');
const app = express();

const router = express.Router();
const controllers = require('../controllers/course_controllers');
const auth = require('../middleware/auth.middleware');

router.get("/", controllers.rootMsg);


router.get("/api/v1/courses", controllers.getAllCourse);

router.get("/api/v1/courses/:id", controllers.getCoursesById);

router.post("/api/v1/courses", auth, controllers.createCourse);

router.patch("/api/v1/courses/:id", controllers.updateCourse);

router.delete("/api/v1/courses/:id", controllers.deleteCourse);

module.exports = router;