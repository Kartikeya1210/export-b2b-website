"use client";

import { useState } from "react";

export default function RequestAccountPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="stack">
      <header className="page-header">
        <h1 className="page-title">Request a wholesale account</h1>
        <p className="page-subtitle">
          Share a few details about your business. In a production setup this would create a ticket for your
          team to approve and onboard the customer.
        </p>
      </header>
      {submitted ? (
        <div className="success-card">
          <div className="success-title">Request submitted</div>
          <div className="success-body">
            In this demo we don&apos;t send emails, but your details would normally be routed to your sales
            or export team. You can still use the demo login page to explore the portal.
          </div>
        </div>
      ) : (
        <form
          className="card stack-sm"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="field">
            <label htmlFor="company">Company name</label>
            <input id="company" name="company" required placeholder="Example Trading Ltd." />
          </div>
          <div className="field">
            <label htmlFor="name">Contact name</label>
            <input id="name" name="name" required placeholder="Buyer / logistics contact" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="buyer@example.com" />
          </div>
          <div className="field">
            <label htmlFor="country">Country</label>
            <input id="country" name="country" required placeholder="Where you import to" />
          </div>
          <div className="field">
            <label htmlFor="volume">Expected monthly volume</label>
            <input id="volume" name="volume" placeholder="e.g. 50,000 units" />
          </div>
          <div className="field">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Share any channel, market, or regulatory details that are important for you."
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit request
          </button>
        </form>
      )}
    </div>
  );
}

