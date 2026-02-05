import NewsCard from "@/components/common/card";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // In a real app, you would fetch news where category === slug
  const categoryNews = [
    {
      title: `Top stories in ${slug}`,
      description: `Stay updated with the latest headlines in ${slug}.`,
      category: slug,
      date: "Feb 5, 2026",
      image: "https://images.unsplash.com/photo-1504711432869-5d39a110fdd3?w=400&q=80"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="border-l-4 border-orange-600 pl-4 mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white capitalize">
          {slug} News
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categoryNews.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
}