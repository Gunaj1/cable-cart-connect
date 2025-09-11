import React, { useState } from 'react';
import { ArrowLeft, Package, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface BulkQuoteRequest {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  products: Array<{
    productName: string;
    quantity: number;
    specifications?: string;
  }>;
  additionalRequirements: string;
  deliveryLocation: string;
  urgency: 'standard' | 'urgent' | 'flexible';
}

const BulkQuote: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BulkQuoteRequest>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    products: [{ productName: '', quantity: 0, specifications: '' }],
    additionalRequirements: '',
    deliveryLocation: '',
    urgency: 'standard'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof BulkQuoteRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      products: updatedProducts
    }));
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { productName: '', quantity: 0, specifications: '' }]
    }));
  };

  const removeProduct = (index: number) => {
    if (formData.products.length > 1) {
      const updatedProducts = formData.products.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        products: updatedProducts
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Bulk Quote Request:', formData);
      
      setIsSubmitted(true);
      toast.success('Bulk quote request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your bulk quote request. Our team will review your requirements and get back to you within 24 hours.
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate('/')} className="w-full">
                Return to Home
              </Button>
              <Button variant="outline" onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  companyName: '',
                  contactPerson: '',
                  email: '',
                  phone: '',
                  products: [{ productName: '', quantity: 0, specifications: '' }],
                  additionalRequirements: '',
                  deliveryLocation: '',
                  urgency: 'standard'
                });
              }}>
                Submit Another Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Bulk Quote Request</h1>
                <p className="text-blue-100">Get competitive pricing for large orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">
                Fill out the form below to receive a customized quote for bulk orders
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      required
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      placeholder="Enter contact person name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <Card>
              <CardHeader>
                <CardTitle>Product Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.products.map((product, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Product {index + 1}</h4>
                      {formData.products.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Product Name *</Label>
                        <Input
                          required
                          value={product.productName}
                          onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                          placeholder="e.g., CAT 6 UTP Cable"
                        />
                      </div>
                      <div>
                        <Label>Quantity *</Label>
                        <Input
                          type="number"
                          required
                          min="1"
                          value={product.quantity}
                          onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
                          placeholder="Enter quantity"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Specifications (Optional)</Label>
                      <Textarea
                        value={product.specifications}
                        onChange={(e) => handleProductChange(index, 'specifications', e.target.value)}
                        placeholder="Any specific requirements or specifications"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addProduct}>
                  Add Another Product
                </Button>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                  <Input
                    id="deliveryLocation"
                    required
                    value={formData.deliveryLocation}
                    onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
                    placeholder="Enter delivery address"
                  />
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <select
                    id="urgency"
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="flexible">Flexible (4-6 weeks)</option>
                    <option value="standard">Standard (2-3 weeks)</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                  <Textarea
                    id="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                    placeholder="Any additional requirements, customization needs, or special instructions"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[150px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Submit Request</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BulkQuote;