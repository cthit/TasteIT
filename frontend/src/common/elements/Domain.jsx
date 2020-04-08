export const getDomain = () => {
  if (process.env.NODE_ENV == "development") {
    return "http://localhost";
  } else {
    return "https://tasteit";
  }
};

export default getDomain;
