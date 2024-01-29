import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class AppLogger extends Logger {
  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, this.context);
  }

  log(message: any, context?: string) {
    super.log(message, this.context);
  }

  warn(message: any, context?: string) {
    super.warn(message, this.context);
  }

  debug(message: any, context?: string) {
    super.debug(message, this.context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, this.context);
  }
}
