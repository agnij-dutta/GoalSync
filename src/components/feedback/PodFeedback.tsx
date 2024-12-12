import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFeedback } from '../../hooks/useFeedback';

interface FeedbackProps {
  podId: string;
  memberId: string;
}

const PodFeedback: React.FC<FeedbackProps> = ({ podId, memberId }) => {
  const { submitFeedback, loading } = useFeedback();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await submitFeedback({
      podId,
      memberId,
      rating: Number(formData.get('rating')),
      comment: formData.get('comment') as string,
      isAnonymous: formData.get('anonymous') === 'true'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Provide Feedback</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <motion.label
                key={value}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  className="sr-only"
                />
                <Star className="w-6 h-6 text-yellow-400" />
              </motion.label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comments
          </label>
          <textarea
            name="comment"
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Share your thoughts..."
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="anonymous"
            id="anonymous"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="anonymous" className="ml-2 text-sm text-gray-600">
            Submit anonymously
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default PodFeedback;