
import React, { useState } from 'react';
import { UserType } from './types';
import SpecsView from './components/SpecsView';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  const [view, setView] = useState<'specs' | 'demo'>('specs');
  const [userType, setUserType] = useState<UserType>('MANAGER');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">HireAgent</span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <button
                  onClick={() => setView('specs')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    view === 'specs' ? 'border-indigo-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Blueprint Spec
                </button>
                <button
                  onClick={() => setView('demo')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    view === 'demo' ? 'border-indigo-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Interactive Demo
                </button>
              </div>
            </div>
            {view === 'demo' && (
              <div className="flex items-center gap-4">
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setUserType('MANAGER')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      userType === 'MANAGER' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Founder Mode
                  </button>
                  <button
                    onClick={() => setUserType('CANDIDATE')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      userType === 'CANDIDATE' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Candidate Mode
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {view === 'specs' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <SpecsView />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
            <div className="text-center max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Simulating {userType === 'MANAGER' ? 'Role Intake' : 'Candidate Pre-screening'}
              </h2>
              <p className="text-slate-500">
                {userType === 'MANAGER' 
                  ? "As a Founder, you're telling the AI what kind of human you actually need. No buzzwords, just plain English."
                  : "As a Candidate, you're having a quick conversation with the AI to see if you're a fit for an exclusive role."}
              </p>
            </div>
            
            <div className="w-full flex justify-center animate-in zoom-in duration-500">
              <ChatWindow userType={userType} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">© 2024 HireAgent MVP Builder. India-First. Speed-Optimized.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
