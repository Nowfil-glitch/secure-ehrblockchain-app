
'use server';

/**
 * @fileOverview AI-powered prescription recognition flow that uses OCR to extract medication details from an image.
 *
 * - recognizePrescription - A function that handles the prescription recognition process.
 * - RecognizePrescriptionInput - The input type for the recognizePrescription function.
 * - RecognizePrescriptionOutput - The return type for the recognizePrescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecognizePrescriptionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "An image of a prescription as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type RecognizePrescriptionInput = z.infer<typeof RecognizePrescriptionInputSchema>;

const PrescriptionSchema = z.object({
    medication: z.string().describe('The name of the medication.'),
    dosage: z.string().describe('The dosage of the medication, e.g., "500mg".'),
    frequency: z.string().describe('How often to take the medication, e.g., "Twice a day".'),
});

const RecognizePrescriptionOutputSchema = z.object({
  prescriptions: z.array(PrescriptionSchema).describe('An array of prescriptions found in the image.'),
});
export type RecognizePrescriptionOutput = z.infer<typeof RecognizePrescriptionOutputSchema>;


export async function recognizePrescription(
  input: RecognizePrescriptionInput
): Promise<RecognizePrescriptionOutput> {
  return recognizePrescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recognizePrescriptionPrompt',
  input: { schema: RecognizePrescriptionInputSchema },
  output: { schema: RecognizePrescriptionOutputSchema },
  prompt: `You are an expert at reading prescriptions. Analyze the following image of a prescription and extract the details for each medication listed.

  Identify the medication name, dosage, and frequency. Return the data as a structured list.

  Prescription Image:
  {{media url=photoDataUri}}
  `,
});

const recognizePrescriptionFlow = ai.defineFlow(
  {
    name: 'recognizePrescriptionFlow',
    inputSchema: RecognizePrescriptionInputSchema,
    outputSchema: RecognizePrescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
