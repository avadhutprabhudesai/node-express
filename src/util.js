const logger = (origin, preamble, value = '') => {
  console.log(`\n=============${origin.split('src')[1]} =============`);
  console.log(`\t${preamble}: ${value}`);
  console.log(`==============================================\n`);
};

module.exports = logger;
