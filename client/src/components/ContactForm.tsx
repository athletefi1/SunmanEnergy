import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertLead } from "@shared/schema";
import consultationImage from "@assets/free solar consultation.jpg";

export function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    monthlyBill: ""
  });

  const submitLead = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your interest!",
        description: "We'll contact you soon with your free solar quote.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        monthlyBill: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Error submitting form",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.monthlyBill) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    submitLead.mutate(formData);
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    } else if (field === 'email') {
      value = value.toLowerCase().trim();
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-4xl font-semibold text-black">Get Your Free Solar Quote</h2>
          <p className="text-xl text-sunman-black font-body">
            Join thousands of homeowners who have made the switch to clean, affordable solar energy
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200" style={{ boxShadow: '0 15px 35px rgba(5, 141, 220, 0.2)' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-sunman-blue mb-2">First Name</Label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                  className="focus:ring-sunman-yellow focus:border-transparent"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-sunman-blue mb-2">Last Name</Label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                  className="focus:ring-sunman-yellow focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-sunman-blue mb-2">Email Address</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="focus:ring-sunman-yellow focus:border-transparent"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-sunman-blue mb-2">Phone Number</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                  className="focus:ring-sunman-yellow focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="block text-sm font-medium text-sunman-blue mb-2">Property Address</Label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="123 Main St, City, State 12345"
                className="focus:ring-sunman-yellow focus:border-transparent"
                required
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-sunman-blue mb-2">Average Monthly Electric Bill</Label>
              <Select value={formData.monthlyBill} onValueChange={(value) => handleInputChange("monthlyBill", value)}>
                <SelectTrigger className="focus:ring-sunman-yellow focus:border-transparent">
                  <SelectValue placeholder="Select your average bill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$50-$100">$50 - $100</SelectItem>
                  <SelectItem value="$100-$150">$100 - $150</SelectItem>
                  <SelectItem value="$150-$200">$150 - $200</SelectItem>
                  <SelectItem value="$200-$300">$200 - $300</SelectItem>
                  <SelectItem value="$300+">$300+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-sunman-blue hover:bg-sunman-yellow hover:text-sunman-black text-white font-bold py-4 text-lg rounded-full transition-all transform hover:scale-105 shadow-lg font-body"
              disabled={submitLead.isPending}
            >
              {submitLead.isPending ? "Submitting..." : "Get My Free Solar Quote"}
            </Button>

            <p className="text-sm text-gray-600 text-center">
              By submitting this form, you agree to receive communications from SUNMAN ENERGY. 
              We respect your privacy and will never share your information.
            </p>
            </form>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img 
              src={consultationImage}
              alt="Professional solar installer providing free consultation"
              className="w-full max-w-md rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
