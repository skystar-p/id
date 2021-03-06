import * as fs from 'fs';
import * as path from 'path';
import * as pg from 'pg';

interface Configuration {
  // express trust proxy configuration
  trustProxy: boolean | number | string;
  // Base path that this web application is served
  path: string;
  session: SessionConfig;
  postgres: pg.PoolConfig;
  ldap: LDAPConfig;
}

interface SessionConfig {
  // Maximum age of the cookie (in milliseconds)
  // Undefined value means no maximum age is set
  cookieMaxAge?: number;
  // Secure attribute of the cookie
  secureCookie: boolean;
  // The name of the session id cookie
  name: string;
  // A secret used to sign the session id cookie
  secret: string;
  // Redis session store config
  redis: ConnectRedisConfig;
}

interface ConnectRedisConfig {
  host?: string;
  port?: number;
  socket?: string;
  url?: string;
  db?: number;
  pass?: string;
  prefix?: string;
  logErrors?: boolean;
}

interface LDAPConfig {
  // DN for users subtree
  dnUsers: string;
  // Minimum POSIX uid for users
  minUid: number;
  // DN for POSIX group entry
  dnGroup: string;
  // POSIX gid for group
  gid: number;
}

const config = parseCommandLineAndGetConfig();

// Warning: unsafe casting
export default config as Configuration;

/**
 * Interpret command line arguments, find the configuration file, and parse it.
 * Users may specify the path using command line option '-c'
 * Otherwise, try to find 'config.json' from current working directory and upward
 */
function parseCommandLineAndGetConfig(): any {
  // Path of the configuration file may be specified in command line arguments
  let configFilePath: string | null = null;
  if (process.argv[2] === '-c') {
    if (process.argv[3] === undefined) {
      throw new Error('Path to the configuration file is missing after \'-c\' option');
    }
    configFilePath = process.argv[3];
  } else if (process.argv[2] !== undefined) {
    throw new Error('Unknown option:' + process.argv[2]);
  }

  // Find and read the configuration file
  let configString: string | null = null;
  if (configFilePath === null) {
    // Try to find 'config.json' from current directory and upward
    const dirs = process.cwd().split(path.sep);
    while (dirs.length > 0) {
      configFilePath = dirs.concat('config.json').join(path.sep);
      try {
        configString = fs.readFileSync(configFilePath, 'utf8');
        break;
      } catch (e) {
        // No such file, or unable to read
      }
      dirs.pop();
    }
  } else {
    try {
      configString = fs.readFileSync(configFilePath, 'utf8');
    } catch (e) {
      throw new Error('Cannot read the specified config file');
    }
  }
  if (configString === null) {
    throw new Error('Cannot read or find the configuration file');
  }

  // Parse the configuration file
  let configObject: any;
  try {
    configObject = JSON.parse(configString);
  } catch (e) {
    throw new Error(configFilePath + ': ' + e.message);
  }

  return configObject;
}
