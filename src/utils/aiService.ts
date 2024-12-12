import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const generateGoalSuggestions = async (goalDescription: string) => {
  try {
    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: `Suggest improvements for this goal: ${goalDescription}`,
      parameters: {
        max_length: 100,
        temperature: 0.7,
      }
    });
    
    return response.generated_text;
  } catch (error) {
    console.error('AI suggestion error:', error);
    return null;
  }
};

export const analyzeMilestones = async (milestones: string[]) => {
  try {
    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: `Analyze these milestones and suggest improvements: ${milestones.join(', ')}`,
      parameters: {
        max_length: 150,
        temperature: 0.7,
      }
    });
    
    return response.generated_text;
  } catch (error) {
    console.error('Milestone analysis error:', error);
    return null;
  }
};