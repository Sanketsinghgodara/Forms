import React, { useState } from "react";
import { useForm } from "react-hook-form";

const EventRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      age: "",
      attendingWithGuest: "",
      guestName: "",
    },
  });

  const [submittedData, setSubmittedData] = useState(null);
  const onSubmit = (data) => {
    setSubmittedData(data);
  };
  const isAttendingWithGuest = watch("attendingWithGuest");

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            placeholder="Enter Name"
            id="name"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            placeholder="Email"
            id="email"
            type="email"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="age" className="block font-medium">
            Age
          </label>
          <input
            placeholder="Age"
            id="age"
            type="number"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("age", {
              required: "Age is required",
              min: { value: 1, message: "Age must be greater than 0" },
            })}
          />
          {errors.age && (
            <p className="text-red-500 text-xs">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">
            Are you attending with a guest?
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Yes"
                className="form-radio h-4 w-4 text-blue-600"
                {...register("attendingWithGuest", {
                  required: "This field is required",
                })}
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                value="No"
                className="form-radio h-4 w-4 text-blue-600"
                {...register("attendingWithGuest", {
                  required: "This field is required",
                })}
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          {errors.attendingWithGuest && (
            <p className="text-red-500 text-xs">
              {errors.attendingWithGuest.message}
            </p>
          )}
        </div>

        {isAttendingWithGuest === "Yes" && (
          <div>
            <label htmlFor="guestName" className="block font-medium">
              Guest Name
            </label>
            <input
              placeholder="Guest Name"
              id="guestName"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("guestName", { required: "Guest Name is required" })}
            />
            {errors.guestName && (
              <p className="text-red-500 text-xs">{errors.guestName.message}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="mt-4 p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
        >
          Submit
        </button>
      </form>
      {submittedData && (
        <div className="mt-6 p-6 border rounded-md bg-white shadow-md">
          <h2 className="text-lg font-medium mb-4">
            Here is your Entered Data
          </h2>
          <div className="overflow-auto max-h-96 p-4 bg-gray-100 rounded-md">
            <pre className="whitespace-pre-wrap text-xs">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
