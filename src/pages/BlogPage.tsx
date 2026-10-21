import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Clock, User, Share2, ArrowLeft, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

export const BlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState(searchParams.get('cat') || 'All');

  // If ID is provided, show full article
  const activePost = id ? BLOG_POSTS.find((p) => p.id === id) : null;

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCat !== 'All' && !post.category.toLowerCase().includes(selectedCat.toLowerCase())) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return post.title.toLowerCase().includes(q) || post.content.toLowerCase().includes(q);
    }
    return true;
  });

  if (activePost) {
    return (
      <div className="min-h-screen bg-slate-50/70 py-10 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <article className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {activePost.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 leading-tight">
                {activePost.title}
              </h1>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pb-4 border-b border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">{activePost.authorName}</p>
                  <p className="text-[11px] text-slate-500">{activePost.authorTitle}</p>
                </div>
                <span>{activePost.date} · {activePost.readTime}</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-72 w-full bg-slate-100">
              <img
                src={activePost.imageUrl}
                alt={activePost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
              {activePost.content}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Doctor&apos;s care Health Library
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            Verified Health Articles & Medical Advice
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Written and reviewed by registered BMDC doctors in Bangladesh.
          </p>

          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search health articles (e.g. dengue, fever, diet)..."
              className="w-full h-11 pl-10 pr-4 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-bold text-emerald-700">{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-emerald-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-800">{post.authorName}</span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
