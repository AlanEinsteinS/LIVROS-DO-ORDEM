import { useState, useEffect } from 'react';

export default function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="loading-overlay" style={{ opacity: isVisible ? 1 : 0 }}>
      <div className="loading-spinner"></div>
    </div>
  );
}
