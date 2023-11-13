import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //check if user exists or not
    let user = await User.findOne({ email });
    if (user) {
      //  return res.status(400).json({ message: "User has already registered" });
      throw new Error("User has already registered");
    }

    //create new user if not in db
    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    //return res.status(500).json({ message: "Something went wrong" });
    next(error);
  }
};
