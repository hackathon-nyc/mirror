import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

export default (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended:true
  }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.set('view engine', 'ejs');
  app.use(session({
    secret:"someSecret",
    resave: true,
    saveUninitialized: true
  }));
}
