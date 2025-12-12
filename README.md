# Purpose:Punch!

![React 19.2](https://img.shields.io/badge/React-19.2-087EA4)
![Vite 7.2](https://img.shields.io/badge/Vite-7.2-ffc51d)
![Tailwind CSS 4.1](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8)

**Purpose** of this app: To **punch** you for every decision you have made but never achieved. Now every such uncompleted decision will be put on public display, and you can already feel **punched** out!

![Community Feed](./public/CommunityFeed.png)

<details>
<summary>More screenshots</summary>

![Create new Decision](./public/CreateDecision.png)  
![Your Decisions](./public/Dashboard.png)

</details>

## Concept

Users log significant decisions with reasoning and expectations.  
After a reflection period, users record outcomes and lessons learned.  
Users can optionally publish anonymized reflections for others to browse, learn from, or get inspired by.

## Tech Stack

- **Framework:** React (via Vite)
- **Language:** TypeScript (Strict typing for DTOs, Enums, and Props)
- **Styling:** Tailwind CSS
- **Routing:** React Router v7 (Protected & Public Routes)
- **HTTP Client:** Axios (Global interceptors for Auth & Error Handling)
- **Utilities:** clsx & tailwind-merge for intelligent style composition

## Getting Started

### Prerequisites

- Node.js (v20+)
- The [PurposePunch Backend](https://github.com/Donkrzawayan/PurposePunch-backend) configured via .env.

### Installation

```pwsh
npm install # dependencies
npm run dev
```
