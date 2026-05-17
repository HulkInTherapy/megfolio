// Mock data for Meghavi Rao's Portfolio

export const personalInfo = {
  name: "Meghavi Rao",
  role: "Applied AI Engineer",
  tagline: "Building intelligent systems that actually make sense.",
  email: "hello@meghavi.dev",
  location: "San Francisco, CA",
  bio: `I'm an Applied AI Engineer who believes in building things that work, not just things that demo well. Currently exploring the intersection of large language models and real-world applications.

When I'm not training models or debugging pipelines, you'll find me brewing coffee, reading sci-fi, or overthinking the perfect playlist.

I value clarity over complexity, and I think the best AI is the kind you don't notice.`,
  socialLinks: {
    github: "https://github.com/meghavi",
    linkedin: "https://linkedin.com/in/meghavi",
    twitter: "https://twitter.com/meghavi"
  }
};

export const projects = [
  {
    id: "neural-search",
    title: "Neural Search Engine",
    shortDesc: "Semantic search that actually understands context.",
    fullDesc: `Built a semantic search engine that goes beyond keyword matching. Uses transformer embeddings to understand the intent behind queries, not just the words.

The system handles millions of documents with sub-100ms latency. We implemented a custom indexing strategy that balances accuracy with speed.

Key insight: Sometimes the best results aren't the most similar—they're the most useful.`,
    tech: ["Python", "FAISS", "Transformers", "FastAPI", "Redis"],
    year: "2024",
    link: "https://github.com/meghavi/neural-search",
    image: null,
    // Living Sketchbook fields
    marginNote: "started as a 'quick weekend project'... 3 months later here we are",
    insight: "Sometimes the best results aren't the most similar—they're the most useful.",
    illustration: "projectSearch"
  },
  {
    id: "conversation-ai",
    title: "Conversation AI Platform",
    shortDesc: "Enterprise chatbot that doesn't feel like talking to a wall.",
    fullDesc: `Designed and built an enterprise conversational AI platform that handles customer support at scale. The focus was on making interactions feel natural, not robotic.

Implemented context-aware responses, emotion detection, and smart handoff to human agents when needed. Reduced average handling time by 40%.

The hardest part wasn't the AI—it was understanding what customers actually needed.`,
    tech: ["LangChain", "GPT-4", "PostgreSQL", "React", "WebSockets"],
    year: "2024",
    link: "https://github.com/meghavi/convo-ai",
    image: null,
    // Living Sketchbook fields
    marginNote: "the 40% improvement came from ONE simple change... context windows",
    insight: "The hardest part wasn't the AI—it was understanding what customers actually needed.",
    illustration: "projectConversation"
  },
  {
    id: "ml-pipeline",
    title: "ML Pipeline Orchestrator",
    shortDesc: "Because training models shouldn't feel like herding cats.",
    fullDesc: `Created an internal tool to orchestrate ML training pipelines. The goal was to make experimentation fast and reproducible.

Features include automatic hyperparameter tracking, distributed training across GPU clusters, and a simple YAML-based configuration system.

This project taught me that good tooling is worth 10x the investment in fancy models.`,
    tech: ["Kubernetes", "Ray", "MLflow", "Python", "Docker"],
    year: "2023",
    link: "https://github.com/meghavi/ml-pipe",
    image: null,
    // Living Sketchbook fields
    marginNote: "wrote this after losing a week of experiments to a crashed notebook",
    insight: "Good tooling is worth 10x the investment in fancy models.",
    illustration: "projectPipeline"
  },
  {
    id: "voice-clone",
    title: "Voice Synthesis Research",
    shortDesc: "Teaching machines to speak with personality.",
    fullDesc: `Research project exploring few-shot voice cloning. The challenge was generating natural-sounding speech from just a few minutes of audio samples.

Experimented with various architectures including Tacotron variants and diffusion-based models. Published findings on improving prosody in synthesized speech.

Ethical considerations were a major part of this work—we built in safeguards against misuse.`,
    tech: ["PyTorch", "Tacotron", "WaveNet", "CUDA", "Librosa"],
    year: "2023",
    link: "https://github.com/meghavi/voice-synth",
    image: null,
    // Living Sketchbook fields
    marginNote: "spent way too long making it say 'hello world' naturally",
    insight: "Voice carries emotion, not just words. That's the hard part.",
    illustration: "projectVoice"
  }
];

