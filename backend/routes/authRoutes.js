import express from "express";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { protect } from "../middleware/auth.js";


const router = express.Router();


function generateToken(user) {

  return jwt.sign(

    {
      id: user._id,
      role: user.role
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d"
    }

  );

}


// REGISTER

router.post(
  "/register",
  async (req, res, next) => {

    try {

      const {
        name,
        email,
        password,
        role = "student",
        college,
        department,
        year
      } = req.body;


      if (
        !name ||
        !email ||
        !password
      ) {

        return res.status(400).json({
          message:
            "name, email and password are required"
        });

      }


      if (
        ![
          "student",
          "tutor",
          "admin"
        ].includes(role)
      ) {

        return res.status(400).json({
          message: "Invalid role"
        });

      }


      const user = await User.create({

        name,
        email,
        password,
        role,
        college,
        department,
        year

      });


      const userObject =
        user.toObject();

      delete userObject.password;


      res.status(201).json({

        message:
          "Registration successful",

        user: userObject,

        token:
          generateToken(user)

      });

    }

    catch (error) {

      next(error);

    }

  }
);


// LOGIN

router.post(
  "/login",
  async (req, res, next) => {

    try {

      const {
        email,
        password
      } = req.body;


      const user =
        await User
          .findOne({ email })
          .select("+password");


      if (
        !user ||
        !(await user.comparePassword(password))
      ) {

        return res.status(401).json({

          message:
            "Invalid email or password"

        });

      }


      const userObject =
        user.toObject();

      delete userObject.password;


      res.json({

        message:
          "Login successful",

        user: userObject,

        token:
          generateToken(user)

      });

    }

    catch (error) {

      next(error);

    }

  }
);


// LOGOUT

router.post(
  "/logout",
  (req, res) => {

    res.json({

      message:
        "Logout successful. Remove the JWT from the client."

    });

  }
);


// CURRENT USER

router.get(
  "/me",
  protect,
  (req, res) => {

    res.json({
      user: req.user
    });

  }
);


export default router;