'use server';

/**
 * @fileOverview AI-powered disease detection flow that analyzes medical images and provides a probability score,
 * heatmap visualization instructions, and suggested actions.
 *
 * - aiDiseaseDetection - A function that handles the disease detection process.
 * - AIDiseaseDetectionInput - The input type for the aiDiseaseDetection function.
 * - AIDiseaseDetectionOutput - The return type for the aiDiseaseDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDiseaseDetectionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A medical image (e.g., X-ray, skin image) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AIDiseaseDetectionInput = z.infer<typeof AIDiseaseDetectionInputSchema>;

const AIDiseaseDetectionOutputSchema = z.object({
  probability: z
    .number()
    .describe(
      'The probability score of the disease being present in the image.'
    ),
  heatmapInstructions: z
    .string()
    .describe(
      'Instructions for generating a heatmap visualization highlighting potential areas of concern in the image.'
    ),
  suggestedActions: z
    .string()
    .describe(
      'Suggested actions based on the analysis of the medical image, e.g., further tests, specialist referral.'
    ),
});
export type AIDiseaseDetectionOutput = z.infer<typeof AIDiseaseDetectionOutputSchema>;

export async function aiDiseaseDetection(
  input: AIDiseaseDetectionInput
): Promise<AIDiseaseDetectionOutput> {
  return aiDiseaseDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDiseaseDetectionPrompt',
  input: {schema: AIDiseaseDetectionInputSchema},
  output: {schema: AIDiseaseDetectionOutputSchema},
  prompt: `You are an AI assistant specializing in analyzing medical images for disease detection.

  Analyze the provided medical image and provide the following information:

  - Probability Score: A numerical value (0-1) representing the likelihood of the disease being present in the image.
  - Heatmap Visualization Instructions: Clear, concise instructions on how to generate a heatmap highlighting potential areas of concern in the image.
  - Suggested Actions: Specific recommendations based on the image analysis, such as further tests, specialist referral, or treatment options.

  Here is the medical image for analysis:
  {{media url=photoDataUri}}
  `,
});

const aiDiseaseDetectionFlow = ai.defineFlow(
  {
    name: 'aiDiseaseDetectionFlow',
    inputSchema: AIDiseaseDetectionInputSchema,
    outputSchema: AIDiseaseDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