export const blogPosts = [
  {
    id: "llm-production",
    title: "What I Learned Shipping LLMs to Production",
    excerpt: "It's not about the model size. It's about everything else.",
    date: "2024-06-15",
    readTime: "8 min",
    coffeeCups: 4,
    link: "/blog/llm-production",
    content: `The first time I deployed an LLM to production, I thought the hard part was over. I had fine-tuned the model, benchmarked it against a dozen metrics, and even got approval from the legal team. Easy, right?

Wrong. So very wrong.

## The Wake-Up Call

Three hours after launch, our API response times spiked to 15 seconds. Users were abandoning sessions. The support queue was filling up. And I was debugging in production at 2am with a cold cup of coffee.

Here's what nobody tells you about production LLMs:

## 1. Latency is Everything

Users will wait 2 seconds. Maybe 3 if they're patient. After that, they're gone. Your beautiful 70B parameter model means nothing if it takes 10 seconds to respond.

**What actually worked:**
- Aggressive caching (90% of queries are variations of the same thing)
- Streaming responses (start showing output immediately)
- Model distillation (sometimes 7B is enough)

## 2. Context Windows Are Expensive

Every token in your context window costs money and time. I learned to treat context like premium real estate.

> "The best context is the context you don't need to include."

We built a retrieval system that surfaces only the most relevant information. Cut our costs by 60%.

## 3. Graceful Degradation Saves Lives

When the model fails (and it will), have a plan. A simple rule-based fallback is infinitely better than a spinner that never stops.

## The Real Lesson

The model is maybe 20% of the work. The other 80%? Infrastructure, monitoring, fallbacks, rate limiting, cost optimization, and explaining to stakeholders why the AI sometimes says weird things.

Ship ugly, ship early, ship often. Then make it beautiful.`,
    marginNotes: [
      { id: 1, content: "2am debugging sessions build character... allegedly", position: "top" },
      { id: 2, content: "our first bill was $12k. for ONE day.", position: "middle" },
      { id: 3, content: "I should put this on a t-shirt", position: "bottom" }
    ],
    related: ["embeddings-explained", "ai-tooling"]
  },
  {
    id: "embeddings-explained",
    title: "Embeddings: The Unsung Hero of Modern AI",
    excerpt: "Why understanding vector spaces is more important than understanding GPT.",
    date: "2024-04-22",
    readTime: "6 min",
    coffeeCups: 3,
    link: "/blog/embeddings-explained",
    content: `Everyone's talking about GPT. But if you want to actually build useful AI systems, you need to understand embeddings first.

## What Even Is an Embedding?

An embedding is just a list of numbers that represents something. A word. A sentence. An image. A user's preferences. Anything, really.

The magic is that similar things end up with similar numbers.

## Why This Matters

Let me show you with a real example. Say you're building a search system (I've done this a few times).

**Traditional search:** User types "best coffee shops" → you look for documents containing those exact words.

**Embedding search:** User types "best coffee shops" → you convert that to numbers → find documents with similar numbers → return results about "top cafes," "great espresso places," and "where to get good coffee"

The second approach *understands meaning*. That's the difference.

## The Three Laws of Embeddings

1. **Similar things cluster together** - "king" and "queen" are close in embedding space
2. **Relationships are preserved** - king - man + woman ≈ queen (yes, really)
3. **Context changes everything** - "bank" the financial institution vs "bank" of a river have different embeddings

## Practical Tips

- **Use pre-trained embeddings first.** Training your own is almost never worth it.
- **Dimension matters.** 384 dimensions is usually enough. 1536 is overkill for most tasks.
- **Normalize your vectors.** Cosine similarity is your friend.

## The Punchline

You can build a remarkably powerful AI system with nothing but good embeddings and a vector database. No LLM required.

Sometimes the simplest solution is the best one.`,
    marginNotes: [
      { id: 1, content: "this is the stuff they should teach in school", position: "top" },
      { id: 2, content: "the king-queen thing blew my mind when I first learned it", position: "middle" }
    ],
    related: ["llm-production", "debugging-ml"]
  },
  {
    id: "ai-tooling",
    title: "Stop Building AI Products, Start Building AI Tools",
    excerpt: "A case for infrastructure over applications.",
    date: "2024-02-10",
    readTime: "5 min",
    coffeeCups: 3,
    link: "/blog/ai-tooling",
    content: `Hot take: Most AI products are built on shaky foundations. We're all so excited to ship the next ChatGPT wrapper that we forget to build the boring stuff that makes AI actually work.

## The Problem

Every AI startup is racing to build the same thing: a chat interface with an LLM behind it. Meanwhile, the real challenges go unsolved:

- How do you test an AI system?
- How do you monitor hallucinations in production?
- How do you version control prompts?
- How do you roll back a bad deployment?

## Tools > Products

The most impactful work I've done hasn't been building AI products. It's been building the tools that make AI products possible.

**An evaluation framework** that catches regressions before they hit production.

**A prompt management system** that lets you A/B test different approaches.

**A monitoring dashboard** that alerts you when the model starts saying weird things.

## The Unsexy Truth

> "The best AI companies are infrastructure companies in disguise."

Think about it. Vercel made deploying web apps trivial. Stripe made payments a solved problem. The companies that win in AI will be the ones that make AI development trivial.

## What Should You Build?

If you're starting something new, ask yourself: what's the most annoying part of building with AI? Build a tool that fixes that.

The world doesn't need another chatbot. It needs better ways to build, test, deploy, and monitor AI systems.

That's where the real opportunity is.`,
    marginNotes: [
      { id: 1, content: "controversial opinion but I stand by it", position: "top" },
      { id: 2, content: "this applies to most of tech honestly", position: "bottom" }
    ],
    related: ["llm-production", "debugging-ml"]
  },
  {
    id: "debugging-ml",
    title: "Debugging ML Systems: A Survival Guide",
    excerpt: "When print statements aren't enough.",
    date: "2023-11-28",
    readTime: "10 min",
    coffeeCups: 5,
    link: "/blog/debugging-ml",
    content: `You've been there. The model works on your laptop. It works in the notebook. But in production? Complete garbage.

Welcome to ML debugging hell. I've spent way too much time here. Let me share what I've learned.

## The Fundamental Problem

ML systems fail silently. A bug in traditional software crashes. A bug in ML just... produces slightly wrong results. Maybe. Sometimes. Under certain conditions.

This is why debugging ML is so hard.

## The Debugging Hierarchy

When something goes wrong, check these in order:

### 1. Data, Data, Data

90% of ML bugs are data bugs. I'm not exaggerating.

- **Training/serving skew** - Your training data looks nothing like production
- **Label noise** - Your labels are wrong
- **Feature leakage** - You're cheating without knowing it
- **Distribution shift** - The world changed, your model didn't

### 2. The Preprocessing Pipeline

The second most common source of bugs. Things I've seen:

- Normalization applied during training but not inference
- Tokenizers with different vocabularies
- Image resizing with different interpolation methods
- Timezone bugs (always timezone bugs)

### 3. The Model Itself

Only after ruling out data and preprocessing should you look at the model.

- Check gradients (vanishing? exploding?)
- Check activations (all zeros? all the same?)
- Check loss curves (actually decreasing?)

## Practical Tools

**Assertions everywhere.** Check shapes. Check ranges. Check types. Be paranoid.

**Log everything.** Input, output, intermediate states. You'll need it later.

**Build a test set you trust.** If you can't measure it, you can't debug it.

**Version control your data.** DVC is your friend.

## The Hardest Lesson

Sometimes the model is working exactly as expected. The problem is your expectations.

> "The model isn't wrong. Your mental model of the model is wrong."

Step back. Understand what the model actually learned. Often, it's doing something clever that you didn't anticipate.

## Final Thoughts

ML debugging is a skill. Like any skill, it gets easier with practice. Keep a debug journal. Write down what went wrong and how you fixed it. Future you will thank present you.

And always, always check the data first.`,
    marginNotes: [
      { id: 1, content: "I have PTSD from timezone bugs", position: "top" },
      { id: 2, content: "literally 90% of my debugging time", position: "middle" },
      { id: 3, content: "I need to frame this quote", position: "bottom" }
    ],
    related: ["llm-production", "embeddings-explained"]
  }
];

export const skills = [
  "Python", "PyTorch", "TensorFlow", "LangChain",
  "FastAPI", "React", "PostgreSQL", "Redis",
  "Kubernetes", "Docker", "AWS", "GCP"
];

export const experiences = [
  {
    id: 1,
    period: "2023 - now",
    title: "Applied AI Engineer",
    company: "Tech Company",
    description: "Building production ML systems. Shipping LLMs that actually work.",
    note: "(yes, that includes the 2am debugging sessions)"
  },
  {
    id: 2,
    period: "2021 - 2023",
    title: "ML Engineer",
    company: "AI Startup",
    description: "Trained models. Broke things. Fixed things. Learned a lot.",
    note: "(mostly learned what NOT to do)"
  },
  {
    id: 3,
    period: "2019 - 2021",
    title: "Software Engineer",
    company: "Big Tech",
    description: "Backend systems, data pipelines, the usual suspects.",
    note: "(where I caught the ML bug)"
  }
];
