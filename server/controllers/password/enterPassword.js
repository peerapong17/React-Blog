import bcrypt from "bcrypt";
import User from "../../models/user.js";
import Token from "../../models/token.js";

const enterPassword = async (req, res) => {
  const { token } = req.params;
  const { userId } = req.params;
  const { password } = req.body;
  try {
    console.log(token, userId, password);

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "Invalid link or Token has expired" });

    const tokenResetPassword = await Token.findOne({
      userId: user._id,
      token: token,
    });

    console.log(tokenResetPassword)
    
    if (!tokenResetPassword)
      return res
        .status(400)
        .json({ message: "Invalid link or Token has expired" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();
    await tokenResetPassword.delete();

    res.status(200).json({ message: "password reset sucessfully" });
  } catch (error) {
    res.status(400).json({ message: "password change failed" });
  }
};

export default enterPassword;
