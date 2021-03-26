const readline = require('readline');

export function readLine(tip: string = '输入:', defaultContent?: string) {
  return new Promise<string>(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(tip, (content) => {
      resolve(content === '' && defaultContent ? defaultContent : content);
      rl.close();
    });
  });
}

