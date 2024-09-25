// src/components/ui/template/PricingSection.tsx

import React from 'react';
import Button from '@/components/ui/template/Button';
import cn from 'classnames';
import type { User } from '@supabase/supabase-js';
import type { Tables } from '../../../../../types_db';
import type { BillingInterval, ProductWithPrices, SubscriptionWithProduct } from '@/types/index';

interface PricingSectionProps {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
  billingInterval: BillingInterval;
  setBillingInterval: React.Dispatch<React.SetStateAction<BillingInterval>>;
  handleStripeCheckout: (price: Tables<'prices'>) => Promise<void>;
  priceIdLoading: string | undefined;
}

interface PricingSectionContent {
  title: string;
  description: string;
  intervalButtons: {
    monthly: string;
    yearly: string;
  };
  emptyStateMessage: {
    title: string;
    linkText: string;
    linkUrl: string;
  };
}

const pricingSectionContent: PricingSectionContent = {
  title: 'Pricing Plans',
  description:
    'Start building for free, then add a site plan to go live. Account plans unlock additional features.',
  intervalButtons: {
    monthly: 'Monthly billing',
    yearly: 'Yearly billing',
  },
  emptyStateMessage: {
    title: 'No subscription pricing plans found. Create them in your',
    linkText: 'Stripe Dashboard',
    linkUrl: 'https://dashboard.stripe.com/products',
  },
};

const PricingSection: React.FC<PricingSectionProps> = ({
  user,
  products,
  subscription,
  billingInterval,
  setBillingInterval,
  handleStripeCheckout,
  priceIdLoading,
}) => {
  const renderEmptyState = () => (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          {pricingSectionContent.emptyStateMessage.title}{' '}
          <a
            className="text-pink-500 underline"
            href={pricingSectionContent.emptyStateMessage.linkUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {pricingSectionContent.emptyStateMessage.linkText}
          </a>
          .
        </p>
      </div>
    </section>
  );

  const renderIntervalButtons = () => {
    const intervals = Array.from(
      new Set(products.flatMap((product) => product?.prices?.map((price) => price?.interval)))
    );

    return (
      <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
        {intervals.includes('month') && (
          <button
            onClick={() => setBillingInterval('month')}
            type="button"
            className={`${
              billingInterval === 'month'
                ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
            } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
          >
            {pricingSectionContent.intervalButtons.monthly}
          </button>
        )}
        {intervals.includes('year') && (
          <button
            onClick={() => setBillingInterval('year')}
            type="button"
            className={`${
              billingInterval === 'year'
                ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
            } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
          >
            {pricingSectionContent.intervalButtons.yearly}
          </button>
        )}
      </div>
    );
  };

  const renderProducts = () => {
    return (
      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
        {products.map((product) => {
          const price = product?.prices?.find((price) => price.interval === billingInterval);
          if (!price) return null;
          const priceString = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: price.currency!,
            minimumFractionDigits: 0,
          }).format((price?.unit_amount || 0) / 100);
          return (
            <div
              key={product.id}
              className={cn(
                'flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
                {
                  'border border-pink-500': subscription
                    ? product.name === subscription?.prices?.products?.name
                    : product.name === 'Freelancer',
                },
                'flex-1',
                'basis-1/3',
                'max-w-xs'
              )}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold leading-6 text-white">{product.name}</h2>
                <p className="mt-4 text-zinc-300">{product.description}</p>
                <p className="mt-8">
                  <span className="text-5xl font-extrabold white">{priceString}</span>
                  <span className="text-base font-medium text-zinc-100">/{billingInterval}</span>
                </p>
                <Button
                  variant="slim"
                  type="button"
                  loading={priceIdLoading === price.id}
                  onClick={() => handleStripeCheckout(price)}
                  className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                >
                  {subscription ? 'Manage' : 'Subscribe'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (!products.length) {
    return renderEmptyState();
  }

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            {pricingSectionContent.title}
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            {pricingSectionContent.description}
          </p>
          {renderIntervalButtons()}
        </div>
        {renderProducts()}
      </div>
    </section>
  );
};

export default PricingSection;