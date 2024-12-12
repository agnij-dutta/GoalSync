export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Goal {
  _id: string;
  title: string;
  description: string;
  category: 'personal' | 'health' | 'career' | 'financial' | 'education';
  deadline: Date;
  progress: number;
  milestones: Milestone[];
  userId: string;
  podId?: string;
}

export interface Milestone {
  _id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
}

export interface Pod {
  _id: string;
  name: string;
  category: string;
  members: User[];
  goals: Goal[];
  maxMembers: number;
}