import React, { useState, useEffect } from 'react';
import { ArtPiece, PurchaseRequest } from '../types';
import { X, Loader2, CheckCircle, Mail } from 'lucide-react';

interface PurchaseModalProps {
  artPiece: ArtPiece | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (request: PurchaseRequest) => Promise<void>;
  isProcessing: boolean;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ artPiece, isOpen, onClose, onPurchase, isProcessing }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
    }
  }, [isOpen]);

  if (!isOpen || !artPiece) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPurchase({
      artId: artPiece.id,
      artTitle: artPiece.title,
      price: artPiece.price,
      customerName: name,
      customerEmail: email,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <img 
            src={artPiece.imageUrl} 
            alt={artPiece.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent md:hidden" />
          <div className="absolute bottom-4 left-4 md:hidden">
            <h3 className="text-2xl font-bold text-white font-serif">{artPiece.title}</h3>
            <p className="text-zinc-300">${artPiece.price}</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 relative flex flex-col justify-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            disabled={isProcessing}
          >
            <X size={24} />
          </button>

          <div className="mb-6 hidden md:block">
            <h2 className="text-3xl font-serif font-bold text-white mb-2">{artPiece.title}</h2>
            <p className="text-zinc-400 text-sm mb-4">By {artPiece.artist}</p>
            <div className="text-2xl font-semibold text-emerald-400">${artPiece.price.toLocaleString()}</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="John Doe"
                disabled={isProcessing}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
                disabled={isProcessing}
              />
            </div>

            <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50 text-xs text-zinc-400 flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  A secure purchase link and the high-resolution file will be sent to your email. 
                  A copy of this transaction will be forwarded to <span className="text-indigo-400">tranxuananh.cdtk7@gmail.com</span>.
                </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
                isProcessing 
                  ? 'bg-zinc-700 cursor-not-allowed text-zinc-400' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  Confirm Purchase
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;