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
        expiresIn: "72h",
      });

      user.token = token;
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      sendMail(req.body.email);
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
          expiresIn: "72h",
        });

        user.token = token;
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
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

const verifiyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const userOTPVerification = await User.findOne({
        where: {
          email,
          otp,
        },
      });
      if (userOTPVerification) {
        const data = {
          isVerified: true,
        };
        const userOTPVerification = await User.update(data, {
          where: {
            email,
            otp,
          },
        });
        if (userOTPVerification) {
          return res.status(200).send({
            message: "OTP verified successfully",
          });
        } else {
          return res.status(409).send("Something went wrong");
        }
      } else {
        return res.status(409).send("Something went wrong");
      }
    } else {
      return res.status(409).send("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

const sendMail = (email) => {
  console.log("Mail sent to " + email);

  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });
  const mailOptions = {
    from: "",
    to: email,
    subject: "OTP",
    text: "OTP is " + otp,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  signUp,
  login,
  verifiyOTP,
};
