import React from 'react';

const experiences = [
  {
    company: 'Videfly',
    role: 'AI Software Engineer',
    period: 'Jan 2025 – Present',
    location: 'Jakarta, Indonesia',
    current: true,
    description:
      'Architected a distributed Kafka-based AI generation platform serving 2,500+ active users, orchestrating Gemini, Byteplus Seed, and Seedance models across multimodal content workflows. Built customer-facing AI assistant features integrating RAG, MCP, and LLM function-calling — validated by 600+ test users. Reduced generation latency by 30% and costs by 28% through workflow redesign, token audits, and prompt optimization. Engineered multimodal evaluation pipelines and prompt-governance frameworks for Flux, WAN Image, LTX, and Veo models. Deployed Meta SAM 2 on AWS GPU infrastructure and supported enterprise sales efforts that helped secure 5 enterprise clients.',
    skills: ['LLM Orchestration', 'RAG', 'MCP', 'Kafka', 'Redis', 'AWS', 'Multimodal AI', 'Python', 'JavaScript'],
  },
  {
    company: 'Private Clients',
    role: 'AI Solution Engineer (Contract)',
    period: 'Jun 2024 – Jan 2025',
    location: 'Jakarta, Indonesia',
    current: false,
    description:
      'Designed and deployed edge-AI computer vision systems on ESP32 hardware, quantizing custom ResNet models under strict memory and latency constraints. Built proprietary CV datasets with annotation, augmentation, and noise reduction pipelines. Delivered end-to-end intelligent monitoring solutions for MSME retail clients — combining motion detection, hardware sensor integration, Telegram-based alerting, and web-based historical activity tracking.',
    skills: ['Edge AI', 'Computer Vision', 'ESP32', 'ResNet', 'Model Quantization', 'Python', 'Dataset Engineering'],
  },
  {
    company: 'Festo Indonesia',
    role: 'Machine Learning Engineer (Intern)',
    period: 'Feb 2023 – Aug 2023',
    location: 'Remote',
    current: false,
    description:
      'Developed and evaluated CNN-based computer vision models for industrial visual analysis and automated object classification. Built prototypes identifying geometric features, color variations, and dimensional characteristics for automated sorting workflows. Analyzed model performance and produced feasibility assessments to support factory automation deployment decisions.',
    skills: ['CNN', 'Computer Vision', 'PyTorch', 'TensorFlow', 'Industrial AI', 'Python'],
  },
  {
    company: 'PT. Adhikara Wiyasa Gani',
    role: 'Robotics Engineer (Intern)',
    period: 'Jun 2022 – Aug 2023',
    location: 'Surabaya, Indonesia',
    current: false,
    description:
      'Programmed control systems for Automated Guided Vehicles (AGVs) using C++ and C# for deterministic path-following and localized navigation. Integrated MODBUS protocol for hardware-to-server telemetry. Implemented sensor-fusion logic combining ultrasonic, proximity, and environmental sensors for real-time obstacle avoidance. Contributed to early-stage PyTorch and TensorFlow vision pipelines for sorting and localization in simulated warehouse environments.',
    skills: ['C++', 'C#', 'MODBUS', 'AGV', 'Sensor Fusion', 'PyTorch', 'TensorFlow'],
  },
];

export const Exp = () => {
  return (
    <div className="pb-10">
      <div className="flex flex-col items-center pt-10 px-10 md:px-0">
        <h4 className="text-[28px] font-bold text-white md:text-[40px] lg:text-[52px]">EXPERIENCE</h4>
        <h5 className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-orange-300 to-white md:text-lg">
          DISCOVER NOW
        </h5>

        <div className="flex flex-col w-full max-w-3xl pt-8 space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="w-full">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-1 md:space-y-0 md:space-x-8">
                <div className="flex items-center gap-3">
                  <p className="font-InterBld text-white text-[16px] md:text-[20px] text-center md:text-left">
                    {exp.company} / <span className="font-InterReg">{exp.role}</span>
                  </p>
                  {exp.current && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-400/20 text-orange-300 border border-orange-300/30 font-InterReg">
                      Current
                    </span>
                  )}
                </div>
                <p className="font-InterBld text-white text-[14px] md:text-[16px] text-center md:text-right whitespace-nowrap">
                  {exp.period}, {exp.location}
                </p>
              </div>

              <div className="mt-4 font-InterReg text-white text-justify text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed">
                {exp.description}
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {exp.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="font-InterReg text-white text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40 p-2"
                  >
                    {skill}
                  </div>
                ))}
              </div>

              {index < experiences.length - 1 && (
                <div className="mt-6 border-t border-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};