"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import "../../styles/ReviewsSection.css"

export default function Reviews() {
  const reviews = [
    {
      name: "Nischal Tamang",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
    },
    {
      name: "LOREM IPSUM",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
    },
    {
      name: "LOREM IPSUM",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Add this useEffect after the state declarations
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setDirection(1)
        setActiveIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1))
      }, 5000) // 5 seconds delay

      return () => clearInterval(interval)
    }
  }, [reviews.length, isHovered])

  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setActiveIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1))
  }

  const handleDotClick = (index) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const getVisibleReviews = () => {
    const prevIndex = activeIndex === 0 ? reviews.length - 1 : activeIndex - 1
    const nextIndex = activeIndex === reviews.length - 1 ? 0 : activeIndex + 1

    return [
      { ...reviews[prevIndex], position: "left" },
      { ...reviews[activeIndex], position: "center" },
      { ...reviews[nextIndex], position: "right" },
    ]
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 3,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const sideCardVariants = {
    left: {
      x: 0,
      scale: 0.94,
      opacity: 0.7,
      zIndex: 1,
    },
    right: {
      x: 0,
      scale: 0.94,
      opacity: 0.7,
      zIndex: 1,
    },
  }

  return (
    <section className="reviews-section">
      <h2 className="reviews-title">Reviews</h2>

      <div
        className="carousel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence custom={direction}>
          {getVisibleReviews().map((review, index) => (
            <motion.div
              key={`${review.position}-${activeIndex}`}
              className={`review-card ${review.position === "center" ? "active" : "side"}`}
              custom={direction}
              variants={review.position === "center" ? slideVariants : sideCardVariants}
              initial={review.position === "center" ? "enter" : review.position}
              animate={review.position === "center" ? "center" : review.position}
              exit={review.position === "center" ? "exit" : review.position}
              transition={{
                x: { type: "spring", stiffness: 500, damping: 25 },
                opacity: { duration: 0.104 },
                scale: { duration: 0.104 },
              }}
            >
              {review.position === "center" && (
                <>
                  <button className="carousel-arrow prev" onClick={handlePrev}>
                    &#10094;
                  </button>
                  <button className="carousel-arrow next" onClick={handleNext}>
                    &#10095;
                  </button>
                </>
              )}
              <motion.h3
                className="reviewer-name"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.052, duration: 0.104 }}
              >
                {review.name}
              </motion.h3>
              <motion.p
                className="review-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.078, duration: 0.104 }}
              >
                {review.text}
              </motion.p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="carousel-dots">
        {reviews.map((_, index) => (
          <motion.div
            key={index}
            className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  )
}
