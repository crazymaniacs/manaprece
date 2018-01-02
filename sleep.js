const args = process.argv.slice(2);

const delay = args[0];

const preamble = `[sleep #${process.pid}] `;

if (typeof delay === 'undefined') {
  return console.error(`${preamble}delay (in ms) not specified`);
}

if (delay != parseInt(delay)) {
  return console.error(`${preamble}invalid delay: "${delay}"`);
}

// console.log(preamble + 'sleeping for ' + delay + ' milliseconds')

setTimeout(() => {
  // console.log(preamble + 'woken up after ' + delay + ' milliseconds')
  process.exit(0);
}, delay);
