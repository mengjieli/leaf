var lib = require("./../../cli/bin/lib/lib")

var list = [
    "js/Blob.js",
    "js/FileSaver.js",
    "js/jsgif/LZWEncoder.js",
    "js/jsgif/NeuQuant.js",
    "js/jsgif/GIFEncoder.js",
    "js/debug.js",
    "js/globalVariables.js",
    "js/font.js",
    "js/rng.js",
    "js/riffwave.js",
    "js/sfxr.js",

    "js/codemirror/codemirror.js",
    "js/codemirror/active-line.js",
    "js/codemirror/dialog.js",
    "js/codemirror/search.js",
    "js/codemirror/searchcursor.js",
    "js/codemirror/match-highlighter.js",
    "js/codemirror/show-hint.js",
    "js/codemirror/anyword-hint.js",
    "js/codemirror/comment.js",

    "js/colors.js",
    "js/graphics.js",
    "js/inputoutput.js",
    "js/mobile.js",
    "js/console.js",
    "js/buildStandalone.js",
    "js/engine.js",
    "js/parser.js",

    "js/editor.js",
    "js/compiler.js",
    "js/soundbar.js",
    "js/toolbar.js",
    "js/layout.js",
    "js/addlisteners.js",
    "js/addlisteners_editor.js",
    "js/makegif.js"
];

let out = '';
for (let f of list) {
    let file = new lib.File("./source/" + f);
    out += `\n\/\/\/\/\/\/\/\/\/\/File Source ${f}\n`;
    out += file.readContent();
}
(new lib.File("puzzle-script.js")).save(out);
