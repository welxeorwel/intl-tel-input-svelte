import { BabelFileResult, transformFileAsync } from '@babel/core';
import { mkdir,readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_PATH = './node_modules/intl-tel-input/build/js';
const OUTPUT_PATH = './src/intl-tel-input-transformed';

const inputs: string[] = [];
const babelConfig = {
  plugins: ['transform-commonjs'],
};

try {
  const files = await readdir(BASE_PATH);
  console.log('> read dir: ', files);
  const jsfiles = files.filter(
    (f: string) => f.endsWith('.js') && !f.includes('jquery'),
  );
  inputs.push(...jsfiles);
  console.log('> list of files to transform', inputs);
} catch (e) {
  console.warn('error occured during collection');
  console.error(e);
}
const transformationPromises = inputs.map((fileName) =>
  transformFileAsync(`${BASE_PATH}/${fileName}`, babelConfig),
);
try {
  const transformationResults = await Promise.all(transformationPromises);
  const outputPromises = transformationResults.map((babelFile, index) => {
    console.info(`> trying to write transformed ${inputs[index]}`);

    if (!babelFile) {
      console.error(`> failed to transform ${inputs[index]}`);
    }
    const { code } = babelFile as BabelFileResult;
    return writeFile(
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        `${OUTPUT_PATH}/${inputs[index]}`,
      ),
      code as string,
      {
        encoding: 'utf-8',
      },
    );
  });

  try {
    console.info(`creating output dir in "${OUTPUT_PATH}"`);
    await mkdir(OUTPUT_PATH, { recursive: true });
  } catch (e) {
    console.warn('failed to create output dir');
    console.error(e);
  }
  await Promise.all(outputPromises);
  console.log('> successfully transformed');
} catch (e) {
  console.warn('error occured during transformation');
  console.error(e);
}
