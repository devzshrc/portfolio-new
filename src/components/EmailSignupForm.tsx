'use client';

import { useState, FormEvent } from 'react';
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function EmailSignupForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast.error('Please enter your email.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Successfully subscribed! Thank you.');
        setEmail('');
      } else {
        toast.error(result.error || 'An error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('An unexpected error occurred. Please try again later.');
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center gap-2 my-4 max-w-md mx-auto">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-grow dark:text-white"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="h-9 px-4 py-1 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-300 rounded-md shadow-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-none"
      >
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
} 