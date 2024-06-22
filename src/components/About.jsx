import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 bg-slate-300 rounded">
        About the Assignment
      </h1>
      <div className="bg-slate-200 text-black p-2 m-2 text-xl rounded-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Level 1: Event Registration Form
          </h2>
          <p>
            <strong>Objective:</strong> Create a basic form for event
            registration.
          </p>
          <p>
            <strong>Requirements:</strong> Collect participant details like
            Name, Email, Age, and optionally, guest information.
          </p>
          <p>
            <strong>Outcome:</strong> Display submitted data in a clear format
            after submission.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Level 2: Application Form</h2>
          <p>
            <strong>Objective:</strong> Develop a more detailed application
            form.
          </p>
          <p>
            <strong>Requirements:</strong> Gather comprehensive applicant
            information including contact details, education, and work
            experience.
          </p>
          <p>
            <strong>Features:</strong> Include conditional fields and robust
            validation for data accuracy.
          </p>
          <p>
            <strong>Outcome:</strong> Display submitted data in a clear format
            after submission.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">Level 3: Survey Form</h2>
          <p>
            <strong>Objective:</strong> Create a dynamic survey form based on
            user input.
          </p>
          <p>
            <strong>Requirements:</strong> Offer a dropdown to select a survey
            topic (e.g., Technology, Health, Education), and load corresponding
            questions dynamically.
          </p>
          <p>
            <strong>Features:</strong> Validate inputs and summarize entered
            data upon submission.
          </p>
          <p>
            <strong>Implementation:</strong> Utilize an API to fetch additional
            questions for selected topics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
