import React from "react";

export const Involves = () => {
  return (
    <div className="mt-20 text-white min-h-screen flex flex-col items-center py-10 px-6">
      {/* Title Section */}
        <h4>INVOLVEMENTS</h4>
        <h5 className='text-transparent bg-gradient-to-r from-purple-900 from-10% via-orange-300 via-50% to-white to-80%'>DISCOVER NOW</h5>

      {/* Content Section */}
      <div className="space-y-10 max-w-3xl">
        {/* LabLab.ai Hackathon */}
        <div className=" rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src="./image 9.png"
            alt="Falcon Hackathon"
            className="object-cover rounded-lg mix-blend-luminosity"
          />
          <div className="space-y-2">
            <h2 className="text-xl font-InterBld">Lablab.ai Hackathon</h2>
            <p className="text-gray-400 font-InterMed">2024, Worldwide</p>
            <p className="text-gray-300 font-InterReg">
              Utilized LLM-Powered using Falcon 180B model to develop medical assistance bot, easing clinician to do
              patients' e-health record management
            </p>
            <div className="flex space-x-2">
              {["Natural Language Processing", "Reinforcement Learning", "LLM", "NER"].map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-white px-3 py-1 rounded-full font-Afacad text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40'"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Garuda Hacks 5.0 */}
        <div className="rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src="./image 8.png"
            alt="Garuda Hacks"
            className="object-cover rounded-lg mix-blend-luminosity"
          />
          <div className="space-y-2">
            <h2 className="text-xl font-InterBld">Garuda Hacks 5.0</h2>
            <p className="text-gray-400 font-InterMed">2024, South East Asia</p>
            <p className="text-gray-300 font-InterReg">
              Developed AI-powered social platform prototype that engage with MSME to achieve balance economy growth in
              their respective market
            </p>
            <div className="flex space-x-2">
              {["Reinforcement Learning", "Neural network", "Tensorflow", "Numpy"].map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-white px-3 py-1 rounded-full font-Afacad text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40'"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* National Aerial Robot Competition */}
        <div className=" rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src="./image 6.png"
            alt="Fixed Wing Model"
            className="object-cover rounded-lg mix-blend-luminosity"
          />
          <div className="space-y-2">
            <h2 className="text-2xl font-InterBld">National Aerial Robot Competition (KRTI) / Fixed Wing</h2>
            <p className="text-gray-400 font-InterMed">2021, Indonesia</p>
            <p className="text-gray-300 font-InterReg">
              Designed and developed airplane launcher and the 3D model of the fixed wing model
            </p>
            <div className="flex space-x-2">
              {["Inventor", "CAD"].map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-white px-3 py-1 rounded-full font-Afacad text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40'"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Shopee National Data Science Challenge */}
        <div className="rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src="./image 7.png"
            alt="Shopee Data Science"
            className="object-cover rounded-lg mix-blend-luminosity"
          />
          <div className="space-y-2">
            <h2 className="text-2xl font-InterBld">Shopee National Data Science Challenge</h2>
            <p className="text-gray-400 font-InterMed">2020, Indonesia</p>
            <p className="text-gray-300 font-InterReg">
              Developed and implemented data classification on Shopee's business cases including customer segmentation
              through search history
            </p>
            <div className="flex space-x-2">
              {["Exploratory Data Analysis", "scikit-learn", "Pandas"].map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-white px-3 py-1 rounded-full font-Afacad text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40'"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

