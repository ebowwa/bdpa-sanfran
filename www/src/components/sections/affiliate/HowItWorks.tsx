// components/HowItWorks.tsx

type Step = {
  title: string;
  description: string;
  icon: string;
};

type HowItWorksContent = {
  title: string;
  body: string;
  steps: Step[];
};

const content: HowItWorksContent = {
  title: "How it works",
  body: "Refer customers to Goldson Landscaping, Concrete, Construction and earn commissions.",
  steps: [
    {
      title: "Step 1",
      description: "Sign up for an account",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
               <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zm4.125 2.625a.75.75 0 01.75.75v8.625a.75.75 0 01-1.5 0V5.625a.75.75 0 01.75-.75zm-8.25 3a.75.75 0 01.75.75v5.625a.75.75 0 01-1.5 0V8.625a.75.75 0 01.75-.75zm4.125 2.25a.75.75 0 01.75.75v3.375a.75.75 0 01-1.5 0V10.75a.75.75 0 01.75-.75z" clipRule="evenodd" />
             </svg>`,
    },
    {
      title: "Step 2",
      description: "Get your unique link",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
               <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clipRule="evenodd" />
             </svg>`,
    },
    {
      title: "Step 3",
      description: "Start sharing",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
               <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
             </svg>`,
    },
  ], // step 4 turn on notifications and emails; maybe further steps
};

export function HowItWorks() {
  return (
    <section className="border-t border-b divide-y border-gray-200 dark:border-gray-800">
      <div className="container grid items-center justify-center py-12 gap-4 px-4 text-center md:py-16 md:gap-8 lg:gap-12 xl:gap-16 xl:px-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{content.title}</h2>
          <p className="max-w-3xl mx-auto text-gray-500 md:text-xl/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {content.body}
          </p>
        </div>
        <div className="grid w-full grid-cols-2 items-stretch justify-center gap-4 md:grid-cols-3 md:gap-6">
          {content.steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-2">
              <div className="rounded-full border border-gray-200 border-gray-200 dark:border-gray-800 dark:border-gray-800 transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg">
                <div
                  dangerouslySetInnerHTML={{ __html: step.icon }}
                  className="w-24 h-24 p-6 rounded-full"
                />
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{step.title}</p>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}