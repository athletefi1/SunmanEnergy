import { CheckCircle, DollarSign, Shield, Zap } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "No Credit Check",
      description: "Get approved regardless of your credit score"
    },
    {
      icon: DollarSign,
      title: "$0 Down",
      description: "No upfront costs or hidden fees"
    },
    {
      icon: Shield,
      title: "25-Year Warranty",
      description: "Industry-leading protection and peace of mind"
    },
    {
      icon: Zap,
      title: "Immediate Savings",
      description: "Start reducing your electricity bills right away"
    }
  ];

  return (
    <section id="services" className="py-20 bg-sunman-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-sunman-blue">Why Choose SunMan Energy?</h2>
          <p className="text-xl text-gray-600">
            We make solar simple, affordable, and accessible for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div key={benefit.title} className="bg-white p-6 rounded-xl shadow-sm text-center space-y-4">
                <div className="w-12 h-12 bg-sunman-yellow rounded-lg flex items-center justify-center mx-auto">
                  <IconComponent className="w-6 h-6 text-sunman-blue" />
                </div>
                <h3 className="font-semibold text-sunman-blue">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
