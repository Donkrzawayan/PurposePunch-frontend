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
  register: {
    title: "Join PurposePunch",
    passwordPlaceholder: "Create a strong password",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Repeat your password",
    submitButton: "Create Account",
    loginLink: "Already have an account? Log In",
    errors: {
      failed: "Registration failed",
      passwordMismatch: "Passwords do not match"
    }
  },
  login: {
    loginButton: "Log in",
    loginTo: "Log in to ",
    email: "Email",
    emailPlaceholder: "name@example.com",
    password: "Password",
    passwordPlaceholder: "******************",
    error: "Login failed",
    registerLink: "Don't have an account? Register",
    loggingIn: "Logging in..."
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
    status: {
      active: "Pending",
      reflected: "Reflected",
      abandoned: "Abandoned"
    },
  },
  dashboard: {
    title: "Your Decisions",
    reflected: "Reflected: ",
    expected: "Expected: ",
    addDecision: "+ New Decision",
    noneDecision: "You haven't added any decisions yet.",
    addFirst: "Make your first decision!",
    detailsLink: "Details →",
    error: 'Failed to load decisions.'
  },
  createDecision: {
    title: "Create new Decision",
    form: {
      titleLabel: "Title",
      titlePlaceholder: "e.g., Hit the gym",
      dateHelp: "When do you want to verify the results?",
      descriptionPlaceholder: "Why are you making this decision?",
      outcomePlaceholder: "What will success look like on the reflection date?",
      submitButton: "Submit Decision!"
    },
    errors: {
      createFailed: "Failed to create decision.",
      dateTooSoon: "Reflection date must be at least 1 hour in the future."
    }
  },
  reflection: {
    pageTitle: "Decision Details",
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
      emojis: ["😡", "🙁", "😐", "🙂", "🤩"],
      star: "★",
      emptyStar: "☆"
    }
  },
  community: {
    title: "Community Feed",
    subtitle: "Learn from others' victories and failures.",
    empty: "No posts yet. Be the first to publish!",
    loadMore: "Load More",
    description: "Context",
    reflection: "The Reality & Lessons",
    upvote: "👊",
    showLess: "↑ Show less ↑",
    showFull: "↓ Show full ↓"
  }
};
