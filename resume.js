const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParseModule = require("pdf-parse");

// Compatibility wrapper for pdf-parse
const pdfParse = typeof pdfParseModule === "function"
    ? pdfParseModule
    : async (buf) => {
        const parser = new pdfParseModule.PDFParse({ data: buf });
        return await parser.getText();
    };

// =========================
// MULTER SETUP
// =========================
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// =========================
// RESUME UPLOAD ROUTE
// =========================
router.post(
    "/upload",
    upload.single("resume"),
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please upload a PDF resume"

                });

            }


            // =========================
            // READ PDF
            // =========================

            const pdfBuffer =
                fs.readFileSync(
                    req.file.path
                );


            // =========================
            // EXTRACT TEXT
            // =========================

            const pdfData =
                await pdfParse(
                    pdfBuffer
                );


            const resumeText =
                (pdfData && pdfData.text) ? pdfData.text.trim() : "";


            if (!resumeText) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Could not extract text from this PDF"

                });

            }


            // =========================
            // BASIC INFORMATION
            // =========================

            const wordCount =
                resumeText
                    .split(/\s+/)
                    .filter(Boolean)
                    .length;


            console.log(
                "Resume:",
                req.file.originalname
            );


            console.log(
                "Words:",
                wordCount
            );


            console.log(
                "Extracted text:",
                resumeText.substring(
                    0,
                    500
                )
            );


            // =========================
            // RESPONSE
            // =========================

            res.status(200).json({

                success: true,

                message:
                    "Resume analyzed successfully",

                file: {

                    originalName:
                        req.file.originalname,

                    filename:
                        req.file.filename,

                    size:
                        req.file.size

                },

                analysis: {

                    wordCount:
                        wordCount,

                    text:
                        resumeText

                }

            });


        } catch (error) {

            console.error(
                "Resume Analysis Error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to analyze resume"

            });

        }

    }
);

module.exports = router;