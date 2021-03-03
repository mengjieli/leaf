namespace orange {

  export class Command {

    /**
     * @internal
     */
    public name: string;

    /**
     * @internal
     */
    public descs = [];

    /**
     * @internal
     */
    public calls = new Set<Function>();

    execute(args) {
      this.calls.forEach(call => call.apply(null, args));
    }

    private static cmds = new Map<string, Command>();

    public static register(name: string, call: Function, desc: string = '') {
      var cmd = Command.cmds.get(name);
      if (!cmd) {
        cmd = new Command();
        cmd.name = name;
        cmd.descs.push(desc);
        Command.cmds.set(name, cmd);
      }
      cmd.calls.add(call);
    }

    public static execute(name: string, ...args) {
      var cmd = Command.cmds.get(name);
      if (!cmd) {
        console.warn('[orange command] 没有找到对应的命令：' + name);
        return;
      }
      cmd.execute(args);
    }

    public static list() {
      console.log('[orange command] list：');
      var list: any = [['name', 'desc']];
      Command.cmds.forEach(cmd => list.push([cmd.name, cmd.descs]));
      console.log(orange.StringUtil.tableToString(list));
    }
  }

}