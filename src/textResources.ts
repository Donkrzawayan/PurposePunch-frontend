export const t = {
  common: {
    loading: "Loading...",
    networkError: "Network error. Please try again.",
    cancel: "Cancel"
  },
  createDecision: {
    title: "Create new Decision",
    form: {
      titleLabel: "Title",
      titlePlaceholder: "e.g., Hit the gym",
      dateLabel: "Reflection Date",
      dateHelp: "When do you want to verify the results?",
      visibilityLabel: "Visibility",
      descriptionLabel: "Context / Reasoning",
      descriptionPlaceholder: "Why are you making this decision?",
      outcomeLabel: "Expected Outcome",
      outcomePlaceholder: "What will success look like on the reflection date?",
      submitButton: "Submit Decision!",
      submittingButton: "Submitting...",
      visibilityOptions: {
        private: "Private (Only me)",
        public: "Public (Community)"
      }
    },
    errors: {
      createFailed: "Failed to create decision.",
      dateTooSoon: "Reflection date must be at least 1 hour in the future."
    }
  }
};
