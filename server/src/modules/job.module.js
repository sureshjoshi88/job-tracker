const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    appliedDate: { type: Date ,default: Date.now() },
    status: { type: String, required: true, enum: ['applied', 'reject', 'pending'],default:"applied" },
    description: { type: String, required: true }
})


module.exports = mongoose.model('job', jobSchema)