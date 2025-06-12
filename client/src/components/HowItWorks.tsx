export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Free Assessment",
      description: "We analyze your home's solar potential and energy usage to design the perfect system for you.",
      completion: "✓ Site assessment complete\n✓ Energy usage analyzed\n✓ Savings calculated"
    },
    {
      number: "2",
      title: "Quick Installation",
      description: "Our certified technicians install your solar system quickly and efficiently with minimal disruption.",
      completion: "✓ System designed\n✓ Permits obtained\n✓ Financing approved"
    },
    {
      number: "3",
      title: "Start Saving",
      description: "Begin enjoying lower electricity bills and clean energy from day one of activation.",
      completion: "✓ Installation complete\n✓ System activated\n✓ Monitoring setup"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl font-semibold text-black">How SUNMAN Works</h2>
          <p className="text-xl text-sunman-black max-w-3xl mx-auto font-body">
            Our simple 3-step process gets you solar power without the complexity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="group text-center space-y-6 p-8 rounded-xl bg-sunman-blue hover:bg-sunman-yellow shadow-2xl hover:shadow-3xl transition-all hover:scale-105">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl font-headline text-sunman-blue">{step.number}</span>
              </div>
              <h3 className="text-2xl font-body font-medium text-white group-hover:text-black">{step.title}</h3>
              <div className="group-hover:hidden">
                <p className="text-white font-body font-light">{step.description}</p>
              </div>
              <div className="hidden group-hover:block">
                <p className="text-black font-body font-medium whitespace-pre-line">{step.completion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
