"use client"

import React from 'react';

const PaymentSuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="text-green-500 text-6xl mb-4">
          <i className="fas fa-check-circle"></i>
        </div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your transaction was completed successfully.
        </p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
