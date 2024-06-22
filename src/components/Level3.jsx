import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const SurveyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [surveyTopic, setSurveyTopic] = useState("");
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  const topics = ["Technology", "Health", "Education"];

  const onSubmit = (data) => {
    setSubmittedData(data);
    console.log("Submitted data:", data);
  };

  useEffect(() => {
    if (surveyTopic) {
      fetchAdditionalQuestions(surveyTopic);
    }
  }, [surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      let url;
      switch (topic) {
        case "Technology":
          url =
            "https://raw.githubusercontent.com/Sanketsinghgodara/additional_questions/main/technology.json";
          break;
        case "Health":
          url =
            "https://raw.githubusercontent.com/Sanketsinghgodara/additional_questions/main/health.json";
          break;
        case "Education":
          url =
            "https://raw.githubusercontent.com/Sanketsinghgodara/additional_questions/main/education.json";
          break;
        default:
          url = "";
      }

      if (url) {
        const response = await axios.get(url);
        setAdditionalQuestions(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching additional questions:", error);
    }
  };

  const handleTopicChange = (event) => {
    const selectedTopic = event.target.value;
    setSurveyTopic(selectedTopic);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
        <div>
          <label htmlFor="fullName" className="block font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter Full Name"
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
            placeholder="Enter Email"
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
          <label htmlFor="surveyTopic" className="block font-medium">
            Survey Topic
          </label>
          <select
            id="surveyTopic"
            className="mt-1 p-2 w-full border rounded-md bg-white text-gray-700"
            {...register("surveyTopic", {
              required: "Survey Topic is required",
            })}
            onChange={handleTopicChange}
          >
            <option value="">Select...</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errors.surveyTopic && (
            <p className="text-red-500 text-xs">{errors.surveyTopic.message}</p>
          )}
        </div>

        {/* Conditional rendering of additional sections based on survey topic */}
        {surveyTopic === "Technology" && (
          <TechnologySection register={register} errors={errors} />
        )}
        {surveyTopic === "Health" && (
          <HealthSection register={register} errors={errors} />
        )}
        {surveyTopic === "Education" && (
          <EducationSection register={register} errors={errors} />
        )}

        <div>
          <label htmlFor="feedback" className="block font-medium">
            Feedback
          </label>
          <textarea
            id="feedback"
            placeholder="Enter Feedback"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("feedback", {
              required: "Feedback is required",
              minLength: {
                value: 50,
                message: "Feedback must be at least 50 characters",
              },
            })}
          />
          {errors.feedback && (
            <p className="text-red-500 text-xs">{errors.feedback.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {additionalQuestions.length > 0 && (
        <div className="mt-6 p-4 border rounded-md bg-white shadow-md">
          <h2 className="text-2xl font-medium">Additional Questions</h2>
          <ul className="list-disc list-inside">
            {additionalQuestions.map((question, index) => (
              <li className="text-sm" key={index}>{question.question}</li>
            ))}
          </ul>
        </div>
      )}

      
      {submittedData && (
        <div className="mt-6 p-4 border rounded-md bg-white shadow-md overflow-x-auto">
          <h2 className="text-2xl font-medium">Here is your Entered Data ---</h2>
          <pre className="whitespace-pre-wrap break-words text-sm">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

const TechnologySection = ({ register, errors }) => (
  <div>
    <label htmlFor="programmingLanguage" className="block font-medium">
      Favorite Programming Language
    </label>
    <select
      id="programmingLanguage"
      className="mt-1 p-2 w-full border rounded-md"
      {...register("programmingLanguage", {
        required: "Favorite Programming Language is required",
      })}
    >
      <option value="">Select...</option>
      <option value="JavaScript">JavaScript</option>
      <option value="Python">Python</option>
      <option value="Java">Java</option>
      <option value="C#">C#</option>
    </select>
    {errors.programmingLanguage && (
      <p className="text-red-500 text-xs">
        {errors.programmingLanguage.message}
      </p>
    )}

    <label htmlFor="yearsOfExperience" className="block font-medium">
      Years of Experience
    </label>
    <input
      id="yearsOfExperience"
      type="number"
      placeholder="Enter Years of Experience"
      className="mt-1 p-2 w-full border rounded-md"
      {...register("yearsOfExperience", {
        required: "Years of Experience is required",
        validate: (value) =>
          value > 0 || "Years of Experience must be greater than 0",
      })}
    />
    {errors.yearsOfExperience && (
      <p className="text-red-500 text-xs">{errors.yearsOfExperience.message}</p>
    )}
  </div>
);

const HealthSection = ({ register, errors }) => (
  <div>
    <label htmlFor="exerciseFrequency" className="block font-medium">
      Exercise Frequency
    </label>
    <select
      id="exerciseFrequency"
      className="mt-1 p-2 w-full border rounded-md"
      {...register("exerciseFrequency", {
        required: "Exercise Frequency is required",
      })}
    >
      <option value="">Select...</option>
      <option value="Daily">Daily</option>
      <option value="Weekly">Weekly</option>
      <option value="Monthly">Monthly</option>
      <option value="Rarely">Rarely</option>
    </select>
    {errors.exerciseFrequency && (
      <p className="text-red-500 text-xs">{errors.exerciseFrequency.message}</p>
    )}

    <label htmlFor="dietPreference" className="block font-medium">
      Diet Preference
    </label>
    <select
      id="dietPreference"
      className="mt-1 p-2 w-full border rounded-md"
      {...register("dietPreference", {
        required: "Diet Preference is required",
      })}
    >
      <option value="">Select...</option>
      <option value="Vegetarian">Vegetarian</option>
      <option value="Vegan">Vegan</option>
      <option value="Non-Vegetarian">Non-Vegetarian</option>
    </select>
    {errors.dietPreference && (
      <p className="text-red-500 text-xs">{errors.dietPreference.message}</p>
    )}
  </div>
);

const EducationSection = ({ register, errors }) => (
  <div>
    <label htmlFor="highestQualification" className="block font-medium">
      Highest Qualification
    </label>
    <select
      id="highestQualification"
      className="mt-1 p-2 w-full border rounded-md"
      {...register("highestQualification", {
        required: "Highest Qualification is required",
      })}
    >
      <option value="">Select...</option>
      <option value="High School">High School</option>
      <option value="Bachelor's">Bachelor's</option>
      <option value="Master's">Master's</option>
      <option value="PhD">PhD</option>
    </select>
    {errors.highestQualification && (
      <p className="text-red-500 text-xs">
        {errors.highestQualification.message}
      </p>
    )}

    <label htmlFor="fieldOfStudy" className="block font-medium">
      Field of Study
    </label>
    <input
      id="fieldOfStudy"
      type="text"
      placeholder="Enter Field of Study"
      className="mt-1 p-2 w-full border rounded-md"
      {...register("fieldOfStudy", {
        required: "Field of Study is required",
      })}
    />
    {errors.fieldOfStudy && (
      <p className="text-red-500 text-xs">{errors.fieldOfStudy.message}</p>
    )}
  </div>
);

export default SurveyForm;
