function Contact({ contact }) {
  if (!contact) return null;

  return (
    <ul className="contact-list">
      <li className="contact-item">
        <div className="contact-icon" aria-hidden="true">📞</div>
        <div className="contact-details">
          <h4>Phone</h4>
          <p>{contact.phone}</p>
        </div>
      </li>
      <li className="contact-item">
        <div className="contact-icon" aria-hidden="true">✉️</div>
        <div className="contact-details">
          <h4>Email</h4>
          <p>{contact.email}</p>
        </div>
      </li>
    </ul>
  );
}

export default Contact;
