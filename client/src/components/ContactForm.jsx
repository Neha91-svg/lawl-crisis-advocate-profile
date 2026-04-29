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
    if (Object.keys(validationErrors).length === 0) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await axios.post(`${apiUrl}/api/consultation`, formData);
        setRefId(response.data.referenceId);
        setSubmitted(true);
        setErrors({});
      } catch (err) {
        setErrors({ submit: 'Failed to send request. Please try again later.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  if (submitted) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ color: 'var(--accent)' }}>Request Received</h3>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '1rem 0' }}>Reference ID: {refId}</p>
        <p>Thank you, {formData.name}. We will contact you shortly.</p>
        <button className="btn" onClick={() => setSubmitted(false)} style={{ marginTop: '1rem' }}>
          New Request
        </button>
      </div>
    );
  }

  return (
    <section className="container">
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Request Consultation</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error-input' : ''}
              placeholder="John Doe"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error-input' : ''}
              placeholder="+91 98765 43210"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Preferred Time Slot</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className={errors.timeSlot ? 'error-input' : ''}
            >
              <option value="">Select a slot</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
              <option value="evening">Evening (5 PM - 8 PM)</option>
            </select>
            {errors.timeSlot && <span className="error-text">{errors.timeSlot}</span>}
          </div>

          <div className="form-group">
            <label>Description of Issue ({formData.issue.length}/300)</label>
            <textarea
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              className={errors.issue ? 'error-input' : ''}
              rows="4"
              placeholder="Briefly describe the situation..."
            />
            {errors.issue && <span className="error-text">{errors.issue}</span>}
          </div>

          {errors.submit && (
            <div className="error-text" style={{ textAlign: 'center', marginBottom: '1rem' }}>
              {errors.submit}
            </div>
          )}

          <button type="submit" className="btn-primary">
            Submit Consultation Request
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
