import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // for nice alerts
import ContactImage from "../../assets/Contact.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        import.meta.env.VITE_CONTACT_API, // ✅ your backend URL
        formData
      );

      toast.success(res.data.message || "Your message has been sent successfully ✅"); // success alert
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="md:w-1/2 w-full h-96 md:h-auto">
          <img
            src={ContactImage}
            alt="Contact"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 w-full p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-8">
            Have a question or want to work together? Fill out the form and we’ll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 text-gray-800 placeholder-gray-400"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 text-gray-800 placeholder-gray-400"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="4"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 text-gray-800 placeholder-gray-400"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
