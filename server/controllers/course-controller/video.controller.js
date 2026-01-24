// controllers/instructor-controller/videocontent.controller.js
const VideoContent = require('../../models/VideoContent');
const createCrudController = require('../common/crud.controller');

// Custom VideoContent Controllers for LMS

// Get all video contents (optionally by chapter)
exports.getAllVideoContents = async (req, res) => {
	try {
		const filter = {};
		if (req.query.chapter) filter.chapter = req.query.chapter;
		const videos = await VideoContent.find(filter);
		res.json({ success: true, data: videos });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Get video content by ID
exports.getVideoContentById = async (req, res) => {
	try {
		const video = await VideoContent.findById(req.params.id);
		if (!video) return res.status(404).json({ success: false, message: 'Not found' });
		res.json({ success: true, data: video });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Create video content
exports.createVideoContent = async (req, res) => {
	try {
		const video = new VideoContent(req.body);
		await video.save();
		res.status(201).json({ success: true, data: video });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Update video content
exports.updateVideoContent = async (req, res) => {
	try {
		const video = await VideoContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!video) return res.status(404).json({ success: false, message: 'Not found' });
		res.json({ success: true, data: video });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Delete video content
exports.deleteVideoContent = async (req, res) => {
	try {
		const video = await VideoContent.findByIdAndDelete(req.params.id);
		if (!video) return res.status(404).json({ success: false, message: 'Not found' });
		res.json({ success: true, message: 'Deleted' });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};
