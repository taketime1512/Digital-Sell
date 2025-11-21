import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PurchaseModal from './components/PurchaseModal';
import { ArtPiece, PurchaseRequest } from './types';
import { generateConfirmationMessage } from './services/geminiService';
import { Loader2, Check, AlertCircle } from 'lucide-react';

// Mock Data Generation
const generateArtPieces = (): ArtPiece[] => {
  return Array.from({ length: 15 }).map((_, i) => {
    // Deterministic pseudo-random numbers for pricing
    const id = i + 1;
    const price = 50 + ((id * 17) % 200) * 5; 
    
    return {
      id: id,
      title: `Abstract Composition #${id}`,
      artist: `Artist ${String.fromCharCode(65 + (i % 5))}`,
      price: price,
      imageUrl: `https://picsum.photos/id/${id + 20}/800/800`,
      description: "A stunning digital representation of modern chaos and beauty."
    };
  });
};

const App: React.FC = () => {
  const [artPieces, setArtPieces] = useState<ArtPiece[]>([]);
  const [selectedArt, setSelectedArt] = useState<ArtPiece | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Load initial data
  useEffect(() => {
    setArtPieces(generateArtPieces());
  }, []);

  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleArtClick = (art: ArtPiece) => {
    setSelectedArt(art);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Slight delay to clear selected art so animation looks smooth
    setTimeout(() => setSelectedArt(null), 300); 
  };

  const handlePurchase = async (request: PurchaseRequest) => {
    setIsProcessing(true);
    
    try {
      // 1. Generate a personalized note using Gemini
      const geminiMessage = await generateConfirmationMessage(request);
      
      // 2. Simulate Email Sending Delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 3. Simulate Backend Log (In a real app, this fetches an API endpoint)
      console.log("--- PURCHASE CONFIRMED ---");
      console.log(`Item: ${request.artTitle} (ID: ${request.artId})`);
      console.log(`Price: $${request.price}`);
      console.log(`Customer: ${request.customerName} <${request.customerEmail}>`);
      console.log(`Receipt Sent To: tranxuananh.cdtk7@gmail.com`);
      console.log(`AI Message: ${geminiMessage}`);
      console.log("--------------------------");

      setNotification({
        type: 'success',
        message: `Order placed! Confirmation email sent to tranxuananh.cdtk7@gmail.com. Note: ${geminiMessage.slice(0, 50)}...`
      });
      handleCloseModal();

    } catch (error) {
      console.error(error);
      setNotification({
        type: 'error',
        message: "Failed to process purchase. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl"></div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/10 rounded-full blur-3xl"></div>
        </div>
        <h1 className="relative text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Curated Digital Masterpieces
        </h1>
        <p className="relative text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Exclusive photography and digital art. Click on any piece to acquire ownership rights.
        </p>
      </section>

      {/* Gallery Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artPieces.map((art) => (
            <div 
              key={art.id}
              onClick={() => handleArtClick(art)}
              className="group relative cursor-pointer bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={art.imageUrl} 
                  alt={art.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold font-serif">{art.title}</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-zinc-300 text-sm">{art.artist}</span>
                  <span className="text-emerald-400 font-bold">${art.price}</span>
                </div>
                <button className="mt-3 w-full bg-white text-black py-2 rounded font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  View Details
                </button>
              </div>
              
              {/* Mobile visible info (since hover doesn't work well on touch) */}
              <div className="p-4 md:hidden">
                 <h3 className="text-white font-semibold">{art.title}</h3>
                 <p className="text-emerald-400 font-bold mt-1">${art.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900/50 border-t border-zinc-800 py-8 text-center text-zinc-500 text-sm">
        <p>&copy; 2024 Lumina Art Gallery. All rights reserved.</p>
      </footer>

      {/* Modals & Notifications */}
      <PurchaseModal 
        artPiece={selectedArt}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPurchase={handlePurchase}
        isProcessing={isProcessing}
      />

      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-4 right-4 max-w-md w-full p-4 rounded-lg shadow-lg border flex items-start gap-3 animate-in slide-in-from-bottom-5 z-50 ${
          notification.type === 'success' 
            ? 'bg-zinc-900 border-emerald-500/50 text-emerald-50' 
            : 'bg-zinc-900 border-red-500/50 text-red-50'
        }`}>
          {notification.type === 'success' ? <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
          <div className="text-sm">
            <p className="font-medium">{notification.type === 'success' ? 'Success' : 'Error'}</p>
            <p className="text-zinc-400 mt-1">{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;