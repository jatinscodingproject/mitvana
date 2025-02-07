import React from "react";
import { usePathname } from "next/navigation";

function TimeLineWind() {
  const pathname = usePathname();
  const currentPath = pathname;

  console.log(pathname);

  const steps = [
    { path: "/shopping-cart", label: "Cart", step: 1 },
    { path: "/checkout", label: "Checkout", step: 2 },
    { path: "/address", label: "Address", step: 3 },
  ];

  const getStepStatus = (step) => {
    const currentStep = steps.findIndex((s) => s.path === currentPath) + 1;
    if (step < currentStep) return "completed";
    if (step === currentStep) return "current";
    return "upcoming";
  };

  return (
    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
      {steps.map((step, index) => {
        const status = getStepStatus(step.step);
        console.log(status);
        return (
          <li
            key={index}
            className={`flex w-full items-center ${
              status === "completed" ? "text-green-600 dark:text-green-500" : ""
            } ${
              index < steps.length - 1
                ? 'after:content-[""] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 sm:after:inline-block after:mx-2 dark:after:border-gray-700'
                : ""
            }`}
          >
            <span className="flex items-center">
              {status === "completed" ? (
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <span
                  className={`me-2 ${
                    status === "current"
                      ? "text-blue-600 dark:text-blue-500"
                      : ""
                  }`}
                >
                  {/* {step.step} */}
                </span>
              )}
              <span
                className={`${
                  status === "current" ? "text-blue-600 dark:text-blue-500" : ""
                }`}
              >
                {step.label}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default TimeLineWind;
