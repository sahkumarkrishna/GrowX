import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { Mail, MapPin, Phone } from 'lucide-react';
import GrowXLogo from './GrowXLogo';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <GrowXLogo size={36} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Connecting talent with opportunities. Find your dream job or hire the best talent.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link to="/learning" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Learning</Link></li>
              <li><Link to="/quiz" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Quiz</Link></li>
              <li><Link to="/KanbanBoard" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Kanban Board</Link></li>
              <li><Link to="/resume" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Resume Builder</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 text-lg bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Services</h3>
            <ul className="space-y-2.5">
              <li><Link to="/internship" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Internship</Link></li>
              <li><Link to="/ats-checker" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">ATS checker</Link></li>
              <li><Link to="/job" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Job Portal</Link></li>
              <li><Link to="/browse" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Browse Jobs</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold mb-4 text-lg bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">Stay Connected</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>info@growx.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-green-400" />
                <span>+1 9334554413</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 text-pink-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} GrowX. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-gray-500 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
