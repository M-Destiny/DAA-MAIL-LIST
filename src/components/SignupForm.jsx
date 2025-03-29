// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

// export default function SignupForm() {
//   const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: "onChange" });
//   const [message, setMessage] = useState("");

//   const onSubmit = async (data) => {
//     setMessage("");

//     // Prevent API call if email is invalid
//     if (!isValid) return;

//     // Check if email already exists
//     const { data: existing } = await supabase
//       .from("subscribers")
//       .select("email")
//       .eq("email", data.email);

//     if (existing?.length > 0) {
//       setMessage("You're already on the list! 🎉");
//       return;
//     }

//     // Insert new email
//     const { error } = await supabase.from("subscribers").insert([{ email: data.email }]);

//     if (error) {
//       setMessage("Something went wrong. Please try again.");
//     } else {
//       setMessage("Thank you for signing up! 🎉");
//       reset(); // ✅ Clear input field after successful submission
//     }
//   };

//   return (
//     <div className="relative w-screen h-screen">
//       {/* Background Gradient */}
//       <div className="fixed inset-0 bg-gradient-to-r from-blue-500 to-purple-500"></div>

//       {/* Centered Content */}
//       <div className="relative flex min-h-screen w-full justify-center items-center p-6">
//         <div className="p-8 bg-white rounded-2xl shadow-lg text-center text-black max-w-lg w-full">
//           <h1 className="text-3xl font-extrabold text-gray-900">🎶 Meet, Match & Mingle at Events! ❤️</h1>
//           <p className="mt-3 text-gray-600">
//             <strong>Love concerts? Meet like-minded event-goers!</strong>  
//             Our upcoming app helps you <strong>connect, swipe & chat</strong> with fellow visitors at concerts, festivals, and events.
//             Whether you're looking for new friends, a date, or just someone to enjoy a show with—we’ve got you covered!
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full">
//             <input
//               type="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^\S+@\S+\.\S+$/,
//                   message: "Please enter a valid email address",
//                 },
//               })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white placeholder-gray-400"
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

//             <button
//               type="submit"
//               className={`mt-4 w-full py-3 rounded-lg transition duration-300 ${
//                 isValid ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
//               }`}
//               disabled={!isValid}
//             >
//               Get Early Access 🎟️
//             </button>
//           </form>

//           {message && <p className="mt-3 text-green-600">{message}</p>}

//           <p className="mt-5 text-sm text-gray-500">
//             By signing up, you agree to our <a href="/terms" className="underline">Terms & Conditions</a>.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
const supabaseFunctionsURL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: "onChange" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setMessage("");
    if (!isValid) return;

    setLoading(true);
    try {
      // ✅ Check if email exists via Supabase Edge Function
      const response = await fetch(`${supabaseFunctionsURL}/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`, 
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (result.exists) {
        setMessage("You're already on the list! 🎉");
        setLoading(false);
        return;
      }

      // ✅ Insert new email into Supabase
      const { error } = await supabase.from("subscribers").insert([{ email: data.email }]);

      if (error) {
        throw new Error(error.message);
      }

      setMessage("Thank you for signing up! 🎉");
      reset();
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-500 to-purple-500"></div>

      {/* Centered Content */}
      <div className="relative flex min-h-screen w-full justify-center items-center p-6">
        <div className="p-8 bg-white rounded-2xl shadow-lg text-center text-black max-w-lg w-full">
          <h1 className="text-3xl font-extrabold text-gray-900">🎶 Meet, Match & Mingle at Events! ❤️</h1>
          <p className="mt-3 text-gray-600">
            <strong>Love concerts? Meet like-minded event-goers!</strong>  
            Our upcoming app helps you <strong>connect, swipe & chat</strong> with fellow visitors at concerts, festivals, and events.
            Whether you're looking for new friends, a date, or just someone to enjoy a show with—we’ve got you covered!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full">
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white placeholder-gray-400"
              placeholder="Enter your email"
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

            <button
              type="submit"
              className={`mt-4 w-full py-3 rounded-lg transition duration-300 ${
                isValid && !loading ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              disabled={!isValid || loading}
            >
              {loading ? "Checking..." : "Get Early Access 🎟️"}
            </button>
          </form>

          {message && <p className="mt-3 text-green-600">{message}</p>}

          <p className="mt-5 text-sm text-gray-500">
            By signing up, you agree to our <a href="/terms" className="underline">Terms & Conditions</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
