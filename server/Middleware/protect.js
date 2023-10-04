export const protect = (req, res, next) => {
  if (!req.session.userId) {
    return res.json({
      errors: [
        {
          field: "email",
          message: "Please login first",
        },
      ],
    });
  }
  next();
};