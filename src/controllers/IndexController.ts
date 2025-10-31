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
      build: process.env.BUILD || 'development',
      env: process.env.NODE_ENV || 'development',
      profile: process.env.PROFILE,
      hostname: hostname(),
      pid: process.pid,
      node_version: process.versions.node,
      date_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }
}
