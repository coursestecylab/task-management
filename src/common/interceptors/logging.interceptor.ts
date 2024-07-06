import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const controller = context.getClass().name;
    const handler = context.getHandler().name;
    const now = Date.now();

    console.log(`Before... ${method} ${url} - ${controller}.${handler}`);

    return next.handle().pipe(
      tap(() => {
        const delay = Date.now() - now;
        console.log(
          `After... ${method} ${url} - ${controller}.${handler} took ${delay}ms`,
        );
      }),
    );
  }
}
