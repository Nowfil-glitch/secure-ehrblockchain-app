
'use server';

import {
  aiDiseaseDetection,
  type AIDiseaseDetectionInput,
  type AIDiseaseDetectionOutput,
} from '@/ai/flows/ai-disease-detection';

import {
  recognizePrescription,
  type RecognizePrescriptionInput,
  type RecognizePrescriptionOutput,
} from '@/ai/flows/recognize-prescription';

export async function runAIDetection(
  input: AIDiseaseDetectionInput
): Promise<{
  success: boolean;
  data: AIDiseaseDetectionOutput | null;
  error: string | null;
}> {
  try {
    const result = await aiDiseaseDetection(input);
    return { success: true, data: result, error: null };
  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { success: false, data: null, error };
  }
}

export async function runPrescriptionRecognition(
  input: RecognizePrescriptionInput
): Promise<{
  success: boolean;
  data: RecognizePrescriptionOutput | null;
  error: string | null;
}> {
  try {
    const result = await recognizePrescription(input);
    return { success: true, data: result, error: null };
  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { success: false, data: null, error };
  }
}
