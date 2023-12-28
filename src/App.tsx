import React, { useEffect, useState } from "react";
import { get } from "./utils/http";
import { BlogPost } from "./components/BlogPosts";
import BlogPosts from "./components/BlogPosts";
import image1 from "./assets/data-fetching.png";

type BlogPostDataRaw = {
  userId: number;
  id: number;
  title: string;
  body: string;
};



function App() {

  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();

  useEffect(() => {
    console.log('This runs only after the first render');
    async function fetchPosts() {
      const data = (await get<BlogPostDataRaw[]>("https://jsonplaceholder.typicode.com/posts/")) as BlogPostDataRaw[];

      const posts: BlogPost[] = data.map(post => {
        return {
          id: post.id,
          title: post.title,
          text: post.body
        }
      });
      setFetchedPosts(posts);
    }

    fetchPosts();

  }, []);

  let content : React.ReactNode;

  if(fetchedPosts){
    content = <BlogPosts posts={fetchedPosts} />;
  }

  return(
    <main>
      <img src="{image1}" alt=""/>
      {content}
    </main>
  ); 
}

export default App;
