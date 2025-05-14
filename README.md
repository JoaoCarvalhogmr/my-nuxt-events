# MyNuxtEvents

A modern event management application built with Nuxt 3, allowing users to create, manage, and track their events in a beautiful and intuitive interface.

## 🌟 Features

- **User Authentication**: Secure authentication powered by Clerk
- **Event Management**: Create, view, and delete events
- **Event Categories**: Support for various event types (concerts, meetings, workshops, etc.)
- **Calendar View**: Interactive calendar interface for event visualization
- **Filtering**: Filter events by time (upcoming/past) and type
- **Responsive Design**: Beautiful UI that works on all devices
- **Dark Mode**: Built-in dark mode support
- **Real-time Updates**: Immediate feedback on event actions

## 🛠️ Technologies Used

- **Frontend Framework**: [Nuxt 3](https://nuxt.com/) - The Vue.js Framework
- **UI Components**: [Nuxt UI](https://ui.nuxt.com/) - A modern UI framework for Nuxt
- **Authentication**: [Clerk](https://clerk.com/) - User authentication and management
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations
- **State Management**: [Pinia](https://pinia.vuejs.org/) - Vue.js state management
- **Calendar**: [Schedule-X](https://schedule-x.org/) - Modern calendar component
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: [Nuxt Icon](https://nuxt.com/modules/icon) - Icon support with Heroicons

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- PostgreSQL database
- Clerk account for authentication

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mynuxtevents"

# Clerk Authentication
NUXT_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
NUXT_CLERK_SIGN_IN_URL="/sign-in"
NUXT_CLERK_SIGN_UP_URL="/sign-up"
NUXT_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/sign-in"
NUXT_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/sign-up"
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mynuxtevents.git
cd mynuxtevents
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run database migrations:
```bash
npm run drizzle-kit push:pg
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
mynuxtevents/
├── components/          # Vue components
│   ├── event/          # Event-related components
│   └── ...
├── server/             # Server-side code
│   ├── api/           # API endpoints
│   └── database/      # Database configuration and schema
├── stores/            # Pinia stores
├── utils/             # Utility functions
└── ...
```

## 🔒 Authentication Flow

The application uses Clerk for authentication with the following flow:

1. Users can sign up or sign in through the Clerk interface
2. Protected routes (`/events`, `/calendar`) require authentication
3. Unauthenticated users are redirected to the sign-in page
4. After successful authentication, users are redirected to their intended destination

## 🎨 UI/UX Features

- Modern, clean interface with dark mode support
- Responsive design that works on all devices
- Intuitive event creation and management
- Interactive calendar view
- Toast notifications for user feedback
- Loading states and skeleton screens for better UX

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Nuxt Team](https://nuxt.com/) for the amazing framework
- [Clerk](https://clerk.com/) for authentication
- [Drizzle ORM](https://orm.drizzle.team/) for database operations
- [Schedule-X](https://schedule-x.dev/) for the calendar component
