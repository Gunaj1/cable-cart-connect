
import React from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-end">
      <div className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl border-l border-gray-200">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 z-10 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center text-white">
            <ShoppingCart className="w-7 h-7 mr-3" />
            Shopping Cart
          </h2>
          <button onClick={onClose} className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/20">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">Add some quality cables to get started</p>
            </div>
          ) : (
            <>
              <div className="space-y-5 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white rounded-lg p-2 border border-gray-200">
                        <img 
                          src={item.id === 'pc1' ? '/image-copy.png' : item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <p className="text-xl font-bold text-blue-600">${item.price}</p>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 p-2 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-1 bg-white rounded-xl border border-gray-300 shadow-sm">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-l-xl transition-all duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-gray-900 min-w-[3rem] text-center py-3 bg-gray-50">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-r-xl transition-all duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                        <p className="text-xl font-bold text-blue-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total Amount:</span>
                  <span className="text-3xl font-bold">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('checkout', { detail: { items, total } }));
                    onClose();
                  }}
                  className="w-full bg-white text-blue-600 py-4 px-6 rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
                >
                  Proceed to Checkout
                </button>
                <button 
                  onClick={onClose}
                  className="w-full bg-blue-800/50 text-white py-3 px-6 rounded-xl hover:bg-blue-800/70 transition-all duration-300 font-medium border border-blue-400"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
