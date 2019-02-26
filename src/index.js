import patch from './patch';

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

  args.forEach(arg => {
    const type = typeof arg;

    switch (type) {
      case 'symbol':
      case 'string':
        {
          forcedDisplayedName = arg;
        }
        break;
      default:
        {
          ComponentClass = arg;
        }
        break;
    }
  });

  if (!ComponentClass) {
    console.error('[clear-render] Error: need any React сomponent');
    return null;
  }

  const name = forcedDisplayedName || ComponentClass.name;

  return patch(ComponentClass, name, console);
};
