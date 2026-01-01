export default function TabButton({ icon, label, tabId, activeTab, onClick }) {
  return (
    <button
      className={`tab-btn ${activeTab === tabId ? 'active' : ''}`}
      onClick={() => onClick(tabId)}
    >
      <i className={`fas ${icon}`}></i> {label}
    </button>
  );
}
