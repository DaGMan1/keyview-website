import { z } from 'zod';

export const brandQuestionnaireSchema = z.object({
  // Company Information
  companyName: z.string().min(1, 'Company name is required'),
  tagline: z.string().optional(),
  industry: z.string().min(1, 'Industry is required'),

  // Target Audience
  targetAudience: z.string().min(1, 'Target audience is required'),
  ageRange: z.string().optional(),

  // Brand Personality
  brandPersonality: z.enum([
    'professional',
    'playful',
    'luxurious',
    'minimal',
    'bold',
    'elegant',
    'modern',
    'traditional',
  ]),

  // Colors & Style
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  preferredStyle: z.enum([
    'minimalist',
    'vibrant',
    'dark',
    'light',
    'gradient',
    'corporate',
  ]),

  // Content
  keyFeatures: z.string().min(1, 'At least one key feature is required'),
  callToAction: z.string().min(1, 'Call to action is required'),

  // Contact
  email: z.string().email('Valid email is required'),
  website: z.string().url().optional(),

  // Uploaded document
  documentUrl: z.string().url('Brand document is required'),
});

export type BrandQuestionnaire = z.infer<typeof brandQuestionnaireSchema>;
