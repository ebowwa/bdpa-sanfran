// components/TieredBonuses.tsx

type TierBonus = {
  referrals: string;
  commission: string;
  sales: string;
  bonus: string;
};

type TieredBonusesContent = {
  title: string;
  body: string;
  tiers: TierBonus[];
};

const content: TieredBonusesContent = {
  title: "Tiered Bonuses",
  body: "High-performing affiliates can earn even more with tiered bonuses.",
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

export function TieredBonuses() {
  return (
    <section className="border-t border-gray-200 dark:border-gray-800 py-12 lg:py-24">
      <div className="container px-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{content.title}</h2>
          <p className="max-w-3xl mx-auto text-gray-500 md:text-xl/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {content.body}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 justify-items-center">
          {content.tiers.map((tier, index) => (
            <div key={index} className="space-y-4 text-left">
              <div>
                <h3 className="text-2xl font-bold">Referrals</h3>
                <p className="text-3xl">{tier.referrals}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Commission</h3>
                <p className="text-3xl">{tier.commission}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Sales</h3>
                <p className="text-3xl">{tier.sales}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Bonus</h3>
                <p className="text-3xl">{tier.bonus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}