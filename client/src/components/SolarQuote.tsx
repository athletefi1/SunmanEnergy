import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { insertLeadSchema, type InsertLead } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin } from 'lucide-react';
import consultationImage from '@assets/free solar consultation.jpg';

export function SolarQuote() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    electricBill: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours with your personalized solar quote.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        electricBill: ''
      });
      queryClient.invalidateQueries({ queryKey: ['/api/leads'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertLeadSchema.parse({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Address: ${formData.address}\nMonthly Electric Bill: $${formData.electricBill}`
      });
      
      contactMutation.mutate(validatedData);
    } catch (error) {
      toast({
        title: "Please check your information",
        description: "Make sure all required fields are filled out correctly.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="solar-quote" className="py-20 bg-gradient-to-br from-solarman-sky-light to-solarman-sky">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl lg:text-5xl font-black text-solarman-navy mb-6">
            Get Your Free Solar Quote
          </h2>
          <p className="text-lg text-solarman-navy font-body max-w-3xl mx-auto">
            Find out how much you can save with solar. Get a personalized quote based on your home and energy usage - completely free with no obligation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Quote Form */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8" style={{ boxShadow: '0 15px 35px rgba(5, 141, 220, 0.2)' }}>
            <h3 className="font-headline text-2xl font-bold text-solarman-navy mb-6">
              Get Started in 60 Seconds
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-solarman-navy font-body font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-solarman-navy font-body font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-solarman-navy font-body font-medium">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-solarman-navy font-body font-medium">
                  Home Address *
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="Enter your full address"
                />
              </div>

              <div>
                <Label htmlFor="electricBill" className="text-solarman-navy font-body font-medium">
                  Monthly Electric Bill *
                </Label>
                <Input
                  id="electricBill"
                  name="electricBill"
                  type="number"
                  value={formData.electricBill}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="Enter amount (e.g., 150)"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-solarman-orange hover:bg-solarman-orange text-white font-bold py-4 text-lg rounded-lg font-body"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? 'Submitting...' : 'Get My Free Quote'}
              </Button>
            </form>

            <p className="text-sm text-gray-500 font-body mt-4 text-center">
              No spam, no pushy sales calls. Just honest solar advice.
            </p>
          </div>

          {/* Contact Info & Benefits */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8" style={{ boxShadow: '0 15px 35px rgba(5, 141, 220, 0.2)' }}>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={consultationImage}
                  alt="Professional solar panel installation"
                  className="w-16 h-16 object-cover rounded-lg shadow-md flex-shrink-0"
                />
                <h3 className="font-headline text-2xl font-bold text-solarman-navy">
                  What Happens Next?
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-solarman-orange rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-solarman-navy font-body">Instant Analysis</h4>
                    <p className="text-gray-600 font-body text-sm">We'll analyze your roof using satellite imagery and calculate your savings potential.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-solarman-orange rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-solarman-navy font-body">Custom Quote</h4>
                    <p className="text-gray-600 font-body text-sm">Receive a detailed proposal with system design and exact savings calculations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-solarman-orange rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-solarman-navy font-body">Expert Consultation</h4>
                    <p className="text-gray-600 font-body text-sm">Schedule a free consultation to review your options and answer questions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8" style={{ boxShadow: '0 15px 35px rgba(5, 141, 220, 0.2)' }}>
              <h3 className="font-headline text-2xl font-bold text-solarman-navy mb-6">
                Contact Us Directly
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-solarman-orange" />
                  <span className="font-body text-solarman-navy">(555) 123-SOLAR</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-solarman-orange" />
                  <span className="font-body text-solarman-navy">info@solarmanenergy.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-solarman-orange" />
                  <span className="font-body text-solarman-navy">Serving all of California</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}