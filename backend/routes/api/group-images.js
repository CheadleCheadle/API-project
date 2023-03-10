const express = require("express");
const router = require('express').Router();
const { Group, Membership, GroupImage, User, Venue, Event, Attendance, EventImage} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const {  handleCustomValidationErrors } = require('../../utils/validation');

//Delete an Image for a Group

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req;
    let { imageId } = req.params;
    imageId = parseInt(imageId);
    const image = await GroupImage.findByPk(imageId, {include: Group});

    if (!image) {
        return res.status(404).json({message: "Group Image couldn't be found", statusCode: 404});
    }


    const currentMembership = await Membership.findOne({
        where: {
            userId: user.id,
            groupId: image.dataValues.groupId
        }
    });

    if (!currentMembership && user.id !== image.dataValues.Group.dataValues.organizerId) {
        return res.status(403).json({message: "Forbidden", status: 403});
    }

    if (["host", "co-host"].includes(currentMembership.dataValues.status) || image.dataValues.Group.dataValues.organizerId === user.id) {
        await image.destroy();
        return res.status(200).json({message: "Successfully deleted", statusCode: 200});
    } else {
        return res.status(403).json({message: "Forbidden", statusCode: 403});
    }
})

module.exports = router;
