import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LegalRiskAnalyzer() {
  const [issue, setIssue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Speech Recognition Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIssue(prev => (prev ? `${prev} ${transcript}` : transcript).slice(0, 300));
    };

    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please enable permissions.');
      } else {
        setError('Speech recognition failed. Please try again.');
      }
    };
  }

  const toggleListening = () => {
    if (!recognition) {
      setError('Your browser does not support voice input. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      setError(null);
      recognition.start();
    }
  };

  const handleAnalyze = async () => {
    if (!issue.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await axios.post(`${apiUrl}/api/analyze-risk`, { issue });
      setResult(res.data);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('System unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    if (risk === 'High') return '#ef4444'; // Red
    if (risk === 'Medium') return '#f59e0b'; // Amber
    return '#10b981'; // Green
  };

  const getRiskIcon = (risk) => {
    if (risk === 'High') return '🚨';
    if (risk === 'Medium') return '⚠️';
    return '✅';
  };

  return (
    <section className="risk-analyzer-section">
      <div className="profile-container">
        <div className="risk-analyzer-card">
          <div className="analyzer-header">
            <h2>AI Legal Risk Analyzer</h2>
            <p>Describe your issue and get instant guidance on legal severity.</p>
          </div>

          <div className="analyzer-body">
            <div className="textarea-wrapper">
              <textarea
                placeholder="Ex: I am facing harassment from my landlord regarding the security deposit..."
                maxLength={300}
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                disabled={loading}
              />
              
              <button 
                className={`btn-mic ${isListening ? 'listening' : ''}`}
                onClick={toggleListening}
                title="Voice Input"
                type="button"
              >
                {isListening ? '🛑' : '🎤'}
              </button>

              {isListening && <div className="listening-indicator">Listening...</div>}

              <div className="char-counter">
                {issue.length}/300
              </div>
            </div>

            <button 
              className="btn-analyze"
              onClick={handleAnalyze}
              disabled={loading || !issue.trim() || isListening}
            >
              {loading ? 'Processing Data...' : 'Analyze Risk Severity'}
            </button>

            {error && <p className="analyzer-error">{error}</p>}
          </div>

          {result && (
            <div className="analyzer-result-overlay">
              <div className="result-card fade-in">
                <div className="result-header">
                  <span className="risk-indicator" style={{ backgroundColor: getRiskColor(result.risk) }}>
                    {getRiskIcon(result.risk)} {result.risk} Risk
                  </span>
                  <div className="risk-score">
                    Score: <span>{result.score}</span>/100
                  </div>
                </div>

                <div className="result-content">
                  <h4>Preliminary Suggestion:</h4>
                  <p>{result.suggestion}</p>
                </div>

                <div className="result-footer">
                  <p>Recommended Specialization: <strong>{result.specialization}</strong></p>
                  <button 
                    className="btn-card-primary"
                    onClick={() => navigate(`/advocates?specialization=${result.specialization}`)}
                  >
                    Find {result.specialization} Advocate
                  </button>
                  <button className="btn-text" onClick={() => setResult(null)}>Analyze Another Issue</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LegalRiskAnalyzer;
