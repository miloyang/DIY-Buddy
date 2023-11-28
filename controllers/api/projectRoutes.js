const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a post route to create a project
router.post('/', withAuth, async (req, res) => {
    try {
        const newProject = await Project.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newProject);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Create a post route to delete a project
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const projectData = await Project.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!projectData) {
            res.status(404).json({ message: 'No project found with this id!'});
            return;
        }

        res.status(200).json(projectData);
    } catch (error) {
            res.status(500).json(error);
    }
});

module.exports = router;