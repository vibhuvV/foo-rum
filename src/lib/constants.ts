export const USER_LS_KEY = "foo-rum-user";

export const DUMMY_DP_URL_1 =
  "https://resizing.flixster.com/lXrHBiZ1zZ44vGOOV0OCalsIWqE=/375x210/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p391744_i_h10_ac.jpg";
export const DUMMY_DP_URL_2 =
  "https://img.freepik.com/premium-vector/classic-tom-jerry-characters-vibrant-tshirt-illustration_1366711-532.jpg?semt=ais_hybrid&w=740&q=80";

// DUMMY USERS
export const ALLOWED_USERS = [
  { email: "demo@example.com", password: "password123", dp: DUMMY_DP_URL_1 },
  { email: "test@user.com", password: "testpass", dp: DUMMY_DP_URL_2 },
];

export const DUMMY_POSTS = [
  {
    id: "58978",
    user: {
      name: "John Doe",
      postedAt: "5 min ago",
      dp: DUMMY_DP_URL_1,
    },
    content: {
      emoji: "😏",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla tenetur sequi deserunt odio porro atque, ab vero aliquam excepturi eveniet rerum eum voluptas pariatur nihil. Accusamus hic laboriosam ad dolor?",
    },
  },
  {
    id: "58974",
    user: {
      name: "Jane Doe",
      postedAt: "5 min ago",
      dp: DUMMY_DP_URL_2,
    },
    content: {
      emoji: "🤔",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla tenetur sequi deserunt odio porro atque, ab vero aliquam excepturi eveniet rerum eum voluptas pariatur nihil. Accusamus hic laboriosam ad dolor?",
    },
  },
];
