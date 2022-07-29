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
export class SignUpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log({ exception });

    const errorArray = exception.getResponse();
    console.log(typeof errorArray);

    if (
      (exception instanceof BadRequestException ||
        exception instanceof UnauthorizedException) &&
      typeof errorArray == 'object'
    ) {
      request.flash('validationError', errorArray['message']);
      response.redirect('/auth/register');
    } else {
      request.flash('reg_error', exception.message);
      response.redirect('/auth/register');
    }
  }
}
