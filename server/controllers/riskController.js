exports.analyzeLegalRisk = async (req, res) => {
  try {
    const { issue, location } = req.body;

    if (!issue || issue.trim().length === 0) {
      return res.status(400).json({ error: 'Please describe your legal issue.' });
    }

    if (issue.length > 300) {
      return res.status(400).json({ error: 'Issue description must not exceed 300 characters.' });
    }

    const text = issue.toLowerCase();

    // Rule-based keyword detection logic
    let risk = 'Low';
    let score = 25;
    let suggestion = 'Your issue seems to be administrative. A legal consultant can help with documentation.';
    let specialization = 'Civil Litigation';

    // High Risk Keywords
    const highKeywords = ['fraud', 'scam', 'cybercrime', 'domestic', 'harassment', 'arrest', 'violence', 'murder', 'theft', 'criminal', 'assault', 'rape', 'drugs'];
    // Medium Risk Keywords
    const mediumKeywords = ['divorce', 'family', 'dispute', 'tenant', 'contract', 'employment', 'debt', 'custody', 'alimony', 'separation', 'eviction'];
    // Low Risk Keywords
    const lowKeywords = ['documentation', 'property', 'registration', 'will', 'notary', 'name change', 'agreement', 'startup', 'patent', 'trademark'];

    if (highKeywords.some(kw => text.includes(kw))) {
      risk = 'High';
      score = 85 + Math.floor(Math.random() * 10);
      suggestion = 'This appears to be a serious legal matter. Immediate consultation with a criminal lawyer is strongly advised.';
      specialization = 'Criminal Law';
    } else if (mediumKeywords.some(kw => text.includes(kw))) {
      risk = 'Medium';
      score = 50 + Math.floor(Math.random() * 15);
      suggestion = 'This is a standard legal dispute. We recommend seeking advice from a family or civil litigation specialist.';
      specialization = 'Family Law';
    } else if (lowKeywords.some(kw => text.includes(kw))) {
      risk = 'Low';
      score = 15 + Math.floor(Math.random() * 20);
      suggestion = 'Your case involves routine legal procedures. A civil litigation or corporate consultant can streamline the process.';
      specialization = 'Corporate Law';
    }

    // Response delay to simulate "AI processing"
    setTimeout(() => {
      res.json({
        risk,
        score,
        suggestion,
        specialization,
        timestamp: new Date().toISOString()
      });
    }, 1200);

  } catch (error) {
    console.error('Risk Analyzer Error:', error.message);
    res.status(500).json({ error: 'Internal server error during analysis.' });
  }
};
