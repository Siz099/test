@@ .. @@
"use client";

import { motion } from "framer-motion";
+import { Link } from "react-router-dom";
import "../../styles/VenueGrid.css";
@@ .. @@
        {paginatedVenues.map((venue, index) => (
          <motion.div
            key={venue.id || index}
            className={`venue-card${venueType === "popular" ? " popular" : ""}`}
            variants={cardVariants}
            whileHover="hover"
          >
-            <div className="venue-image" style={{ backgroundImage: `url(${venue.image})` }}>
-              {venueType === "popular" && (
-                <div className="venue-explore-overlay">
-                  <span>Explore</span>
-                </div>
-              )}
-            </div>
+            <Link to={`/venues/${venue.venue_id || venue.id}`} className="venue-link">
+              <div className="venue-image" style={{ backgroundImage: `url(${venue.image})` }}>
+                {venueType === "popular" && (
+                  <div className="venue-explore-overlay">
+                    <span>Explore</span>
+                  </div>
+                )}
+              </div>
+            </Link>
            <div className="venue-label-below">{venue.name}</div>
          </motion.div>
        ))}