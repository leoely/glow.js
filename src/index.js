import HighLight from '~/class/HighLight';
import YamlLexer from '~/class/YamlLexer';

const highLight = new HighLight();
highLight.addLexer(YamlLexer);
console.log(highLight.parse(`
  " Minimum time interval which ignores a serails of same file update.
  interval: 5000(ms)

  " Stop add new task when current memory less than minimum memory.
  min-mem: 100(mb)

  " Increase or decrease core number which base recommended value.
  adjust-core: 0(core)

  " File or path which will ignores by file watch.
  ignores:
    - .drip/local/
    - .git/
    - .gitkeep

  " Alias and address of package which will be installed in this project.
  packages:
    - [node(]fsdfasd)

  " Level of instance index which affect both index time and index effect.
    index-level: 2(rank)
`));
