import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState(null);
  const submitForm = (formData) => {
    setData(formData);
  };

  const selectedPosition = watch("position");
  const skills = [
    "JavaScript",
    "CSS",
    "Python",
    "Java",
    "C#",
    "Ruby",
    "Go",
    "PHP",
    "Swift",
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-300 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4 text-sm">
        <div>
          <label htmlFor="fullName" className="block font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block font-medium">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("phoneNumber", {
              required: "Phone Number is required",
              validate: (value) =>
                !isNaN(value) || "Phone Number must be a valid number",
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="position" className="block font-medium">
            Applying for Position
          </label>
          <select
            id="position"
            className="mt-1 p-2 w-full border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("position", {
              required: "Applying for Position is required",
            })}
          >
            <option value="">Select...</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && (
            <p className="text-red-500 text-xs">{errors.position.message}</p>
          )}
        </div>
        {(selectedPosition === "Developer" ||
          selectedPosition === "Designer") && (
          <div>
            <label htmlFor="experience" className="block font-medium">
              Relevant Experience (years)
            </label>
            <input
              id="experience"
              type="number"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("experience", {
                required: "Relevant Experience is required",
                validate: (value) =>
                  value > 0 || "Relevant Experience must be greater than 0",
              })}
            />
            {errors.experience && (
              <p className="text-red-500 text-xs">
                {errors.experience.message}
              </p>
            )}
          </div>
        )}
        {selectedPosition === "Designer" && (
          <div>
            <label htmlFor="portfolio" className="block font-medium">
              Portfolio URL
            </label>
            <input
              id="portfolio"
              type="url"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("portfolio", {
                required: "Portfolio URL is required",
                pattern: {
                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                  message: "Invalid URL",
                },
              })}
            />
            {errors.portfolio && (
              <p className="text-red-500 text-xs">{errors.portfolio.message}</p>
            )}
          </div>
        )}
        {selectedPosition === "Manager" && (
          <div>
            <label htmlFor="managementExperience" className="block font-medium">
              Management Experience
            </label>
            <textarea
              id="managementExperience"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("managementExperience", {
                required: "Management Experience is required",
              })}
            ></textarea>
            {errors.managementExperience && (
              <p className="text-red-500 text-xs">
                {errors.managementExperience.message}
              </p>
            )}
          </div>
        )}
        <div>
          <label className="block font-medium">Additional Skills</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`skill-${index}`}
                  value={skill}
                  className="form-checkbox h-5 w-5 text-blue-600"
                  {...register("skills", {
                    validate: (value) =>
                      value.length > 0 || "At least one skill must be selected",
                  })}
                />
                <label htmlFor={`skill-${index}`} className="ml-2 text-sm">
                  {skill}
                </label>
              </div>
            ))}
          </div>
          {errors.skills && (
            <p className="text-red-500 text-xs">{errors.skills.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="interviewTime" className="block font-medium">
            Preferred Interview Time
          </label>
          <input
            id="interviewTime"
            type="datetime-local"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("interviewTime", {
              required: "Preferred Interview Time is required",
            })}
          />
          {errors.interviewTime && (
            <p className="text-red-500 text-xs">
              {errors.interviewTime.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {data && (
        <div className="mt-6 p-4 border rounded-md w-full bg-white shadow-md">
          <h2 className="text-xl font-medium mb-4">Here is your Entered Data -- </h2>
          <div className="overflow-auto max-h-96 p-4 bg-gray-100 rounded-md">
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
