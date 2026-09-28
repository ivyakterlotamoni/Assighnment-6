# FitLog — Workout Library

FitLog is a responsive workout library website where users can explore workouts, view workout details, create a daily workout plan, and save workouts for later.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- REST API
- LocalStorage
- Vercel

## Features

- Responsive workout library for mobile, tablet, and desktop
- Browse workout cards with duration, calories, equipment, and rating
- View detailed information for each workout
- Add workouts to Today's Plan
- Save workouts for later
- View and manage Today's Plan and Saved workouts
- Sort workouts by Duration, Calories, and Rating
- Mark workouts as completed
- Remove workouts from the plan
- Plan and Saved counters update dynamically
- 404 Not Found page
- Loading state while workout data is loading
- Toast notifications for user actions

## API

FitLog uses the FitLog REST API to load workout data.

### All Workouts

`https://api.api-store.workers.dev/api/fitlog`

### Workout Details

`https://api.api-store.workers.dev/api/fitlog/:id`

## Project Structure

```text
app/
├── my-plan/
├── workout/
│   └── [id]/
├── not-found.tsx
├── layout.tsx
├── page.tsx
└── globals.css

public/
├── hero-image.png
└── logo-image.png
# FitLog — Workout Library

FitLog is a responsive workout library website...

## Technologies Used
...

## Features
...

## API
...

## Project Structure
...

## Getting Started

Install the dependencies:

npm install

Run the development server:

npm run dev

...

## Build

npm run build

## Author

Ivy Akter