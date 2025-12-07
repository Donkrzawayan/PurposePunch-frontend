export const t = {
  common: {
    name: "Purpose:Punch!",
    loading: "Loading...",
    networkError: "Network error. Please try again.",
    cancel: "Cancel"
  },
  layout: {
    dashboard: "Dashboard",
    community: "Community",
    logout: "Logout"
  },
  decision: {
    description: "Context / Reasoning",
    expectedOutcome: "Expected Outcome",
    expectedReflectionDate: "Target Date",
    visibility: {
      label: "Visibility",
      private: "Private 🔒",
      public: "Public 🌍"
    },
  },
  createDecision: {
    title: "Create new Decision",
    form: {
      titleLabel: "Title",
      titlePlaceholder: "e.g., Hit the gym",
      dateHelp: "When do you want to verify the results?",
      descriptionPlaceholder: "Why are you making this decision?",
      outcomePlaceholder: "What will success look like on the reflection date?",
      submitButton: "Submit Decision!",
      submittingButton: "Submitting..."
    },
    errors: {
      createFailed: "Failed to create decision.",
      dateTooSoon: "Reflection date must be at least 1 hour in the future."
    }
  },
  reflection: {
    pageTitle: "Decision Details",
    status: {
      active: "Active / Pending",
      reflected: "Reflected",
      abandoned: "Abandoned"
    },
    phase1: {
      title: "The Plan (Expectations)"
    },
    phase2: {
      title: "The Reality (Reflection)",
      formTitle: "It's time to face the truth!",
      actualOutcomeLabel: "Actual Outcome",
      actualOutcomePlaceholder: "What actually happened? Be honest.",
      lessonsLabel: "Lessons Learned",
      lessonsPlaceholder: "What did you learn from this? What would you do differently?",
      satisfactionLabel: "Satisfaction",
      privateNotesLabel: "🔒 Private Notes",
      privateNotesPlaceholder: "Notes visible only to you...",
      submitButton: "Confirm Reflection",
      readOnlyTitle: "Reflection Results",
      satisfactionPlaceholder: "Rate your satisfaction...",
      lateReflection: "(Late)",
      missingLessons: "No lessons recorded.",
      reflectedAtLabel: "Reflected on:",
      confirmPublish: "Confirm & Publish 🚀",
      onlyConfirm: "Confirm without publishing"
    },
    errors: {
      updateFailed: "Update failed",
      missingDecision: "Decision not found",
      missingOutcome: "Actual Outcome is required",
      missingSatisfaction: "Please rate your satisfaction."
    },
    satisfaction: {
      0: "Very Dissatisfied 😡",
      1: "Slightly Dissatisfied 🙁",
      2: "Neutral 😐",
      3: "Slightly Satisfied 🙂",
      4: "Very Satisfied 🤩",
      star: "★",
      emptyStar: "☆"
    }
  }
};
