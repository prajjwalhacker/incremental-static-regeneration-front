
   
  // Next.js will invalidate the cache when a
  // request comes in, at most once every 60 seconds.
  export const revalidate = 30
   
  // We'll prerender only the params from `generateStaticParams` at build time.
  // If a request comes in for a path that hasn't been generated,
  // Next.js will server-render the page on-demand.
  export const dynamicParams = true // or false, to 404 on unknown paths
   
  export async function generateStaticParams() {
    const posts = await fetch('https://api.vercel.app/blog').then((res) =>
      res.json()
    )
    console.log("hello");
    console.log(posts);
    return posts.map((post) => ({
      id: String(post.id),
    }))
  }
   
  export default async function Page(context) {
    const params = (await context).params;
    const id = (await params).id;
    const res = await fetch(
      `https://api.vercel.app/blog/${id}`
    );
    const post = await res.json();

    console.log("posttt");
    console.log(post);

    return (
      <main>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </main>
    )
  }