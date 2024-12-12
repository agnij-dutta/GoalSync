export const validateSmartGoal = (goal) => {
  const validation = {
    isValid: true,
    score: 0,
    feedback: [],
    suggestions: []
  };

  // Specific
  if (!goal.description || goal.description.length < 20) {
    validation.feedback.push('Goal description needs to be more specific');
    validation.score -= 20;
  }

  // Measurable
  if (!goal.milestones || goal.milestones.length === 0) {
    validation.feedback.push('Add measurable milestones to track progress');
    validation.score -= 20;
  }

  // Achievable
  if (goal.milestones && goal.milestones.length > 10) {
    validation.feedback.push('Consider breaking this into multiple smaller goals');
    validation.score -= 10;
  }

  // Relevant
  if (!goal.category) {
    validation.feedback.push('Select a relevant category for your goal');
    validation.score -= 20;
  }

  // Time-bound
  if (!goal.deadline) {
    validation.feedback.push('Add a deadline to make your goal time-bound');
    validation.score -= 20;
  }

  validation.score = Math.max(0, 100 + validation.score);
  validation.isValid = validation.score >= 60;

  return validation;
};