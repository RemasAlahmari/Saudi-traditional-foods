import '../styles/Loader.css';

export default function Loader({ fullPage = false, size = 'md', text = '' }) {
  if (fullPage) {
    return (
      <div className="loader-fullpage" role="status" aria-label="Loading">
        <div className="loader-inner">
          <div className="loader-ornament">
            <span>✦</span>
          </div>
          <div className={`loader-spinner loader-${size}`}></div>
          {text && <p className="loader-text">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`loader loader-${size}`} role="status" aria-label="Loading">
      <div className="loader-spinner"></div>
      {text && <span className="loader-text">{text}</span>}
    </div>
  );
}
