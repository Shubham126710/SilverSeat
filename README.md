<div align="center">
  <img src="public/logo-github.png" alt="Artemis Logo" width="350" />
  <p align="center">
    <br/>
    <strong>A premium, high-performance cinematic ticketing and seat reservation platform.</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  </p>

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

---

## 📖 Overview

**Artemis** is a state-of-the-art web application designed for the modern moviegoer. It provides a sleek, high-performance, and deeply immersive interface for browsing movies, viewing cinematic details, and securely booking premium theater seats. 

Built with aesthetic excellence at its core, Artemis leverages a glassmorphism design language with subtle neon accents and micro-animations to create a luxurious user experience. The platform redefines digital ticketing with advanced authentication, interactive dashboards, intelligent search, and real-time movie trailers.

## ✨ Features

- **Premium Cinematic UI/UX**: A dark-mode first, highly polished glassmorphism interface featuring dynamic ribbed glass scanlines, glowing neon accents, and smooth Framer Motion micro-animations designed to awe users.
- **Dynamic Personalized Dashboard**: A deeply interactive user hub that greets users dynamically based on the time of day, tracks upcoming bookings, and provides personalized "For You" movie recommendations.
- **Rich Movie Metadata & Trailers**: Seamless integration with TMDB/IMDb for rich, accurate movie metadata and embedded high-quality YouTube trailers directly within the sleek movie details pane.
- **Secure Next-Gen Authentication**: Robust credential and OAuth login systems built on Better Auth, featuring flawless **One-Click Google Login** and secure session handling (with a fallback bypass mode for development).
- **Intelligent Search & Wishlisting**: A lightning-fast search tab for finding blockbusters and a one-click Wishlist system to save highly anticipated movies to your profile.
- **Mock Payment & Wallet System**: A frictionless, beautiful checkout flow supporting multiple saved credit cards and a built-in Artemis Wallet balance.
- **Interactive Promotions & Notifications**: A real-time dropdown system for managing unread alerts and easily copying dynamic promotional codes for discounts.
- **Seamless Database ORM**: Powered by Prisma and PostgreSQL for rapid data modeling and type-safe, high-speed backend queries.

## 📸 Gallery

<details>
<summary><b>Click to view UI Screenshots</b></summary>
<br/>

![1. Loading Screen](public/Screenshots/1.%20loading.png)
*1. The cinematic loading screen that welcomes users to Artemis.*

![2. Main Hero Section](public/Screenshots/2.%20hero(main).png)
*2. Striking hero banner highlighting the latest blockbuster releases.*

![3. Brand Movies](public/Screenshots/3.%20hero(brand:movies).png)
*3. Movies beautifully categorized by major cinematic brands and studios.*

![4. Login & Register](public/Screenshots/4.%20login:register.png)
*4. Seamless authentication flow with secure credentials and OAuth integration.*

![5. Onboarding - Genre Selection](public/Screenshots/5.%20onboarding(genre)%20.png)
*5. Users select their favorite genres to build their taste profile.*

![6. Onboarding - Movie Rating](public/Screenshots/6.%20onboarding(movie).png)
*6. Interactive swipe deck to fine-tune personalized movie recommendations.*

![7. Home Hub](public/Screenshots/7.%20home%20hub.png)
*7. The central dashboard featuring dynamic greetings and curated movie lists.*

![8. Search Tab](public/Screenshots/8.%20search.png)
*8. Lightning-fast search interface to explore the extensive movie catalog.*

![9. My Bookings](public/Screenshots/9.%20my%20booking.png)
*9. Dedicated tab to track and manage upcoming cinema visits.*

![10. Promotional Offers](public/Screenshots/10.%20promo.png)
*10. Interactive dropdown for quick access to promotional codes and discounts.*

![11. Movie Overview](public/Screenshots/11.%20movie-details.png)
*11. Deep dive into movie metadata, synopsis, and immersive cinematic backgrounds.*

![12. Cast & Ratings](public/Screenshots/12.%20movie-ratings:cast.png)
*12. Detailed cast profiles and critical reception ratings.*

![13. Format Selection](public/Screenshots/13.%20booking(lang:format).png)
*13. Choosing the preferred language and viewing format (e.g., IMAX, 3D).*

![14. Theatre Selection](public/Screenshots/14.%20booking(theatre).png)
*14. Selecting the most convenient cinema location and showtime.*

![15. Seat Selection](public/Screenshots/15.%20booking(seats).png)
*15. Interactive, real-time seat map to reserve the perfect spot.*

![16. Order Summary](public/Screenshots/16.%20booking(summary).png)
*16. Clear breakdown of the order, including tickets, taxes, and applied promos.*

![17. Booking Confirmation](public/Screenshots/17.%20booking(confirmation).png)
*17. Final confirmation screen with a beautiful digital ticket ready for the show.*

</details>

## 🛠 Tech Stack

This project is built using modern, enterprise-ready web technologies tailored for speed and reliability.

- **Framework**: [Next.js 15 (Turbopack)](https://nextjs.org/)
- **Frontend**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom premium tokens and micro-animations
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)

### Project Structure

```bash
├── prisma/             # SQLite schema & migrations
├── public/             # Static assets, logos, and images
├── src/
│   ├── app/            # Next.js App Router (Pages, API Routes, Layouts)
│   ├── components/     # Reusable React UI Components
│   └── lib/            # Utilities, Authentication Config, and Prisma Client
└── README.md           # You are here
```

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubham126710/Artemis.git
   cd Artemis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   BETTER_AUTH_SECRET="your_super_secret_auth_key"
   DATABASE_URL="file:./dev.db"
   
   # For Google OAuth
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   ```

4. **Initialize Database**
   Run Prisma migrations to build your schema and generate the client:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to launch Artemis.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <sub>Built with ❤️ by Shubham Upadhyay</sub>
</div>
