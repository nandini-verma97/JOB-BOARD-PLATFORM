import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { applyJob, getaApplicants, getAppliedJob, updateStatus } from "../controllers/application.controller.js";


const router = express.Router();
router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJob);
router.route("/:id/applicants").get(isAuthenticated, getaApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;


