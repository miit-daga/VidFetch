import express from "express";
import cors from "cors";
import ytdl from "@distube/ytdl-core";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const qualityMap = {
    "360p": [18, 134, 243],
    "480p": [35, 135, 244],
    "720p": [22, 136, 247],
    "1080p": [37, 137, 248]
};

const qualityOrder = ["360p", "480p", "720p", "1080p"];

app.get("/download", async (req, res) => {
    try {
        const { url, format, quality } = req.query;

        if (!ytdl.validateURL(url)) {
            return res.status(400).json({ error: "Invalid YouTube URL" });
        }

        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");

        res.header("Content-Disposition", `attachment; filename="${title}.${format}"`);

        if (format === "mp3") {
            res.header("Content-Type", "audio/mpeg");
            ytdl(url, { filter: "audioonly", quality: "highestaudio" }).pipe(res);
        } else {
            res.header("Content-Type", "video/mp4");
            let selectedFormat;
            if (quality && qualityMap[quality]) {
                const availableFormats = info.formats.map(format => format.itag);
                const desiredIndex = qualityOrder.indexOf(quality);
                for (let i = desiredIndex; i < qualityOrder.length; i++) {
                    const possibleItags = qualityMap[qualityOrder[i]];
                    selectedFormat = possibleItags.find(itag => availableFormats.includes(itag));
                    if (selectedFormat) break;
                }
            }
            ytdl(url, { quality: selectedFormat || "highest" }).pipe(res);
        }
    } catch (error) {
        console.error("Error downloading video:", error);
        res.status(500).json({ error: "Failed to process request" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
