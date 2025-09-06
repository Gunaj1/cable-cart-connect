import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Website content for context
const websiteContext = `
You are a helpful AI assistant for Chhajer Cable Industries (CCI), a leading cable manufacturer based in Delhi, India, founded in 1997. 

COMPANY INFORMATION:
- Founded: 1997
- Location: Delhi, India
- Specialization: High-quality cables and networking solutions
- Values: Committed, Credible, Innovators (CCI)

PRODUCT CATEGORIES:
1. Patchcords: CAT 6 STP, CAT 6 FTP, CAT 6 UTP, CAT 5e STP, CAT 5e FTP, CAT 5e UTP
2. CAT 6 LAN Cables: Flat, Armored, STP, FTP, UTP, Outdoor
3. CAT 5e LAN Cables: Flat, 2 Pair, Armored, STP, FTP, UTP, Outdoor
4. CCTV Cables: 3+1, 4+1
5. Computer Cords: Desktop CPU Power Cord, Laptop Adapter Power Cord
6. Telephone Cables: Multi Pair Cables
7. Speaker Cables: Standard Speaker Cables
8. Lift Cables: Standard Lift Cables

SERVICES:
- Fast Delivery across India
- Quality Assurance with ISO certification
- 24/7 Customer Support
- OEM & Branding Services
- Certified Products with international standards
- Custom Solutions for specific requirements

KEY FEATURES:
- OEM Supplier
- DCM and Fluke tested products
- Customization available
- All colors available
- Multiple gauge options (23/24/25/26 AWG)
- Various jacket types (PVC, LSZH, LLDPE)
- Both copper and CCA conductor options

CONTACT INFO:
- Technical consultation available
- Bulk quote requests accepted
- Professional installation services
- After-sales service support

Always provide helpful, accurate information based on this context. If asked about something not covered here, politely redirect to contacting the company directly.
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: websiteContext + '\n\nProvide helpful, concise responses about CCI products and services. Keep responses under 200 words and always be professional and informative.'
          },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: botResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-bot function:', error);
    return new Response(JSON.stringify({ 
      error: 'Sorry, I encountered an error. Please try again or contact our support team directly.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});