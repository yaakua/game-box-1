const sep = "/";
const dot = ".";

const _timestamp = (pattern: string = "YYYY-MM-DD HH:mm:ss"): string => {
  const date = new Date();
  const pad = (num: number): string => num.toString().padStart(2, "0");

  const replacements: { [key: string]: string } = {
    YYYY: date.getFullYear().toString(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
  };

  return pattern.replace(
    /YYYY|MM|DD|HH|mm|ss/g,
    (match): string => replacements[match] || match
  );
};

const _file = (fp = import.meta.url) => {
  if (!fp.startsWith("file://")) {
    return fp;
  }
  const path = fp.slice(fp.indexOf("//") + 2);
  const filename = path.slice(path.lastIndexOf(sep), path.lastIndexOf(dot));
  const dirname = path.slice(0, path.lastIndexOf(sep));
  const joinDir = dirname
    .slice(0, dirname.lastIndexOf(sep))
    .split(sep)
    .map((v) => v.slice(0, 1))
    .join(".");
  const prefix = `${joinDir}.${dirname.slice(dirname.lastIndexOf(sep) + 1)}`;
  const suffix = filename.slice(filename.lastIndexOf(sep) + 1);
  return `${prefix}.${suffix}`;
};

const _getCallerInfo = () => {
  const error = new Error();
  const stack = error.stack?.split("\n")[4] || "";
  const match = stack.match(/at.+\((.+):(\d+):(\d+)\)$/);

  const processPath = (fullPath: string) => {
    const parts = fullPath.split("/");
    return parts.length > 5 ? parts.slice(-4).join("/") : parts.join("/");
  };

  if (!match) {
    const altMatch = stack.match(/at\s+(.+):(\d+):(\d+)$/);
    if (altMatch) {
      const [, file, line] = altMatch;
      return `[${processPath(file as string)}:${line}]`;
    }
    return "";
  }
  const [, file, line] = match;
  return `[${processPath(file as string)}:${line}]`;
};

const _formatter = (
  label: string,
  level: string,
  message: string,
  ...args: any[]
) => {
  const values =
    args.length > 0 ? args.map((it) => JSON.stringify(it)).join(" ") : "";
  const callerInfo = _getCallerInfo();
  return `${_timestamp()} ${label} ${level} ${callerInfo} ${message}${
    values ? " " + values : ""
  }`;
};

class Logger {
  private readonly label: string;

  constructor(label: string) {
    this.label = _file(label);
  }

  info(message: string, ...args: any[]) {
    console.info(_formatter(this.label, "[INFO] ", message, ...args));
  }

  error(message: string, ...args: any[]) {
    console.error(_formatter(this.label, "[ERROR]", message, ...args));
  }

  warn(message: string, ...args: any[]) {
    console.warn(_formatter(this.label, "[WARN] ", message, ...args));
  }

  debug(message: string, ...args: any[]) {
    console.debug(_formatter(this.label, "[DEBUG]", message, ...args));
  }

  log(message: string, ...args: any[]) {
    console.log(_formatter(this.label, "[LOG]  ", message, ...args));
  }
}

export const logger = new Logger("root");

export const getLogger = (label?: string) => {
  return new Logger(label || "default");
};

export default logger;
