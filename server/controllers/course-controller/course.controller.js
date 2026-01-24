const Course = require('../../models/Course');
const createCrudController = require('../common/crud.controller');

const crud = createCrudController(Course);

module.exports = {
    ...crud,
    // Override getById to populate sections and chapters
    async getById(req, res) {
        try {
            const course = await Course.findById(req.params.id)
                .populate({
                    path: 'sections',
                    match: { isDeleted: false },
                    populate: {
                        path: 'chapters',
                        match: { isDeleted: false }
                    }
                });
            if (!course || course.isDeleted) return res.status(404).json({ success: false, message: 'Not found' });
            res.json({ success: true, data: course });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    // Override getAll to filter by instructor (createdBy)
    async getInstructorCourses(req, res) {
        try {
            const instructorId = req.user._id;
            const courses = await Course.find({ createdBy: instructorId, isDeleted: false });
            res.json({ success: true, data: courses });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    // Override create to associate with instructor
    async create(req, res) {
        try {
            const courseData = {
                ...req.body,
                createdBy: req.user._id,
                updatedBy: req.user._id
            };
            const item = new Course(courseData);
            await item.save();
            res.status(201).json({ success: true, data: item });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },

    // Custom clone course logic
    async cloneCourse(req, res) {
        try {
            const originalCourse = await Course.findById(req.params.id);
            if (!originalCourse) return res.status(404).json({ success: false, message: 'Course not found' });

            const courseObj = originalCourse.toObject();
            delete courseObj._id;
            delete courseObj.createdAt;
            delete courseObj.updatedAt;

            courseObj.title = `${courseObj.title} (Copy)`;
            courseObj.status = 'Draft';
            courseObj.createdBy = req.user._id;

            const newCourse = new Course(courseObj);
            await newCourse.save();

            res.status(201).json({ success: true, data: newCourse });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
};
