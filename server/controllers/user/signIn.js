import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../../models/user.js";

const secret = "test";

 const signIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const oldUser = await UserModal.findOne({ email });
  
      if (!oldUser)
        return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  export default signIn