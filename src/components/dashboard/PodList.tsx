import React, { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { Pod, User } from '../../types';
import PodModal from './PodModal';

interface PodListProps {
  pods: Pod[];
  onPodCreated: (pod: Pod) => void;
  user: User;
}

const PodList: React.FC<PodListProps> = ({ pods, onPodCreated, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePodCreated = (newPod: Pod) => {
    onPodCreated(newPod);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Create New Pod
        </button>
      </div>

      <div className="space-y-4">
        {pods.map((pod) => (
          <div key={pod._id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{pod.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{pod.members.length} / {pod.maxMembers} members</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{pod.category}</span>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Members</h4>
              <div className="mt-2 flex -space-x-2">
                {pod.members.map((member) => (
                  <div key={member._id} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:bg-gray-700 dark:border-gray-800">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{member.name.charAt(0)}</span>
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
        user={user}
      />
    </div>
  );
};

export default PodList;

