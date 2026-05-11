# Hokie Bucket List

 ### CS 4784 HCI Capstone Spring 2023 Group 5

Hokie Bucket List is a React and Firebase web app that helps Virginia Tech students discover nearby hikes, build personalized bucket lists, join groups, and compete through points-based outdoor activities.

Built as a 4-person HCI capstone project for CS 4784 in Spring 2023, the project was awarded 2nd place out of 41 teams at the [2023 Virginia Tech Undergraduate Research in Computer Science Symposium](https://hci.icat.vt.edu/news/congratulations-chci-students-and-their-advisors-who-received-vt.html).

## Project Highlights

- Designed and polished through user research, HCI-informed wireframing, and pilot testing.
- Built a responsive React interface backed by Firebase Authentication, Firestore, and Firebase Storage.
- Supported personalized hiking recommendations, group membership, invitations, leaderboards, geolocation-based hike tracking, and scavenger hunt photo uploads.
- Emphasized accessibility and cross-device usability for students planning and completing outdoor activities near campus.

## Tech Stack

- **Frontend:** React, React Router, Material UI, styled-components
- **Backend services:** Firebase Authentication, Cloud Firestore, Firebase Storage
- **Tooling:** Create React App, React Testing Library

## Core Features

- **Authentication:** Email/password signup, login, verification, and password reset through Firebase Authentication.
- **Personalized bucket list:** Users complete a questionnaire to generate a starting list of recommended hikes.
- **Group activity:** Users can create groups, invite members, leave groups, and contribute to group points.
- **Leaderboard:** Groups are ranked by total points.
- **Hike tracking:** Users can start and complete hikes using browser geolocation.
- **Scavenger hunts:** Users can upload photos for location-based activities.
- **Community photos:** Uploaded scavenger hunt images are shown in a shared community gallery.

## Firebase Configuration

This project uses Firebase's browser SDK. The Firebase web config in `src/backend/FirebaseConfig.js` identifies the Firebase project used by the app. These values are not equivalent to a private server secret, but Firebase security should still be enforced with Authentication, Firestore rules, and Storage rules.

If you fork or redeploy the project, create your own Firebase project and replace the config values with your own project settings.

## Project Status

This repository represents the original 2023 capstone implementation with lightweight GitHub-facing polish and package updates for security. The current goal is to preserve the project story, make the repo easier to understand, and avoid large rewrites or architecture changes.

## Notes

- The app depends on Firebase services and may require a configured Firebase project to exercise all flows locally.
- Geolocation-based features require browser location permissions.
- If using a mobile device, the screen must stay on to track location properly. It is recommended to turn your device's auto-lock setting to "off" or "never" and use a touch screen disabler, such as Guided Access (iOS), Interaction Control (Android), or a third-party app.
