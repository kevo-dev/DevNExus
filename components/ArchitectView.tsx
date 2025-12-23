
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { ProjectArchitecture } from '../types';

const ArchitectView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProjectArchitecture | null>(null);

  const handleArchitect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const data = await geminiService.generateArchitecture(prompt);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate architecture. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-2">AI Project Architect</h2>
        <p className="text-blue-100 mb-6">Describe your app requirements and our expert AI will design a production-ready Next.js structure.</p>
        
        <form onSubmit={handleArchitect} className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A multi-vendor e-commerce platform with real-time analytics..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all disabled:opacity-50"
          >
            {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-magic mr-2"></i>}
            Design
          </button>
        </form>
      </section>

      {loading && (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Gemini is architecting your next big thing...</p>
        </div>
      )}

      {result && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Main Scaffolding */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Proposed Architecture: {result.projectName}</h3>
              <p className="text-slate-600 mb-6">{result.description}</p>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                  <i className="fas fa-folder-tree text-blue-500"></i>
                  Folder Structure
                </h4>
                <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-sm">
                  {result.folderStructure.map((path, idx) => (
                    <div key={idx} className="hover:text-white transition-colors py-0.5">
                       <span className="text-slate-500 mr-2">├─</span> {path}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">Core Components</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.keyComponents.map((comp, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all">
                    <p className="font-bold text-blue-600 text-sm mb-1">{comp.name}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{comp.purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">Recommended Stack</h3>
              <div className="flex flex-wrap gap-2">
                {result.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 text-amber-900">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <i className="fas fa-lightbulb"></i>
                Performance Tip
              </h3>
              <p className="text-sm leading-relaxed">
                Use Next.js 15 Partial Prerendering (PPR) for this architecture to combine static shell loading with dynamic content streams.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectView;
