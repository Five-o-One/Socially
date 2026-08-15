const mockUser = {
  name: "John Doe",
  bio: "I am a software engineer from Tehran.",
  location: "Tehran, Iran",
  website: "https://my-portfolio.com",
};

const mockUsers = [
  {
    avatarSrc: "",
    username: "@mohammadfallah.w",
    followers: 1,
  },
  {
    avatarSrc: "",
    username: "@mohammadfallah.w",
    followers: 1,
  },
  {
    avatarSrc: "",
    name: "Farshad Hosseini",
    username: "@f.e.h.farshad",
    followers: 1,
  },
];

const mockNotifications = [
  {
    type: "comment" as const,
    isRead: false,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "3 minutes ago",
    postText: "test post",
    commentText: "tests",
  },
  {
    type: "like" as const,
    isRead: false,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "3 minutes ago",
    postText: "test post",
  },
  {
    type: "follow" as const,
    isRead: false,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "10 minutes ago",
  },
  {
    type: "comment" as const,
    isRead: true,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "3 minutes ago",
    postText: "test post",
    commentText: "tests",
  },
  {
    type: "like" as const,
    isRead: true,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "3 minutes ago",
    postText: "test post",
  },
  {
    type: "follow" as const,
    isRead: true,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "1 hour ago",
  },
];
export { mockUsers, mockUser, mockNotifications };
