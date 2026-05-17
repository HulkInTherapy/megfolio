import { blogPosts } from "@/data/mock";
import { notFound } from "next/navigation";
import BlogDetail from "@/views/BlogDetail";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export default async function BlogPage({ params }) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) notFound();

  const relatedPosts = post.related
    ? blogPosts.filter((p) => post.related.includes(p.id))
    : blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return <BlogDetail post={post} relatedPosts={relatedPosts} />;
}
