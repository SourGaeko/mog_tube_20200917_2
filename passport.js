import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import {
  githubLoginCallback,
  kakaotalkLoginCallback,
} from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KA_ID,
      clientSecret: "",
      callbackURL: `http://localhost:4000${routes.kakaotalkLoginCallback}`,
    },
    kakaotalkLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
