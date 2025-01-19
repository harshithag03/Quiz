# Quiz Application

A modern, responsive quiz application built with React, TypeScript, and Tailwind CSS.

## Features

- Email-based user identification
- 15 questions fetched from Open Trivia Database
- 30-minute countdown timer
- Question navigation with status indicators
- Detailed report page with score and answer comparison
- Responsive design for all device sizes
- Smooth transitions and animations
- Modern, clean UI

## Technical Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router for navigation
- Zustand for state management
- Lucide React for icons

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Main application pages
- `/src/store` - State management using Zustand
- `/src/types` - TypeScript type definitions

## Implementation Details

### State Management
- Used Zustand for efficient state management
- Stores quiz state including:
  - User email
  - Questions and answers
  - Timer state
  - Navigation history

### Components
- Timer with auto-submit functionality
- Question navigation with visual indicators
- Responsive layout using Tailwind CSS

### Routing
- Protected routes ensuring proper flow
- Automatic redirects for invalid routes

## Assumptions

1. Users have a stable internet connection
2. Questions from the API are in English
3. Each question has one correct answer
4. The API will return valid data in the expected format

## Challenges and Solutions

1. **Timer Implementation**
   - Challenge: Maintaining accurate countdown across component updates
   - Solution: Used React useEffect with proper cleanup

2. **State Persistence**
   - Challenge: Maintaining quiz state during navigation
   - Solution: Implemented centralized state management with Zustand

3. **Responsive Design**
   - Challenge: Ensuring good UX across devices
   - Solution: Used Tailwind CSS with mobile-first approach

4. **Question Navigation**
   - Challenge: Tracking visited and answered questions
   - Solution: Implemented efficient state tracking with Sets and Records

## Browser Compatibility

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)