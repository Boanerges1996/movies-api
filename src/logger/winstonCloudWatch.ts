import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as CloudWatchTransport from 'winston-cloudwatch';

export const initialiseLogger = () => {
  return WinstonModule.createLogger({
    format: winston.format.uncolorize(), //Uncolorize logs as weird character encoding appears when logs are colorized in cloudwatch.
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
      new CloudWatchTransport({
        name: 'Cloudwatch Logs',
        logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
        logStreamName: process.env.CLOUDWATCH_STREAM_NAME,
        awsAccessKeyId: process.env.AWS_ACCESS_KEY,
        awsSecretKey: process.env.AWS_KEY_SECRET,
        awsRegion: process.env.CLOUDWATCH_AWS_REGION,
        retentionInDays: 7,
        messageFormatter: function (item) {
          return (
            item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
          );
        },
      }),
    ],
  });
};
