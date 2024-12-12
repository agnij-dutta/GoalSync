import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Plus } from 'lucide-react';
import { Pod } from '../../types';
import PodModal from './PodModal';

const PodList = () => {
  const [pods, setPods] = useState<Pod[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPods();
  }, []);

  const fetchPods = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/pods', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPods(response.data);
    } catch (error) {
      console.error('Error fetching pods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePodCreated = (newPod: Pod) => {
    setPods([...pods, newPod]);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading pods...</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Pod
        </button>
      </div>

      <div className="space-y-4">
        {pods.map((pod) => (
          <div
            key={pod._id}
            className="bg-white shadow rounded-lg p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{pod.name}</h3>
                  <p className="text-sm text-gray-500">
                    {pod.members.length} / {pod.maxMembers} members
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {pod.category}
              </span>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Members</h4>
              <div className="mt-2 flex -space-x-2">
                {pod.members.map((member) => (
                  <div
                    key={member._id}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                  >
                    <span className="text-xs font-medium text-gray-600">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPodCreated={handlePodCreated}
      />
    </div>
  );
};

export default PodList;