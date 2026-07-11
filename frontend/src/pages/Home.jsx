import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Briefcase, MapPin, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword || location) {
      navigate(`/jobs?keyword=${keyword}&location=${location}`);
    } else {
      navigate('/jobs');
    }
  };

  const categories = [
    { title: 'Tech & Engineering', count: '1,240+ jobs', icon: '💻' },
    { title: 'Marketing & Sales', count: '850+ jobs', icon: '📈' },
    { title: 'Design & Creative', count: '620+ jobs', icon: '🎨' },
    { title: 'Finance & Consulting', count: '430+ jobs', icon: '📊' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        padding: '80px 0 100px',
        background: 'linear-gradient(135deg, hsla(var(--primary-hue), 85%, 60%, 0.08) 0%, transparent 100%)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="title-xl" style={{ marginBottom: '20px', lineHeight: 1.15 }}>
            Discover Your <span style={{
              background: 'linear-gradient(90deg, var(--primary) 0%, hsl(280, 85%, 60%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Ideal Career</span> Path
          </h1>
          <p className="text-body" style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Find jobs, build resumes, and apply with ease. Empowering professionals and businesses alike.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} style={{
            display: 'flex',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '8px',
            boxShadow: 'var(--shadow-lg)',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', minWidth: '200px' }}>
              <Search size={20} style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Job title, keywords..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', fontSize: '1rem' }}
              />
            </div>
            
            <div style={{ width: '1px', backgroundColor: 'var(--border)', alignSelf: 'stretch' }} className="divider"></div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', minWidth: '200px' }}>
              <MapPin size={20} style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', fontSize: '1rem' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', borderRadius: 'var(--radius-lg)' }}>
              Search Jobs
            </button>
          </form>
        </div>
      </section>

      {/* Featured Categories */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 className="title-lg" style={{ textAlign: 'center', marginBottom: '12px' }}>Explore Popular Categories</h2>
          <p className="text-body" style={{ textAlign: 'center', marginBottom: '48px' }}>Get hired in high-demand industrial sectors</p>

          <div className="grid grid-cols-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="card card-interactive" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }} onClick={() => navigate(`/jobs?category=${cat.title}`)}>
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{cat.icon}</div>
                <h3 className="title-sm" style={{ fontSize: '1.1rem' }}>{cat.title}</h3>
                <span className="text-muted" style={{ padding: '4px 12px', backgroundColor: 'var(--background)', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', transition: 'background-color var(--transition-normal)' }}>
        <div className="container">
          <h2 className="title-lg" style={{ textAlign: 'center', marginBottom: '48px' }}>Why Professionals Love CareerForge</h2>
          <div className="grid grid-cols-3">
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', backgroundColor: 'var(--primary-glow)', color: 'var(--primary)', marginBottom: '20px' }}>
                <TrendingUp size={32} />
              </div>
              <h3 className="title-sm" style={{ marginBottom: '10px' }}>Fast Growth</h3>
              <p className="text-body" style={{ fontSize: '0.95rem' }}>Land jobs at the fastest-growing startups and enterprises worldwide.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', backgroundColor: 'var(--primary-glow)', color: 'var(--primary)', marginBottom: '20px' }}>
                <Users size={32} />
              </div>
              <h3 className="title-sm" style={{ marginBottom: '10px' }}>Verified Recruiters</h3>
              <p className="text-body" style={{ fontSize: '0.95rem' }}>Every company profile is validated to protect you from fraudulent postings.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', backgroundColor: 'var(--primary-glow)', color: 'var(--primary)', marginBottom: '20px' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 className="title-sm" style={{ marginBottom: '10px' }}>Secure Applications</h3>
              <p className="text-body" style={{ fontSize: '0.95rem' }}>Your personal data, documents, and resume are secure with standard encryption.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
