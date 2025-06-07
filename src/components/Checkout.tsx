
import React, { useState } from 'react';
import { X, CreditCard, Wallet, MapPin, CheckCircle, ChevronRight, ShoppingBag, Smartphone, Building, Clock, Truck } from 'lucide-react';

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
    email: ''
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
  
  if (!isOpen) return null;
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const isAddressValid = () => {
    return address.fullName && address.street && address.city && 
           address.state && address.zipCode && address.phone && address.email;
  };
  
  const isPaymentValid = () => {
    if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
      return cardDetails.number && cardDetails.name && cardDetails.expiry && cardDetails.cvc;
    } else if (paymentMethod === 'upi') {
      return upiId.includes('@');
    }
    return true; // Net banking, cash, wallet always valid
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
    console.log('Order placed!', { items, address, paymentMethod, deliveryOption, total });
    setTimeout(() => {
      onClose();
    }, 3000);
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
  
  const AddressStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Address</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={address.fullName}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={address.phone}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={address.email}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your street address"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your city"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your state"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Zip/Postal Code</label>
          <input
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your zip/postal code"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <select
            name="country"
            value={address.country}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <button
          onClick={handleNextStep}
          disabled={!isAddressValid()}
          className={`flex items-center px-6 py-3 rounded-lg text-white font-medium shadow-lg ${
            isAddressValid() 
              ? 'bg-gradient-to-r from-blue-600 to-gray-700 hover:from-blue-700 hover:to-gray-800' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Payment
          <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
  
  const PaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Credit Card */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === 'credit-card' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setPaymentMethod('credit-card')}
        >
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
              paymentMethod === 'credit-card' ? 'border-blue-600' : 'border-gray-400'
            }`}>
              {paymentMethod === 'credit-card' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
            </div>
            <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
            <span className="font-medium">Credit Card</span>
          </div>
        </div>

        {/* Debit Card */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === 'debit-card' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setPaymentMethod('debit-card')}
        >
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
              paymentMethod === 'debit-card' ? 'border-blue-600' : 'border-gray-400'
            }`}>
              {paymentMethod === 'debit-card' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
            </div>
            <CreditCard className="w-6 h-6 mr-3 text-green-600" />
            <span className="font-medium">Debit Card</span>
          </div>
        </div>

        {/* UPI */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === 'upi' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setPaymentMethod('upi')}
        >
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
              paymentMethod === 'upi' ? 'border-blue-600' : 'border-gray-400'
            }`}>
              {paymentMethod === 'upi' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
            </div>
            <Smartphone className="w-6 h-6 mr-3 text-purple-600" />
            <span className="font-medium">UPI Payment</span>
          </div>
        </div>

        {/* Net Banking */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === 'net-banking' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setPaymentMethod('net-banking')}
        >
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
              paymentMethod === 'net-banking' ? 'border-blue-600' : 'border-gray-400'
            }`}>
              {paymentMethod === 'net-banking' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
            </div>
            <Building className="w-6 h-6 mr-3 text-indigo-600" />
            <span className="font-medium">Net Banking</span>
          </div>
        </div>

        {/* Digital Wallet */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === 'wallet' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setPaymentMethod('wallet')}
        >
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
              paymentMethod === 'wallet' ? 'border-blue-600' : 'border-gray-400'
            }`}>
              {paymentMethod === 'wallet' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
            </div>
            <Wallet className="w-6 h-6 mr-3 text-blue-600" />
            <span className="font-medium">Digital Wallet</span>
          </div>
        </div>

        {/* Cash on Delivery */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === 'cash' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setPaymentMethod('cash')}
        >
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
              paymentMethod === 'cash' ? 'border-blue-600' : 'border-gray-400'
            }`}>
              {paymentMethod === 'cash' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
            </div>
            <MapPin className="w-6 h-6 mr-3 text-green-600" />
            <span className="font-medium">Cash on Delivery</span>
          </div>
        </div>
      </div>

      {/* Payment Details Form */}
      {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
        <div className="mt-6 space-y-4 p-6 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              name="number"
              value={cardDetails.number}
              onChange={handleCardDetailsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
            <input
              type="text"
              name="name"
              value={cardDetails.name}
              onChange={handleCardDetailsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                name="expiry"
                value={cardDetails.expiry}
                onChange={handleCardDetailsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">CVC</label>
              <input
                type="text"
                name="cvc"
                value={cardDetails.cvc}
                onChange={handleCardDetailsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'upi' && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="yourname@upi"
            />
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousStep}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
        >
          Back to Address
        </button>
        
        <button
          onClick={handleNextStep}
          disabled={!isPaymentValid()}
          className={`px-6 py-3 rounded-lg text-white font-medium shadow-lg ${
            isPaymentValid() 
              ? 'bg-gradient-to-r from-blue-600 to-gray-700 hover:from-blue-700 hover:to-gray-800' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Delivery
        </button>
      </div>
    </div>
  );

  const DeliveryStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Options</h2>
      
      <div className="space-y-4">
        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-colors ${
            deliveryOption === 'standard' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setDeliveryOption('standard')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                deliveryOption === 'standard' ? 'border-blue-600' : 'border-gray-400'
              }`}>
                {deliveryOption === 'standard' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
              </div>
              <div>
                <div className="flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-medium">Standard Delivery</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">3-5 business days</p>
              </div>
            </div>
            <span className="font-bold text-green-600">FREE</span>
          </div>
        </div>

        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-colors ${
            deliveryOption === 'express' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setDeliveryOption('express')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                deliveryOption === 'express' ? 'border-blue-600' : 'border-gray-400'
              }`}>
                {deliveryOption === 'express' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
              </div>
              <div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-600" />
                  <span className="font-medium">Express Delivery</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">1-2 business days</p>
              </div>
            </div>
            <span className="font-bold text-blue-600">₹50</span>
          </div>
        </div>

        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-colors ${
            deliveryOption === 'same-day' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setDeliveryOption('same-day')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                deliveryOption === 'same-day' ? 'border-blue-600' : 'border-gray-400'
              }`}>
                {deliveryOption === 'same-day' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
              </div>
              <div>
                <div className="flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-red-600" />
                  <span className="font-medium">Same Day Delivery</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">6-8 hours (Delhi NCR only)</p>
              </div>
            </div>
            <span className="font-bold text-red-600">₹150</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-3">Delivery Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated delivery time:</span>
            <span className="font-medium">{getDeliveryTime()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery charge:</span>
            <span className="font-medium">{getDeliveryPrice() === 0 ? 'FREE' : `₹${getDeliveryPrice()}`}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total Amount:</span>
            <span>₹{(total + getDeliveryPrice()).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousStep}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
        >
          Back to Payment
        </button>
        
        <button
          onClick={handleNextStep}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-gray-700 hover:from-blue-700 hover:to-gray-800 rounded-lg text-white font-medium shadow-lg"
        >
          Review Order
        </button>
      </div>
    </div>
  );
  
  const ConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Your Order</h2>
        <p className="text-gray-600">Please check all information before placing your order.</p>
      </div>
      
      <div className="border-b pb-6">
        <h3 className="font-medium text-lg mb-3 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Shipping Address
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-semibold">{address.fullName}</p>
          <p>{address.street}</p>
          <p>{address.city}, {address.state} {address.zipCode}</p>
          <p>{address.country}</p>
          <p className="mt-2">Phone: {address.phone}</p>
          <p>Email: {address.email}</p>
        </div>
      </div>
      
      <div className="border-b pb-6">
        <h3 className="font-medium text-lg mb-3 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
          Payment Method
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          {paymentMethod === 'credit-card' && (
            <>
              <p className="font-semibold">Credit Card</p>
              <p>Card ending in {cardDetails.number.slice(-4)}</p>
              <p>Expiry: {cardDetails.expiry}</p>
            </>
          )}
          {paymentMethod === 'debit-card' && (
            <>
              <p className="font-semibold">Debit Card</p>
              <p>Card ending in {cardDetails.number.slice(-4)}</p>
              <p>Expiry: {cardDetails.expiry}</p>
            </>
          )}
          {paymentMethod === 'upi' && (
            <>
              <p className="font-semibold">UPI Payment</p>
              <p>UPI ID: {upiId}</p>
            </>
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
        </div>
      </div>

      <div className="border-b pb-6">
        <h3 className="font-medium text-lg mb-3 flex items-center">
          <Truck className="w-5 h-5 mr-2 text-blue-600" />
          Delivery Option
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-semibold capitalize">{deliveryOption.replace('-', ' ')} Delivery</p>
          <p>Estimated time: {getDeliveryTime()}</p>
          <p>Delivery charge: {getDeliveryPrice() === 0 ? 'FREE' : `₹${getDeliveryPrice()}`}</p>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-lg mb-3 flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
          Order Summary
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600 ml-2">× {item.quantity}</span>
                </div>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery charges:</span>
              <span>{getDeliveryPrice() === 0 ? 'FREE' : `₹${getDeliveryPrice()}`}</span>
            </div>
          </div>
          <div className="border-t pt-3 flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-blue-700">₹{(total + getDeliveryPrice()).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousStep}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
        >
          Back to Delivery
        </button>
        
        <button
          onClick={handlePlaceOrder}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-gray-700 hover:from-blue-700 hover:to-gray-800 rounded-lg text-white font-medium shadow-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white w-full max-w-4xl my-8 rounded-2xl shadow-2xl">
        <div className="sticky top-0 bg-white z-10 rounded-t-2xl border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {step === 'address' && 'Checkout'}
            {step === 'payment' && 'Payment'}
            {step === 'delivery' && 'Delivery'}
            {step === 'confirmation' && 'Order Confirmation'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center w-full max-w-2xl mx-auto">
              <div className={`flex flex-col items-center ${step === 'address' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'address' ? 'bg-blue-600 text-white' : step === 'payment' || step === 'delivery' || step === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {step === 'payment' || step === 'delivery' || step === 'confirmation' ? <CheckCircle className="w-5 h-5" /> : "1"}
                </div>
                <span className="text-sm mt-1">Address</span>
              </div>
              
              <div className={`flex-1 h-0.5 mx-2 ${step === 'address' ? 'bg-gray-200' : 'bg-green-500'}`}></div>
              
              <div className={`flex flex-col items-center ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'payment' ? 'bg-blue-600 text-white' : step === 'delivery' || step === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {step === 'delivery' || step === 'confirmation' ? <CheckCircle className="w-5 h-5" /> : "2"}
                </div>
                <span className="text-sm mt-1">Payment</span>
              </div>
              
              <div className={`flex-1 h-0.5 mx-2 ${step === 'delivery' || step === 'confirmation' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              
              <div className={`flex flex-col items-center ${step === 'delivery' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'delivery' ? 'bg-blue-600 text-white' : step === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {step === 'confirmation' ? <CheckCircle className="w-5 h-5" /> : "3"}
                </div>
                <span className="text-sm mt-1">Delivery</span>
              </div>

              <div className={`flex-1 h-0.5 mx-2 ${step === 'confirmation' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              
              <div className={`flex flex-col items-center ${step === 'confirmation' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  4
                </div>
                <span className="text-sm mt-1">Confirm</span>
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
