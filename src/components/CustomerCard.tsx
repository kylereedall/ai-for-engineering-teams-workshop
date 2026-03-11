'use client';

import { Customer } from '@/data/mock-customers';

export interface CustomerCardProps {
  customer: Customer;
  onClick?: (customer: Customer) => void;
  isSelected?: boolean;
}

function getHealthColor(score: number): string {
  if (score <= 30) return 'bg-red-500';
  if (score <= 70) return 'bg-yellow-500';
  return 'bg-green-500';
}

function getHealthTextColor(score: number): string {
  if (score <= 30) return 'text-red-700 dark:text-red-400';
  if (score <= 70) return 'text-yellow-700 dark:text-yellow-400';
  return 'text-green-700 dark:text-green-400';
}

function getHealthLabel(score: number): string {
  if (score <= 30) return 'Poor';
  if (score <= 70) return 'Moderate';
  return 'Good';
}

export default function CustomerCard({ customer, onClick, isSelected }: CustomerCardProps) {
  const { name, company, healthScore, email, domains } = customer;
  const primaryDomain = domains?.[0];
  const additionalDomainCount = domains && domains.length > 1 ? domains.length - 1 : 0;
  const healthLabel = getHealthLabel(healthScore);

  function handleClick() {
    onClick?.(customer);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(customer);
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`${name} at ${company}, health score ${healthScore} out of 100, ${healthLabel}`}
      aria-pressed={isSelected}
      className={`
        max-w-[400px] min-h-[120px] p-4 rounded-lg border cursor-pointer
        transition-all duration-150 select-none
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
        ${
          isSelected
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600 dark:hover:bg-gray-800'
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{company}</p>
          {email && (
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">{email}</p>
          )}
        </div>
        <div
          className="flex items-center gap-1.5 shrink-0"
          aria-hidden="true"
        >
          <span
            className={`inline-block w-2.5 h-2.5 rounded-full ${getHealthColor(healthScore)}`}
          />
          <span className={`text-sm font-medium ${getHealthTextColor(healthScore)}`}>
            {healthScore}
          </span>
        </div>
      </div>

      {primaryDomain && (
        <div className="mt-3 flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.73-3.56"
            />
          </svg>
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {primaryDomain}
          </span>
          {additionalDomainCount > 0 && (
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-full shrink-0">
              +{additionalDomainCount}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
