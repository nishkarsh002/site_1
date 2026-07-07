import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../data/navData';
import useReveal from '../hooks/useReveal';

const Blogs = () => {
  useReveal();
  const [selectedTag, setSelectedTag] = useState('All');
  const allTags = ['All', ...new Set(blogPosts.flatMap(post => post.tags))];
  const filteredPosts = selectedTag === 'All' ? blogPosts : blogPosts.filter(p => p.tags.includes(selectedTag));

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[420px] bg-gradient-to-br from-gray-950 via-purple-900/30 to-gray-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('/assets/test/img.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-green-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black animated-gradient-text mb-3">Tech Insights</h1>
          <p className="text-gray-400 text-lg">Exploring the latest in technology and innovation</p>
        </div>
      </div>

      {/* Content */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-20 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="reveal text-center mb-14">
            <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-300 font-bold px-5 py-2 rounded-full text-xs uppercase tracking-wider mb-4">
              📚 Our Blog
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Latest <span className="animated-gradient-text">Tech Articles</span>
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              Stay updated with the latest trends, insights, and best practices in technology.
            </p>
          </div>

          {/* Tag Filter */}
          <div className="reveal flex flex-wrap justify-center gap-3 mb-12">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gray-800/60 text-gray-400 border border-white/10 hover:border-green-500/40 hover:text-green-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <article key={post.id} className={`reveal delay-${(i % 3 + 1) * 100} bg-gray-800/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/5 hover:border-green-400/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10 group`}>
                {/* Image */}
                <div className="relative overflow-hidden h-44">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                </div>

                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-green-500/15 border border-green-500/20 text-green-300 text-xs font-semibold rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-green-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-2">
                      <span className="w-7 h-7 bg-gradient-to-r from-green-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                      {post.author}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="inline-block w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2.5 px-6 rounded-full font-semibold text-sm shadow-lg hover:shadow-green-500/40 hover:scale-105 transition-all duration-300">
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-500 py-12">No posts found for the selected tag.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;
