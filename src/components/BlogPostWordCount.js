import React from 'react';

const BlogPostWordCount = ({scrapedText, wordCount}) => {
    return (
        <div
            className="m-10 block max-w-4xl p-6 bg-gray-800 border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                    Text and Word Count of Blog Post Content
                </h2>
                <div className="mb-4 bg-gray-100 p-4 rounded dark:bg-gray-700">
                    <div className="text-gray-800 dark:text-white">
                        {scrapedText || 'No data scraped yet.'}
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="mr-2 text-lg font-medium text-gray-900 dark:text-white">
                        Word Count:
                    </span>
                    <span className="text-lg font-semibold text-white">
                        {wordCount || '0'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BlogPostWordCount;
