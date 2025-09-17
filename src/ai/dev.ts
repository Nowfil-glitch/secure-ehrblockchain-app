
import { config } from 'dotenv';
// Load .env.local first, then .env
config({ path: '.env.local' });
config();

import '@/ai/flows/ai-disease-detection.ts';
import '@/ai/flows/recognize-prescription.ts';
