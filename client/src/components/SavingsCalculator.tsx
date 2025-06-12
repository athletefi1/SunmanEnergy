import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Comprehensive lists of what different savings amounts can buy
const getYearlySavingsItems = (amount: number) => {
  const items = [];
  if (amount >= 5000) items.push("• Luxury family vacation (Europe/Asia)", "• High-end home theater system", "• Premium appliance upgrade");
  if (amount >= 4000) items.push("• Complete HVAC system maintenance", "• Designer furniture set", "• Professional landscaping");
  if (amount >= 3500) items.push("• Family vacation to Europe", "• New washer/dryer set", "• Home security system");
  if (amount >= 3000) items.push("• Kitchen appliance package", "• Bathroom renovation", "• Emergency fund (3 months)");
  if (amount >= 2500) items.push("• High-end electronics bundle", "• Car down payment", "• Home gym equipment");
  if (amount >= 2000) items.push("• Emergency fund for peace of mind", "• Investment in IRA/401k", "• Home improvement project");
  if (amount >= 1500) items.push("• Home renovation project", "• New computer and tech setup", "• Annual childcare costs");
  if (amount >= 1200) items.push("• Family vacation (domestic)", "• New mattress and bedroom set", "• Annual insurance premiums");
  if (amount >= 1000) items.push("• Investment in retirement account", "• Home office setup", "• Annual medical expenses");
  if (amount >= 800) items.push("• Monthly groceries for a family", "• Car maintenance and repairs", "• Utility bills for 6 months");
  if (amount >= 600) items.push("• Holiday shopping budget", "• New winter clothing for family", "• Pet care for the year");
  if (amount >= 400) items.push("• Monthly dining out budget", "• Sports equipment and activities", "• Subscription services");
  items.push("• Extra money in your pocket every year", "• Reduced financial stress");
  return items.slice(0, 8); // Limit to 8 items for clean display
};

const getTotalSavingsItems = (amount: number) => {
  const items = [];
  if (amount >= 150000) items.push("• Down payment on a luxury home", "• Full home renovation", "• Child's complete college education");
  if (amount >= 120000) items.push("• Second home down payment", "• Luxury RV or boat", "• Start your own business");
  if (amount >= 100000) items.push("• Down payment on a second home", "• Early retirement boost", "• Investment property");
  if (amount >= 80000) items.push("• Complete kitchen remodel", "• Luxury car collection", "• Master's degree education");
  if (amount >= 70000) items.push("• Home addition or extension", "• Dream wedding celebration", "• Professional certification programs");
  if (amount >= 60000) items.push("• Child's college education fund", "• Complete home makeover", "• Investment portfolio starter");
  if (amount >= 50000) items.push("• Luxury car or boat", "• Home pool installation", "• Advanced medical procedures");
  if (amount >= 40000) items.push("• World tour vacation", "• Home solar + battery system", "• Career change education");
  if (amount >= 35000) items.push("• Luxury vacation package", "• New roof and siding", "• Wedding and honeymoon");
  if (amount >= 30000) items.push("• Home addition or pool", "• High-end vehicle", "• Emergency fund (1 year)");
  if (amount >= 25000) items.push("• Kitchen renovation", "• Investment account", "• Professional development");
  if (amount >= 20000) items.push("• Early retirement contribution", "• Home theater room", "• Advanced education courses");
  if (amount >= 15000) items.push("• New roof and windows", "• Car upgrade", "• Medical/dental procedures");
  if (amount >= 12000) items.push("• Home improvement projects", "• Technology upgrades", "• Travel fund");
  if (amount >= 10000) items.push("• Family emergency fund", "• Vehicle down payment", "• Home repairs and maintenance");
  if (amount >= 8000) items.push("• Major appliance replacement", "• Vacation savings", "• Health and wellness budget");
  if (amount >= 5000) items.push("• Home security system", "• Educational courses", "• Pet care and veterinary fund");
  items.push("• True financial freedom", "• Peace of mind for the future");
  return items.slice(0, 10); // Limit to 10 items for clean display
};

