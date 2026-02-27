export default function TabButton({ icon, label, tabId, activeTab, onClick }) {
  const active = activeTab === tabId;

  return (
    <button
      className={`tab-pill ${active ? 'tab-pill-active' : 'tab-pill-idle'}`}
      onClick={() => onClick(tabId)}
    >
      {active && <span className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />}
      <i className={`fas ${icon} relative z-10`}></i>
      <span className="text-tab">{label}</span>
      <span className={`absolute inset-x-6 bottom-0 h-px bg-gradient-to-r ${active ? 'from-transparent via-red-300/70 to-transparent' : 'from-transparent via-transparent to-transparent'}`} />
    </button>
  );
}
