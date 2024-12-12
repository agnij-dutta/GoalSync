import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { X } from 'lucide-react';
import { Pod } from '../../types';

interface PodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPodCreated: (pod: Pod) => void;
}

interface PodFormData {
  name: string;
  category: string;
  maxMembers: number;
}

const PodModal = ({ isOpen, onClose, onPodCreated }: PodModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PodFormData>({
    defaultValues: {
      maxMembers: 5,
    },
  });

  const onSubmit = async (data: PodFormData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/pods', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onPodCreated(response.data);
      reset();
    } catch (error) {
      console.error('Error creating pod:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Create New Pod</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Pod Name</label>
            <input
              {...register('name', { required: 'Pod name is required' })}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="personal">Personal Development</option>
              <option value="health">Health & Fitness</option>
              <option value="career">Career</option>
              <option value="financial">Financial</option>
              <option value="education">Education</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum Members</label>
            <input
              {...register('maxMembers', {
                required: 'Maximum members is required',
                min: { value: 3, message: 'Minimum 3 members required' },
                max: { value: 10, message: 'Maximum 10 members allowed' },
              })}
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.maxMembers && (
              <p className="mt-1 text-sm text-red-600">{errors.maxMembers.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Pod
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PodModal;