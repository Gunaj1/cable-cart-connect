
import React, { useState } from 'react';
import { X, CreditCard, Wallet, MapPin, CheckCircle, ChevronRight, ShoppingBag, Smartphone, Building, Clock, Truck, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface AddressForm {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  instructions: string;
}

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, items, total }) => {
  const [step, setStep] = useState<'address' | 'payment' | 'delivery' | 'confirmation'>('address');
  const [address, setAddress] = useState<AddressForm>({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: '',
    email: '',
    instructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'debit-card' | 'upi' | 'net-banking' | 'cash' | 'wallet'>('credit-card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [upiId, setUpiId] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express' | 'same-day'>('standard');
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  if (!isOpen) return null;
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'number') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'expiry') {
      const formatted = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').substr(0, 5);
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
    } else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const isAddressValid = () => {
    return address.fullName && address.street && address.city && 
           address.state && address.zipCode && address.phone && address.email;
  };
  
  const isPaymentValid = () => {
    if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
      return cardDetails.number.replace(/\s/g, '').length >= 16 && cardDetails.name && cardDetails.expiry && cardDetails.cvc;
    } else if (paymentMethod === 'upi') {
      return upiId.includes('@');
    }
    return true;
  };
  
  const handleNextStep = () => {
    if (step === 'address' && isAddressValid()) {
      setStep('payment');
    } else if (step === 'payment' && isPaymentValid()) {
      setStep('delivery');
    } else if (step === 'delivery') {
      setStep('confirmation');
    }
  };
  
  const handlePreviousStep = () => {
    if (step === 'payment') {
      setStep('address');
    } else if (step === 'delivery') {
      setStep('payment');
    } else if (step === 'confirmation') {
      setStep('delivery');
    }
  };
  
  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    // Simulate order processing
    setTimeout(() => {
      console.log('Order placed successfully!', {
        items,
        address,
        paymentMethod,
        deliveryOption,
        total: total + getDeliveryPrice(),
        orderId: Math.random().toString(36).substr(2, 9).toUpperCase()
      });
      // Reset form and close modal after 3 seconds
      setTimeout(() => {
        setOrderPlaced(false);
        setStep('address');
        onClose();
      }, 3000);
    }, 2000);
  };

  const getDeliveryTime = () => {
    switch (deliveryOption) {
      case 'same-day': return '6-8 hours';
      case 'express': return '1-2 days';
      default: return '3-5 days';
    }
  };

  const getDeliveryPrice = () => {
    switch (deliveryOption) {
      case 'same-day': return 150;
      case 'express': return 50;
      default: return 0;
    }
  };

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h3>
                <p className="text-gray-600">Your order is being processed and you'll receive a confirmation email shortly.</p>
              </div>
              <Badge variant="secondary" className="px-4 py-2">
                Order ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const AddressStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Address</h2>
        <p className="text-gray-600">Where should we deliver your order?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            value={address.fullName}
            onChange={handleAddressChange}
            placeholder="Enter your full name"
            className="font-medium"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={address.phone}
            onChange={handleAddressChange}
            placeholder="+91 9876543210"
            className="font-medium"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={address.email}
            onChange={handleAddressChange}
            placeholder="your.email@example.com"
            className="font-medium"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="street">Street Address *</Label>
          <Input
            id="street"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            placeholder="House/Flat No., Street Name, Area"
            className="font-medium"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            placeholder="Enter your city"
            className="font-medium"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            placeholder="Enter your state"
            className="font-medium"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zipCode">PIN Code *</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={address.zipCode}
            onChange={handleAddressChange}
            placeholder="123456"
            className="font-medium"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <select
            id="country"
            name="country"
            value={address.country}
            onChange={handleAddressChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium"
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
          </select>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
          <Textarea
            id="instructions"
            name="instructions"
            value={address.instructions}
            onChange={handleAddressChange}
            placeholder="Any special instructions for delivery..."
            className="font-medium resize-none"
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleNextStep}
          disabled={!isAddressValid()}
          className="px-8 py-3 font-semibold"
        >
          Continue to Payment
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
  
  const PaymentStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
        <p className="text-gray-600">Choose your preferred payment option</p>
      </div>
      
      <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Credit Card */}
          <Label htmlFor="credit-card" className="cursor-pointer">
            <div className={`border-2 rounded-lg p-4 transition-all ${
              paymentMethod === 'credit-card' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <CreditCard className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">Credit Card</span>
              </div>
            </div>
          </Label>

          {/* Debit Card */}
          <Label htmlFor="debit-card" className="cursor-pointer">
            <div className={`border-2 rounded-lg p-4 transition-all ${
              paymentMethod === 'debit-card' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="debit-card" id="debit-card" />
                <CreditCard className="w-6 h-6 text-green-600" />
                <span className="font-semibold">Debit Card</span>
              </div>
            </div>
          </Label>

          {/* UPI */}
          <Label htmlFor="upi" className="cursor-pointer">
            <div className={`border-2 rounded-lg p-4 transition-all ${
              paymentMethod === 'upi' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="upi" id="upi" />
                <Smartphone className="w-6 h-6 text-purple-600" />
                <span className="font-semibold">UPI Payment</span>
              </div>
            </div>
          </Label>

          {/* Net Banking */}
          <Label htmlFor="net-banking" className="cursor-pointer">
            <div className={`border-2 rounded-lg p-4 transition-all ${
              paymentMethod === 'net-banking' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="net-banking" id="net-banking" />
                <Building className="w-6 h-6 text-indigo-600" />
                <span className="font-semibold">Net Banking</span>
              </div>
            </div>
          </Label>

          {/* Digital Wallet */}
          <Label htmlFor="wallet" className="cursor-pointer">
            <div className={`border-2 rounded-lg p-4 transition-all ${
              paymentMethod === 'wallet' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="wallet" id="wallet" />
                <Wallet className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">Digital Wallet</span>
              </div>
            </div>
          </Label>

          {/* Cash on Delivery */}
          <Label htmlFor="cash" className="cursor-pointer">
            <div className={`border-2 rounded-lg p-4 transition-all ${
              paymentMethod === 'cash' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="cash" id="cash" />
                <Package className="w-6 h-6 text-green-600" />
                <span className="font-semibold">Cash on Delivery</span>
              </div>
            </div>
          </Label>
        </div>
      </RadioGroup>

      {/* Payment Details Form */}
      {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Card Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                id="cardNumber"
                name="number"
                value={cardDetails.number}
                onChange={handleCardDetailsChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="font-mono"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name *</Label>
              <Input
                id="cardName"
                name="name"
                value={cardDetails.name}
                onChange={handleCardDetailsChange}
                placeholder="John Doe"
                className="font-medium"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date *</Label>
                <Input
                  id="expiry"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardDetailsChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="font-mono"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC *</Label>
                <Input
                  id="cvc"
                  name="cvc"
                  value={cardDetails.cvc}
                  onChange={handleCardDetailsChange}
                  placeholder="123"
                  maxLength={3}
                  className="font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {paymentMethod === 'upi' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">UPI Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID *</Label>
              <Input
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@paytm"
                className="font-medium"
              />
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex justify-between pt-4">
        <Button
          onClick={handlePreviousStep}
          variant="outline"
          className="px-6 py-3 font-semibold"
        >
          Back to Address
        </Button>
        
        <Button
          onClick={handleNextStep}
          disabled={!isPaymentValid()}
          className="px-8 py-3 font-semibold"
        >
          Continue to Delivery
        </Button>
      </div>
    </div>
  );

  const DeliveryStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Delivery Options</h2>
        <p className="text-gray-600">When would you like to receive your order?</p>
      </div>
      
      <RadioGroup value={deliveryOption} onValueChange={(value: any) => setDeliveryOption(value)}>
        <div className="space-y-4">
          <Label htmlFor="standard" className="cursor-pointer">
            <div className={`border-2 rounded-lg p-6 transition-all ${
              deliveryOption === 'standard' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="standard" id="standard" />
                  <div className="flex items-center space-x-3">
                    <Truck className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-semibold text-lg">Standard Delivery</div>
                      <p className="text-gray-600">3-5 business days</p>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 font-bold">
                  FREE
                </Badge>
              </div>
            </div>
          </Label>

          <Label htmlFor="express" className="cursor-pointer">
            <div className={`border-2 rounded-lg p-6 transition-all ${
              deliveryOption === 'express' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="express" id="express" />
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="font-semibold text-lg">Express Delivery</div>
                      <p className="text-gray-600">1-2 business days</p>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="border-blue-500 text-blue-600 font-bold">
                  ₹50
                </Badge>
              </div>
            </div>
          </Label>

          <Label htmlFor="same-day" className="cursor-pointer">
            <div className={`border-2 rounded-lg p-6 transition-all ${
              deliveryOption === 'same-day' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="same-day" id="same-day" />
                  <div className="flex items-center space-x-3">
                    <Truck className="w-6 h-6 text-red-600" />
                    <div>
                      <div className="font-semibold text-lg">Same Day Delivery</div>
                      <p className="text-gray-600">6-8 hours (Delhi NCR only)</p>
                    </div>
                  </div>
                </div>
                <Badge variant="destructive" className="font-bold">
                  ₹150
                </Badge>
              </div>
            </div>
          </Label>
        </div>
      </RadioGroup>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Package className="w-5 h-5 mr-2 text-blue-600" />
            Delivery Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated delivery time:</span>
            <span className="font-semibold">{getDeliveryTime()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery charge:</span>
            <span className="font-semibold">{getDeliveryPrice() === 0 ? 'FREE' : `₹${getDeliveryPrice()}`}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-3">
            <span>Total Amount:</span>
            <span className="text-blue-600">₹{(total + getDeliveryPrice()).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between pt-4">
        <Button
          onClick={handlePreviousStep}
          variant="outline"
          className="px-6 py-3 font-semibold"
        >
          Back to Payment
        </Button>
        
        <Button
          onClick={handleNextStep}
          className="px-8 py-3 font-semibold"
        >
          Review Order
        </Button>
      </div>
    </div>
  );
  
  const ConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Order</h2>
        <p className="text-gray-600">Please check all information before placing your order</p>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-semibold">{address.fullName}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
              <p className="text-gray-600">Phone: {address.phone}</p>
              <p className="text-gray-600">Email: {address.email}</p>
              {address.instructions && (
                <p className="text-gray-600 italic">Instructions: {address.instructions}</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentMethod === 'credit-card' && (
              <div>
                <p className="font-semibold">Credit Card</p>
                <p>**** **** **** {cardDetails.number.slice(-4)}</p>
                <p>{cardDetails.name}</p>
              </div>
            )}
            {paymentMethod === 'debit-card' && (
              <div>
                <p className="font-semibold">Debit Card</p>
                <p>**** **** **** {cardDetails.number.slice(-4)}</p>
                <p>{cardDetails.name}</p>
              </div>
            )}
            {paymentMethod === 'upi' && (
              <div>
                <p className="font-semibold">UPI Payment</p>
                <p>{upiId}</p>
              </div>
            )}
            {paymentMethod === 'net-banking' && (
              <p className="font-semibold">Net Banking</p>
            )}
            {paymentMethod === 'wallet' && (
              <p className="font-semibold">Digital Wallet</p>
            )}
            {paymentMethod === 'cash' && (
              <p className="font-semibold">Cash on Delivery</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Truck className="w-5 h-5 mr-2 text-blue-600" />
              Delivery Option
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p className="font-semibold capitalize">{deliveryOption.replace('-', ' ')} Delivery</p>
              <p className="text-gray-600">Estimated time: {getDeliveryTime()}</p>
              <p className="text-gray-600">Delivery charge: {getDeliveryPrice() === 0 ? 'FREE' : `₹${getDeliveryPrice()}`}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="space-y-2 pt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery charges:</span>
                  <span>{getDeliveryPrice() === 0 ? 'FREE' : `₹${getDeliveryPrice()}`}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-3">
                  <span>Total:</span>
                  <span className="text-blue-600">₹{(total + getDeliveryPrice()).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button
          onClick={handlePreviousStep}
          variant="outline"
          className="px-6 py-3 font-semibold"
        >
          Back to Delivery
        </Button>
        
        <Button
          onClick={handlePlaceOrder}
          className="px-8 py-3 font-semibold bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        >
          Place Order
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white w-full max-w-4xl my-8 rounded-2xl shadow-2xl">
        <div className="sticky top-0 bg-white z-10 rounded-t-2xl border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {step === 'address' && 'Checkout'}
            {step === 'payment' && 'Payment'}
            {step === 'delivery' && 'Delivery'}
            {step === 'confirmation' && 'Order Confirmation'}
          </h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center w-full max-w-2xl mx-auto">
              <div className={`flex flex-col items-center ${step === 'address' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === 'address' ? 'bg-blue-600 text-white' : step === 'payment' || step === 'delivery' || step === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {step === 'payment' || step === 'delivery' || step === 'confirmation' ? <CheckCircle className="w-6 h-6" /> : "1"}
                </div>
                <span className="text-sm mt-2 font-medium">Address</span>
              </div>
              
              <div className={`flex-1 h-1 mx-4 rounded ${step === 'address' ? 'bg-gray-200' : 'bg-green-500'}`}></div>
              
              <div className={`flex flex-col items-center ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === 'payment' ? 'bg-blue-600 text-white' : step === 'delivery' || step === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {step === 'delivery' || step === 'confirmation' ? <CheckCircle className="w-6 h-6" /> : "2"}
                </div>
                <span className="text-sm mt-2 font-medium">Payment</span>
              </div>
              
              <div className={`flex-1 h-1 mx-4 rounded ${step === 'delivery' || step === 'confirmation' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              
              <div className={`flex flex-col items-center ${step === 'delivery' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === 'delivery' ? 'bg-blue-600 text-white' : step === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {step === 'confirmation' ? <CheckCircle className="w-6 h-6" /> : "3"}
                </div>
                <span className="text-sm mt-2 font-medium">Delivery</span>
              </div>

              <div className={`flex-1 h-1 mx-4 rounded ${step === 'confirmation' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              
              <div className={`flex flex-col items-center ${step === 'confirmation' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  4
                </div>
                <span className="text-sm mt-2 font-medium">Confirm</span>
              </div>
            </div>
          </div>
          
          {step === 'address' && <AddressStep />}
          {step === 'payment' && <PaymentStep />}
          {step === 'delivery' && <DeliveryStep />}
          {step === 'confirmation' && <ConfirmationStep />}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
