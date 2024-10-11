<p align="center">
  <img src="./frontend/public/Logo.svg" alt="HireStack Logo" width="100">
</p>

<h1 align="center">HireStack</h1>

<p align="center">
  <a href="https://hirestackjobs.vercel.app/">https://hirestackjobs.vercel.app/</a>
</p>

<p align="center">
  <strong>Your real-time job search companion with an edge</strong>
</p>

<p align="center">
  <a href="#about">About</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a> •
  <a href="#contact">Contact</a>
</p>

---

## About

HireStack is designed for IT professionals seeking their next career opportunity. We aggregate job listings from top websites in real-time, providing you with comprehensive information to give you an edge in the hiring process.

## Key Features

🔍 **Real-time Job Aggregation**: Latest IT job postings from top websites<br>
📊 **Enhanced Job Insights**: Detailed information to boost your application<br>
🏷️ **Smart Tagging**: Easy filtering by skills, experience, and more<br>
📈 **Salary Comparisons**: Make informed decisions about compensation<br>
🔔 **Custom Alerts**: Get notified about jobs matching your criteria<br>
📚 **Career Resources**: Tips and guides for IT job seekers

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="NextAuth.js">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white" alt="tRPC">
</p>

## Getting Started

## Schema

- Other Attributes:
  - `job_title` (String)
  - `description` (String)
  - `province` (String)
  - `city` (String)
  - `company` (String)
  - `salary` (String or Number)
  - `job_type` (String)
  - `posted_date` (String or Timestamp)
  - `application_deadline` (String or Timestamp)
  - `required_skills` (List of Strings)
  - `experience_level` (String)
  - `education_requirements` (String)
  - `benefits` (String or List of Strings)
  - `remote_work` (Boolean or String)

## Job Card Specification

- `id`: Unique identifier for the job
- `job_title`: Full job title
- `company`: Company name
- `city`: City of the job location
- `province`: Province of the job location
- `salary`: Salary information (if available)
- `job_type`: Type of employment (e.g., full-time, part-time)
- `posted_date`: Date when the job was posted
- `remote_work`: Indication if remote work is possible

Example:

```typescript
interface JobCard {
  id: string;
  job_title: string;
  company: string;
  city: string;
  province: string;
  salary?: string | number;
  job_type: string;
  posted_date: string;
  remote_work: boolean | string;
}
```

## Run front end 

1. Clone the repository and add enviroment variables 

   ```bash
   git clone https://github.com/AdamKhalif8254/Hirestack.git
   cd Hirestack/frontend
   touch .env
   
   ```

2. Run Docker

  For local development you can only size in with discord

   ```bash
   npm run docker:compose:watch
   ```

## Authors

HireStack was created and is maintained by:

- Adam Khalif
- Ahmed El farra
- Abdul.M Ali
- Ammar Alzureiq