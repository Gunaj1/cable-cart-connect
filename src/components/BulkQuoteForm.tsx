import React, { useState } from 'react';
import { User, Mail, Phone, Building, Package, MessageSquare, CheckCircle } from 'lucide-react';

interface BulkQuoteFormProps {
  onClose: () => void;
}

const BulkQuoteForm: React.FC<BulkQuoteFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    productType: '',
    specifications: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://hddvrvhuemdqahfhgsnf.supabase.co/functions/v1/submit-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: `BULK QUOTE REQUEST\n\nQuantity: ${formData.quantity}\nProduct Type: ${formData.productType}\nSpecifications: ${formData.specifications}\n\nAdditional Details: ${formData.message}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit bulk quote request');
      }

      console.log('Bulk quote form submitted successfully:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting bulk quote form:', error);
      alert('Failed to submit bulk quote request. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100 max-w-md mx-auto">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Submitted!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your bulk quote request. Our sales team will contact you within 24 hours with a detailed quotation.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-w-2xl mx-auto">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 text-center">
        <h3 className="text-2xl font-bold mb-2">Request Bulk Quote</h3>
        <p className="text-blue-100">
          Get competitive pricing for bulk orders with custom specifications
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Company Name
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                placeholder="Enter your company name"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Quantity Required *
            </label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                placeholder="e.g., 1000 meters, 500 pieces"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Product Type *
            </label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
            >
              <option value="">Select Product Type</option>
              <option value="CAT 6 LAN Cable">CAT 6 LAN Cable</option>
              <option value="CAT 5e LAN Cable">CAT 5e LAN Cable</option>
              <option value="CCTV Cable">CCTV Cable</option>
              <option value="Power Cable">Power Cable</option>
              <option value="Speaker Cable">Speaker Cable</option>
              <option value="Telephone Cable">Telephone Cable</option>
              <option value="Custom Cable Solution">Custom Cable Solution</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Technical Specifications
          </label>
          <textarea
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-sm"
            placeholder="Please specify cable type (UTP/STP/FTP), gauge, length, color requirements, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Additional Requirements
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-sm"
              placeholder="Any additional details, delivery timeline, special requirements, etc."
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>What you'll get:</strong> Competitive pricing, technical specifications, 
            delivery timeline, and custom packaging options for bulk orders.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105 text-sm"
          >
            Submit Quote Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default BulkQuoteForm;