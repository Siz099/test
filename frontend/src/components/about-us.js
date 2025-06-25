"use client"

import { useState, useEffect } from "react"
import "../styles/about-us.css"
import Header from "./Header"
import Footer from "./Footer"

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("story")
  const [visibleStats, setVisibleStats] = useState(false)
  const [expandedTeamMember, setExpandedTeamMember] = useState(null)

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleStats(true)
          }
        })
      },
      { threshold: 0.5 },
    )

    const statsSection = document.querySelector(".stats-section")
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => observer.disconnect()
  }, [])

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Founder & Lead Wedding Planner",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "With over 10 years of experience in wedding planning, Sarah brings creativity and attention to detail to every celebration.",
      fullBio:
        "Sarah founded the company in 2014 with a vision to create extraordinary wedding experiences. Her background in event management and passion for design has helped over 500 couples celebrate their special day. She specializes in luxury weddings and destination planning, ensuring every detail reflects the couple's unique story.",
      specialties: ["Luxury Weddings", "Destination Planning", "Cultural Ceremonies"],
      email: "sarah@company.com",
      linkedin: "#",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Michael's artistic vision and innovative design concepts have transformed countless venues into magical wedding destinations.",
      fullBio:
        "Michael joined our team in 2016, bringing his expertise in floral design and venue styling. His creative approach has won multiple industry awards and his work has been featured in top wedding magazines. He believes every wedding should be a work of art.",
      specialties: ["Floral Design", "Venue Styling", "Theme Development"],
      email: "michael@company.com",
      linkedin: "#",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Coordination Specialist",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Emily ensures every wedding day runs seamlessly, coordinating vendors and managing timelines with precision.",
      fullBio:
        "Emily's organizational skills and calm demeanor make her the perfect day-of coordinator. She has successfully managed over 200 weddings and is known for her ability to handle any situation with grace and professionalism.",
      specialties: ["Day-of Coordination", "Vendor Management", "Timeline Planning"],
      email: "emily@company.com",
      linkedin: "#",
    },
  ]

  const stats = [
    { number: "500+", label: "Weddings Planned", description: "Successfully planned and executed" },
    { number: "10+", label: "Years Experience", description: "In the wedding industry" },
    { number: "50+", label: "Vendor Partners", description: "Trusted professionals" },
    { number: "98%", label: "Client Satisfaction", description: "Happy couples" },
  ]

  const values = [
    {
      title: "Personalized Service",
      description: "Every couple is unique, and we tailor our services to reflect your individual style and vision.",
      icon: "💝",
      details:
        "We take time to understand your story, preferences, and dreams to create a truly personalized experience.",
    },
    {
      title: "Attention to Detail",
      description: "From the grandest gestures to the smallest touches, we ensure every element is perfect.",
      icon: "✨",
      details:
        "Our meticulous planning process ensures nothing is overlooked, from timeline coordination to final touches.",
    },
    {
      title: "Stress-Free Planning",
      description: "We handle the logistics so you can focus on what matters most - celebrating your love.",
      icon: "🌸",
      details: "Our comprehensive planning approach removes the stress, allowing you to enjoy your engagement period.",
    },
    {
      title: "Lasting Relationships",
      description: "We build meaningful connections with our couples that extend beyond the wedding day.",
      icon: "💕",
      details:
        "Many of our couples become lifelong friends, and we love celebrating anniversaries and milestones together.",
    },
  ]

  const toggleTeamMember = (memberId) => {
    setExpandedTeamMember(expandedTeamMember === memberId ? null : memberId)
  }

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="about-wrapper">
      <Header />

      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>About Our Story</h1>
          <p>Creating unforgettable moments, one wedding at a time</p>
          <div className="hero-actions">
            <button className="hero-btn primary" onClick={() => scrollToSection("story-section")}>
              Our Journey
            </button>
            <button className="hero-btn secondary" onClick={() => scrollToSection("team-section")}>
              Meet the Team
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="breadcrumb">
        <div className="breadcrumb-container">
          <button onClick={() => scrollToSection("story-section")}>Our Story</button>
          <button onClick={() => scrollToSection("stats-section")}>Our Impact</button>
          <button onClick={() => scrollToSection("values-section")}>Our Values</button>
          <button onClick={() => scrollToSection("team-section")}>Our Team</button>
          <button onClick={() => scrollToSection("process-section")}>Our Process</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-container">
        {/* Story Section */}
        <section className="story-section" id="story-section">
          <div className="section-content">
            <div className="story-grid">
              <div className="story-text">
                <div className="section-header">
                  <h2>Our Journey</h2>
                  <div className="section-subtitle">From dream to reality</div>
                </div>
                <div className="story-content">
                  <p>
                    Founded in 2014, &lt;Company Name&gt; began as a dream to create extraordinary wedding experiences
                    that reflect each couple's unique love story. What started as a small passion project has grown into
                    a full-service wedding planning company trusted by couples across the region.
                  </p>
                  <p>
                    We believe that your wedding day should be a perfect reflection of your love, personality, and
                    dreams. Our team of dedicated professionals works tirelessly to bring your vision to life, handling
                    every detail so you can focus on what truly matters - celebrating your love.
                  </p>
                  <p>
                    From intimate garden ceremonies to grand ballroom celebrations, we've had the privilege of planning
                    over 500 weddings, each one as unique and special as the couple at its heart.
                  </p>
                </div>
                <div className="story-highlights">
                  <div className="highlight">
                    <span className="highlight-icon">🎯</span>
                    <div>
                      <strong>Our Mission</strong>
                      <p>To create unforgettable wedding experiences that celebrate love in all its forms.</p>
                    </div>
                  </div>
                  <div className="highlight">
                    <span className="highlight-icon">👁️</span>
                    <div>
                      <strong>Our Vision</strong>
                      <p>To be the most trusted wedding planning partner, known for excellence and innovation.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="story-image">
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Wedding planning process"
                  loading="lazy"
                />
                <div className="image-caption">Behind the scenes of creating your perfect day</div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="stats-section" id="stats-section">
          <div className="section-content">
            <div className="section-header centered">
              <h2>Our Impact</h2>
              <div className="section-subtitle">The numbers that tell our story of success</div>
            </div>

            <div className="stats-container">
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`stat-item ${visibleStats ? "animate" : ""}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="stat-content">
                      <div className="stat-number">{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                      <div className="stat-description">{stat.description}</div>
                    </div>
                    <div className="stat-decoration"></div>
                  </div>
                ))}
              </div>

              <div className="stats-highlight">
                <div className="highlight-content">
                  <h3>Why These Numbers Matter</h3>
                  <p>
                    Each statistic represents real couples whose dreams we've helped bring to life. Our decade of
                    experience has taught us that every wedding is unique, and our growing network of trusted vendors
                    ensures we can handle any vision, any style, any budget.
                  </p>
                  <div className="highlight-features">
                    <div className="feature-item">
                      <span className="feature-icon">🏆</span>
                      <span>Award-winning service</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">⭐</span>
                      <span>5-star average rating</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🌟</span>
                      <span>Industry recognition</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section" id="values-section">
          <div className="section-content">
            <div className="section-header centered">
              <h2>What We Stand For</h2>
              <div className="section-subtitle">The principles that guide everything we do</div>
            </div>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-item">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                  <div className="value-details">{value.details}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section" id="team-section">
          <div className="section-content">
            <div className="section-header centered">
              <h2>Meet Our Team</h2>
              <div className="section-subtitle">
                Our passionate team of wedding professionals is dedicated to making your special day perfect.
              </div>
            </div>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member">
                  <div className="member-image">
                    <img src={member.image || "/placeholder.svg"} alt={member.name} loading="lazy" />
                    <div className="member-overlay">
                      <button
                        className="contact-member-btn"
                        onClick={() => (window.location.href = `mailto:${member.email}`)}
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <h4>{member.role}</h4>
                    <p>{expandedTeamMember === member.id ? member.fullBio : member.bio}</p>

                    <button
                      className="read-more-btn"
                      onClick={() => toggleTeamMember(member.id)}
                      aria-expanded={expandedTeamMember === member.id}
                    >
                      {expandedTeamMember === member.id ? "Read Less" : "Read More"}
                    </button>

                    <div className="member-specialties">
                      <strong>Specialties:</strong>
                      <div className="specialty-tags">
                        {member.specialties.map((specialty, index) => (
                          <span key={index} className="specialty-tag">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="member-contact">
                      <a href={`mailto:${member.email}`} className="contact-link">
                        📧 {member.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="process-section" id="process-section">
          <div className="section-content">
            <div className="section-header centered">
              <h2>Our Process</h2>
              <div className="section-subtitle">How we bring your dream wedding to life</div>
            </div>

            <div className="process-tabs">
              <button
                className={`tab-button ${activeTab === "story" ? "active" : ""}`}
                onClick={() => setActiveTab("story")}
                aria-pressed={activeTab === "story"}
              >
                <span className="tab-icon">🔍</span>
                Discovery
              </button>
              <button
                className={`tab-button ${activeTab === "planning" ? "active" : ""}`}
                onClick={() => setActiveTab("planning")}
                aria-pressed={activeTab === "planning"}
              >
                <span className="tab-icon">📋</span>
                Planning
              </button>
              <button
                className={`tab-button ${activeTab === "execution" ? "active" : ""}`}
                onClick={() => setActiveTab("execution")}
                aria-pressed={activeTab === "execution"}
              >
                <span className="tab-icon">✨</span>
                Execution
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "story" && (
                <div className="process-step">
                  <div className="step-header">
                    <h3>Discovery & Vision</h3>
                    <span className="step-number">01</span>
                  </div>
                  <p>
                    We start by getting to know you as a couple. Through detailed consultations, we learn about your
                    love story, style preferences, budget, and dreams for your special day. This foundation helps us
                    create a personalized plan that's uniquely yours.
                  </p>
                  <div className="step-features">
                    <div className="feature">
                      <span className="feature-icon">💬</span>
                      <div>
                        <strong>Initial consultation and vision session</strong>
                        <p>In-depth discussion about your dreams and expectations</p>
                      </div>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">🎨</span>
                      <div>
                        <strong>Style and preference assessment</strong>
                        <p>Understanding your aesthetic and personal style</p>
                      </div>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">💰</span>
                      <div>
                        <strong>Budget planning and allocation</strong>
                        <p>Strategic budget distribution for maximum impact</p>
                      </div>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">📅</span>
                      <div>
                        <strong>Timeline development</strong>
                        <p>Comprehensive planning schedule from engagement to wedding day</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "planning" && (
                <div className="process-step">
                  <div className="step-header">
                    <h3>Design & Planning</h3>
                    <span className="step-number">02</span>
                  </div>
                  <p>
                    With your vision in mind, we begin the detailed planning process. From venue selection to vendor
                    coordination, we handle every aspect of your wedding planning while keeping you informed and
                    involved in all major decisions.
                  </p>
                  <div className="step-features">
                    <div className="feature">
                      <span className="feature-icon">🏛️</span>
                      <div>
                        <strong>Venue selection and booking</strong>
                        <p>Finding and securing the perfect location for your celebration</p>
                      </div>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">🤝</span>
                      <div>
                        <strong>Vendor sourcing and management</strong>
                        <p>Connecting you with trusted professionals in our network</p>
                      </div>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">🎭</span>
                      <div>
                        <strong>Design concept development</strong>
                        <p>Creating cohesive visual themes and styling concepts</p>
                      </div>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">📄</span>
                      <div>
                        <strong>Contract negotiations and reviews</strong>
                        <p>Ensuring fair terms and protecting your interests</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "execution" && (
                <div className="process-step">
                  <div className="step-header">
                    <h3>Flawless Execution</h3>
                    <span className="step-number">03</span>
                  </div>
                  <p>
                    On your wedding day, our team ensures everything runs smoothly. We coordinate with all vendors,
                    manage the timeline, and handle any unexpected situations so you can relax and enjoy every moment of
                    your celebration.
                  </p>
                  <div className="step-features">
                    <div className="feature">
                      <span className="feature-icon">⏰</span>
                      <div>
                        <strong>Day-of coordination and management</strong>
                        <p>Seamless execution of your wedding day timeline</p>
                      </div>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">👥</span>
                      <div>
                        <strong>Vendor supervision and timeline management</strong>
                        <p>Coordinating all service providers for perfect timing</p>
                      </div>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">🎉</span>
                      <div>
                        <strong>Guest assistance and support</strong>
                        <p>Ensuring your guests have everything they need</p>
                      </div>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">🚨</span>
                      <div>
                        <strong>Emergency problem-solving</strong>
                        <p>Quick resolution of any unexpected issues</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="section-content">
            <div className="cta-content">
              <h2>Ready to Start Planning?</h2>
              <p>Let's create something beautiful together. Contact us today to begin your wedding journey.</p>
              <div className="cta-buttons">
                <button className="cta-primary" onClick={() => (window.location.href = "/contact")}>
                  Schedule Consultation
                </button>
                <button className="cta-secondary" onClick={() => (window.location.href = "/portfolio")}>
                  View Our Portfolio
                </button>
              </div>
              <div className="cta-contact-info">
                <div className="contact-item">
                  <span>📞</span>
                  <a href="tel:+1234567890">+1 (234) 567-8900</a>
                </div>
                <div className="contact-item">
                  <span>📧</span>
                  <a href="mailto:hello@company.com">hello@company.com</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* TODO: Add Footer component here */}
       <Footer /> 
    </div>
  )
}

export default AboutUs
