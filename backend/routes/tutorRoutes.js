import express from "express";

import TutorProfile from "../models/TutorProfile.js";
import Doubt from "../models/Doubt.js";

import {
  protect,
  allow
} from "../middleware/auth.js";

import {
  findTutorMatches
} from "../services/tutorMatching.js";


const router = express.Router();


// --------------------------------------------------
// GET ALL TUTORS
// --------------------------------------------------

router.get(
  "/",
  async (req, res, next) => {

    try {

      const query = {
        isVerified: true
      };


      if (req.query.subject) {

        query.subjects = {
          $regex:
            req.query.subject,

          $options: "i"
        };

      }


      const profiles =
        await TutorProfile

          .find(query)

          .populate(
            "userId",
            "name email profileImage college department"
          );


      res.json({

        count:
          profiles.length,

        tutors:
          profiles

      });

    }

    catch (error) {

      next(error);

    }

  }
);


// --------------------------------------------------
// MATCH TUTORS TO DOUBT
// --------------------------------------------------

router.get(
  "/matches/:doubtId",

  protect,

  async (req, res, next) => {

    try {

      const doubt =
        await Doubt.findById(
          req.params.doubtId
        );


      if (!doubt) {

        return res.status(404).json({

          message:
            "Doubt not found"

        });

      }


      const matches =
        await findTutorMatches(
          doubt
        );


      res.json({
        matches
      });

    }

    catch (error) {

      next(error);

    }

  }
);


// --------------------------------------------------
// GET TUTOR PROFILE
// --------------------------------------------------

router.get(
  "/:id",

  async (req, res, next) => {

    try {

      const profile =
        await TutorProfile

          .findOne({
            userId:
              req.params.id
          })

          .populate(
            "userId",
            "name email profileImage college department"
          );


      if (!profile) {

        return res.status(404).json({

          message:
            "Tutor not found"

        });

      }


      res.json({
        tutor:
          profile
      });

    }

    catch (error) {

      next(error);

    }

  }
);


// --------------------------------------------------
// UPDATE TUTOR PROFILE
// --------------------------------------------------

router.put(
  "/profile",

  protect,

  allow("tutor"),

  async (req, res, next) => {

    try {

      const allowedFields = [

        "bio",
        "subjects",
        "topics",
        "skills",
        "availability",
        "verifiedSubjects"

      ];


      const data =
        Object.fromEntries(

          Object.entries(
            req.body
          ).filter(
            ([key]) =>
              allowedFields.includes(key)
          )

        );


      const profile =
        await TutorProfile.findOneAndUpdate(

          {
            userId:
              req.user._id
          },

          {
            $set:
              data
          },

          {
            new: true,
            upsert: true
          }

        );


      res.json({

        message:
          "Tutor profile updated",

        profile

      });

    }

    catch (error) {

      next(error);

    }

  }
);


// --------------------------------------------------
// UPDATE AVAILABILITY
// --------------------------------------------------

router.put(
  "/availability",

  protect,

  allow("tutor"),

  async (req, res, next) => {

    try {

      const profile =
        await TutorProfile.findOneAndUpdate(

          {
            userId:
              req.user._id
          },

          {
            $set: {
              availability:
                req.body.availability || []
            }
          },

          {
            new: true,
            upsert: true
          }

        );


      res.json({

        availability:
          profile.availability

      });

    }

    catch (error) {

      next(error);

    }

  }
);


export default router;