# Responsive Portfolio Website

A responsive full-stack portfolio website developed for the **Cognevance Technologies Full Stack Web Developer project task**. It showcases personal information, technical skills, projects, and a contact form with backend integration.

## Live Demo

- **Live Website:** https://cognevance-responsiveportfoliowebsite.onrender.com
- **GitHub Repository:** https://github.com/MohdMasiUddin/cognevance_responsivePortfolioWebsite

## Project Overview

The portfolio website includes:

- Responsive landing page
- About section with profile summary
- Skills section showcasing technical skills
- Projects showcase
- Contact form with backend validation
- Database integration for storing contact messages
- Mobile-friendly navigation and animations

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Deployment:** Render
- **Version Control:** Git and GitHub

## Project Structure

```text
cognevance_responsivePortfolioWebsite/
├── backend/
├── data/
├── docs/
│   └── screenshots/
├── frontend/
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Prerequisites

- Node.js and npm
- Git
- A PostgreSQL database for contact form storage

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/MohdMasiUddin/cognevance_responsivePortfolioWebsite.git
cd cognevance_responsivePortfolioWebsite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Set `DATABASE_URL` to your PostgreSQL connection string.

For local development, configure it in your environment or a properly configured `.env` file. Never commit database credentials or other secrets to GitHub.

### 4. Start the Server

```bash
npm start
```

### 5. Open the Website

Visit:

http://localhost:8080

The application uses the configured port, with port 8080 as the local default.

## API Endpoints

- `GET /api/health` — Checks whether the backend is running.
- `POST /api/contact` — Validates and stores contact form submissions.

## Contact Form Workflow

1. A visitor fills out the contact form.
2. The frontend sends the submitted information to the backend.
3. The backend validates the required fields.
4. Valid submissions are stored in the PostgreSQL database.
5. The visitor receives a success or error response.

## Deployment

The application is configured for deployment on Render.

Live Demo: https://cognevance-responsiveportfoliowebsite.onrender.com

The deployed application requires the appropriate database configuration and environment variables.

## Screenshots

Project screenshots and design previews are maintained in the `docs/screenshots/` directory.

## Future Enhancements

- Add project filtering.
- Improve accessibility and performance.
- Add email notifications for contact submissions.
- Develop a secure admin dashboard for viewing contact messages.

## Author

**Mohd Masi Uddin**

GitHub: https://github.com/MohdMasiUddin

## License

This project is intended for educational and portfolio purposes. Add an MIT `LICENSE` file if you choose to distribute it under the MIT License.
