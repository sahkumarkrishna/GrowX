import React from "react";
import { useNavigate } from "react-router-dom";
import learningImg from "../../assets/image.png";

export default function About() {
    const navigate = useNavigate();

    const handleApply = () => {
        navigate("/category");
    };

    return (
        <section className="bg-gradient-to-r from-slate-100 via-slate-100 to-slate-100 pt-0 pb-16">
            <div className="container mx-auto px-6">

                {/* H1 always on top */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg leading-tight mb-6">
                    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        About
                    </span>
                </h1>

                {/* Flex container */}
                <div className="flex flex-col md:flex-row items-center gap-10">

                    {/* Left: Text */}
                    <div className="flex-1 order-2 md:order-1">
                        <p className="text-lg md:text-xl text-gray-700 drop-shadow-md mb-4">
                            Our internship program is designed to provide students and young professionals with a unique opportunity to gain real-world experience. Interns work on live projects, collaborate with skilled mentors, and participate in hands-on workshops that enhance both technical and soft skills. This immersive approach ensures that every participant develops the confidence and expertise needed to excel in their future careers.
                        </p>

                        <p className="text-lg md:text-xl text-gray-700 drop-shadow-md mb-4">
                            We focus on personalized mentorship, skill development, and professional growth. Interns are encouraged to contribute ideas, solve real challenges, and take ownership of meaningful tasks. By the end of the program, they emerge with a portfolio of completed projects, practical knowledge, and the experience required to stand out in the competitive job market. Join us to kickstart your career journey and make an impact from day one.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleApply}
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition mt-0 md:mt-4"
                            >
                                Internship Categories
                            </button>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full md:w-1/2 lg:w-5/12 order-1 md:order-2">
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={learningImg}
                                alt="Learning preview"
                                className="w-full h-48 md:h-[28rem] lg:h-[32rem] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
