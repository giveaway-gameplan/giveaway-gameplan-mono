# Giveaway Gameplan

Giveaway Gameplan is a full-stack web application that aggregates and displays promotional giveaway events from major sports leagues (MLB, NFL, NBA, NHL, and more). Fans can easily explore upcoming games offering promotional items (bobbleheads, jerseys, hats, etc.) with filters by league, team, date, and day of the week.

---

## Features

- 🏟️ **Sports Giveaways Aggregator** – Collects and centralizes promotional events from official team websites.
- ⚡ **Fast Scraping Engine** – Puppeteer-based scraper that pulls data from sports teams' websites.
- 🔍 **Dynamic Filtering** – Search giveaways by team, league, date, or day of the week.
- 🎨 **Modern UI** – Built with Next.js 15+ (App Router) + TypeScript and styled with Tailwind CSS.
- 🗄️ **Robust Backend** – TypeScript Express API connected to PostgreSQL (hosted on AWS RDS).
- ☁️ **Secure Deployment** – Dockerized stack deployed to AWS EC2 with Cloudflare DNS + NGINX reverse proxy for SSL/TLS & DDoS protection.
- 📱 **Responsive Design** – Optimized for desktop and mobile users.

---

## Tech Stack

### Frontend
- [Next.js 15+ (App Router)](https://nextjs.org/) with TypeScript
- React Server Components + Client Components
- Tailwind CSS

### Backend
- [Express](https://expressjs.com/) with TypeScript
- REST API with typed routes and parameterized SQL queries
- PostgreSQL (AWS RDS)

### Scraper
- Puppeteer
- Collects giveaways across MLB, NFL, NBA, NHL (WNBA planned)

### Deployment & Infrastructure
- AWS EC2 + Elastic IP
- AWS RDS (Postgres)
- Docker Hub for images
- NGINX reverse proxy
- Cloudflare DNS & SSL

---

## Project Structure

```
/ui        → Next.js + TypeScript frontend
/api       → Express + TypeScript backend
/scrapers   → Puppeteer-based data collectors
````

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm
- Docker + Docker Compose
- PostgreSQL (local or RDS)

### Installation
```bash
# Clone the repo
git clone https://github.com/giveaway-gameplan/giveaway-gameplan-mono.git
cd giveaway-gameplan-mono

# Install dependencies (per repo)
cd ui && pnpm install
cd ../api && pnpm install
````

### Development

```bash
# Run frontend (Next.js)
cd ui
pnpm dev

# Run backend (Express API)
cd api
pnpm dev
```

### Build & Deploy

```bash
docker-compose up --build
```

---

## Roadmap

* [ ] Expand scraper coverage (NFL, NHL, NBA, WNBA, NCAA, MLS, minor leagues)
* [ ] User accounts + favorites tracking
* [ ] Calendar export (Google/Apple)
* [ ] Mobile app version with React Native

---

## Acknowledgments

* Inspired by the need for a **single source of truth** for sports giveaways.
* Thanks to the open-source community for the tools and libraries that made this possible.
