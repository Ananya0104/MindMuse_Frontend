# MindMuse Frontend

MindMuse is an AI-powered mental wellness companion. It helps users understand their thoughts, reconnect with their emotions, and build habits that nurture peace. The app features journaling, mood tracking, emergency contacts, and interactive AI chat, all built with a modern Next.js/React stack and a beautiful, responsive UI.

---

## 🚀 Features
- **AI Chat Buddy**: Conversational AI for mental wellness support
- **Journaling**: Create, edit, and manage journal entries
- **Mood Tracking**: Visualize and track your mood over time
- **Emergency Contacts**: Manage and quickly access emergency contacts
- **Surveys & Self-Reflection**: Take surveys and view results
- **Dark/Light Theme**: Seamless theme switching
- **Responsive Design**: Works beautifully on all devices

---

## 🛠️ Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (v9+ recommended)

---

## ⚡️ Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd MindMuse_Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

5. **Lint the code:**
   ```bash
   npm run lint
   ```

---

## ⚙️ Project Structure
- `src/app/` — Next.js app directory (pages, layouts, routes)
- `src/components/` — Reusable UI and logic components
- `src/constants/` — App-wide constants (API endpoints, navigation, etc.)
- `src/contexts/` — React context providers
- `src/hooks/` — Custom React hooks
- `src/interfaces/` — TypeScript interfaces and types
- `src/lib/` — Utility libraries (API, auth, etc.)
- `public/` — Static assets (images, icons)

---

## 🌐 Environment Variables
Some features (like Google login, Stripe, or Maps) may require environment variables. Create a `.env.local` file in the root and add any required keys:

```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_key
NEXT_PUBLIC_Maps_API_KEY=your_maps_key
```

---

## 🧑‍💻 Usage
- Visit `/signup` to create an account
- Use `/login` to sign in
- Access your dashboard, journal, mood tracker, and chat buddy from the sidebar
- Add emergency contacts in the Emergency section
- Take surveys and view results

---

## 📝 Attributions: Open-Source Libraries & Tools

| Name & Version | License | Role | Source Link |
|---|---|---|---|
| [Next.js](https://nextjs.org/) v15.3.3 | MIT | Main React framework, routing, SSR | [GitHub](https://github.com/vercel/next.js) |
| [React](https://react.dev/) v19.0.0 | MIT | UI library | [GitHub](https://github.com/facebook/react) |
| [React DOM](https://react.dev/) v19.0.0 | MIT | React DOM rendering | [GitHub](https://github.com/facebook/react) |
| [Tailwind CSS](https://tailwindcss.com/) v4.x | MIT | Utility-first CSS framework | [GitHub](https://github.com/tailwindlabs/tailwindcss) |
| [@radix-ui/react-accordion](https://www.radix-ui.com/primitives/docs/components/accordion) v1.2.11 | MIT | Accessible UI primitives | [GitHub](https://github.com/radix-ui/primitives) |
| [@radix-ui/react-label](https://www.radix-ui.com/primitives/docs/components/label) v2.1.7 | MIT | Accessible UI primitives | [GitHub](https://github.com/radix-ui/primitives) |
| [@radix-ui/react-radio-group](https://www.radix-ui.com/primitives/docs/components/radio-group) v1.3.7 | MIT | Accessible UI primitives | [GitHub](https://github.com/radix-ui/primitives) |
| [@radix-ui/react-slot](https://www.radix-ui.com/primitives/docs/components/slot) v1.2.2 | MIT | Accessible UI primitives | [GitHub](https://github.com/radix-ui/primitives) |
| [@radix-ui/react-tabs](https://www.radix-ui.com/primitives/docs/components/tabs) v1.1.12 | MIT | Accessible UI primitives | [GitHub](https://github.com/radix-ui/primitives) |
| [@react-three/drei](https://github.com/pmndrs/drei) v10.3.0 | MIT | 3D helpers for react-three-fiber | [GitHub](https://github.com/pmndrs/drei) |
| [@splinetool/react-spline](https://github.com/splinetool/react-spline) v4.0.0 | MIT | 3D scene integration | [GitHub](https://github.com/splinetool/react-spline) |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) v1.9.3 | MIT | Confetti animation | [GitHub](https://github.com/catdad/canvas-confetti) |
| [class-variance-authority](https://github.com/cornetto/class-variance-authority) v0.7.1 | MIT | Utility for conditional classNames | [GitHub](https://github.com/cornetto/class-variance-authority) |
| [clsx](https://github.com/lukeed/clsx) v2.1.1 | MIT | Utility for className composition | [GitHub](https://github.com/lukeed/clsx) |
| [date-fns](https://date-fns.org/) v4.1.0 | MIT | Date utilities | [GitHub](https://github.com/date-fns/date-fns) |
| [lucide-react](https://lucide.dev/) v0.510.0 | ISC | Icon library | [GitHub](https://github.com/lucide-icons/lucide) |
| [next-themes](https://github.com/pacocoursey/next-themes) v0.4.6 | MIT | Theme switching | [GitHub](https://github.com/pacocoursey/next-themes) |
| [react-datepicker](https://reactdatepicker.com/) v8.4.0 | MIT | Date picker UI | [GitHub](https://github.com/Hacker0x01/react-datepicker) |
| [sonner](https://sonner.emilkowal.ski/) v2.0.3 | MIT | Toast notifications | [GitHub](https://github.com/emilkowal/sonner) |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) v3.3.0 | MIT | Merge Tailwind classes | [GitHub](https://github.com/dcastil/tailwind-merge) |
| [uuid](https://github.com/uuidjs/uuid) v11.1.0 | MIT | Unique ID generation | [GitHub](https://github.com/uuidjs/uuid) |
| [@types/*](https://github.com/DefinitelyTyped/DefinitelyTyped) | MIT | TypeScript type definitions | [GitHub](https://github.com/DefinitelyTyped/DefinitelyTyped) |
| [TypeScript](https://www.typescriptlang.org/) v5.x | Apache-2.0 | Type safety | [GitHub](https://github.com/microsoft/TypeScript) |
| [ESLint](https://eslint.org/) v9.x | MIT | Linting | [GitHub](https://github.com/eslint/eslint) |
| [tw-animate-css](https://github.com/stevenjoezhang/tw-animate-css) v1.2.9 | MIT | Tailwind animation utilities | [GitHub](https://github.com/stevenjoezhang/tw-animate-css) |

---

## 📄 License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements
- All open-source authors and contributors whose work made this project possible.
- The Next.js, React, and Tailwind CSS communities for their amazing tools and documentation.

---

## 💬 Contributing
Pull requests and issues are welcome! Please open an issue to discuss your idea or bug before submitting a PR.

---

## 📫 Contact
For questions, feedback, or support, please contact the project maintainer at [your-email@example.com].
