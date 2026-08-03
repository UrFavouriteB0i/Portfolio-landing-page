import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Tech Stack Hardcoded Configurations & Inline SVGs ---
const techConfig = {
  "Kafka": { 
    color: "#F4F4F5", bg: "rgba(244,244,245,0.1)", border: "rgba(244,244,245,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
  },
  "AWS": { 
    color: "#FF9900", bg: "rgba(255,153,0,0.1)", border: "rgba(255,153,0,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
  },
  "FastAPI": { 
    color: "#009688", bg: "rgba(0,150,136,0.1)", border: "rgba(0,150,136,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
  },
  "PostgreSQL": { 
    color: "#336791", bg: "rgba(51,103,145,0.1)", border: "rgba(51,103,145,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
  },
  "PyTorch": { 
    color: "#EE4C2C", bg: "rgba(238,76,44,0.1)", border: "rgba(238,76,44,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  },
  "TensorFlow": { 
    color: "#FF6F00", bg: "rgba(255,111,0,0.1)", border: "rgba(255,111,0,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  },
  "C++": { 
    color: "#00599C", bg: "rgba(0,89,156,0.1)", border: "rgba(0,89,156,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
  },
  "ESP32": { 
    color: "#E7352C", bg: "rgba(231,53,44,0.1)", border: "rgba(231,53,44,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
  },
  "LLMs": { 
    color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  },
  "Computer Vision": { 
    color: "#3B82F6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
  },
  "Audio Processing": { 
    color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
  },
  "Telegram API": { 
    color: "#229ED9", bg: "rgba(34,158,217,0.1)", border: "rgba(34,158,217,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
  },
  "ROS": { 
    color: "#94A3B8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
  },
  "LangGraph": {
    color: "#7C3AED", bg: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  },
  "Redis": {
    color: "#DC382D", bg: "rgba(220,56,45,0.1)", border: "rgba(220,56,45,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
  },
  "AWS S3": {
    color: "#E05243", bg: "rgba(224,82,67,0.1)", border: "rgba(224,82,67,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
  },
  "Firebase RTDB": {
    color: "#FFCA28", bg: "rgba(255,202,40,0.1)", border: "rgba(255,202,40,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
  },
  "Firebase Storage": {
    color: "#FFA000", bg: "rgba(255,160,0,0.1)", border: "rgba(255,160,0,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
  },
  "MCP": {
    color: "#14B8A6", bg: "rgba(20,184,166,0.1)", border: "rgba(20,184,166,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  },
  "Function Calling": {
    color: "#6366F1", bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  },
  "Infinite Canvas": {
    color: "#F472B6", bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
  },
  "Agentic LLM": {
    color: "#059669", bg: "rgba(5,150,105,0.1)", border: "rgba(5,150,105,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  },
  "VLM": {
    color: "#0EA5E9", bg: "rgba(14,165,233,0.1)", border: "rgba(14,165,233,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
  },
  "Vision Triangulation": {
    color: "#3B82F6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
  },
  "ElevenLabs STT": {
    color: "#A78BFA", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
  },
  "MediaPipe": {
    color: "#00897B", bg: "rgba(0,137,123,0.1)", border: "rgba(0,137,123,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
  },
  "RetinaFace": {
    color: "#EF4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
  },
  "PySceneDetect": {
    color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
  },
  "ONNX": {
    color: "#005CED", bg: "rgba(0,92,237,0.1)", border: "rgba(0,92,237,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
  },
  "MODBUS": {
    color: "#64748B", bg: "rgba(100,116,139,0.1)", border: "rgba(100,116,139,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
  },
  "GCP": {
    color: "#4285F4", bg: "rgba(66,133,244,0.1)", border: "rgba(66,133,244,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
  },
  "browser-use": {
    color: "#F97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.2)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="2" y1="9" x2="22" y2="9"></line></svg>
  },
};

const TechBadge = ({ tag }) => {
  const config = techConfig[tag] || { 
    color: "#CBD5E1", bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.1)",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 8, background: config.bg, border: `1px solid ${config.border}` }}>
      <span style={{ display: "flex", color: config.color }}>{config.icon}</span>
      <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.02em", color: config.color }}>
        {tag}
      </span>
    </div>
  );
};

// --- Project Data ---
const projects = [
  {
    id: "videfly-ads",
    title: "AI Ads Video Pipeline",
    type: "Platform Feature • Videfly",
    description: "Distributed video-ad generation pipeline processing 1,000+ jobs/day (peak 1,400+) — cut generation time 5–7 min to 1–2 min, a 3–4x throughput gain, after redesigning the Kafka/LangGraph orchestration layer.",
    tags: ["Kafka", "LangGraph", "Redis", "FastAPI", "AWS S3", "Firebase RTDB", "Firebase Storage"],
    spanClass: "span-2",
    modal: {
      problem: "Creating high-converting ads manually takes hours. The platform needed an asynchronous, fault-tolerant pipeline to generate video ads at scale without dropping jobs.",
      solution: "Architected a distributed system using Kafka for message brokering, LangGraph for multi-step generation orchestration, and FastAPI microservices, with assets and job state split across AWS S3, Firebase RTDB, and Firebase Storage. Redis-based synchronization eliminated generation-tracking failures, taking job loss from ~10/day to near-zero on a ~1,000 job/day pipeline.",
      diagramText: "Kafka + LangGraph Event-Driven Architecture Diagram",
    },
  },
  {
    id: "videfly-clipper",
    title: "AI Auto Clipper",
    type: "Platform Feature • Videfly",
    description: "Multimodal highlight-extraction pipeline — ElevenLabs STT, MediaPipe, RetinaFace, and PySceneDetect combine to auto-clip long-form video into high-retention short-form media.",
    tags: ["ElevenLabs STT", "MediaPipe", "RetinaFace", "PySceneDetect"],
    spanClass: "span-1",
    modal: {
      problem: "Users were spending hours manually scrubbing through long-form videos to find engaging moments for TikTok and Reels.",
      solution: "Engineered a multimodal pipeline combining ElevenLabs for speech-to-text transcript alignment, MediaPipe and RetinaFace for face-priority visual framing, and PySceneDetect for scene-boundary segmentation to automatically identify and crop the most engaging segments.",
      diagramText: "Multimodal Processing Pipeline",
    },
  },
  {
    id: "agv-robot",
    title: "AGV Control Systems",
    type: "Robotics • PT. AWG",
    description: "Vision-based triangulation and wheel-odometry fusion for GPS-denied indoor navigation, with MODBUS integration for PLC communication.",
    tags: ["C++", "ROS", "Vision Triangulation", "MODBUS"],
    spanClass: "span-1",
    modal: {
      problem: "Automated Guided Vehicles required robust indoor navigation without relying on GPS, functioning in highly dynamic warehouse environments.",
      solution: "Engineered vision-based triangulation combined with wheel odometry for localized navigation. Integrated MODBUS protocols to link raw machine hardware registers with backend telemetry servers.",
      diagramText: "Vision Triangulation & Control Flow Diagram",
    },
  },
  {
    id: "videfly-ugc",
    title: "AI UGC Pipeline",
    type: "Platform Feature • Videfly",
    description: "LLM + VLM generation pipeline for on-brand UGC video, backed by AWS S3 and PostgreSQL — cut manual evaluation steps from 5 to 2.",
    tags: ["LLMs", "VLM", "AWS S3", "PostgreSQL"],
    spanClass: "span-2",
    modal: {
      problem: "Users needed authentic-looking UGC videos that align with brand guidelines without hallucinating product features.",
      solution: "Built an LLM + VLM pipeline with prompt-governance and object-referencing for multi-angle consistency, storing generated assets in AWS S3 and metadata in PostgreSQL. Cut manual evaluation steps from 5 down to 2.",
      diagramText: "LLM + VLM Generation Pipeline",
    },
  },
  {
    id: "cat-feeder",
    title: "Smart Feline Feeder",
    type: "Embedded Hardware",
    description: "Custom IoT device running an ONNX-quantized model on-device to feed registered pets and deter feral cats via Telegram alerts.",
    tags: ["ESP32", "ONNX", "Telegram API"],
    spanClass: "span-1",
    modal: {
      problem: "Feral cats were stealing food meant for house pets. Cloud inference was too slow and expensive for a simple feeder.",
      solution: "Deployed an ONNX-quantized model directly onto an ESP32 microcontroller for edge inference. Connected to the Telegram API to send real-time snapshot alerts when a feral cat is detected.",
      diagramText: "Edge AI Hardware Schematic",
    },
  },
  {
    id: "cctv-iot",
    title: "Retail Edge CCTV Surveillance",
    type: "Computer Vision",
    description: "Cost-effective, edge-inference surveillance platform for construction material stores — ONNX/PyTorch models quantized for 520KB-SRAM ESP32 inference, no cloud dependency.",
    tags: ["ESP32", "ONNX", "PyTorch", "C++"],
    spanClass: "span-1",
    modal: {
      problem: "MSME retail stores needed automated surveillance, but standard cloud-based CV solutions were too bandwidth-heavy and expensive.",
      solution: "Quantized ResNet models to ONNX and deployed them to run entirely on heavily constrained 520KB SRAM microcontrollers (ESP32). Delivered real-time local inference without cloud dependency.",
      diagramText: "Model Quantization & Edge Deployment",
    },
  },
  {
    id: "videfly-analytics",
    title: "AI Post Analytics Pipeline",
    type: "Platform Feature • Videfly",
    description: "Real-time ingestion of scraped social metrics (browser-use agent) into an LLM context window for plain-text strategic recommendations, backed by PostgreSQL.",
    tags: ["PostgreSQL", "LLMs", "FastAPI", "browser-use"],
    spanClass: "span-1",
    modal: {
      problem: "Brands were overwhelmed by raw engagement data across multiple platforms and struggled to extract actionable marketing insights.",
      solution: "Built a browser-use agent to ingest platform metrics from TikTok, Instagram, and Facebook, feeding structured data into an LLM context window and generating plain-text strategic recommendations for users on the fly.",
      diagramText: "Real-time Data Ingestion Flow",
    },
  },
  {
    id: "smart-sorting",
    title: "Industrial Smart Sorting",
    type: "Machine Learning • Festo",
    description: "Developed CNN models for high-speed industrial visual analysis and automated defect detection.",
    tags: ["TensorFlow", "Computer Vision", "GCP"],
    spanClass: "span-3",
    modal: {
      problem: "Traditional optical sensors on the production line were failing to detect nuanced surface defects, leading to QA bottlenecks.",
      solution: "Developed and trained Convolutional Neural Network (CNN) models for high-speed industrial visual analysis, drastically improving defect detection accuracy and streamlining the automated sorting process.",
      diagramText: "CNN Defect Detection Pipeline",
    },
  },
];

export default function Work() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null); // Force React state for hover to beat CSS

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProject]);

  return (
    <section id="work" style={{ position: "relative", minHeight: "100vh", width: "100%", background: "#0B0F17", overflow: "hidden", padding: "120px 24px 96px", display: "flex", flexDirection: "column", alignItems: "center", boxSizing: "border-box" }}>
      
      <style>{`
        .work-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          width: 100%;
        }
        @media (min-width: 768px) {
          .work-grid { grid-template-columns: repeat(3, 1fr); }
          .span-1 { grid-column: span 1; }
          .span-2 { grid-column: span 2; }
          .span-3 { grid-column: span 3; }
        }
        .work-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .work-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5);
        }
        /* Reset modal defaults */
        .modal-reset * { margin: 0; }
      `}</style>

      {/* Background radial gradient */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50vh", pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 100%)" }} />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B82F6", boxShadow: "0 0 8px rgba(59,130,246,0.5)" }} />
            <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14, fontWeight: 500, color: "#94A3B8" }}>
              Engineering Portfolio
            </span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#F8FAFC", letterSpacing: "-0.02em", margin: 0 }}>
            Pipelines, Systems & Hardware.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="work-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`work-card ${project.spanClass}`}
              style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 32, borderRadius: 24, textAlign: "left" }}
            >
              {/* Top Row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, width: "100%" }}>
                <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", color: "#64748B", textTransform: "uppercase" }}>
                  {project.type}
                </span>
                
                {/* Arrow - Using explicit React State for logic so CSS can't block it */}
                <div style={{ 
                  width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", 
                  background: hoveredId === project.id ? "#3B82F6" : "rgba(255,255,255,0.05)", 
                  border: `1px solid ${hoveredId === project.id ? "#60A5FA" : "rgba(255,255,255,0.1)"}`, 
                  color: hoveredId === project.id ? "#FFF" : "#94A3B8", 
                  transform: hoveredId === project.id ? "rotate(45deg) scale(1.1)" : "rotate(0deg) scale(1)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" 
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>

              {/* Body */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: project.spanClass.includes("span-2") || project.spanClass.includes("span-3") ? 28 : 22, color: "#F8FAFC", margin: "0 0 12px 0", letterSpacing: "-0.01em" }}>
                  {project.title}
                </h3>
                <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 15, fontWeight: 400, color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.tags.map((tag, i) => (
                  <TechBadge key={i} tag={tag} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Architecture Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="modal-reset" style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              style={{ position: "absolute", inset: 0, background: "rgba(11,15,23,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{ position: "relative", width: "100%", maxWidth: 900, maxHeight: "90vh", overflowY: "auto", background: "#0F172A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, display: "flex", flexDirection: "column", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 32px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", color: "#60A5FA", textTransform: "uppercase", marginBottom: 8 }}>
                    {selectedProject.type}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 28, color: "#F8FAFC", margin: 0 }}>
                    {selectedProject.title}
                  </div>
                </div>
                
                {/* Changed from <button> to <div role="button"> to ignore index.css padding/bg overrides */}
                <div 
                  role="button"
                  onClick={() => setSelectedProject(null)}
                  style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", color: "#94A3B8" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#FFF"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#94A3B8"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 32 }}>
                
                {/* Diagram Box */}
                <div style={{ width: "100%", padding: "60px 20px", borderRadius: 16, background: "#0B0F17", border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14, fontWeight: 500, color: "#64748B" }}>
                    {selectedProject.modal.diagramText}
                  </div>
                </div>

                {/* Details Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 20, fontWeight: 600, color: "#F8FAFC" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      The Challenge
                    </div>
                    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.6, color: "#94A3B8" }}>
                      {selectedProject.modal.problem}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 20, fontWeight: 600, color: "#F8FAFC" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="10" width="8" height="8" rx="1" ry="1"></rect>
                      </svg>
                      The Architecture
                    </div>
                    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.6, color: "#94A3B8" }}>
                      {selectedProject.modal.solution}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 16, fontWeight: 600, color: "#E2E8F0", marginBottom: 16 }}>
                    Core Technologies
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {selectedProject.tags.map((tag, i) => (
                      <TechBadge key={i} tag={tag} />
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}