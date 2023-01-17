import React from 'react';

function NewsCard({ article }) {
  return (
    <div className="bg-base-200 rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
        <p className="text-sm text-gray-600">{article.description}</p>
        <a href={article.url} className="text-blue-500">
          Read More
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
