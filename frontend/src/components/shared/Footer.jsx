import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-black mt-auto w-full border-t">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3  py-12">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h2>
          <p className="text-gray-700 mb-4">
            Connecting talent with opportunities. Find your dream job or hire the best talent.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="hover:text-[#F83002] transition-colors"><FaFacebook size={22} /></a>
            <a href="#" className="hover:text-[#F83002] transition-colors"><FaTwitter size={22} /></a>
            <a href="#" className="hover:text-[#F83002] transition-colors"><FaLinkedin size={22} /></a>
            <a href="#" className="hover:text-[#F83002] transition-colors"><FaInstagram size={22} /></a>
          </div>
        </div>

        {/* Job Links */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Jobs</h3>
          <ul className="space-y-2">
            <li><Link to="/learning" className="hover:text-[#F83002] transition-colors">Learning</Link></li>
            <li><Link to="/quiz" className="hover:text-[#F83002] transition-colors">Quiz</Link></li>
            <li><Link to="/resume" className="hover:text-[#F83002] transition-colors">Resume</Link></li>

            <li><Link to="/internship" className="hover:text-[#F83002] transition-colors">Internship</Link></li>
            <li><Link to="/onlineCoding" className="hover:text-[#F83002] transition-colors">Online Coding</Link></li>
            <li><Link to="/job" className="hover:text-[#F83002] transition-colors">Job</Link></li>
          </ul>
        </div>

        {/* Newsletter / Subscribe */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Subscribe</h3>
          <p className="text-gray-700 mb-4">Get the latest job updates directly to your inbox.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-3 py-2 rounded-md text-black border border-gray-300 focus:outline-none"
            />
            <button className="bg-[#F83002] hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
