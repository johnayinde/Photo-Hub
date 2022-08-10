import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class SignInFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();


    const errorArray = exception.getResponse();

    if (
      (exception instanceof BadRequestException ||
        exception instanceof UnauthorizedException) &&
      typeof errorArray == 'object'
    ) {
      request.flash('validationError', errorArray['message']);
      response.redirect('/auth/login');
    } else {
      request.flash('reg_error', exception.message);
      response.redirect('/auth/login');
    }
  }
}
