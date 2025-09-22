const express = require('express')
const jobSchema = require('../modules/job.module')
const router = express.Router();

router.get('/alljob', async (req, res) => {
    try {
        const job = await jobSchema.find()
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json({succes:false,message:"Failed to fetch jobs. Please try again later.",error:error.message})
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
        res.status(500).json({message:"something went wrong",error:error })
    }
})

router.post('/addjobpost', async (req, res) => {
    try {
        const { companyName, position, location, status, description } = req.body
        const newjob = new jobSchema({ companyName, position, location, status, description })
        await newjob.save();
        res.status(201).json({ message: "new job is add succesfully", job: newjob })
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error})
        console.log(error, "something went wrong");
    }
})
router.patch('/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const newValue = await jobSchema.findByIdAndUpdate(id,{status:req.body.status},{new:true})
        // if(!newValue){
        //     res.status(400).json({message:'job not found',status:false});
        // }
        res.status(200).json({message:"success",user:newValue
        })
        
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error})
    }
})
module.exports = router;    