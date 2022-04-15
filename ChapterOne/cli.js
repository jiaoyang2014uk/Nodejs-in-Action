const [nodePath, scriptPath, ...argvs] = process.argv;
console.log('hello', ...argvs);