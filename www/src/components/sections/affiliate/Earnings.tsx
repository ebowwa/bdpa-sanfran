// components/Earnings.tsx

type TierBonus = {
  referrals: string;
  commission: string;
  sales: string;
  bonus: string;
};

type EarningsContent = {
  title: string;
  body: string;
  earnings: {
    sales: string;
    commission: string;
    referrals: string;
  };
  tiers: TierBonus[];
};

const content: EarningsContent = {
  title: "Your Earnings",
  body: "You'll earn a 10% commission on all referred sales. High-performing affiliates can earn even more with tiered bonuses.",
  earnings: {
    sales: "$1,000",
    commission: "$100",
    referrals: "1",
  },
  tiers: [
    {
      referrals: "10",
      commission: "15%",
      sales: "$10,000",
      bonus: "$1,500",
    },
    // Add more tier objects as needed
  ],
};

export function Earnings() {
  return (
    <section className="py-12 lg:py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
            {content.title}
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-gray-500 dark:text-gray-400">
            {content.body}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sales</h3>
            <p className="mt-2 text-4xl font-bold text-green-500">{content.earnings.sales}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Commission</h3>
            <p className="mt-2 text-4xl font-bold text-green-500">{content.earnings.commission}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Referrals</h3>
            <p className="mt-2 text-4xl font-bold text-green-500">{content.earnings.referrals}</p>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Tiered Bonuses</h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {content.tiers.map((tier, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Tier {index + 1}</h4>
                  <span className="text-green-500 font-bold">{tier.bonus} Bonus</span>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-gray-900 dark:text-white">Referrals:</span> {tier.referrals}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-gray-900 dark:text-white">Commission:</span> {tier.commission}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-gray-900 dark:text-white">Sales:</span> {tier.sales}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}