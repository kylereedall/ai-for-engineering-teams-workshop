import { Customer } from '@/data/mock-customers';

interface CustomerCardProps {
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
  if (score <= 30) return 'text-red-600';
  if (score <= 70) return 'text-yellow-600';
  return 'text-green-600';
}

export default function CustomerCard({ customer, onClick, isSelected }: CustomerCardProps) {
  const { name, company, healthScore, domains } = customer;
  const primaryDomain = domains?.[0];
  const additionalDomainCount = domains && domains.length > 1 ? domains.length - 1 : 0;

  return (
    <div
      onClick={() => onClick?.(customer)}
      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 truncate">{name}</p>
          <p className="text-sm text-gray-500 truncate">{company}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`inline-block w-2.5 h-2.5 rounded-full ${getHealthColor(healthScore)}`} />
          <span className={`text-sm font-medium ${getHealthTextColor(healthScore)}`}>
            {healthScore}
          </span>
        </div>
      </div>

      {primaryDomain && (
        <div className="mt-2 flex items-center gap-1.5">
          <span className="text-xs text-gray-400 truncate">{primaryDomain}</span>
          {additionalDomainCount > 0 && (
            <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full shrink-0">
              +{additionalDomainCount}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
