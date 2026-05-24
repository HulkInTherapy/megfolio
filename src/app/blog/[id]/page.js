import { blogPosts } from "@/data/mock";
import { notFound } from "next/navigation";
import BlogDetail from "@/views/BlogDetail";

const SITE_URL = "https://meghavi.me";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return {};
  return {
    title: post.title,
    description: `${post.excerpt} — By Meghavi Rao, Applied AI Engineer. ${post.readTime} read.`,
    alternates: { canonical: `${SITE_URL}/blog/${id}` },
    openGraph: {
      title: `${post.title} | Meghavi Rao`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${id}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Meghavi Rao"],
    },
  };
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
