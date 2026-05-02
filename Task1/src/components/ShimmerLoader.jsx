import React from 'react';

const ShimmerLoader = () => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-2xl p-12 text-center min-w-[300px] shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Processing Your Form</h3>
        <p className="text-gray-600 mb-6">Please wait while we submit your information...</p>
        <div className="space-y-4">
          <div className="shimmer-wrapper">
            <div className="shimmer-bar h-16 rounded-xl" />
          </div>
          <div className="shimmer-wrapper">
            <div className="shimmer-bar h-16 w-4/5 mx-auto rounded-xl" />
          </div>
          <div className="shimmer-wrapper">
            <div className="shimmer-bar h-16 w-3/5 mx-auto rounded-xl" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .shimmer-wrapper {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer-bar {
          background: #f0f0f0;
          position: relative;
        }
        
        .shimmer-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          animation: shimmer 1.5s infinite;
          transform: translateX(-100%);
        }
        
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ShimmerLoader;