import { Console } from "./console";

var compiling = false;
var errorStrings = [];//also stores warning strings
var errorCount = 0;//only counts errors

export class Log {

  static logErrorCacheable(str, lineNumber, urgent) {
    if (compiling || urgent) {
      if (lineNumber === undefined) {
        return this.logErrorNoLine(str, urgent);
      }
      var errorString = '<a onclick="jumpToLine(' + lineNumber.toString() + ');"  href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + lineNumber.toString() + '</span></a> : ' + '<span class="errorText">' + str + '</span>';
      if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
        //do nothing, duplicate error
      } else {
        Console.consolePrint(errorString);
        errorStrings.push(errorString);
        errorCount++;
      }
    }
  }

  static logError(str, lineNumber, urgent?) {
    if (compiling || urgent) {
      if (lineNumber === undefined) {
        return this.logErrorNoLine(str, urgent);
      }
      var errorString = '<a onclick="jumpToLine(' + lineNumber.toString() + ');"  href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + lineNumber.toString() + '</span></a> : ' + '<span class="errorText">' + str + '</span>';
      if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
        //do nothing, duplicate error
      } else {
        Console.consolePrint(errorString, true);
        errorStrings.push(errorString);
        errorCount++;
      }
    }
  }

  static logWarning(str, lineNumber, urgent) {
    if (compiling || urgent) {
      if (lineNumber === undefined) {
        return this.logWarningNoLine(str, urgent);
      }
      var errorString = '<a onclick="jumpToLine(' + lineNumber.toString() + ');"  href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + lineNumber.toString() + '</span></a> : ' + '<span class="warningText">' + str + '</span>';
      if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
        //do nothing, duplicate error
      } else {
        Console.consolePrint(errorString, true);
        errorStrings.push(errorString);
      }
    }
  }

  static logWarningNoLine(str, urgent) {
    if (compiling || urgent) {
      var errorString = '<span class="warningText">' + str + '</span>';
      if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
        //do nothing, duplicate error
      } else {
        Console.consolePrint(errorString, true);
        errorStrings.push(errorString);
      }
      errorCount++;
    }
  }


  static logErrorNoLine(str, urgent) {
    if (compiling || urgent) {
      var errorString = '<span class="errorText">' + str + '</span>';
      if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
        //do nothing, duplicate error
      } else {
        Console.consolePrint(errorString, true);
        errorStrings.push(errorString);
      }
      errorCount++;
    }
  }

}