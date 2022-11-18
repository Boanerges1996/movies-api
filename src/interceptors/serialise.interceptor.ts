import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {} // For specifying the dto to use
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler
    // console.log("Before request ",context);
    return next.handle().pipe(
      map((data) => {
        // Run something before the response is sent out
        // console.log("After request ", data);

        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

export function Serialise(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
