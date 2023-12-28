import React, { useEffect, useState } from "react";
import { get } from "./utils/http";
import { BlogPost } from "./components/BlogPosts";
import BlogPosts from "./components/BlogPosts";
import image1 from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type BlogPostDataRaw = {
  userId: number;
  id: number;
  title: string;
  body: string;
};



function App() {

  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();


  useEffect(() => {
    setIsFetching(true);
    console.log('This runs only after the first render');
    async function fetchPosts() {

      try {
        const data = (await get<BlogPostDataRaw[]>("https://jsonplaceholder.typicode.com/posts/")) as BlogPostDataRaw[];
        const posts: BlogPost[] = data.map(post => {
          return {
            id: post.id,
            title: post.title,
            text: post.body
          }
        });
       
        setFetchedPosts(posts);

      } catch (error) {
        if(error instanceof Error){
          setError(error.message);
        }
      }
      setIsFetching(false);
    }

    fetchPosts();

  }, []);

  let content: React.ReactNode;

  if(error){
    content = <ErrorMessage text={error} />;
  }

  if (isFetching) {
    content = <p id="loading-fallback">Loading...</p>;
  }

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  return (
    <main>
      <img src="{image1}" alt="" />
      {content}
    </main>
  );
}

export default App;
