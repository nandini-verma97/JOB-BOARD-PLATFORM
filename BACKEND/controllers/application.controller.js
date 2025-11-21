
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: 'Job Id is required',
                success: false
            })
        }
        //user already applied for the job or not
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: 'You have already applied for this job',
                success: false
            })
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: 'Job not found',
                success: false
            })
        }
        //create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })
        job.application.push(newApplication._id);
        await job.save();
        return res.status(200).json({
            message: "Job applied successfully",
            success: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
};
export const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "No application",
                success: false
            })
        }
        return res.status(200).json({
            application,
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
};
//admin dekhega kitna user applied kiya hai
export const getaApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'application',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "status is required.",
                success: false
            })
        };
        //find the application by applicant id
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: 'Application not found',
                success: false
            })
        }
        //update status
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: 'Status updated successfully',
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
}