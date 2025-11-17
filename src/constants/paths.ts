export const path = {
  home: "/",
  homepage: "/home",
  practices: "/practices",
  exercises: "exercises",
  writingsection: "writing/:id",
  practiceSpeaking: "speaking/:id",
  practiceListening: "listening/:id",
  practiceListeningTranscript: "listening-transcript/:id",
  vocabulary: "/vocabulary",
  quiz: "quiz/:id",
  listening: "listening",
  speaking: "speaking",
  library: "library",
  shadowing: "shadowing/:id",
  shadowingpage: "/shadowing",
  dictation: "dictation/:id",
  flashcard: "flashcard/:id",
  reading: "reading/:id",

  lofichill: "/lofichill",

  auth: "/auth",
  login: "/auth/login",
  verifyotp: "/auth/verify",
  register: "/auth/register",
  logout: "/auth/logout",
  authsuccess: "/auth/success",

  listLesson: "/courses/:courseId/lessons",
  courses: "courses"

} as const;
