const express = require('express')
const jobSchema = require('../modules/job.module')
const router = express.Router();

router.get('/alljob', async (req, res) => {
    try {
        const job = await jobSchema.find()
        res.status(200).json({ jobs: job })
    } catch (error) {
        console.log(error);
    }
})

router.get('/alljobs', async (req, res) => {
    try {
        const { status, companyName } = req.query;
        const filter = {}
        if (status) {
            filter.status = status;
        }
        if (companyName) {
            filter.companyName = new RegExp(companyName, "i");
        }
        const alljob = await jobSchema.find(filter);
       
        res.status(200).json(alljob)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post('/addjobpost', async (req, res) => {
    try {
        const { companyName, position, location, status, description } = req.body
        const newjob = new jobSchema({ companyName, position, location, status, description })
        await newjob.save();
        res.status(201).json({ message: "new job is add succesfully", job: newjob })
    } catch (error) {
        console.log(error, "something went wrong");
    }
})
module.exports = router;