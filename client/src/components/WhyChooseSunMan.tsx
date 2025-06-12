import { CheckCircle, Shield, Award, Clock } from 'lucide-react';
import whyChooseImage from '@assets/why choose.jpg';

export function WhyChooseSunMan() {
  return (
    <section id="why-choose" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-black mb-6">
            Why Choose SUNMAN?
          </h2>
          <p className="text-xl text-sunman-black font-body max-w-3xl mx-auto">
            We're not just another solar company. We're your partners in achieving energy independence with our proven track record and commitment to excellence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-xl p-8 space-y-6 shadow-2xl border border-gray-200" style={{ boxShadow: '0 15px 35px rgba(5, 141, 220, 0.2)' }}>
            <div className="flex items-start space-x-4">
              <div className="bg-sunman-blue rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-body font-semibold text-black mb-2">$0 Down Installation</h3>
                <p className="text-gray-700 font-body">Start saving immediately with no upfront costs or hidden fees. Begin your solar journey today.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-sunman-blue rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-body font-semibold text-black mb-2">25-Year Warranty</h3>
                <p className="text-gray-700 font-body">Comprehensive coverage on all equipment and workmanship for complete peace of mind.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-sunman-blue rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-body font-semibold text-black mb-2">Expert Installation</h3>
                <p className="text-gray-700 font-body">Certified professionals with thousands of successful solar installations and training.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-sunman-blue rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-body font-semibold text-black mb-2">Quick Timeline</h3>
                <p className="text-gray-700 font-body">Most installations completed in just 1-2 days with minimal disruption to your routine.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <img 
              src={whyChooseImage}
              alt="Aerial view of home with solar panels"
              className="w-full max-w-md rounded-2xl shadow-xl"
            />
          </div>
        </div>


      </div>
    </section>
  );
}