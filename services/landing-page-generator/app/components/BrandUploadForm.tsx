'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { brandQuestionnaireSchema, type BrandQuestionnaire } from '@/lib/schema';

export default function BrandUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BrandQuestionnaire>({
    resolver: zodResolver(brandQuestionnaireSchema),
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedFile(data.url);
        setValue('documentUrl', data.url);
      } else {
        alert(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: BrandQuestionnaire) => {
    console.log('Form data:', data);
    // TODO: Send to AI API for processing
    alert('Form submitted! Next: AI will generate your landing page.');
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create Your Landing Page</h1>
        <p className="text-gray-600">
          Upload your brand documents and answer a few questions to generate a stunning 3D landing page
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 mx-1 rounded ${
                step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Upload</span>
          <span>Company Info</span>
          <span>Brand Details</span>
          <span>Review</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1: Document Upload */}
        {currentStep === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Step 1: Upload Brand Document</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf,.docx,image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {isUploading ? 'Uploading...' : 'Choose File'}
              </label>
              <p className="mt-4 text-sm text-gray-600">
                PDF, DOCX, JPG, PNG, WEBP (Max 10MB)
              </p>
              {uploadedFile && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800 text-sm">✓ File uploaded successfully!</p>
                </div>
              )}
              {errors.documentUrl && (
                <p className="mt-2 text-red-600 text-sm">{errors.documentUrl.message}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              disabled={!uploadedFile}
              className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              Continue to Company Info
            </button>
          </div>
        )}

        {/* Step 2: Company Information */}
        {currentStep === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Step 2: Company Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name *</label>
                <input
                  {...register('companyName')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Acme Corporation"
                />
                {errors.companyName && (
                  <p className="mt-1 text-red-600 text-sm">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tagline</label>
                <input
                  {...register('tagline')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Innovation that moves you forward"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Industry *</label>
                <input
                  {...register('industry')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Technology, Healthcare, Finance, etc."
                />
                {errors.industry && (
                  <p className="mt-1 text-red-600 text-sm">{errors.industry.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="hello@company.com"
                />
                {errors.email && (
                  <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <input
                  {...register('website')}
                  type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="https://company.com"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Brand Details */}
        {currentStep === 3 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Step 3: Brand Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Target Audience *</label>
                <textarea
                  {...register('targetAudience')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Small business owners, Tech enthusiasts, etc."
                  rows={3}
                />
                {errors.targetAudience && (
                  <p className="mt-1 text-red-600 text-sm">{errors.targetAudience.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Brand Personality *</label>
                <select
                  {...register('brandPersonality')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select a personality</option>
                  <option value="professional">Professional</option>
                  <option value="playful">Playful</option>
                  <option value="luxurious">Luxurious</option>
                  <option value="minimal">Minimal</option>
                  <option value="bold">Bold</option>
                  <option value="elegant">Elegant</option>
                  <option value="modern">Modern</option>
                  <option value="traditional">Traditional</option>
                </select>
                {errors.brandPersonality && (
                  <p className="mt-1 text-red-600 text-sm">{errors.brandPersonality.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Preferred Style *</label>
                <select
                  {...register('preferredStyle')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select a style</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="vibrant">Vibrant</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="gradient">Gradient</option>
                  <option value="corporate">Corporate</option>
                </select>
                {errors.preferredStyle && (
                  <p className="mt-1 text-red-600 text-sm">{errors.preferredStyle.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Color</label>
                  <input
                    {...register('primaryColor')}
                    type="color"
                    className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Secondary Color</label>
                  <input
                    {...register('secondaryColor')}
                    type="color"
                    className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Key Features/Services *</label>
                <textarea
                  {...register('keyFeatures')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="List your main features or services (one per line)"
                  rows={4}
                />
                {errors.keyFeatures && (
                  <p className="mt-1 text-red-600 text-sm">{errors.keyFeatures.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Call to Action *</label>
                <input
                  {...register('callToAction')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Get Started, Contact Us, Learn More, etc."
                />
                {errors.callToAction && (
                  <p className="mt-1 text-red-600 text-sm">{errors.callToAction.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Review & Submit
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Step 4: Review & Submit</h2>
            <p className="text-gray-600 mb-6">
              Review your information and submit to generate your 3D landing page
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600">
                Once submitted, our AI will analyze your brand document and create a custom 3D cinematic landing page based on your preferences. This usually takes 2-3 minutes.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Back to Edit
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Generate Landing Page
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
