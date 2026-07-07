import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { blogPosts } from '../data/navData';
import { FaStar } from 'react-icons/fa';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-gray-950 text-white min-h-screen">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
            <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blogs" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all">
              ← Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[55vh] bg-gradient-to-br from-gray-950 via-purple-900/30 to-gray-950 flex items-end overflow-hidden">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 w-full">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="px-4 py-1.5 bg-green-500/15 border border-green-500/30 rounded-full text-green-300 text-xs font-semibold">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{post.title}</h1>
          <p className="text-gray-400 text-base md:text-lg">{post.excerpt}</p>
        </div>
      </div>

      {/* Article */}
      <article className="bg-gray-950 py-14">
        <div className="max-w-4xl mx-auto px-6">

          {/* Author */}
          <div className="flex items-center gap-5 bg-gray-800/50 border border-white/10 rounded-2xl p-6 mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-black shadow-lg flex-shrink-0">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{post.author}</h3>
              <p className="text-gray-400 text-sm mb-3">{post.authorBio}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>📅 {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>⏱️ {post.readTime}</span>
              </div>
            </div>
            <div className="flex gap-0.5 flex-shrink-0">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="text-amber-400 text-sm" />)}
            </div>
          </div>

          {/* Body */}
          <div
            className="text-gray-300 leading-relaxed space-y-4
              [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4
              [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4
              [&_strong]:text-white [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Navigation */}
          <div className="flex justify-between items-center mt-14 pt-8 border-t border-white/10">
            <Link to="/blogs" className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-green-500/50 bg-white/5 hover:bg-green-500/10 text-gray-300 hover:text-green-300 font-semibold transition-all duration-300 text-sm">
              ← Back to Blogs
            </Link>
            <Link to="/blogs" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-green-500/30 hover:scale-105 transition-all duration-300 text-sm">
              Explore More →
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
