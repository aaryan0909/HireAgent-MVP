
import React from 'react';

// Fix: Making children optional to resolve "Property 'children' is missing" TypeScript errors in JSX usage
const DeliverableSection = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <section className="mb-12 border-b border-slate-200 pb-8">
    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
      <span className="w-1.5 h-6 bg-indigo-600 rounded-full mr-3"></span>
      {title}
    </h3>
    <div className="prose prose-slate max-w-none text-slate-600">
      {children}
    </div>
  </section>
);

const SpecsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded uppercase tracking-wider">Internal Doc</span>
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-wider">Ready for Dev</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Technical Build Specification</h1>
        <p className="text-lg text-slate-500">This document contains the engineering requirements, data models, and logic required to build the full HireAgent production system.</p>
      </header>

      <DeliverableSection title="1. MVP Feature Scope">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
          <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <strong className="block text-indigo-700">Conversational Role Intake</strong>
            Founder texts requirements; AI parses skills, personality, and trade-offs into structured state.
          </li>
          <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <strong className="block text-indigo-700">Blind Candidate Screening</strong>
            Candidates chat with AI; profiles are built from conversational data and vectorized for search.
          </li>
          <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <strong className="block text-indigo-700">Multi-Fit Matching</strong>
            Automatic shortlisting engine based on Skills, Personality, or Hybrid scoring algorithms.
          </li>
          <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <strong className="block text-indigo-700">Triggered Applications</strong>
            Invite-only application flow. Only approved matches receive the unique URL to the ATS/Email.
          </li>
        </ul>
      </DeliverableSection>

      <DeliverableSection title="2. System Architecture">
        <p className="mb-4 text-sm font-medium">Cloud Infrastructure Diagram (MVP):</p>
        <div className="bg-slate-900 text-slate-300 p-6 rounded-lg font-mono text-sm leading-relaxed overflow-x-auto">
          {`
[Client (WhatsApp/Web)] <--> [Twilio/Messenger API]
                                    |
                            [Node.js Backend (Fastify)]
                                /           \\
                [Postgres (DB)] <-----> [Gemini 3 Pro (AI)]
                                |
                        [Pinecone (Embeddings)]
          `}
        </div>
      </DeliverableSection>

      <DeliverableSection title="3. Production Data Schema">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-4 py-2 text-left text-xs uppercase text-slate-500">Entity</th>
              <th className="px-4 py-2 text-left text-xs uppercase text-slate-500">Key Fields (SQL Types)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border-b px-4 py-2 font-semibold">ManagerRole</td><td className="border-b px-4 py-2 text-sm">UUID, title (text), must_skills (jsonb), nice_skills (jsonb), trade_offs (text)</td></tr>
            <tr><td className="border-b px-4 py-2 font-semibold">CandidateProfile</td><td className="border-b px-4 py-2 text-sm">UUID, phone (varchar), experience_vector (vector), skills (jsonb), vibe (text)</td></tr>
            <tr><td className="border-b px-4 py-2 font-semibold">Match</td><td className="border-b px-4 py-2 text-sm">UUID, role_id (fkey), cand_id (fkey), score (int), category (enum)</td></tr>
          </tbody>
        </table>
      </DeliverableSection>

      <DeliverableSection title="4. Core Logic & Scoring">
        <p className="mb-4">Implementation must use a weighted average of three vectors:</p>
        <pre className="bg-indigo-50 p-4 rounded-lg text-indigo-900 overflow-x-auto text-sm">
{`function calculateMatch(role, candidate) {
  // 1. Hard Skills Similarity (40%)
  const skillScore = cosineSimilarity(role.skillsVec, candidate.skillsVec) * 0.4;
  
  // 2. LLM Vibe/Personality Rank (40%)
  const personalityScore = llmRank(role.personality, candidate.vibe) * 0.4;
  
  // 3. Trade-off Evaluation (20%)
  const tradeOffWeight = evaluateTradeOffs(role.tradeOffs, candidate.profile) * 0.2;
  
  return (skillScore + personalityScore + tradeOffWeight);
}`}
        </pre>
      </DeliverableSection>

      <DeliverableSection title="5. Implementation Roadmap">
        <div className="space-y-6">
          <div className="border-l-4 border-indigo-600 pl-4">
            <h4 className="font-bold text-slate-800">Phase 1: Foundation (Weeks 1-3)</h4>
            <p className="text-sm">DB Schema setup, Gemini API integration, and conversational state machine for intake.</p>
          </div>
          <div className="border-l-4 border-indigo-600 pl-4">
            <h4 className="font-bold text-slate-800">Phase 2: Intelligence (Weeks 4-6)</h4>
            <p className="text-sm">Vector embedding pipeline (Pinecone), automated scoring engine, and candidate chat flow.</p>
          </div>
          <div className="border-l-4 border-slate-300 pl-4">
            <h4 className="font-bold text-slate-800 text-slate-400">Phase 3: Integration (Weeks 7-12)</h4>
            <p className="text-sm text-slate-400">WhatsApp/Twilio webhook integration, Manager Dashboard, and Pilot launch.</p>
          </div>
        </div>
      </DeliverableSection>
    </div>
  );
};

export default SpecsView;
