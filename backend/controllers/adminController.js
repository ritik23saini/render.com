
import Admin from "../model/adminmodel.js";
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await Admin.findOne({username})
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    console.log(existingUser)

    if (password != existingUser.password) {
      return res.status(400).json({ message: "wrong pass" });
    }

    res.status(200).json({
      id: existingUser._id,
      username: existingUser.username,
      isAdmin: existingUser.isAdmin
    });
  } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
