import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../data/navData';

const Blogs = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  
  // Get all unique tags
  const allTags = ['All', ...new Set(blogPosts.flatMap(post => post.tags))];
  
  // Filter posts based on selected tag
  const filteredPosts = selectedTag === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags.includes(selectedTag));

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/assets/test/img.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 mb-4">
            Tech Insights
          </h1>
          <p className="text-gray-300 text-xl">Exploring the latest in technology and innovation</p>
        </div>
      </div>

      {/* Main Content */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 md:px-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm uppercase tracking-wider mb-4">
              📚 Our Blog
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600">Tech Articles</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Stay updated with the latest trends, insights, and best practices in technology and software development.
            </p>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-green-300 transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
                
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                      {post.author}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Read More Button */}
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-block w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
                  >
                    Read Full Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* No Posts Message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found for the selected tag.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;