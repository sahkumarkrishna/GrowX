import Contact from "../models/Contact.js";

// Create new contact
const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Check if required fields are missing
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, Email, and Message are required",
      });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { createContact };
