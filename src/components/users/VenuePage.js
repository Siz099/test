@@ .. @@
import React, { useState, useEffect } from "react";
+import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PopularVenues from "./PopularVenues";
import HeroSection from "./HeroSection";
import { venueService, imageService } from "../../services/api";
import "../../styles/VenuePage.css";
@@ .. @@
                  <div className="stars">★★★★★</div>
-                  <button className="view-details-button">View Details</button>
+                  <Link to={`/venues/${venue.venue_id}`} className="view-details-button">
+                    View Details
+                  </Link>
                </div>
              </div>
            ))}