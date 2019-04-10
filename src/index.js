import patch from './patch';

import Logger from './Logger';
import Comparator from './Comparator';

export default (...args) => {
  if (args.length > 2) {
    console.error('[clear-render] Error: Too many arguments');
    return null;
  }

  if (args.length === 0) {
    console.error('[clear-render] Error: extended React сomponent is requied');
    return null;
  }

  let ComponentClass = null;
  let forcedDisplayedName = null;

  args.forEach(argument => {
    const type = typeof argument;

    switch (type) {
      case 'symbol':
      case 'string':
        {
          forcedDisplayedName = argument;
        }
        break;
      default:
        {
          ComponentClass = argument;
        }
        break;
    }
  });

  if (!ComponentClass) {
    console.error('[clear-render] Error: need any React сomponent');
    return null;
  }

  const name = forcedDisplayedName || ComponentClass.name;

  const logger = new Logger(name, console);
  const comparator = new Comparator(logger);

  return patch(ComponentClass, comparator);
};
