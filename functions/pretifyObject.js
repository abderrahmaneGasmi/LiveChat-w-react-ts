exports.pretifyChatMessage = (object) => {
  const { username, message } = object;

  return {
    message,
    username: {
      username: username.username,
      image: username.image,
    },
  };
};
