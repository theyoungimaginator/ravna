import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$9',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 5 team members',
      'Basic analytics',
      'Email support',
      '1GB storage',
      'Basic integrations'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Best for growing businesses',
    features: [
      'Up to 20 team members',
      'Advanced analytics',
      'Priority support',
      '10GB storage',
      'Advanced integrations',
      'Custom branding',
      'API access'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For large organizations',
    features: [
      'Unlimited team members',
      'Enterprise analytics',
      '24/7 phone support',
      'Unlimited storage',
      'All integrations',
      'Custom branding',
      'API access',
      'Dedicated account manager',
      'Custom contracts'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black dark:text-white sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Choose the plan that's right for your business
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border p-8 ${
                plan.popular
                  ? 'border-black dark:border-white bg-white dark:bg-black shadow-lg'
                  : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-black'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-black dark:text-white">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-black dark:text-white">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{plan.description}</p>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-black dark:text-white mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  asChild
                  className={`w-full ${
                    plan.popular
                      ? 'bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                      : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Link href="/sign-up">{plan.cta}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white">Frequently Asked Questions</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="text-left">
              <h3 className="text-lg font-semibold text-black dark:text-white">Can I change plans anytime?</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-black dark:text-white">Is there a free trial?</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Yes, we offer a 14-day free trial on all plans. No credit card required to start.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-black dark:text-white">What payment methods do you accept?</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-black dark:text-white">Do you offer refunds?</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
