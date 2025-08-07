# 🚀 PitchCraft – AI-Powered Pitch Deck Generator

**PitchCraft** is a fullstack SaaS application that empowers founders and startups to create compelling, AI-generated pitch decks in minutes. Just enter your startup idea, and PitchCraft will generate a complete investor-ready pitch deck—with editable slides, collaboration, analytics, and premium export options.

---

## 🧠 Features

- ⚡ **AI-Powered Slide Generation**  
  Generate a full pitch deck from a single startup idea using OpenAI.

- ✍️ **Editable Slides**  
  Manually customize slide content using a clean, intuitive editor.

- 📊 **Dashboard Analytics**  
  Track pitch creation history, edit stats, and performance insights.

- 📁 **Project & Slide Management**  
  Organize slides into pitch projects, with support for multiple decks.

- 🤝 **Collaboration (Planned)**  
  Invite team members to collaborate on your deck in real-time.

- 📤 **PDF Export**  
  Download your deck as a professional PDF—perfect for sharing with investors.

- 💳 **Stripe-Based Premium Features**  
  Monetize with a tiered system: export, collaboration, and advanced AI features.

---

## 🧰 Tech Stack

| Layer         | Tech                             |
|---------------|----------------------------------|
| Frontend      | Next.js 14 (App Router), React.js, Tailwind CSS, ShadCN UI |
| Backend       | Next.js API Routes, OpenAI API, Stripe API |
| Database      | PostgreSQL + Prisma ORM          |
| Auth          | Clerk (User authentication)      |
| Deployment    | Vercel / Railway / Render        |

---

## 📸 Screenshots

> Coming soon — UI previews of pitch creation, editor, and dashboard.

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/pitchcraft.git
cd pitchcraft


2. Install dependencies
pnpm install
# or
npm install

3. Setup environment variables
DATABASE_URL=your_postgresql_url
OPENAI_API_KEY=your_openai_key
STRIPE_SECRET_KEY=your_stripe_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

4. Run development server
pnpm dev
# or
npm run dev


🧪 Features in Progress
✅ Slide generation (Done)

✅ Project and slide CRUD (Done)

✅ Stripe billing integration (Done)

🔄 Real-time collaboration (Planned)

🔄 Deck templates (Planned)

🔄 AI slide rewriter or enhancer (Planned)


✨ Inspiration
PitchCraft was born out of the need to simplify the process of building investor decks, especially for early-stage founders who need speed, clarity, and quality—all powered by AI.

📄 License
This project is licensed under the MIT License.

🙋‍♂️ Author
Tanujeet Singh
Full Stack Developer | Building SaaS & AI tools
Portfolio • LinkedIn • Twitter • GitHub

⭐️ Show Your Support
If you find this project useful:

Give it a ⭐️ on GitHub

Share with your startup network

Contribute or open issues for improvements