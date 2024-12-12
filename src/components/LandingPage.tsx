import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, TrendingUp, Shield, Github, Linkedin, Mail } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Goals from Dreams to Achievements, Together
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a community of goal-setters and achieve more with accountability partners,
            progress tracking, and real support.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Team collaboration"
            className="rounded-lg shadow-lg object-cover h-96 w-full"
          />
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Goal achievement"
            className="rounded-lg shadow-lg object-cover h-96 w-full"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Users className="w-8 h-8 text-blue-600" />}
              title="Accountability Pods"
              description="Join small groups of 3-5 people with similar goals for maximum support and motivation."
            />
            <FeatureCard
              icon={<Target className="w-8 h-8 text-blue-600" />}
              title="Smart Goal Setting"
              description="Use our SMART framework to set achievable and measurable goals."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
              title="Progress Tracking"
              description="Visual progress meters and milestone tracking to keep you motivated."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-blue-600" />}
              title="Commitment System"
              description="Optional financial stakes and verification systems for serious goal-setters."
            />
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Trusted by Goal-Achievers Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="GoalSync transformed how I approach my fitness goals. The accountability pod system is genius!"
              author="Sarah M."
              role="Fitness Enthusiast"
            />
            <TestimonialCard
              quote="Finally achieved my entrepreneurial goals with the support of my accountability partners."
              author="James K."
              role="Startup Founder"
            />
            <TestimonialCard
              quote="The progress tracking and community support made all the difference in my learning journey."
              author="Lisa R."
              role="Software Developer"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Agnij Dutta</h3>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <a
                  href="mailto:agnijdutta413@gmail.com"
                  className="hover:text-blue-400 transition flex items-center"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  agnijdutta413@gmail.com
                </a>
              </div>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/agnij-dutta"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition flex items-center"
              >
                <Github className="h-6 w-6 mr-2" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/agnij-dutta-718060309/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition flex items-center"
              >
                <Linkedin className="h-6 w-6 mr-2" />
                LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} GoalSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author, role }: { quote: string; author: string; role: string }) => (
  <div className="p-6 rounded-xl bg-white shadow-sm">
    <p className="text-gray-600 mb-4">"{quote}"</p>
    <p className="font-semibold text-gray-900">{author}</p>
    <p className="text-gray-500 text-sm">{role}</p>
  </div>
);

export default LandingPage;