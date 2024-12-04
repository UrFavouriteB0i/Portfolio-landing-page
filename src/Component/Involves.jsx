import React from "react";

export const Involves = () => {
  return (
    <div className="mt-20 text-white min-h-screen flex flex-col items-center py-10 px-6">
      {/* Title Section */}
      <h4>INVOLVEMENTS</h4>
      <h5 className="text-transparent bg-gradient-to-r from-purple-900 from-10% via-orange-300 via-50% to-white to-80%">
        DISCOVER NOW
      </h5>

      {/* Content Section */}
      <div className="space-y-10 max-w-3xl">
        {/* Hackathons and Events */}
        {[
          {
            imgSrc: "./image 9.png",
            title: "Lablab.ai Hackathon",
            location: "2024, Worldwide",
            description:
              "Utilized LLM-Powered using Falcon 180B model to develop a medical assistance bot, easing clinician management of patients' e-health records.",
            tags: ["Natural Language Processing", "Reinforcement Learning", "LLM", "NER"],
          },
          {
            imgSrc: "./image 8.png",
            title: "Garuda Hacks 5.0",
            location: "2024, South East Asia",
            description:
              "Developed AI-powered social platform prototype that engages MSMEs to achieve balanced economic growth in their respective markets.",
            tags: ["Reinforcement Learning", "Neural network", "Tensorflow", "Numpy"],
          },
          {
            imgSrc: "./image 6.png",
            title: "National Aerial Robot Competition (KRTI) / Fixed Wing",
            location: "2021, Indonesia",
            description:
              "Designed and developed an airplane launcher and the 3D model of the fixed-wing model.",
            tags: ["Inventor", "CAD"],
          },
          {
            imgSrc: "./image 7.png",
            title: "Shopee National Data Science Challenge",
            location: "2020, Indonesia",
            description:
              "Developed and implemented data classification on Shopee's business cases, including customer segmentation through search history.",
            tags: ["Exploratory Data Analysis", "scikit-learn", "Pandas"],
          },
        ].map((event, index) => (
          <div
            key={index}
            className="rounded-lg p-6 flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0"
          >
            <img
              src={event.imgSrc}
              alt={event.title}
              className="object-cover rounded-lg mix-blend-luminosity w-full md:w-1/3"
            />
            <div className="text-center md:text-left space-y-2 flex-1">
              <h2 className="text-xl font-InterBld">{event.title}</h2>
              <p className="text-gray-400 font-InterMed">{event.location}</p>
              <p className="text-gray-300 font-InterReg">{event.description}</p>
              <div className="flex flex-wrap justify-center space-x-1 -mx-10 md:justify-start md:space-x-2">
                {event.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-sm text-white px-2 py-1 rounded-full font-Afacad text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
