import { ExecutorContext } from '@nx/devkit';
import { Ogma } from '@ogma/logger';
import { style } from '@ogma/styler';
import { spawn, execSync } from 'child_process';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  return new Promise((resolve, reject) => {
    const project = options.imageName ?? context.projectName;
    const logger = new Ogma({
      application: `Nx Docker Plguin - ${project}`,
      logLevel: options?.verbose ? 'VERBOSE' : 'LOG',
    });
    try {
      const scope = context.nxJsonConfiguration?.npmScope;
      logger.verbose(`Project scope was determined to be ${scope}`);
      logger.verbose(`Project name was determined to be ${project}`);
      const cachePath = options.cachePath ?? `docker/cache/${project}`;
      logger.verbose(
        `Docker cache path was evaluated to ${cachePath}. This was automatically generated.`
      );
      const gCommit =
        process.env.GITHUB_SHA ??
        process.env.NX_HEAD ??
        execSync('git log -n 1 --format="%h"').toString().replace('\n', '');
      logger.verbose(`Git Commit was determined to be ${gCommit}`);
      const dockerNamespace = options.dockerNamespace ?? `jmcdo29`;
      const tagPrefix = options.tag ?? `${scope}-${project}:latest`;
      const tags = [
        `${dockerNamespace}/${tagPrefix}`,
        `${dockerNamespace}/${tagPrefix.replace('latest', gCommit)}`,
      ];
      logger.verbose(`Using docker tag ${tags}`);
      const target = options.target ?? `${project}-prod`;
      logger.verbose(`Using dockerfile target ${target}`);
      const builder = options.builder ?? 'container';
      logger.verbose(`Using doocker builder ${builder}`);
      const publish = options.publish ?? false;
      const commandString = `docker buildx build ${tags
        .map((t) => `-t ${t}`)
        .join(
          ' '
        )} --cache-from type=local,src=${cachePath} --cache-to type=local,dest=${cachePath} --target=${target} --builder=${builder} --platform linux/arm64/v8,linux/amd64 ${
        publish ? '--push' : ''
      } .`;
      const [docker, ...args] = commandString.split(' ').filter((arg) => !!arg);
      logger.log(style.blue.apply(`Executing "${docker} ${args.join(' ')}"`));
      const dockerCommand = spawn(docker, args);
      dockerCommand.stdout.on('data', (chunk) => {
        logger.log(chunk.toString());
      });
      dockerCommand.stderr.on('data', (chunk) => {
        logger.log(chunk.toString());
      });
      dockerCommand.on('close', (code) => {
        resolve({ success: code === 0 });
      });
      dockerCommand.on('error', (err) => {
        logger.printError(err);
        reject({ success: false });
      });
    } catch (err) {
      logger.printError(err as unknown as Error);
      return reject({ success: false });
    }
  });
}
