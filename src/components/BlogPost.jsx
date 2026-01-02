import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { blogPosts } from '../data/navData';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blogs"
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            >
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30" 
          style={{ 
            backgroundImage: `url(${post.image})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-semibold backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <article className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Author Info */}
          <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-3xl p-8 mb-12 border-2 border-green-200">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{post.author}</h3>
                <p className="text-gray-600 mb-3">{post.authorBio}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    📅 {new Date(post.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    ⏱️ {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          {/* <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enjoyed this article?</h3>
              <p className="text-gray-600 mb-6">Share it with your network and help others discover great tech insights!</p>
              <div className="flex justify-center gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  Share on LinkedIn
                </button>
                <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  Share on Twitter
                </button>
              </div>
            </div>
          </div> */}

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <Link 
              to="/blogs"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
            >
              ← Back to All Blogs
            </Link>
            
            <div className="text-right">
              {/* <p className="text-sm text-gray-500 mb-2">Want to read more?</p> */}
              <Link 
                to="/blogs"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Explore More Articles →
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;