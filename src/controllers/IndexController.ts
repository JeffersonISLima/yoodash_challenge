import { hostname } from 'os';
import { format } from 'date-fns';
import { FastifyReply, FastifyRequest } from 'fastify';

export class IndexController {
  public static async welcome(
    _: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    reply.send({
      welcome: 'Welcome To Investment Goals API (Yoodash Challenge)',
      env: process.env.NODE_ENV || 'development',
      hostname: hostname(),
      pid: process.pid,
      node_version: process.versions.node,
      date_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      description: process.env.PROJECT_DESCRIPTION,
    });
  }
}
