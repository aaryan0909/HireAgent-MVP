
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
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">HireAgent MVP Specifications</h1>
        <p className="text-lg text-slate-500">Official Product & Engineering Blueprint for the AI Hiring Agent.</p>
      </header>

      <DeliverableSection title="1. MVP Feature List">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
          <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <strong className="block text-indigo-700">Conversational Role Intake</strong>
            Founder texts requirements; AI parses skills, personality, and trade-offs.
          </li>
          <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <strong className="block text-indigo-700">Blind Candidate Screening</strong>
            Candidates chat with AI; profiles are built from conversational data, not just PDFs.
          </li>
          <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <strong className="block text-indigo-700">Multi-Fit Matching</strong>
            Automatic shortlisting based on Skills, Personality, or Hybrid scoring.
          </li>
          <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <strong className="block text-indigo-700">Triggered Applications</strong>
            Invite-only application flow. Only approved matches get the link to apply.
          </li>
        </ul>
      </DeliverableSection>

      <DeliverableSection title="2. System Architecture">
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

      <DeliverableSection title="3. Data Models">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-4 py-2 text-left">Entity</th>
              <th className="px-4 py-2 text-left">Key Fields</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border-b px-4 py-2 font-semibold">ManagerRole</td><td className="border-b px-4 py-2">id, title, must_skills, nice_skills, personality_matrix, instructions</td></tr>
            <tr><td className="border-b px-4 py-2 font-semibold">CandidateProfile</td><td className="border-b px-4 py-2">id, phone, experience_vector, skills_list, personality_vibe, is_screened</td></tr>
            <tr><td className="border-b px-4 py-2 font-semibold">Match</td><td className="border-b px-4 py-2">role_id, cand_id, score_overall, category, manager_status</td></tr>
          </tbody>
        </table>
      </DeliverableSection>

      <DeliverableSection title="4. AI Design Strategy">
        <p className="mb-4"><strong>Prompting:</strong> Two-stage system. Stage 1: Entity Extraction (Conversational text to JSON). Stage 2: Reasoning (Scoring fit).</p>
        <p className="mb-4"><strong>Embeddings:</strong> Candidate "Experience Summaries" are vectorized. Roles are vectorized. Similarity search provides the initial 10% candidate pool.</p>
        <p><strong>Guardrails:</strong> Sensitivity filter for bias; strictly "professional context" enforcement to prevent hallucination of non-existent qualifications.</p>
      </DeliverableSection>

      <DeliverableSection title="5. Match Scoring Pseudocode">
        <pre className="bg-indigo-50 p-4 rounded-lg text-indigo-900 overflow-x-auto">
{`function calculateMatch(role, candidate) {
  const skillScore = cosineSimilarity(role.skillsVec, candidate.skillsVec) * 0.4;
  const personalityScore = llmRank(role.personality, candidate.vibe) * 0.4;
  const tradeOffWeight = evaluateTradeOffs(role.tradeOffs, candidate.profile) * 0.2;
  
  return (skillScore + personalityScore + tradeOffWeight);
}`}
        </pre>
      </DeliverableSection>

      <DeliverableSection title="6. 90-Day Build Plan">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="bg-indigo-600 text-white w-24 h-8 flex items-center justify-center rounded-full text-xs font-bold shrink-0">WEEKS 1-3</div>
            <p><strong>Foundation:</strong> Set up DB schema, Gemini API wrappers, and basic Web-UI for simulation.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-indigo-600 text-white w-24 h-8 flex items-center justify-center rounded-full text-xs font-bold shrink-0">WEEKS 4-6</div>
            <p><strong>Core Logic:</strong> Implement LLM extraction for Manager/Candidate chats. First version of "Hybrid Matching".</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-indigo-600 text-white w-24 h-8 flex items-center justify-center rounded-full text-xs font-bold shrink-0">WEEKS 7-12</div>
            <p><strong>Scale & Integrate:</strong> Twilio WhatsApp integration, Admin dashboard for internal monitoring, Pilot with 3 Indian startups.</p>
          </div>
        </div>
      </DeliverableSection>
    </div>
  );
};

export default SpecsView;
