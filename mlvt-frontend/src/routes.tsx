import { lazy } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'

// Layout and Helper Components
import AnimatedLayout from './components/AnimatedLayout'
import ProtectedRoute from './components/ProtectedRoute'

// --- Lazy-loaded Page Components ---

// Note on named exports:
// React.lazy expects a module with a `default` export.
// If your component is a named export, we use .then() to create a module-like
// object with a `default` property pointing to your named export.
const { LoginPage, RegistrationPage } = {
    LoginPage: lazy(() =>
        import('./features/authentication').then((module) => ({
            default: module.LoginPage,
        })),
    ),
    RegistrationPage: lazy(() =>
        import('./features/authentication').then((module) => ({
            default: module.RegistrationPage,
        })),
    ),
}

const { MembershipPlansPage, MembershipCheckoutPage } = {
    MembershipPlansPage: lazy(() =>
        import('./features/membership-subscription').then((module) => ({
            default: module.MembershipPlansPage,
        })),
    ),
    MembershipCheckoutPage: lazy(() =>
        import('./features/membership-subscription').then((module) => ({
            default: module.MembershipCheckoutPage,
        })),
    ),
}

// Components with default exports can be imported more simply
const HomeUser = lazy(() => import('./features/home-user'))
const EmailOTP = lazy(() => import('./pages/email_otp'))
const VerifyOTP = lazy(() => import('./pages/verify_otp'))
const Storage = lazy(() => import('./features/my-storage'))
const ProjectPipeline = lazy(() => import('./features/project-pipeline'))
const AccountSettings = lazy(() => import('./features/account-settings'))
const HelpAndSupportPage = lazy(() => import('./features/help-and-support'))
const AboutPage = lazy(() => import('./features/about-us'))
const LandingPage = lazy(() => import('./features/home-landing'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// --- Route Definitions ---

// Explicitly type the routes array with RouteObject[]
const routes: RouteObject[] = [
    {
        element: <AnimatedLayout />,
        children: [
            // --- Public Routes ---
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <RegistrationPage /> },
            { path: '/landing', element: <LandingPage /> },
            { path: '/email-otp', element: <EmailOTP /> },
            { path: '/verify-otp', element: <VerifyOTP /> },
            { path: '/about-us', element: <AboutPage /> },
            { path: '/help-and-support', element: <HelpAndSupportPage /> },

            // --- Protected Routes ---
            {
                path: '/',
                element: (
                    <ProtectedRoute>
                        <HomeUser />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/account-settings',
                element: (
                    <ProtectedRoute>
                        <AccountSettings />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/project-pipeline',
                element: (
                    <ProtectedRoute>
                        <ProjectPipeline />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/premium-plan',
                element: (
                    <ProtectedRoute>
                        <MembershipPlansPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/my-storage',
                element: (
                    <ProtectedRoute>
                        <Storage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/checkout/:option',
                element: (
                    <ProtectedRoute>
                        <MembershipCheckoutPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]

export function AppRoutes() {
    return useRoutes(routes)
}
