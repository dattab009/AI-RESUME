const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();


// =================================
// REGISTER USER
// =================================

router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        // Check required fields

        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message: "All fields are required"

            });
        }


        // Check password length

        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must be at least 6 characters"

            });
        }


        // Check existing email

        const existingUser =
            await User.findOne({
                email: email.toLowerCase()
            });


        if (existingUser) {

            return res.status(400).json({

                success: false,

                message:
                    "Email is already registered"

            });
        }


        // Hash password

        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create user

        const user =
            await User.create({

                name: name.trim(),

                email: email.toLowerCase().trim(),

                password: hashedPassword

            });


        // Success response

        res.status(201).json({

            success: true,

            message:
                "Registration successful",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });


    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Server error during registration"

        });

    }

});


module.exports = router;