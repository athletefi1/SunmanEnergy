import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory storage for leads (for demo purposes)
// In production, you would connect to a database
const leads: any[] = [];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const leadData = req.body;
      
      // Add timestamp and ID
      const lead = {
        id: leads.length + 1,
        ...leadData,
        createdAt: new Date().toISOString(),
      };
      
      leads.push(lead);
      
      return res.status(201).json({ 
        success: true, 
        message: 'Lead submitted successfully',
        id: lead.id 
      });
    } catch (error) {
      return res.status(400).json({ 
        success: false, 
        message: 'Error processing lead submission' 
      });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json(leads);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}