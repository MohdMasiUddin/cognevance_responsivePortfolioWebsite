# Responsive Portfolio Website

A full-stack portfolio website built for the Cognevance Full Stack Web Developer project. The project includes a responsive frontend and a backend contact form that stores messages in a SQLite database.

## Project Overview

This portfolio website includes:
- Responsive landing page
- About section with profile summary
- Skills section with technology badges
- Projects showcase
- Contact form with backend validation
- Database integration for saving contact submissions
- Mobile-friendly navigation and animations

## Repository Naming

Recommended GitHub repository name:
- cognevance_responsivePortfolioWebsite

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: SQLite
- Deployment: Vercel / Netlify / Render / Railway

## Project Structure

- `backend/` – Express server, API routes, database setup
- `frontend/` – HTML, CSS, JavaScript for the portfolio UI
- `docs/screenshots/` – project screenshots and design previews

## Setup Instructions

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd cognevance_responsivePortfolioWebsite
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Start the backend server
   ```bash
   npm start
   ```

4. Open the app in your browser
   ```text
   http://localhost:8080
   ```

## API Endpoints

- `GET /api/health` – checks if the backend is running
- `POST /api/contact` – saves form submissions
- `GET /api/messages` – retrieves saved contact messages

## Contact Form Flow

1. User fills the contact form on the frontend.
2. Frontend sends data to the backend `/api/contact` endpoint.
3. Backend validates the submitted data.
4. The message is inserted into the SQLite database.
5. A success message is returned to the user.

## Deployment

You can deploy this project on:
- Render
- Railway
- Vercel for frontend static hosting plus separate backend host
- Netlify for static frontend + external server

For a simple deployment, Render or Railway is recommended because they support Node.js backend hosting.

## Screenshots

The project includes a sample visual preview in `docs/screenshots/portfolio-home.svg`.

## Future Enhancements

- Add portfolio project filtering
- Use a React front-end
- Add email notifications for new messages
- Add admin dashboard for viewing submissions
- Integrate with MongoDB or PostgreSQL

## Author

Alex Carter

## License

This project is licensed under the MIT License.
