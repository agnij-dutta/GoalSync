import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { generateGoalSuggestions, analyzeMilestones } from '../../utils/aiService';
import { validateSmartGoal } from '../../../server/utils/smartGoalValidator';
import { Target, Plus, Trash2 } from 'lucide-react';

interface SmartGoalFormProps {
  category: string;
  onSubmit: (data: any) => void;
}

const SmartGoalForm: React.FC<SmartGoalFormProps> = ({ category, onSubmit }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [milestones, setMilestones] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);
  const [validationScore, setValidationScore] = useState<number>(0);

  const watchDescription = watch('description');

  const handleAiSuggestions = async () => {
    const suggestions = await generateGoalSuggestions(watchDescription);
    setAiSuggestions(suggestions);
  };

  const handleMilestoneAnalysis = async () => {
    const analysis = await analyzeMilestones(milestones);
    // Handle the analysis results
  };

  const addMilestone = () => {
    setMilestones([...milestones, '']);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index] = value;
    setMilestones(newMilestones);
  };

  const onFormSubmit = (data: any) => {
    const validation = validateSmartGoal({ ...data, milestones });
    setValidationScore(validation.score);
    
    if (validation.isValid) {
      onSubmit({ ...data, milestones });
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 p-6 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Goal Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
        />
        <button
          type="button"
          onClick={handleAiSuggestions}
          className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
        >
          Get AI Suggestions
        </button>
        {aiSuggestions && (
          <div className="mt-2 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">{aiSuggestions}</p>
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Milestones</label>
          <button
            type="button"
            onClick={addMilestone}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Milestone
          </button>
        </div>
        <div className="space-y-2">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                value={milestone}
                onChange={(e) => updateMilestone(index, e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter milestone"
              />
              <button
                type="button"
                onClick={() => removeMilestone(index)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Deadline</label>
        <input
          type="date"
          {...register('deadline', { required: 'Deadline is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Goal
        </motion.button>
      </div>

      {validationScore > 0 && (
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Goal Quality
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {validationScore}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${validationScore}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default SmartGoalForm;