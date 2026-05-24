import { projects, blogPosts } from "@/data/mock";

const SITE_URL = "https://meghavi.me";

export default function sitemap() {
  const projectUrls = projects.map((p) => ({
    url: `${SITE_URL}/project/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectUrls,
    ...blogUrls,
  ];
}
