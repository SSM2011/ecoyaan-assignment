interface Step {
  label: string;
  path: string;
}

const STEPS: Step[] = [
  { label: "Cart", path: "/cart" },
  { label: "Address", path: "/address" },
  { label: "Payment", path: "/payment" },
  { label: "Done", path: "/success" },
];

interface CheckoutStepperProps {
  currentPath: string;
}

/**
 * CheckoutStepper — visual progress indicator for the checkout flow.
 * Highlights the current step and shows completed steps with a checkmark.
 */
export default function CheckoutStepper({ currentPath }: CheckoutStepperProps) {
  const currentIndex = STEPS.findIndex((s) => s.path === currentPath);

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === STEPS.length - 1;

        return (
          <div key={step.path} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${isCompleted ? "bg-eco-green text-white shadow-sm" : ""}
                  ${isCurrent ? "bg-eco-dark text-white ring-4 ring-eco-pale shadow-md scale-110" : ""}
                  ${!isCompleted && !isCurrent ? "bg-gray-100 text-gray-400" : ""}
                `}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block transition-colors duration-300
                  ${isCurrent ? "text-eco-dark" : isCompleted ? "text-eco-green" : "text-gray-400"}`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                className={`h-0.5 w-10 sm:w-16 mx-1 transition-all duration-500
                  ${index < currentIndex ? "bg-eco-green" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
