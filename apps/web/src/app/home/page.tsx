'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Homepage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle early access signup logic here
    console.log('Early access signup:', email);
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="h-8 w-8 text-yellow-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="currentColor" />
          </svg>
          <span className="text-xl font-bold">LightningFlow</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/features" className="hover:text-yellow-400 transition">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-yellow-400 transition">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-yellow-400 transition">
            About
          </Link>
        </div>
        <div>
          <Link href="/login" className="px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 transition duration-300">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your AI-Enhanced <span className="text-yellow-400">Bitcoin</span> Business Node
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Accept Bitcoin payments instantly via Lightning Network. Automate operations with powerful AI agents. Take control of your business.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-l sm:rounded-r-none mb-2 sm:mb-0 text-gray-900 w-full sm:w-auto"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-r sm:rounded-l-none transition duration-300"
            >
              Get Early Access
            </button>
          </form>
          <div className="flex items-center text-sm text-gray-400">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Non-custodial. Your keys, your business.</span>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg h-80 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-50 blur-2xl"></div>
            <div className="relative bg-gray-900 border border-gray-800 rounded-xl p-6 h-full flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500">dashboard.js</div>
              </div>
              <div className="space-y-2 flex-grow">
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded">
                  <span>Total Balance</span>
                  <span className="font-mono">0.0052 BTC</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded">
                  <span>Active Agents</span>
                  <span className="font-mono">3</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded">
                  <span>Today's Earnings</span>
                  <span className="font-mono">+0.0012 BTC</span>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <div className="px-3 py-1 bg-blue-600 text-xs rounded">AI Dashboard</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 bg-opacity-10 bg-white rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Why Choose <span className="text-yellow-400">LightningFlow</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-blue-900 bg-opacity-40 p-6 rounded-xl">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14H11V21L20 10H13Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Lightning Fast Payments</h3>
            <p className="text-gray-300">
              Accept Bitcoin payments instantly with near-zero fees via the Lightning Network.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-blue-900 bg-opacity-40 p-6 rounded-xl">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">AI Business Agents</h3>
            <p className="text-gray-300">
              Deploy intelligent agents to automate your business operations, content creation, and customer support.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-blue-900 bg-opacity-40 p-6 rounded-xl">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Self-Hosted or Managed</h3>
            <p className="text-gray-300">
              Choose between self-hosting your node for complete sovereignty or our managed non-custodial solution.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-blue-900 bg-opacity-40 p-6 rounded-xl">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
            <p className="text-gray-300">
              Gain insights into your business with powerful dashboards for finances, clients, and performance.
            </p>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-blue-900 bg-opacity-40 p-6 rounded-xl">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-Tenant Security</h3>
            <p className="text-gray-300">
              Advanced row-level security ensures your data stays private and secure in our multi-tenant architecture.
            </p>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-blue-900 bg-opacity-40 p-6 rounded-xl">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Seamless Withdrawals</h3>
            <p className="text-gray-300">
              Withdraw your Bitcoin earnings anytime with our secure LNURL-withdraw system. Your money, your control.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Supercharge Your Business?
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Join the waitlist today and be the first to experience the power of AI and Bitcoin Lightning for your business.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/signup" className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg transition duration-300 text-center">
                  Get Started Free
                </Link>
                <Link href="/contact" className="px-8 py-3 border border-white hover:bg-white hover:text-blue-900 rounded-lg transition duration-300 text-center">
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-40 h-40 relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
                <div className="relative flex items-center justify-center h-full">
                  <svg className="h-20 w-20 text-yellow-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8">
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="h-8 w-8 text-yellow-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="currentColor" />
                </svg>
                <span className="text-xl font-bold">LightningFlow</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                The ultimate AI-powered Bitcoin business platform for freelancers, creators, and small businesses.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><Link href="/features" className="text-gray-400 hover:text-yellow-400">Features</Link></li>
                  <li><Link href="/pricing" className="text-gray-400 hover:text-yellow-400">Pricing</Link></li>
                  <li><Link href="/ai-agents" className="text-gray-400 hover:text-yellow-400">AI Agents</Link></li>
                  <li><Link href="/security" className="text-gray-400 hover:text-yellow-400">Security</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-400 hover:text-yellow-400">About Us</Link></li>
                  <li><Link href="/blog" className="text-gray-400 hover:text-yellow-400">Blog</Link></li>
                  <li><Link href="/careers" className="text-gray-400 hover:text-yellow-400">Careers</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-yellow-400">Contact</Link></li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="text-gray-400 hover:text-yellow-400">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-gray-400 hover:text-yellow-400">Terms of Service</Link></li>
                  <li><Link href="/cookies" className="text-gray-400 hover:text-yellow-400">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} LightningFlow. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="https://twitter.com" className="text-gray-400 hover:text-yellow-400">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="https://github.com" className="text-gray-400 hover:text-yellow-400">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-yellow-400">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 