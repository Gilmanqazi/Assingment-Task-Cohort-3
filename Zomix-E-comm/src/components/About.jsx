import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen bg-white text-zinc-900">
      
      {/* Header Section */}
      <div className="text-center space-y-4 mb-16">
        <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
          About Our Brand
        </p>
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-zinc-900">
          Designed for simplicity. Built for everyday life.
        </h1>
        <p className="text-base text-zinc-500 max-w-2xl mx-auto leading-relaxed">
          We believe in creating a seamless shopping experience where quality, aesthetics, and functionality come together effortlessly.
        </p>
      </div>

      {/* Main Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-100">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" 
            alt="Store Essentials" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-normal text-zinc-900 tracking-tight">
            Our Philosophy
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Founded with a vision to redefine modern online shopping, we cut out the noise of unnecessary options to bring you only carefully curated, high-grade essentials.
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Every item in our collection goes through strict quality checks to ensure that what arrives at your doorstep is nothing short of exceptional.
          </p>
          <div className="pt-2">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600 transition-colors"
            >
              Explore Collection <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="border-t border-zinc-100 pt-16">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-10 text-center">
          Why Choose Us
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          <div className="space-y-2 border-l border-zinc-200 pl-4">
            <span className="text-xs font-mono text-zinc-400">01 / Quality First</span>
            <h4 className="text-base font-medium text-zinc-900">Curated Standards</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We partner directly with trusted manufacturers to deliver genuine products every time.
            </p>
          </div>

          <div className="space-y-2 border-l border-zinc-200 pl-4">
            <span className="text-xs font-mono text-zinc-400">02 / Seamless Delivery</span>
            <h4 className="text-base font-medium text-zinc-900">Fast & Safe Shipping</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Reliable delivery partners to make sure your package reaches you safely without delay.
            </p>
          </div>

          <div className="space-y-2 border-l border-zinc-200 pl-4">
            <span className="text-xs font-mono text-zinc-400">03 / Customer Care</span>
            <h4 className="text-base font-medium text-zinc-900">Always Here to Help</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Transparent returns and a support team dedicated to resolving your queries quickly.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-20 bg-zinc-50 border border-zinc-100 rounded-2xl p-8 sm:p-12 text-center space-y-4">
        <h3 className="text-2xl font-normal text-zinc-900">Ready to upgrade your everyday carry?</h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto">
          Browse through our latest arrivals and find products made for your lifestyle.
        </p>
        <div className="pt-2">
          <Link 
            to="/shop" 
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-lg inline-block transition-all shadow-sm"
          >
            Start Shopping
          </Link>
        </div>
      </div>

    </div>
  );
};

export default About;