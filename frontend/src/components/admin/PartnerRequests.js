import React from "react";

const PartnerRequests = () => (
  <section className="partner-requests">
    <h2>Partner Verification Requests</h2>
    <p>Review and approve new partner applications</p>
    <div className="request-card">
      <strong>Royal Events</strong>
      <div>Owner: Rajesh Sharma</div>
      <div>Email: rajesh@royalevents.com</div>
      <div>Reg #: 12345-678-90</div>
      <div>Requested: May 15, 2023</div>
      <div className="request-actions">
        <button className="reject">Reject</button>
        <button className="approve">Approve</button>
      </div>
    </div>
  </section>
);

export default PartnerRequests;