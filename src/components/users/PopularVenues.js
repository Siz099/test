@@ .. @@
"use client";

import { useState, useEffect } from 'react';
+import { Link } from 'react-router-dom';
import { venueService, imageService } from '../../services/api';
import VenueGrid from './VenueGrid';
@@ .. @@
              return {
                id: venue.venue_id,
                name: venue.venueName,
                image: imageUrl,
+                venue_id: venue.venue_id, // Make sure venue_id is available for linking
              };
            } catch (err) {
              console.error(`Error loading image for venue ${venue.venue_id}:`, err);
              return {
                id: venue.venue_id,
                name: venue.venueName,
                image: 'https://www.bing.com/ck/a?!&&p=ffbf9fa539dd1660196639ced0b17acb04b307b3710877273bae79dd77f3c19bJmltdHM9MTc1MzA1NjAwMA&ptn=3&ver=2&hsh=4&fclid=2c293859-3576-63ef-0a75-2e7a34c462bd&u=a1L2ltYWdlcy9zZWFyY2g_cT1pbWFnZXZlbnVlJmlkPUEyMkE4NTEwODBFNTY5OERGQTQ5MTQ4M0UzRkVGOEQyNDQ2NDUyOTkmRk9STT1JQUNGSVI&ntb=1',
+                venue_id: venue.venue_id, // Make sure venue_id is available for linking
              };
            }
          })