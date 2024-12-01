import React, { useState, useRef } from 'react';
import { Send, User, MessageCircle, Clock } from 'lucide-react';

interface Comment {
    id: number;
    author: string;
    content: string;
    date: string;
    likes: number;
}

interface CommentsProps {
    postId: string;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [author, setAuthor] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() && author.trim()) {
            const comment: Comment = {
                id: Date.now(),
                author: author.trim(),
                content: newComment.trim(),
                date: new Date().toISOString(),
                likes: 0
            };
            setComments(prev => [comment, ...prev]);
            setNewComment('');
            setAuthor('');
            
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleLike = (commentId: number) => {
        setComments(prev => 
            prev.map(comment => 
                comment.id === commentId 
                    ? { ...comment, likes: comment.likes + 1 } 
                    : comment
            )
        );
    };

    const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setNewComment(textarea.value);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
<div className="py-12">
    <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-none">
            Community Discussions
        </h2>
    </div>


            <form 
                onSubmit={handleSubmit} 
                className="bg-white dark:bg-gray-800 
                           shadow-lg rounded-xl 
                           border border-gray-100 dark:border-gray-700 
                           p-6 mb-8 
                           transition-all duration-300 
                           hover:shadow-xl"
            >
                <div className="mb-4 relative">
                    <div className="absolute left-3 top-4 text-gray-400">
                        <User className="w-7 h-7" />
                    </div>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 
                                   border rounded-lg 
                                   bg-gray-50 dark:bg-gray-900 
                                   border-gray-200 dark:border-gray-700
                                   focus:ring-2 focus:ring-blue-500
                                   transition-all duration-300"
                        required
                    />
                </div>
                <div className="relative mb-4">
                    <textarea
                        ref={textareaRef}
                        placeholder="Share your thoughts..."
                        value={newComment}
                        onChange={autoResizeTextarea}
                        rows={2}
                        className="w-full px-4 py-3 
                                   border rounded-lg 
                                   bg-gray-50 dark:bg-gray-900 
                                   border-gray-200 dark:border-gray-700
                                   resize-none overflow-hidden
                                   focus:ring-2 focus:ring-blue-500
                                   transition-all duration-300"
                        required
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="w-full flex items-center justify-center 
                               bg-blue-600 text-white 
                               py-3 rounded-lg 
                               hover:bg-blue-700 
                               transition-colors duration-300 
                               group"
                >
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Post Comment
                </button>
            </form>

            {/* Comments List */}
            {comments.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No comments yet. Be the first to comment!
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div 
                            key={comment.id} 
                            className="bg-white dark:bg-gray-800 
                                       rounded-xl shadow-md 
                                       border border-gray-100 dark:border-gray-700 
                                       p-6 
                                       transition-all duration-300 
                                       hover:shadow-lg"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 text-blue-600 
                                                    w-10 h-10 rounded-full 
                                                    flex items-center justify-center 
                                                    font-bold">
                                        {comment.author.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {comment.author}
                                        </p>
                                        <div className="flex items-center text-gray-500 text-sm space-x-2">
                                            <Clock className="w-4 h-4" />
                                            <time>{formatDate(comment.date)}</time>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleLike(comment.id)}
                                    className="flex items-center 
                                               text-gray-500 hover:text-red-500 
                                               transition-colors"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 mr-1" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                    >
                                        <path 
                                            fillRule="evenodd" 
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                                            clipRule="evenodd" 
                                        />
                                    </svg>
                                    {comment.likes}
                                </button>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                                {comment.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comments;