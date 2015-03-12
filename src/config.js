import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';
import {
  cloneDeep,
  isPlainObject
} from 'lodash-node/modern/lang';
import {
  defaults,
  has
} from 'lodash-node/modern/object';
import _debug from 'debug';
import chalk from 'chalk';
import {
  valueForKeyPath,
  setValueForKeyPath,
  hasKeyPath
} from './utils';
import dotenv from 'dotenv';
import { Root } from './paths';

const debug = _debug('trek:config');

class Config {

  constructor(root) {
    this.root = root;
    this.emitter = new EventEmitter;
    this.defaultSettings = Object.create(null);
    this.settings = Object.create(null);
    this.env = Object.create(null);
  }

  dotenv() {
    let defaultEnvPath = path.join(this.root, '.env');
    // env defaults
    dotenv._getKeysAndValuesFromEnvFilePath(defaultEnvPath);
    // env overrides with Trek.env
    dotenv._getKeysAndValuesFromEnvFilePath(`${defaultEnvPath}.${Trek.env}`);
    this.env = Object.create(dotenv.keys_and_values);
  }

  initialize() {
    this.dotenv();
    this.load(this.paths.get('config/application').first);
    this.load(this.paths.get('config/environments').first);
  }

  get paths() {
    return this._paths || (this._paths = ((root) => {
      let paths = new Root(root);

      paths.add('app');
      paths.add('app/controllers');
      paths.add('app/models');
      paths.add('app/services', {
        glob: '*.js'
      });
      paths.add('app/views');

      paths.add('lib');
      paths.add('config');
      paths.add('config/database', {
        with: 'config/database.js'
      });
      paths.add('config/application', {
        with: 'config/application.js'
      });
      paths.add('config/environments', {
        glob: `${Trek.env}.js`
      });
      paths.add('config/secrets', {
        glob: `${Trek.env}.js`
      });
      paths.add('config/locales', {
        glob: '*.{js,json}'
      });
      paths.add('config/routes', {
        with: 'config/routes.js'
      });

      paths.add('public');
      paths.add('log', {
        with: `log/${Trek.env}.log`
      });
      paths.add('tmp');

      return paths;
    })(this.root));
  }

  get secrets() {
    return this._secrets || (this._secrets = (() => {
      let secrets = {};
      let filepath = this.paths.get('config/secrets').first;
      if (!filepath) return filepath;
      let file = path.resolve(filepath);
      if (fs.existsSync(file)) {
        secrets = require(file);
      }
      if (!has(secrets, 'secretKeyBase')) {
        secrets.secretKeyBase = this.secretKeyBase;
      }
      return secrets;
    })());
  }

  get publicPath() {
    return this.paths.get('public').first;
  }

  get viewsPath() {
    return this.paths.get('app/views').first;
  }

  load(path) {
    debug('load %s', path);
    try {
      require(path)(this);
    } catch (e) {
      console.log(chalk.bold.red(`${e}`));
    }
  }

  get(keyPath, isDefault) {
    let value, defaultValue;
    defaultValue = valueForKeyPath(this.defaultSettings, keyPath);
    if (!isDefault) value = valueForKeyPath(this.settings, keyPath);

    if (value) {
      value = cloneDeep(value);
      if (isPlainObject(value) && isPlainObject(defaultValue)) {
        defaults(value, defaultValue);
      }
    } else {
      value = cloneDeep(defaultValue);
    }

    return value;
  }

  set(keyPath, value, isDefault) {
    setValueForKeyPath(
      isDefault ? this.defaultSettings : this.settings,
      keyPath,
      value
    );
  }

}

export default Config;