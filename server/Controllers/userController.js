import User from "../Schema/userSchema.js";
import Room from "../Schema/roomSchema.js";
import Chat from "../Schema/chatSchema.js";
import EmailValidator from "email-deep-validator";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res.json({
      errors: [
        {
          field: "username",
          message: "Please fill all the fields",
        },
      ],
    });
  }
  const user = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (user) {
    return res.json({
      errors: [
        {
          field: "username",
          message: "User already taken",
        },
      ],
    });
  }
  const emailValidate = new EmailValidator();
  const { wellFormed, validDomain, validMailbox } = await emailValidate.verify(
    email
  );
  if (!wellFormed || !validDomain || !validMailbox) {
    return res.json({
      errors: [
        {
          field: "email",
          message: "Invalid email",
        },
      ],
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name: name,
    username: username,
    email: email,
    password: hashedPassword,
  });
  await newUser.save();
  req.session.userId = newUser._id;
  return res.json({
    user: newUser,
  });
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user) {
    return res.json({
      errors: [
        {
          field: "email",
          message: "Please login first",
        },
      ],
    });
  }
  return res.json({
    user: user,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(200).json({
      errors: [
        {
          field: "email",
          message: "Please enter email",
        },
      ],
    });
  }
  const user = await User.find({ email: email });
  // console.log(user);
  if (user.length === 0) {
    return res.status(200).json({
      errors: [
        {
          field: "email",
          message: "Invalid email",
        },
      ],
    });
  }
  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    return res.status(200).json({
      errors: [
        {
          field: "password",
          message: "Invalid password",
        },
      ],
    });
  }
  req.session.userId = user[0]._id;
  return res.json({ user: user[0] });
};

export const logout = async (req, res) => {
  req.session.destroy();
  res.clearCookie("qid");
  res.send("Logged out");
};

export const searchUser = async (req, res) => {
  const { emailOrUsername } = req.body;
  if (!emailOrUsername) {
    return res.json({
      errors: [
        {
          field: "emailOrUsername",
          message: "Please enter email or username",
        },
      ],
    });
  }

  const user = await User.find({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });
  if (user.length === 0) {
    return res.json({
      errors: [
        {
          field: "emailOrUsername",
          message: "No user found",
        },
      ],
    });
  }
  return res.json({
    user: user[0],
  });
};

export const findUserById = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  return res.json({
    user: user,
  });
};
