// use server'

/**
 * @fileOverview AI tool to automatically generate optimized product tags and categories from product descriptions.
 *
 * - generateProductTags - A function that handles the product tag generation process.
 * - GenerateProductTagsInput - The input type for the generateProductTags function.
 * - GenerateProductTagsOutput - The return type for the generateProductTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductTagsInputSchema = z.object({
  description: z.string().describe('The product description to generate tags from.'),
});
export type GenerateProductTagsInput = z.infer<typeof GenerateProductTagsInputSchema>;

const GenerateProductTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('The generated tags for the product.'),
  categories: z.array(z.string()).describe('The generated categories for the product.'),
});
export type GenerateProductTagsOutput = z.infer<typeof GenerateProductTagsOutputSchema>;

export async function generateProductTags(input: GenerateProductTagsInput): Promise<GenerateProductTagsOutput> {
  return generateProductTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductTagsPrompt',
  input: {schema: GenerateProductTagsInputSchema},
  output: {schema: GenerateProductTagsOutputSchema},
  prompt: `You are an expert in product categorization and tagging for e-commerce.

  Given the following product description, generate a list of relevant tags and categories to improve product discoverability.

  Description: {{{description}}}

  Format the output as a JSON object with "tags" and "categories" fields, each containing an array of strings.
  Ensure that the tags and categories are optimized for search engines and reflect the key attributes of the product.
`,
});

const generateProductTagsFlow = ai.defineFlow(
  {
    name: 'generateProductTagsFlow',
    inputSchema: GenerateProductTagsInputSchema,
    outputSchema: GenerateProductTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
