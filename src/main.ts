import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as flash from 'connect-flash';
import { Request, Response, NextFunction } from 'express';
import { Req } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.setViewEngine('hbs');
  app.useStaticAssets(join(__dirname, '../public'));
  app.setBaseViewsDir(join(__dirname, '../views'));
  hbs.registerPartials(join(__dirname, '../views/partials'), () => {});

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use(function (req, res, nest) {
    res.locals.currentUser = req.user;
    res.locals.reg_error = req.flash('reg_error');
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.validationError = req.flash('validationError');
    nest();
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
