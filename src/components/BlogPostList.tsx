import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
    url: string;
    frontmatter: {
        title: string;
        date: string;
        description: string;
        image?: string;
        category?: string;
    };
}

interface BlogPostListProps {
    posts: BlogPost[];
}

export const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-8">
  {posts.map((post) => (
    <div key={post.url} 
         className="group bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden 
                  transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 
                  border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row">
        {post.frontmatter.image && (
          <div className="md:w-1/3 flex-shrink-0">
            <img 
              src={post.frontmatter.image} 
              alt={post.frontmatter.title}
              className="w-full h-48 md:h-full object-cover 
                       transition-transform duration-300 
                       group-hover:scale-105"
            />
          </div>
        )}
    
        <div className="p-6 flex-grow flex flex-col justify-between dark:text-gray-100">
          <div>
            <div className="flex items-center mb-3 space-x-3">
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200 
                           rounded-full text-xs font-medium uppercase">
                {post.frontmatter.category}
              </span>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <time>{formatDate(post.frontmatter.date)}</time>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white 
                         group-hover:text-blue-600 dark:group-hover:text-blue-400 
                         transition-colors">
              <a href={post.url}>{post.frontmatter.title}</a>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {post.frontmatter.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
    );
};

export default BlogPostList;