// services/api.ts
// /likely wraps the standard fetch to automatically try again if the internet blips or the server is busy
import { fetchWithRetry } from "./utils";

const API_KEY = "51de32d472994f1da4213b5f69e446a9";
const BASE_URL = "https://newsapi.org/v2";

//This defines an asynchronous function that takes a category (like "business"). If you don't provide one, it defaults to "general".
export const fetchPosts = async (category: string = "general") => {

  //Request string." It tells the API: "Give me the top-headlines for this category, in English, using my Key.
  const url = `${BASE_URL}/top-headlines?category=${category}&language=en&apiKey=${API_KEY}`;
  
  //This line pauses execution until the data comes back from the internet.
  //the result is stored in data
  const data = await fetchWithRetry(url);
  //.map() renaming and reshaping the data:
  return data.articles.map((article: any, index: number) => ({
    id: article.url + index,
    title: article.title,

    //You're combining the Source Name (e.g., "BBC News") and a formatted Date into one string using a middle dot (·).
    subtitle: `${article.source.name} · ${new Date(article.publishedAt).toLocaleDateString()}`,
    image: article.urlToImage,

    //if there is nothing to show then this message should apppear for user visualization
    excerpt: article.description || "No summary available.",
    author: article.author || "Staff Reporter",
    url: article.url,
    publishedAt: article.publishedAt
  }));
};

