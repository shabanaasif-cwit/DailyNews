'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Daily News
      </h1>

      <p className="text-gray-600 max-w-xl text-center mb-8">
        Stay informed with the latest headlines, breaking news, and
        category-wise updates from around the world.
      </p>

      <div className="flex gap-4">
        <Link
          href="/category/world"
          className="px-6 py-3 bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-700 transition"
        >
          World News
        </Link>

        <Link
          href="/category/technology"
          className="px-6 py-3 border border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-100 transition"
        >
          Technology
        </Link>
      </div>
    </main>
  );
}
