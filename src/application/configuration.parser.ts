import { readdirSync, readJSONSync } from 'fs-extra-promise';
import { join } from 'path';
import * as _ from 'lodash';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';

export class ConfigurationParser {
  private static __instance: ConfigurationParser = null;
  private __baseResourcePath: string = null;
  private __config: any = {};

  private constructor() {
    this.__baseResourcePath = join(process.cwd(), 'resources');
    this.__parseConfig(this.__baseResourcePath);
  }

  static getInstance(): ConfigurationParser {
    if (ConfigurationParser.__instance === null) {
      ConfigurationParser.__instance = new ConfigurationParser();
      Object.freeze(ConfigurationParser.__instance);
    }
    return ConfigurationParser.__instance;
  }

  get config() {
    return this.__config;
  }

  private __parseConfig(resourceFolder: string) {
    const configFiles: string[] = readdirSync(resourceFolder).filter((file) => {
      return file.match(
        new RegExp(`(\\w+\\.(?:config\\.(yaml|yml|json)))`, 'gi'),
      );
    });
    configFiles.map((file) => {
      let fileObject = {};
      _.merge(fileObject, this.__parseFileObjects(join(resourceFolder, file)));
      this.__config[
        file
          .split('.')[0]
          .replace(/[\-\_]/gi, '')
          .toLowerCase()
      ] = fileObject;
    });
  }

  private __parseFileObjects(file: string) {
    if (file.endsWith('yml') || file.endsWith('yaml'))
      return yaml.load(readFileSync(file, 'utf-8'));
    else return readJSONSync(file);
  }
}
