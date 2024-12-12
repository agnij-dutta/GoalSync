import { useState } from 'react';
import axios from 'axios';

interface FeedbackData {
  podId: string;
  memberId: string;
  rating: number;
  comment: string;
  isAnonymous: boolean;
}

export const useFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitFeedback = async (data: FeedbackData) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      await axios.post('/api/feedback', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      setError('Failed to submit feedback');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitFeedback, loading, error };
};