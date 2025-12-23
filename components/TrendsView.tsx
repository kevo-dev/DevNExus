
import React, { useEffect, useState } from 'react';
import { geminiService } from '../services/geminiService';

const TrendsView: React.FC = () => {
  const [data, setData] = useState<{ text: string | undefined, sources: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrends = async () => {
      try {
        const trends = await geminiService.fetchTrends();
        setData(trends);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadTrends();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500">Retrieving real-time industry trends...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <i className="fas fa-fire text-orange-500"></i>
            What's New in Frontend?
          </h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
            {data?.text?.split('\n').map((line, idx) => (
               <p key={idx}>{line}</p>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-link text-blue-400"></i>
            Grounding Sources
          </h3>
          <div className="space-y-4">
            {data?.sources?.map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 group"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">Reference {idx + 1}</span>
                  <i className="fas fa-external-link-alt text-[10px] text-slate-600 group-hover:text-blue-400"></i>
                </div>
                <p className="text-sm font-medium line-clamp-2">{source.title}</p>
                <p className="text-[10px] text-slate-500 truncate mt-2">{source.uri}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-indigo-600 p-6 rounded-3xl text-white">
          <h3 className="font-bold mb-2">Editor's Choice</h3>
          <p className="text-sm text-indigo-100 mb-4 italic">"Next.js Turbopack is now stable in local dev for most projects. It's time to upgrade if you're still on Webpack."</p>
          <button className="w-full py-2 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
            Read Discussion
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendsView;
