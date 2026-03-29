export interface BuiltInService {
  id: string
  name: string
  description: string
  url: string
  icon: string
  color: string
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  url: string
}

export const BUILT_IN_SERVICES: BuiltInService[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Host and version control your code. Collaborate with others and track changes.',
    url: 'https://github.com',
    icon: 'github',
    color: '#ffffff',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy web apps instantly. Preview URLs, edge functions, and global CDN.',
    url: 'https://vercel.com',
    icon: 'vercel',
    color: '#ffffff',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Open source Firebase alternative with Postgres, auth, and real-time APIs.',
    url: 'https://supabase.com',
    icon: 'supabase',
    color: '#3ecf8e',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    description: 'The #1 code editor. Extensions, debugging, and Git integration built in.',
    url: 'https://code.visualstudio.com',
    icon: 'vscode',
    color: '#007acc',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'JavaScript runtime for building servers, CLI tools, and backend services.',
    url: 'https://nodejs.org',
    icon: 'nodejs',
    color: '#5fa04e',
  },
]

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'github',
    title: 'Create a GitHub Account',
    description:
      'GitHub is where developers store and share code. You\'ll need an account to host your projects and collaborate with others.',
    url: 'https://github.com/signup',
  },
  {
    id: 'vscode',
    title: 'Install VS Code',
    description:
      'Visual Studio Code is a free, powerful code editor. It has syntax highlighting, autocomplete, and a built-in terminal.',
    url: 'https://code.visualstudio.com/download',
  },
  {
    id: 'nodejs',
    title: 'Install Node.js',
    description:
      'Node.js lets you run JavaScript on your computer (outside the browser). It also comes with npm, the package manager you\'ll use constantly.',
    url: 'https://nodejs.org/en/download',
  },
  {
    id: 'vercel',
    title: 'Create a Vercel Account',
    description:
      'Vercel makes it easy to deploy your Next.js apps for free. Connect your GitHub repo and your site goes live automatically on every push.',
    url: 'https://vercel.com/signup',
  },
  {
    id: 'supabase',
    title: 'Create a Supabase Account',
    description:
      'Supabase gives you a free Postgres database, authentication, and storage. This app uses Supabase to save your data.',
    url: 'https://supabase.com/dashboard/sign-up',
  },
]
