import { ExecutorContext } from '@nrwl/devkit';
import { Ogma } from '@ogma/logger';
import { style } from '@ogma/styler';
import { spawn } from 'child_process';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  const logger = new Ogma({
    application: 'Nx Docker Plguin',
    logLevel: options?.verbose ? 'VERBOSE' : 'LOG',
  });
  const scope = context.nxJsonConfiguration?.npmScope;
  logger.verbose(`Project scope was determined to be ${scope}`);
  const project = options.imageName ?? context.projectName;
  logger.verbose(`Project name was determined to be ${project}`);
  const cachePath = options.cachePath ?? `docker/cache/${project}`;
  logger.verbose(
    `Docker cache path was evaluated to ${cachePath}. This was automatically generated.`
  );
  const dockerNamespace = options.dockerNamespace ?? `jmcdo29`;
  const tag =
    `${dockerNamespace}/` + (options.tag ?? `${scope}-${project}:latest`);
  logger.verbose(`Using docker tag ${tag}`);
  const target = options.target ?? `${project}-prod`;
  logger.verbose(`Using dockerfile target ${target}`);
  const builder = options.builder ?? 'container';
  logger.verbose(`Using doocker builder ${builder}`);
  const publish = options.publish ?? false;
  const commandString = `docker buildx build -t ${tag} --cache-from type=local,src=${cachePath} --cache-to type=local,dest=${cachePath} --target=${target} --builder=${builder} --platform linux/arm64/v8,linux/amd64 ${
    publish ? '--push' : ''
  } .`;
  const [docker, ...args] = commandString.split(' ').filter((arg) => !!arg);
  logger.log(style.blue.apply(`Executing "${docker} ${args.join(' ')}"`));
  const dockerCommand = spawn(docker, args, { stdio: 'inherit' });
  return new Promise((resolve) => {
    dockerCommand.on('close', (code) => {
      resolve({ success: code === 0 });
    });
  });
}
