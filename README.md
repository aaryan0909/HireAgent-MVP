# 🔐 HireAgent MVP — The India-First AI Hiring Agent

**HireAgent** is an elite text-based AI recruiter designed to eliminate the "noise" in the hiring funnel. Built for the fast-paced Indian startup ecosystem, it acts as a conversational gatekeeper between founders and candidates.

## 🚀 Product Overview

In high-volume markets like India, hiring managers and founders are overwhelmed by low-quality, automated applications. **HireAgent** flips the script: instead of a public job board, it uses a text-only (WhatsApp-first) conversational flow to pre-screen every candidate before they are ever allowed to hit "Apply."

## 🛠️ What it Does

HireAgent automates the most tedious part of the recruiting process—the initial screen—through two primary conversational flows:

### 1. Founder/Manager Flow (The Intake)
*   **Conversational Scoping:** Instead of writing complex JDs, founders text the agent.
*   **Deep Context:** The agent extracts must-have skills, personality traits, and specific cultural trade-offs (e.g., "I'll take a junior with a high learning rate over a senior with poor communication").
*   **Instructional Setup:** Managers define exactly how they want shortlisted candidates to apply (link, email, or direct ping).

### 2. Candidate Flow (The Screen)
*   **Text-First Interaction:** Candidates chat with the agent via web or WhatsApp.
*   **Experience Context:** The agent collects more than just a resume; it gets the "vibe," preferences, and personality traits.
*   **Selective Application:** Candidates do **not** get the application link immediately. They are only invited to apply if the AI confirms a strong match.

## 💎 How it Helps (Value Proposition)

*   **For Founders:** Saves 40+ hours per month spent on "first-look" resume screening. You only talk to humans who are already pre-qualified for both skills and personality.
*   **For Candidates:** Provides instant feedback. No more "black hole" applications where you never hear back.
*   **For the Startup:** Reduces "time-to-hire" and ensures culture-fit matches that lead to better retention.

## 🧠 AI Matching Logic

HireAgent doesn't just look for keywords. It uses the **Gemini 3 Pro** model to perform multi-dimensional analysis:

1.  **Skills Match:** technical competency and core experience.
2.  **Personality Fit:** alignment with the specific team culture described by the founder.
3.  **Trade-off Weighting:** prioritizing the specific compromises the founder is willing to make.

## 🏗️ Technical Stack

*   **Frontend:** React 19, Tailwind CSS (Responsive & Mobile-First).
*   **AI Engine:** Google Gemini API (`gemini-3-flash-preview` for high-speed chat, `gemini-3-pro-preview` for complex matching).
*   **Backend Strategy:** Fastify (Node.js) with Postgres for state management and Pinecone for vector-based candidate similarity (Architectural Spec).

---

*Built with an MVP mindset: Speed, Clarity, and Pragmatism.*
