const bcrypt = require("bcrypt");
const db = require("../../models");
const jwt = require("jsonwebtoken");

const User = db.users;

//signup users
const signUp = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    const data = {
      fullName,
      email,
      phone,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(data);
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      user.token = token;
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return res.status(200).send({
        message: "User created successfully, please check your email for OTP",
      });
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

//login users

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        user.token = token;
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        return res.status(200).json({ user, token });
      } else {
        return res.status(409).send("Authentication failed");
      }
    } else {
      return res.status(409).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

module.exports = {
  signUp,
  login,
};
