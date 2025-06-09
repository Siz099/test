"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "../styles/ReviewsSection.css"

const testimonials = [
  {
    name: "LOREM IPSUM",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
  },
  {
    name: "Nischal Tamang",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
  },
  {
    name: "LOREM IPSUM",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Pause auto-play when user interacts
  const handleUserInteraction = () => {
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    handleUserInteraction()
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    handleUserInteraction()
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = (index) => {
    handleUserInteraction()
    setCurrentIndex(index)
  }

  const getPrevIndex = () => (currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  const getNextIndex = () => (currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)

  return (
    <section
      className="testimonial-section"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <h2 className="testimonial-heading">Reviews</h2>

      <div className="carousel-container">
        {/* Previous Card (Left) */}
        <motion.div
          key={`prev-${getPrevIndex()}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.4, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="carousel-card prev-card"
        >
          <div className="card-content">
            <h3 className="card-name prev">{testimonials[getPrevIndex()].name}</h3>
            <p className="card-text prev">{testimonials[getPrevIndex()].text}</p>
          </div>
        </motion.div>

        {/* Active Card (Center) */}
        <div className="active-card-container">
          {/* Left Navigation Button */}
          <button className="nav-button prev-button" onClick={prevSlide} aria-label="Previous testimonial">
            <ChevronLeft size={16} />
          </button>

          {/* Active Card */}
          <motion.div
            key={`active-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="carousel-card active-card"
          >
            <div className="card-circle"></div>
            <div className="card-content active">
              <h3 className="card-name active">{testimonials[currentIndex].name}</h3>
              <p className="card-text active">{testimonials[currentIndex].text}</p>
            </div>
          </motion.div>

          {/* Right Navigation Button */}
          <button className="nav-button next-button" onClick={nextSlide} aria-label="Next testimonial">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Next Card (Right) */}
        <motion.div
          key={`next-${getNextIndex()}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.4, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="carousel-card next-card"
        >
          <div className="card-content">
            <h3 className="card-name next">{testimonials[getNextIndex()].name}</h3>
            <p className="card-text next">{testimonials[getNextIndex()].text}</p>
          </div>
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="pagination">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`pagination-dot ${index === currentIndex ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
