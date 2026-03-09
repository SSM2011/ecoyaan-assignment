import Link from "next/link";
import CheckoutStepper from "./CheckoutStepper";

interface CheckoutLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  title: string;
  subtitle?: string;
}

/**
 * CheckoutLayout — wraps every checkout page with:
 * - Top header with brand logo
 * - Progress stepper
 * - Page title
 * - Centered, max-width container
 */
export default function CheckoutLayout({
  children,
  currentPath,
  title,
  subtitle,
}: CheckoutLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-pale via-white to-green-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/cart"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">🌿</span>
            <div>
              <span className="font-extrabold text-eco-dark text-lg leading-none">
                Ecoyaan
              </span>
              <p className="text-xs text-eco-green leading-none">
                Sustainable Living
              </p>
            </div>
          </Link>

          {/* Trust badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
            <span>🔒</span>
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stepper */}
        {currentPath !== "/success" && (
          <CheckoutStepper currentPath={currentPath} />
        )}

        {/* Page Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Page Content */}
        <div className="animate-slide-up">{children}</div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400">
        <p>© 2025 Ecoyaan · Sustainable Shopping · All rights reserved</p>
      </footer>
    </div>
  );
}
