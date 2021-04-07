import { Console } from "../utils/console";
import { Log } from "../utils/log";
import { StringStream } from "../utils/string-stream";

/**
title simple block pushing game
author david skinner
homepage www.puzzlescript.net

========
objects
========

background
lightgreen green
11111
01111
11101
11111
10111


target
darkblue
.....
.000.
.0.0.
.000.
.....

wall
brown darkbrown
00010
11111
01000
11111
00010

player
black orange white blue
.000.
.111.
22222
.333.
.3.3.

crate
orange yellow
00000
0...0
0...0
0...0
00000


=======
legend
=======

. = background
# = wall
p = player
* = crate
@ = crate and target
o = target


=======
sounds
=======

crate move 36772507

================
collisionlayers
================

background
target
player, wall, crate

======
rules
======

[ >  player | crate ] -> [  >  player | > crate  ]

==============
winconditions
==============

all target on crate

=======
levels
=======


####..
#.o#..
#..###
#@p..#
#..*.#
#..###
####..


######
#....#
#.#p.#
#.*@.#
#.o@.#
#....#
######
 */
export class Parser {

    token(stream: StringStream, state: State) {
        var mixedCase = stream.string;
        var sol = stream.sol();//stream 是否为首个字母
        if (sol) {
            //如果是则全部转换为小写
            stream.string = stream.string.toLowerCase();
            state.tokenIndex = 0;
        }

        function registerOriginalCaseName(candname) {
            function escapeRegExp(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }
            var nameFinder = new RegExp("\\b" + escapeRegExp(candname) + "\\b", "i")
            var match = mixedCase.match(nameFinder);
            if (match != null) {
                state.original_case_names[candname] = match[0];
            }
        }
        stream.eatWhile(/[ \t]/);
        ////////////////////////////////
        // COMMENT PROCESSING BEGIN
        ////////////////////////////////

        //NESTED COMMENTS 消息
        var ch = stream.peek();
        if (ch === '(' && state.tokenIndex !== -4) { // tokenIndex -4 indicates message command
            stream.next();
            state.commentLevel++;
        } else if (ch === ')') {
            stream.next();
            if (state.commentLevel > 0) {
                state.commentLevel--;
                if (state.commentLevel === 0) {
                    return 'comment';
                }
            }
        }
        if (state.commentLevel > 0) {
            while (true) {
                stream.eatWhile(/[^\(\)]+/);

                if (stream.eol()) {
                    break;
                }

                ch = stream.peek();

                if (ch === '(') {
                    state.commentLevel++;
                } else if (ch === ')') {
                    state.commentLevel--;
                }
                stream.next();

                if (state.commentLevel === 0) {
                    break;
                }
            }
            return 'comment';
        }
        stream.eatWhile(/[ \t]/);

        if (sol && stream.eol()) {
            return blankLineHandle(state);
        }

        //MATCH '==="s AT START OF LINE
        if (sol && stream.match(reg_equalsrow, true)) {
            return 'EQUALSBIT';
        }

        //MATCH SECTION NAME
        if (sol && stream.match(reg_sectionNames, true)) {
            state.section = stream.string.slice(0, stream.pos).trim();
            if (state.visitedSections.indexOf(state.section) >= 0) {
                Log.logError('cannot duplicate sections (you tried to duplicate \"' + state.section.toUpperCase() + '").', state.lineNumber);
            }
            state.visitedSections.push(state.section);
            var sectionIndex = sectionNames.indexOf(state.section);
            if (sectionIndex == 0) {
                state.objects_section = 0;
                if (state.visitedSections.length > 1) {
                    Log.logError('section "' + state.section.toUpperCase() + '" must be the first section', state.lineNumber);
                }
            } else if (state.visitedSections.indexOf(sectionNames[sectionIndex - 1]) == -1) {
                if (sectionIndex === -1) {
                    Log.logError('no such section as "' + state.section.toUpperCase() + '".', state.lineNumber);
                } else {
                    Log.logError('section "' + state.section.toUpperCase() + '" is out of order, must follow  "' + sectionNames[sectionIndex - 1].toUpperCase() + '" (or it could be that the section "' + sectionNames[sectionIndex - 1].toUpperCase() + `"is just missing totally.  You have to include all section headings, even if the section itself is empty).`, state.lineNumber);
                }
            }

            if (state.section === 'sounds') {
                //populate names from rules
                for (var n in state.objects) {
                    if (state.objects.hasOwnProperty(n)) {
                        /*                                if (state.names.indexOf(n)!==-1) {
                                                    logError('Object "'+n+'" has been declared to be multiple different things',state.objects[n].lineNumber);
                                                }*/
                        state.names.push(n);
                    }
                }
                //populate names from legends
                for (var i = 0; i < state.legend_synonyms.length; i++) {
                    var n = state.legend_synonyms[i][0];
                    /*
                    if (state.names.indexOf(n)!==-1) {
                        logError('Object "'+n+'" has been declared to be multiple different things',state.legend_synonyms[i].lineNumber);
                    }
                    */
                    state.names.push(n);
                }
                for (var i = 0; i < state.legend_aggregates.length; i++) {
                    var n = state.legend_aggregates[i][0];
                    /*
                    if (state.names.indexOf(n)!==-1) {
                        logError('Object "'+n+'" has been declared to be multiple different things',state.legend_aggregates[i].lineNumber);
                    }
                    */
                    state.names.push(n);
                }
                for (var i = 0; i < state.legend_properties.length; i++) {
                    var n = state.legend_properties[i][0];
                    /*
                    if (state.names.indexOf(n)!==-1) {
                        logError('Object "'+n+'" has been declared to be multiple different things',state.legend_properties[i].lineNumber);
                    }                           
                    */
                    state.names.push(n);
                }
            } else if (state.section === 'levels') {
                //populate character abbreviations
                for (var n in state.objects) {
                    if (state.objects.hasOwnProperty(n) && n.length == 1) {
                        state.abbrevNames.push(n);
                    }
                }

                for (var i = 0; i < state.legend_synonyms.length; i++) {
                    if (state.legend_synonyms[i][0].length == 1) {
                        state.abbrevNames.push(state.legend_synonyms[i][0]);
                    }
                }
                for (var i = 0; i < state.legend_aggregates.length; i++) {
                    if (state.legend_aggregates[i][0].length == 1) {
                        state.abbrevNames.push(state.legend_aggregates[i][0]);
                    }
                }
            }
            return 'HEADER';

        }
    }

}