export function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<number>(300);
  const [solarRate, setSolarRate] = useState<number>(0.7);
  const [showAnimation, setShowAnimation] = useState<string>("");
  const [utilityIncrease, setUtilityIncrease] = useState<number>(0.05);
  const [timeframe, setTimeframe] = useState<number>(25);
  const [showResults, setShowResults] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentType, setPaymentType] = useState<'cash' | 'finance'>('cash');
  const [roofAdder, setRoofAdder] = useState<number>(0);
  const [utilityCompany, setUtilityCompany] = useState<'pseg' | 'ace' | 'jcpl'>('pseg');
  const [customMonthlyKwh, setCustomMonthlyKwh] = useState<number | null>(null);
  const [editingUsage, setEditingUsage] = useState(false);
  const [loanTermYears, setLoanTermYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(5.5);

  // Utility rates per kWh
  const getUtilityRate = () => {
    switch(utilityCompany) {
      case 'pseg': return 0.29;
      case 'ace': return 0.30;
      case 'jcpl': return 0.25;
      default: return 0.29;
    }
  };

  // Calculate system details for both cash and finance
  const calculateSystemDetails = () => {
    const utilityRate = getUtilityRate();
    const monthlyKwh = customMonthlyKwh !== null ? customMonthlyKwh : monthlyBill / utilityRate;
    const annualKwh = monthlyKwh * 12;
    const systemCost = annualKwh * 3.00; // $3.00 per kWh for solar system cost
    return {
      monthlyKwh: Math.round(monthlyKwh),
      annualKwh: Math.round(annualKwh), 
      systemCost: Math.round(systemCost)
    };
  };

  // Calculate monthly loan payment for financing
  const calculateLoanPayment = () => {
    const systemDetails = calculateSystemDetails();
    const totalIncentives = (systemDetails.systemCost * 0.30) + ((systemDetails.annualKwh / 1000) * 90 * 15);
    const loanAmount = systemDetails.systemCost + roofAdder - totalIncentives;
    
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTermYears * 12;
    
    if (interestRate === 0) {
      return loanAmount / numPayments;
    }
    
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return monthlyPayment;
  };

  const calculateSavings = () => {
    let solarPayment;
    
    if (showPaymentOptions) {
      if (paymentType === 'cash') {
        // Use the actual calculated solar bill for cash purchase
        const systemDetails = calculateSystemDetails();
        const totalIncentives = (systemDetails.systemCost * 0.30) + ((systemDetails.annualKwh / 1000) * 90 * 15);
        const netCost = systemDetails.systemCost + roofAdder - totalIncentives;
        const months = timeframe * 12;
        solarPayment = Math.round(netCost / months);
      } else {
        // Use loan payment calculation for finance
        solarPayment = Math.round(calculateLoanPayment());
      }
    } else {
      // Use the original calculation for default
      solarPayment = monthlyBill * solarRate;
    }
    
    const data = [];
    
    for (let year = 0; year <= timeframe; year++) {
      const utilityBill = monthlyBill * Math.pow(1 + utilityIncrease, year) * 12; // Annual cost
      const solarCost = solarPayment * 12; // Fixed annual cost
      const savings = utilityBill - solarCost;
      
      data.push({
        year,
        utility: Math.round(utilityBill),
        solar: Math.round(solarCost),
        savings: Math.round(savings)
      });
    }
    
    return data;
  };

  const data = calculateSavings();
  const totalSavings = data.reduce((sum, item) => sum + item.savings, 0);

  // Trigger animation based on savings amount
  useEffect(() => {
    if (totalSavings > 50000) {
      setShowAnimation("🌟 Amazing! Over $50K in savings! 🌟");
    } else if (totalSavings > 30000) {
      setShowAnimation("🎉 Fantastic! Over $30K in savings! 🎉");
    } else if (totalSavings > 20000) {
      setShowAnimation("💚 Great! Over $20K in savings! 💚");
    } else if (totalSavings > 10000) {
      setShowAnimation("☀️ Nice! Over $10K in savings! ☀️");
    } else {
      setShowAnimation("");
    }

    if (totalSavings > 0 && showAnimation) {
      const timer = setTimeout(() => setShowAnimation(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [totalSavings]);

  const handleCalculate = () => {
    setShowResults(true);
    // Scroll to results
    setTimeout(() => {
      const element = document.getElementById('savings-results');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section id="savings-calculator" className="py-20 bg-sunman-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-semibold text-black">Solar Savings Calculator</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how much you can save with solar over 25 years as utility rates continue to rise
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-2xl border border-gray-200" style={{ boxShadow: '0 15px 35px rgba(5, 141, 220, 0.2)' }}>
            <h3 className="text-xl font-bold text-black mb-6">Calculate Your Savings</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-black mb-2">
                  Current Monthly Electric Bill
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    placeholder="300"
                    className="pl-8 text-lg"
                    min="50"
                    max="1000"
                  />
                </div>
              </div>

              {!showPaymentOptions ? (
                <div>
                  <Label 
                    className="block text-sm font-medium text-black mb-2 cursor-pointer hover:text-sunman-blue transition-colors"
                    onDoubleClick={() => setShowPaymentOptions(true)}
                  >
                    New Easy Solar Bill
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      type="number"
                      value={Math.round(monthlyBill * 0.7)}
                      readOnly
                      className="pl-8 text-lg bg-gray-50"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">30% less than your current bill</p>
                </div>
              ) : (
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-blue-50">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-800">System Details</h4>
                    <button 
                      onClick={() => setShowPaymentOptions(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-black mb-2">Payment Type</Label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentType"
                          value="cash"
                          checked={paymentType === 'cash'}
                          onChange={(e) => setPaymentType(e.target.value as 'cash')}
                          className="mr-2"
                        />
                        <span className="text-sm">Cash Purchase</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentType"
                          value="finance"
                          checked={paymentType === 'finance'}
                          onChange={(e) => setPaymentType(e.target.value as 'finance')}
                          className="mr-2"
                        />
                        <span className="text-sm">Finance (30% less than current bill)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-black mb-2">Utility Company</Label>
                    <Select value={utilityCompany} onValueChange={(value) => setUtilityCompany(value as 'pseg' | 'ace' | 'jcpl')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pseg">PSEG ($0.29/kWh)</SelectItem>
                        <SelectItem value="ace">ACE ($0.30/kWh)</SelectItem>
                        <SelectItem value="jcpl">JCP&L ($0.25/kWh)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2">System Calculations:</h5>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center">
                        <span 
                          className="cursor-pointer hover:text-blue-600 transition-colors"
                          onDoubleClick={() => setEditingUsage(true)}
                        >
                          Monthly Usage: 
                        </span>
                        {editingUsage ? (
                          <div className="ml-2 flex items-center">
                            <input
                              type="number"
                              value={customMonthlyKwh || calculateSystemDetails().monthlyKwh}
                              onChange={(e) => setCustomMonthlyKwh(Number(e.target.value))}
                              className="w-20 px-2 py-1 text-sm border rounded"
                              onBlur={() => setEditingUsage(false)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setEditingUsage(false);
                                }
                              }}
                              autoFocus
                            />
                            <span className="ml-1">kWh</span>
                          </div>
                        ) : (
                          <span className="ml-1">
                            {calculateSystemDetails().monthlyKwh} kWh
                            {customMonthlyKwh !== null && (
                              <button 
                                onClick={() => setCustomMonthlyKwh(null)}
                                className="ml-2 text-xs text-red-500 hover:text-red-700"
                              >
                                reset
                              </button>
                            )}
                          </span>
                        )}
                      </div>
                      <div>Annual Usage: {calculateSystemDetails().annualKwh.toLocaleString()} kWh</div>
                      <div>System Cost: <span className="text-green-600 font-bold">${calculateSystemDetails().systemCost.toLocaleString()}</span></div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <h5 className="font-semibold text-green-800 mb-2">Incentives:</h5>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Federal ITC (30% of system):</span>
                        <span className="text-green-700 font-bold">
                          ${Math.round(calculateSystemDetails().systemCost * 0.30).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>NJ State Incentives:</span>
                        <span className="text-green-700 font-bold">
                          ${Math.round((calculateSystemDetails().annualKwh / 1000) * 90 * 15).toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t border-green-300 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total Incentives:</span>
                          <span className="text-green-800 font-bold text-lg">
                            ${Math.round(
                              (calculateSystemDetails().systemCost * 0.30) + 
                              ((calculateSystemDetails().annualKwh / 1000) * 90 * 15)
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-green-600 mt-2">
                        NJ: $90 per 1000kWh produced, 15 years from interconnection
                      </div>
                    </div>
                  </div>

                  {paymentType === 'finance' && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 space-y-3">
                      <h5 className="font-semibold text-blue-800 mb-2">Financing Options:</h5>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="block text-sm font-medium text-black mb-1">Loan Term</Label>
                          <Select value={loanTermYears.toString()} onValueChange={(value) => setLoanTermYears(Number(value))}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">10 years</SelectItem>
                              <SelectItem value="15">15 years</SelectItem>
                              <SelectItem value="20">20 years</SelectItem>
                              <SelectItem value="25">25 years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="block text-sm font-medium text-black mb-1">Interest Rate</Label>
                          <Select value={interestRate.toString()} onValueChange={(value) => setInterestRate(Number(value))}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2.0">2.0%</SelectItem>
                              <SelectItem value="2.5">2.5%</SelectItem>
                              <SelectItem value="3.0">3.0%</SelectItem>
                              <SelectItem value="3.5">3.5%</SelectItem>
                              <SelectItem value="4.0">4.0%</SelectItem>
                              <SelectItem value="4.5">4.5%</SelectItem>
                              <SelectItem value="5.0">5.0%</SelectItem>
                              <SelectItem value="5.5">5.5%</SelectItem>
                              <SelectItem value="6.0">6.0%</SelectItem>
                              <SelectItem value="6.5">6.5%</SelectItem>
                              <SelectItem value="7.0">7.0%</SelectItem>
                              <SelectItem value="7.5">7.5%</SelectItem>
                              <SelectItem value="8.0">8.0%</SelectItem>
                              <SelectItem value="8.5">8.5%</SelectItem>
                              <SelectItem value="9.0">9.0%</SelectItem>
                              <SelectItem value="9.5">9.5%</SelectItem>
                              <SelectItem value="10.0">10.0%</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="bg-white p-2 rounded border">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Loan Amount (after incentives):</span>
                            <span className="font-bold">
                              ${Math.round(calculateSystemDetails().systemCost + roofAdder - 
                                ((calculateSystemDetails().systemCost * 0.30) + 
                                ((calculateSystemDetails().annualKwh / 1000) * 90 * 15))
                              ).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly Payment:</span>
                            <span className="text-blue-700 font-bold">
                              ${Math.round(calculateLoanPayment()).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="block text-sm font-medium text-black mb-2">Roof Work Needed</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        type="number"
                        value={roofAdder}
                        onChange={(e) => setRoofAdder(Number(e.target.value))}
                        placeholder="0"
                        className="pl-8"
                        min="0"
                        max="50000"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Additional cost for roof repairs/replacement</p>
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-black mb-2">New Solar Bill</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        type="number"
                        value={(() => {
                          if (paymentType === 'cash') {
                            const systemDetails = calculateSystemDetails();
                            const totalIncentives = (systemDetails.systemCost * 0.30) + ((systemDetails.annualKwh / 1000) * 90 * 15);
                            const netCost = systemDetails.systemCost + roofAdder - totalIncentives;
                            const months = timeframe * 12;
                            return Math.round(netCost / months);
                          } else {
                            return Math.round(calculateLoanPayment());
                          }
                        })()}
                        readOnly
                        className="pl-8 bg-gray-50"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {paymentType === 'cash' 
                        ? `System + roof costs minus incentives over ${timeframe} years`
                        : 'Financing + roof costs'
                      }
                    </p>
                  </div>
                </div>
              )}

              <div>
                <Label className="block text-sm font-medium text-black mb-2">
                  Utility Rate Increase (% annually)
                </Label>
                <Select value={utilityIncrease.toString()} onValueChange={(value) => setUtilityIncrease(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.03">3%</SelectItem>
                    <SelectItem value="0.04">4%</SelectItem>
                    <SelectItem value="0.05">5%</SelectItem>
                    <SelectItem value="0.06">6%</SelectItem>
                    <SelectItem value="0.07">7%</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-sm font-medium text-black mb-2">
                  Time Period (years)
                </Label>
                <Select value={timeframe.toString()} onValueChange={(value) => setTimeframe(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 relative" style={{ boxShadow: '0 15px 35px rgba(5, 141, 220, 0.2)' }}>
            <h3 className="text-2xl font-bold text-black mb-6">{timeframe}-Year Energy Cost Comparison</h3>
            

            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      padding: '12px'
                    }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const utilityPayment = Number(payload.find(p => p.dataKey === 'utility')?.value || 0);
                        const solarPayment = Number(payload.find(p => p.dataKey === 'solar')?.value || 0);
                        const yearlyDifference = utilityPayment - solarPayment;
                        
                        // Calculate total savings from year 1 to current year
                        const currentYear = Number(label);
                        let totalSavings = 0;
                        for (let i = 1; i <= currentYear; i++) {
                          const yearData = data.find(d => d.year === i);
                          if (yearData) {
                            totalSavings += (yearData.utility - yearData.solar);
                          }
                        }
                        
                        return (
                          <div className="bg-white border border-gray-300 rounded-md p-3 shadow-lg max-w-[250px]">
                            <div className="font-semibold text-gray-800 mb-2 text-center text-sm">Year {label}</div>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Utility:</span>
                                <span style={{ color: '#ff6b47' }} className="font-semibold">${utilityPayment.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Solar:</span>
                                <span className="text-sunman-blue font-semibold">${solarPayment.toLocaleString()}</span>
                              </div>
                              <div className="border-t pt-1 mt-1">
                                <div className="flex justify-between">
                                  <span className="text-green-700">Yearly Savings:</span>
                                  <span className="text-green-600 font-bold">${yearlyDifference.toLocaleString()}</span>
                                </div>
                                {currentYear > 1 && (
                                  <div className="bg-green-100 border border-green-300 rounded-sm p-1 mt-1">
                                    <div className="flex justify-between">
                                      <span className="text-green-800 text-xs">Total (1-{currentYear}):</span>
                                      <span className="text-green-700 font-bold text-xs">${totalSavings.toLocaleString()}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="utility" 
                    stroke="#ff6b47" 
                    strokeWidth={2}
                    name="Utility Bill"
                    dot={{ fill: '#ff6b47', strokeWidth: 0, r: 3 }}
                    activeDot={{ r: 5, stroke: '#ff6b47', strokeWidth: 1, fill: 'white' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="solar" 
                    stroke="#058ddc" 
                    strokeWidth={2}
                    name="Solar Payment"
                    dot={{ fill: '#058ddc', strokeWidth: 0, r: 3 }}
                    activeDot={{ r: 5, stroke: '#058ddc', strokeWidth: 1, fill: 'white' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-100 border border-green-300 p-4 rounded-lg group cursor-pointer h-32 relative overflow-hidden">
                {/* Front of card */}
                <div className="absolute inset-0 p-4 transition-opacity duration-300 group-hover:opacity-0">
                  <h4 className="font-semibold text-green-700 mb-2">1st Year Savings:</h4>
                  <div className="text-xl font-bold text-green-600">
                    ${Math.round(monthlyBill * (1 - 0.7) * 12).toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600 mt-1">
                    ${Math.round(monthlyBill * (1 - 0.7))} per month
                  </div>
                </div>
                
                {/* Back of card */}
                <div className="absolute inset-0 p-3 bg-white border border-green-400 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h5 className="font-bold text-green-800 mb-2 text-sm">What ${Math.round(monthlyBill * (1 - 0.7) * 12).toLocaleString()} could buy:</h5>
                  <ul className="text-xs text-gray-700 space-y-0.5 max-h-20 overflow-y-auto">
                    {getYearlySavingsItems(Math.round(monthlyBill * (1 - 0.7) * 12)).slice(0, 6).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-100 border border-green-300 p-4 rounded-lg group cursor-pointer h-32 relative overflow-hidden">
                {/* Front of card */}
                <div className="absolute inset-0 p-4 transition-opacity duration-300 group-hover:opacity-0">
                  <h4 className="font-semibold text-green-700 mb-2">Savings Over {timeframe} Years:</h4>
                  <div className="text-xl font-bold text-green-600">
                    ${Math.round(totalSavings).toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600 mt-1">
                    Total projected savings
                  </div>
                </div>
                
                {/* Back of card */}
                <div className="absolute inset-0 p-3 bg-white border border-green-400 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h5 className="font-bold text-green-800 mb-2 text-sm">What ${Math.round(totalSavings).toLocaleString()} could buy:</h5>
                  <ul className="text-xs text-gray-700 space-y-0.5 max-h-20 overflow-y-auto">
                    {getTotalSavingsItems(Math.round(totalSavings)).slice(0, 7).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}