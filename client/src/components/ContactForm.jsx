import axios from 'axios';
import { useState } from 'react';
//contact form component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    issue: '',
    timeSlot: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }
    if (!formData.issue.trim()) {
      newErrors.issue = 'Please describe your issue';
    } else if (formData.issue.length > 300) {
      newErrors.issue = 'Issue must be less than 300 characters';
    }
    if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await axios.post(`${apiUrl}/api/consultation`, formData);

      setRefId(response.data.referenceId);
      setSubmitted(true);
      setErrors({});
    } catch (err) {
      if (err.response?.status === 429) {
        setErrors({ submit: 'Too many requests. Try again later.' });
      } else {
        setErrors({ submit: 'Server error. Please try again.' });
      }
    }
  };

  if (submitted) {
    return (
      <div className="form-card success-state">
        <div className="success-icon">✓</div>
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Consultation Requested</h2>
        <p>Your request has been successfully logged into our system.</p>
        
        <div className="ref-box">
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Reference ID</p>
          <code>{refId}</code>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          An advocate will review your case and contact you within 24 hours at <strong>{formData.phone}</strong>.
        </p>
        
        <button className="btn-secondary" onClick={() => setSubmitted(false)} style={{ marginTop: '2rem' }}>
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <section className="consultation-section">
      <div className="form-card">
        <div className="form-header">
          <h2>Request a Consultation</h2>
          <p>Provide brief details about your situation for a priority review.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? 'error' : ''}`}
                placeholder="e.g. John Smith"
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-control ${errors.phone ? 'error' : ''}`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="timeSlot">Preferred Consultation Time</label>
              <select
                id="timeSlot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className={`form-control ${errors.timeSlot ? 'error' : ''}`}
              >
                <option value="">Select a preferred window</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                <option value="evening">Evening (5 PM - 8 PM)</option>
              </select>
              {errors.timeSlot && <span className="error-msg">{errors.timeSlot}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="issue">Brief Overview of Legal Issue ({formData.issue.length}/300)</label>
              <textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                className={`form-control ${errors.issue ? 'error' : ''}`}
                rows="4"
                placeholder="Describe your situation in a few sentences..."
              />
              {errors.issue && <span className="error-msg">{errors.issue}</span>}
            </div>
          </div>

          {errors.submit && (
            <div className="error-msg" style={{ textAlign: 'center', margin: '1rem 0', fontWeight: '600' }}>
              {errors.submit}
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn-submit">
              Secure Professional Consultation
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
