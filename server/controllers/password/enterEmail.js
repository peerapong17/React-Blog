import crypto from "crypto"
import User from "../../models/user.js"
import Token from "../../models/token.js"
import sendEmail from "../../helpers/emailManager.js"

const enterEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(400)
        .json({ message: "User with given email doesn't exist" });

    let token = await Token.findOne({ userId: user._id });
    
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `http://localhost:3000/reset-password/enter-new-password/${user._id}/${token.token}`;

    console.log(link)

    try {
      await sendEmail(
        req.body.email,
        "Reset Password",
        "click the link below to reset your password",
        link
      );
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        message: "Something went wrong, Could not send reset-password-link to your email",
      });
    }

    res.status(200).json({
      message: "Password reset link is sent to your email account",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export default enterEmail;
