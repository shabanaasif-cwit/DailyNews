'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <section className="max-w-3xl text-center">
        <span className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
          Welcome to
        </span>

        <h1 className="mt-3 text-5xl font-extrabold text-gray-900 leading-tight">
          Daily News
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Your trusted source for breaking headlines, in-depth stories,
          and category-wise news from around the world — updated daily.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/category/world"
            className="px-7 py-3 bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-700 transition"
          >
            Explore News
          </Link>

          <Link
            href="/about"
            className="px-7 py-3 border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            About Us
          </Link>
        </div>
      </section>
    </main>
  );
}
