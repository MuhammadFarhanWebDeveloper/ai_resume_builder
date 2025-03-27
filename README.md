# ResumeCraft AI

ResumeCraft AI is an intelligent resume builder powered by Next.js, ShadCN, Tailwind CSS, MongoDB, and Gemini AI. It allows users to input their details and effortlessly generate professional resumes. The AI-powered summary generator crafts personalized summaries based on job titles and key details, enhancing the resume-building experience.

## Key Features

- AI-Powered Summary – Generates a professional summary using Google Gemini AI.
- Real-Time Editing – Instant updates with a seamless UI.
- Data Persistence – Store and update resumes with MongoDB
- Modern UI/UX – Built with ShadCN & Tailwind CSS for a sleek and responsive design.

## Installation

### Prerequisites

Ensure you have the following requirements:

- Node.js (>=18.x)
- MongoDB (local or cloud)
- Clerk API Key
- Gemini API Key

### Clone the Repository

```sh
git clone https://github.com/MuhammadFarhanWebDeveloper/ai_resume_builder.git
```

Create a `.env` file in the root directory of the project and configure your environment variables

```
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=paste-your-clerk-secret
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=paste-your-clerk-publishable-key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_GEMINI_API_KEY=paste-your-gemini-api-key
```

### Install Dependencies

```sh
npm install
```

### Run the Development Server:

```sh
npm run dev
```

Open http://localhost:3000 to see the app in action.
