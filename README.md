# YouTube Downloader

## Project Overview

This YouTube Downloader is a web application that allows users to download videos from YouTube in various formats and qualities. It consists of a backend server built with Node.js and Express, and a frontend interface created using React and Chakra UI.

## Features

- Download YouTube videos as MP4 or MP3 files
- Select video quality for MP4 downloads (360p, 480p, 720p, 1080p)
- User-friendly interface with responsive design
- Real-time feedback with loading animations and toast notifications
- Automatic quality selection if the requested quality is unavailable

## Technical Stack

### Backend
- Node.js
- Express
- ytdl-core: For YouTube video processing and downloading
- CORS: For handling cross-origin requests
- dotenv: For environment variable management

### Frontend
- React: For building the user interface
- Vite: As the build tool and development server
- Chakra UI: For styled and accessible React components
- Axios: For making HTTP requests to the backend

## How It Works

1. Users enter a YouTube URL into the input field on the frontend.
2. They select the desired format (MP4 or MP3) and quality (for MP4).
3. Upon clicking the download button, the frontend sends a request to the backend.
4. The backend validates the URL, processes the video, and sends the file back to the frontend.
5. The frontend then triggers the download in the user's browser.

## Project Structure

- The backend handles video processing and file serving.
- The frontend provides a user interface for input and initiates the download process.
- Error handling is implemented on both ends to ensure a smooth user experience.
