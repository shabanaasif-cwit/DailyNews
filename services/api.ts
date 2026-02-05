// services/api.ts
import { fetchWithRetry } from "./utils";

const API_KEY = "51de32d472994f1da4213b5f69e446a9";
const BASE_URL = "https://newsapi.org/v2";

export const fetchPosts = async (category: string = "general") => {
  const url = `${BASE_URL}/top-headlines?category=${category}&language=en&apiKey=${API_KEY}`;
  
  const data = await fetchWithRetry(url);
  return data.articles.map((article: any, index: number) => ({
    id: article.url + index,
    title: article.title,
    subtitle: `${article.source.name} · ${new Date(article.publishedAt).toLocaleDateString()}`,
    image: article.urlToImage,
    excerpt: article.description || "No summary available.",
    author: article.author || "Staff Reporter",
    url: article.url,
    publishedAt: article.publishedAt
  }));
};

