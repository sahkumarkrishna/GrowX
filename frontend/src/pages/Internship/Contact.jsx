import React, { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
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
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Contact Us</h2>
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

          {/* Contact Info */}
          <div className="mt-10 text-gray-700">
            <p className="font-semibold">Follow us on</p>
            <div className="flex gap-4 mt-2 text-2xl">
              <a href="#" className="hover:text-black"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-black"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-black"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