var absolutedirs = ['up', 'down', 'right', 'left'];
var relativedirs = ['^', 'v', '<', '>', 'moving', 'stationary', 'parallel', 'perpendicular', 'no'];
var logicWords = ['all', 'no', 'on', 'some'];
var sectionNames = ['objects', 'legend', 'sounds', 'collisionlayers', 'rules', 'winconditions', 'levels'];
var commandwords = ["sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "cancel", "checkpoint", "restart", "win", "message", "again"];
var reg_commands = /[\p{Z}\s]*(sfx0|sfx1|sfx2|sfx3|Sfx4|sfx5|sfx6|sfx7|sfx8|sfx9|sfx10|cancel|checkpoint|restart|win|message|again)[\p{Z}\s]*/u;
var reg_name = /[\p{L}\p{N}_]+[\p{Z}\s]*/u;///\w*[a-uw-zA-UW-Z0-9_]/;
var reg_number = /[\d]+/;
var reg_soundseed = /\d+\b/;
var reg_spriterow = /[\.0-9]{5}[\p{Z}\s]*/u;
var reg_sectionNames = /(objects|collisionlayers|legend|sounds|rules|winconditions|levels)(?![\p{L}\p{N}_])[\p{Z}\s]*/u;
var reg_equalsrow = /[\=]+/;
var reg_notcommentstart = /[^\(]+/;
var reg_csv_separators = /[ \,]*/;
var reg_soundverbs = /(move|action|create|destroy|cantmove|undo|restart|titlescreen|startgame|cancel|endgame|startlevel|endlevel|showmessage|closemessage|sfx0|sfx1|sfx2|sfx3|sfx4|sfx5|sfx6|sfx7|sfx8|sfx9|sfx10)[\p{Z}\s]+/u;
var reg_directions = /^(action|up|down|left|right|\^|v|\<|\>|moving|stationary|parallel|perpendicular|horizontal|orthogonal|vertical|no|randomdir|random)$/;
var reg_loopmarker = /^(startloop|endloop)$/;
var reg_ruledirectionindicators = /^(up|down|left|right|horizontal|vertical|orthogonal|late|rigid)$/;
var reg_sounddirectionindicators = /[\p{Z}\s]*(up|down|left|right|horizontal|vertical|orthogonal)[\p{Z}\s]*/u;
var reg_winconditionquantifiers = /^(all|any|no|some)$/;
var reg_keywords = /(checkpoint|objects|collisionlayers|legend|sounds|rules|winconditions|\.\.\.|levels|up|down|left|right|^|\||\[|\]|v|\>|\<|no|horizontal|orthogonal|vertical|any|all|no|some|moving|stationary|parallel|perpendicular|action)/;
var keyword_array = ['checkpoint', 'objects', 'collisionlayers', 'legend', 'sounds', 'rules', '...', 'winconditions', 'levels', '|', '[', ']', 'up', 'down', 'left', 'right', 'late', 'rigid', '^', 'v', '\>', '\<', 'no', 'randomdir', 'random', 'horizontal', 'vertical', 'any', 'all', 'no', 'some', 'moving', 'stationary', 'parallel', 'perpendicular', 'action', 'message'];

//  var keywordRegex = new RegExp("\\b(("+cons.join(")|(")+"))$", 'i');

var fullSpriteMatrix = [
    '00000',
    '00000',
    '00000',
    '00000',
    '00000'
];

function blankLineHandle(state) {
    if (state.section === 'levels') {
        if (state.levels[state.levels.length - 1].length > 0) {
            state.levels.push([]);
        }
    } else if (state.section === 'objects') {
        state.objects_section = 0;
    }
}

