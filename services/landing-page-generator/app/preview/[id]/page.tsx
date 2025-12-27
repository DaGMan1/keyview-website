'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamic import to avoid SSR issues with Three.js
const Scene3D = dynamic(() => import('@/app/components/3d/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-900 rounded-xl flex items-center justify-center">
      <div className="text-white">Loading 3D Scene...</div>
    </div>
  ),
});

export default function PreviewPage({ params }: { params: { id: string } }) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, fetch analysis from database using params.id
    // For now, use localStorage or session storage
    const savedAnalysis = localStorage.getItem('latest-analysis');
    if (savedAnalysis) {
      setAnalysis(JSON.parse(savedAnalysis));
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-2xl">Loading your landing page...</div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-2xl">No analysis data found</div>
      </div>
    );
  }

  const colors = analysis.colorPalette || {};
  const content = analysis.landingPageContent || {};
  const brand = analysis.brandAnalysis || {};

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom, ${colors.background || '#0F1115'}, ${colors.background || '#0F1115'}dd)`,
        color: colors.text || '#FFFFFF',
      }}
    >
      {/* Hero Section with 3D */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Scene3D analysis={analysis} autoRotate />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-7xl font-black mb-6 leading-tight"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {content.heroHeadline || brand.companyName || 'Your Brand'}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl mb-12 text-gray-300 max-w-3xl mx-auto"
          >
            {content.heroSubheadline || brand.tagline || 'Powered by AI'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-6 justify-center"
          >
            <button
              className="px-10 py-4 text-lg font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              style={{
                background: colors.primary,
                color: colors.background,
              }}
            >
              {content.callToAction?.primary || 'Get Started'}
            </button>
            <button
              className="px-10 py-4 text-lg font-bold rounded-lg transition-all transform hover:scale-105 border-2"
              style={{
                borderColor: colors.primary,
                color: colors.primary,
              }}
            >
              {content.callToAction?.secondary || 'Learn More'}
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2" style={{ borderColor: colors.primary }}>
            <div className="w-1 h-2 rounded-full" style={{ background: colors.primary }} />
          </div>
        </motion.div>
      </section>

      {/* Value Propositions */}
      {content.valuePropositions && content.valuePropositions.length > 0 && (
        <section className="py-24 px-8 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6" style={{ color: colors.primary }}>
                Why Choose Us
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {content.valuePropositions.map((vp: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-xl backdrop-blur-sm"
                  style={{
                    background: `${colors.secondary}22`,
                    border: `1px solid ${colors.secondary}44`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-3xl font-bold"
                    style={{ background: colors.primary, color: colors.background }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-lg text-gray-300">{vp}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {content.features && content.features.length > 0 && (
        <section className="py-24 px-8 relative" style={{ background: `${colors.background}dd` }}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6" style={{ color: colors.primary }}>
                Features
              </h2>
            </motion.div>

            <div className="space-y-12">
              {content.features.map((feature: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                      {feature.title}
                    </h3>
                    <p className="text-xl text-gray-300">{feature.description}</p>
                  </div>
                  <div
                    className="w-64 h-64 rounded-xl flex items-center justify-center text-6xl font-black"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}44 0%, ${colors.secondary}44 100%)`,
                      border: `2px solid ${colors.primary}`,
                    }}
                  >
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {content.aboutSection && (
        <section className="py-24 px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-8" style={{ color: colors.primary }}>
                About {brand.companyName || 'Us'}
              </h2>
              <p className="text-2xl text-gray-300 leading-relaxed">{content.aboutSection}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        className="py-32 px-8 relative"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}22 0%, ${colors.secondary}22 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-bold mb-8" style={{ color: colors.primary }}>
              Ready to Get Started?
            </h2>
            <p className="text-2xl mb-12 text-gray-300">
              {brand.tagline || 'Transform your vision into reality'}
            </p>
            <button
              className="px-16 py-6 text-2xl font-bold rounded-lg transition-all transform hover:scale-105 shadow-2xl"
              style={{
                background: colors.primary,
                color: colors.background,
              }}
            >
              {content.callToAction?.primary || 'Get Started Now'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 text-center border-t" style={{ borderColor: `${colors.primary}33` }}>
        <p className="text-gray-500">
          © {new Date().getFullYear()} {brand.companyName || 'Your Company'}. All rights reserved.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Generated with AI • Powered by Gemini & KeyView Platform
        </p>
      </footer>
    </div>
  );
}
