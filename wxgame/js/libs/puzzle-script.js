
//////////File Source js/Blob.js
/* Blob.js
 * A Blob implementation.
 * 2013-06-20
 * 
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/eboyjr
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self, unescape */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */
var self = new (function(){

});
if (typeof Blob !== "function" || typeof URL === "undefined")
	if (typeof Blob === "function" && typeof webkitURL !== "undefined") var URL = webkitURL;
	else var Blob = (function (view) {
		"use strict";

		var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || view.MSBlobBuilder || (function (view) {
			var
				get_class = function (object) {
					return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
				}
				, FakeBlobBuilder = function BlobBuilder() {
					this.data = [];
				}
				, FakeBlob = function Blob(data, type, encoding) {
					this.data = data;
					this.size = data.length;
					this.type = type;
					this.encoding = encoding;
				}
				, FBB_proto = FakeBlobBuilder.prototype
				, FB_proto = FakeBlob.prototype
				, FileReaderSync = view.FileReaderSync
				, FileException = function (type) {
					this.code = this[this.name = type];
				}
				, file_ex_codes = (
					"NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
					+ "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
				).split(" ")
				, file_ex_code = file_ex_codes.length
				, real_URL = view.URL || view.webkitURL || view
				, real_create_object_URL = real_URL.createObjectURL
				, real_revoke_object_URL = real_URL.revokeObjectURL
				, URL = real_URL
				, btoa = view.btoa
				, atob = view.atob
				, can_apply_typed_arrays = false
				, can_apply_typed_arrays_test = function (pass) {
					can_apply_typed_arrays = !pass;
				}

				, ArrayBuffer = view.ArrayBuffer
				, Uint8Array = view.Uint8Array
				;
			FakeBlob.fake = FB_proto.fake = true;
			while (file_ex_code--) {
				FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
			}
			try {
				if (Uint8Array) {
					can_apply_typed_arrays_test.apply(0, new Uint8Array(1));
				}
			} catch (ex) { }
			if (!real_URL.createObjectURL) {
				URL = view.URL = {};
			}
			URL.createObjectURL = function (blob) {
				var
					type = blob.type
					, data_URI_header
					;
				if (type === null) {
					type = "application/octet-stream";
				}
				if (blob instanceof FakeBlob) {
					data_URI_header = "data:" + type;
					if (blob.encoding === "base64") {
						return data_URI_header + ";base64," + blob.data;
					} else if (blob.encoding === "URI") {
						return data_URI_header + "," + decodeURIComponent(blob.data);
					} if (btoa) {
						return data_URI_header + ";base64," + btoa(blob.data);
					} else {
						return data_URI_header + "," + encodeURIComponent(blob.data);
					}
				} else if (real_create_object_URL) {
					return real_create_object_URL.call(real_URL, blob);
				}
			};
			URL.revokeObjectURL = function (object_URL) {
				if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
					real_revoke_object_URL.call(real_URL, object_URL);
				}
			};
			FBB_proto.append = function (data/*, endings*/) {
				var bb = this.data;
				// decode data to a binary string
				if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
					if (can_apply_typed_arrays) {
						bb.push(String.fromCharCode.apply(String, new Uint8Array(data)));
					} else {
						var
							str = ""
							, buf = new Uint8Array(data)
							, i = 0
							, buf_len = buf.length
							;
						for (; i < buf_len; i++) {
							str += String.fromCharCode(buf[i]);
						}
					}
				} else if (get_class(data) === "Blob" || get_class(data) === "File") {
					if (FileReaderSync) {
						var fr = new FileReaderSync;
						bb.push(fr.readAsBinaryString(data));
					} else {
						// async FileReader won't work as BlobBuilder is sync
						throw new FileException("NOT_READABLE_ERR");
					}
				} else if (data instanceof FakeBlob) {
					if (data.encoding === "base64" && atob) {
						bb.push(atob(data.data));
					} else if (data.encoding === "URI") {
						bb.push(decodeURIComponent(data.data));
					} else if (data.encoding === "raw") {
						bb.push(data.data);
					}
				} else {
					if (typeof data !== "string") {
						data += ""; // convert unsupported types to strings
					}
					// decode UTF-16 to binary string
					bb.push(unescape(encodeURIComponent(data)));
				}
			};
			FBB_proto.getBlob = function (type) {
				if (!arguments.length) {
					type = null;
				}
				return new FakeBlob(this.data.join(""), type, "raw");
			};
			FBB_proto.toString = function () {
				return "[object BlobBuilder]";
			};
			FB_proto.slice = function (start, end, type) {
				var args = arguments.length;
				if (args < 3) {
					type = null;
				}
				return new FakeBlob(
					this.data.slice(start, args > 1 ? end : this.data.length)
					, type
					, this.encoding
				);
			};
			FB_proto.toString = function () {
				return "[object Blob]";
			};
			return FakeBlobBuilder;
		}(view));

		return function Blob(blobParts, options) {
			var type = options ? (options.type || "") : "";
			var builder = new BlobBuilder();
			if (blobParts) {
				for (var i = 0, len = blobParts.length; i < len; i++) {
					builder.append(blobParts[i]);
				}
			}
			return builder.getBlob(type);
		};
	}(self));


/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2011-07-13
 * 
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

(function (view) {
	"use strict";
	var
		Uint8Array = view.Uint8Array
		, HTMLCanvasElement = view.HTMLCanvasElement
		, is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i
		, base64_ranks
		, decode_base64 = function (base64) {
			var
				len = base64.length
				, buffer = new Uint8Array(len / 4 * 3 | 0)
				, i = 0
				, outptr = 0
				, last = [0, 0]
				, state = 0
				, save = 0
				, rank
				, code
				, undef
				;
			while (len--) {
				code = base64.charCodeAt(i++);
				rank = base64_ranks[code - 43];
				if (rank !== 255 && rank !== undef) {
					last[1] = last[0];
					last[0] = code;
					save = (save << 6) | rank;
					state++;
					if (state === 4) {
						buffer[outptr++] = save >>> 16;
						if (last[1] !== 61 /* padding character */) {
							buffer[outptr++] = save >>> 8;
						}
						if (last[0] !== 61 /* padding character */) {
							buffer[outptr++] = save;
						}
						state = 0;
					}
				}
			}
			// 2/3 chance there's going to be some null bytes at the end, but that
			// doesn't really matter with most image formats.
			// If it somehow matters for you, truncate the buffer up outptr.
			return buffer.buffer;
		}
		;
	if (Uint8Array) {
		base64_ranks = new Uint8Array([
			62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1
			, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
			, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
			, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
			, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
		]);
	}
	if (HTMLCanvasElement && !HTMLCanvasElement.prototype.toBlob) {
		HTMLCanvasElement.prototype.toBlob = function (callback, type /*, ...args*/) {
			if (!type) {
				type = "image/png";
			} if (this.mozGetAsFile) {
				callback(this.mozGetAsFile("canvas", type));
				return;
			}
			var
				args = Array.prototype.slice.call(arguments, 1)
				, dataURI = this.toDataURL.apply(this, args)
				, header_end = dataURI.indexOf(",")
				, data = dataURI.substring(header_end + 1)
				, is_base64 = is_base64_regex.test(dataURI.substring(0, header_end))
				, blob
				;
			if (Blob.fake) {
				// no reason to decode a data: URI that's just going to become a data URI again
				blob = new Blob
				if (is_base64) {
					blob.encoding = "base64";
				} else {
					blob.encoding = "URI";
				}
				blob.data = data;
				blob.size = data.length;
			} else if (Uint8Array) {
				if (is_base64) {
					blob = new Blob([decode_base64(data)], { type: type });
				} else {
					blob = new Blob([decodeURIComponent(data)], { type: type });
				}
			}
			callback(blob);
		};
	}
}(self));
//////////File Source js/FileSaver.js
/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2013-01-23
 * 
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  || (navigator.msSaveBlob && navigator.msSaveBlob.bind(navigator))
  || (function(view) {
	"use strict";
	return;
	var
		  doc = view.document
		  // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, URL = view.URL || view.webkitURL || view
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function (ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		, deletion_queue = []
		, process_deletion_queue = function() {
			var i = deletion_queue.length;
			while (i--) {
				var file = deletion_queue[i];
				if (typeof file === "string") { // file is an object URL
					URL.revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			}
			deletion_queue.length = 0; // clear queue
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, get_object_url = function() {
					var object_url = get_URL().createObjectURL(blob);
					deletion_queue.push(object_url);
					return object_url;
				}
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_object_url(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_object_url(blob);
				save_link.href = object_url;
				save_link.download = name;
				click(save_link);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			} else {
				target_view = view.open();
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									deletion_queue.push(file);
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;
	
	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;
	
	view.addEventListener("unload", process_deletion_queue, false);
	return saveAs;
}(self));
//////////File Source js/jsgif/LZWEncoder.js
/**
* This class handles LZW encoding
* Adapted from Jef Poskanzer's Java port by way of J. M. G. Elliott.
* @author Kevin Weiner (original Java version - kweiner@fmsware.com)
* @author Thibault Imbert (AS3 version - bytearray.org)
* @version 0.1 AS3 implementation
*/

	//import flash.utils.ByteArray;
	
	LZWEncoder = function()
	{
	    var exports = {};
		/*private_static*/ var EOF/*int*/ = -1;
		/*private*/ var imgW/*int*/;
		/*private*/ var imgH/*int*/
		/*private*/ var pixAry/*ByteArray*/;
		/*private*/ var initCodeSize/*int*/;
		/*private*/ var remaining/*int*/;
		/*private*/ var curPixel/*int*/;
		
		// GIFCOMPR.C - GIF Image compression routines
		// Lempel-Ziv compression based on 'compress'. GIF modifications by
		// David Rowley (mgardi@watdcsu.waterloo.edu)
		// General DEFINEs
		
		/*private_static*/ var BITS/*int*/ = 12;
		/*private_static*/ var HSIZE/*int*/ = 5003; // 80% occupancy
		
		// GIF Image compression - modified 'compress'
		// Based on: compress.c - File compression ala IEEE Computer, June 1984.
		// By Authors: Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
		// Jim McKie (decvax!mcvax!jim)
		// Steve Davies (decvax!vax135!petsd!peora!srd)
		// Ken Turkowski (decvax!decwrl!turtlevax!ken)
		// James A. Woods (decvax!ihnp4!ames!jaw)
		// Joe Orost (decvax!vax135!petsd!joe)
		
		/*private*/ var n_bits/*int*/ // number of bits/code
		/*private*/ var maxbits/*int*/ = BITS; // user settable max # bits/code
		/*private*/ var maxcode/*int*/ // maximum code, given n_bits
		/*private*/ var maxmaxcode/*int*/ = 1 << BITS; // should NEVER generate this code
		/*private*/ var htab/*Array*/ = new Array;
		/*private*/ var codetab/*Array*/ = new Array;
		/*private*/ var hsize/*int*/ = HSIZE; // for dynamic table sizing
		/*private*/ var free_ent/*int*/ = 0; // first unused entry
		
		// block compression parameters -- after all codes are used up,
		// and compression rate changes, start over.
		
		/*private*/ var clear_flg/*Boolean*/ = false;
		
		// Algorithm: use open addressing double hashing (no chaining) on the
		// prefix code / next character combination. We do a variant of Knuth's
		// algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
		// secondary probe. Here, the modular division first probe is gives way
		// to a faster exclusive-or manipulation. Also do block compression with
		// an adaptive reset, whereby the code table is cleared when the compression
		// ratio decreases, but after the table fills. The variable-length output
		// codes are re-sized at this point, and a special CLEAR code is generated
		// for the decompressor. Late addition: construct the table according to
		// file size for noticeable speed improvement on small files. Please direct
		// questions about this implementation to ames!jaw.
		
		/*private*/ var g_init_bits/*int*/;
		/*private*/ var ClearCode/*int*/;
		/*private*/ var EOFCode/*int*/;
		
		// output
		// Output the given code.
		// Inputs:
		// code: A n_bits-bit integer. If == -1, then EOF. This assumes
		// that n_bits =< wordsize - 1.
		// Outputs:
		// Outputs code to the file.
		// Assumptions:
		// Chars are 8 bits long.
		// Algorithm:
		// Maintain a BITS character long buffer (so that 8 codes will
		// fit in it exactly). Use the VAX insv instruction to insert each
		// code in turn. When the buffer fills up empty it and start over.
		
		/*private*/ var cur_accum/*int*/ = 0;
		/*private*/ var cur_bits/*int*/ = 0;
		/*private*/ var masks/*Array*/ = [ 0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F, 0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF ];
		
		// Number of characters so far in this 'packet'
		/*private*/ var a_count/*int*/;
		
		// Define the storage for the packet accumulator
		/*private*/ var accum/*ByteArray*/ = [];
		
		var LZWEncoder = exports.LZWEncoder = function LZWEncoder (width/*int*/, height/*int*/, pixels/*ByteArray*/, color_depth/*int*/)
		{
			
			imgW = width;
			imgH = height;
			pixAry = pixels;
			initCodeSize = Math.max(2, color_depth);
			
		}
		
		// Add a character to the end of the current packet, and if it is 254
		// characters, flush the packet to disk.
		var char_out = function char_out(c/*Number*/, outs/*ByteArray*/)/*void*/
		{
			accum[a_count++] = c;
			if (a_count >= 254) flush_char(outs);
			
		}
		
		// Clear out the hash table
		// table clear for block compress
		
		var cl_block = function cl_block(outs/*ByteArray*/)/*void*/
		{
			
			cl_hash(hsize);
			free_ent = ClearCode + 2;
			clear_flg = true;
			output(ClearCode, outs);
			
		}
		
		// reset code table
		var cl_hash = function cl_hash(hsize/*int*/)/*void*/
		{
			
			for (var i/*int*/ = 0; i < hsize; ++i) htab[i] = -1;
			
		}
		
		var compress = exports.compress = function compress(init_bits/*int*/, outs/*ByteArray*/)/*void*/
		
		{
			var fcode/*int*/;
			var i/*int*/ /* = 0 */;
			var c/*int*/;
			var ent/*int*/;
			var disp/*int*/;
			var hsize_reg/*int*/;
			var hshift/*int*/;
			
			// Set up the globals: g_init_bits - initial number of bits
			g_init_bits = init_bits;
			
			// Set up the necessary values
			clear_flg = false;
			n_bits = g_init_bits;
			maxcode = MAXCODE(n_bits);
	
			ClearCode = 1 << (init_bits - 1);
			EOFCode = ClearCode + 1;
			free_ent = ClearCode + 2;
	
			a_count = 0; // clear packet
		
			ent = nextPixel();
	
			hshift = 0;
			for (fcode = hsize; fcode < 65536; fcode *= 2)
			  ++hshift;
			hshift = 8 - hshift; // set hash code range bound
	
			hsize_reg = hsize;
			cl_hash(hsize_reg); // clear hash table
		
			output(ClearCode, outs);
		
			outer_loop: while ((c = nextPixel()) != EOF)
			
			{
				
				fcode = (c << maxbits) + ent;
				i = (c << hshift) ^ ent; // xor hashing
	
				if (htab[i] == fcode)
				{
				ent = codetab[i];
				continue;
				} else if (htab[i] >= 0) // non-empty slot
				{
					disp = hsize_reg - i; // secondary hash (after G. Knott)
					if (i == 0)
					disp = 1;
					do 
					{
						
						if ((i -= disp) < 0) i += hsize_reg;
	
						if (htab[i] == fcode)
						{
						ent = codetab[i];
						continue outer_loop;
						}
					} while (htab[i] >= 0);
				}
	      
				output(ent, outs);
				ent = c;
				if (free_ent < maxmaxcode)
				{
					codetab[i] = free_ent++; // code -> hashtable
					htab[i] = fcode;
				} else cl_block(outs);
			}
			
			// Put out the final code.
			output(ent, outs);
			output(EOFCode, outs);
			
		}
		
		// ----------------------------------------------------------------------------
		var encode = exports.encode = function encode(os/*ByteArray*/)/*void*/
		{
			os.writeByte(initCodeSize); // write "initial code size" byte
			remaining = imgW * imgH; // reset navigation variables
			curPixel = 0;
			compress(initCodeSize + 1, os); // compress and write the pixel data
			os.writeByte(0); // write block terminator
			
		}
		
		// Flush the packet to disk, and reset the accumulator
		var flush_char = function flush_char(outs/*ByteArray*/)/*void*/
		{
			
			if (a_count > 0)
			{
				outs.writeByte(a_count);
				outs.writeBytes(accum, 0, a_count);
				a_count = 0;
			}
			
		}
		
		var MAXCODE = function MAXCODE(n_bits/*int*/)/*int*/
		{
			
			return (1 << n_bits) - 1;
			
		}
		
		// ----------------------------------------------------------------------------
		// Return the next pixel from the image
		// ----------------------------------------------------------------------------
		
		var nextPixel = function nextPixel()/*int*/
		{
			
			if (remaining == 0) return EOF;
			
			--remaining;
			
			var pix/*Number*/ = pixAry[curPixel++];
			
			return pix & 0xff;
			
		}
		
		var output = function output(code/*int*/, outs/*ByteArray*/)/*void*/
		
		{
			cur_accum &= masks[cur_bits];
			
			if (cur_bits > 0) cur_accum |= (code << cur_bits);
			else cur_accum = code;
			
			cur_bits += n_bits;
			
			while (cur_bits >= 8)
			
			{
				
				char_out((cur_accum & 0xff), outs);
				cur_accum >>= 8;
				cur_bits -= 8;
				
			}
			
			// If the next entry is going to be too big for the code size,
			// then increase it, if possible.
			
			if (free_ent > maxcode || clear_flg)
			{
				
				if (clear_flg)
				{
					
					maxcode = MAXCODE(n_bits = g_init_bits);
					clear_flg = false;
					
				} else
				{
					
					++n_bits;
					
					if (n_bits == maxbits) maxcode = maxmaxcode;
					
					else maxcode = MAXCODE(n_bits);
					
				}
				
			}
			
			if (code == EOFCode) 
			{
				
				// At EOF, write the rest of the buffer.
				while (cur_bits > 0) 
				{
					
					char_out((cur_accum & 0xff), outs);
					cur_accum >>= 8;
					cur_bits -= 8;
				}
				
				
				flush_char(outs);
				
			}
			
		}
		LZWEncoder.apply(this, arguments);
	   return exports;
	}
	

//////////File Source js/jsgif/NeuQuant.js
/*
* NeuQuant Neural-Net Quantization Algorithm
* ------------------------------------------
* 
* Copyright (c) 1994 Anthony Dekker
* 
* NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
* "Kohonen neural networks for optimal colour quantization" in "Network:
* Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
* the algorithm.
* 
* Any party obtaining a copy of these files from the author, directly or
* indirectly, is granted, free of charge, a full and unrestricted irrevocable,
* world-wide, paid up, royalty-free, nonexclusive right and license to deal in
* this software and documentation files (the "Software"), including without
* limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons who
* receive copies from any such party to do so, with the only requirement being
* that this copyright notice remain intact.
*/
 
/**
* This class handles Neural-Net quantization algorithm
* @author Kevin Weiner (original Java version - kweiner@fmsware.com)
* @author Thibault Imbert (AS3 version - bytearray.org)
* @version 0.1 AS3 implementation
*/

	//import flash.utils.ByteArray;
	
	NeuQuant = function()
	{
	    var exports = {};
		/*private_static*/ var netsize/*int*/ = 256; /* number of colours used */
		
		/* four primes near 500 - assume no image has a length so large */
		/* that it is divisible by all four primes */
		
		/*private_static*/ var prime1/*int*/ = 499;
		/*private_static*/ var prime2/*int*/ = 491;
		/*private_static*/ var prime3/*int*/ = 487;
		/*private_static*/ var prime4/*int*/ = 503;
		/*private_static*/ var minpicturebytes/*int*/ = (3 * prime4);
		
		/* minimum size for input image */
		/*
		* Program Skeleton ---------------- [select samplefac in range 1..30] [read
		* image from input file] pic = (unsigned char*) malloc(3*width*height);
		* initnet(pic,3*width*height,samplefac); learn(); unbiasnet(); [write output
		* image header, using writecolourmap(f)] inxbuild(); write output image using
		* inxsearch(b,g,r)
		*/

		/*
		* Network Definitions -------------------
		*/
		
		/*private_static*/ var maxnetpos/*int*/ = (netsize - 1);
		/*private_static*/ var netbiasshift/*int*/ = 4; /* bias for colour values */
		/*private_static*/ var ncycles/*int*/ = 100; /* no. of learning cycles */
		
		/* defs for freq and bias */
		/*private_static*/ var intbiasshift/*int*/ = 16; /* bias for fractions */
		/*private_static*/ var intbias/*int*/ = (1 << intbiasshift);
		/*private_static*/ var gammashift/*int*/ = 10; /* gamma = 1024 */
		/*private_static*/ var gamma/*int*/ = (1 << gammashift);
		/*private_static*/ var betashift/*int*/ = 10;
		/*private_static*/ var beta/*int*/ = (intbias >> betashift); /* beta = 1/1024 */
		/*private_static*/ var betagamma/*int*/ = (intbias << (gammashift - betashift));
		
		/* defs for decreasing radius factor */
		/*private_static*/ var initrad/*int*/ = (netsize >> 3); /*
	                                                         * for 256 cols, radius
	                                                         * starts
	                                                         */
															 
		/*private_static*/ var radiusbiasshift/*int*/ = 6; /* at 32.0 biased by 6 bits */
		/*private_static*/ var radiusbias/*int*/ = (1 << radiusbiasshift);
		/*private_static*/ var initradius/*int*/ = (initrad * radiusbias); /*
	                                                                   * and
	                                                                   * decreases
	                                                                   * by a
	                                                                   */
																	   
		/*private_static*/ var radiusdec/*int*/ = 30; /* factor of 1/30 each cycle */
		
		/* defs for decreasing alpha factor */
		/*private_static*/ var alphabiasshift/*int*/ = 10; /* alpha starts at 1.0 */
		/*private_static*/ var initalpha/*int*/ = (1 << alphabiasshift);
		/*private*/ var alphadec/*int*/ /* biased by 10 bits */
		
		/* radbias and alpharadbias used for radpower calculation */
		/*private_static*/ var radbiasshift/*int*/ = 8;
		/*private_static*/ var radbias/*int*/ = (1 << radbiasshift);
		/*private_static*/ var alpharadbshift/*int*/ = (alphabiasshift + radbiasshift);
		
		/*private_static*/ var alpharadbias/*int*/ = (1 << alpharadbshift);
		
		/*
		* Types and Global Variables --------------------------
		*/
		
		/*private*/ var thepicture/*ByteArray*//* the input image itself */
		/*private*/ var lengthcount/*int*/; /* lengthcount = H*W*3 */
		/*private*/ var samplefac/*int*/; /* sampling factor 1..30 */
		
		// typedef int pixel[4]; /* BGRc */
		/*private*/ var network/*Array*/; /* the network itself - [netsize][4] */
		/*protected*/ var netindex/*Array*/ = new Array();
		
		/* for network lookup - really 256 */
		/*private*/ var bias/*Array*/ = new Array();
		
		/* bias and freq arrays for learning */
		/*private*/ var freq/*Array*/ = new Array();
		/*private*/ var radpower/*Array*/ = new Array();
		
		var NeuQuant = exports.NeuQuant = function NeuQuant(thepic/*ByteArray*/, len/*int*/, sample/*int*/)
		{
			
			var i/*int*/;
			var p/*Array*/;
			
			thepicture = thepic;
			lengthcount = len;
			samplefac = sample;
			
			network = new Array(netsize);
			
			for (i = 0; i < netsize; i++)
			{
				
				network[i] = new Array(4);
				p = network[i];
				p[0] = p[1] = p[2] = (i << (netbiasshift + 8)) / netsize;
				freq[i] = intbias / netsize; /* 1/netsize */
				bias[i] = 0;
			}
			
		}
		
		var colorMap = function colorMap()/*ByteArray*/
		{
			
			var map/*ByteArray*/ = [];
		    var index/*Array*/ = new Array(netsize);
		    for (var i/*int*/ = 0; i < netsize; i++)
		      index[network[i][3]] = i;
		    var k/*int*/ = 0;
		    for (var l/*int*/ = 0; l < netsize; l++) {
		      var j/*int*/ = index[l];
		      map[k++] = (network[j][0]);
		      map[k++] = (network[j][1]);
		      map[k++] = (network[j][2]);
		    }
		    return map;
			
		}
		
		/*
	   * Insertion sort of network and building of netindex[0..255] (to do after
	   * unbias)
	   * -------------------------------------------------------------------------------
	   */
	   
	   var inxbuild = function inxbuild()/*void*/
	   {
		   
		  var i/*int*/;
		  var j/*int*/;
		  var smallpos/*int*/;
		  var smallval/*int*/;
		  var p/*Array*/;
		  var q/*Array*/;
		  var previouscol/*int*/
		  var startpos/*int*/
		  
		  previouscol = 0;
		  startpos = 0;
		  for (i = 0; i < netsize; i++)
		  {
			  
			  p = network[i];
			  smallpos = i;
			  smallval = p[1]; /* index on g */
			  /* find smallest in i..netsize-1 */
			  for (j = i + 1; j < netsize; j++)
			  {
				  q = network[j];
				  if (q[1] < smallval)
				  { /* index on g */
				  
					smallpos = j;
					smallval = q[1]; /* index on g */
				}
			  }
			  
			  q = network[smallpos];
			  /* swap p (i) and q (smallpos) entries */
			  
			  if (i != smallpos)
			  {
				  
				  j = q[0];
				  q[0] = p[0];
				  p[0] = j;
				  j = q[1];
				  q[1] = p[1];
				  p[1] = j;
				  j = q[2];
				  q[2] = p[2];
				  p[2] = j;
				  j = q[3];
				  q[3] = p[3];
				  p[3] = j;
				  
			  }
			  
			  /* smallval entry is now in position i */
			  
			  if (smallval != previouscol)
			  
			  {
				  
				netindex[previouscol] = (startpos + i) >> 1;
				  
				for (j = previouscol + 1; j < smallval; j++) netindex[j] = i;
				  
				previouscol = smallval;
				startpos = i;
				
			  }
			  
			}
			
			netindex[previouscol] = (startpos + maxnetpos) >> 1;
			for (j = previouscol + 1; j < 256; j++) netindex[j] = maxnetpos; /* really 256 */
			
	   }
	   
	   /*
	   * Main Learning Loop ------------------
	   */
	   
	   var learn = function learn()/*void*/ 
	   
	   {
		   
		   var i/*int*/;
		   var j/*int*/;
		   var b/*int*/;
		   var g/*int*/
		   var r/*int*/;
		   var radius/*int*/;
		   var rad/*int*/;
		   var alpha/*int*/;
		   var step/*int*/;
		   var delta/*int*/;
		   var samplepixels/*int*/;
		   var p/*ByteArray*/;
		   var pix/*int*/;
		   var lim/*int*/;
		   
		   if (lengthcount < minpicturebytes) samplefac = 1;
		   
		   alphadec = 30 + ((samplefac - 1) / 3);
		   p = thepicture;
		   pix = 0;
		   lim = lengthcount;
		   samplepixels = lengthcount / (3 * samplefac);
		   delta = (samplepixels / ncycles) | 0;
		   alpha = initalpha;
		   radius = initradius;
		   
		   rad = radius >> radiusbiasshift;
		   if (rad <= 1) rad = 0;
		   
		   for (i = 0; i < rad; i++) radpower[i] = alpha * (((rad * rad - i * i) * radbias) / (rad * rad));
		   
		   
		   if (lengthcount < minpicturebytes) step = 3;
		   
		   else if ((lengthcount % prime1) != 0) step = 3 * prime1;
		   
		   else
		   
		   {
			   
			   if ((lengthcount % prime2) != 0) step = 3 * prime2;
			   
			   else
			   
			   {
				   
				   if ((lengthcount % prime3) != 0) step = 3 * prime3;
				   
				   else step = 3 * prime4;
				   
			   }
			   
		   }
		   
		   i = 0;
		   
		   while (i < samplepixels)
		   
		   {
			   
			   b = (p[pix + 0] & 0xff) << netbiasshift;
			   g = (p[pix + 1] & 0xff) << netbiasshift;
			   r = (p[pix + 2] & 0xff) << netbiasshift;
			   j = contest(b, g, r);
			   
			   altersingle(alpha, j, b, g, r);
			   
			   if (rad != 0) alterneigh(rad, j, b, g, r); /* alter neighbours */
			   
			   pix += step;
			   
			   if (pix >= lim) pix -= lengthcount;
			   
			   i++;
			   
			   if (delta == 0) delta = 1;
			   
			   if (i % delta == 0)
			   
			   {
				   
				   alpha -= alpha / alphadec;
				   radius -= radius / radiusdec;
				   rad = radius >> radiusbiasshift;
				   
				   if (rad <= 1) rad = 0;
				   
				   for (j = 0; j < rad; j++) radpower[j] = alpha * (((rad * rad - j * j) * radbias) / (rad * rad));
				   
			   }
			   
		   }
		   
	   }
	   
	   /*
	   ** Search for BGR values 0..255 (after net is unbiased) and return colour
	   * index
	   * ----------------------------------------------------------------------------
	   */
	   
	   var map = exports.map = function map(b/*int*/, g/*int*/, r/*int*/)/*int*/
	  
	   {
		   
		   var i/*int*/;
		   var j/*int*/;
		   var dist/*int*/
		   var a/*int*/;
		   var bestd/*int*/;
		   var p/*Array*/;
		   var best/*int*/;
		   
		   bestd = 1000; /* biggest possible dist is 256*3 */
		   best = -1;
		   i = netindex[g]; /* index on g */
		   j = i - 1; /* start at netindex[g] and work outwards */
	
	    while ((i < netsize) || (j >= 0))
		
		{
			
			if (i < netsize)
			
			{
				
				p = network[i];
				
				dist = p[1] - g; /* inx key */
				
				if (dist >= bestd) i = netsize; /* stop iter */
				
				else
				
				{
					
					i++;
					
					if (dist < 0) dist = -dist;
					
					a = p[0] - b;
					
					if (a < 0) a = -a;
					
					dist += a;
					
					if (dist < bestd)
					
					{
						
						a = p[2] - r;
						
						if (a < 0) a = -a;
						
						dist += a;
						
						if (dist < bestd)
						
						{
							
							bestd = dist;
							best = p[3];
							
						}
						
					}
					
				}
				
			}
		  
	      if (j >= 0)
		  {
			  
			  p = network[j];
			  
			  dist = g - p[1]; /* inx key - reverse dif */
			  
			  if (dist >= bestd) j = -1; /* stop iter */
			  
			  else 
			  {
				  
				  j--;
				  if (dist < 0) dist = -dist;
				  a = p[0] - b;
				  if (a < 0) a = -a;
				  dist += a;
				  
				  if (dist < bestd)
				  
				  {
					  
					  a = p[2] - r;
					  if (a < 0)a = -a;
					  dist += a;
					  if (dist < bestd)
					  {
						  bestd = dist;
						  best = p[3];
					  }
					  
				  }
				  
			  }
			  
		  }
		  
		}
		
	    return (best);
		
	  }
	  
	  var process = exports.process = function process()/*ByteArray*/
	  {
	   
	    learn();
	    unbiasnet();
	    inxbuild();
	    return colorMap();
		
	  }
	  
	  /*
	  * Unbias network to give byte values 0..255 and record position i to prepare
	  * for sort
	  * -----------------------------------------------------------------------------------
	  */
	  
	  var unbiasnet = function unbiasnet()/*void*/
	  
	  {
	
	    var i/*int*/;
	    var j/*int*/;
	
	    for (i = 0; i < netsize; i++)
		{
	      network[i][0] >>= netbiasshift;
	      network[i][1] >>= netbiasshift;
	      network[i][2] >>= netbiasshift;
	      network[i][3] = i; /* record colour no */
	    }
		
	  }
	  
	  /*
	  * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in
	  * radpower[|i-j|]
	  * ---------------------------------------------------------------------------------
	  */
	  
	  var alterneigh = function alterneigh(rad/*int*/, i/*int*/, b/*int*/, g/*int*/, r/*int*/)/*void*/
	  
	  {
		  
		  var j/*int*/;
		  var k/*int*/;
		  var lo/*int*/;
		  var hi/*int*/;
		  var a/*int*/;
		  var m/*int*/;
		  
		  var p/*Array*/;
		  
		  lo = i - rad;
		  if (lo < -1) lo = -1;
		  
		  hi = i + rad;
		  
		  if (hi > netsize) hi = netsize;
		  
		  j = i + 1;
		  k = i - 1;
		  m = 1;
		  
		  while ((j < hi) || (k > lo))
		  
		  {
			  
			  a = radpower[m++];
			  
			  if (j < hi)
			  
			  {
				  
				  p = network[j++];
				  
				  try {
					  
					  p[0] -= (a * (p[0] - b)) / alpharadbias;
					  p[1] -= (a * (p[1] - g)) / alpharadbias;
					  p[2] -= (a * (p[2] - r)) / alpharadbias;
					  
					  } catch (e/*Error*/) {} // prevents 1.3 miscompilation
					  
				}
				
				if (k > lo)
				
				{
					
					p = network[k--];
					
					try
					{
						
						p[0] -= (a * (p[0] - b)) / alpharadbias;
						p[1] -= (a * (p[1] - g)) / alpharadbias;
						p[2] -= (a * (p[2] - r)) / alpharadbias;
						
					} catch (e/*Error*/) {}
					
				}
				
		  }
		  
	  }
	  
	  /*
	  * Move neuron i towards biased (b,g,r) by factor alpha
	  * ----------------------------------------------------
	  */
	  
	  var altersingle = function altersingle(alpha/*int*/, i/*int*/, b/*int*/, g/*int*/, r/*int*/)/*void*/ 
	  {
		  
		  /* alter hit neuron */
		  var n/*Array*/ = network[i];
		  n[0] -= (alpha * (n[0] - b)) / initalpha;
		  n[1] -= (alpha * (n[1] - g)) / initalpha;
		  n[2] -= (alpha * (n[2] - r)) / initalpha;
		
	  }
	  
	  /*
	  * Search for biased BGR values ----------------------------
	  */
	  
	  var contest = function contest(b/*int*/, g/*int*/, r/*int*/)/*int*/
	  {
		  
		  /* finds closest neuron (min dist) and updates freq */
		  /* finds best neuron (min dist-bias) and returns position */
		  /* for frequently chosen neurons, freq[i] is high and bias[i] is negative */
		  /* bias[i] = gamma*((1/netsize)-freq[i]) */
		  
		  var i/*int*/;
		  var dist/*int*/;
		  var a/*int*/;
		  var biasdist/*int*/;
		  var betafreq/*int*/;
		  var bestpos/*int*/;
		  var bestbiaspos/*int*/;
		  var bestd/*int*/;
		  var bestbiasd/*int*/;
		  var n/*Array*/;
		  
		  bestd = ~(1 << 31);
		  bestbiasd = bestd;
		  bestpos = -1;
		  bestbiaspos = bestpos;
		  
		  for (i = 0; i < netsize; i++)
		  
		  {
			  
			  n = network[i];
			  dist = n[0] - b;
			  
			  if (dist < 0) dist = -dist;
			  
			  a = n[1] - g;
			  
			  if (a < 0) a = -a;
			  
			  dist += a;
			  
			  a = n[2] - r;
			  
			  if (a < 0) a = -a;
			  
			  dist += a;
			  
			  if (dist < bestd)
			  
			  {
				  
				  bestd = dist;
				  bestpos = i;
				  
			  }
			  
			  biasdist = dist - ((bias[i]) >> (intbiasshift - netbiasshift));
			  
			  if (biasdist < bestbiasd)
			  
			  {
				  
				  bestbiasd = biasdist;
				  bestbiaspos = i;
				  
			  }
			  
			  betafreq = (freq[i] >> betashift);
			  freq[i] -= betafreq;
			  bias[i] += (betafreq << gammashift);
			  
		  }
		  
		  freq[bestpos] += beta;
		  bias[bestpos] -= betagamma;
		  return (bestbiaspos);
		  
	  }
	  
	  NeuQuant.apply(this, arguments);
	  return exports;
	}

//////////File Source js/jsgif/GIFEncoder.js
/**
* This class lets you encode animated GIF files
* Base class :  http://www.java2s.com/Code/Java/2D-Graphics-GUI/AnimatedGifEncoder.htm
* @author Kevin Weiner (original Java version - kweiner@fmsware.com)
* @author Thibault Imbert (AS3 version - bytearray.org)
* @version 0.1 AS3 implementation
*/


	//import flash.utils.ByteArray;
	//import flash.display.BitmapData;
	//import flash.display.Bitmap;
	//import org.bytearray.gif.encoder.NeuQuant
	//import flash.net.URLRequestHeader;
	//import flash.net.URLRequestMethod;
	//import flash.net.URLRequest;
	//import flash.net.navigateToURL;
	
	GIFEncoder = function()
	{
	    for(var i = 0, chr = {}; i < 256; i++)
        chr[i] = String.fromCharCode(i);
        
      function ByteArray(){
        this.bin = [];
      }

      ByteArray.prototype.getData = function(){
        
	      for(var v = '', l = this.bin.length, i = 0; i < l; i++)
          v += chr[this.bin[i]];
        return v;
      }
      ByteArray.prototype.writeByte = function(val){
        this.bin.push(val);
      }
      ByteArray.prototype.writeUTFBytes = function(string){
        for(var l = string.length, i = 0; i < l; i++)
          this.writeByte(string.charCodeAt(i));
      }
      ByteArray.prototype.writeBytes = function(array, offset, length){
        for(var l = length || array.length, i = offset||0; i < l; i++)
          this.writeByte(array[i]);
      }
	
	    var exports = {};
		/*private*/ var width/*int*/ // image size
  		/*private*/ var height/*int*/;
	    /*private*/ var transparent/***/ = null; // transparent color if given
	    /*private*/ var transIndex/*int*/; // transparent index in color table
	    /*private*/ var repeat/*int*/ = -1; // no repeat
	    /*private*/ var delay/*int*/ = 0; // frame delay (hundredths)
	    /*private*/ var started/*Boolean*/ = false; // ready to output frames
	    /*private*/ var out/*ByteArray*/;
	    /*private*/ var image/*Bitmap*/; // current frame
	    /*private*/ var pixels/*ByteArray*/; // BGR byte array from frame
	    /*private*/ var indexedPixels/*ByteArray*/ // converted frame indexed to palette
	    /*private*/ var colorDepth/*int*/; // number of bit planes
	    /*private*/ var colorTab/*ByteArray*/; // RGB palette
	    /*private*/ var usedEntry/*Array*/ = new Array; // active palette entries
	    /*private*/ var palSize/*int*/ = 7; // color table size (bits-1)
	    /*private*/ var dispose/*int*/ = -1; // disposal code (-1 = use default)
	    /*private*/ var closeStream/*Boolean*/ = false; // close stream when finished
	    /*private*/ var firstFrame/*Boolean*/ = true;
	    /*private*/ var sizeSet/*Boolean*/ = false; // if false, get size from first frame
	    /*private*/ var sample/*int*/ = 10; // default sample interval for quantizer
		
		/**
		* Sets the delay time between each frame, or changes it for subsequent frames
		* (applies to last frame added)
		* int delay time in milliseconds
		* @param ms
		*/
		
		var setDelay = exports.setDelay = function setDelay(ms/*int*/)/*void*/
		{
			
			delay = Math.round(ms / 10);
			
		}
		
		/**
		* Sets the GIF frame disposal code for the last added frame and any
		* 
		* subsequent frames. Default is 0 if no transparent color has been set,
		* otherwise 2.
		* @param code
		* int disposal code.
		*/
		
		var setDispose = exports.setDispose = function setDispose(code/*int*/)/*void*/ 
		{
			
			if (code >= 0) dispose = code;
			
		}
		
		/**
		* Sets the number of times the set of GIF frames should be played. Default is
		* 1; 0 means play indefinitely. Must be invoked before the first image is
		* added.
		* 
		* @param iter
		* int number of iterations.
		* @return
		*/
		
		var setRepeat = exports.setRepeat = function setRepeat(iter/*int*/)/*void*/ 
		{
			
			if (iter >= 0) repeat = iter;
			
		}
		
		/**
		* Sets the transparent color for the last added frame and any subsequent
		* frames. Since all colors are subject to modification in the quantization
		* process, the color in the final palette for each frame closest to the given
		* color becomes the transparent color for that frame. May be set to null to
		* indicate no transparent color.
		* @param
		* Color to be treated as transparent on display.
		*/
		
		var setTransparent = exports.setTransparent = function setTransparent(c/*Number*/)/*void*/
		{
			
			transparent = c;
			
		}
		
		/**
		* The addFrame method takes an incoming BitmapData object to create each frames
		* @param
		* BitmapData object to be treated as a GIF's frame
		*/
		
		var addFrame = exports.addFrame = function addFrame(im/*BitmapData*/, is_imageData)/*Boolean*/
		{
			
			if ((im == null) || !started || out == null) 
			{
				throw new Error ("Please call start method before calling addFrame");
//				return false;
			}
			
		    var ok/*Boolean*/ = true;
			
		    try {
				if(!is_imageData){
				  image = im.getImageData(0,0, im.canvas.width, im.canvas.height).data;
				  if (!sizeSet) setSize(im.canvas.width, im.canvas.height);
				}else{
				  image = im;
				}
				getImagePixels(); // convert to correct format if necessary
				analyzePixels(); // build color table & map pixels
				
				if (firstFrame) 
				{
					writeLSD(); // logical screen descriptior
					writePalette(); // global color table
					if (repeat >= 0) 
					{
						// use NS app extension to indicate reps
						writeNetscapeExt();
					}
		      }
			  
			  writeGraphicCtrlExt(); // write graphic control extension
		      writeImageDesc(); // image descriptor
		      if (!firstFrame) writePalette(); // local color table
		      writePixels(); // encode and write pixel data
		      firstFrame = false;
		    } catch (e/*Error*/) {
		      ok = false;
		    }
		    
			return ok;
			
		}
		
		/**
		* Adds final trailer to the GIF stream, if you don't call the finish method
		* the GIF stream will not be valid.
		*/
		
		var finish = exports.finish = function finish()/*Boolean*/
		{
		    if (!started) return false;
		    var ok/*Boolean*/ = true;
		    started = false;
		    try {
		      out.writeByte(0x3b); // gif trailer
		    } catch (e/*Error*/) {
		      ok = false;
		    }
	
		    return ok;
			
		}
		
		/**
		* Resets some members so that a new stream can be started.
		* This method is actually called by the start method
		*/
		
		var reset = function reset ( )/*void*/
		{
			
			// reset for subsequent use
			transIndex = 0;
			image = null;
		    pixels = null;
		    indexedPixels = null;
		    colorTab = null;
		    closeStream = false;
		    firstFrame = true;
			
		}

		/**
		* * Sets frame rate in frames per second. Equivalent to
		* <code>setDelay(1000/fps)</code>.
		* @param fps
		* float frame rate (frames per second)         
		*/
		
		var setFrameRate = exports.setFrameRate = function setFrameRate(fps/*Number*/)/*void*/ 
		{
			
			if (fps != 0xf) delay = Math.round(100/fps);
			
		}
		
		/**
		* Sets quality of color quantization (conversion of images to the maximum 256
		* colors allowed by the GIF specification). Lower values (minimum = 1)
		* produce better colors, but slow processing significantly. 10 is the
		* default, and produces good color mapping at reasonable speeds. Values
		* greater than 20 do not yield significant improvements in speed.
		* @param quality
		* int greater than 0.
		* @return
		*/
		
		var setQuality = exports.setQuality = function setQuality(quality/*int*/)/*void*/
		{
			
		    if (quality < 1) quality = 1;
		    sample = quality;
			
		}
		
		/**
		* Sets the GIF frame size. The default size is the size of the first frame
		* added if this method is not invoked.
		* @param w
		* int frame width.
		* @param h
		* int frame width.
		*/
		
		var setSize = exports.setSize = function setSize(w/*int*/, h/*int*/)/*void*/
		{
			
			if (started && !firstFrame) return;
		    width = w;
		    height = h;
		    if (width < 1)width = 320;
		    if (height < 1)height = 240;
		    sizeSet = true
			
		}
		
		/**
		* Initiates GIF file creation on the given stream.
		* @param os
		* OutputStream on which GIF images are written.
		* @return false if initial write failed.
		* 
		*/
		
		var start = exports.start = function start()/*Boolean*/
		{
			
			reset(); 
		    var ok/*Boolean*/ = true;
		    closeStream = false;
		    out = new ByteArray;
		    try {
		      out.writeUTFBytes("GIF89a"); // header
		    } catch (e/*Error*/) {
		      ok = false;
		    }
			
		    return started = ok;
			
		}
		
		var cont = exports.cont = function cont()/*Boolean*/
		{
			
		    reset(); 
		    var ok/*Boolean*/ = true;
		    closeStream = false;
		    out = new ByteArray;
			
		    return started = ok;
			
		}
		
		/**
		* Analyzes image colors and creates color map.
		*/
		
		var analyzePixels = function analyzePixels()/*void*/
		{
		    
		    var len/*int*/ = pixels.length;
		    var nPix/*int*/ = len / 3;
		    indexedPixels = [];
		    var initColorTab = new Set();
		    var k = 0;
		    for (var j = 0; j < nPix; j++) {
			initColorTab.add(((pixels[k++] & 0xff) << 16) + ((pixels[k++] & 0xff) << 8) + (pixels[k++] & 0xff));
			if (initColorTab.length > 256)
			    break;
		    }
		    if (initColorTab.length > 256) {
			palSize = 7;
			var nq/*NeuQuant*/ = new NeuQuant(pixels, len, sample);
			// initialize quantizer
			colorTab = nq.process(); // create reduced palette
			// map image pixels to new palette
			k/*int*/ = 0;
			for (var j/*int*/ = 0; j < nPix; j++) {
			    var index/*int*/ = nq.map(pixels[k++] & 0xff, pixels[k++] & 0xff, pixels[k++] & 0xff);
			    usedEntry[index] = true;
			    indexedPixels[j] = index;
			}
		    } else {
			colorTab = Array.from(initColorTab);
			k = 0;
			for (var j/*int*/ = 0; j < nPix; j++) {
			    var index/*int*/ = colorTab.indexOf(((pixels[k++] & 0xff) << 16) + ((pixels[k++] & 0xff) << 8) + (pixels[k++] & 0xff));
			    usedEntry[index] = true;
			    indexedPixels[j] = index;
			}
			var doConcat = function doConcat(prev, curr, cIndex, cArray) { return prev.concat((curr >>> 16),(curr >>> 8) & 0xff,curr & 0xff); }
			colorTab = colorTab.reduce(doConcat, []);
			palSize = Math.ceil(Math.log2(colorTab.length / 3)) - 1;
		    }
		    pixels = null;
		    colorDepth = 8;
		    // get closest match to transparent color if specified
		    if (transparent != null) {
			transIndex = findClosest(transparent);
		    }
		}
		
		/**
		* Returns index of palette color closest to c
		*
		*/
		
		var findClosest = function findClosest(c/*Number*/)/*int*/
		{
			
			if (colorTab == null) return -1;
		    var r/*int*/ = (c & 0xFF0000) >> 16;
		    var g/*int*/ = (c & 0x00FF00) >> 8;
		    var b/*int*/ = (c & 0x0000FF);
		    var minpos/*int*/ = 0;
		    var dmin/*int*/ = 256 * 256 * 256;
		    var len/*int*/ = colorTab.length;
			
		    for (var i/*int*/ = 0; i < len;) {
		      var dr/*int*/ = r - (colorTab[i++] & 0xff);
		      var dg/*int*/ = g - (colorTab[i++] & 0xff);
		      var db/*int*/ = b - (colorTab[i] & 0xff);
		      var d/*int*/ = dr * dr + dg * dg + db * db;
		      var index/*int*/ = i / 3;
		      if (usedEntry[index] && (d < dmin)) {
		        dmin = d;
		        minpos = index;
		      }
		      i++;
		    }
		    return minpos;
			
		}
		
		/**
		* Extracts image pixels into byte array "pixels
		*/
		
		var getImagePixels = function getImagePixels()/*void*/
		{
		    
		    var w/*int*/ = width;
		    var h/*int*/ = height;
		    pixels = [];
  			var data = image;
		    var count/*int*/ = 0;
		    
		    for ( var i/*int*/ = 0; i < h; i++ )
		    {
		    	
		    	for (var j/*int*/ = 0; j < w; j++ )
		    	{
		    		
	        		var b = (i*w*4)+j*4;
	        		pixels[count++] = data[b];
	        		pixels[count++] = data[b+1];
	        		pixels[count++] = data[b+2];
		    		
		    	}
		    	
		    }
		    
		}
		
		/**
		* Writes Graphic Control Extension
		*/
		
		var writeGraphicCtrlExt = function writeGraphicCtrlExt()/*void*/
		{
			out.writeByte(0x21); // extension introducer
		    out.writeByte(0xf9); // GCE label
		    out.writeByte(4); // data block size
		    var transp/*int*/
		    var disp/*int*/;
		    if (transparent == null) {
		      transp = 0;
		      disp = 0; // dispose = no action
		    } else {
		      transp = 1;
		      disp = 2; // force clear if using transparent color
		    }
		    if (dispose >= 0) {
		      disp = dispose & 7; // user override
		    }
		    disp <<= 2;
		    // packed fields
		    out.writeByte(0 | // 1:3 reserved
		        disp | // 4:6 disposal
		        0 | // 7 user input - 0 = none
		        transp); // 8 transparency flag
		
		    WriteShort(delay); // delay x 1/100 sec
		    out.writeByte(transIndex); // transparent color index
		    out.writeByte(0); // block terminator
			
		}
		  
		/**
		* Writes Image Descriptor
		*/
		
		var writeImageDesc = function writeImageDesc()/*void*/
		{
		  	
		    out.writeByte(0x2c); // image separator
		   	WriteShort(0); // image position x,y = 0,0
		    WriteShort(0);
		    WriteShort(width); // image size
		    WriteShort(height);

		    // packed fields
		    if (firstFrame) {
		      // no LCT - GCT is used for first (or only) frame
		      out.writeByte(0);
		    } else {
		      // specify normal LCT
		      out.writeByte(0x80 | // 1 local color table 1=yes
		          0 | // 2 interlace - 0=no
		          0 | // 3 sorted - 0=no
		          0 | // 4-5 reserved
		          palSize); // 6-8 size of color table
		    }
		}
		
		/**
		* Writes Logical Screen Descriptor
		*/
		
		var writeLSD = function writeLSD()/*void*/
		{
			
			// logical screen size
		    WriteShort(width);
		    WriteShort(height);
		    // packed fields
		    out.writeByte((0x80 | // 1 : global color table flag = 1 (gct used)
		        0x70 | // 2-4 : color resolution = 7
		        0x00 | // 5 : gct sort flag = 0
		        palSize)); // 6-8 : gct size
		
		    out.writeByte(0); // background color index
		    out.writeByte(0); // pixel aspect ratio - assume 1:1
			
		}
		
		/**
		* Writes Netscape application extension to define repeat count.
		*/
		
		var writeNetscapeExt = function writeNetscapeExt()/*void*/
		{
			
		    out.writeByte(0x21); // extension introducer
		    out.writeByte(0xff); // app extension label
		    out.writeByte(11); // block size
		    out.writeUTFBytes("NETSCAPE" + "2.0"); // app id + auth code
		    out.writeByte(3); // sub-block size
		    out.writeByte(1); // loop sub-block id
		    WriteShort(repeat); // loop count (extra iterations, 0=repeat forever)
		    out.writeByte(0); // block terminator
		
		}
		
		/**
		* Writes color table
		*/
		
		var writePalette = function writePalette()/*void*/
		{
		    out.writeBytes(colorTab);
		    var n/*int*/ = (3 * Math.pow(2,palSize+1)) - colorTab.length;
		    for (var i/*int*/ = 0; i < n; i++) out.writeByte(0);
			
		}
		
		var WriteShort = function WriteShort (pValue/*int*/)/*void*/
		{  	
			
		  	out.writeByte( pValue & 0xFF );
		  	out.writeByte( (pValue >> 8) & 0xFF);
			
		}
		
		/**
		* Encodes and writes pixel data
		*/
		
		var writePixels = function writePixels()/*void*/
		{
			
		    var myencoder/*LZWEncoder*/ = new LZWEncoder(width, height, indexedPixels, colorDepth);
		    myencoder.encode(out);
			
		}
		
		/**
		* retrieves the GIF stream
		*/
		var stream = exports.stream = function stream ( )/*ByteArray*/
		{
			
			return out; 
			
		}
		
		var setProperties = exports.setProperties = function setProperties(has_start, is_first){
		  started = has_start;
		  firstFrame = is_first;
		  //out = new ByteArray; //??
		}
		
		return exports
		  
	}

//////////File Source js/debug.js
var canSetHTMLColors=false;
var canDump=true;
var canYoutube=false;
var inputHistory=[];
var compiledText;
var canOpenEditor=true;
var IDE=true;

function convertLevelToString() {
	var out = '';
	var seenCells = {};
	var i = 0;
	for (var y = 0; y < level.height; y++) {
		for (var x = 0; x < level.width; x++) {
			var bitmask = level.getCell(x + y * level.width);
			var objs = [];
			for (var bit = 0; bit < 32 * STRIDE_OBJ; ++bit) {
				if (bitmask.get(bit)) {
					objs.push(state.idDict[bit])
				}
			}
			objs.sort();
			objs = objs.join(" ");
			/* replace repeated object combinations with numbers */
			if (!seenCells.hasOwnProperty(objs)) {
				seenCells[objs] = i++;
				out += objs + ":";
			}
			out += seenCells[objs] + ",";
		}
		out += '\n';
	}
	return out;
}

function stripHTMLTags(html_str){
	var div = document.createElement("div");
	div.innerHTML = html_str;
	var text = div.textContent || div.innerText || "";
	return text.trim();
}

function dumpTestCase() {
	//compiler error data
	var levelDat = compiledText;
	var errorStrings_stripped = errorStrings.map(stripHTMLTags);
	var resultarray = [levelDat,errorStrings_stripped,errorCount];
	var resultstring = JSON.stringify(resultarray);
	consolePrint("<br>Compilation error/warning data (for error message tests - errormessage_testdata.js):<br><br><br>"+resultstring+"<br><br><br>",true);

	
	//normal session recording data
	var levelDat = compiledText;
	var input = inputHistory.concat([]);
	var outputDat = convertLevelToString();

	var resultarray = [levelDat,input,outputDat,curlevel,loadedLevelSeed];
	var resultstring = JSON.stringify(resultarray);
	consolePrint("<br>Recorded play session data (for play session tests - testdata.js):<br><br><br>"+resultstring+"<br><br><br>",true);

}

function clearInputHistory() {
	if (canDump===true) {
		inputHistory=[];
	}
}

function pushInput(inp) {
	if (canDump===true) {
		inputHistory.push(inp);
	}
}
//////////File Source js/globalVariables.js
var unitTesting=false;
var curlevel=0;
var curlevelTarget=null;
var hasUsedCheckpoint=false;
var levelEditorOpened=false;
var muted=0;
var runrulesonlevelstart_phase=false;

function doSetupTitleScreenLevelContinue(){
    try {
     	if (!!window.localStorage) { 
    		if (localStorage[document.URL]!==undefined) {
                if (localStorage[document.URL+'_checkpoint']!==undefined){
                    var backupStr = localStorage[document.URL+'_checkpoint'];
                    curlevelTarget = JSON.parse(backupStr);
                    
                    var arr = [];
                    for(var p in Object.keys(curlevelTarget.dat)) {
                        arr[p] = curlevelTarget.dat[p];
                    }
                    curlevelTarget.dat = new Int32Array(arr);

                }
    	        curlevel = localStorage[document.URL];            
    		}
    	}		 
    } catch(ex) {
    }
}

doSetupTitleScreenLevelContinue();


var verbose_logging=false;
var throttle_movement=false;
var cache_console_messages=false;
var quittingTitleScreen=false;
var quittingMessageScreen=false;
var deltatime=17;
var timer=0;
var repeatinterval=150;
var autotick=0;
var autotickinterval=0;
var winning=false;
var againing=false;
window.againing = againing;
var againinterval=150;
var norepeat_action=false;
var oldflickscreendat=[];//used for buffering old flickscreen/scrollscreen positions, in case player vanishes
var keybuffer = [];

var restarting=false;

var messageselected=false;

var textImages={};
var initLevel = {
    width: 5,
    height: 5,
    layerCount: 2,
    dat: [
    1, 3, 3, 1, 1, 2, 2, 3, 3, 1,
    2, 1, 2, 2, 3, 3, 1, 1, 2, 2,
    3, 2, 1, 3, 2, 1, 3, 2, 1, 3,
    1, 3, 3, 1, 1, 2, 2, 3, 3, 1,
    2, 1, 2, 2, 3, 3, 1, 1, 2, 2
    ],
    movementMask:[
    1, 3, 3, 1, 1, 2, 2, 3, 3, 1,
    2, 1, 2, 2, 3, 3, 1, 1, 2, 2,
    3, 2, 1, 3, 2, 1, 3, 2, 1, 3,
    1, 3, 3, 1, 1, 2, 2, 3, 3, 1,
    2, 1, 2, 2, 3, 3, 1, 1, 2, 2
    ],
    rigidGroupIndexMask:[],//[indexgroupNumber, masked by layer arrays]
    rigidMovementAppliedMask:[],//[indexgroupNumber, masked by layer arrays]
    bannedGroup:[],
    colCellContents:[],
    rowCellContents:[]
};

var level = initLevel;

//////////File Source js/font.js

var font = {
    '0':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,1,1],
		[1,0,1,0,1],
		[1,1,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'1':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'2':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,1,1,1,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'3':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[0,0,0,0,1],
		[0,0,1,1,0],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'4':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,1,0],
		[1,1,1,1,1],
		[0,0,0,1,0],
		[0,0,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'5':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,0],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'6':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'7':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'8':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'9':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'a':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'b':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'c':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'd':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'e':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'f':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,1],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'g':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[0,1,1,1,0]
	],
	'h':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'i':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'j':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,0,1,0,0],
		[0,1,0,0,0]
	],
	'k':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,1,0],
		[1,1,1,0,0],
		[1,0,0,1,0],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'l':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'm':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'n':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'o':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'p':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,0,0,0],
		[1,0,0,0,0]
	],
	'q':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[0,0,0,0,1]
	],
	'r':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	's':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	't':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'u':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'v':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,1,0],
		[1,0,1,0,0],
		[1,1,0,0,0],
		[1,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'w':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'x':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'×':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'y':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[1,1,1,1,0]
	],
	'z':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'A':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'B':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'C':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'D':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'E':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'F':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'G':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'H':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'I':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'J':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'K':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,1,0],
		[1,0,1,0,0],
		[1,1,0,0,0],
		[1,0,1,0,0],
		[1,0,0,1,0],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'L':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'M':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'N':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,1,0,0,1],
		[1,0,1,0,1],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'O':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'P':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Q':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,1,0,1],
		[0,1,1,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0]
	],
	'R':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'S':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'T':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'U':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'V':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'W':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'X':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Y':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Z':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'.':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'·':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'•':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,1,1,1,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'…':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,1,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'†':[
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'‡':[
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ƒ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,1],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[0,0,0,0,0]
	],
	'‚':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'„':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,1],
		[1,1,0,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	',':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	';':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	':':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'?':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,1,1,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'¿':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'!':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'¡':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'@':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'£':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,1,0,0,1],
		[1,1,1,0,0],
		[0,1,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'$':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,1,1,1],
		[1,0,1,0,0],
		[0,1,1,1,0],
		[0,0,1,0,1],
		[1,1,1,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0]
	],
	'%':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,0,0,1],
		[1,1,0,1,0],
		[0,0,1,0,0],
		[0,1,0,1,1],
		[1,0,0,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'‰':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,0,0,1],
		[1,1,0,1,0],
		[0,0,1,0,0],
		[0,1,0,1,1],
		[1,0,0,1,1],
		[0,0,0,0,0],
		[0,0,0,1,1],
		[0,0,0,1,1]
	],
	'^':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'&':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[1,0,0,0,0],
		[0,1,0,1,1],
		[1,0,0,1,0],
		[0,1,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'*':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'(':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	')':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'+':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'÷':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'±':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'-':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'–':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'—':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'_':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'=':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	' ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'{':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'}':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'[':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	']':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'\'':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'‘':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'’':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'“':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,0,1,1],
		[1,0,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'”':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,1],
		[1,1,0,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'"':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,1,0,1,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'/':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[1,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'\\':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,1,0],
		[0,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'|':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'¦':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'<':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'‹':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'«':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,1],
		[1,0,0,1,0],
		[0,1,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'>':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'›':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'»':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,1,0],
		[0,1,0,0,1],
		[1,0,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'~':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,0],
		[1,0,1,0,1],
		[0,0,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'˜':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[1,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'`':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'#':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[1,1,1,1,1],
		[0,1,0,1,0],
		[1,1,1,1,1],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'À':[
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Á':[
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Â':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ã':[
		[0,1,0,0,0],
		[1,0,1,0,1],
		[0,0,0,1,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ä':[
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Å':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Æ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,1,0,0],
		[1,0,1,0,0],
		[1,0,1,0,0],
		[1,1,1,1,1],
		[1,0,1,0,0],
		[1,0,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ç':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	'È':[
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'É':[
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ê':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ë':[
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ì':[
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Í':[
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Î':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ï':[
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ð':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[1,1,1,0,1],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ñ':[
		[0,1,0,0,1],
		[1,0,1,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,1,0,0,1],
		[1,0,1,0,1],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ò':[
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ó':[
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ô':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Õ':[
		[0,1,0,0,1],
		[1,0,1,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ö':[
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ø':[
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[0,1,1,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	'Ù':[
		[0,0,0,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ú':[
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Û':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ü':[
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ý':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Þ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,0,0,0],
		[0,0,0,0,0]
	],
	'ß':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,1,1,0],
		[1,0,0,0,0],
		[0,0,0,0,0]
	],
	'ẞ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'à':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'á':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'â':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ã':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,1],
		[1,0,1,1,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ä':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'å':[
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'æ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,1,0,1],
		[1,0,1,1,0],
		[1,0,1,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ç':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	'è':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'é':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ê':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ë':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ì':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'í':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'î':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ï':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ð':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,1,1],
		[0,0,0,1,0],
		[0,1,1,1,0],
		[1,0,0,1,0],
		[1,0,0,1,0],
		[1,0,0,1,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ñ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,1],
		[1,0,1,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ò':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ó':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ô':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'õ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,1],
		[1,0,1,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ö':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ø':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[0,1,1,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	'ù':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,0],
		[0,0,1,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ú':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'û':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ü':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ý':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[1,1,1,1,0]
	],
	'þ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,0,0,0],
		[1,0,0,0,0]
	],
	'ÿ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[1,1,1,1,0]
	],
	'Ā':[
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ā':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ă':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ă':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ą':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,1,0],
		[0,0,0,0,1]
	],
	'ą':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,1,0],
		[0,0,0,0,1]
	],
	'Ć':[
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ć':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ĉ':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ĉ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ċ':[
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ċ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Č':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'č':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ď':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ď':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,1],
		[0,0,1,0,1],
		[0,1,1,0,0],
		[1,0,1,0,0],
		[1,0,1,0,0],
		[1,0,1,0,0],
		[0,1,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Đ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[1,1,1,0,1],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'đ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,1,1],
		[0,0,0,1,0],
		[0,1,1,1,0],
		[1,0,0,1,0],
		[1,0,0,1,0],
		[1,0,0,1,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ē':[
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ē':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ĕ':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ĕ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ė':[
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ė':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ę':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,1,0],
		[0,0,0,0,1]
	],
	'ę':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,1,0],
		[0,0,0,0,1]
	],
	'Ě':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ě':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ĝ':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ĝ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[0,1,1,1,0]
	],
	'Ğ':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ğ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[0,1,1,1,0]
	],
	'Ġ':[
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ġ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[0,1,1,1,0]
	],
	'Ģ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,1,1,0,0]
	],
	'ģ':[
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ĥ':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ĥ':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ħ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[1,1,1,1,1],
		[0,1,0,1,0],
		[0,1,1,1,0],
		[0,1,0,1,0],
		[0,1,0,1,0],
		[0,1,0,1,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ħ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,0],
		[1,1,1,0,0],
		[0,1,0,0,0],
		[0,1,1,1,0],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ĩ':[
		[0,1,0,0,1],
		[1,0,1,1,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ĩ':[
		[0,1,0,1,0],
		[1,0,1,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ī':[
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ī':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ĭ':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ĭ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Į':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,1,0],
		[0,0,0,0,1]
	],
	'į':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,1,0],
		[0,0,0,0,1]
	],
	'İ':[
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ı':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ĳ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,1,0],
		[1,0,0,1,0],
		[1,0,0,1,0],
		[1,0,0,1,0],
		[1,0,0,1,0],
		[1,0,0,1,0],
		[1,0,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ĳ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,1],
		[0,0,0,0,0],
		[1,1,0,0,1],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[1,1,1,0,1],
		[0,0,0,0,1],
		[0,0,0,1,0]
	],
	'Ĵ':[
		[0,0,0,1,0],
		[0,0,1,0,1],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ĵ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,0,1,0,0],
		[0,1,0,0,0]
	],
	'Ķ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,1,0],
		[1,0,1,0,0],
		[1,1,0,0,0],
		[1,0,1,0,0],
		[1,0,0,1,0],
		[1,0,0,0,1],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	'ķ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,1,0],
		[1,1,1,0,0],
		[1,0,0,1,0],
		[1,0,0,0,1],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	'ĸ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,1,0],
		[1,1,1,0,0],
		[1,0,0,1,0],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ĺ':[
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ĺ':[
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ļ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,1,0,0]
	],
	'ļ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,1,0,0]
	],
	'Ľ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,1,0],
		[1,0,0,1,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ľ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,0,1],
		[0,0,1,0,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ŀ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,1,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ŀ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ł':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,0],
		[0,1,0,1,0],
		[0,1,1,0,0],
		[1,1,0,0,0],
		[0,1,0,0,0],
		[0,1,0,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ł':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,1,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ń':[
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[1,0,0,0,1],
		[1,1,0,0,1],
		[1,0,1,0,1],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ń':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ņ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,1,0,0,1],
		[1,0,1,0,1],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	'ņ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	'Ň':[
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[1,0,0,0,1],
		[1,1,0,0,1],
		[1,0,1,0,1],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ň':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ŉ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,0,1,1,0],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[0,1,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ŋ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,1,0,0,1],
		[1,0,1,0,1],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,1,0]
	],
	'ŋ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,1,0]
	],
	'Ō':[
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ō':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ŏ':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ŏ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ő':[
		[0,1,0,0,1],
		[1,0,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ő':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,1],
		[1,0,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Œ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,1,0,0],
		[1,0,1,0,0],
		[1,0,1,1,1],
		[1,0,1,0,0],
		[1,0,1,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'œ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,1,0,1],
		[1,0,1,1,0],
		[1,0,1,0,0],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ŕ':[
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ŕ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ŗ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	'ŗ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	'Ř':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ř':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ś':[
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ś':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ŝ':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ŝ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ş':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0]
	],
	'ş':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	'Š':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'š':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,1,1,1],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[1,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ţ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0]
	],
	'ţ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,1,1],
		[0,0,0,0,0],
		[0,1,1,0,0]
	],
	'Ť':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ť':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,1],
		[0,0,1,0,1],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ŧ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ŧ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,1,0,0],
		[0,0,0,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ũ':[
		[0,1,0,0,1],
		[1,0,1,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ũ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,1],
		[1,0,1,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ū':[
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ū':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ŭ':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ŭ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ů':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ů':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ű':[
		[0,1,0,0,1],
		[1,0,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ű':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,0,1],
		[1,0,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ų':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,1,0,0],
		[0,0,0,1,0]
	],
	'ų':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,1,0],
		[0,0,0,0,1]
	],
	'Ŵ':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ŵ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ŷ':[
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ŷ':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1],
		[0,0,0,0,1],
		[1,1,1,1,0]
	],
	'Ÿ':[
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ź':[
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ź':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ż':[
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ż':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'Ž':[
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ž':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	
	'€':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,1,1],
		[0,1,0,0,0],
		[1,1,1,1,0],
		[0,1,0,0,0],
		[1,1,1,1,0],
		[0,1,0,0,0],
		[0,0,1,1,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	
	'™':[
		[0,0,0,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'¢':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,1,1,1,1],
		[1,0,1,0,0],
		[1,0,1,0,0],
		[1,0,1,0,0],
		[0,1,1,1,1],
		[0,0,1,0,0],
		[0,1,0,0,0]
	],
	
	'¤':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'¥':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,1,0,0],
		[0,1,1,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	
	'§':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'¨':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'©':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,1,1,1],
		[1,0,1,0,1],
		[1,0,1,1,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'®':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,1,1,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'ª':[
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,1,0],
		[0,1,1,1,0],
		[0,1,0,1,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'º':[
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,1,0,1,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	
	'¬':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'¯':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
	'°':[
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	],
}

//////////File Source js/rng.js
/**
 * Seedable random number generator functions.
 * @version 1.0.0
 * @license Public Domain
 *
 * @example
 * var rng = new RNG('Example');
 * rng.random(40, 50);  // =>  42
 * rng.uniform();       // =>  0.7972798995050903
 * rng.normal();        // => -0.6698504543216376
 * rng.exponential();   // =>  1.0547367609131555
 * rng.poisson(4);      // =>  2
 * rng.gamma(4);        // =>  2.781724687386858
 */

/**
 * Get the underlying bytes of this string.
 * @return {Array} An array of bytes
 */
String.prototype.getBytes = function() {
    var output = [];
    for (var i = 0; i < this.length; i++) {
        var c = this.charCodeAt(i);
        var bytes = [];
        do {
            bytes.push(c & 0xFF);
            c = c >> 8;
        } while (c > 0);
        output = output.concat(bytes.reverse());
    }
    return output;
};

/**
 * @param {String} seed A string to seed the generator.
 * @constructor
 */
function RC4(seed) {
    this.s = new Array(256);
    this.i = 0;
    this.j = 0;
    for (var i = 0; i < 256; i++) {
        this.s[i] = i;
    }
    if (seed) {
        this.mix(seed);
    }
}

RC4.prototype._swap = function(i, j) {
    var tmp = this.s[i];
    this.s[i] = this.s[j];
    this.s[j] = tmp;
};

/**
 * Mix additional entropy into this generator.
 * @param {String} seed
 */
RC4.prototype.mix = function(seed) {
    var input = seed.getBytes();
    var j = 0;
    for (var i = 0; i < this.s.length; i++) {
        j += this.s[i] + input[i % input.length];
        j %= 256;
        this._swap(i, j);
    }
};

/**
 * @return {number} The next byte of output from the generator.
 */
RC4.prototype.next = function() {
    this.i = (this.i + 1) % 256;
    this.j = (this.j + this.s[this.i]) % 256;
    this._swap(this.i, this.j);
    return this.s[(this.s[this.i] + this.s[this.j]) % 256];
};

function print_call_stack() {
  var e = new Error();
  var stack = e.stack;
  console.log( stack );
}
/**
 * Create a new random number generator with optional seed. If the
 * provided seed is a function (i.e. Math.random) it will be used as
 * the uniform number generator.
 * @param seed An arbitrary object used to seed the generator.
 * @constructor
 */
function RNG(seed) {
    this.seed = seed;
    if (seed == null) {
        seed = (Math.random() + Date.now()).toString();
        //window.console.log("setting random seed "+seed); 
        //print_call_stack();  

    } else if (typeof seed === 'function') {
        // Use it as a uniform number generator
        this.uniform = seed;
        this.nextByte = function() {
            return ~~(this.uniform() * 256);
        };
        seed = null;
    } else if (Object.prototype.toString.call(seed) !== '[object String]') {
        seed = JSON.stringify(seed);
    } else {
        //window.console.log("setting seed "+seed);
        //print_call_stack();
    }
    this._normal = null;
    if (seed) {
        this._state = new RC4(seed);
    } else {
        this._state = null;
    }
}

/**
 * @return {number} Uniform random number between 0 and 255.
 */
RNG.prototype.nextByte = function() {
    return this._state.next();
};

/**
 * @return {number} Uniform random number between 0 and 1.
 */
RNG.prototype.uniform = function() {
    var BYTES = 7; // 56 bits to make a 53-bit double
    var output = 0;
    for (var i = 0; i < BYTES; i++) {
        output *= 256;
        output += this.nextByte();
    }
    return output / (Math.pow(2, BYTES * 8) - 1);
};

/**
 * Produce a random integer within [n, m).
 * @param {number} [n=0]
 * @param {number} m
 *
 */
RNG.prototype.random = function(n, m) {
    if (n == null) {
        return this.uniform();
    } else if (m == null) {
        m = n;
        n = 0;
    }
    return n + Math.floor(this.uniform() * (m - n));
};

/**
 * Generates numbers using this.uniform() with the Box-Muller transform.
 * @return {number} Normally-distributed random number of mean 0, variance 1.
 */
RNG.prototype.normal = function() {
    if (this._normal !== null) {
        var n = this._normal;
        this._normal = null;
        return n;
    } else {
        var x = this.uniform() || Math.pow(2, -53); // can't be exactly 0
        var y = this.uniform();
        this._normal = Math.sqrt(-2 * Math.log(x)) * Math.sin(2 * Math.PI * y);
        return Math.sqrt(-2 * Math.log(x)) * Math.cos(2 * Math.PI * y);
    }
};

/**
 * Generates numbers using this.uniform().
 * @return {number} Number from the exponential distribution, lambda = 1.
 */
RNG.prototype.exponential = function() {
    return -Math.log(this.uniform() || Math.pow(2, -53));
};

/**
 * Generates numbers using this.uniform() and Knuth's method.
 * @param {number} [mean=1]
 * @return {number} Number from the Poisson distribution.
 */
RNG.prototype.poisson = function(mean) {
    var L = Math.exp(-(mean || 1));
    var k = 0, p = 1;
    do {
        k++;
        p *= this.uniform();
    } while (p > L);
    return k - 1;
};

/**
 * Generates numbers using this.uniform(), this.normal(),
 * this.exponential(), and the Marsaglia-Tsang method.
 * @param {number} a
 * @return {number} Number from the gamma distribution.
 */
RNG.prototype.gamma = function(a) {
    var d = (a < 1 ? 1 + a : a) - 1 / 3;
    var c = 1 / Math.sqrt(9 * d);
    do {
        do {
            var x = this.normal();
            var v = Math.pow(c * x + 1, 3);
        } while (v <= 0);
        var u = this.uniform();
        var x2 = Math.pow(x, 2);
    } while (u >= 1 - 0.0331 * x2 * x2 &&
             Math.log(u) >= 0.5 * x2 + d * (1 - v + Math.log(v)));
    if (a < 1) {
        return d * v * Math.exp(this.exponential() / -a);
    } else {
        return d * v;
    }
};

/**
 * Accepts a dice rolling notation string and returns a generator
 * function for that distribution. The parser is quite flexible.
 * @param {string} expr A dice-rolling, expression i.e. '2d6+10'.
 * @param {RNG} rng An optional RNG object.
 * @return {Function}
 */
RNG.roller = function(expr, rng) {
    var parts = expr.split(/(\d+)?d(\d+)([+-]\d+)?/).slice(1);
    var dice = parseFloat(parts[0]) || 1;
    var sides = parseFloat(parts[1]);
    var mod = parseFloat(parts[2]) || 0;
    rng = rng || new RNG();
    return function() {
        var total = dice + mod;
        for (var i = 0; i < dice; i++) {
            total += rng.random(sides);
        }
        return total;
    };
};
//////////File Source js/riffwave.js
/*
 * RIFFWAVE.js v0.02 - Audio encoder for HTML5 <audio> elements.
 * Copyright (C) 2011 Pedro Ladaria <pedro.ladaria at Gmail dot com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 2 as published by the Free Software Foundation.
 * The full license is available at http://www.gnu.org/licenses/gpl.html
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *
 * Changelog:
 *
 * 0.01 - First release
 * 0.02 - New faster base64 encoding
 *
 */

var FastBase64_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var FastBase64_encLookup = [];

function FastBase64_Init() {
  for (var i = 0; i < 4096; i++) {
    FastBase64_encLookup[i] = FastBase64_chars[i >> 6] + FastBase64_chars[i & 0x3F];
  }
}

function FastBase64_Encode(src) {
  var len = src.length;
  var dst = '';
  var i = 0;
  while (len > 2) {
    n = (src[i] << 16) | (src[i + 1] << 8) | src[i + 2];
    dst += FastBase64_encLookup[n >> 12] + FastBase64_encLookup[n & 0xFFF];
    len -= 3;
    i += 3;
  }
  if (len > 0) {
    var n1 = (src[i] & 0xFC) >> 2;
    var n2 = (src[i] & 0x03) << 4;
    if (len > 1) n2 |= (src[++i] & 0xF0) >> 4;
    dst += FastBase64_chars[n1];
    dst += FastBase64_chars[n2];
    if (len == 2) {
      var n3 = (src[i++] & 0x0F) << 2;
      n3 |= (src[i] & 0xC0) >> 6;
      dst += FastBase64_chars[n3];
    }
    if (len == 1) dst += '=';
    dst += '=';
  }
  return dst;
} // end Encode

FastBase64_Init();

function u32ToArray(i) { return [i & 0xFF, (i >> 8) & 0xFF, (i >> 16) & 0xFF, (i >> 24) & 0xFF]; }

function u16ToArray(i) { return [i & 0xFF, (i >> 8) & 0xFF]; }

function MakeRiff ( sampleRate, bitsPerSample,data) {
  var dat = [];
  var wav=[];
  var dataURI=[];

  var header = {                         // OFFS SIZE NOTES
    chunkId: [0x52, 0x49, 0x46, 0x46], // 0    4    "RIFF" = 0x52494646
    chunkSize: 0,                     // 4    4    36+SubChunk2Size = 4+(8+SubChunk1Size)+(8+SubChunk2Size)
    format: [0x57, 0x41, 0x56, 0x45], // 8    4    "WAVE" = 0x57415645
    subChunk1Id: [0x66, 0x6d, 0x74, 0x20], // 12   4    "fmt " = 0x666d7420
    subChunk1Size: 16,                    // 16   4    16 for PCM
    audioFormat: 1,                     // 20   2    PCM = 1
    numChannels: 1,                     // 22   2    Mono = 1, Stereo = 2, etc.
    sampleRate: sampleRate,                  // 24   4    8000, 44100, etc
    byteRate: 0,                     // 28   4    SampleRate*NumChannels*BitsPerSample/8
    blockAlign: 0,                     // 32   2    NumChannels*BitsPerSample/8
    bitsPerSample: bitsPerSample,                     // 34   2    8 bits = 8, 16 bits = 16, etc...
    subChunk2Id: [0x64, 0x61, 0x74, 0x61], // 36   4    "data" = 0x64617461
    subChunk2Size: 0                      // 40   4    data size = NumSamples*NumChannels*BitsPerSample/8
  };

  header.byteRate = (header.sampleRate * header.numChannels * header.bitsPerSample) >> 3;
  header.blockAlign = (header.numChannels * header.bitsPerSample) >> 3;
  header.subChunk2Size = data.length;
  header.chunkSize = 36 + header.subChunk2Size;

  wav = header.chunkId.concat(
      u32ToArray(header.chunkSize),
      header.format,
      header.subChunk1Id,
      u32ToArray(header.subChunk1Size),
      u16ToArray(header.audioFormat),
      u16ToArray(header.numChannels),
      u32ToArray(header.sampleRate),
      u32ToArray(header.byteRate),
      u16ToArray(header.blockAlign),
      u16ToArray(header.bitsPerSample),
      header.subChunk2Id,
      u32ToArray(header.subChunk2Size),
      data
    );
    
    dataURI = 'data:audio/wav;base64,' + FastBase64_Encode(wav);

    var result = {
      dat:dat,
      wav:wav,
      header:header,
      dataURI:dataURI
    };

    return result;
}


// if (typeof exports != 'undefined')  // For node.js
//   exports.RIFFWAVE = RIFFWAVE;

//////////File Source js/sfxr.js
var SOUND_VOL = 0.25;
var SAMPLE_RATE = 5512;
var BIT_DEPTH = 8;

var SQUARE = 0;
var SAWTOOTH = 1;
var SINE = 2;
var NOISE = 3;
var TRIANGLE = 4;
var BREAKER = 5;

var SHAPES = [
  'square', 'sawtooth', 'sine', 'noise', 'triangle', 'breaker'
];

var AUDIO_CONTEXT;

function checkAudioContextExists(){
  try{
    if (AUDIO_CONTEXT==null){
      if (typeof AudioContext != 'undefined') {
        AUDIO_CONTEXT = new AudioContext();
      } else if (typeof webkitAudioContext != 'undefined') {
        AUDIO_CONTEXT = new webkitAudioContext();
      }
    }
  }
  catch (ex){
    window.console.log(ex)
  }
}

checkAudioContextExists();

// Playback volume
var masterVolume = 1.0;

// Sound generation parameters are on [0,1] unless noted SIGNED, & thus [-1,1]
function Params() {
  var result={};
  // Wave shape
  result.wave_type = SQUARE;

  // Envelope
  result.p_env_attack = 0.0;   // Attack time
  result.p_env_sustain = 0.3;  // Sustain time
  result.p_env_punch = 0.0;    // Sustain punch
  result.p_env_decay = 0.4;    // Decay time

  // Tone
  result.p_base_freq = 0.3;    // Start frequency
  result.p_freq_limit = 0.0;   // Min frequency cutoff
  result.p_freq_ramp = 0.0;    // Slide (SIGNED)
  result.p_freq_dramp = 0.0;   // Delta slide (SIGNED)
  // Vibrato
  result.p_vib_strength = 0.0; // Vibrato depth
  result.p_vib_speed = 0.0;    // Vibrato speed

  // Tonal change
  result.p_arp_mod = 0.0;      // Change amount (SIGNED)
  result.p_arp_speed = 0.0;    // Change speed

  // Duty (wat's that?)
  result.p_duty = 0.0;         // Square duty
  result.p_duty_ramp = 0.0;    // Duty sweep (SIGNED)

  // Repeat
  result.p_repeat_speed = 0.0; // Repeat speed

  // Phaser
  result.p_pha_offset = 0.0;   // Phaser offset (SIGNED)
  result.p_pha_ramp = 0.0;     // Phaser sweep (SIGNED)

  // Low-pass filter
  result.p_lpf_freq = 1.0;     // Low-pass filter cutoff
  result.p_lpf_ramp = 0.0;     // Low-pass filter cutoff sweep (SIGNED)
  result.p_lpf_resonance = 0.0;// Low-pass filter resonance
  // High-pass filter
  result.p_hpf_freq = 0.0;     // High-pass filter cutoff
  result.p_hpf_ramp = 0.0;     // High-pass filter cutoff sweep (SIGNED)

  // Sample parameters
  result.sound_vol = 0.5;
  result.sample_rate = 44100;
  result.bit_depth = 8;
  return result;
}

var rng;
var seeded = false;
function frnd(range) {
  if (seeded) {
    return rng.uniform() * range;
  } else {
    return Math.random() * range;
  }
}


function rnd(max) {
  if (seeded) {
  return Math.floor(rng.uniform() * (max + 1));
  } else {
    return Math.floor(Math.random() * (max + 1));
  }
}


pickupCoin = function() {
  var result=Params();
  result.wave_type = Math.floor(frnd(SHAPES.length));
  if (result.wave_type === 3) {
    result.wave_type = 0;
  }
  result.p_base_freq = 0.4 + frnd(0.5);
  result.p_env_attack = 0.0;
  result.p_env_sustain = frnd(0.1);
  result.p_env_decay = 0.1 + frnd(0.4);
  result.p_env_punch = 0.3 + frnd(0.3);
  if (rnd(1)) {
    result.p_arp_speed = 0.5 + frnd(0.2);
    var num = (frnd(7) | 1) + 1;
    var den = num + (frnd(7) | 1) + 2;
    result.p_arp_mod = (+num) / (+den); //0.2 + frnd(0.4);
  }
  return result;
};


laserShoot = function() {
  var result=Params();
  result.wave_type = rnd(2);
  if (result.wave_type === SINE && rnd(1))
    result.wave_type = rnd(1);
  result.wave_type = Math.floor(frnd(SHAPES.length));

  if (result.wave_type === 3) {
    result.wave_type = SQUARE;
  }

  result.p_base_freq = 0.5 + frnd(0.5);
  result.p_freq_limit = result.p_base_freq - 0.2 - frnd(0.6);
  if (result.p_freq_limit < 0.2) result.p_freq_limit = 0.2;
  result.p_freq_ramp = -0.15 - frnd(0.2);
  if (rnd(2) === 0)
  {
    result.p_base_freq = 0.3 + frnd(0.6);
    result.p_freq_limit = frnd(0.1);
    result.p_freq_ramp = -0.35 - frnd(0.3);
  }
  if (rnd(1))
  {
    result.p_duty = frnd(0.5);
    result.p_duty_ramp = frnd(0.2);
  }
  else
  {
    result.p_duty = 0.4 + frnd(0.5);
    result.p_duty_ramp = -frnd(0.7);
  }
  result.p_env_attack = 0.0;
  result.p_env_sustain = 0.1 + frnd(0.2);
  result.p_env_decay = frnd(0.4);
  if (rnd(1))
    result.p_env_punch = frnd(0.3);
  if (rnd(2) === 0)
  {
    result.p_pha_offset = frnd(0.2);
    result.p_pha_ramp = -frnd(0.2);
  }
  if (rnd(1))
    result.p_hpf_freq = frnd(0.3);

  return result;
};

explosion = function() {
  var result=Params();

  if (rnd(1)) {
    result.p_base_freq = 0.1 + frnd(0.4);
    result.p_freq_ramp = -0.1 + frnd(0.4);
  } else {
    result.p_base_freq = 0.2 + frnd(0.7);
    result.p_freq_ramp = -0.2 - frnd(0.2);
  }
  result.p_base_freq *= result.p_base_freq;
  if (rnd(4) === 0)
    result.p_freq_ramp = 0.0;
  if (rnd(2) === 0)
    result.p_repeat_speed = 0.3 + frnd(0.5);
  result.p_env_attack = 0.0;
  result.p_env_sustain = 0.1 + frnd(0.3);
  result.p_env_decay = frnd(0.5);
  if (rnd(1) === 0) {
    result.p_pha_offset = -0.3 + frnd(0.9);
    result.p_pha_ramp = -frnd(0.3);
  }
  result.p_env_punch = 0.2 + frnd(0.6);
  if (rnd(1)) {
    result.p_vib_strength = frnd(0.7);
    result.p_vib_speed = frnd(0.6);
  }
  if (rnd(2) === 0) {
    result.p_arp_speed = 0.6 + frnd(0.3);
    result.p_arp_mod = 0.8 - frnd(1.6);
  }

  return result;
};
//9675111
birdSound = function() {
  var result=Params();

if (frnd(10) < 1) {
    result.wave_type = Math.floor(frnd(SHAPES.length));
    if (result.wave_type === 3) {
      result.wave_type = SQUARE;
    }
result.p_env_attack = 0.4304400932967592 + frnd(0.2) - 0.1;
result.p_env_sustain = 0.15739346034252394 + frnd(0.2) - 0.1;
result.p_env_punch = 0.004488201744871758 + frnd(0.2) - 0.1;
result.p_env_decay = 0.07478075528212291 + frnd(0.2) - 0.1;
result.p_base_freq = 0.9865265720147687 + frnd(0.2) - 0.1;
result.p_freq_limit = 0 + frnd(0.2) - 0.1;
result.p_freq_ramp = -0.2995018224359539 + frnd(0.2) - 0.1;
if (frnd(1.0) < 0.5) {
  result.p_freq_ramp = 0.1 + frnd(0.15);
}
result.p_freq_dramp = 0.004598608156964473 + frnd(0.1) - 0.05;
result.p_vib_strength = -0.2202799497929496 + frnd(0.2) - 0.1;
result.p_vib_speed = 0.8084998703158364 + frnd(0.2) - 0.1;
result.p_arp_mod = 0;//-0.46410459213693644+frnd(0.2)-0.1;
result.p_arp_speed = 0;//-0.10955361249587248+frnd(0.2)-0.1;
result.p_duty = -0.9031808754347107 + frnd(0.2) - 0.1;
result.p_duty_ramp = -0.8128699999808343 + frnd(0.2) - 0.1;
result.p_repeat_speed = 0.6014860189319991 + frnd(0.2) - 0.1;
result.p_pha_offset = -0.9424902314367765 + frnd(0.2) - 0.1;
result.p_pha_ramp = -0.1055482222272056 + frnd(0.2) - 0.1;
result.p_lpf_freq = 0.9989765717851521 + frnd(0.2) - 0.1;
result.p_lpf_ramp = -0.25051720626043017 + frnd(0.2) - 0.1;
result.p_lpf_resonance = 0.32777871505494693 + frnd(0.2) - 0.1;
result.p_hpf_freq = 0.0023548750981756753 + frnd(0.2) - 0.1;
result.p_hpf_ramp = -0.002375673204842568 + frnd(0.2) - 0.1;
return result;
}

if (frnd(10) < 1) {
    result.wave_type = Math.floor(frnd(SHAPES.length));
    if (result.wave_type === 3) {
      result.wave_type = SQUARE;
    }
result.p_env_attack = 0.5277795946672003 + frnd(0.2) - 0.1;
result.p_env_sustain = 0.18243733568468432 + frnd(0.2) - 0.1;
result.p_env_punch = -0.020159754546840117 + frnd(0.2) - 0.1;
result.p_env_decay = 0.1561353422051903 + frnd(0.2) - 0.1;
result.p_base_freq = 0.9028855606533718 + frnd(0.2) - 0.1;
result.p_freq_limit = -0.008842787837148716;
result.p_freq_ramp = -0.1;
result.p_freq_dramp = -0.012891241489551925;
result.p_vib_strength = -0.17923136138403065 + frnd(0.2) - 0.1;
result.p_vib_speed = 0.908263385610142 + frnd(0.2) - 0.1;
result.p_arp_mod = 0.41690153355414894 + frnd(0.2) - 0.1;
result.p_arp_speed = 0.0010766233195860703 + frnd(0.2) - 0.1;
result.p_duty = -0.8735363011184684 + frnd(0.2) - 0.1;
result.p_duty_ramp = -0.7397985366747507 + frnd(0.2) - 0.1;
result.p_repeat_speed = 0.0591789344172107 + frnd(0.2) - 0.1;
result.p_pha_offset = -0.9961184222777699 + frnd(0.2) - 0.1;
result.p_pha_ramp = -0.08234769395850523 + frnd(0.2) - 0.1;
result.p_lpf_freq = 0.9412475115697335 + frnd(0.2) - 0.1;
result.p_lpf_ramp = -0.18261358925834958 + frnd(0.2) - 0.1;
result.p_lpf_resonance = 0.24541438107389477 + frnd(0.2) - 0.1;
result.p_hpf_freq = -0.01831940280978611 + frnd(0.2) - 0.1;
result.p_hpf_ramp = -0.03857383633171346 + frnd(0.2) - 0.1;
return result;

}
  if (frnd(10) < 1) {
//result.wave_type = 4;
    result.wave_type = Math.floor(frnd(SHAPES.length));

    if (result.wave_type === 3) {
      result.wave_type = SQUARE;
    }
result.p_env_attack = 0.4304400932967592 + frnd(0.2) - 0.1;
result.p_env_sustain = 0.15739346034252394 + frnd(0.2) - 0.1;
result.p_env_punch = 0.004488201744871758 + frnd(0.2) - 0.1;
result.p_env_decay = 0.07478075528212291 + frnd(0.2) - 0.1;
result.p_base_freq = 0.9865265720147687 + frnd(0.2) - 0.1;
result.p_freq_limit = 0 + frnd(0.2) - 0.1;
result.p_freq_ramp = -0.2995018224359539 + frnd(0.2) - 0.1;
result.p_freq_dramp = 0.004598608156964473 + frnd(0.2) - 0.1;
result.p_vib_strength = -0.2202799497929496 + frnd(0.2) - 0.1;
result.p_vib_speed = 0.8084998703158364 + frnd(0.2) - 0.1;
result.p_arp_mod = -0.46410459213693644 + frnd(0.2) - 0.1;
result.p_arp_speed = -0.10955361249587248 + frnd(0.2) - 0.1;
result.p_duty = -0.9031808754347107 + frnd(0.2) - 0.1;
result.p_duty_ramp = -0.8128699999808343 + frnd(0.2) - 0.1;
result.p_repeat_speed = 0.7014860189319991 + frnd(0.2) - 0.1;
result.p_pha_offset = -0.9424902314367765 + frnd(0.2) - 0.1;
result.p_pha_ramp = -0.1055482222272056 + frnd(0.2) - 0.1;
result.p_lpf_freq = 0.9989765717851521 + frnd(0.2) - 0.1;
result.p_lpf_ramp = -0.25051720626043017 + frnd(0.2) - 0.1;
result.p_lpf_resonance = 0.32777871505494693 + frnd(0.2) - 0.1;
result.p_hpf_freq = 0.0023548750981756753 + frnd(0.2) - 0.1;
result.p_hpf_ramp = -0.002375673204842568 + frnd(0.2) - 0.1;
return result;
}
  if (frnd(5) > 1) {
    result.wave_type = Math.floor(frnd(SHAPES.length));

    if (result.wave_type === 3) {
      result.wave_type = SQUARE;
    }
    if (rnd(1)) {
      result.p_arp_mod = 0.2697849293151393 + frnd(0.2) - 0.1;
      result.p_arp_speed = -0.3131172257760948 + frnd(0.2) - 0.1;
      result.p_base_freq = 0.8090588299313949 + frnd(0.2) - 0.1;
      result.p_duty = -0.6210022920964955 + frnd(0.2) - 0.1;
      result.p_duty_ramp = -0.00043441813553182567 + frnd(0.2) - 0.1;
      result.p_env_attack = 0.004321877246874195 + frnd(0.2) - 0.1;
      result.p_env_decay = 0.1 + frnd(0.2) - 0.1;
      result.p_env_punch = 0.061737781504416146 + frnd(0.2) - 0.1;
      result.p_env_sustain = 0.4987252564798832 + frnd(0.2) - 0.1;
      result.p_freq_dramp = 0.31700340314222614 + frnd(0.2) - 0.1;
      result.p_freq_limit = 0 + frnd(0.2) - 0.1;
      result.p_freq_ramp = -0.163380391341416 + frnd(0.2) - 0.1;
      result.p_hpf_freq = 0.4709005021145149 + frnd(0.2) - 0.1;
      result.p_hpf_ramp = 0.6924667290539194 + frnd(0.2) - 0.1;
      result.p_lpf_freq = 0.8351398631384511 + frnd(0.2) - 0.1;
      result.p_lpf_ramp = 0.36616557192873134 + frnd(0.2) - 0.1;
      result.p_lpf_resonance = -0.08685777111664439 + frnd(0.2) - 0.1;
      result.p_pha_offset = -0.036084571580025544 + frnd(0.2) - 0.1;
      result.p_pha_ramp = -0.014806445085568108 + frnd(0.2) - 0.1;
      result.p_repeat_speed = -0.8094368475518489 + frnd(0.2) - 0.1;
      result.p_vib_speed = 0.4496665457171294 + frnd(0.2) - 0.1;
      result.p_vib_strength = 0.23413762515532424 + frnd(0.2) - 0.1;
    } else {
      result.p_arp_mod = -0.35697118026766184 + frnd(0.2) - 0.1;
      result.p_arp_speed = 0.3581140690559588 + frnd(0.2) - 0.1;
      result.p_base_freq = 1.3260897696157528 + frnd(0.2) - 0.1;
      result.p_duty = -0.30984900436710694 + frnd(0.2) - 0.1;
      result.p_duty_ramp = -0.0014374759133411626 + frnd(0.2) - 0.1;
      result.p_env_attack = 0.3160357835682254 + frnd(0.2) - 0.1;
      result.p_env_decay = 0.1 + frnd(0.2) - 0.1;
      result.p_env_punch = 0.24323114016870148 + frnd(0.2) - 0.1;
      result.p_env_sustain = 0.4 + frnd(0.2) - 0.1;
      result.p_freq_dramp = 0.2866475886237244 + frnd(0.2) - 0.1;
      result.p_freq_limit = 0 + frnd(0.2) - 0.1;
      result.p_freq_ramp = -0.10956352368742976 + frnd(0.2) - 0.1;
      result.p_hpf_freq = 0.20772718017889846 + frnd(0.2) - 0.1;
      result.p_hpf_ramp = 0.1564090637378835 + frnd(0.2) - 0.1;
      result.p_lpf_freq = 0.6021372770637031 + frnd(0.2) - 0.1;
      result.p_lpf_ramp = 0.24016227139979027 + frnd(0.2) - 0.1;
      result.p_lpf_resonance = -0.08787383821160144 + frnd(0.2) - 0.1;
      result.p_pha_offset = -0.381597686151701 + frnd(0.2) - 0.1;
      result.p_pha_ramp = -0.0002481687661373495 + frnd(0.2) - 0.1;
      result.p_repeat_speed = 0.07812112809425686 + frnd(0.2) - 0.1;
      result.p_vib_speed = -0.13648848579133943 + frnd(0.2) - 0.1;
      result.p_vib_strength = 0.0018874158972302657 + frnd(0.2) - 0.1;
    }
    return result;

  }

  result.wave_type = Math.floor(frnd(SHAPES.length));//TRIANGLE;
  if (result.wave_type === 1 || result.wave_type === 3) {
    result.wave_type = 2;
  }
  //new
  result.p_base_freq = 0.85 + frnd(0.15);
  result.p_freq_ramp = 0.3 + frnd(0.15);
//  result.p_freq_dramp = 0.3+frnd(2.0);

  result.p_env_attack = 0 + frnd(0.09);
  result.p_env_sustain = 0.2 + frnd(0.3);
  result.p_env_decay = 0 + frnd(0.1);

  result.p_duty = frnd(2.0) - 1.0;
  result.p_duty_ramp = Math.pow(frnd(2.0) - 1.0, 3.0);


  result.p_repeat_speed = 0.5 + frnd(0.1);

  result.p_pha_offset = -0.3 + frnd(0.9);
  result.p_pha_ramp = -frnd(0.3);

  result.p_arp_speed = 0.4 + frnd(0.6);
  result.p_arp_mod = 0.8 + frnd(0.1);


  result.p_lpf_resonance = frnd(2.0) - 1.0;
  result.p_lpf_freq = 1.0 - Math.pow(frnd(1.0), 3.0);
  result.p_lpf_ramp = Math.pow(frnd(2.0) - 1.0, 3.0);
  if (result.p_lpf_freq < 0.1 && result.p_lpf_ramp < -0.05)
    result.p_lpf_ramp = -result.p_lpf_ramp;
  result.p_hpf_freq = Math.pow(frnd(1.0), 5.0);
  result.p_hpf_ramp = Math.pow(frnd(2.0) - 1.0, 5.0);

  return result;
};


pushSound = function() {
  var result=Params();
  result.wave_type = Math.floor(frnd(SHAPES.length));//TRIANGLE;
  if (result.wave_type === 2) {
    result.wave_type++;
  }
  if (result.wave_type === 0) {
    result.wave_type = NOISE;
  }
  //new
  result.p_base_freq = 0.1 + frnd(0.4);
  result.p_freq_ramp = 0.05 + frnd(0.2);

  result.p_env_attack = 0.01 + frnd(0.09);
  result.p_env_sustain = 0.01 + frnd(0.09);
  result.p_env_decay = 0.01 + frnd(0.09);

  result.p_repeat_speed = 0.3 + frnd(0.5);
  result.p_pha_offset = -0.3 + frnd(0.9);
  result.p_pha_ramp = -frnd(0.3);
  result.p_arp_speed = 0.6 + frnd(0.3);
  result.p_arp_mod = 0.8 - frnd(1.6);

  return result;
};



powerUp = function() {
  var result=Params();
  if (rnd(1))
    result.wave_type = SAWTOOTH;
  else
    result.p_duty = frnd(0.6);
  result.wave_type = Math.floor(frnd(SHAPES.length));
  if (result.wave_type === 3) {
    result.wave_type = SQUARE;
  }
  if (rnd(1))
  {
    result.p_base_freq = 0.2 + frnd(0.3);
    result.p_freq_ramp = 0.1 + frnd(0.4);
    result.p_repeat_speed = 0.4 + frnd(0.4);
  }
  else
  {
    result.p_base_freq = 0.2 + frnd(0.3);
    result.p_freq_ramp = 0.05 + frnd(0.2);
    if (rnd(1))
    {
      result.p_vib_strength = frnd(0.7);
      result.p_vib_speed = frnd(0.6);
    }
  }
  result.p_env_attack = 0.0;
  result.p_env_sustain = frnd(0.4);
  result.p_env_decay = 0.1 + frnd(0.4);

  return result;
};

hitHurt = function() {
  result = Params();
  result.wave_type = rnd(2);
  if (result.wave_type === SINE)
    result.wave_type = NOISE;
  if (result.wave_type === SQUARE)
    result.p_duty = frnd(0.6);
  result.wave_type = Math.floor(frnd(SHAPES.length));
  result.p_base_freq = 0.2 + frnd(0.6);
  result.p_freq_ramp = -0.3 - frnd(0.4);
  result.p_env_attack = 0.0;
  result.p_env_sustain = frnd(0.1);
  result.p_env_decay = 0.1 + frnd(0.2);
  if (rnd(1))
    result.p_hpf_freq = frnd(0.3);
  return result;
};


jump = function() {
  result = Params();
  result.wave_type = SQUARE;
  result.wave_type = Math.floor(frnd(SHAPES.length));
  if (result.wave_type === 3) {
    result.wave_type = SQUARE;
  }
  result.p_duty = frnd(0.6);
  result.p_base_freq = 0.3 + frnd(0.3);
  result.p_freq_ramp = 0.1 + frnd(0.2);
  result.p_env_attack = 0.0;
  result.p_env_sustain = 0.1 + frnd(0.3);
  result.p_env_decay = 0.1 + frnd(0.2);
  if (rnd(1))
    result.p_hpf_freq = frnd(0.3);
  if (rnd(1))
    result.p_lpf_freq = 1.0 - frnd(0.6);
  return result;
};

blipSelect = function() {
  result = Params();
  result.wave_type = rnd(1);
  result.wave_type = Math.floor(frnd(SHAPES.length));
  if (result.wave_type === 3) {
    result.wave_type = rnd(1);
  }
  if (result.wave_type === SQUARE)
    result.p_duty = frnd(0.6);
  result.p_base_freq = 0.2 + frnd(0.4);
  result.p_env_attack = 0.0;
  result.p_env_sustain = 0.1 + frnd(0.1);
  result.p_env_decay = frnd(0.2);
  result.p_hpf_freq = 0.1;
  return result;
};

random = function() {
  result = Params();
  result.wave_type = Math.floor(frnd(SHAPES.length));
  result.p_base_freq = Math.pow(frnd(2.0) - 1.0, 2.0);
  if (rnd(1))
    result.p_base_freq = Math.pow(frnd(2.0) - 1.0, 3.0) + 0.5;
  result.p_freq_limit = 0.0;
  result.p_freq_ramp = Math.pow(frnd(2.0) - 1.0, 5.0);
  if (result.p_base_freq > 0.7 && result.p_freq_ramp > 0.2)
    result.p_freq_ramp = -result.p_freq_ramp;
  if (result.p_base_freq < 0.2 && result.p_freq_ramp < -0.05)
    result.p_freq_ramp = -result.p_freq_ramp;
  result.p_freq_dramp = Math.pow(frnd(2.0) - 1.0, 3.0);
  result.p_duty = frnd(2.0) - 1.0;
  result.p_duty_ramp = Math.pow(frnd(2.0) - 1.0, 3.0);
  result.p_vib_strength = Math.pow(frnd(2.0) - 1.0, 3.0);
  result.p_vib_speed = frnd(2.0) - 1.0;
  result.p_env_attack = Math.pow(frnd(2.0) - 1.0, 3.0);
  result.p_env_sustain = Math.pow(frnd(2.0) - 1.0, 2.0);
  result.p_env_decay = frnd(2.0) - 1.0;
  result.p_env_punch = Math.pow(frnd(0.8), 2.0);
  if (result.p_env_attack + result.p_env_sustain + result.p_env_decay < 0.2) {
    result.p_env_sustain += 0.2 + frnd(0.3);
    result.p_env_decay += 0.2 + frnd(0.3);
  }
  result.p_lpf_resonance = frnd(2.0) - 1.0;
  result.p_lpf_freq = 1.0 - Math.pow(frnd(1.0), 3.0);
  result.p_lpf_ramp = Math.pow(frnd(2.0) - 1.0, 3.0);
  if (result.p_lpf_freq < 0.1 && result.p_lpf_ramp < -0.05)
    result.p_lpf_ramp = -result.p_lpf_ramp;
  result.p_hpf_freq = Math.pow(frnd(1.0), 5.0);
  result.p_hpf_ramp = Math.pow(frnd(2.0) - 1.0, 5.0);
  result.p_pha_offset = Math.pow(frnd(2.0) - 1.0, 3.0);
  result.p_pha_ramp = Math.pow(frnd(2.0) - 1.0, 3.0);
  result.p_repeat_speed = frnd(2.0) - 1.0;
  result.p_arp_speed = frnd(2.0) - 1.0;
  result.p_arp_mod = frnd(2.0) - 1.0;
  return result;
};

var generators = [
pickupCoin,
laserShoot,
explosion,
powerUp,
hitHurt,
jump,
blipSelect,
pushSound,
random,
birdSound
];

var generatorNames = [
'pickupCoin',
'laserShoot',
'explosion',
'powerUp',
'hitHurt',
'jump',
'blipSelect',
'pushSound',
'random',
'birdSound'
];

/*
i like 9675111
*/
generateFromSeed = function(seed) {
  rng = new RNG((seed / 100) | 0);
  var generatorindex = seed % 100;
  var soundGenerator = generators[generatorindex % generators.length];
  seeded = true;
  var result = soundGenerator();
  result.seed = seed;
  seeded = false;
  return result;
};

function SoundEffect(length, sample_rate) {
  this._buffer = AUDIO_CONTEXT.createBuffer(1, length, sample_rate);
}

SoundEffect.prototype.getBuffer = function() {
  return this._buffer.getChannelData(0);
};


//unlock bullshit
function ULBS(){   
  return;
  if (AUDIO_CONTEXT.state === 'suspended')
  {
      var unlock = function()
      {
        AUDIO_CONTEXT.resume().then(function()
          {
            document.body.removeEventListener('touchstart', unlock);
            document.body.removeEventListener('touchend', unlock);
            document.body.removeEventListener('mousedown', unlock);
            document.body.removeEventListener('mouseup', unlock);
            document.body.removeEventListener('keydown', unlock);
            document.body.removeEventListener('keyup', unlock);
          });
      };

      document.body.addEventListener('touchstart', unlock, false);
      document.body.addEventListener('touchend', unlock, false);
      document.body.addEventListener('mousedown', unlock, false);
      document.body.addEventListener('mouseup', unlock, false);
      document.body.addEventListener('keydown', unlock, false);
      document.body.addEventListener('keyup', unlock, false);
  }
}

SoundEffect.prototype.play = function() {
  ULBS();

  var source = AUDIO_CONTEXT.createBufferSource();
  var filter1 = AUDIO_CONTEXT.createBiquadFilter();
  var filter2 = AUDIO_CONTEXT.createBiquadFilter();
  var filter3 = AUDIO_CONTEXT.createBiquadFilter();

  source.buffer = this._buffer;
  source.connect(filter1);

  filter1.frequency.value = 1600;
  filter2.frequency.value = 1600;
  filter3.frequency.value = 1600;

  filter1.connect(filter2);
  filter2.connect(filter3);
  filter3.connect(AUDIO_CONTEXT.destination);
  var t = AUDIO_CONTEXT.currentTime;
  if (typeof source.start != 'undefined') {
    source.start(t);
  } else {
    source.noteOn(t);
  }
  source.onended = function() {
    filter3.disconnect()
  }
};

SoundEffect.MIN_SAMPLE_RATE = 22050;

if (typeof AUDIO_CONTEXT == 'undefined') {
  SoundEffect = function SoundEffect(length, sample_rate) {
    this._sample_rate = sample_rate;
    this._buffer = new Array(length);
    this._audioElement = null;
  };

  SoundEffect.prototype.getBuffer = function() {
    this._audioElement = null;
    return this._buffer;
  };

  SoundEffect.prototype.play = function() {
    if (this._audioElement) {
      this._audioElement.cloneNode(false).play();
    } else {
      for (var i = 0; i < this._buffer.length; i++) {
        // bit_depth is always 8, rescale [-1.0, 1.0) to [0, 256)
        this._buffer[i] = 255 & Math.floor(128 * Math.max(0, Math.min(this._buffer[i] + 1, 2)));
      }
      var wav = MakeRiff(this._sample_rate, BIT_DEPTH, this._buffer);
      this._audioElement = new Audio();
      this._audioElement.src = wav.dataURI;
      this._audioElement.play();
    }
  };

  SoundEffect.MIN_SAMPLE_RATE = 1;
}

SoundEffect.generate = function(ps) {
/*  window.console.log(ps.wave_type + "\t" + ps.seed);

  var psstring="";
  for (var n in ps) {
    if (ps.hasOwnProperty(n)) {
      psstring = psstring +"result." + n+" = " + ps[n] + ";\n";
    }
  }
window.console.log(ps);
window.console.log(psstring);*/
  function repeat() {
    rep_time = 0;

    fperiod = 100.0 / (ps.p_base_freq * ps.p_base_freq + 0.001);
    period = Math.floor(fperiod);
    fmaxperiod = 100.0 / (ps.p_freq_limit * ps.p_freq_limit + 0.001);

    fslide = 1.0 - Math.pow(ps.p_freq_ramp, 3.0) * 0.01;
    fdslide = -Math.pow(ps.p_freq_dramp, 3.0) * 0.000001;

    square_duty = 0.5 - ps.p_duty * 0.5;
    square_slide = -ps.p_duty_ramp * 0.00005;

    if (ps.p_arp_mod >= 0.0)
      arp_mod = 1.0 - Math.pow(ps.p_arp_mod, 2.0) * 0.9;
    else
      arp_mod = 1.0 + Math.pow(ps.p_arp_mod, 2.0) * 10.0;
    arp_time = 0;
    arp_limit = Math.floor(Math.pow(1.0 - ps.p_arp_speed, 2.0) * 20000 + 32);
    if (ps.p_arp_speed == 1.0)
      arp_limit = 0;
  };

  var rep_time;
  var fperiod, period, fmaxperiod;
  var fslide, fdslide;
  var square_duty, square_slide;
  var arp_mod, arp_time, arp_limit;
  repeat();  // First time through, this is a bit of a misnomer

  // Filter
  var fltp = 0.0;
  var fltdp = 0.0;
  var fltw = Math.pow(ps.p_lpf_freq, 3.0) * 0.1;
  var fltw_d = 1.0 + ps.p_lpf_ramp * 0.0001;
  var fltdmp = 5.0 / (1.0 + Math.pow(ps.p_lpf_resonance, 2.0) * 20.0) *
    (0.01 + fltw);
  if (fltdmp > 0.8) fltdmp = 0.8;
  var fltphp = 0.0;
  var flthp = Math.pow(ps.p_hpf_freq, 2.0) * 0.1;
  var flthp_d = 1.0 + ps.p_hpf_ramp * 0.0003;

  // Vibrato
  var vib_phase = 0.0;
  var vib_speed = Math.pow(ps.p_vib_speed, 2.0) * 0.01;
  var vib_amp = ps.p_vib_strength * 0.5;

  // Envelope
  var env_vol = 0.0;
  var env_stage = 0;
  var env_time = 0;
  var env_length = [
    Math.floor(ps.p_env_attack * ps.p_env_attack * 100000.0),
    Math.floor(ps.p_env_sustain * ps.p_env_sustain * 100000.0),
    Math.floor(ps.p_env_decay * ps.p_env_decay * 100000.0)
  ];
  var env_total_length = env_length[0] + env_length[1] + env_length[2];

  // Phaser
  var phase = 0;
  var fphase = Math.pow(ps.p_pha_offset, 2.0) * 1020.0;
  if (ps.p_pha_offset < 0.0) fphase = -fphase;
  var fdphase = Math.pow(ps.p_pha_ramp, 2.0) * 1.0;
  if (ps.p_pha_ramp < 0.0) fdphase = -fdphase;
  var iphase = Math.abs(Math.floor(fphase));
  var ipp = 0;
  var phaser_buffer = [];
  for (var i = 0; i < 1024; ++i)
    phaser_buffer[i] = 0.0;

  // Noise
  var noise_buffer = [];
  for (var i = 0; i < 32; ++i)
    noise_buffer[i] = Math.random() * 2.0 - 1.0;

  // Repeat
  var rep_limit = Math.floor(Math.pow(1.0 - ps.p_repeat_speed, 2.0) * 20000
                             + 32);
  if (ps.p_repeat_speed == 0.0)
    rep_limit = 0;

  //var gain = 2.0 * Math.log(1 + (Math.E - 1) * ps.sound_vol);
  var gain = 2.0 * ps.sound_vol;
  var gain = Math.exp(ps.sound_vol) - 1;

  var num_clipped = 0;

  // ...end of initialization. Generate samples.

  var sample_sum = 0;
  var num_summed = 0;
  var summands = Math.floor(44100 / ps.sample_rate);

  var buffer_i = 0;
  var buffer_length = Math.ceil(env_total_length / summands);
  var buffer_complete = false;

  var sound;
  if (ps.sample_rate < SoundEffect.MIN_SAMPLE_RATE) {
    // Assume 4x gets close enough to MIN_SAMPLE_RATE
    sound = new SoundEffect(4 * buffer_length, SoundEffect.MIN_SAMPLE_RATE);
  } else {
    sound = new SoundEffect(buffer_length, ps.sample_rate)
  }
  var buffer = sound.getBuffer();

  for (var t = 0;; ++t) {

    // Repeats
    if (rep_limit != 0 && ++rep_time >= rep_limit)
      repeat();

    // Arpeggio (single)
    if (arp_limit != 0 && t >= arp_limit) {
      arp_limit = 0;
      fperiod *= arp_mod;
    }

    // Frequency slide, and frequency slide slide!
    fslide += fdslide;
    fperiod *= fslide;
    if (fperiod > fmaxperiod) {
      fperiod = fmaxperiod;
      if (ps.p_freq_limit > 0.0)
        buffer_complete = true;
    }

    // Vibrato
    var rfperiod = fperiod;
    if (vib_amp > 0.0) {
      vib_phase += vib_speed;
      rfperiod = fperiod * (1.0 + Math.sin(vib_phase) * vib_amp);
    }
    period = Math.floor(rfperiod);
    if (period < 8) period = 8;

    square_duty += square_slide;
    if (square_duty < 0.0) square_duty = 0.0;
    if (square_duty > 0.5) square_duty = 0.5;

    // Volume envelope
    env_time++;
    if (env_time > env_length[env_stage]) {
      env_time = 1;
      env_stage++;
      while (env_stage < 3 && env_length[env_stage] === 0)
	env_stage++;
      if (env_stage === 3)
        break;
    }
    if (env_stage === 0)
      env_vol = env_time / env_length[0];
    else if (env_stage === 1)
      env_vol = 1.0 + Math.pow(1.0 - env_time / env_length[1],
                               1.0) * 2.0 * ps.p_env_punch;
    else  // env_stage == 2
      env_vol = 1.0 - env_time / env_length[2];

    // Phaser step
    fphase += fdphase;
    iphase = Math.abs(Math.floor(fphase));
    if (iphase > 1023) iphase = 1023;

    if (flthp_d != 0.0) {
      flthp *= flthp_d;
      if (flthp < 0.00001)
        flthp = 0.00001;
      if (flthp > 0.1)
        flthp = 0.1;
    }

    // 8x supersampling
    var sample = 0.0;
    for (var si = 0; si < 8; ++si) {
      var sub_sample = 0.0;
      phase++;
      if (phase >= period) {
        phase %= period;
        if (ps.wave_type === NOISE)
          for (var i = 0; i < 32; ++i)
            noise_buffer[i] = Math.random() * 2.0 - 1.0;
      }

      // Base waveform
      var fp = phase / period;
      if (ps.wave_type === SQUARE) {
        if (fp < square_duty)
          sub_sample = 0.5;
        else
          sub_sample = -0.5;
      } else if (ps.wave_type === SAWTOOTH) {
        sub_sample = 1.0 - fp * 2;
      } else if (ps.wave_type === SINE) {
        sub_sample = Math.sin(fp * 2 * Math.PI);
      } else if (ps.wave_type === NOISE) {
        sub_sample = noise_buffer[Math.floor(phase * 32 / period)];
      } else if (ps.wave_type === TRIANGLE) {
        sub_sample = Math.abs(1 - fp * 2) - 1;
      } else if (ps.wave_type === BREAKER) {
        sub_sample = Math.abs(1 - fp * fp * 2) - 1;
      } else {
        throw new Exception('bad wave type! ' + ps.wave_type);
      }

      // Low-pass filter
      var pp = fltp;
      fltw *= fltw_d;
      if (fltw < 0.0) fltw = 0.0;
      if (fltw > 0.1) fltw = 0.1;
      if (ps.p_lpf_freq != 1.0) {
        fltdp += (sub_sample - fltp) * fltw;
        fltdp -= fltdp * fltdmp;
      } else {
        fltp = sub_sample;
        fltdp = 0.0;
      }
      fltp += fltdp;

      // High-pass filter
      fltphp += fltp - pp;
      fltphp -= fltphp * flthp;
      sub_sample = fltphp;

      // Phaser
      phaser_buffer[ipp & 1023] = sub_sample;
      sub_sample += phaser_buffer[(ipp - iphase + 1024) & 1023];
      ipp = (ipp + 1) & 1023;

      // final accumulation and envelope application
      sample += sub_sample * env_vol;
    }

    // Accumulate samples appropriately for sample rate
    sample_sum += sample;
    if (++num_summed >= summands) {
      num_summed = 0;
      sample = sample_sum / summands;
      sample_sum = 0;
    } else {
      continue;
    }

    sample = sample / 8 * masterVolume;
    sample *= gain;

    buffer[buffer_i++] = sample;

    if (ps.sample_rate < SoundEffect.MIN_SAMPLE_RATE) {
      buffer[buffer_i++] = sample;
      buffer[buffer_i++] = sample;
      buffer[buffer_i++] = sample;
    }
  }

  if (summands > 0) {
    sample = sample_sum / summands;

    sample = sample / 8 * masterVolume;
    sample *= gain;

    buffer[buffer_i++] = sample;

    if (ps.sample_rate < SoundEffect.MIN_SAMPLE_RATE) {
      buffer[buffer_i++] = sample;
      buffer[buffer_i++] = sample;
      buffer[buffer_i++] = sample;
    }
  }

  return sound;
};

if (typeof exports != 'undefined') {
  // For node.js
  // var RIFFWAVE = require('./riffwave').RIFFWAVE;
  // exports.Params = Params;
  // exports.generate = generate;
}

var sfxCache = {};
var cachedSeeds = [];
var CACHE_MAX = 50;

function cacheSeed(seed){
  if (seed in sfxCache) {
    return sfxCache[seed];
  }

  var params = generateFromSeed(seed);
  params.sound_vol = SOUND_VOL;
  params.sample_rate = SAMPLE_RATE;
  params.bit_depth = BIT_DEPTH;

  var sound = SoundEffect.generate(params);
  sfxCache[seed] = sound;
  cachedSeeds.push(seed);

  while (cachedSeeds.length>CACHE_MAX) {
    var toRemove=cachedSeeds[0];
    cachedSeeds = cachedSeeds.slice(1);
    delete sfxCache[toRemove];
  }

  return sound;
}


function playSound(seed) {
  if (muted){
    return;
  }
  checkAudioContextExists();
  if (unitTesting) return;
  var sound = cacheSeed(seed);
  sound.play();
}



function killAudioButton(){
  var mb = document.getElementById("muteButton");
  var umb = document.getElementById("unMuteButton");
  if (mb){
    mb.remove();
    umb.remove();
  }
}

function showAudioButton(){
  var mb = document.getElementById("muteButton");
  var umb = document.getElementById("unMuteButton");
  if (mb){
    mb.style.display="block"; 
    umb.style.display="none";
  }
}


function toggleMute() {
  if (muted===0){
    muteAudio();
  } else {
    unMuteAudio();
  }
}

function muteAudio() {
  muted=1; 
  tryDeactivateYoutube();
  var mb = document.getElementById("muteButton");
  var umb = document.getElementById("unMuteButton");
  if (mb){
    mb.style.display="none"; 
    umb.style.display="block";
  }
}
function unMuteAudio() {
  muted=0; 
  tryActivateYoutube();
  var mb = document.getElementById("muteButton");
  var umb = document.getElementById("unMuteButton");
  if (mb){
    mb.style.display="block"; 
    umb.style.display="none";
  }
}
//////////File Source js/codemirror/codemirror.js
// This is CodeMirror (http://codemirror.net), a code editor
// implemented in JavaScript on top of the browser's DOM.
//
// You can find some technical background for some of the code below
// at http://marijnhaverbeke.nl/blog/#cm-internals .
var StringStream;
function setStringStream(val){
  StringStream = val;
}

var CodeMirror = (function (mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
  return   module.exports = mod();
  else if (typeof define == "function" && define.amd) // AMD
    return define([], mod);
  else // Plain browser env
    this.CodeMirror = mod();
  return this.CodeMirror;
})(function () {
  "use strict";


  // BROWSER SNIFFING

  // Kludges for bugs and behavior differences that can't be feature
  // detected are enabled based on userAgent etc sniffing.

  var gecko = /gecko\/\d/i.test(navigator.userAgent);
  // ie_uptoN means Internet Explorer version N or lower
  var ie_upto10 = /MSIE \d/.test(navigator.userAgent);
  var ie_upto7 = ie_upto10 && (document.documentMode == null || document.documentMode < 8);
  var ie_upto8 = ie_upto10 && (document.documentMode == null || document.documentMode < 9);
  var ie_upto9 = ie_upto10 && (document.documentMode == null || document.documentMode < 10);
  var ie_11up = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent);
  var ie = ie_upto10 || ie_11up;
  var webkit = /WebKit\//.test(navigator.userAgent);
  var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(navigator.userAgent);
  var chrome = /Chrome\//.test(navigator.userAgent);
  var presto = /Opera\//.test(navigator.userAgent);
  var safari = /Apple Computer/.test(navigator.vendor);
  var khtml = /KHTML\//.test(navigator.userAgent);
  var mac_geLion = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent);
  var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent);
  var phantom = /PhantomJS/.test(navigator.userAgent);

  var ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
  // This is woefully incomplete. Suggestions for alternative methods welcome.
  var mobile = ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent);
  var mac = ios || /Mac/.test(navigator.platform);
  var windows = /win/i.test(navigator.platform);

  var presto_version = presto && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
  if (presto_version) presto_version = Number(presto_version[1]);
  if (presto_version && presto_version >= 15) { presto = false; webkit = true; }
  // Some browsers use the wrong event properties to signal cmd/ctrl on OS X
  var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
  var captureRightClick = gecko || (ie && !ie_upto8);

  // Optimize some code when these features are not used.
  var sawReadOnlySpans = false, sawCollapsedSpans = false;

  // EDITOR CONSTRUCTOR

  // A CodeMirror instance represents an editor. This is the object
  // that user code is usually dealing with.

  function CodeMirror(place, options) {
    if (!(this instanceof CodeMirror)) return new CodeMirror(place, options);

    this.options = options = options || {};
    // Determine effective options based on given values and defaults.
    for (var opt in defaults) if (!options.hasOwnProperty(opt))
      options[opt] = defaults[opt];
    setGuttersForLineNumbers(options);

    var doc = options.value;
    if (typeof doc == "string") doc = new Doc(doc, options.mode);
    this.doc = doc;

    var display = this.display = new Display(place, doc);
    display.wrapper.CodeMirror = this;
    updateGutters(this);
    themeChanged(this);
    if (options.lineWrapping)
      this.display.wrapper.className += " CodeMirror-wrap";
    if (options.autofocus && !mobile) focusInput(this);

    this.state = {
      keyMaps: [],  // stores maps added by addKeyMap
      overlays: [], // highlighting overlays, as added by addOverlay
      modeGen: 0,   // bumped when mode/overlay changes, used to invalidate highlighting info
      overwrite: false, focused: false,
      suppressEdits: false, // used to disable editing during key handlers when in readOnly mode
      pasteIncoming: false, cutIncoming: false, // help recognize paste/cut edits in readInput
      draggingText: false,
      highlight: new Delayed() // stores highlight worker timeout
    };

    // Override magic textarea content restore that IE sometimes does
    // on our hidden textarea on reload
    if (ie_upto10) setTimeout(bind(resetInput, this, true), 20);

    registerEventHandlers(this);

    var cm = this;
    runInOp(this, function () {
      cm.curOp.forceUpdate = true;
      attachDoc(cm, doc);

      if ((options.autofocus && !mobile) || activeElt() == display.input)
        setTimeout(bind(onFocus, cm), 20);
      else
        onBlur(cm);

      for (var opt in optionHandlers) if (optionHandlers.hasOwnProperty(opt))
        optionHandlers[opt](cm, options[opt], Init);
      for (var i = 0; i < initHooks.length; ++i) initHooks[i](cm);
    });
  }

  // DISPLAY CONSTRUCTOR

  // The display handles the DOM integration, both for input reading
  // and content drawing. It holds references to DOM nodes and
  // display-related state.

  function Display(place, doc) {
    var d = this;

    // The semihidden textarea that is focused when the editor is
    // focused, and receives input.
    var input = d.input = elt("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
    // The textarea is kept positioned near the cursor to prevent the
    // fact that it'll be scrolled into view on input from scrolling
    // our fake cursor out of view. On webkit, when wrap=off, paste is
    // very slow. So make the area wide instead.
    if (webkit) input.style.width = "1000px";
    else input.setAttribute("wrap", "off");
    // If border: 0; -- iOS fails to open keyboard (issue #1287)
    if (ios) input.style.border = "1px solid black";
    input.setAttribute("autocorrect", "off"); input.setAttribute("autocapitalize", "off"); input.setAttribute("spellcheck", "false");

    // Wraps and hides input textarea
    d.inputDiv = elt("div", [input], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
    // The fake scrollbar elements.
    d.scrollbarH = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
    d.scrollbarV = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
    // Covers bottom-right square when both scrollbars are present.
    d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
    // Covers bottom of gutter when coverGutterNextToScrollbar is on
    // and h scrollbar is present.
    d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
    // Will contain the actual code, positioned to cover the viewport.
    d.lineDiv = elt("div", null, "CodeMirror-code");
    // Elements are added to these to represent selection and cursors.
    d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
    d.cursorDiv = elt("div", null, "CodeMirror-cursors");
    // A visibility: hidden element used to find the size of things.
    d.measure = elt("div", null, "CodeMirror-measure");
    // When lines outside of the viewport are measured, they are drawn in this.
    d.lineMeasure = elt("div", null, "CodeMirror-measure");
    // Wraps everything that needs to exist inside the vertically-padded coordinate system
    d.lineSpace = elt("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv],
      null, "position: relative; outline: none");
    // Moved around its parent to cover visible view.
    d.mover = elt("div", [elt("div", [d.lineSpace], "CodeMirror-lines")], null, "position: relative");
    // Set to the height of the document, allowing scrolling.
    d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
    // Behavior of elts with overflow: auto and padding is
    // inconsistent across browsers. This is used to ensure the
    // scrollable area is big enough.
    d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerCutOff + "px; width: 1px;");
    // Will contain the gutters, if any.
    d.gutters = elt("div", null, "CodeMirror-gutters");
    d.lineGutter = null;
    // Actual scrollable element.
    d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
    d.scroller.setAttribute("tabIndex", "-1");
    // The element in which the editor lives.
    d.wrapper = elt("div", [d.inputDiv, d.scrollbarH, d.scrollbarV,
    d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");

    // Work around IE7 z-index bug (not perfect, hence IE7 not really being supported)
    if (ie_upto7) { d.gutters.style.zIndex = -1; d.scroller.style.paddingRight = 0; }
    // Needed to hide big blue blinking cursor on Mobile Safari
    if (ios) input.style.width = "0px";
    if (!webkit) d.scroller.draggable = true;
    // Needed to handle Tab key in KHTML
    if (khtml) { d.inputDiv.style.height = "1px"; d.inputDiv.style.position = "absolute"; }
    // Need to set a minimum width to see the scrollbar on IE7 (but must not set it on IE8).
    if (ie_upto7) d.scrollbarH.style.minHeight = d.scrollbarV.style.minWidth = "18px";

    if (place.appendChild) place.appendChild(d.wrapper);
    else place(d.wrapper);

    // Current rendered range (may be bigger than the view window).
    d.viewFrom = d.viewTo = doc.first;
    // Information about the rendered lines.
    d.view = [];
    // Holds info about a single rendered line when it was rendered
    // for measurement, while not in view.
    d.externalMeasured = null;
    // Empty space (in pixels) above the view
    d.viewOffset = 0;
    d.lastSizeC = 0;
    d.updateLineNumbers = null;

    // Used to only resize the line number gutter when necessary (when
    // the amount of lines crosses a boundary that makes its width change)
    d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
    // See readInput and resetInput
    d.prevInput = "";
    // Set to true when a non-horizontal-scrolling line widget is
    // added. As an optimization, line widget aligning is skipped when
    // this is false.
    d.alignWidgets = false;
    // Flag that indicates whether we expect input to appear real soon
    // now (after some event like 'keypress' or 'input') and are
    // polling intensively.
    d.pollingFast = false;
    // Self-resetting timeout for the poller
    d.poll = new Delayed();

    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;

    // Tracks when resetInput has punted to just putting a short
    // string into the textarea instead of the full selection.
    d.inaccurateSelection = false;

    // Tracks the maximum line length so that the horizontal scrollbar
    // can be kept static when scrolling.
    d.maxLine = null;
    d.maxLineLength = 0;
    d.maxLineChanged = false;

    // Used for measuring wheel scrolling granularity
    d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;

    // True when shift is held down.
    d.shift = false;
  }

  // STATE UPDATES

  // Used to get the editor into a consistent state again when options change.

  function loadMode(cm) {
    cm.doc.mode = CodeMirror.getMode(cm.options, cm.doc.modeOption);
    resetModeState(cm);
  }

  function resetModeState(cm) {
    cm.doc.iter(function (line) {
      if (line.stateAfter) line.stateAfter = null;
      if (line.styles) line.styles = null;
    });
    cm.doc.frontier = cm.doc.first;
    startWorker(cm, 100);
    cm.state.modeGen++;
    if (cm.curOp) regChange(cm);
  }

  function wrappingChanged(cm) {
    if (cm.options.lineWrapping) {
      cm.display.wrapper.className += " CodeMirror-wrap";
      cm.display.sizer.style.minWidth = "";
    } else {
      cm.display.wrapper.className = cm.display.wrapper.className.replace(" CodeMirror-wrap", "");
      findMaxLine(cm);
    }
    estimateLineHeights(cm);
    regChange(cm);
    clearCaches(cm);
    setTimeout(function () { updateScrollbars(cm); }, 100);
  }

  // Returns a function that estimates the height of a line, to use as
  // first approximation until the line becomes visible (and is thus
  // properly measurable).
  function estimateHeight(cm) {
    var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
    var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
    return function (line) {
      if (lineIsHidden(cm.doc, line)) return 0;

      var widgetsHeight = 0;
      if (line.widgets) for (var i = 0; i < line.widgets.length; i++) {
        if (line.widgets[i].height) widgetsHeight += line.widgets[i].height;
      }

      if (wrapping)
        return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
      else
        return widgetsHeight + th;
    };
  }

  function estimateLineHeights(cm) {
    var doc = cm.doc, est = estimateHeight(cm);
    doc.iter(function (line) {
      var estHeight = est(line);
      if (estHeight != line.height) updateLineHeight(line, estHeight);
    });
  }

  function keyMapChanged(cm) {
    var map = keyMap[cm.options.keyMap], style = map.style;
    cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") +
      (style ? " cm-keymap-" + style : "");
  }

  function themeChanged(cm) {
    cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
      cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
    clearCaches(cm);
  }

  function guttersChanged(cm) {
    updateGutters(cm);
    regChange(cm);
    setTimeout(function () { alignHorizontally(cm); }, 20);
  }

  // Rebuild the gutter elements, ensure the margin to the left of the
  // code matches their width.
  function updateGutters(cm) {
    var gutters = cm.display.gutters, specs = cm.options.gutters;
    removeChildren(gutters);
    for (var i = 0; i < specs.length; ++i) {
      var gutterClass = specs[i];
      var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + gutterClass));
      if (gutterClass == "CodeMirror-linenumbers") {
        cm.display.lineGutter = gElt;
        gElt.style.width = (cm.display.lineNumWidth || 1) + "px";
      }
    }
    gutters.style.display = i ? "" : "none";
    var width = gutters.offsetWidth;
    cm.display.sizer.style.marginLeft = width + "px";
    if (i) cm.display.scrollbarH.style.left = cm.options.fixedGutter ? width + "px" : 0;
  }

  // Compute the character length of a line, taking into account
  // collapsed ranges (see markText) that might hide parts, and join
  // other lines onto it.
  function lineLength(line) {
    if (line.height == 0) return 0;
    var len = line.text.length, merged, cur = line;
    while (merged = collapsedSpanAtStart(cur)) {
      var found = merged.find(0, true);
      cur = found.from.line;
      len += found.from.ch - found.to.ch;
    }
    cur = line;
    while (merged = collapsedSpanAtEnd(cur)) {
      var found = merged.find(0, true);
      len -= cur.text.length - found.from.ch;
      cur = found.to.line;
      len += cur.text.length - found.to.ch;
    }
    return len;
  }

  // Find the longest line in the document.
  function findMaxLine(cm) {
    var d = cm.display, doc = cm.doc;
    d.maxLine = getLine(doc, doc.first);
    d.maxLineLength = lineLength(d.maxLine);
    d.maxLineChanged = true;
    doc.iter(function (line) {
      var len = lineLength(line);
      if (len > d.maxLineLength) {
        d.maxLineLength = len;
        d.maxLine = line;
      }
    });
  }

  // Make sure the gutters options contains the element
  // "CodeMirror-linenumbers" when the lineNumbers option is true.
  function setGuttersForLineNumbers(options) {
    var found = indexOf(options.gutters, "CodeMirror-linenumbers");
    if (found == -1 && options.lineNumbers) {
      options.gutters = options.gutters.concat(["CodeMirror-linenumbers"]);
    } else if (found > -1 && !options.lineNumbers) {
      options.gutters = options.gutters.slice(0);
      options.gutters.splice(found, 1);
    }
  }

  // SCROLLBARS

  // Prepare DOM reads needed to update the scrollbars. Done in one
  // shot to minimize update/measure roundtrips.
  function measureForScrollbars(cm) {
    var scroll = cm.display.scroller;
    return {
      clientHeight: scroll.clientHeight,
      barHeight: cm.display.scrollbarV.clientHeight,
      scrollWidth: scroll.scrollWidth, clientWidth: scroll.clientWidth,
      barWidth: cm.display.scrollbarH.clientWidth,
      docHeight: Math.round(cm.doc.height + paddingVert(cm.display))
    };
  }

  // Re-synchronize the fake scrollbars with the actual size of the
  // content.
  function updateScrollbars(cm, measure) {
    if (!measure) measure = measureForScrollbars(cm);
    var d = cm.display;
    var scrollHeight = measure.docHeight + scrollerCutOff;
    var needsH = measure.scrollWidth > measure.clientWidth;
    var needsV = scrollHeight > measure.clientHeight;
    if (needsV) {
      d.scrollbarV.style.display = "block";
      d.scrollbarV.style.bottom = needsH ? scrollbarWidth(d.measure) + "px" : "0";
      // A bug in IE8 can cause this value to be negative, so guard it.
      d.scrollbarV.firstChild.style.height =
        Math.max(0, scrollHeight - measure.clientHeight + (measure.barHeight || d.scrollbarV.clientHeight)) + "px";
    } else {
      d.scrollbarV.style.display = "";
      d.scrollbarV.firstChild.style.height = "0";
    }
    if (needsH) {
      d.scrollbarH.style.display = "block";
      d.scrollbarH.style.right = needsV ? scrollbarWidth(d.measure) + "px" : "0";
      d.scrollbarH.firstChild.style.width =
        (measure.scrollWidth - measure.clientWidth + (measure.barWidth || d.scrollbarH.clientWidth)) + "px";
    } else {
      d.scrollbarH.style.display = "";
      d.scrollbarH.firstChild.style.width = "0";
    }
    if (needsH && needsV) {
      d.scrollbarFiller.style.display = "block";
      d.scrollbarFiller.style.height = d.scrollbarFiller.style.width = scrollbarWidth(d.measure) + "px";
    } else d.scrollbarFiller.style.display = "";
    if (needsH && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
      d.gutterFiller.style.display = "block";
      d.gutterFiller.style.height = scrollbarWidth(d.measure) + "px";
      d.gutterFiller.style.width = d.gutters.offsetWidth + "px";
    } else d.gutterFiller.style.display = "";

    if (mac_geLion && scrollbarWidth(d.measure) === 0) {
      d.scrollbarV.style.minWidth = d.scrollbarH.style.minHeight = mac_geMountainLion ? "18px" : "12px";
      var barMouseDown = function (e) {
        if (e_target(e) != d.scrollbarV && e_target(e) != d.scrollbarH)
          operation(cm, onMouseDown)(e);
      };
      on(d.scrollbarV, "mousedown", barMouseDown);
      on(d.scrollbarH, "mousedown", barMouseDown);
    }
  }

  // Compute the lines that are visible in a given viewport (defaults
  // the the current scroll position). viewPort may contain top,
  // height, and ensure (see op.scrollToPos) properties.
  function visibleLines(display, doc, viewPort) {
    var top = viewPort && viewPort.top != null ? viewPort.top : display.scroller.scrollTop;
    top = Math.floor(top - paddingTop(display));
    var bottom = viewPort && viewPort.bottom != null ? viewPort.bottom : top + display.wrapper.clientHeight;

    var from = lineAtHeight(doc, top), to = lineAtHeight(doc, bottom);
    // Ensure is a {from: {line, ch}, to: {line, ch}} object, and
    // forces those lines into the viewport (if possible).
    if (viewPort && viewPort.ensure) {
      var ensureFrom = viewPort.ensure.from.line, ensureTo = viewPort.ensure.to.line;
      if (ensureFrom < from)
        return {
          from: ensureFrom,
          to: lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight)
        };
      if (Math.min(ensureTo, doc.lastLine()) >= to)
        return {
          from: lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight),
          to: ensureTo
        };
    }
    return { from: from, to: to };
  }

  // LINE NUMBERS

  // Re-align line numbers and gutter marks to compensate for
  // horizontal scrolling.
  function alignHorizontally(cm) {
    var display = cm.display, view = display.view;
    if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) return;
    var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
    var gutterW = display.gutters.offsetWidth, left = comp + "px";
    for (var i = 0; i < view.length; i++) if (!view[i].hidden) {
      if (cm.options.fixedGutter && view[i].gutter)
        view[i].gutter.style.left = left;
      var align = view[i].alignable;
      if (align) for (var j = 0; j < align.length; j++)
        align[j].style.left = left;
    }
    if (cm.options.fixedGutter)
      display.gutters.style.left = (comp + gutterW) + "px";
  }

  // Used to ensure that the line number gutter is still the right
  // size for the current document size. Returns true when an update
  // is needed.
  function maybeUpdateLineNumberWidth(cm) {
    if (!cm.options.lineNumbers) return false;
    var doc = cm.doc, last = lineNumberFor(cm.options, doc.first + doc.size - 1), display = cm.display;
    if (last.length != display.lineNumChars) {
      var test = display.measure.appendChild(elt("div", [elt("div", last)],
        "CodeMirror-linenumber CodeMirror-gutter-elt"));
      var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
      display.lineGutter.style.width = "";
      display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding);
      display.lineNumWidth = display.lineNumInnerWidth + padding;
      display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
      display.lineGutter.style.width = display.lineNumWidth + "px";
      var width = display.gutters.offsetWidth;
      display.scrollbarH.style.left = cm.options.fixedGutter ? width + "px" : 0;
      display.sizer.style.marginLeft = width + "px";
      return true;
    }
    return false;
  }

  function lineNumberFor(options, i) {
    return String(options.lineNumberFormatter(i + options.firstLineNumber));
  }

  // Computes display.scroller.scrollLeft + display.gutters.offsetWidth,
  // but using getBoundingClientRect to get a sub-pixel-accurate
  // result.
  function compensateForHScroll(display) {
    return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
  }

  // DISPLAY DRAWING

  // Updates the display, selection, and scrollbars, using the
  // information in display.view to find out which nodes are no longer
  // up-to-date. Tries to bail out early when no changes are needed,
  // unless forced is true.
  // Returns true if an actual update happened, false otherwise.
  function updateDisplay(cm, viewPort, forced) {
    var oldFrom = cm.display.viewFrom, oldTo = cm.display.viewTo, updated;
    var visible = visibleLines(cm.display, cm.doc, viewPort);
    for (var first = true; ; first = false) {
      var oldWidth = cm.display.scroller.clientWidth;
      if (!updateDisplayInner(cm, visible, forced)) break;
      updated = true;

      // If the max line changed since it was last measured, measure it,
      // and ensure the document's width matches it.
      if (cm.display.maxLineChanged && !cm.options.lineWrapping)
        adjustContentWidth(cm);

      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      setDocumentHeight(cm, barMeasure);
      updateScrollbars(cm, barMeasure);
      if (first && cm.options.lineWrapping && oldWidth != cm.display.scroller.clientWidth) {
        forced = true;
        continue;
      }
      forced = false;

      // Clip forced viewport to actual scrollable area.
      if (viewPort && viewPort.top != null)
        viewPort = { top: Math.min(barMeasure.docHeight - scrollerCutOff - barMeasure.clientHeight, viewPort.top) };
      // Updated line heights might result in the drawn area not
      // actually covering the viewport. Keep looping until it does.
      visible = visibleLines(cm.display, cm.doc, viewPort);
      if (visible.from >= cm.display.viewFrom && visible.to <= cm.display.viewTo)
        break;
    }

    cm.display.updateLineNumbers = null;
    if (updated) {
      signalLater(cm, "update", cm);
      if (cm.display.viewFrom != oldFrom || cm.display.viewTo != oldTo)
        signalLater(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
    }
    return updated;
  }

  // Does the actual updating of the line display. Bails out
  // (returning false) when there is nothing to be done and forced is
  // false.
  function updateDisplayInner(cm, visible, forced) {
    var display = cm.display, doc = cm.doc;
    if (!display.wrapper.offsetWidth) {
      resetView(cm);
      return;
    }

    // Bail out if the visible area is already rendered and nothing changed.
    if (!forced && visible.from >= display.viewFrom && visible.to <= display.viewTo &&
      countDirtyView(cm) == 0)
      return;

    if (maybeUpdateLineNumberWidth(cm))
      resetView(cm);
    var dims = getDimensions(cm);

    // Compute a suitable new viewport (from & to)
    var end = doc.first + doc.size;
    var from = Math.max(visible.from - cm.options.viewportMargin, doc.first);
    var to = Math.min(end, visible.to + cm.options.viewportMargin);
    if (display.viewFrom < from && from - display.viewFrom < 20) from = Math.max(doc.first, display.viewFrom);
    if (display.viewTo > to && display.viewTo - to < 20) to = Math.min(end, display.viewTo);
    if (sawCollapsedSpans) {
      from = visualLineNo(cm.doc, from);
      to = visualLineEndNo(cm.doc, to);
    }

    var different = from != display.viewFrom || to != display.viewTo ||
      display.lastSizeC != display.wrapper.clientHeight;
    adjustView(cm, from, to);

    display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
    // Position the mover div to align with the current scroll position
    cm.display.mover.style.top = display.viewOffset + "px";

    var toUpdate = countDirtyView(cm);
    if (!different && toUpdate == 0 && !forced) return;

    // For big changes, we hide the enclosing element during the
    // update, since that speeds up the operations on most browsers.
    var focused = activeElt();
    if (toUpdate > 4) display.lineDiv.style.display = "none";
    patchDisplay(cm, display.updateLineNumbers, dims);
    if (toUpdate > 4) display.lineDiv.style.display = "";
    // There might have been a widget with a focused element that got
    // hidden or updated, if so re-focus it.
    if (focused && activeElt() != focused && focused.offsetHeight) focused.focus();

    // Prevent selection and cursors from interfering with the scroll
    // width.
    removeChildren(display.cursorDiv);
    removeChildren(display.selectionDiv);

    if (different) {
      display.lastSizeC = display.wrapper.clientHeight;
      startWorker(cm, 400);
    }

    updateHeightsInViewport(cm);

    return true;
  }

  function adjustContentWidth(cm) {
    var display = cm.display;
    var width = measureChar(cm, display.maxLine, display.maxLine.text.length).left;
    display.maxLineChanged = false;
    var minWidth = Math.max(0, width + 3);
    var maxScrollLeft = Math.max(0, display.sizer.offsetLeft + minWidth + scrollerCutOff - display.scroller.clientWidth);
    display.sizer.style.minWidth = minWidth + "px";
    if (maxScrollLeft < cm.doc.scrollLeft)
      setScrollLeft(cm, Math.min(display.scroller.scrollLeft, maxScrollLeft), true);
  }

  function setDocumentHeight(cm, measure) {
    cm.display.sizer.style.minHeight = cm.display.heightForcer.style.top = measure.docHeight + "px";
    cm.display.gutters.style.height = Math.max(measure.docHeight, measure.clientHeight - scrollerCutOff) + "px";
  }

  // Read the actual heights of the rendered lines, and update their
  // stored heights to match.
  function updateHeightsInViewport(cm) {
    var display = cm.display;
    var prevBottom = display.lineDiv.offsetTop;
    for (var i = 0; i < display.view.length; i++) {
      var cur = display.view[i], height;
      if (cur.hidden) continue;
      if (ie_upto7) {
        var bot = cur.node.offsetTop + cur.node.offsetHeight;
        height = bot - prevBottom;
        prevBottom = bot;
      } else {
        var box = cur.node.getBoundingClientRect();
        height = box.bottom - box.top;
      }
      var diff = cur.line.height - height;
      if (height < 2) height = textHeight(display);
      if (diff > .001 || diff < -.001) {
        updateLineHeight(cur.line, height);
        updateWidgetHeight(cur.line);
        if (cur.rest) for (var j = 0; j < cur.rest.length; j++)
          updateWidgetHeight(cur.rest[j]);
      }
    }
  }

  // Read and store the height of line widgets associated with the
  // given line.
  function updateWidgetHeight(line) {
    if (line.widgets) for (var i = 0; i < line.widgets.length; ++i)
      line.widgets[i].height = line.widgets[i].node.offsetHeight;
  }

  // Do a bulk-read of the DOM positions and sizes needed to draw the
  // view, so that we don't interleave reading and writing to the DOM.
  function getDimensions(cm) {
    var d = cm.display, left = {}, width = {};
    for (var n = d.gutters.firstChild, i = 0; n; n = n.nextSibling, ++i) {
      left[cm.options.gutters[i]] = n.offsetLeft;
      width[cm.options.gutters[i]] = n.offsetWidth;
    }
    return {
      fixedPos: compensateForHScroll(d),
      gutterTotalWidth: d.gutters.offsetWidth,
      gutterLeft: left,
      gutterWidth: width,
      wrapperWidth: d.wrapper.clientWidth
    };
  }

  // Sync the actual display DOM structure with display.view, removing
  // nodes for lines that are no longer in view, and creating the ones
  // that are not there yet, and updating the ones that are out of
  // date.
  function patchDisplay(cm, updateNumbersFrom, dims) {
    var display = cm.display, lineNumbers = cm.options.lineNumbers;
    var container = display.lineDiv, cur = container.firstChild;

    function rm(node) {
      var next = node.nextSibling;
      // Works around a throw-scroll bug in OS X Webkit
      if (webkit && mac && cm.display.currentWheelTarget == node)
        node.style.display = "none";
      else
        node.parentNode.removeChild(node);
      return next;
    }

    var view = display.view, lineN = display.viewFrom;
    // Loop over the elements in the view, syncing cur (the DOM nodes
    // in display.lineDiv) with the view as we go.
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (lineView.hidden) {
      } else if (!lineView.node) { // Not drawn yet
        var node = buildLineElement(cm, lineView, lineN, dims);
        container.insertBefore(node, cur);
      } else { // Already drawn
        while (cur != lineView.node) cur = rm(cur);
        var updateNumber = lineNumbers && updateNumbersFrom != null &&
          updateNumbersFrom <= lineN && lineView.lineNumber;
        if (lineView.changes) {
          if (indexOf(lineView.changes, "gutter") > -1) updateNumber = false;
          updateLineForChanges(cm, lineView, lineN, dims);
        }
        if (updateNumber) {
          removeChildren(lineView.lineNumber);
          lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
        }
        cur = lineView.node.nextSibling;
      }
      lineN += lineView.size;
    }
    while (cur) cur = rm(cur);
  }

  // When an aspect of a line changes, a string is added to
  // lineView.changes. This updates the relevant part of the line's
  // DOM structure.
  function updateLineForChanges(cm, lineView, lineN, dims) {
    for (var j = 0; j < lineView.changes.length; j++) {
      var type = lineView.changes[j];
      if (type == "text") updateLineText(cm, lineView);
      else if (type == "gutter") updateLineGutter(cm, lineView, lineN, dims);
      else if (type == "class") updateLineClasses(lineView);
      else if (type == "widget") updateLineWidgets(lineView, dims);
    }
    lineView.changes = null;
  }

  // Lines with gutter elements, widgets or a background class need to
  // be wrapped, and have the extra elements added to the wrapper div
  function ensureLineWrapped(lineView) {
    if (lineView.node == lineView.text) {
      lineView.node = elt("div", null, null, "position: relative");
      if (lineView.text.parentNode)
        lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
      lineView.node.appendChild(lineView.text);
      if (ie_upto7) lineView.node.style.zIndex = 2;
    }
    return lineView.node;
  }

  function updateLineBackground(lineView) {
    var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
    if (cls) cls += " CodeMirror-linebackground";
    if (lineView.background) {
      if (cls) lineView.background.className = cls;
      else { lineView.background.parentNode.removeChild(lineView.background); lineView.background = null; }
    } else if (cls) {
      var wrap = ensureLineWrapped(lineView);
      lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
    }
  }

  // Wrapper around buildLineContent which will reuse the structure
  // in display.externalMeasured when possible.
  function getLineContent(cm, lineView) {
    var ext = cm.display.externalMeasured;
    if (ext && ext.line == lineView.line) {
      cm.display.externalMeasured = null;
      lineView.measure = ext.measure;
      return ext.built;
    }
    return buildLineContent(cm, lineView);
  }

  // Redraw the line's text. Interacts with the background and text
  // classes because the mode may output tokens that influence these
  // classes.
  function updateLineText(cm, lineView) {
    var cls = lineView.text.className;
    var built = getLineContent(cm, lineView);
    if (lineView.text == lineView.node) lineView.node = built.pre;
    lineView.text.parentNode.replaceChild(built.pre, lineView.text);
    lineView.text = built.pre;
    if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
      lineView.bgClass = built.bgClass;
      lineView.textClass = built.textClass;
      updateLineClasses(lineView);
    } else if (cls) {
      lineView.text.className = cls;
    }
  }

  function updateLineClasses(lineView) {
    updateLineBackground(lineView);
    if (lineView.line.wrapClass)
      ensureLineWrapped(lineView).className = lineView.line.wrapClass;
    else if (lineView.node != lineView.text)
      lineView.node.className = "";
    var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
    lineView.text.className = textClass || "";
  }

  function updateLineGutter(cm, lineView, lineN, dims) {
    if (lineView.gutter) {
      lineView.node.removeChild(lineView.gutter);
      lineView.gutter = null;
    }
    var markers = lineView.line.gutterMarkers;
    if (cm.options.lineNumbers || markers) {
      var wrap = ensureLineWrapped(lineView);
      var gutterWrap = lineView.gutter =
        wrap.insertBefore(elt("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " +
          (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px"),
          lineView.text);
      if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"]))
        lineView.lineNumber = gutterWrap.appendChild(
          elt("div", lineNumberFor(cm.options, lineN),
            "CodeMirror-linenumber CodeMirror-gutter-elt",
            "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: "
            + cm.display.lineNumInnerWidth + "px"));
      if (markers) for (var k = 0; k < cm.options.gutters.length; ++k) {
        var id = cm.options.gutters[k], found = markers.hasOwnProperty(id) && markers[id];
        if (found)
          gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt", "left: " +
            dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
      }
    }
  }

  function updateLineWidgets(lineView, dims) {
    if (lineView.alignable) lineView.alignable = null;
    for (var node = lineView.node.firstChild, next; node; node = next) {
      var next = node.nextSibling;
      if (node.className == "CodeMirror-linewidget")
        lineView.node.removeChild(node);
    }
    insertLineWidgets(lineView, dims);
  }

  // Build a line's DOM representation from scratch
  function buildLineElement(cm, lineView, lineN, dims) {
    var built = getLineContent(cm, lineView);
    lineView.text = lineView.node = built.pre;
    if (built.bgClass) lineView.bgClass = built.bgClass;
    if (built.textClass) lineView.textClass = built.textClass;

    updateLineClasses(lineView);
    updateLineGutter(cm, lineView, lineN, dims);
    insertLineWidgets(lineView, dims);
    return lineView.node;
  }

  // A lineView may contain multiple logical lines (when merged by
  // collapsed spans). The widgets for all of them need to be drawn.
  function insertLineWidgets(lineView, dims) {
    insertLineWidgetsFor(lineView.line, lineView, dims, true);
    if (lineView.rest) for (var i = 0; i < lineView.rest.length; i++)
      insertLineWidgetsFor(lineView.rest[i], lineView, dims, false);
  }

  function insertLineWidgetsFor(line, lineView, dims, allowAbove) {
    if (!line.widgets) return;
    var wrap = ensureLineWrapped(lineView);
    for (var i = 0, ws = line.widgets; i < ws.length; ++i) {
      var widget = ws[i], node = elt("div", [widget.node], "CodeMirror-linewidget");
      if (!widget.handleMouseEvents) node.ignoreEvents = true;
      positionLineWidget(widget, node, lineView, dims);
      if (allowAbove && widget.above)
        wrap.insertBefore(node, lineView.gutter || lineView.text);
      else
        wrap.appendChild(node);
      signalLater(widget, "redraw");
    }
  }

  function positionLineWidget(widget, node, lineView, dims) {
    if (widget.noHScroll) {
      (lineView.alignable || (lineView.alignable = [])).push(node);
      var width = dims.wrapperWidth;
      node.style.left = dims.fixedPos + "px";
      if (!widget.coverGutter) {
        width -= dims.gutterTotalWidth;
        node.style.paddingLeft = dims.gutterTotalWidth + "px";
      }
      node.style.width = width + "px";
    }
    if (widget.coverGutter) {
      node.style.zIndex = 5;
      node.style.position = "relative";
      if (!widget.noHScroll) node.style.marginLeft = -dims.gutterTotalWidth + "px";
    }
  }

  // POSITION OBJECT

  // A Pos instance represents a position within the text.
  var Pos = CodeMirror.Pos = function (line, ch) {
    if (!(this instanceof Pos)) return new Pos(line, ch);
    this.line = line; this.ch = ch;
  };

  // Compare two positions, return 0 if they are the same, a negative
  // number when a is less, and a positive number otherwise.
  var cmp = CodeMirror.cmpPos = function (a, b) { return a.line - b.line || a.ch - b.ch; };

  function copyPos(x) { return Pos(x.line, x.ch); }
  function maxPos(a, b) { return cmp(a, b) < 0 ? b : a; }
  function minPos(a, b) { return cmp(a, b) < 0 ? a : b; }

  // SELECTION / CURSOR

  // Selection objects are immutable. A new one is created every time
  // the selection changes. A selection is one or more non-overlapping
  // (and non-touching) ranges, sorted, and an integer that indicates
  // which one is the primary selection (the one that's scrolled into
  // view, that getCursor returns, etc).
  function Selection(ranges, primIndex) {
    this.ranges = ranges;
    this.primIndex = primIndex;
  }

  Selection.prototype = {
    primary: function () { return this.ranges[this.primIndex]; },
    equals: function (other) {
      if (other == this) return true;
      if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) return false;
      for (var i = 0; i < this.ranges.length; i++) {
        var here = this.ranges[i], there = other.ranges[i];
        if (cmp(here.anchor, there.anchor) != 0 || cmp(here.head, there.head) != 0) return false;
      }
      return true;
    },
    deepCopy: function () {
      for (var out = [], i = 0; i < this.ranges.length; i++)
        out[i] = new Range(copyPos(this.ranges[i].anchor), copyPos(this.ranges[i].head));
      return new Selection(out, this.primIndex);
    },
    somethingSelected: function () {
      for (var i = 0; i < this.ranges.length; i++)
        if (!this.ranges[i].empty()) return true;
      return false;
    },
    contains: function (pos, end) {
      if (!end) end = pos;
      for (var i = 0; i < this.ranges.length; i++) {
        var range = this.ranges[i];
        if (cmp(end, range.from()) >= 0 && cmp(pos, range.to()) <= 0)
          return i;
      }
      return -1;
    }
  };

  function Range(anchor, head) {
    this.anchor = anchor; this.head = head;
  }

  Range.prototype = {
    from: function () { return minPos(this.anchor, this.head); },
    to: function () { return maxPos(this.anchor, this.head); },
    empty: function () {
      return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
    }
  };

  // Take an unsorted, potentially overlapping set of ranges, and
  // build a selection out of it. 'Consumes' ranges array (modifying
  // it).
  function normalizeSelection(ranges, primIndex) {
    var prim = ranges[primIndex];
    ranges.sort(function (a, b) { return cmp(a.from(), b.from()); });
    primIndex = indexOf(ranges, prim);
    for (var i = 1; i < ranges.length; i++) {
      var cur = ranges[i], prev = ranges[i - 1];
      if (cmp(prev.to(), cur.from()) >= 0) {
        var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
        var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
        if (i <= primIndex)--primIndex;
        ranges.splice(--i, 2, new Range(inv ? to : from, inv ? from : to));
      }
    }
    return new Selection(ranges, primIndex);
  }

  function simpleSelection(anchor, head) {
    return new Selection([new Range(anchor, head || anchor)], 0);
  }

  // Most of the external API clips given positions to make sure they
  // actually exist within the document.
  function clipLine(doc, n) { return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1)); }
  function clipPos(doc, pos) {
    if (pos.line < doc.first) return Pos(doc.first, 0);
    var last = doc.first + doc.size - 1;
    if (pos.line > last) return Pos(last, getLine(doc, last).text.length);
    return clipToLen(pos, getLine(doc, pos.line).text.length);
  }
  function clipToLen(pos, linelen) {
    var ch = pos.ch;
    if (ch == null || ch > linelen) return Pos(pos.line, linelen);
    else if (ch < 0) return Pos(pos.line, 0);
    else return pos;
  }
  function isLine(doc, l) { return l >= doc.first && l < doc.first + doc.size; }
  function clipPosArray(doc, array) {
    for (var out = [], i = 0; i < array.length; i++) out[i] = clipPos(doc, array[i]);
    return out;
  }

  // SELECTION UPDATES

  // The 'scroll' parameter given to many of these indicated whether
  // the new cursor position should be scrolled into view after
  // modifying the selection.

  // If shift is held or the extend flag is set, extends a range to
  // include a given position (and optionally a second position).
  // Otherwise, simply returns the range between the given positions.
  // Used for cursor motion and such.
  function extendRange(doc, range, head, other) {
    if (doc.cm && doc.cm.display.shift || doc.extend) {
      var anchor = range.anchor;
      if (other) {
        var posBefore = cmp(head, anchor) < 0;
        if (posBefore != (cmp(other, anchor) < 0)) {
          anchor = head;
          head = other;
        } else if (posBefore != (cmp(head, other) < 0)) {
          head = other;
        }
      }
      return new Range(anchor, head);
    } else {
      return new Range(other || head, head);
    }
  }

  // Extend the primary selection range, discard the rest.
  function extendSelection(doc, head, other, options) {
    setSelection(doc, new Selection([extendRange(doc, doc.sel.primary(), head, other)], 0), options);
  }

  // Extend all selections (pos is an array of selections with length
  // equal the number of selections)
  function extendSelections(doc, heads, options) {
    for (var out = [], i = 0; i < doc.sel.ranges.length; i++)
      out[i] = extendRange(doc, doc.sel.ranges[i], heads[i], null);
    var newSel = normalizeSelection(out, doc.sel.primIndex);
    setSelection(doc, newSel, options);
  }

  // Updates a single range in the selection.
  function replaceOneSelection(doc, i, range, options) {
    var ranges = doc.sel.ranges.slice(0);
    ranges[i] = range;
    setSelection(doc, normalizeSelection(ranges, doc.sel.primIndex), options);
  }

  // Reset the selection to a single range.
  function setSimpleSelection(doc, anchor, head, options) {
    setSelection(doc, simpleSelection(anchor, head), options);
  }

  // Give beforeSelectionChange handlers a change to influence a
  // selection update.
  function filterSelectionChange(doc, sel) {
    var obj = {
      ranges: sel.ranges,
      update: function (ranges) {
        this.ranges = [];
        for (var i = 0; i < ranges.length; i++)
          this.ranges[i] = new Range(clipPos(doc, ranges[i].anchor),
            clipPos(doc, ranges[i].head));
      }
    };
    signal(doc, "beforeSelectionChange", doc, obj);
    if (doc.cm) signal(doc.cm, "beforeSelectionChange", doc.cm, obj);
    if (obj.ranges != sel.ranges) return normalizeSelection(obj.ranges, obj.ranges.length - 1);
    else return sel;
  }

  function setSelectionReplaceHistory(doc, sel, options) {
    var done = doc.history.done, last = lst(done);
    if (last && last.ranges) {
      done[done.length - 1] = sel;
      setSelectionNoUndo(doc, sel, options);
    } else {
      setSelection(doc, sel, options);
    }
  }

  // Set a new selection.
  function setSelection(doc, sel, options) {
    setSelectionNoUndo(doc, sel, options);
    addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
  }

  function setSelectionNoUndo(doc, sel, options) {
    if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange"))
      sel = filterSelectionChange(doc, sel);

    var bias = cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1;
    setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));

    if (!(options && options.scroll === false) && doc.cm)
      ensureCursorVisible(doc.cm);
  }

  function setSelectionInner(doc, sel) {
    if (sel.equals(doc.sel)) return;

    doc.sel = sel;

    if (doc.cm)
      doc.cm.curOp.updateInput = doc.cm.curOp.selectionChanged =
        doc.cm.curOp.cursorActivity = true;
    signalLater(doc, "cursorActivity", doc);
  }

  // Verify that the selection does not partially select any atomic
  // marked ranges.
  function reCheckSelection(doc) {
    setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false), sel_dontScroll);
  }

  // Return a selection that does not partially select any atomic
  // ranges.
  function skipAtomicInSelection(doc, sel, bias, mayClear) {
    var out;
    for (var i = 0; i < sel.ranges.length; i++) {
      var range = sel.ranges[i];
      var newAnchor = skipAtomic(doc, range.anchor, bias, mayClear);
      var newHead = skipAtomic(doc, range.head, bias, mayClear);
      if (out || newAnchor != range.anchor || newHead != range.head) {
        if (!out) out = sel.ranges.slice(0, i);
        out[i] = new Range(newAnchor, newHead);
      }
    }
    return out ? normalizeSelection(out, sel.primIndex) : sel;
  }

  // Ensure a given position is not inside an atomic range.
  function skipAtomic(doc, pos, bias, mayClear) {
    var flipped = false, curPos = pos;
    var dir = bias || 1;
    doc.cantEdit = false;
    search: for (; ;) {
      var line = getLine(doc, curPos.line);
      if (line.markedSpans) {
        for (var i = 0; i < line.markedSpans.length; ++i) {
          var sp = line.markedSpans[i], m = sp.marker;
          if ((sp.from == null || (m.inclusiveLeft ? sp.from <= curPos.ch : sp.from < curPos.ch)) &&
            (sp.to == null || (m.inclusiveRight ? sp.to >= curPos.ch : sp.to > curPos.ch))) {
            if (mayClear) {
              signal(m, "beforeCursorEnter");
              if (m.explicitlyCleared) {
                if (!line.markedSpans) break;
                else { --i; continue; }
              }
            }
            if (!m.atomic) continue;
            var newPos = m.find(dir < 0 ? -1 : 1);
            if (cmp(newPos, curPos) == 0) {
              newPos.ch += dir;
              if (newPos.ch < 0) {
                if (newPos.line > doc.first) newPos = clipPos(doc, Pos(newPos.line - 1));
                else newPos = null;
              } else if (newPos.ch > line.text.length) {
                if (newPos.line < doc.first + doc.size - 1) newPos = Pos(newPos.line + 1, 0);
                else newPos = null;
              }
              if (!newPos) {
                if (flipped) {
                  // Driven in a corner -- no valid cursor position found at all
                  // -- try again *with* clearing, if we didn't already
                  if (!mayClear) return skipAtomic(doc, pos, bias, true);
                  // Otherwise, turn off editing until further notice, and return the start of the doc
                  doc.cantEdit = true;
                  return Pos(doc.first, 0);
                }
                flipped = true; newPos = pos; dir = -dir;
              }
            }
            curPos = newPos;
            continue search;
          }
        }
      }
      return curPos;
    }
  }

  // SELECTION DRAWING

  // Redraw the selection and/or cursor
  function updateSelection(cm) {
    var display = cm.display, doc = cm.doc;
    var curFragment = document.createDocumentFragment();
    var selFragment = document.createDocumentFragment();

    for (var i = 0; i < doc.sel.ranges.length; i++) {
      var range = doc.sel.ranges[i];
      var collapsed = range.empty();
      if (collapsed || cm.options.showCursorWhenSelecting)
        updateSelectionCursor(cm, range, curFragment);
      if (!collapsed)
        updateSelectionRange(cm, range, selFragment);
    }

    // Move the hidden textarea near the cursor to prevent scrolling artifacts
    if (cm.options.moveInputWithCursor) {
      var headPos = cursorCoords(cm, doc.sel.primary().head, "div");
      var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
      var top = Math.max(0, Math.min(display.wrapper.clientHeight - 10,
        headPos.top + lineOff.top - wrapOff.top));
      var left = Math.max(0, Math.min(display.wrapper.clientWidth - 10,
        headPos.left + lineOff.left - wrapOff.left));
      display.inputDiv.style.top = top + "px";
      display.inputDiv.style.left = left + "px";
    }

    removeChildrenAndAdd(display.cursorDiv, curFragment);
    removeChildrenAndAdd(display.selectionDiv, selFragment);
  }

  // Draws a cursor for the given range
  function updateSelectionCursor(cm, range, output) {
    var pos = cursorCoords(cm, range.head, "div");

    var cursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor"));
    cursor.style.left = pos.left + "px";
    cursor.style.top = pos.top + "px";
    cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";

    if (pos.other) {
      // Secondary cursor, shown when on a 'jump' in bi-directional text
      var otherCursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor"));
      otherCursor.style.display = "";
      otherCursor.style.left = pos.other.left + "px";
      otherCursor.style.top = pos.other.top + "px";
      otherCursor.style.height = (pos.other.bottom - pos.other.top) * .85 + "px";
    }
  }

  // Draws the given range as a highlighted selection
  function updateSelectionRange(cm, range, output) {
    var display = cm.display, doc = cm.doc;
    var fragment = document.createDocumentFragment();
    var padding = paddingH(cm.display), leftSide = padding.left, rightSide = display.lineSpace.offsetWidth - padding.right;

    function add(left, top, width, bottom) {
      if (top < 0) top = 0;
      fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left +
        "px; top: " + top + "px; width: " + (width == null ? rightSide - left : width) +
        "px; height: " + (bottom - top) + "px"));
    }

    function drawForLine(line, fromArg, toArg) {
      var lineObj = getLine(doc, line);
      var lineLen = lineObj.text.length;
      var start, end;
      function coords(ch, bias) {
        return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
      }

      iterateBidiSections(getOrder(lineObj), fromArg || 0, toArg == null ? lineLen : toArg, function (from, to, dir) {
        var leftPos = coords(from, "left"), rightPos, left, right;
        if (from == to) {
          rightPos = leftPos;
          left = right = leftPos.left;
        } else {
          rightPos = coords(to - 1, "right");
          if (dir == "rtl") { var tmp = leftPos; leftPos = rightPos; rightPos = tmp; }
          left = leftPos.left;
          right = rightPos.right;
        }
        if (fromArg == null && from == 0) left = leftSide;
        if (rightPos.top - leftPos.top > 3) { // Different lines, draw top part
          add(left, leftPos.top, null, leftPos.bottom);
          left = leftSide;
          if (leftPos.bottom < rightPos.top) add(left, leftPos.bottom, null, rightPos.top);
        }
        if (toArg == null && to == lineLen) right = rightSide;
        if (!start || leftPos.top < start.top || leftPos.top == start.top && leftPos.left < start.left)
          start = leftPos;
        if (!end || rightPos.bottom > end.bottom || rightPos.bottom == end.bottom && rightPos.right > end.right)
          end = rightPos;
        if (left < leftSide + 1) left = leftSide;
        add(left, rightPos.top, right - left, rightPos.bottom);
      });
      return { start: start, end: end };
    }

    var sFrom = range.from(), sTo = range.to();
    if (sFrom.line == sTo.line) {
      drawForLine(sFrom.line, sFrom.ch, sTo.ch);
    } else {
      var fromLine = getLine(doc, sFrom.line), toLine = getLine(doc, sTo.line);
      var singleVLine = visualLine(fromLine) == visualLine(toLine);
      var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
      var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
      if (singleVLine) {
        if (leftEnd.top < rightStart.top - 2) {
          add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
          add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
        } else {
          add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
        }
      }
      if (leftEnd.bottom < rightStart.top)
        add(leftSide, leftEnd.bottom, null, rightStart.top);
    }

    output.appendChild(fragment);
  }

  // Cursor-blinking
  function restartBlink(cm) {
    if (!cm.state.focused) return;
    var display = cm.display;
    clearInterval(display.blinker);
    var on = true;
    display.cursorDiv.style.visibility = "";
    if (cm.options.cursorBlinkRate > 0)
      display.blinker = setInterval(function () {
        display.cursorDiv.style.visibility = (on = !on) ? "" : "hidden";
      }, cm.options.cursorBlinkRate);
  }

  // HIGHLIGHT WORKER

  function startWorker(cm, time) {
    if (cm.doc.mode.startState && cm.doc.frontier < cm.display.viewTo)
      cm.state.highlight.set(time, bind(highlightWorker, cm));
  }

  function highlightWorker(cm) {
    var doc = cm.doc;
    if (doc.frontier < doc.first) doc.frontier = doc.first;
    if (doc.frontier >= cm.display.viewTo) return;
    var end = +new Date + cm.options.workTime;
    var state = copyState(doc.mode, getStateBefore(cm, doc.frontier));

    runInOp(cm, function () {
      doc.iter(doc.frontier, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function (line) {
        if (doc.frontier >= cm.display.viewFrom) { // Visible
          var oldStyles = line.styles;
          line.styles = highlightLine(cm, line, state, true);
          var ischange = !oldStyles || oldStyles.length != line.styles.length;
          for (var i = 0; !ischange && i < oldStyles.length; ++i) ischange = oldStyles[i] != line.styles[i];
          if (ischange) regLineChange(cm, doc.frontier, "text");
          line.stateAfter = copyState(doc.mode, state);
        } else {
          processLine(cm, line.text, state);
          line.stateAfter = doc.frontier % 5 == 0 ? copyState(doc.mode, state) : null;
        }
        ++doc.frontier;
        if (+new Date > end) {
          startWorker(cm, cm.options.workDelay);
          return true;
        }
      });
    });
  }

  // Finds the line to start with when starting a parse. Tries to
  // find a line with a stateAfter, so that it can start with a
  // valid state. If that fails, it returns the line with the
  // smallest indentation, which tends to need the least context to
  // parse correctly.
  function findStartLine(cm, n, precise) {
    var minindent, minline, doc = cm.doc;
    var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1000 : 100);
    for (var search = n; search > lim; --search) {
      if (search <= doc.first) return doc.first;
      var line = getLine(doc, search - 1);
      if (line.stateAfter && (!precise || search <= doc.frontier)) return search;
      var indented = countColumn(line.text, null, cm.options.tabSize);
      if (minline == null || minindent > indented) {
        minline = search - 1;
        minindent = indented;
      }
    }
    return minline;
  }

  function getStateBefore(cm, n, precise) {
    var doc = cm.doc, display = cm.display;
    if (!doc.mode.startState) return true;
    var pos = findStartLine(cm, n, precise), state = pos > doc.first && getLine(doc, pos - 1).stateAfter;
    if (!state) state = startState(doc.mode);
    else state = copyState(doc.mode, state);
    doc.iter(pos, n, function (line) {
      processLine(cm, line.text, state);
      var save = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo;
      line.stateAfter = save ? copyState(doc.mode, state) : null;
      ++pos;
    });
    if (precise) doc.frontier = pos;
    return state;
  }

  // POSITION MEASUREMENT

  function paddingTop(display) { return display.lineSpace.offsetTop; }
  function paddingVert(display) { return display.mover.offsetHeight - display.lineSpace.offsetHeight; }
  function paddingH(display) {
    if (display.cachedPaddingH) return display.cachedPaddingH;
    var e = removeChildrenAndAdd(display.measure, elt("pre", "x"));
    var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
    return display.cachedPaddingH = {
      left: parseInt(style.paddingLeft),
      right: parseInt(style.paddingRight)
    };
  }

  // Ensure the lineView.wrapping.heights array is populated. This is
  // an array of bottom offsets for the lines that make up a drawn
  // line. When lineWrapping is on, there might be more than one
  // height.
  function ensureLineHeights(cm, lineView, rect) {
    var wrapping = cm.options.lineWrapping;
    var curWidth = wrapping && cm.display.scroller.clientWidth;
    if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
      var heights = lineView.measure.heights = [];
      if (wrapping) {
        lineView.measure.width = curWidth;
        var rects = lineView.text.firstChild.getClientRects();
        for (var i = 0; i < rects.length - 1; i++) {
          var cur = rects[i], next = rects[i + 1];
          if (Math.abs(cur.bottom - next.bottom) > 2)
            heights.push((cur.bottom + next.top) / 2 - rect.top);
        }
      }
      heights.push(rect.bottom - rect.top);
    }
  }

  // Find a line map (mapping character offsets to text nodes) and a
  // measurement cache for the given line number. (A line view might
  // contain multiple lines when collapsed ranges are present.)
  function mapFromLineView(lineView, line, lineN) {
    if (lineView.line == line)
      return { map: lineView.measure.map, cache: lineView.measure.cache };
    for (var i = 0; i < lineView.rest.length; i++)
      if (lineView.rest[i] == line)
        return { map: lineView.measure.maps[i], cache: lineView.measure.caches[i] };
    for (var i = 0; i < lineView.rest.length; i++)
      if (lineNo(lineView.rest[i]) > lineN)
        return { map: lineView.measure.maps[i], cache: lineView.measure.caches[i], before: true };
  }

  // Render a line into the hidden node display.externalMeasured. Used
  // when measurement is needed for a line that's not in the viewport.
  function updateExternalMeasurement(cm, line) {
    line = visualLine(line);
    var lineN = lineNo(line);
    var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
    view.lineN = lineN;
    var built = view.built = buildLineContent(cm, view);
    view.text = built.pre;
    removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
    return view;
  }

  // Get a {top, bottom, left, right} box (in line-local coordinates)
  // for a given character.
  function measureChar(cm, line, ch, bias) {
    return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
  }

  // Find a line view that corresponds to the given line number.
  function findViewForLine(cm, lineN) {
    if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo)
      return cm.display.view[findViewIndex(cm, lineN)];
    var ext = cm.display.externalMeasured;
    if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size)
      return ext;
  }

  // Measurement can be split in two steps, the set-up work that
  // applies to the whole line, and the measurement of the actual
  // character. Functions like coordsChar, that need to do a lot of
  // measurements in a row, can thus ensure that the set-up work is
  // only done once.
  function prepareMeasureForLine(cm, line) {
    var lineN = lineNo(line);
    var view = findViewForLine(cm, lineN);
    if (view && !view.text)
      view = null;
    else if (view && view.changes)
      updateLineForChanges(cm, view, lineN, getDimensions(cm));
    if (!view)
      view = updateExternalMeasurement(cm, line);

    var info = mapFromLineView(view, line, lineN);
    return {
      line: line, view: view, rect: null,
      map: info.map, cache: info.cache, before: info.before,
      hasHeights: false
    };
  }

  // Given a prepared measurement object, measures the position of an
  // actual character (or fetches it from the cache).
  function measureCharPrepared(cm, prepared, ch, bias) {
    if (prepared.before) ch = -1;
    var key = ch + (bias || ""), found;
    if (prepared.cache.hasOwnProperty(key)) {
      found = prepared.cache[key];
    } else {
      if (!prepared.rect)
        prepared.rect = prepared.view.text.getBoundingClientRect();
      if (!prepared.hasHeights) {
        ensureLineHeights(cm, prepared.view, prepared.rect);
        prepared.hasHeights = true;
      }
      found = measureCharInner(cm, prepared, ch, bias);
      if (!found.bogus) prepared.cache[key] = found;
    }
    return { left: found.left, right: found.right, top: found.top, bottom: found.bottom };
  }

  var nullRect = { left: 0, right: 0, top: 0, bottom: 0 };

  function measureCharInner(cm, prepared, ch, bias) {
    var map = prepared.map;

    var node, start, end, collapse;
    // First, search the line map for the text node corresponding to,
    // or closest to, the target character.
    for (var i = 0; i < map.length; i += 3) {
      var mStart = map[i], mEnd = map[i + 1];
      if (ch < mStart) {
        start = 0; end = 1;
        collapse = "left";
      } else if (ch < mEnd) {
        start = ch - mStart;
        end = start + 1;
      } else if (i == map.length - 3 || ch == mEnd && map[i + 3] > ch) {
        end = mEnd - mStart;
        start = end - 1;
        if (ch >= mEnd) collapse = "right";
      }
      if (start != null) {
        node = map[i + 2];
        if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right"))
          collapse = bias;
        if (bias == "left" && start == 0)
          while (i && map[i - 2] == map[i - 3] && map[i - 1].insertLeft) {
            node = map[(i -= 3) + 2];
            collapse = "left";
          }
        if (bias == "right" && start == mEnd - mStart)
          while (i < map.length - 3 && map[i + 3] == map[i + 4] && !map[i + 5].insertLeft) {
            node = map[(i += 3) + 2];
            collapse = "right";
          }
        break;
      }
    }

    var rect;
    if (node.nodeType == 3) { // If it is a text node, use a range to retrieve the coordinates.
      while (start && isExtendingChar(prepared.line.text.charAt(mStart + start)))--start;
      while (mStart + end < mEnd && isExtendingChar(prepared.line.text.charAt(mStart + end)))++end;
      if (ie_upto8 && start == 0 && end == mEnd - mStart) {
        rect = node.parentNode.getBoundingClientRect();
      } else if (ie && cm.options.lineWrapping) {
        var rects = range(node, start, end).getClientRects();
        if (rects.length)
          rect = rects[bias == "right" ? rects.length - 1 : 0];
        else
          rect = nullRect;
      } else {
        rect = range(node, start, end).getBoundingClientRect();
      }
    } else { // If it is a widget, simply get the box for the whole widget.
      if (start > 0) collapse = bias = "right";
      var rects;
      if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1)
        rect = rects[bias == "right" ? rects.length - 1 : 0];
      else
        rect = node.getBoundingClientRect();
    }
    if (ie_upto8 && !start && (!rect || !rect.left && !rect.right)) {
      var rSpan = node.parentNode.getClientRects()[0];
      if (rSpan)
        rect = { left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom };
      else
        rect = nullRect;
    }

    var top, bot = (rect.bottom + rect.top) / 2 - prepared.rect.top;
    var heights = prepared.view.measure.heights;
    for (var i = 0; i < heights.length - 1; i++)
      if (bot < heights[i]) break;
    top = i ? heights[i - 1] : 0; bot = heights[i];
    var result = {
      left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
      right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
      top: top, bottom: bot
    };
    if (!rect.left && !rect.right) result.bogus = true;
    return result;
  }

  function clearLineMeasurementCacheFor(lineView) {
    if (lineView.measure) {
      lineView.measure.cache = {};
      lineView.measure.heights = null;
      if (lineView.rest) for (var i = 0; i < lineView.rest.length; i++)
        lineView.measure.caches[i] = {};
    }
  }

  function clearLineMeasurementCache(cm) {
    cm.display.externalMeasure = null;
    removeChildren(cm.display.lineMeasure);
    for (var i = 0; i < cm.display.view.length; i++)
      clearLineMeasurementCacheFor(cm.display.view[i]);
  }

  function clearCaches(cm) {
    clearLineMeasurementCache(cm);
    cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
    if (!cm.options.lineWrapping) cm.display.maxLineChanged = true;
    cm.display.lineNumChars = null;
  }

  function pageScrollX() { return window.pageXOffset || (document.documentElement || document.body).scrollLeft; }
  function pageScrollY() { return window.pageYOffset || (document.documentElement || document.body).scrollTop; }

  // Converts a {top, bottom, left, right} box from line-local
  // coordinates into another coordinate system. Context may be one of
  // "line", "div" (display.lineDiv), "local"/null (editor), or "page".
  function intoCoordSystem(cm, lineObj, rect, context) {
    if (lineObj.widgets) for (var i = 0; i < lineObj.widgets.length; ++i) if (lineObj.widgets[i].above) {
      var size = widgetHeight(lineObj.widgets[i]);
      rect.top += size; rect.bottom += size;
    }
    if (context == "line") return rect;
    if (!context) context = "local";
    var yOff = heightAtLine(lineObj);
    if (context == "local") yOff += paddingTop(cm.display);
    else yOff -= cm.display.viewOffset;
    if (context == "page" || context == "window") {
      var lOff = cm.display.lineSpace.getBoundingClientRect();
      yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
      var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
      rect.left += xOff; rect.right += xOff;
    }
    rect.top += yOff; rect.bottom += yOff;
    return rect;
  }

  // Coverts a box from "div" coords to another coordinate system.
  // Context may be "window", "page", "div", or "local"/null.
  function fromCoordSystem(cm, coords, context) {
    if (context == "div") return coords;
    var left = coords.left, top = coords.top;
    // First move into "page" coordinate system
    if (context == "page") {
      left -= pageScrollX();
      top -= pageScrollY();
    } else if (context == "local" || !context) {
      var localBox = cm.display.sizer.getBoundingClientRect();
      left += localBox.left;
      top += localBox.top;
    }

    var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
    return { left: left - lineSpaceBox.left, top: top - lineSpaceBox.top };
  }

  function charCoords(cm, pos, context, lineObj, bias) {
    if (!lineObj) lineObj = getLine(cm.doc, pos.line);
    return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
  }

  // Returns a box for a given cursor position, which may have an
  // 'other' property containing the position of the secondary cursor
  // on a bidi boundary.
  function cursorCoords(cm, pos, context, lineObj, preparedMeasure) {
    lineObj = lineObj || getLine(cm.doc, pos.line);
    if (!preparedMeasure) preparedMeasure = prepareMeasureForLine(cm, lineObj);
    function get(ch, right) {
      var m = measureCharPrepared(cm, preparedMeasure, ch, right ? "right" : "left");
      if (right) m.left = m.right; else m.right = m.left;
      return intoCoordSystem(cm, lineObj, m, context);
    }
    function getBidi(ch, partPos) {
      var part = order[partPos], right = part.level % 2;
      if (ch == bidiLeft(part) && partPos && part.level < order[partPos - 1].level) {
        part = order[--partPos];
        ch = bidiRight(part) - (part.level % 2 ? 0 : 1);
        right = true;
      } else if (ch == bidiRight(part) && partPos < order.length - 1 && part.level < order[partPos + 1].level) {
        part = order[++partPos];
        ch = bidiLeft(part) - part.level % 2;
        right = false;
      }
      if (right && ch == part.to && ch > part.from) return get(ch - 1);
      return get(ch, right);
    }
    var order = getOrder(lineObj), ch = pos.ch;
    if (!order) return get(ch);
    var partPos = getBidiPartAt(order, ch);
    var val = getBidi(ch, partPos);
    if (bidiOther != null) val.other = getBidi(ch, bidiOther);
    return val;
  }

  // Used to cheaply estimate the coordinates for a position. Used for
  // intermediate scroll updates.
  function estimateCoords(cm, pos) {
    var left = 0, pos = clipPos(cm.doc, pos);
    if (!cm.options.lineWrapping) left = charWidth(cm.display) * pos.ch;
    var lineObj = getLine(cm.doc, pos.line);
    var top = heightAtLine(lineObj) + paddingTop(cm.display);
    return { left: left, right: left, top: top, bottom: top + lineObj.height };
  }

  // Positions returned by coordsChar contain some extra information.
  // xRel is the relative x position of the input coordinates compared
  // to the found position (so xRel > 0 means the coordinates are to
  // the right of the character position, for example). When outside
  // is true, that means the coordinates lie outside the line's
  // vertical range.
  function PosWithInfo(line, ch, outside, xRel) {
    var pos = Pos(line, ch);
    pos.xRel = xRel;
    if (outside) pos.outside = true;
    return pos;
  }

  // Compute the character position closest to the given coordinates.
  // Input must be lineSpace-local ("div" coordinate system).
  function coordsChar(cm, x, y) {
    var doc = cm.doc;
    y += cm.display.viewOffset;
    if (y < 0) return PosWithInfo(doc.first, 0, true, -1);
    var lineN = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
    if (lineN > last)
      return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, true, 1);
    if (x < 0) x = 0;

    var lineObj = getLine(doc, lineN);
    for (; ;) {
      var found = coordsCharInner(cm, lineObj, lineN, x, y);
      var merged = collapsedSpanAtEnd(lineObj);
      var mergedPos = merged && merged.find(0, true);
      if (merged && (found.ch > mergedPos.from.ch || found.ch == mergedPos.from.ch && found.xRel > 0))
        lineN = lineNo(lineObj = mergedPos.to.line);
      else
        return found;
    }
  }

  function coordsCharInner(cm, lineObj, lineNo, x, y) {
    var innerOff = y - heightAtLine(lineObj);
    var wrongLine = false, adjust = 2 * cm.display.wrapper.clientWidth;
    var preparedMeasure = prepareMeasureForLine(cm, lineObj);

    function getX(ch) {
      var sp = cursorCoords(cm, Pos(lineNo, ch), "line", lineObj, preparedMeasure);
      wrongLine = true;
      if (innerOff > sp.bottom) return sp.left - adjust;
      else if (innerOff < sp.top) return sp.left + adjust;
      else wrongLine = false;
      return sp.left;
    }

    var bidi = getOrder(lineObj), dist = lineObj.text.length;
    var from = lineLeft(lineObj), to = lineRight(lineObj);
    var fromX = getX(from), fromOutside = wrongLine, toX = getX(to), toOutside = wrongLine;

    if (x > toX) return PosWithInfo(lineNo, to, toOutside, 1);
    // Do a binary search between these bounds.
    for (; ;) {
      if (bidi ? to == from || to == moveVisually(lineObj, from, 1) : to - from <= 1) {
        var ch = x < fromX || x - fromX <= toX - x ? from : to;
        var xDiff = x - (ch == from ? fromX : toX);
        while (isExtendingChar(lineObj.text.charAt(ch)))++ch;
        var pos = PosWithInfo(lineNo, ch, ch == from ? fromOutside : toOutside,
          xDiff < -1 ? -1 : xDiff > 1 ? 1 : 0);
        return pos;
      }
      var step = Math.ceil(dist / 2), middle = from + step;
      if (bidi) {
        middle = from;
        for (var i = 0; i < step; ++i) middle = moveVisually(lineObj, middle, 1);
      }
      var middleX = getX(middle);
      if (middleX > x) { to = middle; toX = middleX; if (toOutside = wrongLine) toX += 1000; dist = step; }
      else { from = middle; fromX = middleX; fromOutside = wrongLine; dist -= step; }
    }
  }

  var measureText;
  // Compute the default text height.
  function textHeight(display) {
    if (display.cachedTextHeight != null) return display.cachedTextHeight;
    if (measureText == null) {
      measureText = elt("pre");
      // Measure a bunch of lines, for browsers that compute
      // fractional heights.
      for (var i = 0; i < 49; ++i) {
        measureText.appendChild(document.createTextNode("x"));
        measureText.appendChild(elt("br"));
      }
      measureText.appendChild(document.createTextNode("x"));
    }
    removeChildrenAndAdd(display.measure, measureText);
    var height = measureText.offsetHeight / 50;
    if (height > 3) display.cachedTextHeight = height;
    removeChildren(display.measure);
    return height || 1;
  }

  // Compute the default character width.
  function charWidth(display) {
    if (display.cachedCharWidth != null) return display.cachedCharWidth;
    var anchor = elt("span", "xxxxxxxxxx");
    var pre = elt("pre", [anchor]);
    removeChildrenAndAdd(display.measure, pre);
    var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
    if (width > 2) display.cachedCharWidth = width;
    return width || 10;
  }

  // OPERATIONS

  // Operations are used to wrap a series of changes to the editor
  // state in such a way that each change won't have to update the
  // cursor and display (which would be awkward, slow, and
  // error-prone). Instead, display updates are batched and then all
  // combined and executed at once.

  var nextOpId = 0;
  // Start a new operation.
  function startOperation(cm) {
    cm.curOp = {
      viewChanged: false,      // Flag that indicates that lines might need to be redrawn
      startHeight: cm.doc.height, // Used to detect need to update scrollbar
      forceUpdate: false,      // Used to force a redraw
      updateInput: null,       // Whether to reset the input textarea
      typing: false,           // Whether this reset should be careful to leave existing text (for compositing)
      changeObjs: null,        // Accumulated changes, for firing change events
      cursorActivity: false,   // Whether to fire a cursorActivity event
      selectionChanged: false, // Whether the selection needs to be redrawn
      updateMaxLine: false,    // Set when the widest line needs to be determined anew
      scrollLeft: null, scrollTop: null, // Intermediate scroll position, not pushed to DOM yet
      scrollToPos: null,       // Used to scroll to a specific position
      id: ++nextOpId           // Unique ID
    };
    if (!delayedCallbackDepth++) delayedCallbacks = [];
  }

  // Finish an operation, updating the display and signalling delayed events
  function endOperation(cm) {
    var op = cm.curOp, doc = cm.doc, display = cm.display;
    cm.curOp = null;

    if (op.updateMaxLine) findMaxLine(cm);

    // If it looks like an update might be needed, call updateDisplay
    if (op.viewChanged || op.forceUpdate || op.scrollTop != null ||
      op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom ||
        op.scrollToPos.to.line >= display.viewTo) ||
      display.maxLineChanged && cm.options.lineWrapping) {
      var updated = updateDisplay(cm, { top: op.scrollTop, ensure: op.scrollToPos }, op.forceUpdate);
      if (cm.display.scroller.offsetHeight) cm.doc.scrollTop = cm.display.scroller.scrollTop;
    }
    // If no update was run, but the selection changed, redraw that.
    if (!updated && op.selectionChanged) updateSelection(cm);
    if (!updated && op.startHeight != cm.doc.height) updateScrollbars(cm);

    // Propagate the scroll position to the actual DOM scroller
    if (op.scrollTop != null && display.scroller.scrollTop != op.scrollTop) {
      var top = Math.max(0, Math.min(display.scroller.scrollHeight - display.scroller.clientHeight, op.scrollTop));
      display.scroller.scrollTop = display.scrollbarV.scrollTop = doc.scrollTop = top;
    }
    if (op.scrollLeft != null && display.scroller.scrollLeft != op.scrollLeft) {
      var left = Math.max(0, Math.min(display.scroller.scrollWidth - display.scroller.clientWidth, op.scrollLeft));
      display.scroller.scrollLeft = display.scrollbarH.scrollLeft = doc.scrollLeft = left;
      alignHorizontally(cm);
    }
    // If we need to scroll a specific position into view, do so.
    if (op.scrollToPos) {
      var coords = scrollPosIntoView(cm, clipPos(cm.doc, op.scrollToPos.from),
        clipPos(cm.doc, op.scrollToPos.to), op.scrollToPos.margin);
      if (op.scrollToPos.isCursor && cm.state.focused) maybeScrollWindow(cm, coords);
    }

    if (op.selectionChanged) restartBlink(cm);

    if (cm.state.focused && op.updateInput)
      resetInput(cm, op.typing);

    // Fire events for markers that are hidden/unidden by editing or
    // undoing
    var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
    if (hidden) for (var i = 0; i < hidden.length; ++i)
      if (!hidden[i].lines.length) signal(hidden[i], "hide");
    if (unhidden) for (var i = 0; i < unhidden.length; ++i)
      if (unhidden[i].lines.length) signal(unhidden[i], "unhide");

    var delayed;
    if (!--delayedCallbackDepth) {
      delayed = delayedCallbacks;
      delayedCallbacks = null;
    }
    // Fire change events, and delayed event handlers
    if (op.changeObjs) {
      for (var i = 0; i < op.changeObjs.length; i++)
        signal(cm, "change", cm, op.changeObjs[i]);
      signal(cm, "changes", cm, op.changeObjs);
    }
    if (op.cursorActivity) signal(cm, "cursorActivity", cm);
    if (delayed) for (var i = 0; i < delayed.length; ++i) delayed[i]();
  }

  // Run the given function in an operation
  function runInOp(cm, f) {
    if (cm.curOp) return f();
    startOperation(cm);
    try { return f(); }
    finally { endOperation(cm); }
  }
  // Wraps a function in an operation. Returns the wrapped function.
  function operation(cm, f) {
    return function () {
      if (cm.curOp) return f.apply(cm, arguments);
      startOperation(cm);
      try { return f.apply(cm, arguments); }
      finally { endOperation(cm); }
    };
  }
  // Used to add methods to editor and doc instances, wrapping them in
  // operations.
  function methodOp(f) {
    return function () {
      if (this.curOp) return f.apply(this, arguments);
      startOperation(this);
      try { return f.apply(this, arguments); }
      finally { endOperation(this); }
    };
  }
  function docMethodOp(f) {
    return function () {
      var cm = this.cm;
      if (!cm || cm.curOp) return f.apply(this, arguments);
      startOperation(cm);
      try { return f.apply(this, arguments); }
      finally { endOperation(cm); }
    };
  }

  // VIEW TRACKING

  // These objects are used to represent the visible (currently drawn)
  // part of the document. A LineView may correspond to multiple
  // logical lines, if those are connected by collapsed ranges.
  function LineView(doc, line, lineN) {
    // The starting line
    this.line = line;
    // Continuing lines, if any
    this.rest = visualLineContinued(line);
    // Number of logical lines in this visual line
    this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
    this.node = this.text = null;
    this.hidden = lineIsHidden(doc, line);
  }

  // Create a range of LineView objects for the given lines.
  function buildViewArray(cm, from, to) {
    var array = [], nextPos;
    for (var pos = from; pos < to; pos = nextPos) {
      var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
      nextPos = pos + view.size;
      array.push(view);
    }
    return array;
  }

  // Updates the display.view data structure for a given change to the
  // document. From and to are in pre-change coordinates. Lendiff is
  // the amount of lines added or subtracted by the change. This is
  // used for changes that span multiple lines, or change the way
  // lines are divided into visual lines. regLineChange (below)
  // registers single-line changes.
  function regChange(cm, from, to, lendiff) {
    if (from == null) from = cm.doc.first;
    if (to == null) to = cm.doc.first + cm.doc.size;
    if (!lendiff) lendiff = 0;

    var display = cm.display;
    if (lendiff && to < display.viewTo &&
      (display.updateLineNumbers == null || display.updateLineNumbers > from))
      display.updateLineNumbers = from;

    cm.curOp.viewChanged = true;

    if (from >= display.viewTo) { // Change after
      if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo)
        resetView(cm);
    } else if (to <= display.viewFrom) { // Change before
      if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
        resetView(cm);
      } else {
        display.viewFrom += lendiff;
        display.viewTo += lendiff;
      }
    } else if (from <= display.viewFrom && to >= display.viewTo) { // Full overlap
      resetView(cm);
    } else if (from <= display.viewFrom) { // Top overlap
      var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cut) {
        display.view = display.view.slice(cut.index);
        display.viewFrom = cut.lineN;
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    } else if (to >= display.viewTo) { // Bottom overlap
      var cut = viewCuttingPoint(cm, from, from, -1);
      if (cut) {
        display.view = display.view.slice(0, cut.index);
        display.viewTo = cut.lineN;
      } else {
        resetView(cm);
      }
    } else { // Gap in the middle
      var cutTop = viewCuttingPoint(cm, from, from, -1);
      var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cutTop && cutBot) {
        display.view = display.view.slice(0, cutTop.index)
          .concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN))
          .concat(display.view.slice(cutBot.index));
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    }

    var ext = display.externalMeasured;
    if (ext) {
      if (to < ext.lineN)
        ext.lineN += lendiff;
      else if (from < ext.lineN + ext.size)
        display.externalMeasured = null;
    }
  }

  // Register a change to a single line. Type must be one of "text",
  // "gutter", "class", "widget"
  function regLineChange(cm, line, type) {
    cm.curOp.viewChanged = true;
    var display = cm.display, ext = cm.display.externalMeasured;
    if (ext && line >= ext.lineN && line < ext.lineN + ext.size)
      display.externalMeasured = null;

    if (line < display.viewFrom || line >= display.viewTo) return;
    var lineView = display.view[findViewIndex(cm, line)];
    if (lineView.node == null) return;
    var arr = lineView.changes || (lineView.changes = []);
    if (indexOf(arr, type) == -1) arr.push(type);
  }

  // Clear the view.
  function resetView(cm) {
    cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
    cm.display.view = [];
    cm.display.viewOffset = 0;
  }

  // Find the view element corresponding to a given line. Return null
  // when the line isn't visible.
  function findViewIndex(cm, n) {
    if (n >= cm.display.viewTo) return null;
    n -= cm.display.viewFrom;
    if (n < 0) return null;
    var view = cm.display.view;
    for (var i = 0; i < view.length; i++) {
      n -= view[i].size;
      if (n < 0) return i;
    }
  }

  function viewCuttingPoint(cm, oldN, newN, dir) {
    var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
    if (!sawCollapsedSpans) return { index: index, lineN: newN };
    for (var i = 0, n = cm.display.viewFrom; i < index; i++)
      n += view[i].size;
    if (n != oldN) {
      if (dir > 0) {
        if (index == view.length - 1) return null;
        diff = (n + view[index].size) - oldN;
        index++;
      } else {
        diff = n - oldN;
      }
      oldN += diff; newN += diff;
    }
    while (visualLineNo(cm.doc, newN) != newN) {
      if (index == (dir < 0 ? 0 : view.length - 1)) return null;
      newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
      index += dir;
    }
    return { index: index, lineN: newN };
  }

  // Force the view to cover a given range, adding empty view element
  // or clipping off existing ones as needed.
  function adjustView(cm, from, to) {
    var display = cm.display, view = display.view;
    if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
      display.view = buildViewArray(cm, from, to);
      display.viewFrom = from;
    } else {
      if (display.viewFrom > from)
        display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view);
      else if (display.viewFrom < from)
        display.view = display.view.slice(findViewIndex(cm, from));
      display.viewFrom = from;
      if (display.viewTo < to)
        display.view = display.view.concat(buildViewArray(cm, display.viewTo, to));
      else if (display.viewTo > to)
        display.view = display.view.slice(0, findViewIndex(cm, to));
    }
    display.viewTo = to;
  }

  // Count the number of lines in the view whose DOM representation is
  // out of date (or nonexistent).
  function countDirtyView(cm) {
    var view = cm.display.view, dirty = 0;
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (!lineView.hidden && (!lineView.node || lineView.changes))++dirty;
    }
    return dirty;
  }

  // INPUT HANDLING

  // Poll for input changes, using the normal rate of polling. This
  // runs as long as the editor is focused.
  function slowPoll(cm) {
    if (cm.display.pollingFast) return;
    cm.display.poll.set(cm.options.pollInterval, function () {
      readInput(cm);
      if (cm.state.focused) slowPoll(cm);
    });
  }

  // When an event has just come in that is likely to add or change
  // something in the input textarea, we poll faster, to ensure that
  // the change appears on the screen quickly.
  function fastPoll(cm) {
    var missed = false;
    cm.display.pollingFast = true;
    function p() {
      var changed = readInput(cm);
      if (!changed && !missed) { missed = true; cm.display.poll.set(60, p); }
      else { cm.display.pollingFast = false; slowPoll(cm); }
    }
    cm.display.poll.set(20, p);
  }

  // Read input from the textarea, and update the document to match.
  // When something is selected, it is present in the textarea, and
  // selected (unless it is huge, in which case a placeholder is
  // used). When nothing is selected, the cursor sits after previously
  // seen text (can be empty), which is stored in prevInput (we must
  // not reset the textarea when typing, because that breaks IME).
  function readInput(cm) {
    var input = cm.display.input, prevInput = cm.display.prevInput, doc = cm.doc;
    // Since this is called a *lot*, try to bail out as cheaply as
    // possible when it is clear that nothing happened. hasSelection
    // will be the case when there is a lot of text in the textarea,
    // in which case reading its value would be expensive.
    if (!cm.state.focused || hasSelection(input) || isReadOnly(cm) || cm.options.disableInput) return false;
    var text = input.value;
    // If nothing changed, bail.
    if (text == prevInput && !cm.somethingSelected()) return false;
    // Work around nonsensical selection resetting in IE9/10
    if (ie && !ie_upto8 && cm.display.inputHasSelection === text) {
      resetInput(cm);
      return false;
    }

    var withOp = !cm.curOp;
    if (withOp) startOperation(cm);
    cm.display.shift = false;

    // Find the part of the input that is actually new
    var same = 0, l = Math.min(prevInput.length, text.length);
    while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same))++same;
    var inserted = text.slice(same), textLines = splitLines(inserted);

    // When pasing N lines into N selections, insert one line per selection
    var multiPaste = cm.state.pasteIncoming && textLines.length > 1 && doc.sel.ranges.length == textLines.length;

    // Normal behavior is to insert the new text into every selection
    for (var i = doc.sel.ranges.length - 1; i >= 0; i--) {
      var range = doc.sel.ranges[i];
      var from = range.from(), to = range.to();
      // Handle deletion
      if (same < prevInput.length)
        from = Pos(from.line, from.ch - (prevInput.length - same));
      // Handle overwrite
      else if (cm.state.overwrite && range.empty() && !cm.state.pasteIncoming)
        to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length));
      var updateInput = cm.curOp.updateInput;
      var changeEvent = {
        from: from, to: to, text: multiPaste ? [textLines[i]] : textLines,
        origin: cm.state.pasteIncoming ? "paste" : cm.state.cutIncoming ? "cut" : "+input"
      };
      makeChange(cm.doc, changeEvent);
      signalLater(cm, "inputRead", cm, changeEvent);
      // When an 'electric' character is inserted, immediately trigger a reindent
      if (inserted && !cm.state.pasteIncoming && cm.options.electricChars &&
        cm.options.smartIndent && range.head.ch < 100 &&
        (!i || doc.sel.ranges[i - 1].head.line != range.head.line)) {
        var electric = cm.getModeAt(range.head).electricChars;
        if (electric) for (var j = 0; j < electric.length; j++)
          if (inserted.indexOf(electric.charAt(j)) > -1) {
            indentLine(cm, range.head.line, "smart");
            break;
          }
      }
    }
    ensureCursorVisible(cm);
    cm.curOp.updateInput = updateInput;
    cm.curOp.typing = true;

    // Don't leave long text in the textarea, since it makes further polling slow
    if (text.length > 1000 || text.indexOf("\n") > -1) input.value = cm.display.prevInput = "";
    else cm.display.prevInput = text;
    if (withOp) endOperation(cm);
    cm.state.pasteIncoming = cm.state.cutIncoming = false;
    return true;
  }

  // Reset the input to correspond to the selection (or to be empty,
  // when not typing and nothing is selected)
  function resetInput(cm, typing) {
    var minimal, selected, doc = cm.doc;
    if (cm.somethingSelected()) {
      cm.display.prevInput = "";
      var range = doc.sel.primary();
      minimal = hasCopyEvent &&
        (range.to().line - range.from().line > 100 || (selected = cm.getSelection()).length > 1000);
      var content = minimal ? "-" : selected || cm.getSelection();
      cm.display.input.value = content;
      if (cm.state.focused) selectInput(cm.display.input);
      if (ie && !ie_upto8) cm.display.inputHasSelection = content;
    } else if (!typing) {
      cm.display.prevInput = cm.display.input.value = "";
      if (ie && !ie_upto8) cm.display.inputHasSelection = null;
    }
    cm.display.inaccurateSelection = minimal;
  }

  function focusInput(cm) {
    if (cm.options.readOnly != "nocursor" && (!mobile || activeElt() != cm.display.input))
      cm.display.input.focus();
  }

  function ensureFocus(cm) {
    if (!cm.state.focused) { focusInput(cm); onFocus(cm); }
  }

  function isReadOnly(cm) {
    return cm.options.readOnly || cm.doc.cantEdit;
  }

  // EVENT HANDLERS

  // Attach the necessary event handlers when initializing the editor
  function registerEventHandlers(cm) {
    var d = cm.display;
    on(d.scroller, "mousedown", operation(cm, onMouseDown));
    // Older IE's will not fire a second mousedown for a double click
    if (ie_upto10)
      on(d.scroller, "dblclick", operation(cm, function (e) {
        if (signalDOMEvent(cm, e)) return;
        var pos = posFromMouse(cm, e);
        if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) return;
        e_preventDefault(e);
        var word = findWordAt(cm.doc, pos);
        extendSelection(cm.doc, word.anchor, word.head);
      }));
    else
      on(d.scroller, "dblclick", function (e) { signalDOMEvent(cm, e) || e_preventDefault(e); });
    // Prevent normal selection in the editor (we handle our own)
    on(d.lineSpace, "selectstart", function (e) {
      if (!eventInWidget(d, e)) e_preventDefault(e);
    });
    // Some browsers fire contextmenu *after* opening the menu, at
    // which point we can't mess with it anymore. Context menu is
    // handled in onMouseDown for these browsers.
    if (!captureRightClick) on(d.scroller, "contextmenu", function (e) { onContextMenu(cm, e); });

    // Sync scrolling between fake scrollbars and real scrollable
    // area, ensure viewport is updated when scrolling.
    on(d.scroller, "scroll", function () {
      if (d.scroller.clientHeight) {
        setScrollTop(cm, d.scroller.scrollTop);
        setScrollLeft(cm, d.scroller.scrollLeft, true);
        signal(cm, "scroll", cm);
      }
    });
    on(d.scrollbarV, "scroll", function () {
      if (d.scroller.clientHeight) setScrollTop(cm, d.scrollbarV.scrollTop);
    });
    on(d.scrollbarH, "scroll", function () {
      if (d.scroller.clientHeight) setScrollLeft(cm, d.scrollbarH.scrollLeft);
    });

    // Listen to wheel events in order to try and update the viewport on time.
    on(d.scroller, "mousewheel", function (e) { onScrollWheel(cm, e); });
    on(d.scroller, "DOMMouseScroll", function (e) { onScrollWheel(cm, e); });

    // Prevent clicks in the scrollbars from killing focus
    function reFocus() { if (cm.state.focused) setTimeout(bind(focusInput, cm), 0); }
    on(d.scrollbarH, "mousedown", reFocus);
    on(d.scrollbarV, "mousedown", reFocus);
    // Prevent wrapper from ever scrolling
    on(d.wrapper, "scroll", function () { d.wrapper.scrollTop = d.wrapper.scrollLeft = 0; });

    // When the window resizes, we need to refresh active editors.
    var resizeTimer;
    function onResize() {
      if (resizeTimer == null) resizeTimer = setTimeout(function () {
        resizeTimer = null;
        // Might be a text scaling operation, clear size caches.
        d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = knownScrollbarWidth = null;
        cm.setSize();
      }, 100);
    }
    on(window, "resize", onResize);
    // The above handler holds on to the editor and its data
    // structures. Here we poll to unregister it when the editor is no
    // longer in the document, so that it can be garbage-collected.
    function unregister() {
      if (contains(document.body, d.wrapper)) setTimeout(unregister, 5000);
      else off(window, "resize", onResize);
    }
    setTimeout(unregister, 5000);

    on(d.input, "keyup", operation(cm, onKeyUp));
    on(d.input, "input", function () {
      if (ie && !ie_upto8 && cm.display.inputHasSelection) cm.display.inputHasSelection = null;
      fastPoll(cm);
    });
    on(d.input, "keydown", operation(cm, onKeyDown));
    on(d.input, "keypress", operation(cm, onKeyPress));
    on(d.input, "focus", bind(onFocus, cm));
    on(d.input, "blur", bind(onBlur, cm));

    function drag_(e) {
      if (!signalDOMEvent(cm, e)) e_stop(e);
    }
    if (cm.options.dragDrop) {
      on(d.scroller, "dragstart", function (e) { onDragStart(cm, e); });
      on(d.scroller, "dragenter", drag_);
      on(d.scroller, "dragover", drag_);
      on(d.scroller, "drop", operation(cm, onDrop));
    }
    on(d.scroller, "paste", function (e) {
      if (eventInWidget(d, e)) return;
      cm.state.pasteIncoming = true;
      focusInput(cm);
      fastPoll(cm);
    });
    on(d.input, "paste", function () {
      cm.state.pasteIncoming = true;
      fastPoll(cm);
    });

    function prepareCopy(e) {
      if (d.inaccurateSelection) {
        d.prevInput = "";
        d.inaccurateSelection = false;
        d.input.value = cm.getSelection();
        selectInput(d.input);
      }
      if (e.type == "cut") cm.state.cutIncoming = true;
    }
    on(d.input, "cut", prepareCopy);
    on(d.input, "copy", prepareCopy);

    // Needed to handle Tab key in KHTML
    if (khtml) on(d.sizer, "mouseup", function () {
      if (activeElt() == d.input) d.input.blur();
      focusInput(cm);
    });
  }

  // MOUSE EVENTS

  // Return true when the given mouse event happened in a widget
  function eventInWidget(display, e) {
    for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
      if (!n || n.ignoreEvents || n.parentNode == display.sizer && n != display.mover) return true;
    }
  }

  // Given a mouse event, find the corresponding position. If liberal
  // is false, it checks whether a gutter or scrollbar was clicked,
  // and returns null if it was. forRect is used by rectangular
  // selections, and tries to estimate a character position even for
  // coordinates beyond the right of the text.
  function posFromMouse(cm, e, liberal, forRect) {
    var display = cm.display;
    if (!liberal) {
      var target = e_target(e);
      if (target == display.scrollbarH || target == display.scrollbarV ||
        target == display.scrollbarFiller || target == display.gutterFiller) return null;
    }
    var x, y, space = display.lineSpace.getBoundingClientRect();
    // Fails unpredictably on IE[67] when mouse is dragged around quickly.
    try { x = e.clientX - space.left; y = e.clientY - space.top; }
    catch (e) { return null; }
    var coords = coordsChar(cm, x, y), line;
    if (forRect && coords.xRel == 1 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
      var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
      coords = Pos(coords.line, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff);
    }
    return coords;
  }

  // A mouse down can be a single click, double click, triple click,
  // start of selection drag, start of text drag, new cursor
  // (ctrl-click), rectangle drag (alt-drag), or xwin
  // middle-click-paste. Or it might be a click on something we should
  // not interfere with, such as a scrollbar or widget.
  function onMouseDown(e) {
    if (signalDOMEvent(this, e)) return;
    var cm = this, display = cm.display;
    display.shift = e.shiftKey;

    if (eventInWidget(display, e)) {
      if (!webkit) {
        // Briefly turn off draggability, to allow widgets to do
        // normal dragging things.
        display.scroller.draggable = false;
        setTimeout(function () { display.scroller.draggable = true; }, 100);
      }
      return;
    }
    if (clickInGutter(cm, e)) return;
    var start = posFromMouse(cm, e);
    window.focus();

    switch (e_button(e)) {
      case 1:
        if (start)
          leftButtonDown(cm, e, start);
        else if (e_target(e) == display.scroller)
          e_preventDefault(e);
        break;
      case 2:
        if (webkit) cm.state.lastMiddleDown = +new Date;
        if (start) extendSelection(cm.doc, start);
        setTimeout(bind(focusInput, cm), 20);
        e_preventDefault(e);
        break;
      case 3:
        if (captureRightClick) onContextMenu(cm, e);
        break;
    }
  }

  var lastClick, lastDoubleClick;
  function leftButtonDown(cm, e, start) {
    setTimeout(bind(ensureFocus, cm), 0);

    var now = +new Date, type;
    if (lastDoubleClick && lastDoubleClick.time > now - 400 && cmp(lastDoubleClick.pos, start) == 0) {
      type = "triple";
    } else if (lastClick && lastClick.time > now - 400 && cmp(lastClick.pos, start) == 0) {
      type = "double";
      lastDoubleClick = { time: now, pos: start };
    } else {
      type = "single";
      lastClick = { time: now, pos: start };
    }

    //don't know any other way of disabling multi-select
    var sel = cm.doc.sel, addNew = false;// mac ? e.metaKey : e.ctrlKey;
    if (cm.options.dragDrop && dragAndDrop && !addNew && !isReadOnly(cm) &&
      type == "single" && sel.contains(start) > -1 && sel.somethingSelected())
      leftButtonStartDrag(cm, e, start);
    else
      leftButtonSelect(cm, e, start, type, addNew);
  }

  // Start a text drag. When it ends, see if any dragging actually
  // happen, and treat as a click if it didn't.
  function leftButtonStartDrag(cm, e, start) {
    var display = cm.display;
    var dragEnd = operation(cm, function (e2) {
      if (webkit) display.scroller.draggable = false;
      cm.state.draggingText = false;
      off(document, "mouseup", dragEnd);
      off(display.scroller, "drop", dragEnd);
      if (Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10) {
        e_preventDefault(e2);
        extendSelection(cm.doc, start);
        focusInput(cm);
        // Work around unexplainable focus problem in IE9 (#2127)
        if (ie_upto10 && !ie_upto8)
          setTimeout(function () { document.body.focus(); focusInput(cm); }, 20);
      }
    });
    // Let the drag handler handle this.
    if (webkit) display.scroller.draggable = true;
    cm.state.draggingText = dragEnd;
    // IE's approach to draggable
    if (display.scroller.dragDrop) display.scroller.dragDrop();
    on(document, "mouseup", dragEnd);
    on(display.scroller, "drop", dragEnd);
  }

  // Normal selection, as opposed to text dragging.
  function leftButtonSelect(cm, e, start, type, addNew) {
    var display = cm.display, doc = cm.doc;
    e_preventDefault(e);

    var ourRange, ourIndex, startSel = doc.sel;
    if (addNew) {
      ourIndex = doc.sel.contains(start);
      if (ourIndex > -1)
        ourRange = doc.sel.ranges[ourIndex];
      else
        ourRange = new Range(start, start);
    } else {
      ourRange = doc.sel.primary();
    }

    if (e.altKey) {
      type = "rect";
      if (!addNew) ourRange = new Range(start, start);
      start = posFromMouse(cm, e, true, true);
      ourIndex = -1;
    } else if (type == "double") {
      var word = findWordAt(doc, start);
      if (cm.display.shift || doc.extend)
        ourRange = extendRange(doc, ourRange, word.anchor, word.head);
      else
        ourRange = word;
    } else if (type == "triple") {
      var line = new Range(Pos(start.line, 0), clipPos(doc, Pos(start.line + 1, 0)));
      if (cm.display.shift || doc.extend)
        ourRange = extendRange(doc, ourRange, line.anchor, line.head);
      else
        ourRange = line;
    } else {
      ourRange = extendRange(doc, ourRange, start);
    }

    if (!addNew) {
      ourIndex = 0;
      setSelection(doc, new Selection([ourRange], 0), sel_mouse);
    } else if (ourIndex > -1) {
      replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
    } else {
      ourIndex = doc.sel.ranges.length;
      setSelection(doc, normalizeSelection(doc.sel.ranges.concat([ourRange]), ourIndex),
        { scroll: false, origin: "*mouse" });
    }

    var lastPos = start;
    function extendTo(pos) {
      if (cmp(lastPos, pos) == 0) return;
      lastPos = pos;

      if (type == "rect") {
        var ranges = [], tabSize = cm.options.tabSize;
        var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
        var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
        var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
        for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line));
          line <= end; line++) {
          var text = getLine(doc, line).text, leftPos = findColumn(text, left, tabSize);
          if (left == right)
            ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
          else if (text.length > leftPos)
            ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
        }
        if (!ranges.length) ranges.push(new Range(start, start));
        setSelection(doc, normalizeSelection(startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex), sel_mouse);
      } else {
        var oldRange = ourRange;
        var anchor = oldRange.anchor, head = pos;
        if (type != "single") {
          if (type == "double")
            var range = findWordAt(doc, pos);
          else
            var range = new Range(Pos(pos.line, 0), clipPos(doc, Pos(pos.line + 1, 0)));
          if (cmp(range.anchor, anchor) > 0) {
            head = range.head;
            anchor = minPos(oldRange.from(), range.anchor);
          } else {
            head = range.anchor;
            anchor = maxPos(oldRange.to(), range.head);
          }
        }
        var ranges = startSel.ranges.slice(0);
        ranges[ourIndex] = new Range(clipPos(doc, anchor), head);
        setSelection(doc, normalizeSelection(ranges, ourIndex), sel_mouse);
      }
    }

    var editorSize = display.wrapper.getBoundingClientRect();
    // Used to ensure timeout re-tries don't fire when another extend
    // happened in the meantime (clearTimeout isn't reliable -- at
    // least on Chrome, the timeouts still happen even when cleared,
    // if the clear happens after their scheduled firing time).
    var counter = 0;

    function extend(e) {
      var curCount = ++counter;
      var cur = posFromMouse(cm, e, true, type == "rect");
      if (!cur) return;
      if (cmp(cur, lastPos) != 0) {
        ensureFocus(cm);
        extendTo(cur);
        var visible = visibleLines(display, doc);
        if (cur.line >= visible.to || cur.line < visible.from)
          setTimeout(operation(cm, function () { if (counter == curCount) extend(e); }), 150);
      } else {
        var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
        if (outside) setTimeout(operation(cm, function () {
          if (counter != curCount) return;
          display.scroller.scrollTop += outside;
          extend(e);
        }), 50);
      }
    }

    function done(e) {
      counter = Infinity;
      e_preventDefault(e);
      focusInput(cm);
      off(document, "mousemove", move);
      off(document, "mouseup", up);
      doc.history.lastSelOrigin = null;
    }

    var move = operation(cm, function (e) {
      if ((ie && !ie_upto9) ? !e.buttons : !e_button(e)) done(e);
      else extend(e);
    });
    var up = operation(cm, done);
    on(document, "mousemove", move);
    on(document, "mouseup", up);
  }

  // Determines whether an event happened in the gutter, and fires the
  // handlers for the corresponding event.
  function gutterEvent(cm, e, type, prevent, signalfn) {
    try { var mX = e.clientX, mY = e.clientY; }
    catch (e) { return false; }
    if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) return false;
    if (prevent) e_preventDefault(e);

    var display = cm.display;
    var lineBox = display.lineDiv.getBoundingClientRect();

    if (mY > lineBox.bottom || !hasHandler(cm, type)) return e_defaultPrevented(e);
    mY -= lineBox.top - display.viewOffset;

    for (var i = 0; i < cm.options.gutters.length; ++i) {
      var g = display.gutters.childNodes[i];
      if (g && g.getBoundingClientRect().right >= mX) {
        var line = lineAtHeight(cm.doc, mY);
        var gutter = cm.options.gutters[i];
        signalfn(cm, type, cm, line, gutter, e);
        return e_defaultPrevented(e);
      }
    }
  }

  function clickInGutter(cm, e) {
    return gutterEvent(cm, e, "gutterClick", true, signalLater);
  }

  // Kludge to work around strange IE behavior where it'll sometimes
  // re-fire a series of drag-related events right after the drop (#1551)
  var lastDrop = 0;

  function onDrop(e) {
    var cm = this;
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e))
      return;
    e_preventDefault(e);
    if (ie_upto10) lastDrop = +new Date;
    var pos = posFromMouse(cm, e, true), files = e.dataTransfer.files;
    if (!pos || isReadOnly(cm)) return;
    // Might be a file drop, in which case we simply extract the text
    // and insert it.
    if (files && files.length && window.FileReader && window.File) {
      var n = files.length, text = Array(n), read = 0;
      var loadFile = function (file, i) {
        var reader = new FileReader;
        reader.onload = function () {
          text[i] = reader.result;
          if (++read == n) {
            pos = clipPos(cm.doc, pos);
            var change = { from: pos, to: pos, text: splitLines(text.join("\n")), origin: "paste" };
            makeChange(cm.doc, change);
            setSelectionReplaceHistory(cm.doc, simpleSelection(pos, changeEnd(change)));
          }
        };
        reader.readAsText(file);
      };
      for (var i = 0; i < n; ++i) loadFile(files[i], i);
    } else { // Normal drop
      // Don't do a replace if the drop happened inside of the selected text.
      if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
        cm.state.draggingText(e);
        // Ensure the editor is re-focused
        setTimeout(bind(focusInput, cm), 20);
        return;
      }
      try {
        var text = e.dataTransfer.getData("Text");
        if (text) {
          var selected = cm.state.draggingText && cm.listSelections();
          setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
          if (selected) for (var i = 0; i < selected.length; ++i)
            replaceRange(cm.doc, "", selected[i].anchor, selected[i].head, "drag");
          cm.replaceSelection(text, "around", "paste");
          focusInput(cm);
        }
      }
      catch (e) { }
    }
  }

  function onDragStart(cm, e) {
    if (ie_upto10 && (!cm.state.draggingText || +new Date - lastDrop < 100)) { e_stop(e); return; }
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) return;

    e.dataTransfer.setData("Text", cm.getSelection());

    // Use dummy image instead of default browsers image.
    // Recent Safari (~6.0.2) have a tendency to segfault when this happens, so we don't do it there.
    if (e.dataTransfer.setDragImage && !safari) {
      var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
      img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      if (presto) {
        img.width = img.height = 1;
        cm.display.wrapper.appendChild(img);
        // Force a relayout, or Opera won't use our image for some obscure reason
        img._top = img.offsetTop;
      }
      e.dataTransfer.setDragImage(img, 0, 0);
      if (presto) img.parentNode.removeChild(img);
    }
  }

  // SCROLL EVENTS

  // Sync the scrollable area and scrollbars, ensure the viewport
  // covers the visible area.
  function setScrollTop(cm, val) {
    if (Math.abs(cm.doc.scrollTop - val) < 2) return;
    cm.doc.scrollTop = val;
    if (!gecko) updateDisplay(cm, { top: val });
    if (cm.display.scroller.scrollTop != val) cm.display.scroller.scrollTop = val;
    if (cm.display.scrollbarV.scrollTop != val) cm.display.scrollbarV.scrollTop = val;
    if (gecko) updateDisplay(cm);
    startWorker(cm, 100);
  }
  // Sync scroller and scrollbar, ensure the gutter elements are
  // aligned.
  function setScrollLeft(cm, val, isScroller) {
    if (isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) return;
    val = Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth);
    cm.doc.scrollLeft = val;
    alignHorizontally(cm);
    if (cm.display.scroller.scrollLeft != val) cm.display.scroller.scrollLeft = val;
    if (cm.display.scrollbarH.scrollLeft != val) cm.display.scrollbarH.scrollLeft = val;
  }

  // Since the delta values reported on mouse wheel events are
  // unstandardized between browsers and even browser versions, and
  // generally horribly unpredictable, this code starts by measuring
  // the scroll effect that the first few mouse wheel events have,
  // and, from that, detects the way it can convert deltas to pixel
  // offsets afterwards.
  //
  // The reason we want to know the amount a wheel event will scroll
  // is that it gives us a chance to update the display before the
  // actual scrolling happens, reducing flickering.

  var wheelSamples = 0, wheelPixelsPerUnit = null;
  // Fill in a browser-detected starting value on browsers where we
  // know one. These don't have to be accurate -- the result of them
  // being wrong would just be a slight flicker on the first wheel
  // scroll (if it is large enough).
  if (ie) wheelPixelsPerUnit = -.53;
  else if (gecko) wheelPixelsPerUnit = 15;
  else if (chrome) wheelPixelsPerUnit = -.7;
  else if (safari) wheelPixelsPerUnit = -1 / 3;

  function onScrollWheel(cm, e) {
    var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
    if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) dx = e.detail;
    if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) dy = e.detail;
    else if (dy == null) dy = e.wheelDelta;

    var display = cm.display, scroll = display.scroller;
    // Quit if there's nothing to scroll here
    if (!(dx && scroll.scrollWidth > scroll.clientWidth ||
      dy && scroll.scrollHeight > scroll.clientHeight)) return;

    // Webkit browsers on OS X abort momentum scrolls when the target
    // of the scroll event is removed from the scrollable element.
    // This hack (see related code in patchDisplay) makes sure the
    // element is kept around.
    if (dy && mac && webkit) {
      outer: for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
        for (var i = 0; i < view.length; i++) {
          if (view[i].node == cur) {
            cm.display.currentWheelTarget = cur;
            break outer;
          }
        }
      }
    }

    // On some browsers, horizontal scrolling will cause redraws to
    // happen before the gutter has been realigned, causing it to
    // wriggle around in a most unseemly way. When we have an
    // estimated pixels/delta value, we just handle horizontal
    // scrolling entirely here. It'll be slightly off from native, but
    // better than glitching out.
    if (dx && !gecko && !presto && wheelPixelsPerUnit != null) {
      if (dy)
        setScrollTop(cm, Math.max(0, Math.min(scroll.scrollTop + dy * wheelPixelsPerUnit, scroll.scrollHeight - scroll.clientHeight)));
      setScrollLeft(cm, Math.max(0, Math.min(scroll.scrollLeft + dx * wheelPixelsPerUnit, scroll.scrollWidth - scroll.clientWidth)));
      e_preventDefault(e);
      display.wheelStartX = null; // Abort measurement, if in progress
      return;
    }

    // 'Project' the visible viewport to cover the area that is being
    // scrolled into view (if we know enough to estimate it).
    if (dy && wheelPixelsPerUnit != null) {
      var pixels = dy * wheelPixelsPerUnit;
      var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
      if (pixels < 0) top = Math.max(0, top + pixels - 50);
      else bot = Math.min(cm.doc.height, bot + pixels + 50);
      updateDisplay(cm, { top: top, bottom: bot });
    }

    if (wheelSamples < 20) {
      if (display.wheelStartX == null) {
        display.wheelStartX = scroll.scrollLeft; display.wheelStartY = scroll.scrollTop;
        display.wheelDX = dx; display.wheelDY = dy;
        setTimeout(function () {
          if (display.wheelStartX == null) return;
          var movedX = scroll.scrollLeft - display.wheelStartX;
          var movedY = scroll.scrollTop - display.wheelStartY;
          var sample = (movedY && display.wheelDY && movedY / display.wheelDY) ||
            (movedX && display.wheelDX && movedX / display.wheelDX);
          display.wheelStartX = display.wheelStartY = null;
          if (!sample) return;
          wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
          ++wheelSamples;
        }, 200);
      } else {
        display.wheelDX += dx; display.wheelDY += dy;
      }
    }
  }

  // KEY EVENTS

  // Run a handler that was bound to a key.
  function doHandleBinding(cm, bound, dropShift) {
    if (typeof bound == "string") {
      bound = commands[bound];
      if (!bound) return false;
    }
    // Ensure previous input has been read, so that the handler sees a
    // consistent view of the document
    if (cm.display.pollingFast && readInput(cm)) cm.display.pollingFast = false;
    var prevShift = cm.display.shift, done = false;
    try {
      if (isReadOnly(cm)) cm.state.suppressEdits = true;
      if (dropShift) cm.display.shift = false;
      done = bound(cm) != Pass;
    } finally {
      cm.display.shift = prevShift;
      cm.state.suppressEdits = false;
    }
    return done;
  }

  // Collect the currently active keymaps.
  function allKeyMaps(cm) {
    var maps = cm.state.keyMaps.slice(0);
    if (cm.options.extraKeys) maps.push(cm.options.extraKeys);
    maps.push(cm.options.keyMap);
    return maps;
  }

  var maybeTransition;
  // Handle a key from the keydown event.
  function handleKeyBinding(cm, e) {
    // Handle automatic keymap transitions
    var startMap = getKeyMap(cm.options.keyMap), next = startMap.auto;
    clearTimeout(maybeTransition);
    if (next && !isModifierKey(e)) maybeTransition = setTimeout(function () {
      if (getKeyMap(cm.options.keyMap) == startMap) {
        cm.options.keyMap = (next.call ? next.call(null, cm) : next);
        keyMapChanged(cm);
      }
    }, 50);

    var name = keyName(e, true), handled = false;
    if (!name) return false;
    var keymaps = allKeyMaps(cm);

    if (e.shiftKey) {
      // First try to resolve full name (including 'Shift-'). Failing
      // that, see if there is a cursor-motion command (starting with
      // 'go') bound to the keyname without 'Shift-'.
      handled = lookupKey("Shift-" + name, keymaps, function (b) { return doHandleBinding(cm, b, true); })
        || lookupKey(name, keymaps, function (b) {
          if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion)
            return doHandleBinding(cm, b);
        });
    } else {
      handled = lookupKey(name, keymaps, function (b) { return doHandleBinding(cm, b); });
    }

    if (handled) {
      e_preventDefault(e);
      restartBlink(cm);
      signalLater(cm, "keyHandled", cm, name, e);
    }
    return handled;
  }

  // Handle a key from the keypress event
  function handleCharBinding(cm, e, ch) {
    var handled = lookupKey("'" + ch + "'", allKeyMaps(cm),
      function (b) { return doHandleBinding(cm, b, true); });
    if (handled) {
      e_preventDefault(e);
      restartBlink(cm);
      signalLater(cm, "keyHandled", cm, "'" + ch + "'", e);
    }
    return handled;
  }

  var lastStoppedKey = null;
  function onKeyDown(e) {
    var cm = this;
    ensureFocus(cm);
    if (signalDOMEvent(cm, e)) return;
    // IE does strange things with escape.
    if (ie_upto10 && e.keyCode == 27) e.returnValue = false;
    var code = e.keyCode;
    cm.display.shift = code == 16 || e.shiftKey;
    var handled = handleKeyBinding(cm, e);
    if (presto) {
      lastStoppedKey = handled ? code : null;
      // Opera has no cut event... we try to at least catch the key combo
      if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey))
        cm.replaceSelection("", null, "cut");
    }
  }

  function onKeyUp(e) {
    if (signalDOMEvent(this, e)) return;
    if (e.keyCode == 16) this.doc.sel.shift = false;
  }

  function onKeyPress(e) {
    var cm = this;
    if (signalDOMEvent(cm, e)) return;
    var keyCode = e.keyCode, charCode = e.charCode;
    if (presto && keyCode == lastStoppedKey) { lastStoppedKey = null; e_preventDefault(e); return; }
    if (((presto && (!e.which || e.which < 10)) || khtml) && handleKeyBinding(cm, e)) return;
    var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
    if (handleCharBinding(cm, e, ch)) return;
    if (ie && !ie_upto8) cm.display.inputHasSelection = null;
    fastPoll(cm);
  }

  // FOCUS/BLUR EVENTS

  function onFocus(cm) {
    if (cm.options.readOnly == "nocursor") return;
    if (!cm.state.focused) {
      signal(cm, "focus", cm);
      cm.state.focused = true;
      if (cm.display.wrapper.className.search(/\bCodeMirror-focused\b/) == -1)
        cm.display.wrapper.className += " CodeMirror-focused";
      if (!cm.curOp) {
        resetInput(cm);
        if (webkit) setTimeout(bind(resetInput, cm, true), 0); // Issue #1730
      }
    }
    slowPoll(cm);
    restartBlink(cm);
  }
  function onBlur(cm) {
    if (cm.state.focused) {
      signal(cm, "blur", cm);
      cm.state.focused = false;
      cm.display.wrapper.className = cm.display.wrapper.className.replace(" CodeMirror-focused", "");
    }
    clearInterval(cm.display.blinker);
    setTimeout(function () { if (!cm.state.focused) cm.display.shift = false; }, 150);
  }

  // CONTEXT MENU HANDLING

  var detectingSelectAll;
  // To make the context menu work, we need to briefly unhide the
  // textarea (making it as unobtrusive as possible) to let the
  // right-click take effect on it.
  function onContextMenu(cm, e) {
    if (signalDOMEvent(cm, e, "contextmenu")) return;
    var display = cm.display;
    if (eventInWidget(display, e) || contextMenuInGutter(cm, e)) return;

    var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
    if (!pos || presto) return; // Opera is difficult.

    // Reset the current text selection only if the click is done outside of the selection
    // and 'resetSelectionOnContextMenu' option is true.
    var reset = cm.options.resetSelectionOnContextMenu;
    if (reset && cm.doc.sel.contains(pos) == -1)
      operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);

    var oldCSS = display.input.style.cssText;
    display.inputDiv.style.position = "absolute";
    display.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) +
      "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: " +
      (ie ? "rgba(255, 255, 255, .05)" : "transparent") +
      "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
    focusInput(cm);
    resetInput(cm);
    // Adds "Select all" to context menu in FF
    if (!cm.somethingSelected()) display.input.value = display.prevInput = " ";

    // Select-all will be greyed out if there's nothing to select, so
    // this adds a zero-width space so that we can later check whether
    // it got selected.
    function prepareSelectAllHack() {
      if (display.input.selectionStart != null) {
        var extval = display.input.value = "\u200b" + (cm.somethingSelected() ? display.input.value : "");
        display.prevInput = "\u200b";
        display.input.selectionStart = 1; display.input.selectionEnd = extval.length;
      }
    }
    function rehide() {
      display.inputDiv.style.position = "relative";
      display.input.style.cssText = oldCSS;
      if (ie_upto8) display.scrollbarV.scrollTop = display.scroller.scrollTop = scrollPos;
      slowPoll(cm);

      // Try to detect the user choosing select-all
      if (display.input.selectionStart != null) {
        if (!ie || ie_upto8) prepareSelectAllHack();
        clearTimeout(detectingSelectAll);
        var i = 0, poll = function () {
          if (display.prevInput == "\u200b" && display.input.selectionStart == 0)
            operation(cm, commands.selectAll)(cm);
          else if (i++ < 10) detectingSelectAll = setTimeout(poll, 500);
          else resetInput(cm);
        };
        detectingSelectAll = setTimeout(poll, 200);
      }
    }

    if (ie && !ie_upto8) prepareSelectAllHack();
    if (captureRightClick) {
      e_stop(e);
      var mouseup = function () {
        off(window, "mouseup", mouseup);
        setTimeout(rehide, 20);
      };
      on(window, "mouseup", mouseup);
    } else {
      setTimeout(rehide, 50);
    }
  }

  function contextMenuInGutter(cm, e) {
    if (!hasHandler(cm, "gutterContextMenu")) return false;
    return gutterEvent(cm, e, "gutterContextMenu", false, signal);
  }

  // UPDATING

  // Compute the position of the end of a change (its 'to' property
  // refers to the pre-change end).
  var changeEnd = CodeMirror.changeEnd = function (change) {
    if (!change.text) return change.to;
    return Pos(change.from.line + change.text.length - 1,
      lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0));
  };

  // Adjust a position to refer to the post-change position of the
  // same text, or the end of the change if the change covers it.
  function adjustForChange(pos, change) {
    if (cmp(pos, change.from) < 0) return pos;
    if (cmp(pos, change.to) <= 0) return changeEnd(change);

    var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
    if (pos.line == change.to.line) ch += changeEnd(change).ch - change.to.ch;
    return Pos(line, ch);
  }

  function computeSelAfterChange(doc, change) {
    var out = [];
    for (var i = 0; i < doc.sel.ranges.length; i++) {
      var range = doc.sel.ranges[i];
      out.push(new Range(adjustForChange(range.anchor, change),
        adjustForChange(range.head, change)));
    }
    return normalizeSelection(out, doc.sel.primIndex);
  }

  function offsetPos(pos, old, nw) {
    if (pos.line == old.line)
      return Pos(nw.line, pos.ch - old.ch + nw.ch);
    else
      return Pos(nw.line + (pos.line - old.line), pos.ch);
  }

  // Used by replaceSelections to allow moving the selection to the
  // start or around the replaced test. Hint may be "start" or "around".
  function computeReplacedSel(doc, changes, hint) {
    var out = [];
    var oldPrev = Pos(doc.first, 0), newPrev = oldPrev;
    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];
      var from = offsetPos(change.from, oldPrev, newPrev);
      var to = offsetPos(changeEnd(change), oldPrev, newPrev);
      oldPrev = change.to;
      newPrev = to;
      if (hint == "around") {
        var range = doc.sel.ranges[i], inv = cmp(range.head, range.anchor) < 0;
        out[i] = new Range(inv ? to : from, inv ? from : to);
      } else {
        out[i] = new Range(from, from);
      }
    }
    return new Selection(out, doc.sel.primIndex);
  }

  // Allow "beforeChange" event handlers to influence a change
  function filterChange(doc, change, update) {
    var obj = {
      canceled: false,
      from: change.from,
      to: change.to,
      text: change.text,
      origin: change.origin,
      cancel: function () { this.canceled = true; }
    };
    if (update) obj.update = function (from, to, text, origin) {
      if (from) this.from = clipPos(doc, from);
      if (to) this.to = clipPos(doc, to);
      if (text) this.text = text;
      if (origin !== undefined) this.origin = origin;
    };
    signal(doc, "beforeChange", doc, obj);
    if (doc.cm) signal(doc.cm, "beforeChange", doc.cm, obj);

    if (obj.canceled) return null;
    return { from: obj.from, to: obj.to, text: obj.text, origin: obj.origin };
  }

  // Apply a change to a document, and add it to the document's
  // history, and propagating it to all linked documents.
  function makeChange(doc, change, ignoreReadOnly) {
    if (doc.cm) {
      if (!doc.cm.curOp) return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly);
      if (doc.cm.state.suppressEdits) return;
    }

    if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
      change = filterChange(doc, change, true);
      if (!change) return;
    }

    // Possibly split or suppress the update based on the presence
    // of read-only spans in its range.
    var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
    if (split) {
      for (var i = split.length - 1; i >= 0; --i)
        makeChangeInner(doc, { from: split[i].from, to: split[i].to, text: i ? [""] : change.text });
    } else {
      makeChangeInner(doc, change);
    }
  }

  function makeChangeInner(doc, change) {
    if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) return;
    var selAfter = computeSelAfterChange(doc, change);
    addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);

    makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
    var rebased = [];

    linkedDocs(doc, function (doc, sharedHist) {
      if (!sharedHist && indexOf(rebased, doc.history) == -1) {
        rebaseHist(doc.history, change);
        rebased.push(doc.history);
      }
      makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
    });
  }

  // Revert a change stored in a document's history.
  function makeChangeFromHistory(doc, type, allowSelectionOnly) {
    if (doc.cm && doc.cm.state.suppressEdits) return;

    var hist = doc.history, event, selAfter = doc.sel;
    var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;

    // Verify that there is a useable event (so that ctrl-z won't
    // needlessly clear selection events)
    for (var i = 0; i < source.length; i++) {
      event = source[i];
      if (allowSelectionOnly ? event.ranges && !event.equals(doc.sel) : !event.ranges)
        break;
    }
    if (i == source.length) return;
    hist.lastOrigin = hist.lastSelOrigin = null;

    for (; ;) {
      event = source.pop();
      if (event.ranges) {
        pushSelectionToHistory(event, dest);
        if (allowSelectionOnly && !event.equals(doc.sel)) {
          setSelection(doc, event, { clearRedo: false });
          return;
        }
        selAfter = event;
      }
      else break;
    }

    // Build up a reverse change object to add to the opposite history
    // stack (redo when undoing, and vice versa).
    var antiChanges = [];
    pushSelectionToHistory(selAfter, dest);
    dest.push({ changes: antiChanges, generation: hist.generation });
    hist.generation = event.generation || ++hist.maxGeneration;

    var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");

    for (var i = event.changes.length - 1; i >= 0; --i) {
      var change = event.changes[i];
      change.origin = type;
      if (filter && !filterChange(doc, change, false)) {
        source.length = 0;
        return;
      }

      antiChanges.push(historyChangeFromChange(doc, change));

      var after = i ? computeSelAfterChange(doc, change, null) : lst(source);
      makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
      if (doc.cm) ensureCursorVisible(doc.cm);
      var rebased = [];

      // Propagate to the linked documents
      linkedDocs(doc, function (doc, sharedHist) {
        if (!sharedHist && indexOf(rebased, doc.history) == -1) {
          rebaseHist(doc.history, change);
          rebased.push(doc.history);
        }
        makeChangeSingleDoc(doc, change, null, mergeOldSpans(doc, change));
      });
    }
  }

  // Sub-views need their line numbers shifted when text is added
  // above or below them in the parent document.
  function shiftDoc(doc, distance) {
    doc.first += distance;
    doc.sel = new Selection(map(doc.sel.ranges, function (range) {
      return new Range(Pos(range.anchor.line + distance, range.anchor.ch),
        Pos(range.head.line + distance, range.head.ch));
    }), doc.sel.primIndex);
    if (doc.cm) regChange(doc.cm, doc.first, doc.first - distance, distance);
  }

  // More lower-level change function, handling only a single document
  // (not linked ones).
  function makeChangeSingleDoc(doc, change, selAfter, spans) {
    if (doc.cm && !doc.cm.curOp)
      return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans);

    if (change.to.line < doc.first) {
      shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
      return;
    }
    if (change.from.line > doc.lastLine()) return;

    // Clip the change to the size of this doc
    if (change.from.line < doc.first) {
      var shift = change.text.length - 1 - (doc.first - change.from.line);
      shiftDoc(doc, shift);
      change = {
        from: Pos(doc.first, 0), to: Pos(change.to.line + shift, change.to.ch),
        text: [lst(change.text)], origin: change.origin
      };
    }
    var last = doc.lastLine();
    if (change.to.line > last) {
      change = {
        from: change.from, to: Pos(last, getLine(doc, last).text.length),
        text: [change.text[0]], origin: change.origin
      };
    }

    change.removed = getBetween(doc, change.from, change.to);

    if (!selAfter) selAfter = computeSelAfterChange(doc, change, null);
    if (doc.cm) makeChangeSingleDocInEditor(doc.cm, change, spans);
    else updateDoc(doc, change, spans);
    setSelectionNoUndo(doc, selAfter, sel_dontScroll);
  }

  // Handle the interaction of a change to a document with the editor
  // that this document is part of.
  function makeChangeSingleDocInEditor(cm, change, spans) {
    var doc = cm.doc, display = cm.display, from = change.from, to = change.to;

    var recomputeMaxLength = false, checkWidthStart = from.line;
    if (!cm.options.lineWrapping) {
      checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
      doc.iter(checkWidthStart, to.line + 1, function (line) {
        if (line == display.maxLine) {
          recomputeMaxLength = true;
          return true;
        }
      });
    }

    if (doc.sel.contains(change.from, change.to) > -1)
      cm.curOp.cursorActivity = true;

    updateDoc(doc, change, spans, estimateHeight(cm));

    if (!cm.options.lineWrapping) {
      doc.iter(checkWidthStart, from.line + change.text.length, function (line) {
        var len = lineLength(line);
        if (len > display.maxLineLength) {
          display.maxLine = line;
          display.maxLineLength = len;
          display.maxLineChanged = true;
          recomputeMaxLength = false;
        }
      });
      if (recomputeMaxLength) cm.curOp.updateMaxLine = true;
    }

    // Adjust frontier, schedule worker
    doc.frontier = Math.min(doc.frontier, from.line);
    startWorker(cm, 400);

    var lendiff = change.text.length - (to.line - from.line) - 1;
    // Remember that these lines changed, for updating the display
    if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change))
      regLineChange(cm, from.line, "text");
    else
      regChange(cm, from.line, to.line + 1, lendiff);

    if (hasHandler(cm, "change") || hasHandler(cm, "changes"))
      (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push({
        from: from, to: to,
        text: change.text,
        removed: change.removed,
        origin: change.origin
      });
  }

  function replaceRange(doc, code, from, to, origin) {
    if (!to) to = from;
    if (cmp(to, from) < 0) { var tmp = to; to = from; from = tmp; }
    if (typeof code == "string") code = splitLines(code);
    makeChange(doc, { from: from, to: to, text: code, origin: origin });
  }

  // SCROLLING THINGS INTO VIEW

  // If an editor sits on the top or bottom of the window, partially
  // scrolled out of view, this ensures that the cursor is visible.
  function maybeScrollWindow(cm, coords) {
    var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
    if (coords.top + box.top < 0) doScroll = true;
    else if (coords.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight)) doScroll = false;
    if (doScroll != null && !phantom) {
      var scrollNode = elt("div", "\u200b", null, "position: absolute; top: " +
        (coords.top - display.viewOffset - paddingTop(cm.display)) + "px; height: " +
        (coords.bottom - coords.top + scrollerCutOff) + "px; left: " +
        coords.left + "px; width: 2px;");
      cm.display.lineSpace.appendChild(scrollNode);
      scrollNode.scrollIntoView(doScroll);
      cm.display.lineSpace.removeChild(scrollNode);
    }
  }

  // Scroll a given position into view (immediately), verifying that
  // it actually became visible (as line heights are accurately
  // measured, the position of something may 'drift' during drawing).
  function scrollPosIntoView(cm, pos, end, margin) {
    if (margin == null) margin = 0;
    for (; ;) {
      var changed = false, coords = cursorCoords(cm, pos);
      var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
      var scrollPos = calculateScrollPos(cm, Math.min(coords.left, endCoords.left),
        Math.min(coords.top, endCoords.top) - margin,
        Math.max(coords.left, endCoords.left),
        Math.max(coords.bottom, endCoords.bottom) + margin);
      var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
      if (scrollPos.scrollTop != null) {
        setScrollTop(cm, scrollPos.scrollTop);
        if (Math.abs(cm.doc.scrollTop - startTop) > 1) changed = true;
      }
      if (scrollPos.scrollLeft != null) {
        setScrollLeft(cm, scrollPos.scrollLeft);
        if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) changed = true;
      }
      if (!changed) return coords;
    }
  }

  // Scroll a given set of coordinates into view (immediately).
  function scrollIntoView(cm, x1, y1, x2, y2) {
    var scrollPos = calculateScrollPos(cm, x1, y1, x2, y2);
    if (scrollPos.scrollTop != null) setScrollTop(cm, scrollPos.scrollTop);
    if (scrollPos.scrollLeft != null) setScrollLeft(cm, scrollPos.scrollLeft);
  }

  // Calculate a new scroll position needed to scroll the given
  // rectangle into view. Returns an object with scrollTop and
  // scrollLeft properties. When these are undefined, the
  // vertical/horizontal position does not need to be adjusted.
  function calculateScrollPos(cm, x1, y1, x2, y2) {
    var display = cm.display, snapMargin = textHeight(cm.display);
    if (y1 < 0) y1 = 0;
    var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
    var screen = display.scroller.clientHeight - scrollerCutOff, result = {};
    var docBottom = cm.doc.height + paddingVert(display);
    var atTop = y1 < snapMargin, atBottom = y2 > docBottom - snapMargin;
    if (y1 < screentop) {
      result.scrollTop = atTop ? 0 : y1;
    } else if (y2 > screentop + screen) {
      var newTop = Math.min(y1, (atBottom ? docBottom : y2) - screen);
      if (newTop != screentop) result.scrollTop = newTop;
    }

    var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft;
    var screenw = display.scroller.clientWidth - scrollerCutOff;
    x1 += display.gutters.offsetWidth; x2 += display.gutters.offsetWidth;
    var gutterw = display.gutters.offsetWidth;
    var atLeft = x1 < gutterw + 10;
    if (x1 < screenleft + gutterw || atLeft) {
      if (atLeft) x1 = 0;
      result.scrollLeft = Math.max(0, x1 - 10 - gutterw);
    } else if (x2 > screenw + screenleft - 3) {
      result.scrollLeft = x2 + 10 - screenw;
    }
    return result;
  }

  // Store a relative adjustment to the scroll position in the current
  // operation (to be applied when the operation finishes).
  function addToScrollPos(cm, left, top) {
    if (left != null || top != null) resolveScrollToPos(cm);
    if (left != null)
      cm.curOp.scrollLeft = (cm.curOp.scrollLeft == null ? cm.doc.scrollLeft : cm.curOp.scrollLeft) + left;
    if (top != null)
      cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
  }

  // Make sure that at the end of the operation the current cursor is
  // shown.
  function ensureCursorVisible(cm) {
    resolveScrollToPos(cm);
    var cur = cm.getCursor(), from = cur, to = cur;
    if (!cm.options.lineWrapping) {
      from = cur.ch ? Pos(cur.line, cur.ch - 1) : cur;
      to = Pos(cur.line, cur.ch + 1);
    }
    cm.curOp.scrollToPos = { from: from, to: to, margin: cm.options.cursorScrollMargin, isCursor: true };
  }

  // When an operation has its scrollToPos property set, and another
  // scroll action is applied before the end of the operation, this
  // 'simulates' scrolling that position into view in a cheap way, so
  // that the effect of intermediate scroll commands is not ignored.
  function resolveScrollToPos(cm) {
    var range = cm.curOp.scrollToPos;
    if (range) {
      cm.curOp.scrollToPos = null;
      var from = estimateCoords(cm, range.from), to = estimateCoords(cm, range.to);
      var sPos = calculateScrollPos(cm, Math.min(from.left, to.left),
        Math.min(from.top, to.top) - range.margin,
        Math.max(from.right, to.right),
        Math.max(from.bottom, to.bottom) + range.margin);
      cm.scrollTo(sPos.scrollLeft, sPos.scrollTop);
    }
  }

  // API UTILITIES

  // Indent the given line. The how parameter can be "smart",
  // "add"/null, "subtract", or "prev". When aggressive is false
  // (typically set to true for forced single-line indents), empty
  // lines are not indented, and places where the mode returns Pass
  // are left alone.
  function indentLine(cm, n, how, aggressive) {
    var doc = cm.doc, state;
    if (how == null) how = "add";
    if (how == "smart") {
      // Fall back to "prev" when the mode doesn't have an indentation
      // method.
      if (!cm.doc.mode.indent) how = "prev";
      else state = getStateBefore(cm, n);
    }

    var tabSize = cm.options.tabSize;
    var line = getLine(doc, n), curSpace = countColumn(line.text, null, tabSize);
    if (line.stateAfter) line.stateAfter = null;
    var curSpaceString = line.text.match(/^\s*/)[0], indentation;
    if (!aggressive && !/\S/.test(line.text)) {
      indentation = 0;
      how = "not";
    } else if (how == "smart") {
      indentation = cm.doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
      if (indentation == Pass) {
        if (!aggressive) return;
        how = "prev";
      }
    }
    if (how == "prev") {
      if (n > doc.first) indentation = countColumn(getLine(doc, n - 1).text, null, tabSize);
      else indentation = 0;
    } else if (how == "add") {
      indentation = curSpace + cm.options.indentUnit;
    } else if (how == "subtract") {
      indentation = curSpace - cm.options.indentUnit;
    } else if (typeof how == "number") {
      indentation = curSpace + how;
    }
    indentation = Math.max(0, indentation);

    var indentString = "", pos = 0;
    if (cm.options.indentWithTabs)
      for (var i = Math.floor(indentation / tabSize); i; --i) { pos += tabSize; indentString += "\t"; }
    if (pos < indentation) indentString += spaceStr(indentation - pos);

    if (indentString != curSpaceString) {
      replaceRange(cm.doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
    } else {
      // Ensure that, if the cursor was in the whitespace at the start
      // of the line, it is moved to the end of that space.
      for (var i = 0; i < doc.sel.ranges.length; i++) {
        var range = doc.sel.ranges[i];
        if (range.head.line == n && range.head.ch < curSpaceString.length) {
          var pos = Pos(n, curSpaceString.length);
          replaceOneSelection(doc, i, new Range(pos, pos));
          break;
        }
      }
    }
    line.stateAfter = null;
  }

  // Utility for applying a change to a line by handle or number,
  // returning the number and optionally registering the line as
  // changed.
  function changeLine(cm, handle, changeType, op) {
    var no = handle, line = handle, doc = cm.doc;
    if (typeof handle == "number") line = getLine(doc, clipLine(doc, handle));
    else no = lineNo(handle);
    if (no == null) return null;
    if (op(line, no)) regLineChange(cm, no, changeType);
    else return null;
    return line;
  }

  // Helper for deleting text near the selection(s), used to implement
  // backspace, delete, and similar functionality.
  function deleteNearSelection(cm, compute) {
    var ranges = cm.doc.sel.ranges, kill = [];
    // Build up a set of ranges to kill first, merging overlapping
    // ranges.
    for (var i = 0; i < ranges.length; i++) {
      var toKill = compute(ranges[i]);
      while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
        var replaced = kill.pop();
        if (cmp(replaced.from, toKill.from) < 0) {
          toKill.from = replaced.from;
          break;
        }
      }
      kill.push(toKill);
    }
    // Next, remove those actual ranges.
    runInOp(cm, function () {
      for (var i = kill.length - 1; i >= 0; i--)
        replaceRange(cm.doc, "", kill[i].from, kill[i].to, "+delete");
      ensureCursorVisible(cm);
    });
  }

  // Used for horizontal relative motion. Dir is -1 or 1 (left or
  // right), unit can be "char", "column" (like char, but doesn't
  // cross line boundaries), "word" (across next word), or "group" (to
  // the start of next group of word or non-word-non-whitespace
  // chars). The visually param controls whether, in right-to-left
  // text, direction 1 means to move towards the next index in the
  // string, or towards the character to the right of the current
  // position. The resulting position will have a hitSide=true
  // property if it reached the end of the document.
  function findPosH(doc, pos, dir, unit, visually) {
    var line = pos.line, ch = pos.ch, origDir = dir;
    var lineObj = getLine(doc, line);
    var possible = true;
    function findNextLine() {
      var l = line + dir;
      if (l < doc.first || l >= doc.first + doc.size) return (possible = false);
      line = l;
      return lineObj = getLine(doc, l);
    }
    function moveOnce(boundToLine) {
      var next = (visually ? moveVisually : moveLogically)(lineObj, ch, dir, true);
      if (next == null) {
        if (!boundToLine && findNextLine()) {
          if (visually) ch = (dir < 0 ? lineRight : lineLeft)(lineObj);
          else ch = dir < 0 ? lineObj.text.length : 0;
        } else return (possible = false);
      } else ch = next;
      return true;
    }

    if (unit == "char") moveOnce();
    else if (unit == "column") moveOnce(true);
    else if (unit == "word" || unit == "group") {
      var sawType = null, group = unit == "group";
      for (var first = true; ; first = false) {
        if (dir < 0 && !moveOnce(!first)) break;
        var cur = lineObj.text.charAt(ch) || "\n";
        var type = isWordChar(cur) ? "w"
          : group && cur == "\n" ? "n"
            : !group || /\s/.test(cur) ? null
              : "p";
        if (group && !first && !type) type = "s";
        if (sawType && sawType != type) {
          if (dir < 0) { dir = 1; moveOnce(); }
          break;
        }

        if (type) sawType = type;
        if (dir > 0 && !moveOnce(!first)) break;
      }
    }
    var result = skipAtomic(doc, Pos(line, ch), origDir, true);
    if (!possible) result.hitSide = true;
    return result;
  }

  // For relative vertical movement. Dir may be -1 or 1. Unit can be
  // "page" or "line". The resulting position will have a hitSide=true
  // property if it reached the end of the document.
  function findPosV(cm, pos, dir, unit) {
    var doc = cm.doc, x = pos.left, y;
    if (unit == "page") {
      var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
      y = pos.top + dir * (pageSize - (dir < 0 ? 1.5 : .5) * textHeight(cm.display));
    } else if (unit == "line") {
      y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
    }
    for (; ;) {
      var target = coordsChar(cm, x, y);
      if (!target.outside) break;
      if (dir < 0 ? y <= 0 : y >= doc.height) { target.hitSide = true; break; }
      y += dir * 5;
    }
    return target;
  }

  // Find the word at the given position (as returned by coordsChar).
  function findWordAt(doc, pos) {
    var line = getLine(doc, pos.line).text;
    var start = pos.ch, end = pos.ch;
    if (line) {
      if ((pos.xRel < 0 || end == line.length) && start)--start; else ++end;
      var startChar = line.charAt(start);
      var check = isWordChar(startChar) ? isWordChar
        : /\s/.test(startChar) ? function (ch) { return /\s/.test(ch); }
          : function (ch) { return !/\s/.test(ch) && !isWordChar(ch); };
      while (start > 0 && check(line.charAt(start - 1)))--start;
      while (end < line.length && check(line.charAt(end)))++end;
    }
    return new Range(Pos(pos.line, start), Pos(pos.line, end));
  }

  // EDITOR METHODS

  // The publicly visible API. Note that methodOp(f) means
  // 'wrap f in an operation, performed on its `this` parameter'.

  // This is not the complete set of editor methods. Most of the
  // methods defined on the Doc type are also injected into
  // CodeMirror.prototype, for backwards compatibility and
  // convenience.

  CodeMirror.prototype = {
    constructor: CodeMirror,

    posFromMouse: function (e) { return posFromMouse(this, e, true); },

    focus: function () { window.focus(); focusInput(this); fastPoll(this); },

    setOption: function (option, value) {
      var options = this.options, old = options[option];
      if (options[option] == value && option != "mode") return;
      options[option] = value;
      if (optionHandlers.hasOwnProperty(option))
        operation(this, optionHandlers[option])(this, value, old);
    },

    getOption: function (option) { return this.options[option]; },
    getDoc: function () { return this.doc; },

    addKeyMap: function (map, bottom) {
      this.state.keyMaps[bottom ? "push" : "unshift"](map);
    },
    removeKeyMap: function (map) {
      var maps = this.state.keyMaps;
      for (var i = 0; i < maps.length; ++i)
        if (maps[i] == map || (typeof maps[i] != "string" && maps[i].name == map)) {
          maps.splice(i, 1);
          return true;
        }
    },

    addOverlay: methodOp(function (spec, options) {
      var mode = spec.token ? spec : CodeMirror.getMode(this.options, spec);
      if (mode.startState) throw new Error("Overlays may not be stateful.");
      this.state.overlays.push({ mode: mode, modeSpec: spec, opaque: options && options.opaque });
      this.state.modeGen++;
      regChange(this);
    }),
    removeOverlay: methodOp(function (spec) {
      var overlays = this.state.overlays;
      for (var i = 0; i < overlays.length; ++i) {
        var cur = overlays[i].modeSpec;
        if (cur == spec || typeof spec == "string" && cur.name == spec) {
          overlays.splice(i, 1);
          this.state.modeGen++;
          regChange(this);
          return;
        }
      }
    }),

    indentLine: methodOp(function (n, dir, aggressive) {
      if (typeof dir != "string" && typeof dir != "number") {
        if (dir == null) dir = this.options.smartIndent ? "smart" : "prev";
        else dir = dir ? "add" : "subtract";
      }
      if (isLine(this.doc, n)) indentLine(this, n, dir, aggressive);
    }),
    indentSelection: methodOp(function (how) {
      var ranges = this.doc.sel.ranges, end = -1;
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        if (!range.empty()) {
          var start = Math.max(end, range.from().line);
          var to = range.to();
          end = Math.min(this.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
          for (var j = start; j < end; ++j)
            indentLine(this, j, how);
        } else if (range.head.line > end) {
          indentLine(this, range.head.line, how, true);
          end = range.head.line;
          if (i == this.doc.sel.primIndex) ensureCursorVisible(this);
        }
      }
    }),

    // Fetch the parser token for a given character. Useful for hacks
    // that want to inspect the mode state (say, for completion).
    getTokenAt: function (pos, precise) {
      var doc = this.doc;
      pos = clipPos(doc, pos);
      var state = getStateBefore(this, pos.line, precise), mode = this.doc.mode;
      var line = getLine(doc, pos.line);
      var stream = new StringStream(line.text, this.options.tabSize);
      while (stream.pos < pos.ch && !stream.eol()) {
        stream.start = stream.pos;
        var style = mode.token(stream, state);
      }
      return {
        start: stream.start,
        end: stream.pos,
        string: stream.current(),
        type: style || null,
        state: state
      };
    },

    getTokenTypeAt: function (pos) {
      pos = clipPos(this.doc, pos);
      var styles = getLineStyles(this, getLine(this.doc, pos.line));
      var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
      if (ch == 0) return styles[2];
      for (; ;) {
        var mid = (before + after) >> 1;
        if ((mid ? styles[mid * 2 - 1] : 0) >= ch) after = mid;
        else if (styles[mid * 2 + 1] < ch) before = mid + 1;
        else return styles[mid * 2 + 2];
      }
    },

    getModeAt: function (pos) {
      var mode = this.doc.mode;
      if (!mode.innerMode) return mode;
      return CodeMirror.innerMode(mode, this.getTokenAt(pos).state).mode;
    },

    getHelper: function (pos, type) {
      return this.getHelpers(pos, type)[0];
    },

    getHelpers: function (pos, type) {
      var found = [];
      if (!helpers.hasOwnProperty(type)) return helpers;
      var help = helpers[type], mode = this.getModeAt(pos);
      if (typeof mode[type] == "string") {
        if (help[mode[type]]) found.push(help[mode[type]]);
      } else if (mode[type]) {
        for (var i = 0; i < mode[type].length; i++) {
          var val = help[mode[type][i]];
          if (val) found.push(val);
        }
      } else if (mode.helperType && help[mode.helperType]) {
        found.push(help[mode.helperType]);
      } else if (help[mode.name]) {
        found.push(help[mode.name]);
      }
      for (var i = 0; i < help._global.length; i++) {
        var cur = help._global[i];
        if (cur.pred(mode, this) && indexOf(found, cur.val) == -1)
          found.push(cur.val);
      }
      return found;
    },

    getStateAfter: function (line, precise) {
      var doc = this.doc;
      line = clipLine(doc, line == null ? doc.first + doc.size - 1 : line);
      return getStateBefore(this, line + 1, precise);
    },

    cursorCoords: function (start, mode) {
      var pos, range = this.doc.sel.primary();
      if (start == null) pos = range.head;
      else if (typeof start == "object") pos = clipPos(this.doc, start);
      else pos = start ? range.from() : range.to();
      return cursorCoords(this, pos, mode || "page");
    },

    charCoords: function (pos, mode) {
      return charCoords(this, clipPos(this.doc, pos), mode || "page");
    },

    coordsChar: function (coords, mode) {
      coords = fromCoordSystem(this, coords, mode || "page");
      return coordsChar(this, coords.left, coords.top);
    },

    lineAtHeight: function (height, mode) {
      height = fromCoordSystem(this, { top: height, left: 0 }, mode || "page").top;
      return lineAtHeight(this.doc, height + this.display.viewOffset);
    },
    heightAtLine: function (line, mode) {
      var end = false, last = this.doc.first + this.doc.size - 1;
      if (line < this.doc.first) line = this.doc.first;
      else if (line > last) { line = last; end = true; }
      var lineObj = getLine(this.doc, line);
      return intoCoordSystem(this, lineObj, { top: 0, left: 0 }, mode || "page").top +
        (end ? this.doc.height - heightAtLine(lineObj) : 0);
    },

    defaultTextHeight: function () { return textHeight(this.display); },
    defaultCharWidth: function () { return charWidth(this.display); },

    setGutterMarker: methodOp(function (line, gutterID, value) {
      return changeLine(this, line, "gutter", function (line) {
        var markers = line.gutterMarkers || (line.gutterMarkers = {});
        markers[gutterID] = value;
        if (!value && isEmpty(markers)) line.gutterMarkers = null;
        return true;
      });
    }),

    clearGutter: methodOp(function (gutterID) {
      var cm = this, doc = cm.doc, i = doc.first;
      doc.iter(function (line) {
        if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
          line.gutterMarkers[gutterID] = null;
          regLineChange(cm, i, "gutter");
          if (isEmpty(line.gutterMarkers)) line.gutterMarkers = null;
        }
        ++i;
      });
    }),

    addLineClass: methodOp(function (handle, where, cls) {
      return changeLine(this, handle, "class", function (line) {
        var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : "wrapClass";
        if (!line[prop]) line[prop] = cls;
        else if (new RegExp("(?:^|\\s)" + cls + "(?:$|\\s)").test(line[prop])) return false;
        else line[prop] += " " + cls;
        return true;
      });
    }),

    removeLineClass: methodOp(function (handle, where, cls) {
      return changeLine(this, handle, "class", function (line) {
        var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : "wrapClass";
        var cur = line[prop];
        if (!cur) return false;
        else if (cls == null) line[prop] = null;
        else {
          var found = cur.match(new RegExp("(?:^|\\s+)" + cls + "(?:$|\\s+)"));
          if (!found) return false;
          var end = found.index + found[0].length;
          line[prop] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
        }
        return true;
      });
    }),

    addLineWidget: methodOp(function (handle, node, options) {
      return addLineWidget(this, handle, node, options);
    }),

    removeLineWidget: function (widget) { widget.clear(); },

    lineInfo: function (line) {
      if (typeof line == "number") {
        if (!isLine(this.doc, line)) return null;
        var n = line;
        line = getLine(this.doc, line);
        if (!line) return null;
      } else {
        var n = lineNo(line);
        if (n == null) return null;
      }
      return {
        line: n, handle: line, text: line.text, gutterMarkers: line.gutterMarkers,
        textClass: line.textClass, bgClass: line.bgClass, wrapClass: line.wrapClass,
        widgets: line.widgets
      };
    },

    getViewport: function () { return { from: this.display.viewFrom, to: this.display.viewTo }; },

    addWidget: function (pos, node, scroll, vert, horiz) {
      var display = this.display;
      pos = cursorCoords(this, clipPos(this.doc, pos));
      var top = pos.bottom, left = pos.left;
      node.style.position = "absolute";
      display.sizer.appendChild(node);
      if (vert == "over") {
        top = pos.top;
      } else if (vert == "above" || vert == "near") {
        var vspace = Math.max(display.wrapper.clientHeight, this.doc.height),
          hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
        // Default to positioning above (if specified and possible); otherwise default to positioning below
        if ((vert == 'above' || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight)
          top = pos.top - node.offsetHeight;
        else if (pos.bottom + node.offsetHeight <= vspace)
          top = pos.bottom;
        if (left + node.offsetWidth > hspace)
          left = hspace - node.offsetWidth;
      }
      node.style.top = top + "px";
      node.style.left = node.style.right = "";
      if (horiz == "right") {
        left = display.sizer.clientWidth - node.offsetWidth;
        node.style.right = "0px";
      } else {
        if (horiz == "left") left = 0;
        else if (horiz == "middle") left = (display.sizer.clientWidth - node.offsetWidth) / 2;
        node.style.left = left + "px";
      }
      if (scroll)
        scrollIntoView(this, left, top, left + node.offsetWidth, top + node.offsetHeight);
    },

    triggerOnKeyDown: methodOp(onKeyDown),
    triggerOnKeyPress: methodOp(onKeyPress),
    triggerOnKeyUp: methodOp(onKeyUp),

    execCommand: function (cmd) {
      if (commands.hasOwnProperty(cmd))
        return commands[cmd](this);
    },

    findPosH: function (from, amount, unit, visually) {
      var dir = 1;
      if (amount < 0) { dir = -1; amount = -amount; }
      for (var i = 0, cur = clipPos(this.doc, from); i < amount; ++i) {
        cur = findPosH(this.doc, cur, dir, unit, visually);
        if (cur.hitSide) break;
      }
      return cur;
    },

    moveH: methodOp(function (dir, unit) {
      var cm = this;
      cm.extendSelectionsBy(function (range) {
        if (cm.display.shift || cm.doc.extend || range.empty())
          return findPosH(cm.doc, range.head, dir, unit, cm.options.rtlMoveVisually);
        else
          return dir < 0 ? range.from() : range.to();
      }, sel_move);
    }),

    deleteH: methodOp(function (dir, unit) {
      var sel = this.doc.sel, doc = this.doc;
      if (sel.somethingSelected())
        doc.replaceSelection("", null, "+delete");
      else
        deleteNearSelection(this, function (range) {
          var other = findPosH(doc, range.head, dir, unit, false);
          return dir < 0 ? { from: other, to: range.head } : { from: range.head, to: other };
        });
    }),

    findPosV: function (from, amount, unit, goalColumn) {
      var dir = 1, x = goalColumn;
      if (amount < 0) { dir = -1; amount = -amount; }
      for (var i = 0, cur = clipPos(this.doc, from); i < amount; ++i) {
        var coords = cursorCoords(this, cur, "div");
        if (x == null) x = coords.left;
        else coords.left = x;
        cur = findPosV(this, coords, dir, unit);
        if (cur.hitSide) break;
      }
      return cur;
    },

    moveV: methodOp(function (dir, unit) {
      var cm = this, doc = this.doc, goals = [];
      var collapse = !cm.display.shift && !doc.extend && doc.sel.somethingSelected();
      doc.extendSelectionsBy(function (range) {
        if (collapse)
          return dir < 0 ? range.from() : range.to();
        var headPos = cursorCoords(cm, range.head, "div");
        if (range.goalColumn != null) headPos.left = range.goalColumn;
        goals.push(headPos.left);
        var pos = findPosV(cm, headPos, dir, unit);
        if (unit == "page" && range == doc.sel.primary())
          addToScrollPos(cm, null, charCoords(cm, pos, "div").top - headPos.top);
        return pos;
      }, sel_move);
      if (goals.length) for (var i = 0; i < doc.sel.ranges.length; i++)
        doc.sel.ranges[i].goalColumn = goals[i];
    }),

    toggleOverwrite: function (value) {
      if (value != null && value == this.state.overwrite) return;
      if (this.state.overwrite = !this.state.overwrite)
        this.display.cursorDiv.className += " CodeMirror-overwrite";
      else
        this.display.cursorDiv.className = this.display.cursorDiv.className.replace(" CodeMirror-overwrite", "");

      signal(this, "overwriteToggle", this, this.state.overwrite);
    },
    hasFocus: function () { return activeElt() == this.display.input; },

    scrollTo: methodOp(function (x, y) {
      if (x != null || y != null) resolveScrollToPos(this);
      if (x != null) this.curOp.scrollLeft = x;
      if (y != null) this.curOp.scrollTop = y;
    }),
    getScrollInfo: function () {
      var scroller = this.display.scroller, co = scrollerCutOff;
      return {
        left: scroller.scrollLeft, top: scroller.scrollTop,
        height: scroller.scrollHeight - co, width: scroller.scrollWidth - co,
        clientHeight: scroller.clientHeight - co, clientWidth: scroller.clientWidth - co
      };
    },

    scrollIntoView: methodOp(function (range, margin) {
      if (range == null) {
        range = { from: this.doc.sel.primary().head, to: null };
        if (margin == null) margin = this.options.cursorScrollMargin;
      } else if (typeof range == "number") {
        range = { from: Pos(range, 0), to: null };
      } else if (range.from == null) {
        range = { from: range, to: null };
      }
      if (!range.to) range.to = range.from;
      range.margin = margin || 0;

      if (range.from.line != null) {
        resolveScrollToPos(this);
        this.curOp.scrollToPos = range;
      } else {
        var sPos = calculateScrollPos(this, Math.min(range.from.left, range.to.left),
          Math.min(range.from.top, range.to.top) - range.margin,
          Math.max(range.from.right, range.to.right),
          Math.max(range.from.bottom, range.to.bottom) + range.margin);
        this.scrollTo(sPos.scrollLeft, sPos.scrollTop);
      }
    }),

    setSize: methodOp(function (width, height) {
      function interpret(val) {
        return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
      }
      if (width != null) this.display.wrapper.style.width = interpret(width);
      if (height != null) this.display.wrapper.style.height = interpret(height);
      if (this.options.lineWrapping) clearLineMeasurementCache(this);
      this.curOp.forceUpdate = true;
      signal(this, "refresh", this);
    }),

    operation: function (f) { return runInOp(this, f); },

    refresh: methodOp(function () {
      var oldHeight = this.display.cachedTextHeight;
      regChange(this);
      clearCaches(this);
      this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
      if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > .5)
        estimateLineHeights(this);
      signal(this, "refresh", this);
    }),

    swapDoc: methodOp(function (doc) {
      var old = this.doc;
      old.cm = null;
      attachDoc(this, doc);
      clearCaches(this);
      resetInput(this);
      this.scrollTo(doc.scrollLeft, doc.scrollTop);
      signalLater(this, "swapDoc", this, old);
      return old;
    }),

    getInputField: function () { return this.display.input; },
    getWrapperElement: function () { return this.display.wrapper; },
    getScrollerElement: function () { return this.display.scroller; },
    getGutterElement: function () { return this.display.gutters; }
  };
  eventMixin(CodeMirror);

  // OPTION DEFAULTS

  // The default configuration options.
  var defaults = CodeMirror.defaults = {};
  // Functions to run when options are changed.
  var optionHandlers = CodeMirror.optionHandlers = {};

  function option(name, deflt, handle, notOnInit) {
    CodeMirror.defaults[name] = deflt;
    if (handle) optionHandlers[name] =
      notOnInit ? function (cm, val, old) { if (old != Init) handle(cm, val, old); } : handle;
  }

  // Passed to option handlers when there is no old value.
  var Init = CodeMirror.Init = { toString: function () { return "CodeMirror.Init"; } };

  // These two are, on init, called from the constructor because they
  // have to be initialized before the editor can start at all.
  option("value", "", function (cm, val) {
    cm.setValue(val);
  }, true);
  option("mode", null, function (cm, val) {
    cm.doc.modeOption = val;
    loadMode(cm);
  }, true);

  option("indentUnit", 2, loadMode, true);
  option("indentWithTabs", false);
  option("smartIndent", true);
  option("tabSize", 4, function (cm) {
    resetModeState(cm);
    clearCaches(cm);
    regChange(cm);
  }, true);
  option("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, function (cm, val) {
    cm.options.specialChars = new RegExp(val.source + (val.test("\t") ? "" : "|\t"), "g");
    cm.refresh();
  }, true);
  option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function (cm) { cm.refresh(); }, true);
  option("electricChars", true);
  option("rtlMoveVisually", !windows);
  option("wholeLineUpdateBefore", true);

  option("theme", "default", function (cm) {
    themeChanged(cm);
    guttersChanged(cm);
  }, true);
  option("keyMap", "default", keyMapChanged);
  option("extraKeys", null);

  option("lineWrapping", false, wrappingChanged, true);
  option("gutters", [], function (cm) {
    setGuttersForLineNumbers(cm.options);
    guttersChanged(cm);
  }, true);
  option("fixedGutter", true, function (cm, val) {
    cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
    cm.refresh();
  }, true);
  option("coverGutterNextToScrollbar", false, updateScrollbars, true);
  option("lineNumbers", false, function (cm) {
    setGuttersForLineNumbers(cm.options);
    guttersChanged(cm);
  }, true);
  option("firstLineNumber", 1, guttersChanged, true);
  option("lineNumberFormatter", function (integer) { return integer; }, guttersChanged, true);
  option("showCursorWhenSelecting", false, updateSelection, true);

  option("resetSelectionOnContextMenu", true);

  option("readOnly", false, function (cm, val) {
    if (val == "nocursor") {
      onBlur(cm);
      cm.display.input.blur();
      cm.display.disabled = true;
    } else {
      cm.display.disabled = false;
      if (!val) resetInput(cm);
    }
  });
  option("disableInput", false, function (cm, val) { if (!val) resetInput(cm); }, true);
  option("dragDrop", true);

  option("cursorBlinkRate", 530);
  option("cursorScrollMargin", 0);
  option("cursorHeight", 1);
  option("workTime", 100);
  option("workDelay", 100);
  option("flattenSpans", true, resetModeState, true);
  option("addModeClass", false, resetModeState, true);
  option("pollInterval", 100);
  option("undoDepth", 200, function (cm, val) { cm.doc.history.undoDepth = val; });
  option("historyEventDelay", 1250);
  option("viewportMargin", 10, function (cm) { cm.refresh(); }, true);
  option("maxHighlightLength", 10000, resetModeState, true);
  option("moveInputWithCursor", true, function (cm, val) {
    if (!val) cm.display.inputDiv.style.top = cm.display.inputDiv.style.left = 0;
  });

  option("tabindex", null, function (cm, val) {
    cm.display.input.tabIndex = val || "";
  });
  option("autofocus", null);

  // MODE DEFINITION AND QUERYING

  // Known modes, by name and by MIME
  var modes = CodeMirror.modes = {}, mimeModes = CodeMirror.mimeModes = {};

  // Extra arguments are stored as the mode's dependencies, which is
  // used by (legacy) mechanisms like loadmode.js to automatically
  // load a mode. (Preferred mechanism is the require/define calls.)
  CodeMirror.defineMode = function (name, mode) {
    if (!CodeMirror.defaults.mode && name != "null") CodeMirror.defaults.mode = name;
    if (arguments.length > 2) {
      mode.dependencies = [];
      for (var i = 2; i < arguments.length; ++i) mode.dependencies.push(arguments[i]);
    }
    modes[name] = mode;
  };

  CodeMirror.defineMIME = function (mime, spec) {
    mimeModes[mime] = spec;
  };

  // Given a MIME type, a {name, ...options} config object, or a name
  // string, return a mode config object.
  CodeMirror.resolveMode = function (spec) {
    if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
      spec = mimeModes[spec];
    } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
      var found = mimeModes[spec.name];
      if (typeof found == "string") found = { name: found };
      spec = createObj(found, spec);
      spec.name = found.name;
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
      return CodeMirror.resolveMode("application/xml");
    }
    if (typeof spec == "string") return { name: spec };
    else return spec || { name: "null" };
  };

  // Given a mode spec (anything that resolveMode accepts), find and
  // initialize an actual mode object.
  CodeMirror.getMode = function (options, spec) {
    var spec = CodeMirror.resolveMode(spec);
    var mfactory = modes[spec.name];
    if (!mfactory) return CodeMirror.getMode(options, "text/plain");
    var modeObj = mfactory(options, spec);
    if (modeExtensions.hasOwnProperty(spec.name)) {
      var exts = modeExtensions[spec.name];
      for (var prop in exts) {
        if (!exts.hasOwnProperty(prop)) continue;
        if (modeObj.hasOwnProperty(prop)) modeObj["_" + prop] = modeObj[prop];
        modeObj[prop] = exts[prop];
      }
    }
    modeObj.name = spec.name;
    if (spec.helperType) modeObj.helperType = spec.helperType;
    if (spec.modeProps) for (var prop in spec.modeProps)
      modeObj[prop] = spec.modeProps[prop];

    return modeObj;
  };

  // Minimal default mode.
  CodeMirror.defineMode("null", function () {
    return { token: function (stream) { stream.skipToEnd(); } };
  });
  CodeMirror.defineMIME("text/plain", "null");

  // This can be used to attach properties to mode objects from
  // outside the actual mode definition.
  var modeExtensions = CodeMirror.modeExtensions = {};
  CodeMirror.extendMode = function (mode, properties) {
    var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : (modeExtensions[mode] = {});
    copyObj(properties, exts);
  };

  // EXTENSIONS

  CodeMirror.defineExtension = function (name, func) {
    CodeMirror.prototype[name] = func;
  };
  CodeMirror.defineDocExtension = function (name, func) {
    Doc.prototype[name] = func;
  };
  CodeMirror.defineOption = option;

  var initHooks = [];
  CodeMirror.defineInitHook = function (f) { initHooks.push(f); };

  var helpers = CodeMirror.helpers = {};
  CodeMirror.registerHelper = function (type, name, value) {
    if (!helpers.hasOwnProperty(type)) helpers[type] = CodeMirror[type] = { _global: [] };
    helpers[type][name] = value;
  };
  CodeMirror.registerGlobalHelper = function (type, name, predicate, value) {
    CodeMirror.registerHelper(type, name, value);
    helpers[type]._global.push({ pred: predicate, val: value });
  };

  // MODE STATE HANDLING

  // Utility functions for working with state. Exported because nested
  // modes need to do this for their inner modes.

  var copyState = CodeMirror.copyState = function (mode, state) {
    if (state === true) return state;
    if (mode.copyState) return mode.copyState(state);
    var nstate = {};
    for (var n in state) {
      var val = state[n];
      if (val instanceof Array) val = val.concat([]);
      nstate[n] = val;
    }
    return nstate;
  };

  var startState = CodeMirror.startState = function (mode, a1, a2) {
    return mode.startState ? mode.startState(a1, a2) : true;
  };

  // Given a mode and a state (for that mode), find the inner mode and
  // state at the position that the state refers to.
  CodeMirror.innerMode = function (mode, state) {
    while (mode.innerMode) {
      var info = mode.innerMode(state);
      if (!info || info.mode == mode) break;
      state = info.state;
      mode = info.mode;
    }
    return info || { mode: mode, state: state };
  };

  // STANDARD COMMANDS

  // Commands are parameter-less actions that can be performed on an
  // editor, mostly used for keybindings.
  var commands = CodeMirror.commands = {
    selectAll: function (cm) { cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll); },
    singleSelection: function (cm) {
      cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
    },
    killLine: function (cm) {
      deleteNearSelection(cm, function (range) {
        if (range.empty()) {
          var len = getLine(cm.doc, range.head.line).text.length;
          if (range.head.ch == len && range.head.line < cm.lastLine())
            return { from: range.head, to: Pos(range.head.line + 1, 0) };
          else
            return { from: range.head, to: Pos(range.head.line, len) };
        } else {
          return { from: range.from(), to: range.to() };
        }
      });
    },
    deleteLine: function (cm) {
      deleteNearSelection(cm, function (range) {
        return {
          from: Pos(range.from().line, 0),
          to: clipPos(cm.doc, Pos(range.to().line + 1, 0))
        };
      });
    },
    delLineLeft: function (cm) {
      deleteNearSelection(cm, function (range) {
        return { from: Pos(range.from().line, 0), to: range.from() };
      });
    },
    undo: function (cm) { cm.undo(); },
    redo: function (cm) { cm.redo(); },
    undoSelection: function (cm) { cm.undoSelection(); },
    redoSelection: function (cm) { cm.redoSelection(); },
    goDocStart: function (cm) { cm.extendSelection(Pos(cm.firstLine(), 0)); },
    goDocEnd: function (cm) { cm.extendSelection(Pos(cm.lastLine())); },
    goLineStart: function (cm) {
      cm.extendSelectionsBy(function (range) { return lineStart(cm, range.head.line); }, sel_move);
    },
    goLineStartSmart: function (cm) {
      cm.extendSelectionsBy(function (range) {
        var start = lineStart(cm, range.head.line);
        var line = cm.getLineHandle(start.line);
        var order = getOrder(line);
        if (!order || order[0].level == 0) {
          var firstNonWS = Math.max(0, line.text.search(/\S/));
          var inWS = range.head.line == start.line && range.head.ch <= firstNonWS && range.head.ch;
          return Pos(start.line, inWS ? 0 : firstNonWS);
        }
        return start;
      }, sel_move);
    },
    goLineEnd: function (cm) {
      cm.extendSelectionsBy(function (range) { return lineEnd(cm, range.head.line); }, sel_move);
    },
    goLineRight: function (cm) {
      cm.extendSelectionsBy(function (range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        return cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top: top }, "div");
      }, sel_move);
    },
    goLineLeft: function (cm) {
      cm.extendSelectionsBy(function (range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        return cm.coordsChar({ left: 0, top: top }, "div");
      }, sel_move);
    },
    goLineUp: function (cm) { cm.moveV(-1, "line"); },
    goLineDown: function (cm) { cm.moveV(1, "line"); },
    goPageUp: function (cm) { cm.moveV(-1, "page"); },
    goPageDown: function (cm) { cm.moveV(1, "page"); },
    goCharLeft: function (cm) { cm.moveH(-1, "char"); },
    goCharRight: function (cm) { cm.moveH(1, "char"); },
    goColumnLeft: function (cm) { cm.moveH(-1, "column"); },
    goColumnRight: function (cm) { cm.moveH(1, "column"); },
    goWordLeft: function (cm) { cm.moveH(-1, "word"); },
    goGroupRight: function (cm) { cm.moveH(1, "group"); },
    goGroupLeft: function (cm) { cm.moveH(-1, "group"); },
    goWordRight: function (cm) { cm.moveH(1, "word"); },
    delCharBefore: function (cm) { cm.deleteH(-1, "char"); },
    delCharAfter: function (cm) { cm.deleteH(1, "char"); },
    delWordBefore: function (cm) { cm.deleteH(-1, "word"); },
    delWordAfter: function (cm) { cm.deleteH(1, "word"); },
    delGroupBefore: function (cm) { cm.deleteH(-1, "group"); },
    delGroupAfter: function (cm) { cm.deleteH(1, "group"); },
    indentAuto: function (cm) { cm.indentSelection("smart"); },
    indentMore: function (cm) { cm.indentSelection("add"); },
    indentLess: function (cm) { cm.indentSelection("subtract"); },
    insertTab: function (cm) { cm.replaceSelection("\t"); },
    defaultTab: function (cm) {
      if (cm.somethingSelected()) cm.indentSelection("add");
      else cm.execCommand("insertTab");
    },
    transposeChars: function (cm) {
      runInOp(cm, function () {
        var ranges = cm.listSelections();
        for (var i = 0; i < ranges.length; i++) {
          var cur = ranges[i].head, line = getLine(cm.doc, cur.line).text;
          if (cur.ch > 0 && cur.ch < line.length - 1)
            cm.replaceRange(line.charAt(cur.ch) + line.charAt(cur.ch - 1),
              Pos(cur.line, cur.ch - 1), Pos(cur.line, cur.ch + 1));
        }
      });
    },
    newlineAndIndent: function (cm) {
      runInOp(cm, function () {
        var len = cm.listSelections().length;
        for (var i = 0; i < len; i++) {
          var range = cm.listSelections()[i];
          cm.replaceRange("\n", range.anchor, range.head, "+input");
          cm.indentLine(range.from().line + 1, null, true);
          ensureCursorVisible(cm);
        }
      });
    },
    toggleOverwrite: function (cm) { cm.toggleOverwrite(); }
  };

  // STANDARD KEYMAPS

  var keyMap = CodeMirror.keyMap = {};
  keyMap.basic = {
    "Left": "goCharLeft", "Right": "goCharRight", "Up": "goLineUp", "Down": "goLineDown",
    "End": "goLineEnd", "Home": "goLineStartSmart", "PageUp": "goPageUp", "PageDown": "goPageDown",
    "Delete": "delCharAfter", "Backspace": "delCharBefore", "Shift-Backspace": "delCharBefore",
    "Tab": "defaultTab", "Shift-Tab": "indentAuto",
    "Enter": "newlineAndIndent", "Insert": "toggleOverwrite",
    "Esc": "singleSelection"
  };
  // Note that the save and find-related commands aren't defined by
  // default. User code or addons can define them. Unknown commands
  // are simply ignored.
  keyMap.pcDefault = {
    "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo",
    "Ctrl-Home": "goDocStart", "Ctrl-Up": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Down": "goDocEnd",
    "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd",
    "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find",
    "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll",
    "Ctrl-[": "indentLess", "Ctrl-]": "indentMore",
    "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection",
    fallthrough: "basic"
  };
  keyMap.macDefault = {
    "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo",
    "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft",
    "Alt-Right": "goGroupRight", "Cmd-Left": "goLineStart", "Cmd-Right": "goLineEnd", "Alt-Backspace": "delGroupBefore",
    "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find",
    "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll",
    "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delLineLeft",
    "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection",
    fallthrough: ["basic", "emacsy"]
  };
  // Very basic readline/emacs-style bindings, which are standard on Mac.
  keyMap.emacsy = {
    "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown",
    "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd",
    "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore",
    "Alt-D": "delWordAfter", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars"
  };
  keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;

  // KEYMAP DISPATCH

  function getKeyMap(val) {
    if (typeof val == "string") return keyMap[val];
    else return val;
  }

  // Given an array of keymaps and a key name, call handle on any
  // bindings found, until that returns a truthy value, at which point
  // we consider the key handled. Implements things like binding a key
  // to false stopping further handling and keymap fallthrough.
  var lookupKey = CodeMirror.lookupKey = function (name, maps, handle) {
    function lookup(map) {
      map = getKeyMap(map);
      var found = map[name];
      if (found === false) return "stop";
      if (found != null && handle(found)) return true;
      if (map.nofallthrough) return "stop";

      var fallthrough = map.fallthrough;
      if (fallthrough == null) return false;
      if (Object.prototype.toString.call(fallthrough) != "[object Array]")
        return lookup(fallthrough);
      for (var i = 0; i < fallthrough.length; ++i) {
        var done = lookup(fallthrough[i]);
        if (done) return done;
      }
      return false;
    }

    for (var i = 0; i < maps.length; ++i) {
      var done = lookup(maps[i]);
      if (done) return done != "stop";
    }
  };

  // Modifier key presses don't count as 'real' key presses for the
  // purpose of keymap fallthrough.
  var isModifierKey = CodeMirror.isModifierKey = function (event) {
    var name = keyNames[event.keyCode];
    return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
  };

  // Look up the name of a key as indicated by an event object.
  var keyName = CodeMirror.keyName = function (event, noShift) {
    if (presto && event.keyCode == 34 && event["char"]) return false;
    var name = keyNames[event.keyCode];
    if (name == null || event.altGraphKey) return false;
    if (event.altKey) name = "Alt-" + name;
    if (flipCtrlCmd ? event.metaKey : event.ctrlKey) name = "Ctrl-" + name;
    if (flipCtrlCmd ? event.ctrlKey : event.metaKey) name = "Cmd-" + name;
    if (!noShift && event.shiftKey) name = "Shift-" + name;
    return name;
  };

  // FROMTEXTAREA

  CodeMirror.fromTextArea = function (textarea, options) {
    if (!options) options = {};
    options.value = textarea.value;
    if (!options.tabindex && textarea.tabindex)
      options.tabindex = textarea.tabindex;
    if (!options.placeholder && textarea.placeholder)
      options.placeholder = textarea.placeholder;
    // Set autofocus to true if this textarea is focused, or if it has
    // autofocus and no other element is focused.
    if (options.autofocus == null) {
      var hasFocus = activeElt();
      options.autofocus = hasFocus == textarea ||
        textarea.getAttribute("autofocus") != null && hasFocus == document.body;
    }

    function save() { textarea.value = cm.getValue(); }
    if (textarea.form) {
      on(textarea.form, "submit", save);
      // Deplorable hack to make the submit method do the right thing.
      if (!options.leaveSubmitMethodAlone) {
        var form = textarea.form, realSubmit = form.submit;
        try {
          var wrappedSubmit = form.submit = function () {
            save();
            form.submit = realSubmit;
            form.submit();
            form.submit = wrappedSubmit;
          };
        } catch (e) { }
      }
    }

    textarea.style.display = "none";
    var cm = CodeMirror(function (node) {
      textarea.parentNode.insertBefore(node, textarea.nextSibling);
    }, options);
    cm.save = save;
    cm.getTextArea = function () { return textarea; };
    cm.toTextArea = function () {
      save();
      textarea.parentNode.removeChild(cm.getWrapperElement());
      textarea.style.display = "";
      if (textarea.form) {
        off(textarea.form, "submit", save);
        if (typeof textarea.form.submit == "function")
          textarea.form.submit = realSubmit;
      }
    };
    return cm;
  };

  // STRING STREAM

  // Fed to the mode parsers, provides helper functions to make
  // parsers more succinct.

  var StringStream = CodeMirror.StringStream = function (string, tabSize) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
    this.lastColumnPos = this.lastColumnValue = 0;
    this.lineStart = 0;
  };
  setStringStream(StringStream);

  StringStream.prototype = {
    eol: function () { return this.pos >= this.string.length; },
    sol: function () { return this.pos == this.lineStart; },
    peek: function () { return this.string.charAt(this.pos) || undefined; },
    next: function () {
      if (this.pos < this.string.length)
        return this.string.charAt(this.pos++);
    },
    eat: function (match) {
      var ch = this.string.charAt(this.pos);
      if (typeof match == "string") var ok = ch == match;
      else var ok = ch && (match.test ? match.test(ch) : match(ch));
      if (ok) { ++this.pos; return ch; }
    },
    eatWhile: function (match) {
      var start = this.pos;
      while (this.eat(match)) { }
      return this.pos > start;
    },
    eatSpace: function () {
      var start = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;
      return this.pos > start;
    },
    skipToEnd: function () { this.pos = this.string.length; },
    skipTo: function (ch) {
      var found = this.string.indexOf(ch, this.pos);
      if (found > -1) { this.pos = found; return true; }
    },
    backUp: function (n) { this.pos -= n; },
    column: function () {
      if (this.lastColumnPos < this.start) {
        this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
        this.lastColumnPos = this.start;
      }
      return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    },
    indentation: function () {
      return countColumn(this.string, null, this.tabSize) -
        (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    },
    match: function (pattern, consume, caseInsensitive) {
      if (typeof pattern == "string") {
        var cased = function (str) { return caseInsensitive ? str.toLowerCase() : str; };
        var substr = this.string.substr(this.pos, pattern.length);
        if (cased(substr) == cased(pattern)) {
          if (consume !== false) this.pos += pattern.length;
          return true;
        }
      } else {
        var match = this.string.slice(this.pos).match(pattern);
        if (match && match.index > 0) return null;
        if (match && consume !== false) this.pos += match[0].length;
        return match;
      }
    },
    current: function () { return this.string.slice(this.start, this.pos); },
    hideFirstChars: function (n, inner) {
      this.lineStart += n;
      try { return inner(); }
      finally { this.lineStart -= n; }
    }
  };

  // TEXTMARKERS

  // Created with markText and setBookmark methods. A TextMarker is a
  // handle that can be used to clear or find a marked position in the
  // document. Line objects hold arrays (markedSpans) containing
  // {from, to, marker} object pointing to such marker objects, and
  // indicating that such a marker is present on that line. Multiple
  // lines may point to the same marker when it spans across lines.
  // The spans will have null for their from/to properties when the
  // marker continues beyond the start/end of the line. Markers have
  // links back to the lines they currently touch.

  var TextMarker = CodeMirror.TextMarker = function (doc, type) {
    this.lines = [];
    this.type = type;
    this.doc = doc;
  };
  eventMixin(TextMarker);

  // Clear the marker.
  TextMarker.prototype.clear = function () {
    if (this.explicitlyCleared) return;
    var cm = this.doc.cm, withOp = cm && !cm.curOp;
    if (withOp) startOperation(cm);
    if (hasHandler(this, "clear")) {
      var found = this.find();
      if (found) signalLater(this, "clear", found.from, found.to);
    }
    var min = null, max = null;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this);
      if (cm && !this.collapsed) regLineChange(cm, lineNo(line), "text");
      else if (cm) {
        if (span.to != null) max = lineNo(line);
        if (span.from != null) min = lineNo(line);
      }
      line.markedSpans = removeMarkedSpan(line.markedSpans, span);
      if (span.from == null && this.collapsed && !lineIsHidden(this.doc, line) && cm)
        updateLineHeight(line, textHeight(cm.display));
    }
    if (cm && this.collapsed && !cm.options.lineWrapping) for (var i = 0; i < this.lines.length; ++i) {
      var visual = visualLine(this.lines[i]), len = lineLength(visual);
      if (len > cm.display.maxLineLength) {
        cm.display.maxLine = visual;
        cm.display.maxLineLength = len;
        cm.display.maxLineChanged = true;
      }
    }

    if (min != null && cm && this.collapsed) regChange(cm, min, max + 1);
    this.lines.length = 0;
    this.explicitlyCleared = true;
    if (this.atomic && this.doc.cantEdit) {
      this.doc.cantEdit = false;
      if (cm) reCheckSelection(cm.doc);
    }
    if (cm) signalLater(cm, "markerCleared", cm, this);
    if (withOp) endOperation(cm);
  };

  // Find the position of the marker in the document. Returns a {from,
  // to} object by default. Side can be passed to get a specific side
  // -- 0 (both), -1 (left), or 1 (right). When lineObj is true, the
  // Pos objects returned contain a line object, rather than a line
  // number (used to prevent looking up the same line twice).
  TextMarker.prototype.find = function (side, lineObj) {
    if (side == null && this.type == "bookmark") side = 1;
    var from, to;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this);
      if (span.from != null) {
        from = Pos(lineObj ? line : lineNo(line), span.from);
        if (side == -1) return from;
      }
      if (span.to != null) {
        to = Pos(lineObj ? line : lineNo(line), span.to);
        if (side == 1) return to;
      }
    }
    return from && { from: from, to: to };
  };

  // Signals that the marker's widget changed, and surrounding layout
  // should be recomputed.
  TextMarker.prototype.changed = function () {
    var pos = this.find(-1, true), widget = this, cm = this.doc.cm;
    if (!pos || !cm) return;
    runInOp(cm, function () {
      var line = pos.line, lineN = lineNo(pos.line);
      var view = findViewForLine(cm, lineN);
      if (view) {
        clearLineMeasurementCacheFor(view);
        cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
      }
      cm.curOp.updateMaxLine = true;
      if (!lineIsHidden(widget.doc, line) && widget.height != null) {
        var oldHeight = widget.height;
        widget.height = null;
        var dHeight = widgetHeight(widget) - oldHeight;
        if (dHeight)
          updateLineHeight(line, line.height + dHeight);
      }
    });
  };

  TextMarker.prototype.attachLine = function (line) {
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;
      if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1)
        (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
    }
    this.lines.push(line);
  };
  TextMarker.prototype.detachLine = function (line) {
    this.lines.splice(indexOf(this.lines, line), 1);
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;
      (op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
    }
  };

  // Collapsed markers have unique ids, in order to be able to order
  // them, which is needed for uniquely determining an outer marker
  // when they overlap (they may nest, but not partially overlap).
  var nextMarkerId = 0;

  // Create a marker, wire it up to the right lines, and
  function markText(doc, from, to, options, type) {
    // Shared markers (across linked documents) are handled separately
    // (markTextShared will call out to this again, once per
    // document).
    if (options && options.shared) return markTextShared(doc, from, to, options, type);
    // Ensure we are in an operation.
    if (doc.cm && !doc.cm.curOp) return operation(doc.cm, markText)(doc, from, to, options, type);

    var marker = new TextMarker(doc, type), diff = cmp(from, to);
    if (options) copyObj(options, marker);
    // Don't connect empty markers unless clearWhenEmpty is false
    if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false)
      return marker;
    if (marker.replacedWith) {
      // Showing up as a widget implies collapsed (widget replaces text)
      marker.collapsed = true;
      marker.widgetNode = elt("span", [marker.replacedWith], "CodeMirror-widget");
      if (!options.handleMouseEvents) marker.widgetNode.ignoreEvents = true;
      if (options.insertLeft) marker.widgetNode.insertLeft = true;
    }
    if (marker.collapsed) {
      if (conflictingCollapsedRange(doc, from.line, from, to, marker) ||
        from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker))
        throw new Error("Inserting collapsed marker partially overlapping an existing one");
      sawCollapsedSpans = true;
    }

    if (marker.addToHistory)
      addChangeToHistory(doc, { from: from, to: to, origin: "markText" }, doc.sel, NaN);

    var curLine = from.line, cm = doc.cm, updateMaxLine;
    doc.iter(curLine, to.line + 1, function (line) {
      if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine)
        updateMaxLine = true;
      if (marker.collapsed && curLine != from.line) updateLineHeight(line, 0);
      addMarkedSpan(line, new MarkedSpan(marker,
        curLine == from.line ? from.ch : null,
        curLine == to.line ? to.ch : null));
      ++curLine;
    });
    // lineIsHidden depends on the presence of the spans, so needs a second pass
    if (marker.collapsed) doc.iter(from.line, to.line + 1, function (line) {
      if (lineIsHidden(doc, line)) updateLineHeight(line, 0);
    });

    if (marker.clearOnEnter) on(marker, "beforeCursorEnter", function () { marker.clear(); });

    if (marker.readOnly) {
      sawReadOnlySpans = true;
      if (doc.history.done.length || doc.history.undone.length)
        doc.clearHistory();
    }
    if (marker.collapsed) {
      marker.id = ++nextMarkerId;
      marker.atomic = true;
    }
    if (cm) {
      // Sync editor state
      if (updateMaxLine) cm.curOp.updateMaxLine = true;
      if (marker.collapsed)
        regChange(cm, from.line, to.line + 1);
      else if (marker.className || marker.title || marker.startStyle || marker.endStyle)
        for (var i = from.line; i <= to.line; i++) regLineChange(cm, i, "text");
      if (marker.atomic) reCheckSelection(cm.doc);
      signalLater(cm, "markerAdded", cm, marker);
    }
    return marker;
  }

  // SHARED TEXTMARKERS

  // A shared marker spans multiple linked documents. It is
  // implemented as a meta-marker-object controlling multiple normal
  // markers.
  var SharedTextMarker = CodeMirror.SharedTextMarker = function (markers, primary) {
    this.markers = markers;
    this.primary = primary;
    for (var i = 0, me = this; i < markers.length; ++i) {
      markers[i].parent = this;
      on(markers[i], "clear", function () { me.clear(); });
    }
  };
  eventMixin(SharedTextMarker);

  SharedTextMarker.prototype.clear = function () {
    if (this.explicitlyCleared) return;
    this.explicitlyCleared = true;
    for (var i = 0; i < this.markers.length; ++i)
      this.markers[i].clear();
    signalLater(this, "clear");
  };
  SharedTextMarker.prototype.find = function (side, lineObj) {
    return this.primary.find(side, lineObj);
  };

  function markTextShared(doc, from, to, options, type) {
    options = copyObj(options);
    options.shared = false;
    var markers = [markText(doc, from, to, options, type)], primary = markers[0];
    var widget = options.widgetNode;
    linkedDocs(doc, function (doc) {
      if (widget) options.widgetNode = widget.cloneNode(true);
      markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
      for (var i = 0; i < doc.linked.length; ++i)
        if (doc.linked[i].isParent) return;
      primary = lst(markers);
    });
    return new SharedTextMarker(markers, primary);
  }

  // TEXTMARKER SPANS

  function MarkedSpan(marker, from, to) {
    this.marker = marker;
    this.from = from; this.to = to;
  }

  // Search an array of spans for a span matching the given marker.
  function getMarkedSpanFor(spans, marker) {
    if (spans) for (var i = 0; i < spans.length; ++i) {
      var span = spans[i];
      if (span.marker == marker) return span;
    }
  }
  // Remove a span from an array, returning undefined if no spans are
  // left (we don't store arrays for lines without spans).
  function removeMarkedSpan(spans, span) {
    for (var r, i = 0; i < spans.length; ++i)
      if (spans[i] != span) (r || (r = [])).push(spans[i]);
    return r;
  }
  // Add a span to a line.
  function addMarkedSpan(line, span) {
    line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
    span.marker.attachLine(line);
  }

  // Used for the algorithm that adjusts markers for a change in the
  // document. These functions cut an array of spans at a given
  // character position, returning an array of remaining chunks (or
  // undefined if nothing remains).
  function markedSpansBefore(old, startCh, isInsert) {
    if (old) for (var i = 0, nw; i < old.length; ++i) {
      var span = old[i], marker = span.marker;
      var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
      if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
        var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);
        (nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
      }
    }
    return nw;
  }
  function markedSpansAfter(old, endCh, isInsert) {
    if (old) for (var i = 0, nw; i < old.length; ++i) {
      var span = old[i], marker = span.marker;
      var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
      if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
        var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);
        (nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh,
          span.to == null ? null : span.to - endCh));
      }
    }
    return nw;
  }

  // Given a change object, compute the new set of marker spans that
  // cover the line in which the change took place. Removes spans
  // entirely within the change, reconnects spans belonging to the
  // same marker that appear on both sides of the change, and cuts off
  // spans partially within the change. Returns an array of span
  // arrays with one element for each line in (after) the change.
  function stretchSpansOverChange(doc, change) {
    var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
    var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
    if (!oldFirst && !oldLast) return null;

    var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
    // Get the spans that 'stick out' on both sides
    var first = markedSpansBefore(oldFirst, startCh, isInsert);
    var last = markedSpansAfter(oldLast, endCh, isInsert);

    // Next, merge those two ends
    var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
    if (first) {
      // Fix up .to properties of first
      for (var i = 0; i < first.length; ++i) {
        var span = first[i];
        if (span.to == null) {
          var found = getMarkedSpanFor(last, span.marker);
          if (!found) span.to = startCh;
          else if (sameLine) span.to = found.to == null ? null : found.to + offset;
        }
      }
    }
    if (last) {
      // Fix up .from in last (or move them into first in case of sameLine)
      for (var i = 0; i < last.length; ++i) {
        var span = last[i];
        if (span.to != null) span.to += offset;
        if (span.from == null) {
          var found = getMarkedSpanFor(first, span.marker);
          if (!found) {
            span.from = offset;
            if (sameLine) (first || (first = [])).push(span);
          }
        } else {
          span.from += offset;
          if (sameLine) (first || (first = [])).push(span);
        }
      }
    }
    // Make sure we didn't create any zero-length spans
    if (first) first = clearEmptySpans(first);
    if (last && last != first) last = clearEmptySpans(last);

    var newMarkers = [first];
    if (!sameLine) {
      // Fill gap with whole-line-spans
      var gap = change.text.length - 2, gapMarkers;
      if (gap > 0 && first)
        for (var i = 0; i < first.length; ++i)
          if (first[i].to == null)
            (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i].marker, null, null));
      for (var i = 0; i < gap; ++i)
        newMarkers.push(gapMarkers);
      newMarkers.push(last);
    }
    return newMarkers;
  }

  // Remove spans that are empty and don't have a clearWhenEmpty
  // option of false.
  function clearEmptySpans(spans) {
    for (var i = 0; i < spans.length; ++i) {
      var span = spans[i];
      if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false)
        spans.splice(i--, 1);
    }
    if (!spans.length) return null;
    return spans;
  }

  // Used for un/re-doing changes from the history. Combines the
  // result of computing the existing spans with the set of spans that
  // existed in the history (so that deleting around a span and then
  // undoing brings back the span).
  function mergeOldSpans(doc, change) {
    var old = getOldSpans(doc, change);
    var stretched = stretchSpansOverChange(doc, change);
    if (!old) return stretched;
    if (!stretched) return old;

    for (var i = 0; i < old.length; ++i) {
      var oldCur = old[i], stretchCur = stretched[i];
      if (oldCur && stretchCur) {
        spans: for (var j = 0; j < stretchCur.length; ++j) {
          var span = stretchCur[j];
          for (var k = 0; k < oldCur.length; ++k)
            if (oldCur[k].marker == span.marker) continue spans;
          oldCur.push(span);
        }
      } else if (stretchCur) {
        old[i] = stretchCur;
      }
    }
    return old;
  }

  // Used to 'clip' out readOnly ranges when making a change.
  function removeReadOnlyRanges(doc, from, to) {
    var markers = null;
    doc.iter(from.line, to.line + 1, function (line) {
      if (line.markedSpans) for (var i = 0; i < line.markedSpans.length; ++i) {
        var mark = line.markedSpans[i].marker;
        if (mark.readOnly && (!markers || indexOf(markers, mark) == -1))
          (markers || (markers = [])).push(mark);
      }
    });
    if (!markers) return null;
    var parts = [{ from: from, to: to }];
    for (var i = 0; i < markers.length; ++i) {
      var mk = markers[i], m = mk.find(0);
      for (var j = 0; j < parts.length; ++j) {
        var p = parts[j];
        if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) continue;
        var newParts = [j, 1], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
        if (dfrom < 0 || !mk.inclusiveLeft && !dfrom)
          newParts.push({ from: p.from, to: m.from });
        if (dto > 0 || !mk.inclusiveRight && !dto)
          newParts.push({ from: m.to, to: p.to });
        parts.splice.apply(parts, newParts);
        j += newParts.length - 1;
      }
    }
    return parts;
  }

  // Connect or disconnect spans from a line.
  function detachMarkedSpans(line) {
    var spans = line.markedSpans;
    if (!spans) return;
    for (var i = 0; i < spans.length; ++i)
      spans[i].marker.detachLine(line);
    line.markedSpans = null;
  }
  function attachMarkedSpans(line, spans) {
    if (!spans) return;
    for (var i = 0; i < spans.length; ++i)
      spans[i].marker.attachLine(line);
    line.markedSpans = spans;
  }

  // Helpers used when computing which overlapping collapsed span
  // counts as the larger one.
  function extraLeft(marker) { return marker.inclusiveLeft ? -1 : 0; }
  function extraRight(marker) { return marker.inclusiveRight ? 1 : 0; }

  // Returns a number indicating which of two overlapping collapsed
  // spans is larger (and thus includes the other). Falls back to
  // comparing ids when the spans cover exactly the same range.
  function compareCollapsedMarkers(a, b) {
    var lenDiff = a.lines.length - b.lines.length;
    if (lenDiff != 0) return lenDiff;
    var aPos = a.find(), bPos = b.find();
    var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
    if (fromCmp) return -fromCmp;
    var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
    if (toCmp) return toCmp;
    return b.id - a.id;
  }

  // Find out whether a line ends or starts in a collapsed span. If
  // so, return the marker for that span.
  function collapsedSpanAtSide(line, start) {
    var sps = sawCollapsedSpans && line.markedSpans, found;
    if (sps) for (var sp, i = 0; i < sps.length; ++i) {
      sp = sps[i];
      if (sp.marker.collapsed && (start ? sp.from : sp.to) == null &&
        (!found || compareCollapsedMarkers(found, sp.marker) < 0))
        found = sp.marker;
    }
    return found;
  }
  function collapsedSpanAtStart(line) { return collapsedSpanAtSide(line, true); }
  function collapsedSpanAtEnd(line) { return collapsedSpanAtSide(line, false); }

  // Test whether there exists a collapsed span that partially
  // overlaps (covers the start or end, but not both) of a new span.
  // Such overlap is not allowed.
  function conflictingCollapsedRange(doc, lineNo, from, to, marker) {
    var line = getLine(doc, lineNo);
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) for (var i = 0; i < sps.length; ++i) {
      var sp = sps[i];
      if (!sp.marker.collapsed) continue;
      var found = sp.marker.find(0);
      var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
      var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
      if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) continue;
      if (fromCmp <= 0 && (cmp(found.to, from) || extraRight(sp.marker) - extraLeft(marker)) > 0 ||
        fromCmp >= 0 && (cmp(found.from, to) || extraLeft(sp.marker) - extraRight(marker)) < 0)
        return true;
    }
  }

  // A visual line is a line as drawn on the screen. Folding, for
  // example, can cause multiple logical lines to appear on the same
  // visual line. This finds the start of the visual line that the
  // given line is part of (usually that is the line itself).
  function visualLine(line) {
    var merged;
    while (merged = collapsedSpanAtStart(line))
      line = merged.find(-1, true).line;
    return line;
  }

  // Returns an array of logical lines that continue the visual line
  // started by the argument, or undefined if there are no such lines.
  function visualLineContinued(line) {
    var merged, lines;
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
      (lines || (lines = [])).push(line);
    }
    return lines;
  }

  // Get the line number of the start of the visual line that the
  // given line number is part of.
  function visualLineNo(doc, lineN) {
    var line = getLine(doc, lineN), vis = visualLine(line);
    if (line == vis) return lineN;
    return lineNo(vis);
  }
  // Get the line number of the start of the next visual line after
  // the given line.
  function visualLineEndNo(doc, lineN) {
    if (lineN > doc.lastLine()) return lineN;
    var line = getLine(doc, lineN), merged;
    if (!lineIsHidden(doc, line)) return lineN;
    while (merged = collapsedSpanAtEnd(line))
      line = merged.find(1, true).line;
    return lineNo(line) + 1;
  }

  // Compute whether a line is hidden. Lines count as hidden when they
  // are part of a visual line that starts with another line, or when
  // they are entirely covered by collapsed, non-widget span.
  function lineIsHidden(doc, line) {
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) for (var sp, i = 0; i < sps.length; ++i) {
      sp = sps[i];
      if (!sp.marker.collapsed) continue;
      if (sp.from == null) return true;
      if (sp.marker.widgetNode) continue;
      if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp))
        return true;
    }
  }
  function lineIsHiddenInner(doc, line, span) {
    if (span.to == null) {
      var end = span.marker.find(1, true);
      return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
    }
    if (span.marker.inclusiveRight && span.to == line.text.length)
      return true;
    for (var sp, i = 0; i < line.markedSpans.length; ++i) {
      sp = line.markedSpans[i];
      if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to &&
        (sp.to == null || sp.to != span.from) &&
        (sp.marker.inclusiveLeft || span.marker.inclusiveRight) &&
        lineIsHiddenInner(doc, line, sp)) return true;
    }
  }

  // LINE WIDGETS

  // Line widgets are block elements displayed above or below a line.

  var LineWidget = CodeMirror.LineWidget = function (cm, node, options) {
    if (options) for (var opt in options) if (options.hasOwnProperty(opt))
      this[opt] = options[opt];
    this.cm = cm;
    this.node = node;
  };
  eventMixin(LineWidget);

  function adjustScrollWhenAboveVisible(cm, line, diff) {
    if (heightAtLine(line) < ((cm.curOp && cm.curOp.scrollTop) || cm.doc.scrollTop))
      addToScrollPos(cm, null, diff);
  }

  LineWidget.prototype.clear = function () {
    var cm = this.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
    if (no == null || !ws) return;
    for (var i = 0; i < ws.length; ++i) if (ws[i] == this) ws.splice(i--, 1);
    if (!ws.length) line.widgets = null;
    var height = widgetHeight(this);
    runInOp(cm, function () {
      adjustScrollWhenAboveVisible(cm, line, -height);
      regLineChange(cm, no, "widget");
      updateLineHeight(line, Math.max(0, line.height - height));
    });
  };
  LineWidget.prototype.changed = function () {
    var oldH = this.height, cm = this.cm, line = this.line;
    this.height = null;
    var diff = widgetHeight(this) - oldH;
    if (!diff) return;
    runInOp(cm, function () {
      cm.curOp.forceUpdate = true;
      adjustScrollWhenAboveVisible(cm, line, diff);
      updateLineHeight(line, line.height + diff);
    });
  };

  function widgetHeight(widget) {
    if (widget.height != null) return widget.height;
    if (!contains(document.body, widget.node))
      removeChildrenAndAdd(widget.cm.display.measure, elt("div", [widget.node], null, "position: relative"));
    return widget.height = widget.node.offsetHeight;
  }

  function addLineWidget(cm, handle, node, options) {
    var widget = new LineWidget(cm, node, options);
    if (widget.noHScroll) cm.display.alignWidgets = true;
    changeLine(cm, handle, "widget", function (line) {
      var widgets = line.widgets || (line.widgets = []);
      if (widget.insertAt == null) widgets.push(widget);
      else widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget);
      widget.line = line;
      if (!lineIsHidden(cm.doc, line)) {
        var aboveVisible = heightAtLine(line) < cm.doc.scrollTop;
        updateLineHeight(line, line.height + widgetHeight(widget));
        if (aboveVisible) addToScrollPos(cm, null, widget.height);
        cm.curOp.forceUpdate = true;
      }
      return true;
    });
    return widget;
  }

  // LINE DATA STRUCTURE

  // Line objects. These hold state related to a line, including
  // highlighting info (the styles array).
  var Line = CodeMirror.Line = function (text, markedSpans, estimateHeight) {
    this.text = text;
    attachMarkedSpans(this, markedSpans);
    this.height = estimateHeight ? estimateHeight(this) : 1;
  };
  eventMixin(Line);
  Line.prototype.lineNo = function () { return lineNo(this); };

  // Change the content (text, markers) of a line. Automatically
  // invalidates cached information and tries to re-estimate the
  // line's height.
  function updateLine(line, text, markedSpans, estimateHeight) {
    line.text = text;
    if (line.stateAfter) line.stateAfter = null;
    if (line.styles) line.styles = null;
    if (line.order != null) line.order = null;
    detachMarkedSpans(line);
    attachMarkedSpans(line, markedSpans);
    var estHeight = estimateHeight ? estimateHeight(line) : 1;
    if (estHeight != line.height) updateLineHeight(line, estHeight);
  }

  // Detach a line from the document tree and its markers.
  function cleanUpLine(line) {
    line.parent = null;
    detachMarkedSpans(line);
  }

  // Run the given mode's parser over a line, calling f for each token.
  function runMode(cm, text, mode, state, f, forceToEnd) {
    var flattenSpans = mode.flattenSpans;
    if (flattenSpans == null) flattenSpans = cm.options.flattenSpans;
    var curStart = 0, curStyle = null;
    var stream = new StringStream(text, cm.options.tabSize), style;
    if (text == "" && mode.blankLine) mode.blankLine(state);
    while (!stream.eol()) {
      if (stream.pos > cm.options.maxHighlightLength) {
        flattenSpans = false;
        if (forceToEnd) processLine(cm, text, state, stream.pos);
        stream.pos = text.length;
        style = null;
      } else {
        style = mode.token(stream, state);
      }
      if (cm.options.addModeClass) {
        var mName = CodeMirror.innerMode(mode, state).mode.name;
        if (mName) style = "m-" + (style ? mName + " " + style : mName);
      }
      if (!flattenSpans || curStyle != style) {
        if (curStart < stream.start) f(stream.start, curStyle);
        curStart = stream.start; curStyle = style;
      }
      stream.start = stream.pos;
    }
    while (curStart < stream.pos) {
      // Webkit seems to refuse to render text nodes longer than 57444 characters
      var pos = Math.min(stream.pos, curStart + 50000);
      f(pos, curStyle);
      curStart = pos;
    }
  }

  // Compute a style array (an array starting with a mode generation
  // -- for invalidation -- followed by pairs of end positions and
  // style strings), which is used to highlight the tokens on the
  // line.
  function highlightLine(cm, line, state, forceToEnd) {
    // A styles array always starts with a number identifying the
    // mode/overlays that it is based on (for easy invalidation).
    var st = [cm.state.modeGen];
    // Compute the base array of styles
    runMode(cm, line.text, cm.doc.mode, state, function (end, style) {
      st.push(end, style);
    }, forceToEnd);

    // Run overlays, adjust style array.
    for (var o = 0; o < cm.state.overlays.length; ++o) {
      var overlay = cm.state.overlays[o], i = 1, at = 0;
      runMode(cm, line.text, overlay.mode, true, function (end, style) {
        var start = i;
        // Ensure there's a token end at the current position, and that i points at it
        while (at < end) {
          var i_end = st[i];
          if (i_end > end)
            st.splice(i, 1, end, st[i + 1], i_end);
          i += 2;
          at = Math.min(end, i_end);
        }
        if (!style) return;
        if (overlay.opaque) {
          st.splice(start, i - start, end, style);
          i = start + 2;
        } else {
          for (; start < i; start += 2) {
            var cur = st[start + 1];
            st[start + 1] = cur ? cur + " " + style : style;
          }
        }
      });
    }

    return st;
  }

  function getLineStyles(cm, line) {
    if (!line.styles || line.styles[0] != cm.state.modeGen)
      line.styles = highlightLine(cm, line, line.stateAfter = getStateBefore(cm, lineNo(line)));
    return line.styles;
  }

  // Lightweight form of highlight -- proceed over this line and
  // update state, but don't save a style array. Used for lines that
  // aren't currently visible.
  function processLine(cm, text, state, startAt) {
    var mode = cm.doc.mode;
    var stream = new StringStream(text, cm.options.tabSize);
    stream.start = stream.pos = startAt || 0;
    if (text == "" && mode.blankLine) mode.blankLine(state);
    while (!stream.eol() && stream.pos <= cm.options.maxHighlightLength) {
      mode.token(stream, state);
      stream.start = stream.pos;
    }
  }

  // Convert a style as returned by a mode (either null, or a string
  // containing one or more styles) to a CSS style. This is cached,
  // and also looks for line-wide styles.
  var styleToClassCache = {}, styleToClassCacheWithMode = {};
  function interpretTokenStyle(style, builder) {
    if (!style) return null;
    for (; ;) {
      var lineClass = style.match(/(?:^|\s+)line-(background-)?(\S+)/);
      if (!lineClass) break;
      style = style.slice(0, lineClass.index) + style.slice(lineClass.index + lineClass[0].length);
      var prop = lineClass[1] ? "bgClass" : "textClass";
      if (builder[prop] == null)
        builder[prop] = lineClass[2];
      else if (!(new RegExp("(?:^|\s)" + lineClass[2] + "(?:$|\s)")).test(builder[prop]))
        builder[prop] += " " + lineClass[2];
    }
    if (/^\s*$/.test(style)) return null;
    var cache = builder.cm.options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
    return cache[style] ||
      (cache[style] = style.replace(/\S+/g, "cm-$&"));
  }

  // Render the DOM representation of the text of a line. Also builds
  // up a 'line map', which points at the DOM nodes that represent
  // specific stretches of text, and is used by the measuring code.
  // The returned object contains the DOM node, this map, and
  // information about line-wide styles that were set by the mode.
  function buildLineContent(cm, lineView) {
    // The padding-right forces the element to have a 'border', which
    // is needed on Webkit to be able to get line-level bounding
    // rectangles for it (in measureChar).
    var content = elt("span", null, null, webkit ? "padding-right: .1px" : null);
    var builder = { pre: elt("pre", [content]), content: content, col: 0, pos: 0, cm: cm };
    lineView.measure = {};

    // Iterate over the logical lines that make up this visual line.
    for (var i = 0; i <= (lineView.rest ? lineView.rest.length : 0); i++) {
      var line = i ? lineView.rest[i - 1] : lineView.line, order;
      builder.pos = 0;
      builder.addToken = buildToken;
      // Optionally wire in some hacks into the token-rendering
      // algorithm, to deal with browser quirks.
      if ((ie || webkit) && cm.getOption("lineWrapping"))
        builder.addToken = buildTokenSplitSpaces(builder.addToken);
      if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line)))
        builder.addToken = buildTokenBadBidi(builder.addToken, order);
      builder.map = [];
      insertLineContent(line, builder, getLineStyles(cm, line));

      // Ensure at least a single node is present, for measuring.
      if (builder.map.length == 0)
        builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));

      // Store the map and a cache object for the current logical line
      if (i == 0) {
        lineView.measure.map = builder.map;
        lineView.measure.cache = {};
      } else {
        (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);
        (lineView.measure.caches || (lineView.measure.caches = [])).push({});
      }
    }

    signal(cm, "renderLine", cm, lineView.line, builder.pre);
    return builder;
  }

  function defaultSpecialCharPlaceholder(ch) {
    var token = elt("span", "\u2022", "cm-invalidchar");
    token.title = "\\u" + ch.charCodeAt(0).toString(16);
    return token;
  }

  // Build up the DOM representation for a single token, and add it to
  // the line map. Takes care to render special characters separately.
  function buildToken(builder, text, style, startStyle, endStyle, title) {
    if (!text) return;
    var special = builder.cm.options.specialChars, mustWrap = false;
    if (!special.test(text)) {
      builder.col += text.length;
      var content = document.createTextNode(text);
      builder.map.push(builder.pos, builder.pos + text.length, content);
      if (ie_upto8) mustWrap = true;
      builder.pos += text.length;
    } else {
      var content = document.createDocumentFragment(), pos = 0;
      while (true) {
        special.lastIndex = pos;
        var m = special.exec(text);
        var skipped = m ? m.index - pos : text.length - pos;
        if (skipped) {
          var txt = document.createTextNode(text.slice(pos, pos + skipped));
          if (ie_upto8) content.appendChild(elt("span", [txt]));
          else content.appendChild(txt);
          builder.map.push(builder.pos, builder.pos + skipped, txt);
          builder.col += skipped;
          builder.pos += skipped;
        }
        if (!m) break;
        pos += skipped + 1;
        if (m[0] == "\t") {
          var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
          var txt = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
          builder.col += tabWidth;
        } else {
          var txt = builder.cm.options.specialCharPlaceholder(m[0]);
          if (ie_upto8) content.appendChild(elt("span", [txt]));
          else content.appendChild(txt);
          builder.col += 1;
        }
        builder.map.push(builder.pos, builder.pos + 1, txt);
        builder.pos++;
      }
    }
    if (style || startStyle || endStyle || mustWrap) {
      var fullStyle = style || "";
      if (startStyle) fullStyle += startStyle;
      if (endStyle) fullStyle += endStyle;
      var token = elt("span", [content], fullStyle);
      if (title) token.title = title;
      return builder.content.appendChild(token);
    }
    builder.content.appendChild(content);
  }

  function buildTokenSplitSpaces(inner) {
    function split(old) {
      var out = " ";
      for (var i = 0; i < old.length - 2; ++i) out += i % 2 ? " " : "\u00a0";
      out += " ";
      return out;
    }
    return function (builder, text, style, startStyle, endStyle, title) {
      inner(builder, text.replace(/ {3,}/g, split), style, startStyle, endStyle, title);
    };
  }

  // Work around nonsense dimensions being reported for stretches of
  // right-to-left text.
  function buildTokenBadBidi(inner, order) {
    return function (builder, text, style, startStyle, endStyle, title) {
      style = style ? style + " cm-force-border" : "cm-force-border";
      var start = builder.pos, end = start + text.length;
      for (; ;) {
        // Find the part that overlaps with the start of this text
        for (var i = 0; i < order.length; i++) {
          var part = order[i];
          if (part.to > start && part.from <= start) break;
        }
        if (part.to >= end) return inner(builder, text, style, startStyle, endStyle, title);
        inner(builder, text.slice(0, part.to - start), style, startStyle, null, title);
        startStyle = null;
        text = text.slice(part.to - start);
        start = part.to;
      }
    };
  }

  function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
    var widget = !ignoreWidget && marker.widgetNode;
    if (widget) {
      builder.map.push(builder.pos, builder.pos + size, widget);
      builder.content.appendChild(widget);
    }
    builder.pos += size;
  }

  // Outputs a number of spans to make up a line, taking highlighting
  // and marked text into account.
  function insertLineContent(line, builder, styles) {
    var spans = line.markedSpans, allText = line.text, at = 0;
    if (!spans) {
      for (var i = 1; i < styles.length; i += 2)
        builder.addToken(builder, allText.slice(at, at = styles[i]), interpretTokenStyle(styles[i + 1], builder));
      return;
    }

    var len = allText.length, pos = 0, i = 1, text = "", style;
    var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, title, collapsed;
    for (; ;) {
      if (nextChange == pos) { // Update current marker set
        spanStyle = spanEndStyle = spanStartStyle = title = "";
        collapsed = null; nextChange = Infinity;
        var foundBookmarks = [];
        for (var j = 0; j < spans.length; ++j) {
          var sp = spans[j], m = sp.marker;
          if (sp.from <= pos && (sp.to == null || sp.to > pos)) {
            if (sp.to != null && nextChange > sp.to) { nextChange = sp.to; spanEndStyle = ""; }
            if (m.className) spanStyle += " " + m.className;
            if (m.startStyle && sp.from == pos) spanStartStyle += " " + m.startStyle;
            if (m.endStyle && sp.to == nextChange) spanEndStyle += " " + m.endStyle;
            if (m.title && !title) title = m.title;
            if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0))
              collapsed = sp;
          } else if (sp.from > pos && nextChange > sp.from) {
            nextChange = sp.from;
          }
          if (m.type == "bookmark" && sp.from == pos && m.widgetNode) foundBookmarks.push(m);
        }
        if (collapsed && (collapsed.from || 0) == pos) {
          buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos,
            collapsed.marker, collapsed.from == null);
          if (collapsed.to == null) return;
        }
        if (!collapsed && foundBookmarks.length) for (var j = 0; j < foundBookmarks.length; ++j)
          buildCollapsedSpan(builder, 0, foundBookmarks[j]);
      }
      if (pos >= len) break;

      var upto = Math.min(len, nextChange);
      while (true) {
        if (text) {
          var end = pos + text.length;
          if (!collapsed) {
            var tokenText = end > upto ? text.slice(0, upto - pos) : text;
            builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle,
              spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", title);
          }
          if (end >= upto) { text = text.slice(upto - pos); pos = upto; break; }
          pos = end;
          spanStartStyle = "";
        }
        text = allText.slice(at, at = styles[i++]);
        style = interpretTokenStyle(styles[i++], builder);
      }
    }
  }

  // DOCUMENT DATA STRUCTURE

  // By default, updates that start and end at the beginning of a line
  // are treated specially, in order to make the association of line
  // widgets and marker elements with the text behave more intuitive.
  function isWholeLineUpdate(doc, change) {
    return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" &&
      (!doc.cm || doc.cm.options.wholeLineUpdateBefore);
  }

  // Perform a change on the document data structure.
  function updateDoc(doc, change, markedSpans, estimateHeight) {
    function spansFor(n) { return markedSpans ? markedSpans[n] : null; }
    function update(line, text, spans) {
      updateLine(line, text, spans, estimateHeight);
      signalLater(line, "change", line, change);
    }

    var from = change.from, to = change.to, text = change.text;
    var firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line);
    var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;

    // Adjust the line structure
    if (isWholeLineUpdate(doc, change)) {
      // This is a whole-line replace. Treated specially to make
      // sure line objects move the way they are supposed to.
      for (var i = 0, added = []; i < text.length - 1; ++i)
        added.push(new Line(text[i], spansFor(i), estimateHeight));
      update(lastLine, lastLine.text, lastSpans);
      if (nlines) doc.remove(from.line, nlines);
      if (added.length) doc.insert(from.line, added);
    } else if (firstLine == lastLine) {
      if (text.length == 1) {
        update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
      } else {
        for (var added = [], i = 1; i < text.length - 1; ++i)
          added.push(new Line(text[i], spansFor(i), estimateHeight));
        added.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight));
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
        doc.insert(from.line + 1, added);
      }
    } else if (text.length == 1) {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
      doc.remove(from.line + 1, nlines);
    } else {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
      update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
      for (var i = 1, added = []; i < text.length - 1; ++i)
        added.push(new Line(text[i], spansFor(i), estimateHeight));
      if (nlines > 1) doc.remove(from.line + 1, nlines - 1);
      doc.insert(from.line + 1, added);
    }

    signalLater(doc, "change", doc, change);
  }

  // The document is represented as a BTree consisting of leaves, with
  // chunk of lines in them, and branches, with up to ten leaves or
  // other branch nodes below them. The top node is always a branch
  // node, and is the document object itself (meaning it has
  // additional methods and properties).
  //
  // All nodes have parent links. The tree is used both to go from
  // line numbers to line objects, and to go from objects to numbers.
  // It also indexes by height, and is used to convert between height
  // and line object, and to find the total height of the document.
  //
  // See also http://marijnhaverbeke.nl/blog/codemirror-line-tree.html

  function LeafChunk(lines) {
    this.lines = lines;
    this.parent = null;
    for (var i = 0, height = 0; i < lines.length; ++i) {
      lines[i].parent = this;
      height += lines[i].height;
    }
    this.height = height;
  }

  LeafChunk.prototype = {
    chunkSize: function () { return this.lines.length; },
    // Remove the n lines at offset 'at'.
    removeInner: function (at, n) {
      for (var i = at, e = at + n; i < e; ++i) {
        var line = this.lines[i];
        this.height -= line.height;
        cleanUpLine(line);
        signalLater(line, "delete");
      }
      this.lines.splice(at, n);
    },
    // Helper used to collapse a small branch into a single leaf.
    collapse: function (lines) {
      lines.push.apply(lines, this.lines);
    },
    // Insert the given array of lines at offset 'at', count them as
    // having the given height.
    insertInner: function (at, lines, height) {
      this.height += height;
      this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
      for (var i = 0; i < lines.length; ++i) lines[i].parent = this;
    },
    // Used to iterate over a part of the tree.
    iterN: function (at, n, op) {
      for (var e = at + n; at < e; ++at)
        if (op(this.lines[at])) return true;
    }
  };

  function BranchChunk(children) {
    this.children = children;
    var size = 0, height = 0;
    for (var i = 0; i < children.length; ++i) {
      var ch = children[i];
      size += ch.chunkSize(); height += ch.height;
      ch.parent = this;
    }
    this.size = size;
    this.height = height;
    this.parent = null;
  }

  BranchChunk.prototype = {
    chunkSize: function () { return this.size; },
    removeInner: function (at, n) {
      this.size -= n;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at < sz) {
          var rm = Math.min(n, sz - at), oldHeight = child.height;
          child.removeInner(at, rm);
          this.height -= oldHeight - child.height;
          if (sz == rm) { this.children.splice(i--, 1); child.parent = null; }
          if ((n -= rm) == 0) break;
          at = 0;
        } else at -= sz;
      }
      // If the result is smaller than 25 lines, ensure that it is a
      // single leaf node.
      if (this.size - n < 25 &&
        (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
        var lines = [];
        this.collapse(lines);
        this.children = [new LeafChunk(lines)];
        this.children[0].parent = this;
      }
    },
    collapse: function (lines) {
      for (var i = 0; i < this.children.length; ++i) this.children[i].collapse(lines);
    },
    insertInner: function (at, lines, height) {
      this.size += lines.length;
      this.height += height;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at <= sz) {
          child.insertInner(at, lines, height);
          if (child.lines && child.lines.length > 50) {
            while (child.lines.length > 50) {
              var spilled = child.lines.splice(child.lines.length - 25, 25);
              var newleaf = new LeafChunk(spilled);
              child.height -= newleaf.height;
              this.children.splice(i + 1, 0, newleaf);
              newleaf.parent = this;
            }
            this.maybeSpill();
          }
          break;
        }
        at -= sz;
      }
    },
    // When a node has grown, check whether it should be split.
    maybeSpill: function () {
      if (this.children.length <= 10) return;
      var me = this;
      do {
        var spilled = me.children.splice(me.children.length - 5, 5);
        var sibling = new BranchChunk(spilled);
        if (!me.parent) { // Become the parent node
          var copy = new BranchChunk(me.children);
          copy.parent = me;
          me.children = [copy, sibling];
          me = copy;
        } else {
          me.size -= sibling.size;
          me.height -= sibling.height;
          var myIndex = indexOf(me.parent.children, me);
          me.parent.children.splice(myIndex + 1, 0, sibling);
        }
        sibling.parent = me.parent;
      } while (me.children.length > 10);
      me.parent.maybeSpill();
    },
    iterN: function (at, n, op) {
      for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at < sz) {
          var used = Math.min(n, sz - at);
          if (child.iterN(at, used, op)) return true;
          if ((n -= used) == 0) break;
          at = 0;
        } else at -= sz;
      }
    }
  };

  var nextDocId = 0;
  var Doc = CodeMirror.Doc = function (text, mode, firstLine) {
    if (!(this instanceof Doc)) return new Doc(text, mode, firstLine);
    if (firstLine == null) firstLine = 0;

    BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
    this.first = firstLine;
    this.scrollTop = this.scrollLeft = 0;
    this.cantEdit = false;
    this.cleanGeneration = 1;
    this.frontier = firstLine;
    var start = Pos(firstLine, 0);
    this.sel = simpleSelection(start);
    this.history = new History(null);
    this.id = ++nextDocId;
    this.modeOption = mode;

    if (typeof text == "string") text = splitLines(text);
    updateDoc(this, { from: start, to: start, text: text });
    setSelection(this, simpleSelection(start), sel_dontScroll);
  };

  Doc.prototype = createObj(BranchChunk.prototype, {
    constructor: Doc,
    // Iterate over the document. Supports two forms -- with only one
    // argument, it calls that for each line in the document. With
    // three, it iterates over the range given by the first two (with
    // the second being non-inclusive).
    iter: function (from, to, op) {
      if (op) this.iterN(from - this.first, to - from, op);
      else this.iterN(this.first, this.first + this.size, from);
    },

    // Non-public interface for adding and removing lines.
    insert: function (at, lines) {
      var height = 0;
      for (var i = 0; i < lines.length; ++i) height += lines[i].height;
      this.insertInner(at - this.first, lines, height);
    },
    remove: function (at, n) { this.removeInner(at - this.first, n); },

    // From here, the methods are part of the public interface. Most
    // are also available from CodeMirror (editor) instances.

    getValue: function (lineSep) {
      var lines = getLines(this, this.first, this.first + this.size);
      if (lineSep === false) return lines;
      return lines.join(lineSep || "\n");
    },
    setValue: docMethodOp(function (code) {
      var top = Pos(this.first, 0), last = this.first + this.size - 1;
      makeChange(this, {
        from: top, to: Pos(last, getLine(this, last).text.length),
        text: splitLines(code), origin: "setValue"
      }, true);
      setSelection(this, simpleSelection(top));
    }),
    replaceRange: function (code, from, to, origin) {
      from = clipPos(this, from);
      to = to ? clipPos(this, to) : from;
      replaceRange(this, code, from, to, origin);
    },
    getRange: function (from, to, lineSep) {
      var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
      if (lineSep === false) return lines;
      return lines.join(lineSep || "\n");
    },

    getLine: function (line) { var l = this.getLineHandle(line); return l && l.text; },

    getLineHandle: function (line) { if (isLine(this, line)) return getLine(this, line); },
    getLineNumber: function (line) { return lineNo(line); },

    getLineHandleVisualStart: function (line) {
      if (typeof line == "number") line = getLine(this, line);
      return visualLine(line);
    },

    lineCount: function () { return this.size; },
    firstLine: function () { return this.first; },
    lastLine: function () { return this.first + this.size - 1; },

    clipPos: function (pos) { return clipPos(this, pos); },

    getCursor: function (start) {
      var range = this.sel.primary(), pos;
      if (start == null || start == "head") pos = range.head;
      else if (start == "anchor") pos = range.anchor;
      else if (start == "end" || start == "to" || start === false) pos = range.to();
      else pos = range.from();
      return pos;
    },
    listSelections: function () { return this.sel.ranges; },
    somethingSelected: function () { return this.sel.somethingSelected(); },

    setCursor: docMethodOp(function (line, ch, options) {
      setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
    }),
    setSelection: docMethodOp(function (anchor, head, options) {
      setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
    }),
    extendSelection: docMethodOp(function (head, other, options) {
      extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
    }),
    extendSelections: docMethodOp(function (heads, options) {
      extendSelections(this, clipPosArray(this, heads, options));
    }),
    extendSelectionsBy: docMethodOp(function (f, options) {
      extendSelections(this, map(this.sel.ranges, f), options);
    }),
    setSelections: docMethodOp(function (ranges, primary, options) {
      if (!ranges.length) return;
      for (var i = 0, out = []; i < ranges.length; i++)
        out[i] = new Range(clipPos(this, ranges[i].anchor),
          clipPos(this, ranges[i].head));
      if (primary == null) primary = Math.min(ranges.length - 1, this.sel.primIndex);
      setSelection(this, normalizeSelection(out, primary), options);
    }),
    addSelection: docMethodOp(function (anchor, head, options) {
      var ranges = this.sel.ranges.slice(0);
      ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
      setSelection(this, normalizeSelection(ranges, ranges.length - 1), options);
    }),

    getSelection: function (lineSep) {
      var ranges = this.sel.ranges, lines;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this, ranges[i].from(), ranges[i].to());
        lines = lines ? lines.concat(sel) : sel;
      }
      if (lineSep === false) return lines;
      else return lines.join(lineSep || "\n");
    },
    getSelections: function (lineSep) {
      var parts = [], ranges = this.sel.ranges;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this, ranges[i].from(), ranges[i].to());
        if (lineSep !== false) sel = sel.join(lineSep || "\n");
        parts[i] = sel;
      }
      return parts;
    },
    replaceSelection: docMethodOp(function (code, collapse, origin) {
      var dup = [];
      for (var i = 0; i < this.sel.ranges.length; i++)
        dup[i] = code;
      this.replaceSelections(dup, collapse, origin || "+input");
    }),
    replaceSelections: function (code, collapse, origin) {
      var changes = [], sel = this.sel;
      for (var i = 0; i < sel.ranges.length; i++) {
        var range = sel.ranges[i];
        changes[i] = { from: range.from(), to: range.to(), text: splitLines(code[i]), origin: origin };
      }
      var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
      for (var i = changes.length - 1; i >= 0; i--)
        makeChange(this, changes[i]);
      if (newSel) setSelectionReplaceHistory(this, newSel);
      else if (this.cm) ensureCursorVisible(this.cm);
    },
    undo: docMethodOp(function () { makeChangeFromHistory(this, "undo"); }),
    redo: docMethodOp(function () { makeChangeFromHistory(this, "redo"); }),
    undoSelection: docMethodOp(function () { makeChangeFromHistory(this, "undo", true); }),
    redoSelection: docMethodOp(function () { makeChangeFromHistory(this, "redo", true); }),

    setExtending: function (val) { this.extend = val; },
    getExtending: function () { return this.extend; },

    historySize: function () {
      var hist = this.history, done = 0, undone = 0;
      for (var i = 0; i < hist.done.length; i++) if (!hist.done[i].ranges)++done;
      for (var i = 0; i < hist.undone.length; i++) if (!hist.undone[i].ranges)++undone;
      return { undo: done, redo: undone };
    },
    clearHistory: function () { this.history = new History(this.history.maxGeneration); },

    markClean: function () {
      this.cleanGeneration = this.changeGeneration(true);
    },
    changeGeneration: function (forceSplit) {
      if (forceSplit)
        this.history.lastOp = this.history.lastOrigin = null;
      return this.history.generation;
    },
    isClean: function (gen) {
      return this.history.generation == (gen || this.cleanGeneration);
    },

    getHistory: function () {
      return {
        done: copyHistoryArray(this.history.done),
        undone: copyHistoryArray(this.history.undone)
      };
    },
    setHistory: function (histData) {
      var hist = this.history = new History(this.history.maxGeneration);
      hist.done = copyHistoryArray(histData.done.slice(0), null, true);
      hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
    },

    markText: function (from, to, options) {
      return markText(this, clipPos(this, from), clipPos(this, to), options, "range");
    },
    setBookmark: function (pos, options) {
      var realOpts = {
        replacedWith: options && (options.nodeType == null ? options.widget : options),
        insertLeft: options && options.insertLeft,
        clearWhenEmpty: false, shared: options && options.shared
      };
      pos = clipPos(this, pos);
      return markText(this, pos, pos, realOpts, "bookmark");
    },
    findMarksAt: function (pos) {
      pos = clipPos(this, pos);
      var markers = [], spans = getLine(this, pos.line).markedSpans;
      if (spans) for (var i = 0; i < spans.length; ++i) {
        var span = spans[i];
        if ((span.from == null || span.from <= pos.ch) &&
          (span.to == null || span.to >= pos.ch))
          markers.push(span.marker.parent || span.marker);
      }
      return markers;
    },
    findMarks: function (from, to) {
      from = clipPos(this, from); to = clipPos(this, to);
      var found = [], lineNo = from.line;
      this.iter(from.line, to.line + 1, function (line) {
        var spans = line.markedSpans;
        if (spans) for (var i = 0; i < spans.length; i++) {
          var span = spans[i];
          if (!(lineNo == from.line && from.ch > span.to ||
            span.from == null && lineNo != from.line ||
            lineNo == to.line && span.from > to.ch))
            found.push(span.marker.parent || span.marker);
        }
        ++lineNo;
      });
      return found;
    },
    getAllMarks: function () {
      var markers = [];
      this.iter(function (line) {
        var sps = line.markedSpans;
        if (sps) for (var i = 0; i < sps.length; ++i)
          if (sps[i].from != null) markers.push(sps[i].marker);
      });
      return markers;
    },

    posFromIndex: function (off) {
      var ch, lineNo = this.first;
      this.iter(function (line) {
        var sz = line.text.length + 1;
        if (sz > off) { ch = off; return true; }
        off -= sz;
        ++lineNo;
      });
      return clipPos(this, Pos(lineNo, ch));
    },
    indexFromPos: function (coords) {
      coords = clipPos(this, coords);
      var index = coords.ch;
      if (coords.line < this.first || coords.ch < 0) return 0;
      this.iter(this.first, coords.line, function (line) {
        index += line.text.length + 1;
      });
      return index;
    },

    copy: function (copyHistory) {
      var doc = new Doc(getLines(this, this.first, this.first + this.size), this.modeOption, this.first);
      doc.scrollTop = this.scrollTop; doc.scrollLeft = this.scrollLeft;
      doc.sel = this.sel;
      doc.extend = false;
      if (copyHistory) {
        doc.history.undoDepth = this.history.undoDepth;
        doc.setHistory(this.getHistory());
      }
      return doc;
    },

    linkedDoc: function (options) {
      if (!options) options = {};
      var from = this.first, to = this.first + this.size;
      if (options.from != null && options.from > from) from = options.from;
      if (options.to != null && options.to < to) to = options.to;
      var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from);
      if (options.sharedHist) copy.history = this.history;
      (this.linked || (this.linked = [])).push({ doc: copy, sharedHist: options.sharedHist });
      copy.linked = [{ doc: this, isParent: true, sharedHist: options.sharedHist }];
      return copy;
    },
    unlinkDoc: function (other) {
      if (other instanceof CodeMirror) other = other.doc;
      if (this.linked) for (var i = 0; i < this.linked.length; ++i) {
        var link = this.linked[i];
        if (link.doc != other) continue;
        this.linked.splice(i, 1);
        other.unlinkDoc(this);
        break;
      }
      // If the histories were shared, split them again
      if (other.history == this.history) {
        var splitIds = [other.id];
        linkedDocs(other, function (doc) { splitIds.push(doc.id); }, true);
        other.history = new History(null);
        other.history.done = copyHistoryArray(this.history.done, splitIds);
        other.history.undone = copyHistoryArray(this.history.undone, splitIds);
      }
    },
    iterLinkedDocs: function (f) { linkedDocs(this, f); },

    getMode: function () { return this.mode; },
    getEditor: function () { return this.cm; }
  });

  // Public alias.
  Doc.prototype.eachLine = Doc.prototype.iter;

  // Set up methods on CodeMirror's prototype to redirect to the editor's document.
  var dontDelegate = "iter insert remove copy getEditor".split(" ");
  for (var prop in Doc.prototype) if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0)
    CodeMirror.prototype[prop] = (function (method) {
      return function () { return method.apply(this.doc, arguments); };
    })(Doc.prototype[prop]);

  eventMixin(Doc);

  // Call f for all linked documents.
  function linkedDocs(doc, f, sharedHistOnly) {
    function propagate(doc, skip, sharedHist) {
      if (doc.linked) for (var i = 0; i < doc.linked.length; ++i) {
        var rel = doc.linked[i];
        if (rel.doc == skip) continue;
        var shared = sharedHist && rel.sharedHist;
        if (sharedHistOnly && !shared) continue;
        f(rel.doc, shared);
        propagate(rel.doc, doc, shared);
      }
    }
    propagate(doc, null, true);
  }

  // Attach a document to an editor.
  function attachDoc(cm, doc) {
    if (doc.cm) throw new Error("This document is already in use.");
    cm.doc = doc;
    doc.cm = cm;
    estimateLineHeights(cm);
    loadMode(cm);
    if (!cm.options.lineWrapping) findMaxLine(cm);
    cm.options.mode = doc.modeOption;
    regChange(cm);
  }

  // LINE UTILITIES

  // Find the line object corresponding to the given line number.
  function getLine(doc, n) {
    n -= doc.first;
    if (n < 0 || n >= doc.size) throw new Error("There is no line " + (n + doc.first) + " in the document.");
    for (var chunk = doc; !chunk.lines;) {
      for (var i = 0; ; ++i) {
        var child = chunk.children[i], sz = child.chunkSize();
        if (n < sz) { chunk = child; break; }
        n -= sz;
      }
    }
    return chunk.lines[n];
  }

  // Get the part of a document between two positions, as an array of
  // strings.
  function getBetween(doc, start, end) {
    var out = [], n = start.line;
    doc.iter(start.line, end.line + 1, function (line) {
      var text = line.text;
      if (n == end.line) text = text.slice(0, end.ch);
      if (n == start.line) text = text.slice(start.ch);
      out.push(text);
      ++n;
    });
    return out;
  }
  // Get the lines between from and to, as array of strings.
  function getLines(doc, from, to) {
    var out = [];
    doc.iter(from, to, function (line) { out.push(line.text); });
    return out;
  }

  // Update the height of a line, propagating the height change
  // upwards to parent nodes.
  function updateLineHeight(line, height) {
    var diff = height - line.height;
    if (diff) for (var n = line; n; n = n.parent) n.height += diff;
  }

  // Given a line object, find its line number by walking up through
  // its parent links.
  function lineNo(line) {
    if (line.parent == null) return null;
    var cur = line.parent, no = indexOf(cur.lines, line);
    for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
      for (var i = 0; ; ++i) {
        if (chunk.children[i] == cur) break;
        no += chunk.children[i].chunkSize();
      }
    }
    return no + cur.first;
  }

  // Find the line at the given vertical position, using the height
  // information in the document tree.
  function lineAtHeight(chunk, h) {
    var n = chunk.first;
    outer: do {
      for (var i = 0; i < chunk.children.length; ++i) {
        var child = chunk.children[i], ch = child.height;
        if (h < ch) { chunk = child; continue outer; }
        h -= ch;
        n += child.chunkSize();
      }
      return n;
    } while (!chunk.lines);
    for (var i = 0; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i], lh = line.height;
      if (h < lh) break;
      h -= lh;
    }
    return n + i;
  }


  // Find the height above the given line.
  function heightAtLine(lineObj) {
    lineObj = visualLine(lineObj);

    var h = 0, chunk = lineObj.parent;
    for (var i = 0; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i];
      if (line == lineObj) break;
      else h += line.height;
    }
    for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
      for (var i = 0; i < p.children.length; ++i) {
        var cur = p.children[i];
        if (cur == chunk) break;
        else h += cur.height;
      }
    }
    return h;
  }

  // Get the bidi ordering for the given line (and cache it). Returns
  // false for lines that are fully left-to-right, and an array of
  // BidiSpan objects otherwise.
  function getOrder(line) {
    var order = line.order;
    if (order == null) order = line.order = bidiOrdering(line.text);
    return order;
  }

  // HISTORY

  function History(startGen) {
    // Arrays of change events and selections. Doing something adds an
    // event to done and clears undo. Undoing moves events from done
    // to undone, redoing moves them in the other direction.
    this.done = []; this.undone = [];
    this.undoDepth = Infinity;
    // Used to track when changes can be merged into a single undo
    // event
    this.lastModTime = this.lastSelTime = 0;
    this.lastOp = null;
    this.lastOrigin = this.lastSelOrigin = null;
    // Used by the isClean() method
    this.generation = this.maxGeneration = startGen || 1;
  }

  // Create a history change event from an updateDoc-style change
  // object.
  function historyChangeFromChange(doc, change) {
    var histChange = { from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc, change.from, change.to) };
    attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
    linkedDocs(doc, function (doc) { attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1); }, true);
    return histChange;
  }

  // Pop all selection events off the end of a history array. Stop at
  // a change event.
  function clearSelectionEvents(array) {
    while (array.length) {
      var last = lst(array);
      if (last.ranges) array.pop();
      else break;
    }
  }

  // Find the top change event in the history. Pop off selection
  // events that are in the way.
  function lastChangeEvent(hist, force) {
    if (force) {
      clearSelectionEvents(hist.done);
      return lst(hist.done);
    } else if (hist.done.length && !lst(hist.done).ranges) {
      return lst(hist.done);
    } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
      hist.done.pop();
      return lst(hist.done);
    }
  }

  // Register a change in the history. Merges changes that are within
  // a single operation, ore are close together with an origin that
  // allows merging (starting with "+") into a single event.
  function addChangeToHistory(doc, change, selAfter, opId) {
    var hist = doc.history;
    hist.undone.length = 0;
    var time = +new Date, cur;

    if ((hist.lastOp == opId ||
      hist.lastOrigin == change.origin && change.origin &&
      ((change.origin.charAt(0) == "+" && doc.cm && hist.lastModTime > time - doc.cm.options.historyEventDelay) ||
        change.origin.charAt(0) == "*")) &&
      (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
      // Merge this change into the last event
      var last = lst(cur.changes);
      if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
        // Optimized case for simple insertion -- don't want to add
        // new changesets for every character typed
        last.to = changeEnd(change);
      } else {
        // Add new sub-event
        cur.changes.push(historyChangeFromChange(doc, change));
      }
    } else {
      // Can not be merged, start a new event.
      var before = lst(hist.done);
      if (!before || !before.ranges)
        pushSelectionToHistory(doc.sel, hist.done);
      cur = {
        changes: [historyChangeFromChange(doc, change)],
        generation: hist.generation
      };
      hist.done.push(cur);
      while (hist.done.length > hist.undoDepth) {
        hist.done.shift();
        if (!hist.done[0].ranges) hist.done.shift();
      }
    }
    hist.done.push(selAfter);
    hist.generation = ++hist.maxGeneration;
    hist.lastModTime = hist.lastSelTime = time;
    hist.lastOp = opId;
    hist.lastOrigin = hist.lastSelOrigin = change.origin;

    if (!last) signal(doc, "historyAdded");
  }

  function selectionEventCanBeMerged(doc, origin, prev, sel) {
    var ch = origin.charAt(0);
    return ch == "*" ||
      ch == "+" &&
      prev.ranges.length == sel.ranges.length &&
      prev.somethingSelected() == sel.somethingSelected() &&
      new Date - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500);
  }

  // Called whenever the selection changes, sets the new selection as
  // the pending selection in the history, and pushes the old pending
  // selection into the 'done' array when it was significantly
  // different (in number of selected ranges, emptiness, or time).
  function addSelectionToHistory(doc, sel, opId, options) {
    var hist = doc.history, origin = options && options.origin;

    // A new event is started when the previous origin does not match
    // the current, or the origins don't allow matching. Origins
    // starting with * are always merged, those starting with + are
    // merged when similar and close together in time.
    if (opId == hist.lastOp ||
      (origin && hist.lastSelOrigin == origin &&
        (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin ||
          selectionEventCanBeMerged(doc, origin, lst(hist.done), sel))))
      hist.done[hist.done.length - 1] = sel;
    else
      pushSelectionToHistory(sel, hist.done);

    hist.lastSelTime = +new Date;
    hist.lastSelOrigin = origin;
    hist.lastOp = opId;
    if (options && options.clearRedo !== false)
      clearSelectionEvents(hist.undone);
  }

  function pushSelectionToHistory(sel, dest) {
    var top = lst(dest);
    if (!(top && top.ranges && top.equals(sel)))
      dest.push(sel);
  }

  // Used to store marked span information in the history.
  function attachLocalSpans(doc, change, from, to) {
    var existing = change["spans_" + doc.id], n = 0;
    doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function (line) {
      if (line.markedSpans)
        (existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans;
      ++n;
    });
  }

  // When un/re-doing restores text containing marked spans, those
  // that have been explicitly cleared should not be restored.
  function removeClearedSpans(spans) {
    if (!spans) return null;
    for (var i = 0, out; i < spans.length; ++i) {
      if (spans[i].marker.explicitlyCleared) { if (!out) out = spans.slice(0, i); }
      else if (out) out.push(spans[i]);
    }
    return !out ? spans : out.length ? out : null;
  }

  // Retrieve and filter the old marked spans stored in a change event.
  function getOldSpans(doc, change) {
    var found = change["spans_" + doc.id];
    if (!found) return null;
    for (var i = 0, nw = []; i < change.text.length; ++i)
      nw.push(removeClearedSpans(found[i]));
    return nw;
  }

  // Used both to provide a JSON-safe object in .getHistory, and, when
  // detaching a document, to split the history in two
  function copyHistoryArray(events, newGroup, instantiateSel) {
    for (var i = 0, copy = []; i < events.length; ++i) {
      var event = events[i];
      if (event.ranges) {
        copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
        continue;
      }
      var changes = event.changes, newChanges = [];
      copy.push({ changes: newChanges });
      for (var j = 0; j < changes.length; ++j) {
        var change = changes[j], m;
        newChanges.push({ from: change.from, to: change.to, text: change.text });
        if (newGroup) for (var prop in change) if (m = prop.match(/^spans_(\d+)$/)) {
          if (indexOf(newGroup, Number(m[1])) > -1) {
            lst(newChanges)[prop] = change[prop];
            delete change[prop];
          }
        }
      }
    }
    return copy;
  }

  // Rebasing/resetting history to deal with externally-sourced changes

  function rebaseHistSelSingle(pos, from, to, diff) {
    if (to < pos.line) {
      pos.line += diff;
    } else if (from < pos.line) {
      pos.line = from;
      pos.ch = 0;
    }
  }

  // Tries to rebase an array of history events given a change in the
  // document. If the change touches the same lines as the event, the
  // event, and everything 'behind' it, is discarded. If the change is
  // before the event, the event's positions are updated. Uses a
  // copy-on-write scheme for the positions, to avoid having to
  // reallocate them all on every rebase, but also avoid problems with
  // shared position objects being unsafely updated.
  function rebaseHistArray(array, from, to, diff) {
    for (var i = 0; i < array.length; ++i) {
      var sub = array[i], ok = true;
      if (sub.ranges) {
        if (!sub.copied) { sub = array[i] = sub.deepCopy(); sub.copied = true; }
        for (var j = 0; j < sub.ranges.length; j++) {
          rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
          rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
        }
        continue;
      }
      for (var j = 0; j < sub.changes.length; ++j) {
        var cur = sub.changes[j];
        if (to < cur.from.line) {
          cur.from = Pos(cur.from.line + diff, cur.from.ch);
          cur.to = Pos(cur.to.line + diff, cur.to.ch);
        } else if (from <= cur.to.line) {
          ok = false;
          break;
        }
      }
      if (!ok) {
        array.splice(0, i + 1);
        i = 0;
      }
    }
  }

  function rebaseHist(hist, change) {
    var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
    rebaseHistArray(hist.done, from, to, diff);
    rebaseHistArray(hist.undone, from, to, diff);
  }

  // EVENT UTILITIES

  // Due to the fact that we still support jurassic IE versions, some
  // compatibility wrappers are needed.

  var e_preventDefault = CodeMirror.e_preventDefault = function (e) {
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
  };
  var e_stopPropagation = CodeMirror.e_stopPropagation = function (e) {
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  };
  function e_defaultPrevented(e) {
    return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
  }
  var e_stop = CodeMirror.e_stop = function (e) { e_preventDefault(e); e_stopPropagation(e); };

  function e_target(e) { return e.target || e.srcElement; }
  function e_button(e) {
    var b = e.which;
    if (b == null) {
      if (e.button & 1) b = 1;
      else if (e.button & 2) b = 3;
      else if (e.button & 4) b = 2;
    }
    if (mac && e.ctrlKey && b == 1) b = 3;
    return b;
  }

  // EVENT HANDLING

  // Lightweight event framework. on/off also work on DOM nodes,
  // registering native DOM handlers.

  var on = CodeMirror.on = function (emitter, type, f) {
    if (emitter.addEventListener)
      emitter.addEventListener(type, f, false);
    else if (emitter.attachEvent)
      emitter.attachEvent("on" + type, f);
    else {
      var map = emitter._handlers || (emitter._handlers = {});
      var arr = map[type] || (map[type] = []);
      arr.push(f);
    }
  };

  var off = CodeMirror.off = function (emitter, type, f) {
    if (emitter.removeEventListener)
      emitter.removeEventListener(type, f, false);
    else if (emitter.detachEvent)
      emitter.detachEvent("on" + type, f);
    else {
      var arr = emitter._handlers && emitter._handlers[type];
      if (!arr) return;
      for (var i = 0; i < arr.length; ++i)
        if (arr[i] == f) { arr.splice(i, 1); break; }
    }
  };

  var signal = CodeMirror.signal = function (emitter, type /*, values...*/) {
    var arr = emitter._handlers && emitter._handlers[type];
    if (!arr) return;
    var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < arr.length; ++i) arr[i].apply(null, args);
  };

  // Often, we want to signal events at a point where we are in the
  // middle of some work, but don't want the handler to start calling
  // other methods on the editor, which might be in an inconsistent
  // state or simply not expect any other events to happen.
  // signalLater looks whether there are any handlers, and schedules
  // them to be executed when the last operation ends, or, if no
  // operation is active, when a timeout fires.
  var delayedCallbacks, delayedCallbackDepth = 0;
  function signalLater(emitter, type /*, values...*/) {
    var arr = emitter._handlers && emitter._handlers[type];
    if (!arr) return;
    var args = Array.prototype.slice.call(arguments, 2);
    if (!delayedCallbacks) {
      ++delayedCallbackDepth;
      delayedCallbacks = [];
      setTimeout(fireDelayed, 0);
    }
    function bnd(f) { return function () { f.apply(null, args); }; };
    for (var i = 0; i < arr.length; ++i)
      delayedCallbacks.push(bnd(arr[i]));
  }

  function fireDelayed() {
    --delayedCallbackDepth;
    var delayed = delayedCallbacks;
    delayedCallbacks = null;
    for (var i = 0; i < delayed.length; ++i) delayed[i]();
  }

  // The DOM events that CodeMirror handles can be overridden by
  // registering a (non-DOM) handler on the editor for the event name,
  // and preventDefault-ing the event in that handler.
  function signalDOMEvent(cm, e, override) {
    signal(cm, override || e.type, cm, e);
    return e_defaultPrevented(e) || e.codemirrorIgnore;
  }

  function hasHandler(emitter, type) {
    var arr = emitter._handlers && emitter._handlers[type];
    return arr && arr.length > 0;
  }

  // Add on and off methods to a constructor's prototype, to make
  // registering events on such objects more convenient.
  function eventMixin(ctor) {
    ctor.prototype.on = function (type, f) { on(this, type, f); };
    ctor.prototype.off = function (type, f) { off(this, type, f); };
  }

  // MISC UTILITIES

  // Number of pixels added to scroller and sizer to hide scrollbar
  var scrollerCutOff = 30;

  // Returned or thrown by various protocols to signal 'I'm not
  // handling this'.
  var Pass = CodeMirror.Pass = { toString: function () { return "CodeMirror.Pass"; } };

  // Reused option objects for setSelection & friends
  var sel_dontScroll = { scroll: false }, sel_mouse = { origin: "*mouse" }, sel_move = { origin: "+move" };

  function Delayed() { this.id = null; }
  Delayed.prototype.set = function (ms, f) {
    clearTimeout(this.id);
    this.id = setTimeout(f, ms);
  };

  // Counts the column offset in a string, taking tabs into account.
  // Used mostly to find indentation.
  var countColumn = CodeMirror.countColumn = function (string, end, tabSize, startIndex, startValue) {
    if (end == null) {
      end = string.search(/[^\s\u00a0]/);
      if (end == -1) end = string.length;
    }
    for (var i = startIndex || 0, n = startValue || 0; ;) {
      var nextTab = string.indexOf("\t", i);
      if (nextTab < 0 || nextTab >= end)
        return n + (end - i);
      n += nextTab - i;
      n += tabSize - (n % tabSize);
      i = nextTab + 1;
    }
  };

  // The inverse of countColumn -- find the offset that corresponds to
  // a particular column.
  function findColumn(string, goal, tabSize) {
    for (var pos = 0, col = 0; ;) {
      var nextTab = string.indexOf("\t", pos);
      if (nextTab == -1) nextTab = string.length;
      var skipped = nextTab - pos;
      if (nextTab == string.length || col + skipped >= goal)
        return pos + Math.min(skipped, goal - col);
      col += nextTab - pos;
      col += tabSize - (col % tabSize);
      pos = nextTab + 1;
      if (col >= goal) return pos;
    }
  }

  var spaceStrs = [""];
  function spaceStr(n) {
    while (spaceStrs.length <= n)
      spaceStrs.push(lst(spaceStrs) + " ");
    return spaceStrs[n];
  }

  function lst(arr) { return arr[arr.length - 1]; }

  var selectInput = function (node) { node.select(); };
  if (ios) // Mobile Safari apparently has a bug where select() is broken.
    selectInput = function (node) { node.selectionStart = 0; node.selectionEnd = node.value.length; };
  else if (ie) // Suppress mysterious IE10 errors
    selectInput = function (node) { try { node.select(); } catch (_e) { } };

  function indexOf(array, elt) {
    for (var i = 0; i < array.length; ++i)
      if (array[i] == elt) return i;
    return -1;
  }
  if ([].indexOf) indexOf = function (array, elt) { return array.indexOf(elt); };
  function map(array, f) {
    var out = [];
    for (var i = 0; i < array.length; i++) out[i] = f(array[i], i);
    return out;
  }
  if ([].map) map = function (array, f) { return array.map(f); };

  function createObj(base, props) {
    var inst;
    if (Object.create) {
      inst = Object.create(base);
    } else {
      var ctor = function () { };
      ctor.prototype = base;
      inst = new ctor();
    }
    if (props) copyObj(props, inst);
    return inst;
  };

  function copyObj(obj, target) {
    if (!target) target = {};
    for (var prop in obj) if (obj.hasOwnProperty(prop)) target[prop] = obj[prop];
    return target;
  }

  function bind(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () { return f.apply(null, args); };
  }

  var nonASCIISingleCaseWordChar = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  var isWordChar = CodeMirror.isWordChar = function (ch) {
    return /\w/.test(ch) || ch > "\x80" &&
      (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
  };

  function isEmpty(obj) {
    for (var n in obj) if (obj.hasOwnProperty(n) && obj[n]) return false;
    return true;
  }

  // Extending unicode characters. A series of a non-extending char +
  // any number of extending chars is treated as a single unit as far
  // as editing and measuring is concerned. This is not fully correct,
  // since some scripts/fonts/browsers also treat other configurations
  // of code points as a group.
  var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
  function isExtendingChar(ch) { return ch.charCodeAt(0) >= 768 && extendingChars.test(ch); }

  // DOM UTILITIES
  var colorCache = {};

  function styleFromHexCode(hexCode) {
    function parseColor(input) {
      input = input.trim();
      if (input.length < 4) {
        return null
      } else if (input.length < 7) {
        // in three-character format, each value is multiplied by 0x11 to give an
        // even scale from 0x00 to 0xff
        return [
          parseInt(input.charAt(1), 16) * 0x11,
          parseInt(input.charAt(2), 16) * 0x11,
          parseInt(input.charAt(3), 16) * 0x11
        ];
      } else {
        return [
          parseInt(input.substr(1, 2), 16),
          parseInt(input.substr(3, 2), 16),
          parseInt(input.substr(5, 2), 16)
        ];
      }
    }

    // https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
    function luminanace(rgb) {
      var r = rgb[0], g = rgb[1], b = rgb[2];
      var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }
    var BG_LUMINANACE = luminanace(parseColor('#0F192A'));
    function contrast(rgb) {
      return (luminanace(rgb) + 0.05) / (BG_LUMINANACE + 0.05);
    }

    // https://gist.github.com/mjackson/5311256
    function rgbToHsl(rgb) {
      var r = rgb[0], g = rgb[1], b = rgb[2];
      r /= 255, g /= 255, b /= 255;

      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
      }

      return [h, s, l];
    }
    function hslToRgb(hsl) {
      var h = hsl[0], s = hsl[1], l = hsl[2];
      var r, g, b;

      if (s == 0) {
        r = g = b = l; // achromatic
      } else {
        function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      return [r * 255, g * 255, b * 255];
    }

    var colorString = hexCode;
    var style;
    if (colorCache[colorString]) {
      // no need to parse it again, for performance
      style = colorCache[colorString];
    } else {
      var col = parseColor(colorString)
      if (col) {
        // use contrast ratio (to the background) instead of brightness only
        var r = contrast(col);
        if (r < 2.361) {
          // worse than #555
          var hsl = rgbToHsl(col);

          do {
            // increase lightness a little bit until reach the contrast required
            hsl[2] += 0.01;
            r = contrast(hslToRgb(hsl));
          } while (r < 2.361);

          // template strings don't work for IE
          style = 'color: hsl(' + ~~(hsl[0] * 360) + ',' + ~~(hsl[1] * 100) + '%,' + ~~(hsl[2] * 100) + '%)';
        } else {
          style = 'color:' + colorString;
        }
      }
      colorCache[colorString] = style;
    }

    return style;
  }

  function elt(tag, content, className, style) {
    var e = document.createElement(tag);
    if (className) {
      if (className.indexOf("cm-MULTICOLOR") === 0) {
        className = "cm-COLOR"
        style = styleFromHexCode(content[0].textContent);
      } else if (className.indexOf("cm-COLOR-#") !== -1) {
        var color = className.match(/cm-COLOR-(#[0-9a-fA-F]+)/)[1];
        style = styleFromHexCode(color);
      }

      e.className = className;
    }
    if (style) e.style.cssText = style;
    if (typeof content == "string") e.appendChild(document.createTextNode(content));
    else if (content) for (var i = 0; i < content.length; ++i) e.appendChild(content[i]);
    return e;
  }

  var range;
  if (document.createRange) range = function (node, start, end) {
    var r = document.createRange();
    r.setEnd(node, end);
    r.setStart(node, start);
    return r;
  };
  else range = function (node, start, end) {
    var r = document.body.createTextRange();
    r.moveToElementText(node.parentNode);
    r.collapse(true);
    r.moveEnd("character", end);
    r.moveStart("character", start);
    return r;
  };

  function removeChildren(e) {
    for (var count = e.childNodes.length; count > 0; --count)
      e.removeChild(e.firstChild);
    return e;
  }

  function removeChildrenAndAdd(parent, e) {
    return removeChildren(parent).appendChild(e);
  }

  function contains(parent, child) {
    if (parent.contains)
      return parent.contains(child);
    while (child = child.parentNode)
      if (child == parent) return true;
  }

  function activeElt() { return document.activeElement; }
  // Older versions of IE throws unspecified error when touching
  // document.activeElement in some cases (during loading, in iframe)
  if (ie_upto10) activeElt = function () {
    try { return document.activeElement; }
    catch (e) { return document.body; }
  };

  // FEATURE DETECTION

  // Detect drag-and-drop
  var dragAndDrop = function () {
    // There is *some* kind of drag-and-drop support in IE6-8, but I
    // couldn't get it to work yet.
    if (ie_upto8) return false;
    var div = elt('div');
    return "draggable" in div || "dragDrop" in div;
  }();

  var knownScrollbarWidth;
  function scrollbarWidth(measure) {
    if (knownScrollbarWidth != null) return knownScrollbarWidth;
    var test = elt("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
    removeChildrenAndAdd(measure, test);
    if (test.offsetWidth)
      knownScrollbarWidth = test.offsetHeight - test.clientHeight;
    return knownScrollbarWidth || 0;
  }

  var zwspSupported;
  function zeroWidthElement(measure) {
    if (zwspSupported == null) {
      var test = elt("span", "\u200b");
      removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
      if (measure.firstChild.offsetHeight != 0)
        zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !ie_upto7;
    }
    if (zwspSupported) return elt("span", "\u200b");
    else return elt("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
  }

  // Feature-detect IE's crummy client rect reporting for bidi text
  var badBidiRects;
  function hasBadBidiRects(measure) {
    if (badBidiRects != null) return badBidiRects;
    var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062eA"));
    var r0 = range(txt, 0, 1).getBoundingClientRect();
    if (r0.left == r0.right) return false;
    var r1 = range(txt, 1, 2).getBoundingClientRect();
    return badBidiRects = (r1.right - r0.right < 3);
  }

  // See if "".split is the broken IE version, if so, provide an
  // alternative way to split lines.
  var splitLines = CodeMirror.splitLines = "\n\nb".split(/\n/).length != 3 ? function (string) {
    var pos = 0, result = [], l = string.length;
    while (pos <= l) {
      var nl = string.indexOf("\n", pos);
      if (nl == -1) nl = string.length;
      var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
      var rt = line.indexOf("\r");
      if (rt != -1) {
        result.push(line.slice(0, rt));
        pos += rt + 1;
      } else {
        result.push(line);
        pos = nl + 1;
      }
    }
    return result;
  } : function (string) { return string.split(/\r\n?|\n/); };

  var hasSelection = window.getSelection ? function (te) {
    try { return te.selectionStart != te.selectionEnd; }
    catch (e) { return false; }
  } : function (te) {
    try { var range = te.ownerDocument.selection.createRange(); }
    catch (e) { }
    if (!range || range.parentElement() != te) return false;
    return range.compareEndPoints("StartToEnd", range) != 0;
  };

  var hasCopyEvent = (function () {
    var e = elt("div");
    if ("oncopy" in e) return true;
    e.setAttribute("oncopy", "return;");
    return typeof e.oncopy == "function";
  })();

  // KEY NAMES

  var keyNames = {
    3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
    19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
    36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
    46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod", 107: "=", 109: "-", 127: "Delete",
    173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
    221: "]", 222: "'", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete",
    63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert"
  };
  CodeMirror.keyNames = keyNames;
  (function () {
    // Number keys
    for (var i = 0; i < 10; i++) keyNames[i + 48] = keyNames[i + 96] = String(i);
    // Alphabetic keys
    for (var i = 65; i <= 90; i++) keyNames[i] = String.fromCharCode(i);
    // Function keys
    for (var i = 1; i <= 12; i++) keyNames[i + 111] = keyNames[i + 63235] = "F" + i;
  })();

  // BIDI HELPERS

  function iterateBidiSections(order, from, to, f) {
    if (!order) return f(from, to, "ltr");
    var found = false;
    for (var i = 0; i < order.length; ++i) {
      var part = order[i];
      if (part.from < to && part.to > from || from == to && part.to == from) {
        f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr");
        found = true;
      }
    }
    if (!found) f(from, to, "ltr");
  }

  function bidiLeft(part) { return part.level % 2 ? part.to : part.from; }
  function bidiRight(part) { return part.level % 2 ? part.from : part.to; }

  function lineLeft(line) { var order = getOrder(line); return order ? bidiLeft(order[0]) : 0; }
  function lineRight(line) {
    var order = getOrder(line);
    if (!order) return line.text.length;
    return bidiRight(lst(order));
  }

  function lineStart(cm, lineN) {
    var line = getLine(cm.doc, lineN);
    var visual = visualLine(line);
    if (visual != line) lineN = lineNo(visual);
    var order = getOrder(visual);
    var ch = !order ? 0 : order[0].level % 2 ? lineRight(visual) : lineLeft(visual);
    return Pos(lineN, ch);
  }
  function lineEnd(cm, lineN) {
    var merged, line = getLine(cm.doc, lineN);
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
      lineN = null;
    }
    var order = getOrder(line);
    var ch = !order ? line.text.length : order[0].level % 2 ? lineLeft(line) : lineRight(line);
    return Pos(lineN == null ? lineNo(line) : lineN, ch);
  }

  function compareBidiLevel(order, a, b) {
    var linedir = order[0].level;
    if (a == linedir) return true;
    if (b == linedir) return false;
    return a < b;
  }
  var bidiOther;
  function getBidiPartAt(order, pos) {
    bidiOther = null;
    for (var i = 0, found; i < order.length; ++i) {
      var cur = order[i];
      if (cur.from < pos && cur.to > pos) return i;
      if ((cur.from == pos || cur.to == pos)) {
        if (found == null) {
          found = i;
        } else if (compareBidiLevel(order, cur.level, order[found].level)) {
          if (cur.from != cur.to) bidiOther = found;
          return i;
        } else {
          if (cur.from != cur.to) bidiOther = i;
          return found;
        }
      }
    }
    return found;
  }

  function moveInLine(line, pos, dir, byUnit) {
    if (!byUnit) return pos + dir;
    do pos += dir;
    while (pos > 0 && isExtendingChar(line.text.charAt(pos)));
    return pos;
  }

  // This is needed in order to move 'visually' through bi-directional
  // text -- i.e., pressing left should make the cursor go left, even
  // when in RTL text. The tricky part is the 'jumps', where RTL and
  // LTR text touch each other. This often requires the cursor offset
  // to move more than one unit, in order to visually move one unit.
  function moveVisually(line, start, dir, byUnit) {
    var bidi = getOrder(line);
    if (!bidi) return moveLogically(line, start, dir, byUnit);
    var pos = getBidiPartAt(bidi, start), part = bidi[pos];
    var target = moveInLine(line, start, part.level % 2 ? -dir : dir, byUnit);

    for (; ;) {
      if (target > part.from && target < part.to) return target;
      if (target == part.from || target == part.to) {
        if (getBidiPartAt(bidi, target) == pos) return target;
        part = bidi[pos += dir];
        return (dir > 0) == part.level % 2 ? part.to : part.from;
      } else {
        part = bidi[pos += dir];
        if (!part) return null;
        if ((dir > 0) == part.level % 2)
          target = moveInLine(line, part.to, -1, byUnit);
        else
          target = moveInLine(line, part.from, 1, byUnit);
      }
    }
  }

  function moveLogically(line, start, dir, byUnit) {
    var target = start + dir;
    if (byUnit) while (target > 0 && isExtendingChar(line.text.charAt(target))) target += dir;
    return target < 0 || target > line.text.length ? null : target;
  }

  // Bidirectional ordering algorithm
  // See http://unicode.org/reports/tr9/tr9-13.html for the algorithm
  // that this (partially) implements.

  // One-char codes used for character types:
  // L (L):   Left-to-Right
  // R (R):   Right-to-Left
  // r (AL):  Right-to-Left Arabic
  // 1 (EN):  European Number
  // + (ES):  European Number Separator
  // % (ET):  European Number Terminator
  // n (AN):  Arabic Number
  // , (CS):  Common Number Separator
  // m (NSM): Non-Spacing Mark
  // b (BN):  Boundary Neutral
  // s (B):   Paragraph Separator
  // t (S):   Segment Separator
  // w (WS):  Whitespace
  // N (ON):  Other Neutrals

  // Returns null if characters are ordered as they appear
  // (left-to-right), or an array of sections ({from, to, level}
  // objects) in the order in which they occur visually.
  var bidiOrdering = (function () {
    // Character types for codepoints 0 to 0xff
    var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
    // Character types for codepoints 0x600 to 0x6ff
    var arabicTypes = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm";
    function charType(code) {
      if (code <= 0xf7) return lowTypes.charAt(code);
      else if (0x590 <= code && code <= 0x5f4) return "R";
      else if (0x600 <= code && code <= 0x6ed) return arabicTypes.charAt(code - 0x600);
      else if (0x6ee <= code && code <= 0x8ac) return "r";
      else if (0x2000 <= code && code <= 0x200b) return "w";
      else if (code == 0x200c) return "b";
      else return "L";
    }

    var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
    var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;
    // Browsers seem to always treat the boundaries of block elements as being L.
    var outerType = "L";

    function BidiSpan(level, from, to) {
      this.level = level;
      this.from = from; this.to = to;
    }

    return function (str) {
      if (!bidiRE.test(str)) return false;
      var len = str.length, types = [];
      for (var i = 0, type; i < len; ++i)
        types.push(type = charType(str.charCodeAt(i)));

      // W1. Examine each non-spacing mark (NSM) in the level run, and
      // change the type of the NSM to the type of the previous
      // character. If the NSM is at the start of the level run, it will
      // get the type of sor.
      for (var i = 0, prev = outerType; i < len; ++i) {
        var type = types[i];
        if (type == "m") types[i] = prev;
        else prev = type;
      }

      // W2. Search backwards from each instance of a European number
      // until the first strong type (R, L, AL, or sor) is found. If an
      // AL is found, change the type of the European number to Arabic
      // number.
      // W3. Change all ALs to R.
      for (var i = 0, cur = outerType; i < len; ++i) {
        var type = types[i];
        if (type == "1" && cur == "r") types[i] = "n";
        else if (isStrong.test(type)) { cur = type; if (type == "r") types[i] = "R"; }
      }

      // W4. A single European separator between two European numbers
      // changes to a European number. A single common separator between
      // two numbers of the same type changes to that type.
      for (var i = 1, prev = types[0]; i < len - 1; ++i) {
        var type = types[i];
        if (type == "+" && prev == "1" && types[i + 1] == "1") types[i] = "1";
        else if (type == "," && prev == types[i + 1] &&
          (prev == "1" || prev == "n")) types[i] = prev;
        prev = type;
      }

      // W5. A sequence of European terminators adjacent to European
      // numbers changes to all European numbers.
      // W6. Otherwise, separators and terminators change to Other
      // Neutral.
      for (var i = 0; i < len; ++i) {
        var type = types[i];
        if (type == ",") types[i] = "N";
        else if (type == "%") {
          for (var end = i + 1; end < len && types[end] == "%"; ++end) { }
          var replace = (i && types[i - 1] == "!") || (end < len && types[end] == "1") ? "1" : "N";
          for (var j = i; j < end; ++j) types[j] = replace;
          i = end - 1;
        }
      }

      // W7. Search backwards from each instance of a European number
      // until the first strong type (R, L, or sor) is found. If an L is
      // found, then change the type of the European number to L.
      for (var i = 0, cur = outerType; i < len; ++i) {
        var type = types[i];
        if (cur == "L" && type == "1") types[i] = "L";
        else if (isStrong.test(type)) cur = type;
      }

      // N1. A sequence of neutrals takes the direction of the
      // surrounding strong text if the text on both sides has the same
      // direction. European and Arabic numbers act as if they were R in
      // terms of their influence on neutrals. Start-of-level-run (sor)
      // and end-of-level-run (eor) are used at level run boundaries.
      // N2. Any remaining neutrals take the embedding direction.
      for (var i = 0; i < len; ++i) {
        if (isNeutral.test(types[i])) {
          for (var end = i + 1; end < len && isNeutral.test(types[end]); ++end) { }
          var before = (i ? types[i - 1] : outerType) == "L";
          var after = (end < len ? types[end] : outerType) == "L";
          var replace = before || after ? "L" : "R";
          for (var j = i; j < end; ++j) types[j] = replace;
          i = end - 1;
        }
      }

      // Here we depart from the documented algorithm, in order to avoid
      // building up an actual levels array. Since there are only three
      // levels (0, 1, 2) in an implementation that doesn't take
      // explicit embedding into account, we can build up the order on
      // the fly, without following the level-based algorithm.
      var order = [], m;
      for (var i = 0; i < len;) {
        if (countsAsLeft.test(types[i])) {
          var start = i;
          for (++i; i < len && countsAsLeft.test(types[i]); ++i) { }
          order.push(new BidiSpan(0, start, i));
        } else {
          var pos = i, at = order.length;
          for (++i; i < len && types[i] != "L"; ++i) { }
          for (var j = pos; j < i;) {
            if (countsAsNum.test(types[j])) {
              if (pos < j) order.splice(at, 0, new BidiSpan(1, pos, j));
              var nstart = j;
              for (++j; j < i && countsAsNum.test(types[j]); ++j) { }
              order.splice(at, 0, new BidiSpan(2, nstart, j));
              pos = j;
            } else ++j;
          }
          if (pos < i) order.splice(at, 0, new BidiSpan(1, pos, i));
        }
      }
      if (order[0].level == 1 && (m = str.match(/^\s+/))) {
        order[0].from = m[0].length;
        order.unshift(new BidiSpan(0, 0, m[0].length));
      }
      if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
        lst(order).to -= m[0].length;
        order.push(new BidiSpan(0, len - m[0].length, len));
      }
      if (order[0].level != lst(order).level)
        order.push(new BidiSpan(order[0].level, len, len));

      return order;
    };
  })();

  // THE END

  CodeMirror.version = "4.0.3";

  CodeMirror.StringStream = StringStream;

  return CodeMirror;
});



//////////File Source js/codemirror/active-line.js
// Because sometimes you need to style the cursor's line.
//
// Adds an option 'styleActiveLine' which, when enabled, gives the
// active line's wrapping <div> the CSS class "CodeMirror-activeline",
// and gives its background <div> the class "CodeMirror-activeline-background".

(function(mod) {
  // if (typeof exports == "object" && typeof module == "object") // CommonJS
  //   mod(require("../../lib/codemirror"));
  // else if (typeof define == "function" && define.amd) // AMD
  //   define(["../../lib/codemirror"], mod);
  // else // Plain browser env
    // mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  var WRAP_CLASS = "CodeMirror-activeline";
  var BACK_CLASS = "CodeMirror-activeline-background";

  CodeMirror.defineOption("styleActiveLine", false, function(cm, val, old) {
    var prev = old && old != CodeMirror.Init;
    if (val && !prev) {
      cm.state.activeLines = [];
      updateActiveLines(cm, cm.listSelections());
      cm.on("beforeSelectionChange", selectionChange);
    } else if (!val && prev) {
      cm.off("beforeSelectionChange", selectionChange);
      clearActiveLines(cm);
      delete cm.state.activeLines;
    }
  });

  function clearActiveLines(cm) {
    for (var i = 0; i < cm.state.activeLines.length; i++) {
      cm.removeLineClass(cm.state.activeLines[i], "wrap", WRAP_CLASS);
      cm.removeLineClass(cm.state.activeLines[i], "background", BACK_CLASS);
    }
  }

  function sameArray(a, b) {
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++)
      if (a[i] != b[i]) return false;
    return true;
  }

  function updateActiveLines(cm, ranges) {
    var active = [];
    for (var i = 0; i < ranges.length; i++) {
      var line = cm.getLineHandleVisualStart(ranges[i].head.line);
      if (active[active.length - 1] != line) active.push(line);
    }
    if (sameArray(cm.state.activeLines, active)) return;
    cm.operation(function() {
      clearActiveLines(cm);
      for (var i = 0; i < active.length; i++) {
        cm.addLineClass(active[i], "wrap", WRAP_CLASS);
        cm.addLineClass(active[i], "background", BACK_CLASS);
      }
      cm.state.activeLines = active;
    });
  }

  function selectionChange(cm, sel) {
    updateActiveLines(cm, sel.ranges);
  }
});

//////////File Source js/codemirror/dialog.js
// Open simple dialogs on top of an editor. Relies on dialog.css.

(function(mod) {
  // if (typeof exports == "object" && typeof module == "object") // CommonJS
  //   mod(require("../../lib/codemirror"));
  // else if (typeof define == "function" && define.amd) // AMD
  //   define(["../../lib/codemirror"], mod);
  // else // Plain browser env
    // mod(CodeMirror);
})(function(CodeMirror) {
  function dialogDiv(cm, template, bottom) {
    var wrap = cm.getWrapperElement();
    var dialog;
    dialog = wrap.appendChild(document.createElement("div"));
    if (bottom) {
      dialog.className = "CodeMirror-dialog CodeMirror-dialog-bottom";
    } else {
      dialog.className = "CodeMirror-dialog CodeMirror-dialog-top";
    }
    if (typeof template == "string") {
      dialog.innerHTML = template;
    } else { // Assuming it's a detached DOM element.
      dialog.appendChild(template);
    }
    return dialog;
  }

  function closeNotification(cm, newVal) {
    if (cm.state.currentNotificationClose)
      cm.state.currentNotificationClose();
    cm.state.currentNotificationClose = newVal;
  }

  CodeMirror.defineExtension("openDialog", function(template, callback, options) {
    closeNotification(this, null);
    var dialog = dialogDiv(this, template, options && options.bottom);
    var closed = false, me = this;
    function close() {
      if (closed) return;
      closed = true;
      dialog.parentNode.removeChild(dialog);
    }
    var inp = dialog.getElementsByTagName("input")[0], button;
    if (inp) {
      if (options && options.value) inp.value = options.value;
      CodeMirror.on(inp, "keydown", function(e) {
        if (options && options.onKeyDown && options.onKeyDown(e, inp.value, close)) { return; }
        if (e.keyCode == 13 || e.keyCode == 27) {
          inp.blur();
          CodeMirror.e_stop(e);
          close();
          me.focus();
          if (e.keyCode == 13) callback(inp.value);
        }
      });
      if (options && options.onKeyUp) {
        CodeMirror.on(inp, "keyup", function(e) {options.onKeyUp(e, inp.value, close);});
      }
      if (options && options.value) inp.value = options.value;
      inp.focus();
      CodeMirror.on(inp, "blur", close);
    } else if (button = dialog.getElementsByTagName("button")[0]) {
      CodeMirror.on(button, "click", function() {
        close();
        me.focus();
      });
      button.focus();
      CodeMirror.on(button, "blur", close);
    }
    return close;
  });

  CodeMirror.defineExtension("openConfirm", function(template, callbacks, options) {
    closeNotification(this, null);
    var dialog = dialogDiv(this, template, options && options.bottom);
    var buttons = dialog.getElementsByTagName("button");
    var closed = false, me = this, blurring = 1;
    function close() {
      if (closed) return;
      closed = true;
      dialog.parentNode.removeChild(dialog);
      me.focus();
    }
    buttons[0].focus();
    for (var i = 0; i < buttons.length; ++i) {
      var b = buttons[i];
      (function(callback) {
        CodeMirror.on(b, "click", function(e) {
          CodeMirror.e_preventDefault(e);
          close();
          if (callback) callback(me);
        });
      })(callbacks[i]);
      CodeMirror.on(b, "blur", function() {
        --blurring;
        setTimeout(function() { if (blurring <= 0) close(); }, 200);
      });
      CodeMirror.on(b, "focus", function() { ++blurring; });
    }
  });

  /*
   * openNotification
   * Opens a notification, that can be closed with an optional timer
   * (default 5000ms timer) and always closes on click.
   *
   * If a notification is opened while another is opened, it will close the
   * currently opened one and open the new one immediately.
   */
  CodeMirror.defineExtension("openNotification", function(template, options) {
    closeNotification(this, close);
    var dialog = dialogDiv(this, template, options && options.bottom);
    var duration = options && (options.duration === undefined ? 5000 : options.duration);
    var closed = false, doneTimer;

    function close() {
      if (closed) return;
      closed = true;
      clearTimeout(doneTimer);
      dialog.parentNode.removeChild(dialog);
    }

    CodeMirror.on(dialog, 'click', function(e) {
      CodeMirror.e_preventDefault(e);
      close();
    });
    if (duration)
      doneTimer = setTimeout(close, options.duration);
  });
});

//////////File Source js/codemirror/search.js
// Define search commands. Depends on dialog.js or another
// implementation of the openDialog method.

// Replace works a little oddly -- it will do the replace on the next
// Ctrl-G (or whatever is bound to findNext) press. You prevent a
// replace by making sure the match is no longer selected when hitting
// Ctrl-G.

(function(mod) {
  // if (typeof exports == "object" && typeof module == "object") // CommonJS
  //   mod(require("../../lib/codemirror"), require("./searchcursor"), require("../dialog/dialog"));
  // else if (typeof define == "function" && define.amd) // AMD
  //   define(["../../lib/codemirror", "./searchcursor", "../dialog/dialog"], mod);
  // else // Plain browser env
  //   mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  function searchOverlay(query, caseInsensitive) {
    var startChar;
    if (typeof query == "string") {
      startChar = query.charAt(0);
      query = new RegExp("^" + query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
                         caseInsensitive ? "i" : "");
    } else {
      query = new RegExp("^(?:" + query.source + ")", query.ignoreCase ? "i" : "");
    }
    return {token: function(stream) {
      if (stream.match(query)) return "searching";
      while (!stream.eol()) {
        stream.next();
        if (startChar && !caseInsensitive)
          stream.skipTo(startChar) || stream.skipToEnd();
        if (stream.match(query, false)) break;
      }
    }};
  }

  function SearchState() {
    this.posFrom = this.posTo = this.query = null;
    this.overlay = null;
  }
  function getSearchState(cm) {
    return cm.state.search || (cm.state.search = new SearchState());
  }
  function queryCaseInsensitive(query) {
    return typeof query == "string" && query == query.toLowerCase();
  }
  function getSearchCursor(cm, query, pos) {
    // Heuristic: if the query string is all lowercase, do a case insensitive search.
    return cm.getSearchCursor(query, pos, queryCaseInsensitive(query));
  }
  function dialog(cm, text, shortText, deflt, f) {
    if (cm.openDialog) cm.openDialog(text, f, {value: deflt});
    else f(prompt(shortText, deflt));
  }
  function confirmDialog(cm, text, shortText, fs) {
    if (cm.openConfirm) cm.openConfirm(text, fs);
    else if (confirm(shortText)) fs[0]();
  }
  function parseQuery(query) {
    var isRE = query.match(/^\/(.*)\/([a-z]*)$/);
    if (isRE) {
      query = new RegExp(isRE[1], isRE[2].indexOf("i") == -1 ? "" : "i");
      if (query.test("")) query = /x^/;
    } else if (query == "") {
      query = /x^/;
    }
    return query;
  }
  var queryDialog =
    'Search: <input type="text" style="width: 10em"/>';// <span style="color: #888">(Use /re/ syntax for regexp search)</span>';
  function doSearch(cm, rev) {
    var state = getSearchState(cm);
    if (state.query) return findNext(cm, rev);
    dialog(cm, queryDialog, "Search for:", cm.getSelection(), function(query) {
      cm.operation(function() {
        if (!query || state.query) return;
        state.query = parseQuery(query);
        cm.removeOverlay(state.overlay, queryCaseInsensitive(state.query));
        state.overlay = searchOverlay(state.query, queryCaseInsensitive(state.query));
        cm.addOverlay(state.overlay);
        state.posFrom = state.posTo = cm.getCursor();
        findNext(cm, rev);
      });
    });
  }
  function findNext(cm, rev) {cm.operation(function() {
    var state = getSearchState(cm);
    var cursor = getSearchCursor(cm, state.query, rev ? state.posFrom : state.posTo);
    if (!cursor.find(rev)) {
      cursor = getSearchCursor(cm, state.query, rev ? CodeMirror.Pos(cm.lastLine()) : CodeMirror.Pos(cm.firstLine(), 0));
      if (!cursor.find(rev)) return;
    }
    cm.setSelection(cursor.from(), cursor.to());
    cm.scrollIntoView({from: cursor.from(), to: cursor.to()});
    state.posFrom = cursor.from(); state.posTo = cursor.to();
  });}
  function clearSearch(cm) {cm.operation(function() {
    var state = getSearchState(cm);
    if (!state.query) return;
    state.query = null;
    cm.removeOverlay(state.overlay);
  });}

  var replaceQueryDialog =
    'Replace: <input type="text" style="width: 10em"/> ';//<span style="color: #888">(Use /re/ syntax for regexp search)</span>';
  var replacementQueryDialog = 'With: <input type="text" style="width: 10em"/>';
  var doReplaceConfirm = "Replace? <button>Yes</button> <button>No</button> <button>Stop</button>";
  function replace(cm, all) {
    dialog(cm, replaceQueryDialog, "Replace:", cm.getSelection(), function(query) {
      if (!query) return;
      query = parseQuery(query);
      dialog(cm, replacementQueryDialog, "Replace with:", "", function(text) {
        if (all) {
          cm.operation(function() {
            for (var cursor = getSearchCursor(cm, query); cursor.findNext();) {
              if (typeof query != "string") {
                var match = cm.getRange(cursor.from(), cursor.to()).match(query);
                cursor.replace(text.replace(/\$(\d)/g, function(_, i) {return match[i];}));
              } else cursor.replace(text);
            }
          });
        } else {
          clearSearch(cm);
          var cursor = getSearchCursor(cm, query, cm.getCursor());
          var advance = function() {
            var start = cursor.from(), match;
            if (!(match = cursor.findNext())) {
              cursor = getSearchCursor(cm, query);
              if (!(match = cursor.findNext()) ||
                  (start && cursor.from().line == start.line && cursor.from().ch == start.ch)) return;
            }
            cm.setSelection(cursor.from(), cursor.to());
            cm.scrollIntoView({from: cursor.from(), to: cursor.to()});
            confirmDialog(cm, doReplaceConfirm, "Replace?",
                          [function() {doReplace(match);}, advance]);
          };
          var doReplace = function(match) {
            cursor.replace(typeof query == "string" ? text :
                           text.replace(/\$(\d)/g, function(_, i) {return match[i];}));
            advance();
          };
          advance();
        }
      });
    });
  }

  CodeMirror.commands.find = function(cm) {clearSearch(cm); doSearch(cm);};
  CodeMirror.commands.findNext = doSearch;
  CodeMirror.commands.findPrev = function(cm) {doSearch(cm, true);};
  CodeMirror.commands.clearSearch = clearSearch;
  CodeMirror.commands.replace = replace;
  CodeMirror.commands.replaceAll = function(cm) {replace(cm, true);};
});

//////////File Source js/codemirror/searchcursor.js
(function(mod) {
  // if (typeof exports == "object" && typeof module == "object") // CommonJS
  //   mod(require("../../lib/codemirror"));
  // else if (typeof define == "function" && define.amd) // AMD
  //   define(["../../lib/codemirror"], mod);
  // else // Plain browser env
    // mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  var Pos = CodeMirror.Pos;

  function SearchCursor(doc, query, pos, caseFold) {
    caseFold=true;
    this.atOccurrence = false; this.doc = doc;
    if (caseFold == null && typeof query == "string") caseFold = false;

    pos = pos ? doc.clipPos(pos) : Pos(0, 0);
    this.pos = {from: pos, to: pos};

    // The matches method is filled in based on the type of query.
    // It takes a position and a direction, and returns an object
    // describing the next occurrence of the query, or null if no
    // more matches were found.
    if (typeof query != "string") { // Regexp match
      if (!query.global) query = new RegExp(query.source, query.ignoreCase ? "ig" : "g");
      this.matches = function(reverse, pos) {
        if (reverse) {
          query.lastIndex = 0;
          var line = doc.getLine(pos.line).slice(0, pos.ch), cutOff = 0, match, start;
          for (;;) {
            query.lastIndex = cutOff;
            var newMatch = query.exec(line);
            if (!newMatch) break;
            match = newMatch;
            start = match.index;
            cutOff = match.index + (match[0].length || 1);
            if (cutOff == line.length) break;
          }
          var matchLen = (match && match[0].length) || 0;
          if (!matchLen) {
            if (start == 0 && line.length == 0) {match = undefined;}
            else if (start != doc.getLine(pos.line).length) {
              matchLen++;
            }
          }
        } else {
          query.lastIndex = pos.ch;
          var line = doc.getLine(pos.line), match = query.exec(line);
          var matchLen = (match && match[0].length) || 0;
          var start = match && match.index;
          if (start + matchLen != line.length && !matchLen) matchLen = 1;
        }
        if (match && matchLen)
          return {from: Pos(pos.line, start),
                  to: Pos(pos.line, start + matchLen),
                  match: match};
      };
    } else { // String query
      var origQuery = query;
      if (caseFold) query = query.toLowerCase();
      var fold = caseFold ? function(str){return str.toLowerCase();} : function(str){return str;};
      var target = query.split("\n");
      // Different methods for single-line and multi-line queries
      if (target.length == 1) {
        if (!query.length) {
          // Empty string would match anything and never progress, so
          // we define it to match nothing instead.
          this.matches = function() {};
        } else {
          this.matches = function(reverse, pos) {
            if (reverse) {
              var orig = doc.getLine(pos.line).slice(0, pos.ch), line = fold(orig);
              var match = line.lastIndexOf(query);
              if (match > -1) {
                match = adjustPos(orig, line, match);
                return {from: Pos(pos.line, match), to: Pos(pos.line, match + origQuery.length)};
              }
             } else {
               var orig = doc.getLine(pos.line).slice(pos.ch), line = fold(orig);
               var match = line.indexOf(query);
               if (match > -1) {
                 match = adjustPos(orig, line, match) + pos.ch;
                 return {from: Pos(pos.line, match), to: Pos(pos.line, match + origQuery.length)};
               }
            }
          };
        }
      } else {
        var origTarget = origQuery.split("\n");
        this.matches = function(reverse, pos) {
          var last = target.length - 1;
          if (reverse) {
            if (pos.line - (target.length - 1) < doc.firstLine()) return;
            if (fold(doc.getLine(pos.line).slice(0, origTarget[last].length)) != target[target.length - 1]) return;
            var to = Pos(pos.line, origTarget[last].length);
            for (var ln = pos.line - 1, i = last - 1; i >= 1; --i, --ln)
              if (target[i] != fold(doc.getLine(ln))) return;
            var line = doc.getLine(ln), cut = line.length - origTarget[0].length;
            if (fold(line.slice(cut)) != target[0]) return;
            return {from: Pos(ln, cut), to: to};
          } else {
            if (pos.line + (target.length - 1) > doc.lastLine()) return;
            var line = doc.getLine(pos.line), cut = line.length - origTarget[0].length;
            if (fold(line.slice(cut)) != target[0]) return;
            var from = Pos(pos.line, cut);
            for (var ln = pos.line + 1, i = 1; i < last; ++i, ++ln)
              if (target[i] != fold(doc.getLine(ln))) return;
            if (doc.getLine(ln).slice(0, origTarget[last].length) != target[last]) return;
            return {from: from, to: Pos(ln, origTarget[last].length)};
          }
        };
      }
    }
  }

  SearchCursor.prototype = {
    findNext: function() {return this.find(false);},
    findPrevious: function() {return this.find(true);},

    find: function(reverse) {
      var self = this, pos = this.doc.clipPos(reverse ? this.pos.from : this.pos.to);
      function savePosAndFail(line) {
        var pos = Pos(line, 0);
        self.pos = {from: pos, to: pos};
        self.atOccurrence = false;
        return false;
      }

      for (;;) {
        if (this.pos = this.matches(reverse, pos)) {
          this.atOccurrence = true;
          return this.pos.match || true;
        }
        if (reverse) {
          if (!pos.line) return savePosAndFail(0);
          pos = Pos(pos.line-1, this.doc.getLine(pos.line-1).length);
        }
        else {
          var maxLine = this.doc.lineCount();
          if (pos.line == maxLine - 1) return savePosAndFail(maxLine);
          pos = Pos(pos.line + 1, 0);
        }
      }
    },

    from: function() {if (this.atOccurrence) return this.pos.from;},
    to: function() {if (this.atOccurrence) return this.pos.to;},

    replace: function(newText) {
      if (!this.atOccurrence) return;
      var lines = CodeMirror.splitLines(newText);
      this.doc.replaceRange(lines, this.pos.from, this.pos.to);
      this.pos.to = Pos(this.pos.from.line + lines.length - 1,
                        lines[lines.length - 1].length + (lines.length == 1 ? this.pos.from.ch : 0));
    }
  };

  // Maps a position in a case-folded line back to a position in the original line
  // (compensating for codepoints increasing in number during folding)
  function adjustPos(orig, folded, pos) {
    if (orig.length == folded.length) return pos;
    for (var pos1 = Math.min(pos, orig.length);;) {
      var len1 = orig.slice(0, pos1).toLowerCase().length;
      if (len1 < pos) ++pos1;
      else if (len1 > pos) --pos1;
      else return pos1;
    }
  }

  CodeMirror.defineExtension("getSearchCursor", function(query, pos, caseFold) {
    caseFold=true;
    return new SearchCursor(this.doc, query, pos, caseFold);
  });
  CodeMirror.defineDocExtension("getSearchCursor", function(query, pos, caseFold) {
    caseFold=true;
    return new SearchCursor(this, query, pos, caseFold);
  });

  CodeMirror.defineExtension("selectMatches", function(query, caseFold) {
    caseFold=true;
    var ranges = [], next;
    var cur = this.getSearchCursor(query, this.getCursor("from"), caseFold);
    while (next = cur.findNext()) {
      if (CodeMirror.cmpPos(cur.to(), this.getCursor("to")) > 0) break;
      ranges.push({anchor: cur.from(), head: cur.to()});
    }
    if (ranges.length)
      this.setSelections(ranges, 0);
  });
});

//////////File Source js/codemirror/match-highlighter.js
// Highlighting text that matches the selection
//
// Defines an option highlightSelectionMatches, which, when enabled,
// will style strings that match the selection throughout the
// document.
//
// The option can be set to true to simply enable it, or to a
// {minChars, style, showToken} object to explicitly configure it.
// minChars is the minimum amount of characters that should be
// selected for the behavior to occur, and style is the token style to
// apply to the matches. This will be prefixed by "cm-" to create an
// actual CSS class name. showToken, when enabled, will cause the
// current token to be highlighted when nothing is selected.

(function(mod) {
  // if (typeof exports == "object" && typeof module == "object") // CommonJS
  //   mod(require("../../lib/codemirror"));
  // else if (typeof define == "function" && define.amd) // AMD
  //   define(["../../lib/codemirror"], mod);
  // else // Plain browser env
    // mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var DEFAULT_MIN_CHARS = 2;
  var DEFAULT_TOKEN_STYLE = "matchhighlight";
  var DEFAULT_DELAY = 100;

  function State(options) {
    if (typeof options == "object") {
      this.minChars = options.minChars;
      this.style = options.style;
      this.showToken = options.showToken;
      this.delay = options.delay;
    }
    if (this.style == null) this.style = DEFAULT_TOKEN_STYLE;
    if (this.minChars == null) this.minChars = DEFAULT_MIN_CHARS;
    if (this.delay == null) this.delay = DEFAULT_DELAY;
    this.overlay = this.timeout = null;
  }

  CodeMirror.defineOption("highlightSelectionMatches", false, function(cm, val, old) {
    if (old && old != CodeMirror.Init) {
      var over = cm.state.matchHighlighter.overlay;
      if (over) cm.removeOverlay(over);
      clearTimeout(cm.state.matchHighlighter.timeout);
      cm.state.matchHighlighter = null;
      cm.off("cursorActivity", cursorActivity);
    }
    if (val) {
      cm.state.matchHighlighter = new State(val);
      highlightMatches(cm);
      cm.on("cursorActivity", cursorActivity);
    }
  });

  function cursorActivity(cm) {
    var state = cm.state.matchHighlighter;
    clearTimeout(state.timeout);
    state.timeout = setTimeout(function() {highlightMatches(cm);}, state.delay);
  }

  function highlightMatches(cm) {
    cm.operation(function() {
      var state = cm.state.matchHighlighter;
      if (state.overlay) {
        cm.removeOverlay(state.overlay);
        state.overlay = null;
      }
      if (!cm.somethingSelected() && state.showToken) {
        var re = state.showToken === true ? /[\w$]/ : state.showToken;
        var cur = cm.getCursor(), line = cm.getLine(cur.line), start = cur.ch, end = start;
        while (start && re.test(line.charAt(start - 1))) --start;
        while (end < line.length && re.test(line.charAt(end))) ++end;
        if (start < end)
          cm.addOverlay(state.overlay = makeOverlay(line.slice(start, end), re, state.style));
        return;
      }
      if (cm.getCursor("head").line != cm.getCursor("anchor").line) return;
      var selection = cm.getSelections()[0].replace(/^\s+|\s+$/g, "");
      if (selection.length >= state.minChars)
        cm.addOverlay(state.overlay = makeOverlay(selection, false, state.style));
    });
  }

  function boundariesAround(stream, re) {
    return (!stream.start || !re.test(stream.string.charAt(stream.start - 1))) &&
      (stream.pos == stream.string.length || !re.test(stream.string.charAt(stream.pos)));
  }

  function makeOverlay(query, hasBoundary, style) {
    return {token: function(stream) {
      if (stream.match(query) &&
          (!hasBoundary || boundariesAround(stream, hasBoundary)))
        return style;
      stream.next();
      stream.skipTo(query.charAt(0)) || stream.skipToEnd();
    }};
  }
});

//////////File Source js/codemirror/show-hint.js
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  // if (typeof exports == "object" && typeof module == "object") // CommonJS
  //   mod(require("../../lib/codemirror"));
  // else if (typeof define == "function" && define.amd) // AMD
  //   define(["../../lib/codemirror"], mod);
  // else // Plain browser env
    // mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var HINT_ELEMENT_CLASS        = "CodeMirror-hint";
  var ACTIVE_HINT_ELEMENT_CLASS = "CodeMirror-hint-active";

  // This is the old interface, kept around for now to stay
  // backwards-compatible.
  CodeMirror.showHint = function(cm, getHints, options) {
    if (!getHints) return cm.showHint(options);
    if (options && options.async) getHints.async = true;
    var newOpts = {hint: getHints};
    if (options) for (var prop in options) newOpts[prop] = options[prop];
    return cm.showHint(newOpts);
  };

  CodeMirror.defineExtension("showHint", function(options) {
    options = parseOptions(this, this.getCursor("start"), options);
    var selections = this.listSelections()
    if (selections.length > 1) return;
    // By default, don't allow completion when something is selected.
    // A hint function can have a `supportsSelection` property to
    // indicate that it can handle selections.
    if (this.somethingSelected()) {
      if (!options.hint.supportsSelection) return;
      // Don't try with cross-line selections
      for (var i = 0; i < selections.length; i++)
        if (selections[i].head.line != selections[i].anchor.line) return;
    }

    if (this.state.completionActive) this.state.completionActive.close();
    var completion = this.state.completionActive = new Completion(this, options);
    if (!completion.options.hint) return;

    CodeMirror.signal(this, "startCompletion", this);
    completion.update(true);
  });

  function Completion(cm, options) {
    this.cm = cm;
    this.options = options;
    this.widget = null;
    this.debounce = 0;
    this.tick = 0;
    this.startPos = this.cm.getCursor("start");
    this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;

    var self = this;
    cm.on("cursorActivity", this.activityFunc = function() { self.cursorActivity(); });
  }

  var requestAnimationFrame = window.requestAnimationFrame || function(fn) {
    return setTimeout(fn, 1000/60);
  };
  var cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

  Completion.prototype = {
    close: function() {
      if (!this.active()) return;
      this.cm.state.completionActive = null;
      this.tick = null;
      this.cm.off("cursorActivity", this.activityFunc);

      if (this.widget && this.data) CodeMirror.signal(this.data, "close");
      if (this.widget) this.widget.close();
      CodeMirror.signal(this.cm, "endCompletion", this.cm);
    },

    active: function() {
      return this.cm.state.completionActive == this;
    },

    pick: function(data, i) {
      var completion = data.list[i];
      if (completion.hint) completion.hint(this.cm, data, completion);
      else this.cm.replaceRange(getText(completion), completion.from || data.from,
                                completion.to || data.to, "complete");
      CodeMirror.signal(data, "pick", completion);
      this.close();
    },

    cursorActivity: function() {
      if (this.debounce) {
        cancelAnimationFrame(this.debounce);
        this.debounce = 0;
      }

      var pos = this.cm.getCursor(), line = this.cm.getLine(pos.line);
      if (pos.line != this.startPos.line || line.length - pos.ch != this.startLen - this.startPos.ch ||
          pos.ch < this.startPos.ch || this.cm.somethingSelected() ||
          (pos.ch && this.options.closeCharacters.test(line.charAt(pos.ch - 1)))) {
        this.close();
      } else {
        var self = this;
        this.debounce = requestAnimationFrame(function() {self.update();});
        if (this.widget) this.widget.disable();
      }
    },

    update: function(first) {
      if (this.tick == null) return
      var self = this, myTick = ++this.tick
      fetchHints(this.options.hint, this.cm, this.options, function(data) {
        if (self.tick == myTick) self.finishUpdate(data, first)
      })
    },

    finishUpdate: function(data, first) {
      if (this.data) CodeMirror.signal(this.data, "update");

      var picked = (this.widget && this.widget.picked) || (first && this.options.completeSingle);
      if (this.widget) this.widget.close();

      this.data = data;

      if (data && data.list.length) {
        if (picked && data.list.length == 1) {
          this.pick(data, 0);
        } else {
          this.widget = new Widget(this, data);
          CodeMirror.signal(data, "shown");
        }
      }
    }
  };

  function parseOptions(cm, pos, options) {
    var editor = cm.options.hintOptions;
    var out = {};
    for (var prop in defaultOptions) out[prop] = defaultOptions[prop];
    if (editor) for (var prop in editor)
      if (editor[prop] !== undefined) out[prop] = editor[prop];
    if (options) for (var prop in options)
      if (options[prop] !== undefined) out[prop] = options[prop];
    if (out.hint.resolve) out.hint = out.hint.resolve(cm, pos)
    return out;
  }

  function getText(completion) {
    if (typeof completion == "string") return completion;
    else return completion.text;
  }

  function buildKeyMap(completion, handle) {
    var baseMap = {
      Up: function() {handle.moveFocus(-1);},
      Down: function() {handle.moveFocus(1);},
      PageUp: function() {handle.moveFocus(-handle.menuSize() + 1, true);},
      PageDown: function() {handle.moveFocus(handle.menuSize() - 1, true);},
      // Home: function() {handle.setFocus(0);},
      // End: function() {handle.setFocus(handle.length - 1);},
      Enter: handle.pick,
      Tab: handle.pick,
      Esc: handle.close
    };
    var custom = completion.options.customKeys;
    var ourMap = custom ? {} : baseMap;
    function addBinding(key, val) {
      var bound;
      if (typeof val != "string")
        bound = function(cm) { return val(cm, handle); };
      // This mechanism is deprecated
      else if (baseMap.hasOwnProperty(val))
        bound = baseMap[val];
      else
        bound = val;
      ourMap[key] = bound;
    }
    if (custom)
      for (var key in custom) if (custom.hasOwnProperty(key))
        addBinding(key, custom[key]);
    var extra = completion.options.extraKeys;
    if (extra)
      for (var key in extra) if (extra.hasOwnProperty(key))
        addBinding(key, extra[key]);
    return ourMap;
  }

  function getHintElement(hintsElement, el) {
    while (el && el != hintsElement) {
      if (el.nodeName.toUpperCase() === "LI" && el.parentNode == hintsElement) return el;
      el = el.parentNode;
    }
  }

  function Widget(completion, data) {
    this.completion = completion;
    this.data = data;
    this.picked = false;
    var widget = this, cm = completion.cm;

    var hints = this.hints = document.createElement("ul");
    hints.className = "CodeMirror-hints";
    this.selectedHint = data.selectedHint || 0;

    var completions = data.list;
    for (var i = 0; i < completions.length; ++i) {
      var elt = hints.appendChild(document.createElement("li")), cur = completions[i];
      var className = HINT_ELEMENT_CLASS + (i != this.selectedHint ? "" : " " + ACTIVE_HINT_ELEMENT_CLASS);
      if (cur.className != null) className = cur.className + " " + className;
      elt.className = className;
      if (cur.render) cur.render(elt, data, cur);
      else elt.appendChild(document.createTextNode(cur.displayText || getText(cur)));
      elt.hintId = i;
    }

    var pos = cm.cursorCoords(completion.options.alignWithWord ? data.from : null);
    var left = pos.left, top = pos.bottom, below = true;
    hints.style.left = left + "px";
    hints.style.top = top + "px";
    // If we're at the edge of the screen, then we want the menu to appear on the left of the cursor.
    var winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
    var winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
    (completion.options.container || document.body).appendChild(hints);
    var box = hints.getBoundingClientRect(), overlapY = box.bottom - winH;
    var scrolls = hints.scrollHeight > hints.clientHeight + 1
    var startScroll = cm.getScrollInfo();

    if (overlapY > 0) {
      var height = box.bottom - box.top, curTop = pos.top - (pos.bottom - box.top);
      if (curTop - height > 0) { // Fits above cursor
        hints.style.top = (top = pos.top - height) + "px";
        below = false;
      } else if (height > winH) {
        hints.style.height = (winH - 5) + "px";
        hints.style.top = (top = pos.bottom - box.top) + "px";
        var cursor = cm.getCursor();
        if (data.from.ch != cursor.ch) {
          pos = cm.cursorCoords(cursor);
          hints.style.left = (left = pos.left) + "px";
          box = hints.getBoundingClientRect();
        }
      }
    }
    var overlapX = box.right - winW;
    if (overlapX > 0) {
      if (box.right - box.left > winW) {
        hints.style.width = (winW - 5) + "px";
        overlapX -= (box.right - box.left) - winW;
      }
      hints.style.left = (left = pos.left - overlapX) + "px";
    }
    if (scrolls) for (var node = hints.firstChild; node; node = node.nextSibling)
      node.style.paddingRight = cm.display.nativeBarWidth + "px"

    cm.addKeyMap(this.keyMap = buildKeyMap(completion, {
      moveFocus: function(n, avoidWrap) { widget.changeActive(widget.selectedHint + n, avoidWrap); },
      setFocus: function(n) { widget.changeActive(n); },
      menuSize: function() { return widget.screenAmount(); },
      length: completions.length,
      close: function() { completion.close(); },
      pick: function() { widget.pick(); },
      data: data
    }));

    if (completion.options.closeOnUnfocus) {
      var closingOnBlur;
      cm.on("blur", this.onBlur = function() { closingOnBlur = setTimeout(function() { completion.close(); }, 100); });
      cm.on("focus", this.onFocus = function() { clearTimeout(closingOnBlur); });
    }

    cm.on("scroll", this.onScroll = function() {
      var curScroll = cm.getScrollInfo(), editor = cm.getWrapperElement().getBoundingClientRect();
      var newTop = top + startScroll.top - curScroll.top;
      var point = newTop - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
      if (!below) point += hints.offsetHeight;
      if (point <= editor.top || point >= editor.bottom) return completion.close();
      hints.style.top = newTop + "px";
      hints.style.left = (left + startScroll.left - curScroll.left) + "px";
    });

    CodeMirror.on(hints, "dblclick", function(e) {
      var t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) {widget.changeActive(t.hintId); widget.pick();}
    });

    CodeMirror.on(hints, "click", function(e) {
      var t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) {
        widget.changeActive(t.hintId);
        if (completion.options.completeOnSingleClick) widget.pick();
      }
    });

    CodeMirror.on(hints, "mousedown", function() {
      setTimeout(function(){cm.focus();}, 20);
    });

    CodeMirror.signal(data, "select", completions[this.selectedHint], hints.childNodes[this.selectedHint]);
    return true;
  }

  Widget.prototype = {
    close: function() {
      if (this.completion.widget != this) return;
      this.completion.widget = null;
      this.hints.parentNode.removeChild(this.hints);
      this.completion.cm.removeKeyMap(this.keyMap);

      var cm = this.completion.cm;
      if (this.completion.options.closeOnUnfocus) {
        cm.off("blur", this.onBlur);
        cm.off("focus", this.onFocus);
      }
      cm.off("scroll", this.onScroll);
    },

    disable: function() {
      this.completion.cm.removeKeyMap(this.keyMap);
      var widget = this;
      this.keyMap = {Enter: function() { widget.picked = true; }};
      this.completion.cm.addKeyMap(this.keyMap);
    },

    pick: function() {
      this.completion.pick(this.data, this.selectedHint);
    },

    changeActive: function(i, avoidWrap) {
      if (i >= this.data.list.length)
        i = avoidWrap ? this.data.list.length - 1 : 0;
      else if (i < 0)
        i = avoidWrap ? 0  : this.data.list.length - 1;
      if (this.selectedHint == i) return;
      var node = this.hints.childNodes[this.selectedHint];
      if (node) node.className = node.className.replace(" " + ACTIVE_HINT_ELEMENT_CLASS, "");
      node = this.hints.childNodes[this.selectedHint = i];
      node.className += " " + ACTIVE_HINT_ELEMENT_CLASS;
      if (node.offsetTop < this.hints.scrollTop)
        this.hints.scrollTop = node.offsetTop - 3;
      else if (node.offsetTop + node.offsetHeight > this.hints.scrollTop + this.hints.clientHeight)
        this.hints.scrollTop = node.offsetTop + node.offsetHeight - this.hints.clientHeight + 3;
      CodeMirror.signal(this.data, "select", this.data.list[this.selectedHint], node);
    },

    screenAmount: function() {
      return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1;
    }
  };

  function applicableHelpers(cm, helpers) {
    if (!cm.somethingSelected()) return helpers
    var result = []
    for (var i = 0; i < helpers.length; i++)
      if (helpers[i].supportsSelection) result.push(helpers[i])
    return result
  }

  function fetchHints(hint, cm, options, callback) {
    if (hint.async) {
      hint(cm, callback, options)
    } else {
      var result = hint(cm, options)
      if (result && result.then) result.then(callback)
      else callback(result)
    }
  }

  function resolveAutoHints(cm, pos) {
    var helpers = cm.getHelpers(pos, "hint"), words
    if (helpers.length) {
      var resolved = function(cm, callback, options) {
        var app = applicableHelpers(cm, helpers);
        function run(i) {
          if (i == app.length) return callback(null)
          fetchHints(app[i], cm, options, function(result) {
            if (result && result.list.length > 0) callback(result)
            else run(i + 1)
          })
        }
        run(0)
      }
      resolved.async = true
      resolved.supportsSelection = true
      return resolved
    } else if (words = cm.getHelper(cm.getCursor(), "hintWords")) {
      return function(cm) { return CodeMirror.hint.fromList(cm, {words: words}) }
    } else if (CodeMirror.hint.anyword) {
      return function(cm, options) { return CodeMirror.hint.anyword(cm, options) }
    } else {
      return function() {}
    }
  }

  CodeMirror.registerHelper("hint", "auto", {
    resolve: resolveAutoHints
  });

  CodeMirror.registerHelper("hint", "fromList", function(cm, options) {
    var cur = cm.getCursor(), token = cm.getTokenAt(cur)
    var term, from = CodeMirror.Pos(cur.line, token.start), to = cur
    if (token.start < cur.ch && /\w/.test(token.string.charAt(cur.ch - token.start - 1))) {
      term = token.string.substr(0, cur.ch - token.start)
    } else {
      term = ""
      from = cur
    }
    var found = [];
    for (var i = 0; i < options.words.length; i++) {
      var word = options.words[i];
      if (word.slice(0, term.length) == term)
        found.push(word);
    }

    if (found.length) return {list: found, from: from, to: to};
  });

  CodeMirror.commands.autocomplete = CodeMirror.showHint;

  var defaultOptions = {
    hint: CodeMirror.hint.auto,
    completeSingle: true,
    alignWithWord: true,
    closeCharacters: /[\s()\[\]{};:>,]/,
    closeOnUnfocus: true,
    completeOnSingleClick: true,
    container: null,
    customKeys: null,
    extraKeys: null
  };

  CodeMirror.defineOption("hintOptions", null);
});

//////////File Source js/codemirror/anyword-hint.js
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function(mod) {
    // if (typeof exports == "object" && typeof module == "object") // CommonJS
    //     mod(require("../../lib/codemirror"));
    // else if (typeof define == "function" && define.amd) // AMD
    //     define(["../../lib/codemirror"], mod);
    // else // Plain browser env
        // mod(CodeMirror);
})(function(CodeMirror) {
        "use strict";

        var WORD = /[\w$#]+/,
            RANGE = 500;

        var PRELUDE_COMMAND_WORDS = [
            "METADATA",//tag
            ["author", "Gill Bloggs", "Your name goes here. This will appear in the title screen of the game."],
            ["color_palette", "arne", "By default, when you use colour names, they are pulled from a variation of <a href='http://androidarts.com/palette/16pal.htm'>Arne</a>'s 16-Colour palette. However, there are other palettes to choose from: <p> <ul> <li>1 - mastersystem </li> <li>2 - gameboycolour </li> <li>3 - amiga </li> <li>4 - arnecolors </li> <li>5 - famicom </li> <li>6 - atari </li> <li>7 - pastel </li> <li>8 - ega </li> <li>9 - amstrad </li> <li>10 - proteus_mellow </li> <li>11 - proteus_rich </li> <li>12 - proteus_night </li> <li>13 - c64 </li> <li>14 - whitingjp </li> </ul> <p> (you can also refer to them by their numerical index)"],
            ["again_interval", "0.1", "The amount of time it takes an 'again' event to trigger."],
            ["background_color", "blue", "Can accept a color name or hex code (in the form #412bbc). Controls the background color of title/message screens, as well as the background color of the website. Text_color is its sibling."],
            ["debug", "", "This outputs the compiled instructions whenever you build your file."],
            ["flickscreen", "8x5", "Setting flickscreen divides each level into WxH grids, and zooms the camera in so that the player can only see one at a time"],
            ["homepage", "www.puzzlescript.net", "A link to your homepage!"],
            ["key_repeat_interval", "0.1", "When you hold down a key, how long is the delay between repeated presses getting sent to the game (in seconds)?"],
            ["noaction", "", "Hides the action key (X) instruction from the title screen, and does not respond when the player pressed it (outside of menus and cutscenes and the like)."],
            ["norepeat_action", "", "The action button will only respond to individual presses, and not auto-trigger when held down."],
            ["noundo", "", "Disables the undo key (Z)"],
            ["norestart", "", "Disables the restart key (R)"],
            ["realtime_interval", "", "The number indicates how long each realtime frame should be."],
            ["require_player_movement", "", "If the player doesn't move, cancel the whole move."],
            ["run_rules_on_level_start", "", "Applies the rules once on level-load, before the player has moved"],
            ["scanline", "", "Applies a scanline visual effect"],
            ["text_color", "orange", "Can accept a color name or hex code (in the form #412bbc). Controls the font color of title/message screens, as well as the font color in the website. Background_color is its sibling."],
            ["title", "My Amazing Puzzle Game", "The name of your game. Appears on the title screen."],
            ["throttle_movement", "", "For use in conjunction with realtime_interval - this stops you from moving crazy fast - repeated keypresses of the same movement direction will not increase your speed. This doesn't apply to the action button."],
            ["verbose_logging", "", "As you play the game, spits out information about all rules applied as you play"],
            ["zoomscreen", "WxH", "Zooms the camera in to a WxH section of the map around the player, centered on the player."]
        ];

        var COLOR_WORDS = [
            "COLOR",//special tag
            "black", "white", "darkgray", "lightgray", "gray", "red", "darkred", "lightred", "brown", "darkbrown", "lightbrown", "orange", "yellow", "green", "darkgreen", "lightgreen", "blue", "lightblue", "darkblue", "purple", "pink", "transparent"];
        var RULE_COMMAND_WORDS = [
            "COMMAND",
            "sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "cancel", "checkpoint", "restart", "win", "message", "again"];

        var CARDINAL_DIRECTION_WORDS = [
            "DIRECTION",
            "up","down","left","right","horizontal","vertical"]

        var RULE_DIRECTION_WORDS = [
            "DIRECTION",//tag
            "up", "down", "left", "right", "random", "horizontal", "vertical","late","rigid"]

        var LOOP_WORDS = [
            "BRACKET",//tag
            "startloop","endloop"]
            
        var PATTERN_DIRECTION_WORDS = [
            "DIRECTION",
            "up", "down", "left", "right", "moving", "stationary", "no", "randomdir", "random", "horizontal", "vertical", "orthogonal", "perpendicular", "parallel", "action"]

        var SOUND_WORDS = [
            "SOUNDVERB",
            "titlescreen", "startgame", "cancel", "endgame", "startlevel", "undo", "restart", "endlevel", "showmessage", "closemessage", "sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "create", "destroy", "move", "cantmove", "action"];

        var WINCONDITION_WORDS = [
            "LOGICWORD",
            "some", "on", "no", "all"]

        var LEGEND_LOGICWORDS = [
                "LOGICWORD",
                "and","or"
            ]

        var PRELUDE_COLOR_PALETTE_WORDS = [
            "mastersystem", "gameboycolour", "amiga", "arnecolors", "famicom", "atari", "pastel", "ega", "amstrad", "proteus_mellow", "proteus_rich", "proteus_night", "c64", "whitingjp"
        ]

        function renderHint(elt,data,cur){
            var t1=cur.text;
            var t2=cur.extra;
            var tag=cur.tag;
            if (t1.length==0){
                t1=cur.extra;
                t2=cur.text;
            }
            var wrapper = document.createElement("span")
            wrapper.className += " cm-s-midnight ";

            var h = document.createElement("span")                // Create a <h1> element
            // h.style.color="white";
            var t = document.createTextNode(t1);     // Create a text node

            h.appendChild(t);   
            wrapper.appendChild(h); 

            if (tag!=null){
                h.className += "cm-" + tag;
            }

            elt.appendChild(wrapper);//document.createTextNode(cur.displayText || getText(cur)));

            if (t2.length>0){
                var h2 = document.createElement("span")                // Create a <h1> element
                h2.style.color="orange";
                var t2 = document.createTextNode(" "+t2);     // Create a text node
                h2.appendChild(t2);  
                h2.style.color="orange";
                elt.appendChild(t2);
            }
        }

        CodeMirror.registerHelper("hint", "anyword", function(editor, options) {

            var word = options && options.word || WORD;
            var range = options && options.range || RANGE;
            var cur = editor.getCursor(),
                curLine = editor.getLine(cur.line);

            var end = cur.ch,
                start = end;

            var lineToCursor = curLine.substr(0,end);

            while (start && word.test(curLine.charAt(start - 1))) --start;
            var curWord = start != end && curLine.slice(start, end);

            var tok = editor.getTokenAt(cur);
            var state = tok.state;

            // ignore empty word
            if (!curWord || state.commentLevel>0) {
                // if ( 
                //         ( state.section=="" && curLine.trim()=="")  
                //         // || ( state.section=="objects" && state.objects_section==2 ) 
                //     ) {
                //     curWord="";
                // } else {
                    return {
                        list: []
                    };
                // }            
            }

            var addObjects = false;
            var excludeProperties = false;
            var excludeAggregates = false;
            var candlists = [];
            switch (state.section) {
                case 'objects':
                    {
                        if (state.objects_section==2){
                            candlists.push(COLOR_WORDS);
                        }
                        break;
                    }
                case 'legend':
                    {
                        if (lineToCursor.indexOf('=')>=0){
                            if ((lineToCursor.trim().split(/\s+/ ).length%2)===1){
                                addObjects=true;
                            } else {
                                candlists.push(LEGEND_LOGICWORDS);                      
                            }
                        } //no hints before equals
                        break;
                    }
                case 'sounds':
                    {
                        candlists.push(CARDINAL_DIRECTION_WORDS);
                        candlists.push(SOUND_WORDS);
                        addObjects=true;
                        excludeAggregates=true;
                        break;
                    }
                case 'collisionlayers':
                    {
                        addObjects=true;
                        break;
                    }
                case 'rules':
                    {   
                        //if inside of roles,can use some extra directions
                        if (lineToCursor.indexOf("[")==-1) {
                            candlists.push(RULE_DIRECTION_WORDS);
                            candlists.push(LOOP_WORDS);
                        } else {
                            candlists.push(PATTERN_DIRECTION_WORDS);                            
                        }
                        if (lineToCursor.indexOf("->")>=0) {
                            candlists.push(RULE_COMMAND_WORDS);
                        }
                        addObjects=true;
                        break;
                    }
                case 'winconditions':
                    {
                        if ((lineToCursor.trim().split(/\s+/ ).length%2)===0){
                            addObjects=true;
                        }
                        candlists.push(WINCONDITION_WORDS);
                        break;
                    }
                case 'levels':
                    {
                        if ("message".indexOf(lineToCursor.trim())===0) {
                            candlists.push(["MESSAGE_VERB","message"]);
                        }
                        break;
                    }
                default: //preamble
                    {
                        var lc = lineToCursor.toLowerCase();
                        if (lc.indexOf("background_color")>=0 ||
                            lc.indexOf("text_color")>=0) {
                            candlists.push(COLOR_WORDS);
                        } else {
                            var linewords =lineToCursor.trim().split(/\s+/ );

                            if (linewords.length<2) {
                                candlists.push(PRELUDE_COMMAND_WORDS);
                            } else if (linewords.length==2 && linewords[0].toLowerCase()=='color_palette'){
                                candlists.push(PRELUDE_COLOR_PALETTE_WORDS);
                            }
                        }

                        break;
                    }
            }
            // case insensitive
            curWord = curWord.toLowerCase();

            var list = options && options.list || [],
                seen = {};

            //first, add objects if needed
            if (addObjects){
                var obs = state.objects;
                for (var key in obs) {
                    if (obs.hasOwnProperty(key)) {
                        var w = key;
                        var matchWord = w.toLowerCase();
                        // if (matchWord === curWord) continue;
                        if ((!curWord || matchWord.lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, matchWord)) {
                            seen[matchWord] = true;
                            var hint = state.original_case_names[w]; 
                            list.push({text:hint,extra:"",tag:"NAME",render:renderHint});
                        }
                    }
                }

                var legendbits = [state.legend_synonyms];
                if (!excludeProperties){
                    legendbits.push(state.legend_properties);
                }
                if (!excludeAggregates){
                    legendbits.push(state.legend_aggregates);
                }

                //go throuhg all derived objects
                for (var i=0;i<legendbits.length;i++){
                    var lr = legendbits[i];
                    for (var j=0;j<lr.length;j++){
                        var w = lr[j][0];
                        var matchWord = w.toLowerCase();
                        // if (matchWord === curWord) continue;
                        if ((!curWord || matchWord.lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, matchWord)) {
                            seen[matchWord] = true;
                            var hint = state.original_case_names[w]; 
                            list.push({text:hint,extra:"",tag:"NAME",render:renderHint});
                        }
                    }
                }

            }

            // go through random names
            for (var i = 0; i < candlists.length; i++) {
                var candlist = candlists[i]
                var tag = candlist[0];
                for (var j = 1; j < candlist.length; j++) {
                    var m = candlist[j];
                    var orig = m;
                    var extra=""
                    if (typeof m !== 'string'){
                        if (m.length>1){
                            extra=m[1]
                        }
                        m=m[0];
                    }
                    var matchWord=m;
                    var matchWord = matchWord.toLowerCase();
                    // if (matchWord === curWord) continue;
                    if ((!curWord || matchWord.lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, matchWord)) {
                        seen[matchWord] = true;

                        var mytag = tag;
                        if (mytag==="COLOR"){
                            mytag = "COLOR-"+m.toUpperCase();
                        }                    

                        list.push({text:m,extra:extra,tag:mytag,render:renderHint});
                    }
                }
            }
            

            //state.legend_aggregates
            //state.legend_synonyms
            //state.legend_properties
            //state.objects

            return {
                list: list,
                from: CodeMirror.Pos(cur.line, start),
                to: CodeMirror.Pos(cur.line, end)
            };
        });

    // https://statetackoverflow.com/questions/13744176/codemirror-autocomplete-after-any-keyup
    CodeMirror.ExcludedIntelliSenseTriggerKeys = {
        "9": "tab",
        "13": "enter",
        "16": "shift",
        "17": "ctrl",
        "18": "alt",
        "19": "pause",
        "20": "capslock",
        "27": "escape",
        "33": "pageup",
        "34": "pagedown",
        "35": "end",
        "36": "home",
        "37": "left",
        "38": "up",
        "39": "right",
        "40": "down",
        "45": "insert",
        "91": "left window key",
        "92": "right window key",
        "93": "select",
        "107": "add",
        "109": "subtract",
        "110": "decimal point",
        "111": "divide",
        "112": "f1",
        "113": "f2",
        "114": "f3",
        "115": "f4",
        "116": "f5",
        "117": "f6",
        "118": "f7",
        "119": "f8",
        "120": "f9",
        "121": "f10",
        "122": "f11",
        "123": "f12",
        "144": "numlock",
        "145": "scrolllock",
        "186": "semicolon",
        "187": "equalsign",
        "188": "comma",
        "189": "dash",
        "190": "period",
        "191": "slash",
        "192": "graveaccent",
        "220": "backslash",
        "222": "quote"
    }
});

//////////File Source js/codemirror/comment.js
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  // if (typeof exports == "object" && typeof module == "object") // CommonJS
  //   mod(require("../../lib/codemirror"));
  // else if (typeof define == "function" && define.amd) // AMD
  //   define(["../../lib/codemirror"], mod);
  // else // Plain browser env
    // mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var noOptions = {
    lineComment:"//",
  };
  var nonWS = /[^\s\u00a0]/;
  var Pos = CodeMirror.Pos, cmp = CodeMirror.cmpPos;

  function firstNonWS(str) {
    var found = str.search(nonWS);
    return found == -1 ? 0 : found;
  }

  CodeMirror.commands.toggleComment = function(cm) {
    cm.toggleComment();
  };

  CodeMirror.defineExtension("toggleComment", function(options) {
    if (!options) options = noOptions;
    var cm = this;
    var minLine = Infinity, ranges = this.listSelections(), mode = null;
    for (var i = ranges.length - 1; i >= 0; i--) {
      var from = ranges[i].from(), to = ranges[i].to();
      if (from.line >= minLine) continue;
      if (to.line >= minLine) to = Pos(minLine, 0);
      minLine = from.line;
      if (mode == null) {
        if (cm.uncomment(from, to, options)) mode = "un";
        else { cm.lineComment(from, to, options); mode = "line"; }
      } else if (mode == "un") {
        cm.uncomment(from, to, options);
      } else {
        cm.lineComment(from, to, options);
      }
    }
  });

  // Rough heuristic to try and detect lines that are part of multi-line string
  function probablyInsideString(cm, pos, line) {
    return /\bstring\b/.test(cm.getTokenTypeAt(Pos(pos.line, 0))) && !/^[\'\"\`]/.test(line)
  }

  function getMode(cm, pos) {
    var mode = cm.getMode()
    return mode.useInnerComments === false || !mode.innerMode ? mode : cm.getModeAt(pos)
  }

  CodeMirror.defineExtension("lineComment", function(from, to, options) {
    if (!options) options = noOptions;
    var self = this, mode = getMode(self, from);
    var firstLine = self.getLine(from.line);
    if (firstLine == null || probablyInsideString(self, from, firstLine)) return;

    var commentStart = "(";
    var commentEnd = ")";

    var end = Math.min(to.ch != 0 || to.line == from.line ? to.line + 1 : to.line, self.lastLine() + 1);
    var pad = options.padding == null ? " " : options.padding;
    var blankLines = options.commentBlankLines || from.line == to.line;

    self.operation(function() {
      
        for (var i = from.line; i < end; ++i) {
          var l = self.getLine(i);
          if (blankLines || nonWS.test(l)){
            self.replaceRange(commentStart + pad, Pos(i, 0));
            l = self.getLine(i);

            self.replaceRange(pad+commentEnd, Pos(i, l.length));
          }
      
      }
    });
  });

  CodeMirror.defineExtension("uncomment", function(from, to, options) {
    if (!options) options = noOptions;
    var self = this, mode = getMode(self, from);
    var end = Math.min(to.ch != 0 || to.line == from.line ? to.line : to.line - 1, self.lastLine()), start = Math.min(from.line, end);

    // Try finding line comments
    var commentStart = "(";
    var commentEnd = ")";
    var lines = [];
    var pad = options.padding == null ? " " : options.padding, didSomething;
    lineComment: {
      for (var i = start; i <= end; ++i) {
        var line = self.getLine(i);
        
        var found_s = line.indexOf(commentStart);
        var found_e = line.lastIndexOf(commentEnd);

        if (found_s > -1 && !/comment/.test(self.getTokenTypeAt(Pos(i, found_s + 1)))) found_s = -1;
        if (found_s == -1 && nonWS.test(line)) break lineComment;
        if (found_s > -1 && nonWS.test(line.slice(0, found_s))) break lineComment;
        
        
        if (found_e > -1 && !/comment/.test(self.getTokenTypeAt(Pos(i, found_e )))) found_e = -1;
        if (found_e == -1 && nonWS.test(line)) break lineComment;
        if (found_e > -1 && nonWS.test(line.slice(found_e+1))) break lineComment;

        lines.push(line);
      }
      self.operation(function() {
        for (var i = start; i <= end; ++i) {
          var line = lines[i - start];
          var pos_s = line.indexOf(commentStart), endPos_s = pos_s + commentStart.length;
          var pos_e = line.indexOf(commentEnd), endPos_e = pos_e + commentEnd.length;

          if (pos_s < 0 || pos_e < 0) continue;


          if (line.slice(endPos_e-1-pad.length, endPos_e-1) == pad) pos_e -= pad.length;
          if (line.slice(endPos_s, endPos_s + pad.length) == pad) endPos_s += pad.length;
          didSomething = true;
          self.replaceRange("", Pos(i, pos_e), Pos(i, endPos_e));
          self.replaceRange("", Pos(i, pos_s), Pos(i, endPos_s));
        }
      });
      if (didSomething) return true;
    }
    
    return false;
  });
});

//////////File Source js/colors.js
colorPalettesAliases = {
	1 : "mastersystem",
	2 : "gameboycolour",
	3 : "amiga",
	4 : "arnecolors",
	5 : "famicom",
	6 : "atari",
	7 : "pastel",
	8 : "ega",
	9 : "amstrad",
	10 : "proteus_mellow",
	11 : "proteus_rich",
	12 : "proteus_night",
	13 : "c64",
	14 : "whitingjp"
};

colorPalettes = {
	mastersystem : {
	black   		: "#000000",
	white			: "#FFFFFF",
	grey			: "#555555",
	darkgrey		: "#555500",
	lightgrey		: "#AAAAAA",
	gray			: "#555555",
	darkgray		: "#555500",
	lightgray		: "#AAAAAA",
	red				: "#FF0000",
	darkred			: "#AA0000",
	lightred		: "#FF5555",
	brown			: "#AA5500",
	darkbrown		: "#550000",
	lightbrown		: "#FFAA00",
	orange			: "#FF5500",
	yellow 			: "#FFFF55",
	green			: "#55AA00",
	darkgreen		: "#005500",
	lightgreen		: "#AAFF00",
	blue			: "#5555AA",
	lightblue		: "#AAFFFF",
	darkblue		: "#000055",
	purple			: "#550055",
	pink			: "#FFAAFF"
	},

	gameboycolour : {
	black   		: "#000000",
	white			: "#FFFFFF",
	grey			: "#7F7F7C",
	darkgrey		: "#3E3E44",
	lightgrey		: "#BAA7A7",
	gray			: "#7F7F7C",
	darkgray		: "#3E3E44",
	lightgray		: "#BAA7A7",
	red				: "#A7120C",
	darkred			: "#880606",
	lightred		: "#BA381F",
	brown			: "#57381F",
	darkbrown		: "#3E2519",
	lightbrown		: "#8E634B",
	orange			: "#BA4B32",
	yellow 			: "#C0BA6F",
	green			: "#517525",
	darkgreen		: "#385D12",
	lightgreen		: "#6F8E44",
	blue			: "#5D6FA7",
	lightblue		: "#8EA7A7",
	darkblue		: "#4B575D",
	purple			: "#3E3E44",
	pink			: "#BA381F"
	},

	amiga : {
	black   		: "#000000",
	white			: "#FFFFFF",
	grey			: "#BBBBBB",
	darkgrey		: "#333333",
	lightgrey		: "#FFEEDD",
	gray			: "#BBBBBB",
	darkgray		: "#333333",
	lightgray		: "#FFEEDD",
	red				: "#DD1111",
	darkred			: "#990000",
	lightred		: "#FF4422",
	brown			: "#663311",
	darkbrown		: "#331100",
	lightbrown		: "#AA6644",
	orange			: "#FF6644",
	yellow 			: "#FFDD66",
	green			: "#448811",
	darkgreen		: "#335500",
	lightgreen		: "#88BB77",
	blue			: "#8899DD",
	lightblue		: "#BBDDEE",
	darkblue		: "#666688",
	purple			: "#665555",
	pink			: "#997788"
	},

	arnecolors : {
	black   		: "#000000",
	white			: "#FFFFFF",
	grey			: "#9d9d9d",
	darkgrey		: "#697175",
	lightgrey		: "#cccccc",
	gray			: "#9d9d9d",
	darkgray		: "#697175",
	lightgray		: "#cccccc",
	red				: "#be2633",
	darkred			: "#732930",
	lightred		: "#e06f8b",
	brown			: "#a46422",
	darkbrown		: "#493c2b",
	lightbrown		: "#eeb62f",
	orange			: "#eb8931",
	yellow 			: "#f7e26b",
	green			: "#44891a",
	darkgreen		: "#2f484e",
	lightgreen		: "#a3ce27",
	blue			: "#1d57f7",
	lightblue		: "#B2DCEF",
	darkblue		: "#1B2632",
	purple			: "#342a97",
	pink			: "#de65e2"
	},
	famicom : {
	black   		: "#000000",
	white			: "#ffffff",
	grey			: "#7c7c7c",
	darkgrey		: "#080808",
	lightgrey		: "#bcbcbc",
	gray			: "#7c7c7c",
	darkgray		: "#080808",
	lightgray		: "#bcbcbc",
	red				: "#f83800",
	darkred			: "#881400",
	lightred		: "#f87858",
	brown			: "#AC7C00",
	darkbrown		: "#503000",
	lightbrown		: "#FCE0A8",
	orange			: "#FCA044",
	yellow 			: "#F8B800",
	green			: "#00B800",
	darkgreen		: "#005800",
	lightgreen		: "#B8F8B8",
	blue			: "#0058F8",
	lightblue		: "#3CBCFC",
	darkblue		: "#0000BC",
	purple			: "#6644FC",
	pink			: "#F878F8"
	},

	atari : {
	black   		: "#000000",
	white			: "#FFFFFF",
	grey			: "#909090",
	darkgrey		: "#404040",
	lightgrey		: "#b0b0b0",
	gray			: "#909090",
	darkgray		: "#404040",
	lightgray		: "#b0b0b0",
	red				: "#A03C50",
	darkred			: "#700014",
	lightred		: "#DC849C",
	brown			: "#805020",
	darkbrown		: "#703400",
	lightbrown		: "#CB9870",
	orange			: "#CCAC70",
	yellow 			: "#ECD09C",
	green			: "#58B06C",
	darkgreen		: "#006414",
	lightgreen		: "#70C484",
	blue			: "#1C3C88",
	lightblue		: "#6888C8",
	darkblue		: "#000088",
	purple			: "#3C0080",
	pink			: "#B484DC"
	},
	pastel : {
	black   		: "#000000",
	white			: "#FFFFFF",
	grey			: "#3e3e3e",
	darkgrey		: "#313131",
	lightgrey		: "#9cbcbc",
	gray			: "#3e3e3e",
	darkgray		: "#313131",
	lightgray		: "#9cbcbc",
	red				: "#f56ca2",
	darkred			: "#a63577",
	lightred		: "#ffa9cf",
	brown			: "#b58c53",
	darkbrown		: "#787562",
	lightbrown		: "#B58C53",
	orange			: "#EB792D",
	yellow 			: "#FFe15F",
	green			: "#00FF4F",
	darkgreen		: "#2b732c",
	lightgreen		: "#97c04f",
	blue			: "#0f88d3",
	lightblue		: "#00fffe",
	darkblue		: "#293a7b",
	purple			: "#ff6554",
	pink			: "#eb792d"
	},
	ega : {
	black   		: "#000000",
	white			: "#ffffff",
	grey			: "#555555",
	darkgrey		: "#555555",
	lightgrey		: "#aaaaaa",
	gray			: "#555555",
	darkgray		: "#555555",
	lightgray		: "#aaaaaa",
	red				: "#ff5555",
	darkred			: "#aa0000",
	lightred		: "#ff55ff",
	brown			: "#aa5500",
	darkbrown		: "#aa5500",
	lightbrown		: "#ffff55",
	orange			: "#ff5555",
	yellow 			: "#ffff55",
	green			: "#00aa00",
	darkgreen		: "#00aaaa",
	lightgreen		: "#55ff55",
	blue			: "#5555ff",
	lightblue		: "#55ffff",
	darkblue		: "#0000aa",
	purple			: "#aa00aa",
	pink			: "#ff55ff"
	},


	proteus_mellow : {
	black   		: "#3d2d2e",
	white			: "#ddf1fc",
	grey			: "#9fb2d4",
	darkgrey		: "#7b8272",
	lightgrey		: "#a4bfda",
	gray			: "#9fb2d4",
	darkgray		: "#7b8272",
	lightgray		: "#a4bfda",
	red				: "#9d5443",
	darkred			: "#8c5b4a",
	lightred		: "#94614c",
	brown			: "#89a78d",
	darkbrown		: "#829e88",
	lightbrown		: "#aaae97",
	orange			: "#d1ba86",
	yellow 			: "#d6cda2",
	green			: "#75ac8d",
	darkgreen		: "#8fa67f",
	lightgreen		: "#8eb682",
	blue			: "#88a3ce",
	lightblue		: "#a5adb0",
	darkblue		: "#5c6b8c",
	purple			: "#d39fac",
	pink			: "#c8ac9e"
	},
	

	proteus_night : {
	black   		: "#010912",
	white			: "#fdeeec",
	grey			: "#051d40",
	darkgrey		: "#091842",
	lightgrey		: "#062151",
	gray			: "#051d40",
	darkgray		: "#091842",
	lightgray		: "#062151",
	red				: "#ad4576",
	darkred			: "#934765",
	lightred		: "#ab6290",
	brown			: "#61646b",
	darkbrown		: "#3d2d2d",
	lightbrown		: "#8393a0",
	orange			: "#0a2227",
	yellow 			: "#0a2541",
	green			: "#75ac8d",
	darkgreen		: "#0a2434",
	lightgreen		: "#061f2e",
	blue			: "#0b2c79",
	lightblue		: "#809ccb",
	darkblue		: "#08153b",
	purple			: "#666a87",
	pink			: "#754b4d"
	},
	


	proteus_rich: {
	black   		: "#6f686f",
	white			: "#d1b1e2",
	grey			: "#b9aac1",
	darkgrey		: "#8e8b84",
	lightgrey		: "#c7b5cd",
	gray			: "#b9aac1",
	darkgray		: "#8e8b84",
	lightgray		: "#c7b5cd",
	red				: "#a11f4f",
	darkred			: "#934765",
	lightred		: "#c998ad",
	brown			: "#89867d",
	darkbrown		: "#797f75",
	lightbrown		: "#ab9997",
	orange			: "#ce8c5c",
	yellow 			: "#f0d959",
	green			: "#75bc54",
	darkgreen		: "#599d79",
	lightgreen		: "#90cf5c",
	blue			: "#8fd0ec",
	lightblue		: "#bcdce7",
	darkblue		: "#0b2c70",
	purple			: "#9b377f",
	pink			: "#cd88e5"
	},
	

	
amstrad : {
	black   		: "#000000",
	white			: "#ffffff",
	grey			: "#7f7f7f",
	darkgrey		: "#636363",
	lightgrey		: "#afafaf",
	gray			: "#7f7f7f",
	darkgray		: "#636363",
	lightgray		: "#afafaf",
	red				: "#ff0000",
	darkred			: "#7f0000",
	lightred		: "#ff7f7f",
	brown			: "#ff7f00",
	darkbrown		: "#7f7f00",
	lightbrown		: "#ffff00",
	orange			: "#ff007f",
	yellow 			: "#ffff7f",
	green			: "#01ff00",
	darkgreen		: "#007f00",
	lightgreen		: "#7fff7f",
	blue			: "#0000ff",
	lightblue		: "#7f7fff",
	darkblue		: "#00007f",
	purple			: "#7f007f",
	pink			: "#ff7fff"
	},
c64 : {
	black   		: "#000000",
	white			: "#ffffff",
	grey			: "#6C6C6C",
	darkgrey		: "#444444",
	lightgrey		: "#959595",
	gray			: "#6C6C6C",
	darkgray		: "#444444",
	lightgray		: "#959595",
	red				: "#68372B",
	darkred			: "#3f1e17",
	lightred		: "#9A6759",
	brown			: "#433900",
	darkbrown		: "#221c02",
	lightbrown		: "#6d5c0d",
	orange			: "#6F4F25",
	yellow 			: "#B8C76F",
	green			: "#588D43",
	darkgreen		: "#345129",
	lightgreen		: "#9AD284",
	blue			: "#6C5EB5",
	lightblue		: "#70A4B2",
	darkblue		: "#352879",
	purple			: "#6F3D86",
	pink			: "#b044ac"
},
whitingjp : {
  black       : "#202527",
  white       : "#eff8fd",
  grey        : "#7b7680",
  darkgrey    : "#3c3b44",
  lightgrey   : "#bed0d7",
  gray        : "#7b7680",
  darkgray    : "#3c3b44",
  lightgray   : "#bed0d7",
  red         : "#bd194b",
  darkred     : "#6b1334",
  lightred    : "#ef2358",
  brown       : "#b52e1c",
  darkbrown   : "#681c12",
  lightbrown  : "#e87b45",
  orange      : "#ff8c10",
  yellow      : "#fbd524",
  green       : "#36bc3c",
  darkgreen   : "#317610",
  lightgreen  : "#8ce062",
  blue        : "#3f62c6",
  lightblue   : "#57bbe0",
  darkblue    : "#2c2fa0",
  purple      : "#7037d9",
  pink        : "#ec2b8f"
}
};

var reg_color_names = /(black|white|darkgray|lightgray|gray|grey|darkgrey|lightgrey|red|darkred|lightred|brown|darkbrown|lightbrown|orange|yellow|green|darkgreen|lightgreen|blue|lightblue|darkblue|purple|pink|transparent)\s*/;

var reg_color = /(black|white|gray|darkgray|lightgray|grey|darkgrey|lightgrey|red|darkred|lightred|brown|darkbrown|lightbrown|orange|yellow|green|darkgreen|lightgreen|blue|lightblue|darkblue|purple|pink|transparent|#(?:[0-9a-f]{3}){1,2})\s*/;






//////////File Source js/graphics.js
function createSprite(name,spritegrid, colors, padding) {
	if (colors === undefined) {
		colors = [state.bgcolor, state.fgcolor];
	}

	var sprite = makeSpriteCanvas(name);
	var spritectx = sprite.getContext('2d');

    spritectx.clearRect(0, 0, cellwidth, cellheight);

	var w = spritegrid[0].length;
	var h = spritegrid.length;
	var cw = ~~(cellwidth / (w + (padding|0)));
    var ch = ~~(cellheight / (h + (padding|0)));
    var pixh=ch;
    if ("scanline" in state.metadata) {
        pixh=Math.ceil(ch/2);
    }
    spritectx.fillStyle = state.fgcolor;
    for (var j = 0; j < h; j++) {
        for (var k = 0; k < w; k++) {
            var val = spritegrid[j][k];
            if (val >= 0) {
                var cy = (j * ch)|0;
                var cx = (k * cw)|0;
                spritectx.fillStyle = colors[val];
                spritectx.fillRect(cx, cy, cw, pixh);
            }
        }
    }

    return sprite;
}

function regenText(spritecanvas,spritectx) {
	textImages={};

	for (var n in font) {
		if (font.hasOwnProperty(n)) {
			textImages[n] = createSprite('char'+n,font[n], undefined, 1);
		}
	}
}

var editor_s_grille=[[0,1,1,1,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,1,1,1,0]];

var spriteimages;
function regenSpriteImages() {
	if (textMode) {
		regenText();
		return;
	} else if (levelEditorOpened) {
        textImages['editor_s'] = createSprite('chars',editor_s_grille,undefined);
    }
    
    if (state.levels.length===0) {
        return;
    }
    spriteimages = [];

    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i] == undefined) {
            continue;
        }
        spriteimages[i] = createSprite(i.toString(),sprites[i].dat, sprites[i].colors);
    }

    if (canOpenEditor) {
    	generateGlyphImages();
    }
}

var glyphImagesCorrespondance;
var glyphImages;
var glyphHighlight;
var glyphHighlightResize;
var glyphPrintButton;
var glyphMouseOver;
var glyphSelectedIndex=0;
var editorRowCount=1;

var canvasdict={};
function makeSpriteCanvas(name) {
    return;
    var canvas;
    if (name in canvasdict) {
        canvas = canvasdict[name];
    } else {
        canvas = document.createElement('canvas');
        canvasdict[name]=canvas;
    }
	canvas.width = cellwidth;
	canvas.height = cellheight;
	return canvas;
}


function generateGlyphImages() {
    if (cellwidth===0||cellheight===0) {
        return;
    }
	glyphImagesCorrespondance=[];
	glyphImages=[];
	
	for (var n in state.glyphDict) {
		if (n.length==1 && state.glyphDict.hasOwnProperty(n)) {
			var g=state.glyphDict[n];
			var sprite = makeSpriteCanvas("C"+n)
			var spritectx = sprite.getContext('2d');
			glyphImagesCorrespondance.push(n);
			for (var i=0;i<g.length;i++){
				var id = g[i];
				if (id===-1) {
					continue;
				}
				spritectx.drawImage(spriteimages[id], 0, 0);
			}
			glyphImages.push(sprite);
		}
	}

	{
		//make highlight thingy
		glyphHighlight = makeSpriteCanvas("highlight");
		var spritectx = glyphHighlight.getContext('2d');
		spritectx.fillStyle = '#FFFFFF';

		spritectx.fillRect(0,0,cellwidth,1);
		spritectx.fillRect(0,0,1,cellheight);
		
		spritectx.fillRect(0,cellheight-1,cellwidth,1);
		spritectx.fillRect(cellwidth-1,0,1,cellheight);
	}

	{
		glyphPrintButton = textImages['editor_s'];
	}
	{
		//make highlight thingy
		glyphHighlightResize = makeSpriteCanvas("highlightresize");
		var spritectx = glyphHighlightResize.getContext('2d');
		spritectx.fillStyle = '#FFFFFF';
		
		var minx=((cellwidth/2)-1)|0;
		var xsize=cellwidth-minx-1-minx;
		var miny=((cellheight/2)-1)|0;
		var ysize=cellheight-miny-1-minx;

		spritectx.fillRect(minx,0,xsize,cellheight);
		spritectx.fillRect(0,miny,cellwidth,ysize);
	}

	{
		//make highlight thingy
		glyphMouseOver = makeSpriteCanvas();
		var spritectx = glyphMouseOver.getContext('2d');
		spritectx.fillStyle = 'yellow';
		
		spritectx.fillRect(0,0,cellwidth,2);
		spritectx.fillRect(0,0,2,cellheight);
		
		spritectx.fillRect(0,cellheight-2,cellwidth,2);
		spritectx.fillRect(cellwidth-2,0,2,cellheight);
	}
}

var canvas;
var ctx;


var x;
var y;
var cellwidth;
var cellheight;
var magnification;
var xoffset;
var yoffset;

window.addEventListener('resize', canvasResize, false);
// canvas = document.getElementById('gameCanvas');
// ctx = canvas.getContext('2d');
x = 0;
y = 0;

function glyphCount(){
    var count=0;
    for (var n in state.glyphDict) {
        if (n.length==1 && state.glyphDict.hasOwnProperty(n)) {
            count++;
        }
    }    
    return count;
}

function redraw() {
    return;
    if (cellwidth===0||cellheight===0) {
        return;
    }
    if (spriteimages===undefined) {
        regenSpriteImages();
    }

    if (textMode) {
        ctx.fillStyle = state.bgcolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < titleWidth; i++) {
            for (var j = 0; j < titleHeight; j++) {
                var ch = titleImage[j].charAt(i);
                if (ch in textImages) {
                    var sprite = textImages[ch];
                    ctx.drawImage(sprite, xoffset + i * cellwidth, yoffset + j * cellheight);                   
                }
            }
        }
        return;
    } else {
        ctx.fillStyle = state.bgcolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var mini=0;
        var maxi=screenwidth;
        var minj=0;
        var maxj=screenheight;

        if (levelEditorOpened) {
            var glyphcount = glyphCount();
            editorRowCount = Math.ceil(glyphcount/(screenwidth-1));
            maxi-=2;
            maxj-=2+editorRowCount;
        } else if (flickscreen) {
            var playerPositions = getPlayerPositions();
            if (playerPositions.length>0) {
                var playerPosition=playerPositions[0];
                var px = (playerPosition/(level.height))|0;
                var py = (playerPosition%level.height)|0;

                var screenx = (px/screenwidth)|0;
                var screeny = (py/screenheight)|0;
                mini=screenx*screenwidth;
                minj=screeny*screenheight;
                maxi=Math.min(mini+screenwidth,level.width);
                maxj=Math.min(minj+screenheight,level.height);

                oldflickscreendat=[mini,minj,maxi,maxj];
            } else if (oldflickscreendat.length>0){
                mini=oldflickscreendat[0];
                minj=oldflickscreendat[1];
                maxi=oldflickscreendat[2];
                maxj=oldflickscreendat[3];
            }
        } else if (zoomscreen) {
            var playerPositions = getPlayerPositions();
            if (playerPositions.length>0) {
                var playerPosition=playerPositions[0];
                var px = (playerPosition/(level.height))|0;
                var py = (playerPosition%level.height)|0;
                mini=Math.max(Math.min(px-((screenwidth/2)|0),level.width-screenwidth),0);
                minj=Math.max(Math.min(py-((screenheight/2)|0),level.height-screenheight),0);
                maxi=Math.min(mini+screenwidth,level.width);
                maxj=Math.min(minj+screenheight,level.height);
                oldflickscreendat=[mini,minj,maxi,maxj];
            }  else if (oldflickscreendat.length>0){
                mini=oldflickscreendat[0];
                minj=oldflickscreendat[1];
                maxi=oldflickscreendat[2];
                maxj=oldflickscreendat[3];
            }         
        }
	    

        for (var i = mini; i < maxi; i++) {
            for (var j = minj; j < maxj; j++) {
                var posIndex = j + i * level.height;
                var posMask = level.getCellInto(posIndex,_o12);                
                for (var k = 0; k < state.objectCount; k++) {
                    if (posMask.get(k) != 0) {                  
                        var sprite = spriteimages[k];
                        ctx.drawImage(sprite, xoffset + (i-mini) * cellwidth, yoffset + (j-minj) * cellheight);
                    }
                }
            }
        }

	    if (levelEditorOpened) {
	    	drawEditorIcons();
	    }
    }
}

function drawEditorIcons() {
	var glyphCount = glyphImages.length;
	var glyphStartIndex=0;
	var glyphEndIndex = glyphImages.length;/*Math.min(
							glyphStartIndex+10,
							screenwidth-2,
							glyphStartIndex+Math.max(glyphCount-glyphStartIndex,0)
							);*/
	var glyphsToDisplay = glyphEndIndex-glyphStartIndex;

	ctx.drawImage(glyphPrintButton,xoffset-cellwidth,yoffset-cellheight*(1+editorRowCount));
	if (mouseCoordY===(-1-editorRowCount)&&mouseCoordX===-1) {
			ctx.drawImage(glyphMouseOver,xoffset-cellwidth,yoffset-cellheight*(1+editorRowCount));								
	}

	var ypos = editorRowCount-(-mouseCoordY-2)-1;
	var mouseIndex=mouseCoordX+(screenwidth-1)*ypos;

	for (var i=0;i<glyphsToDisplay;i++) {
		var glyphIndex = glyphStartIndex+i;
		var sprite = glyphImages[glyphIndex];
        var xpos=i%(screenwidth-1);
        var ypos=(i/(screenwidth-1))|0;
		ctx.drawImage(sprite,xoffset+(xpos)*cellwidth,yoffset+ypos*cellheight-cellheight*(1+editorRowCount));
		if (mouseCoordX>=0&&mouseCoordX<(screenwidth-1)&&mouseIndex===i) {
			ctx.drawImage(glyphMouseOver,xoffset+xpos*cellwidth,yoffset+ypos*cellheight-cellheight*(1+editorRowCount));						
		}
		if (i===glyphSelectedIndex) {
			ctx.drawImage(glyphHighlight,xoffset+xpos*cellwidth,yoffset+ypos*cellheight-cellheight*(1+editorRowCount));
		} 		
	}
	if (mouseCoordX>=-1&&mouseCoordY>=-1&&mouseCoordX<screenwidth-1&&mouseCoordY<screenheight-1-editorRowCount) {
		if (mouseCoordX==-1||mouseCoordY==-1||mouseCoordX==screenwidth-2||mouseCoordY===screenheight-2-editorRowCount) {
			ctx.drawImage(glyphHighlightResize,
				xoffset+mouseCoordX*cellwidth,
				yoffset+mouseCoordY*cellheight
				);								
		} else {
			ctx.drawImage(glyphHighlight,
				xoffset+mouseCoordX*cellwidth,
				yoffset+mouseCoordY*cellheight
				);				
		}
	}

}

var lastDownTarget;

var oldcellwidth=0;
var oldcellheight=0;
var oldtextmode=-1;
var oldfgcolor=-1;
var forceRegenImages=false;
function canvasResize() {
    return;
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight;

    screenwidth=level.width;
    screenheight=level.height;
    if (state!==undefined){
        flickscreen=state.metadata.flickscreen!==undefined;
        zoomscreen=state.metadata.zoomscreen!==undefined;
	    if (levelEditorOpened) {
            screenwidth+=2;
            var glyphcount = glyphCount();
            editorRowCount = Math.ceil(glyphcount/(screenwidth-1));
            screenheight+=2+editorRowCount;
        } else if (flickscreen) {
	        screenwidth=state.metadata.flickscreen[0];
	        screenheight=state.metadata.flickscreen[1];
	    } else if (zoomscreen) {
	        screenwidth=state.metadata.zoomscreen[0];
	        screenheight=state.metadata.zoomscreen[1];
	    }
	}

    if (textMode) {
        screenwidth=titleWidth;
        screenheight=titleHeight;
    }
    
    cellwidth = canvas.width / screenwidth;
    cellheight = canvas.height / screenheight;

    var w = 5;//sprites[1].dat.length;
    var h = 5;//sprites[1].dat[0].length;


    if (textMode) {
        w=font['X'][0].length + 1;
        h=font['X'].length + 1;
    }


    cellwidth =w * Math.max( ~~(cellwidth / w),1);
    cellheight = h * Math.max(~~(cellheight / h),1);

    xoffset = 0;
    yoffset = 0;

    if (cellwidth / w > cellheight / h) {
        cellwidth = cellheight * w / h;
        xoffset = (canvas.width - cellwidth * screenwidth) / 2;
        yoffset = (canvas.height - cellheight * screenheight) / 2;
    }
    else { //if (cellheight > cellwidth) {
        cellheight = cellwidth * h / w;
        yoffset = (canvas.height - cellheight * screenheight) / 2;
        xoffset = (canvas.width - cellwidth * screenwidth) / 2;
    }
    magnification = ((cellwidth/w)*5)|0;

    if (levelEditorOpened && !textMode) {
    	xoffset+=cellwidth;
    	yoffset+=cellheight*(1+editorRowCount);
    }

    cellwidth = cellwidth|0;
    cellheight = cellheight|0;
    xoffset = xoffset|0;
    yoffset = yoffset|0;

    if (oldcellwidth!=cellwidth||oldcellheight!=cellheight||oldtextmode!=textMode||oldfgcolor!=state.fgcolor||forceRegenImages){
    	forceRegenImages=false;
    	regenSpriteImages();
    }

    oldcellheight=cellheight;
    oldcellwidth=cellwidth;
    oldtextmode=textMode;
    oldfgcolor=state.fgcolor;

    redraw();
}

//////////File Source js/inputoutput.js
var keyRepeatTimer=0;
var keyRepeatIndex=0;
var input_throttle_timer=0.0;
var lastinput=-100;

var dragging=false;
var rightdragging=false;
var columnAdded=false;

function selectText(containerid,e) {
	e = e || window.event;
	var myspan = document.getElementById(containerid);
	if (e&&(e.ctrlKey || e.metaKey)) {
		var levelarr = ["console"].concat(myspan.innerHTML.split("<br>"));
		var leveldat = levelFromString(state,levelarr);
		loadLevelFromLevelDat(state,leveldat,null);
		canvasResize();
	} else {
	    if (document.selection) {
	        var range = document.body.createTextRange();
	        range.moveToElementText(myspan);
	        range.select();
	    } else if (window.getSelection) {
	        var range = document.createRange();
	        range.selectNode(myspan);
	        window.getSelection().addRange(range);
	    }
	}
}

function recalcLevelBounds(){
}

function arrCopy(from, fromoffset, to, tooffset, len) {
	while (len--)
		to[tooffset++] = from[fromoffset]++;
}

function adjustLevel(level, widthdelta, heightdelta) {
	backups.push(backupLevel());
	var oldlevel = level.clone();
	level.width += widthdelta;
	level.height += heightdelta;
	level.n_tiles = level.width * level.height;
	level.objects = new Int32Array(level.n_tiles * STRIDE_OBJ);
	var bgMask = new BitVec(STRIDE_OBJ);
	bgMask.ibitset(state.backgroundid);
	for (var i=0; i<level.n_tiles; ++i) 
		level.setCell(i, bgMask);
	level.movements = new Int32Array(level.objects.length);
	columnAdded=true;
	RebuildLevelArrays();
	return oldlevel;
}

function addLeftColumn() {
	var oldlevel = adjustLevel(level, 1, 0);
	for (var x=1; x<level.width; ++x) {
		for (var y=0; y<level.height; ++y) {
			var index = x*level.height + y;
			level.setCell(index, oldlevel.getCell(index - level.height))
		}
	}
}

function addRightColumn() {
	var oldlevel = adjustLevel(level, 1, 0);
	for (var x=0; x<level.width-1; ++x) {
		for (var y=0; y<level.height; ++y) {
			var index = x*level.height + y;
			level.setCell(index, oldlevel.getCell(index))
		}
	}
}

function addTopRow() {
	var oldlevel = adjustLevel(level, 0, 1);
	for (var x=0; x<level.width; ++x) {
		for (var y=1; y<level.height; ++y) {
			var index = x*level.height + y;
			level.setCell(index, oldlevel.getCell(index - x - 1))
		}
	}
}

function addBottomRow() {
	var oldlevel = adjustLevel(level, 0, 1);
	for (var x=0; x<level.width; ++x) {
		for (var y=0; y<level.height - 1; ++y) {
			var index = x*level.height + y;
			level.setCell(index, oldlevel.getCell(index - x));
		}
	}
}

function removeLeftColumn() {
	if (level.width<=1) {
		return;
	}
	var oldlevel = adjustLevel(level, -1, 0);
	for (var x=0; x<level.width; ++x) {
		for (var y=0; y<level.height; ++y) {
			var index = x*level.height + y;
			level.setCell(index, oldlevel.getCell(index + level.height))
		}
	}
}

function removeRightColumn(){
	if (level.width<=1) {
		return;
	}
	var oldlevel = adjustLevel(level, -1, 0);
	for (var x=0; x<level.width; ++x) {
		for (var y=0; y<level.height; ++y) {
			var index = x*level.height + y;
			level.setCell(index, oldlevel.getCell(index))
		}
	}
}

function removeTopRow(){
	if (level.height<=1) {
		return;
	}
	var oldlevel = adjustLevel(level, 0, -1);
	for (var x=0; x<level.width; ++x) {
		for (var y=0; y<level.height; ++y) {
			var index = x*level.height + y;
			level.setCell(index, oldlevel.getCell(index + x + 1))
		}
	}
}
function removeBottomRow(){
	if (level.height<=1) {
		return;
	}
	var oldlevel = adjustLevel(level, 0, -1);
	for (var x=0; x<level.width; ++x) {
		for (var y=0; y<level.height; ++y) {
			var index = x*level.height + y;
			level.setCell(index, oldlevel.getCell(index + x))
		}
	}
}

function matchGlyph(inputmask,glyphAndMask) {
	// find mask with closest match
	var highestbitcount=-1;
	var highestmask;
	for (var i=0; i<glyphAndMask.length; ++i) {
		var glyphname = glyphAndMask[i][0];
		var glyphmask = glyphAndMask[i][1];
 		var glyphbits = glyphAndMask[i][2];
		//require all bits of glyph to be in input
		if (glyphmask.bitsSetInArray(inputmask.data)) {
			var bitcount = 0;
			for (var bit=0;bit<32*STRIDE_OBJ;++bit) {
				if (glyphbits.get(bit) && inputmask.get(bit))
 					bitcount++;
				if (glyphmask.get(bit) && inputmask.get(bit))
					bitcount++;
			}
			if (bitcount>highestbitcount) {
				highestbitcount=bitcount;
				highestmask=glyphname;
			}
		}
	}
	if (highestbitcount>0) {
		return highestmask;
	}
	
	logErrorNoLine("Wasn't able to approximate a glyph value for some tiles, using '.' as a placeholder.",true);
	return '.';
}

var htmlEntityMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': '&quot;',
	"'": '&#39;',
	"/": '&#x2F;'
};

var selectableint  = 0;

function printLevel() {
	var glyphMasks = [];
	for (var glyphName in state.glyphDict) {
		if (state.glyphDict.hasOwnProperty(glyphName)&&glyphName.length===1) {
			var glyph = state.glyphDict[glyphName];
			var glyphmask=new BitVec(STRIDE_OBJ);
			for (var i=0;i<glyph.length;i++)
			{
				var id = glyph[i];
				if (id>=0) {
					glyphmask.ibitset(id);
				}
			}
			var glyphbits = glyphmask.clone();
			//register the same - backgroundmask with the same name
			var bgMask = state.layerMasks[state.backgroundlayer];
			glyphmask.iclear(bgMask);
			glyphMasks.push([glyphName, glyphmask, glyphbits]);
		}
	}
	selectableint++;
	var tag = 'selectable'+selectableint;
	var output="Printing level contents:<br><br><span id=\""+tag+"\" onclick=\"selectText('"+tag+"',event)\">";
	for (var j=0;j<level.height;j++) {
		for (var i=0;i<level.width;i++) {
			var cellIndex = j+i*level.height;
			var cellMask = level.getCell(cellIndex);
			var glyph = matchGlyph(cellMask,glyphMasks);
			if (glyph in htmlEntityMap) {
				glyph = htmlEntityMap[glyph]; 
			}
			output = output+glyph;
		}
		if (j<level.height-1){
			output=output+"<br>";
		}
	}
	output+="</span><br><br>"
	consolePrint(output,true);
}

function levelEditorClick(event,click) {
	if (mouseCoordY<=-2) {
		var ypos = editorRowCount-(-mouseCoordY-2)-1;
		var newindex=mouseCoordX+(screenwidth-1)*ypos;
		if (mouseCoordX===-1) {
			printLevel();
		} else if (mouseCoordX>=0&&newindex<glyphImages.length) {
			glyphSelectedIndex=newindex;
			redraw();
		}

	} else if (mouseCoordX>-1&&mouseCoordY>-1&&mouseCoordX<screenwidth-2&&mouseCoordY<screenheight-2-editorRowCount	) {
		var glyphname = glyphImagesCorrespondance[glyphSelectedIndex];
		var glyph = state.glyphDict[glyphname];
		var glyphmask = new BitVec(STRIDE_OBJ);
		for (var i=0;i<glyph.length;i++)
		{
			var id = glyph[i];
			if (id>=0) {
				glyphmask.ibitset(id);
			}			
		}

		var backgroundMask = state.layerMasks[state.backgroundlayer];
		if (glyphmask.bitsClearInArray(backgroundMask.data)) {
			// If we don't already have a background layer, mix in
			// the default one.
			glyphmask.ibitset(state.backgroundid);
		}

		var coordIndex = mouseCoordY + mouseCoordX*level.height;
		var getcell = level.getCell(coordIndex);
		if (getcell.equals(glyphmask)) {
			return;
		} else {
			if (anyEditsSinceMouseDown===false) {
				anyEditsSinceMouseDown=true;				
        		backups.push(backupLevel());
			}
			level.setCell(coordIndex, glyphmask);
			redraw();
		}
	}
	else if (click) {
		if (mouseCoordX===-1) {
			//add a left row to the map
			addLeftColumn();			
			canvasResize();
		} else if (mouseCoordX===screenwidth-2) {
			addRightColumn();
			canvasResize();
		} 
		if (mouseCoordY===-1) {
			addTopRow();
			canvasResize();
		} else if (mouseCoordY===screenheight-2-editorRowCount) {
			addBottomRow();
			canvasResize();
		}
	}
}

function levelEditorRightClick(event,click) {
	if (mouseCoordY===-2) {
		if (mouseCoordX<=glyphImages.length) {
			glyphSelectedIndex=mouseCoordX;
			redraw();
		}
	} else if (mouseCoordX>-1&&mouseCoordY>-1&&mouseCoordX<screenwidth-2&&mouseCoordY<screenheight-2-editorRowCount	) {
		var coordIndex = mouseCoordY + mouseCoordX*level.height;
		var glyphmask = new BitVec(STRIDE_OBJ);
		glyphmask.ibitset(state.backgroundid);
		level.setCell(coordIndex, glyphmask);
		redraw();
	}
	else if (click) {
		if (mouseCoordX===-1) {
			//add a left row to the map
			removeLeftColumn();			
			canvasResize();
		} else if (mouseCoordX===screenwidth-2) {
			removeRightColumn();
			canvasResize();
		} 
		if (mouseCoordY===-1) {
			removeTopRow();
			canvasResize();
		} else if (mouseCoordY===screenheight-2-editorRowCount) {
			removeBottomRow();
			canvasResize();
		}
	}
}

var anyEditsSinceMouseDown = false;

function onMouseDown(event) {

	if (event.handled){
		return;
	}

	ULBS();
	
	var lmb = event.button===0;
	var rmb = event.button===2 ;
	if (event.type=="touchstart"){
		lmb=true;
	}
	if (lmb && (event.ctrlKey||event.metaKey)){
		lmb=false;
		rmb=true;
	}
	
	if (lmb ) {
        lastDownTarget = event.target;
        keybuffer=[];
        if (event.target===canvas || event.target.className==="tapFocusIndicator") {
        	setMouseCoord(event);
        	dragging=true;
        	rightdragging=false;
        	if (levelEditorOpened) {
        		anyEditsSinceMouseDown=false;
        		return levelEditorClick(event,true);
        	}
        }
        dragging=false;
        rightdragging=false; 
    } else if (rmb) {
    	if (event.target===canvas || event.target.className==="tapFocusIndicator") {
			setMouseCoord(event);
		    dragging=false;
		    rightdragging=true;
        	if (levelEditorOpened) {
        		return levelEditorRightClick(event,true);
        	}
        }
	}
	
	event.handled=true;

}

function rightClickCanvas(event) {
    return prevent(event);
}

function onMouseUp(event) {
	if (event.handled){
		return;
	}

	dragging=false;
	rightdragging=false;
	
	event.handled=true;
}

function onKeyDown(event) {

	ULBS();
	
    event = event || window.event;

	// Prevent arrows/space from scrolling page
	if ((!IDE) && ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1)) {
		if (event&&(event.ctrlKey || event.metaKey)){
		} else {
			prevent(event);
		}
	}

	if ((!IDE) && event.keyCode===77){//m
		toggleMute();		
	}

	
    if (keybuffer.indexOf(event.keyCode)>=0) {
    	return;
    }

    if(lastDownTarget === canvas || (window.Mobile && (lastDownTarget === window.Mobile.focusIndicator) ) ){
    	if (keybuffer.indexOf(event.keyCode)===-1) {
    		if (event&&(event.ctrlKey || event.metaKey)){
		    } else {
    		    keybuffer.splice(keyRepeatIndex,0,event.keyCode);
	    	    keyRepeatTimer=0;
	    	    checkKey(event,true);
		    }
		}
	}


    if (canDump===true) {
        if (event.keyCode===74 && (event.ctrlKey||event.metaKey)) {//ctrl+j
            dumpTestCase();
            prevent(event);
        } else if (event.keyCode===75 && (event.ctrlKey||event.metaKey)) {//ctrl+k
            makeGIF();
            prevent(event);
        }  else if (event.keyCode===83 && (event.ctrlKey||event.metaKey)) {//ctrl+s
            saveClick();
            prevent(event);
        } else if (event.keyCode===13 && (event.ctrlKey||event.metaKey)){//ctrl+enter
			canvas.focus();
			editor.display.input.blur();
            rebuildClick();
            prevent(event);
		}
	}
}

function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

	if (event.touches==null){
    	canvasX = event.pageX - totalOffsetX;
		canvasY = event.pageY - totalOffsetY;
	} else {
    	canvasX = event.touches[0].pageX - totalOffsetX;
		canvasY = event.touches[0].pageY - totalOffsetY;

	}

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

function onKeyUp(event) {
	event = event || window.event;
	var index=keybuffer.indexOf(event.keyCode);
	if (index>=0){
    	keybuffer.splice(index,1);
    	if (keyRepeatIndex>=index){
    		keyRepeatIndex--;
    	}
    }
}

function onMyFocus(event) {	
	keybuffer=[];
	keyRepeatIndex = 0;
	keyRepeatTimer = 0;
}

function onMyBlur(event) {
	keybuffer=[];
	keyRepeatIndex = 0;
	keyRepeatTimer = 0;
}

var mouseCoordX=0;
var mouseCoordY=0;

function setMouseCoord(e){
    var coords = canvas.relMouseCoords(e);
    mouseCoordX=coords.x-xoffset;
	mouseCoordY=coords.y-yoffset;
	mouseCoordX=Math.floor(mouseCoordX/cellwidth);
	mouseCoordY=Math.floor(mouseCoordY/cellheight);
}

function mouseMove(event) {
	
	if (event.handled){
		return;
	}

    if (levelEditorOpened) {
    	setMouseCoord(event);  
    	if (dragging) { 	
    		levelEditorClick(event,false);
    	} else if (rightdragging){
    		levelEditorRightClick(event,false);    		
    	}
	    redraw();
    }

	event.handled=true;
    //window.console.log("showcoord ("+ canvas.width+","+canvas.height+") ("+x+","+y+")");
}

function mouseOut() {
//  window.console.log("clear");
}

// document.addEventListener('touchstart', onMouseDown, false);
// document.addEventListener('touchmove', mouseMove, false);
// document.addEventListener('touchend', onMouseUp, false);

// document.addEventListener('mousedown', onMouseDown, false);
// document.addEventListener('mouseup', onMouseUp, false);

// document.addEventListener('keydown', onKeyDown, false);
// document.addEventListener('keyup', onKeyUp, false);

// window.addEventListener('focus', onMyFocus, false);
// window.addEventListener('blur', onMyBlur, false);


function prevent(e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    if (e.stopPropagation) e.stopPropagation();
    e.returnValue=false;
    return false;
}

function checkKey(e,justPressed) {
	ULBS();
	
    if (winning) {
    	return;
	}
	if (e&&(e.ctrlKey || e.metaKey|| e.altKey)){
		return;
	}
	
    var inputdir=-1;
    switch(e.keyCode) {
        case 65://a
        case 37: //left
        {
//            window.console.log("LEFT");
            inputdir=1;
        break;
        }
        case 38: //up
        case 87: //w
        {
//            window.console.log("UP");
            inputdir=0;
        break;
        }
        case 68://d
        case 39: //right
        {
//            window.console.log("RIGHT");
            inputdir=3;
        break;
        }
        case 83://s
        case 40: //down
        {
//            window.console.log("DOWN");
            inputdir=2;
        break;
        }
        case 80://p
        {
			printLevel();
        	break;
        }
        case 13://enter
        case 32://space
        case 67://c
        case 88://x
        {
//            window.console.log("ACTION");
			if (norepeat_action===false || justPressed) {
            	inputdir=4;
            } else {
            	return;
            }
        break;
        }
        case 85://u
        case 90://z
        {
            //undo
            if (textMode===false) {
                pushInput("undo");
                DoUndo(false,true);
                canvasResize(); // calls redraw
            	return prevent(e);
            }
            break;
        }
        case 82://r
        {
        	if (textMode===false) {
        		if (justPressed) {
	        		pushInput("restart");
	        		DoRestart();
	                canvasResize(); // calls redraw
            		return prevent(e);
            	}
            }
            break;
        }
        case 27://escape
        {
        	if (titleScreen===false) {
				goToTitleScreen();	
		    	tryPlayTitleSound();
				canvasResize();			
				return prevent(e)
        	}
        	break;
        }
        case 69: {//e
        	if (canOpenEditor) {
        		if (justPressed) {
        			if (titleScreen){
        				if (state.title==="EMPTY GAME"){
        					compile(["loadFirstNonMessageLevel"]);
        				} else {
        					nextLevel();
        				}
        			}
        			levelEditorOpened=!levelEditorOpened;
        			if (levelEditorOpened===false){
        				printLevel();
        			}
        			restartTarget=backupLevel();
        			canvasResize();
        		}
        		return prevent(e);
        	}
            break;
		}
		case 48://0
		case 49://1
		case 50://2
		case 51://3
		case 52://4
		case 53://5
		case 54://6
		case 55://7
		case 56://8
		case 57://9
		{
        	if (levelEditorOpened&&justPressed) {
        		var num=9;
        		if (e.keyCode>=49)  {
        			num = e.keyCode-49;
        		}

				if (num<glyphImages.length) {
					glyphSelectedIndex=num;
				} else {
					consolePrint("Trying to select tile outside of range in level editor.",true)
				}

        		canvasResize();
        		return prevent(e);
        	}	
        	break;	
        }
		case 189://-
		{
        	if (levelEditorOpened&&justPressed) {
				if (glyphSelectedIndex>0) {
					glyphSelectedIndex--;
					canvasResize();
					return prevent(e);
				} 
        	}	
        	break;	
		}
		case 187://+
		{
        	if (levelEditorOpened&&justPressed) {
				if (glyphSelectedIndex+1<glyphImages.length) {
					glyphSelectedIndex++;
					canvasResize();
					return prevent(e);
				} 
        	}	
        	break;	
		}
    }
    if (throttle_movement && inputdir>=0&&inputdir<=3) {
    	if (lastinput==inputdir && input_throttle_timer<repeatinterval) {
    		return;
    	} else {
    		lastinput=inputdir;
    		input_throttle_timer=0;
    	}
    }
    if (textMode) {
    	if (state.levels.length===0) {
    		//do nothing
    	} else if (titleScreen) {
    		if (titleMode===0) {
    			if (inputdir===4&&justPressed) {
    				if (titleSelected===false) {    				
						tryPlayStartGameSound();
	    				titleSelected=true;
	    				messageselected=false;
	    				timer=0;
	    				quittingTitleScreen=true;
	    				generateTitleScreen();
	    				canvasResize();
	    			}
    			}
    		} else {
    			if (inputdir==4&&justPressed) {
    				if (titleSelected===false) {    				
						tryPlayStartGameSound();
	    				titleSelected=true;
	    				messageselected=false;
	    				timer=0;
	    				quittingTitleScreen=true;
	    				generateTitleScreen();
	    				redraw();
	    			}
    			}
    			else if (inputdir===0||inputdir===2) {
    				if (inputdir===0){
    					titleSelection=0;    					
    				} else {
    					titleSelection=1;    					    					
    				}
    				generateTitleScreen();
    				redraw();
    			}
    		}
    	} else {
    		if (inputdir==4&&justPressed) {    				
				if (unitTesting) {
					nextLevel();
					return;
				} else if (messageselected===false) {
    				messageselected=true;
    				timer=0;
    				quittingMessageScreen=true;
    				tryPlayCloseMessageSound();
    				titleScreen=false;
    				drawMessageScreen();
    			}
    		}
    	}
    } else {
	    if (!againing && inputdir>=0) {
            if (inputdir===4 && ('noaction' in state.metadata)) {

            } else {
                pushInput(inputdir);
                if (processInput(inputdir)) {
                    redraw();
                }
	        }
	       	return prevent(e);
    	}
    }
}


function update() {
    timer+=deltatime;
    input_throttle_timer+=deltatime;
    if (quittingTitleScreen) {
        if (timer/1000>0.3) {
            quittingTitleScreen=false;
            nextLevel();
        }
    }
    if (againing) {
        if (timer>againinterval&&messagetext.length==0) {
            if (processInput(-1)) {
                redraw();
                keyRepeatTimer=0;
                autotick=0;
            }
        }
    }
    if (quittingMessageScreen) {
        if (timer/1000>0.15) {
            quittingMessageScreen=false;
            if (messagetext==="") {
            	nextLevel();
            } else {
            	messagetext="";
            	textMode=false;
				titleScreen=false;
				titleMode=(curlevel>0||curlevelTarget!==null)?1:0;
				titleSelected=false;
				titleSelection=0;
    			canvasResize();  
    			checkWin();          	
            }
        }
    }
    if (winning) {
        if (timer/1000>0.5) {
            winning=false;
            // nextLevel();
        }
    }
    if (keybuffer.length>0) {
	    keyRepeatTimer+=deltatime;
	    var ticklength = throttle_movement ? repeatinterval : repeatinterval/(Math.sqrt(keybuffer.length));
	    if (keyRepeatTimer>ticklength) {
	    	keyRepeatTimer=0;	
	    	keyRepeatIndex = (keyRepeatIndex+1)%keybuffer.length;
	    	var key = keybuffer[keyRepeatIndex];
	        checkKey({keyCode:key},false);
	    }
	}

    if (autotickinterval>0&&!textMode&&!levelEditorOpened&&!againing&&!winning) {
        autotick+=deltatime;
        if (autotick>autotickinterval) {
            autotick=0;
            pushInput("tick");
            if (processInput(-1)) {
                redraw();
            }
        }
    }
}

window["puzzleUpdate"] = update;

// Lights, camera…function!
// setInterval(function() {
    // update();
// }, deltatime);


window.checkKey = checkKey;
//////////File Source js/mobile.js
/*
 * Add gesture support for mobile devices.
 */

window.Mobile = {};

//stolen from https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
Mobile.hasTouch = function() {
    var bool;
    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)     {
      bool = true;
    } else {
      /*
      //don't know what's happening with this, so commented it out
      var query = ['@media (',prefixes.join('touch-enabled),    ('),'heartz',')','{#modernizr{top:9px;position:absolute}}'].join('');
      testStyles(query, function( node ) {
        bool = node.offsetTop === 9;
      });*/
    }
    return bool;
}

Mobile.enable = function (force) {
    return;
    if (force || Mobile.hasTouch() && !Mobile._instance) {
        Mobile._instance = new Mobile.GestureHandler();
        Mobile._instance.bindEvents();
        Mobile._instance.bootstrap();
    }
    return Mobile._instance;
};

window.Mobile.GestureHandler = function () {
    this.initialize.apply(this, arguments);
};

Mobile.log = function (message) {
    var h1;
    h1 = document.getElementsByTagName('h1')[0];
    h1.innerHTML = "" + Math.random().toString().substring(4, 1) + "-" + message;
};

Mobile.debugDot = function (event) {
    var dot, body, style

    style = 'border-radius: 50px;' +
        'width: 5px;' +
        'height: 5px;' +
        'background: red;' +
        'position: absolute;' +
        'left: ' + event.touches[0].clientX + 'px;' +
        'top: ' + event.touches[0].clientY + 'px;';
    dot = document.createElement('div');
    dot.setAttribute('style', style);
    body = document.getElementsByTagName('body')[0];
    body.appendChild(dot);
};

(function (proto) {
    'use strict';

    // Minimum range to begin looking at the swipe direction, in pixels
    var SWIPE_THRESHOLD = 10;
    // Distance in pixels required to complete a swipe gesture.
    var SWIPE_DISTANCE = 50;
    // Time in milliseconds to complete the gesture.
    var SWIPE_TIMEOUT = 1000;
    // Time in milliseconds to repeat a motion if still holding down,
    // ... and not specified in state.metadata.key_repeat_interval.
    var DEFAULT_REPEAT_INTERVAL = 150;

    // Lookup table mapping action to keyCode.
    var CODE = {
        action:  88, // x
        left:    37, // left arrow
        right:   39, // right arrow
        up:      38, // up arrow
        down:    40, // down arrow
        undo:    85, // u
        restart: 82, // r
        quit:    27 // escape
    }

    var TAB_STRING = [
        '<div class="tab">',
        '  <div class="tab-affordance"></div>',
        '  <div class="tab-icon">',
        '    <div class="slice"></div>',
        '    <div class="slice"></div>',
        '  </div>',
        '</div>'
    ].join("\n");

    /** Bootstrap Methods **/

    proto.initialize = function () {
        this.firstPos = { x: 0, y: 0 };
        this.setTabAnimationRatio = this.setTabAnimationRatio.bind(this);
        this.setMenuAnimationRatio = this.setMenuAnimationRatio.bind(this);
        this.repeatTick = this.repeatTick.bind(this);
        this.isFocused = true;
    };

    // assign the element that will allow tapping to toggle focus.
    proto.setFocusElement = function (focusElement) {
        this.focusElement = focusElement;
        this.isFocused = false;
        this.buildFocusIndicator();
    };

    proto.bindEvents = function () {
        window.addEventListener('touchstart', this.onTouchStart.bind(this));
        window.addEventListener('touchend', this.onTouchEnd.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this));
    };

    proto.bootstrap = function () {
        this.showTab();
        this.disableScrolling();
        if (!this.isAudioSupported()) {
            this.disableAudio();
        }
        this.disableSelection();
    };

    /** Event Handlers **/

    proto.onTouchStart = function (event) {
        if (this.isTouching) {
            return;
        }

        // Handle focus changes used in editor.
        this.handleFocusChange(event);
        if (!this.isFocused) {
            return;
        }

        if (event.target.tagName.toUpperCase() === 'A') {
            return;
        }
        this.isTouching = true;

        this.mayBeSwiping = true;
        this.gestured = false;

        this.swipeDirection = undefined;
        this.swipeDistance = 0;
        this.startTime = new Date().getTime();

        this.firstPos.x = event.touches[0].clientX;
        this.firstPos.y = event.touches[0].clientY;
    };

    proto.onTouchEnd = function (event) {
        if (!this.isFocused) {
            return;
        }
        if (!this.isTouching) {
            // If we're here, the menu event handlers had probably
            // canceled the touchstart event.
            return;
        }
        if (!this.gestured) {
            if (event.touches.length === 0) {
                this.handleTap();
            }
        }

        // The last finger to be removed from the screen lets us know
        // we aren't tracking anything.
        if (event.touches.length === 0) {
            this.isTouching = false;
            this.endRepeatWatcher();
        }
    };

    proto.onTouchMove = function (event) {
        if (!this.isFocused) {
            return;
        }
        if (levelEditorOpened){
            return;
        }
        if (this.isSuccessfulSwipe()) {
            this.handleSwipe(this.swipeDirection, this.touchCount);
            this.gestured = true;
            this.mayBeSwiping = false;
            this.beginRepeatWatcher(event);
        } else if (this.mayBeSwiping) {
            this.swipeStep(event);
        } else if (this.isRepeating) {
            this.repeatStep(event);
        }

        prevent(event);
        return false;
    };

    proto.handleFocusChange = function (event) {
        if (!this.focusElement) {
            return;
        }

        this.isFocused = this.isTouchInsideFocusElement(event);
        this.setFocusIndicatorVisibility(this.isFocused);
        
        canvas.focus();
        editor.display.input.blur();
    };

    proto.isTouchInsideFocusElement = function (event) {
        var canvasPosition;

        if (!event.touches || !event.touches[0]) {
            return false;
        }
        canvasPosition = this.absoluteElementPosition(this.focusElement);

        if (event.touches[0].clientX < canvasPosition.left ||
            event.touches[0].clientY < canvasPosition.top) {
            return false;
        }

        if (event.touches[0].clientX > canvasPosition.left + this.focusElement.clientWidth ||
            event.touches[0].clientY > canvasPosition.top + this.focusElement.clientHeight) {
            return false;
        }

        return true;
    };

    proto.setFocusIndicatorVisibility = function (isVisible) {
        var visibility;

        visibility = 'visible';
        if (!isVisible) {
            visibility = 'hidden';
        }
        // this.focusIndicator.setAttribute('style', 'visibility: ' + visibility + ';');
    };

    proto.absoluteElementPosition = function (element) {
        var position, body;

        position = {
            top: element.offsetTop || 0,
            left: element.offsetLeft || 0
        };
        body = document.getElementsByTagName('body')[0];
        position.top -= body.scrollTop || 0;

        while (true) {
            element = element.offsetParent;
            if (!element) {
                break;
            }
            position.top += element.offsetTop || 0;
            position.left += element.offsetLeft || 0;
        }

        return position;
    };

    proto.beginRepeatWatcher = function (event) {
        var repeatIntervalMilliseconds;
        if (this.repeatInterval) {
            return;
        }
        this.isRepeating = true;
        repeatIntervalMilliseconds = state.metadata.key_repeat_interval * 1000;
        if (isNaN(repeatIntervalMilliseconds) || !repeatIntervalMilliseconds) {
            repeatIntervalMilliseconds = DEFAULT_REPEAT_INTERVAL;
        }
        this.repeatInterval = setInterval(this.repeatTick, repeatIntervalMilliseconds);
        this.recenter(event);
    };

    proto.endRepeatWatcher = function () {
        if (this.repeatInterval) {
            clearInterval(this.repeatInterval);
            delete this.repeatInterval;
            this.isRepeating = false;
        }
    };

    proto.repeatTick = function () {
        if (this.isTouching) {
            this.handleSwipe(this.direction, this.touchCount);
        }
    };

    // Capture the location to consider the gamepad center.
    proto.recenter = function (event) {
        this.firstPos.x = event.touches[0].clientX;
        this.firstPos.y = event.touches[0].clientY;
    }

    /** Detection Helper Methods **/

    proto.isSuccessfulSwipe = function () {
        var isSuccessful;

        if (this.mayBeSwiping &&
            this.swipeDirection !== undefined &&
            this.swipeDistance >= SWIPE_DISTANCE) {
            isSuccessful = true;
        }

        return isSuccessful;
    };

    // Examine the current state to see what direction they're swiping and
    // if the gesture can still be considered a swipe.
    proto.swipeStep = function (event) {
        var currentPos, distance, currentTime;
        var touchCount;

        if (!this.mayBeSwiping) {
            return;
        }

        currentPos = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
        currentTime = new Date().getTime();
        touchCount = event.touches.length;

        this.swipeDistance = this.cardinalDistance(this.firstPos, currentPos);
        if (!this.swipeDirection) {
            if (this.swipeDistance > SWIPE_THRESHOLD) {
                // We've swiped far enough to decide what direction we're swiping in.
                this.swipeDirection = this.dominantDirection(this.firstPos, currentPos);
                this.touchCount = touchCount;
            }
        } else if (distance < SWIPE_DISTANCE) {
            // Now that they've committed to the swipe, look for misfires...

            direction = this.dominantDirection(this.firstPos, currentPos);
            // Cancel the swipe if the direction changes.
            if (direction !== this.swipeDirection) {
                this.mayBeSwiping = false;
            }
            // If they're changing touch count at this point, it's a misfire.
            if (touchCount < this.touchCount) {
                this.mayBeSwiping = false;
            }
        } else if (currentTime - this.startTime > SWIPE_TIMEOUT) {
            // Cancel the swipe if they took too long to finish.
            this.mayBeSwiping = false;
        }
    };

    proto.repeatStep = function (event) {
        var currentPos, distance, currentTime;
        var newDistance, direction;

        currentPos = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };

        newDistance = this.cardinalDistance(this.firstPos, currentPos);

        if (newDistance >= SWIPE_DISTANCE) {
            this.swipeDirection = this.dominantDirection(this.firstPos, currentPos);
            this.recenter(event);
        }
    };

    // Find the distance traveled by the swipe along compass directions.
    proto.cardinalDistance = function (firstPos, currentPos) {
        var xDist, yDist;

        xDist = Math.abs(firstPos.x - currentPos.x);
        yDist = Math.abs(firstPos.y - currentPos.y);

        return Math.max(xDist, yDist);
    };

    // Decide which direction the touch has moved farthest.
    proto.dominantDirection = function (firstPos, currentPos) {
        var dx, dy;
        var dominantAxis, dominantDirection;

        dx = currentPos.x - firstPos.x;
        dy = currentPos.y - firstPos.y;

        dominantAxis = 'x';
        if (Math.abs(dy) > Math.abs(dx)) {
            dominantAxis = 'y';
        }

        if (dominantAxis === 'x') {
            if (dx > 0) {
                dominantDirection = 'right';
            } else {
                dominantDirection = 'left';
            }
        } else {
            if (dy > 0) {
                dominantDirection = 'down';
            } else {
                dominantDirection = 'up';
            }
        }

        return dominantDirection;
    };

    /** Action Methods **/

    // Method to be called when we've detected a swipe and some action
    // is called for.
    proto.handleSwipe = function (direction, touchCount) {
        if (touchCount === 1) {
            this.emitKeydown(this.swipeDirection);
        } else if (touchCount > 1) {
            // Since this was a multitouch gesture, open the menu.
            this.toggleMenu();
        }
    };

    proto.handleTap = function () {
        this.emitKeydown('action');
    };

    // Fake out keypresses to acheive the desired effect.
    proto.emitKeydown = function (input) {
        var event;

        event = { keyCode: CODE[input] };

        this.fakeCanvasFocus();
        // Press, then release key.
        onKeyDown(event);
        onKeyUp(event);
    };

    proto.fakeCanvasFocus = function () {
        var canvas;

        canvas = document.getElementById('gameCanvas');
        onMouseDown({
            button: 0,
            target: canvas
        });
    };

    proto.toggleMenu = function () {
        if (this.isMenuVisible) {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    };

    proto.showMenu = function () {
        if (!this.menuElem) {
            this.buildMenu();
        }
        this.getAnimatables().menu.animateUp();
        this.isMenuVisible = true;
        this.hideTab();
    };

    proto.hideMenu = function () {
        if (this.menuElem) {
            this.getAnimatables().menu.animateDown();
        }
        this.isMenuVisible = false;
        this.showTab();
    };

    proto.getAnimatables = function () {
        var self = this;
        if (!this._animatables) {
            this._animatables = {
                tab: Animatable('tab', 0.1, self.setTabAnimationRatio),
                menu: Animatable('menu', 0.1, self.setMenuAnimationRatio)
            }
        }
        return this._animatables;
    };

    proto.showTab = function () {
        if (!this.tabElem) {
            this.buildTab();
        }
        this.getAnimatables().tab.animateDown();
    };

    proto.hideTab = function () {
        if (this.tabElem) {
            this.tabElem.setAttribute('style', 'display: none;');
        }
        this.getAnimatables().tab.animateUp();
    };

    proto.buildTab = function () {
        var self = this;
        var tempElem, body;
        var openCallback;
        var tabElem;
        var assemblyElem;

        tempElem = document.createElement('div');
        tempElem.innerHTML = TAB_STRING;
        assemblyElem = tempElem.children[0];

        openCallback = function (event) {
            event.stopPropagation();
            self.showMenu();
        };
        this.tabAffordance = assemblyElem.getElementsByClassName('tab-affordance')[0];
        this.tabElem = assemblyElem.getElementsByClassName('tab-icon')[0];

        this.tabAffordance.addEventListener('touchstart', openCallback);
        this.tabElem.addEventListener('touchstart', openCallback);

        body = document.getElementsByTagName('body')[0];
        body.appendChild(assemblyElem);
    };

    proto.buildMenu = function () {
        var self = this;
        var tempElem, body;
        var undo, restart, quit;
        var closeTab;
        var closeCallback;

        tempElem = document.createElement('div');
        tempElem.innerHTML = this.buildMenuString(state);
        this.menuElem = tempElem.children[0];
        this.closeElem = this.menuElem.getElementsByClassName('close')[0];

        closeCallback = function (event) {
            event.stopPropagation();
            self.hideMenu();
        };
        this.closeAffordance = this.menuElem.getElementsByClassName('close-affordance')[0];
        closeTab = this.menuElem.getElementsByClassName('close')[0];
        this.closeAffordance.addEventListener('touchstart', closeCallback);
        closeTab.addEventListener('touchstart', closeCallback);

        undo = this.menuElem.getElementsByClassName('undo')[0];
        if (undo) {
            undo.addEventListener('touchstart', function (event) {
                event.stopPropagation();
                self.emitKeydown('undo');
            });
        }
        restart = this.menuElem.getElementsByClassName('restart')[0];
        if (restart) {
            restart.addEventListener('touchstart', function (event) {
                event.stopPropagation();
                self.emitKeydown('restart');
            });
        }

        quit = this.menuElem.getElementsByClassName('quit')[0];
        quit.addEventListener('touchstart', function (event) {
            event.stopPropagation();
            self.emitKeydown('quit');
        });

        body = document.getElementsByTagName('body')[0];
        body.appendChild(this.menuElem);
    };

    proto.buildMenuString = function (state) {
    // Template for the menu.
        var itemCount, menuLines;
        var noUndo, noRestart;

        noUndo = state.metadata.noundo;
        noRestart = state.metadata.norestart;

        itemCount = 3;
        if (noUndo) {
            itemCount -= 1;
        }
        if (noRestart) {
            itemCount -= 1;
        }

        menuLines = [
            '<div class="mobile-menu item-count-' + itemCount + '">',
            '  <div class="close-affordance"></div>',
            '  <div class="close">',
            '    <div class="slice"></div>',
            '    <div class="slice"></div>',
            '  </div>'
        ];

        if (!noUndo) {
            menuLines.push('  <div class="undo button">Undo</div>');
        }
        if (!noRestart) {
            menuLines.push('  <div class="restart button">Restart</div>');
        }
        menuLines = menuLines.concat([
            '  <div class="quit button">Quit to Menu</div>',
            '  <div class="clear"></div>',
            '</div>'
        ]);

        return menuLines.join("\n");
    };

    proto.buildFocusIndicator = function () {
        var focusElementParent;
        this.focusIndicator = document.createElement('DIV');
        this.focusIndicator.setAttribute('class', 'tapFocusIndicator');
        this.focusIndicator.setAttribute('style', 'visibility: hidden;');

        focusElementParent = this.focusElement.parentNode;
        focusElementParent.appendChild(this.focusIndicator);
    };

    proto.setTabAnimationRatio = function (ratio) {
        var LEFT = 18;
        var RIGHT = 48 + 18;
        var size, opacityString;
        var style;

        // Round away any exponents that might appear.
        ratio = Math.round((ratio) * 1000) / 1000;
        if (ratio >= 0.999) {
            this.tabAffordance.setAttribute('style', 'display: none;');
        } else {
            this.tabAffordance.setAttribute('style', 'display: block;');
        }
        size = RIGHT * ratio + LEFT * (1 - ratio);
        opacityString = 'opacity: ' + (1 - ratio) + ';';
        style = opacityString + ' ' +
            'width: ' + size + 'px;';
        this.tabElem.setAttribute('style', style);
    };

    proto.setMenuAnimationRatio = function (ratio) {
        var LEFT = -48 - 18;
        var RIGHT = -18;
        var size, opacityString;
        var style;

        // Round away any exponents that might appear.
        ratio = Math.round((ratio) * 1000) / 1000;

        size = RIGHT * ratio + LEFT * (1 - ratio);
        opacityString = 'opacity: ' + ratio + ';';
        style = 'left: ' + (size - 4) + 'px; ' +
            opacityString + ' ' +
            'width: ' + (-size) + 'px;';
        ratio = Math.round((ratio) * 1000) / 1000;

        if (ratio <= 0.001) {
            this.closeAffordance.setAttribute('style', 'display: none;');
            opacityString="display:none;"
        } else {
            this.closeAffordance.setAttribute('style', 'display: block;');
        }

        this.closeElem.setAttribute('style', style);

        this.menuElem.setAttribute('style', opacityString);
    };

    proto.disableScrolling = function() {
        var style = {
            height: "100%",
            overflow: "hidden",
            position: "fixed",
            width: "100%"
        }
        
        var styleString = "";
        for (var key in style) {
            styleString += key + ": " + style[key] + "; ";
        }

        document.body.setAttribute('style', styleString)
    }

    /** Audio Methods **/

    proto.disableAudio = function () {
        // Overwrite the playseed function to disable it.
        window.playSeed = function () {};
    };

    proto.isAudioSupported = function () {
        var isAudioSupported = true;

        if (typeof webkitAudioContext !== 'undefined') {
            // We may be on Mobile Safari, which throws up
            // 'Operation not Supported' alerts when we attempt to
            // play Audio elements with "data:audio/wav;base64"
            // encoded HTML5 Audio elements.
            //
            // Switching to MP3 encoded audio may be the way we have
            // to go to get Audio working on mobile devices.
            //
            // e.g. https://github.com/rioleo/webaudio-api-synthesizer
            isAudioSupported = false;
        }

        return isAudioSupported;
    };

    /** Other HTML5 Stuff **/

    proto.disableSelection = function () {
        var body;
        body = document.getElementsByTagName('body')[0];
        body.setAttribute('class', body.getAttribute('class') + ' disable-select');
    };

}(window.Mobile.GestureHandler.prototype));

window.Animator = function () {
    this.initialize.apply(this, arguments);
};

(function (proto) {
    proto.initialize = function () {
        this._animations = {};
        this.tick = this.tick.bind(this);
    };

    proto.animate = function (key, tick) {
        this._animations[key] = tick;
        this.wakeup();
    };

    proto.wakeup = function () {
        if (this._isAnimating) {
            return;
        }
        this._isAnimating = true;
        this.tick();
    };

    proto.tick = function () {
        var key;
        var isFinished, allFinished;
        var toRemove, index;

        toRemove = [];
        allFinished = true;
        for (key in this._animations) {
            if (!this._animations.hasOwnProperty(key)) {
                return;
            }
            isFinished = this._animations[key]();
            if (!isFinished) {
                allFinished = false;
            } else {
                toRemove.push(key);
            }
        }

        if (!allFinished) {
            requestAnimationFrame(this.tick);
        } else {
            for (index = 0; index < toRemove.length; toRemove++) {
                delete this._isAnimating[toRemove[index]];
            }
            this._isAnimating = false;
        }
    };

}(window.Animator.prototype));

window.Animator.getInstance = function () {
    if (!window.Animator._instance) {
        window.Animator._instance = new window.Animator();
    }
    return window.Animator._instance;
};

function Animatable(key, increment, update) {
    var ratio;
    var handles;

    handles = {
        animateUp: function () {
            Animator.getInstance().animate(key, tickUp);
        },
        animateDown: function () {
            Animator.getInstance().animate(key, tickDown);
        }
    };

    ratio = 0;

    function tickUp () {
        var isFinished;
        ratio += increment;
        if (ratio >= 1.0) {
            isFinished = true;
            ratio = 1;
        }
        update(ratio);
        return isFinished;
    };

    function tickDown () {
        var isFinished;
        ratio -= increment;
        if (ratio <= 0.0) {
            isFinished = true;
            ratio = 0;
        }
        update(ratio);
        return isFinished;
    };

    return handles;
};


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    'use strict';

    var VENDORS = ['ms', 'moz', 'webkit', 'o'];
    var index, lastTime;

    for (index = 0; index < VENDORS.length && !window.requestAnimationFrame; index++) {
        window.requestAnimationFrame = window[VENDORS[index] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[VENDORS[index] + 'CancelAnimationFrame'];
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = window[VENDORS[index] + 'CancelRequestAnimationFrame'];
        }
    }

    if (!window.requestAnimationFrame) {
        lastTime = 0;
        window.requestAnimationFrame = function(callback, element) {
            var currTime, timeToCall, id;

            currTime = new Date().getTime();
            timeToCall = Math.max(0, 16 - (currTime - lastTime));
            id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;

            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    Mobile.enable();
}());

//////////File Source js/console.js
function jumpToLine(i) {

    var code = parent.form1.code;

    var editor = code.editorreference;

    // editor.getLineHandle does not help as it does not return the reference of line.
    var ll = editor.doc.lastLine();
    var low=i-1-10;    
    var high=i-1+10;    
    var mid=i-1;
    if (low<0){
    	low=0;
    }
    if (high>ll){
    	high=ll;
    }
    if (mid>ll){
    	mid=ll;
    }

    editor.scrollIntoView(low);
    editor.scrollIntoView(high);
    editor.scrollIntoView(mid);
    editor.setCursor(mid, 0);
}

var consolecache = [];


function consolePrintFromRule(text,rule,urgent) {

	if (urgent===undefined) {
		urgent=false;
	}


	var ruleDirection = dirMaskName[rule.direction];

	var logString = '<font color="green">Rule <a onclick="jumpToLine(' + rule.lineNumber + ');"  href="javascript:void(0);">' + 
			rule.lineNumber + '</a> ' + ruleDirection + " : "  + text + '</font>';

	if (cache_console_messages&&urgent==false) {		
		consolecache.push(logString);
	} else {
		addToConsole(logString);
	}
}

function consolePrint(text,urgent) {

	if (urgent===undefined) {
		urgent=false;
	}
	if (cache_console_messages&&urgent==false) {		
		consolecache.push(text);
	} else {
		consoleCacheDump();
		addToConsole(text);
	}
}


var cache_n = 0;

function addToConsole(text) {
	return;
	cache = document.createElement("div");
	cache.id = "cache" + cache_n;
	cache.innerHTML = text;
	cache_n++;
	
	var code = document.getElementById('consoletextarea');
	code.appendChild(cache);
	consolecache=[];
	var objDiv = document.getElementById('lowerarea');
	objDiv.scrollTop = objDiv.scrollHeight;
}

function consoleCacheDump() {
	if (cache_console_messages===false) {
		return;
	}
	
	var lastline = "";
	var times_repeated = 0;
	var summarised_message = "<br>";
	for (var i = 0; i < consolecache.length; i++) {
		if (consolecache[i] == lastline) {
			times_repeated++;
		} else {
			lastline = consolecache[i];
			if (times_repeated > 0) {
				summarised_message = summarised_message + " (x" + (times_repeated + 1) + ")";
			}
			summarised_message += "<br>"
			summarised_message += lastline;
			times_repeated = 0;
		}
	}

	if (times_repeated > 0) {
		summarised_message = summarised_message + " (x" + (times_repeated + 1) + ")";
	}

	addToConsole(summarised_message);
}

function consoleError(text) {	
        var errorString = '<span class="errorText">' + text + '</span>';
        consolePrint(errorString,true);
}
function clearConsole() {
	var code = document.getElementById('consoletextarea');
	code.innerHTML = '';
	var objDiv = document.getElementById('lowerarea');
	objDiv.scrollTop = objDiv.scrollHeight;
}

// var clearConsoleClick = document.getElementById("clearConsoleClick");
// clearConsoleClick.addEventListener("click", clearConsole, false);
//////////File Source js/buildStandalone.js
var get_blob = function() {
		return self.Blob;
}

var standalone_HTML_String="";

// var clientStandaloneRequest = new XMLHttpRequest();

// clientStandaloneRequest.open('GET', 'standalone_inlined.txt');
// clientStandaloneRequest.onreadystatechange = function() {

// 		if(clientStandaloneRequest.readyState!=4) {
// 			return;
// 		}
// 		if (clientStandaloneRequest.responseText==="") {
// 			consolePrint("Couldn't find standalone template. Is there a connection problem to the internet?",true);
// 		}
// 		standalone_HTML_String=clientStandaloneRequest.responseText;
// }
// clientStandaloneRequest.send();

function buildStandalone(sourceCode) {
	if (standalone_HTML_String.length===0) {
		consolePrint("Can't export yet - still downloading html template.",true);
		return;
	}

	var htmlString = standalone_HTML_String.concat("");
	var title = "PuzzleScript Game";
	if (state.metadata.title!==undefined) {
		title=state.metadata.title;
	}
	var homepage = "www.puzzlescript.net";
	if (state.metadata.homepage!==undefined) {
		homepage=state.metadata.homepage;
	}

	if ('background_color' in state.metadata) {
		htmlString = htmlString.replace(/black;\/\*Don\'t/g,state.bgcolor+';\/\*Don\'t');	
	}
	if ('text_color' in state.metadata) {
		htmlString = htmlString.replace(/lightblue;\/\*Don\'t/g,state.fgcolor+';\/\*Don\'t');	
	}

	htmlString = htmlString.replace(/__GAMETITLE__/g,title);
	htmlString = htmlString.replace(/__HOMEPAGE__/g,homepage);

	// $ has special meaning to JavaScript's String.replace ($0, $1, etc.) Escape $ as $$.
	sourceCode = sourceCode.replace(/\$/g, '$$$$');

	htmlString = htmlString.replace(/__GAMEDAT__/g,sourceCode);

	var BB = get_blob();
	var blob = new BB([htmlString], {type: "text/plain;charset=utf-8"});
	saveAs(blob, title+".html");
}

//////////File Source js/engine.js
/*
..................................
.............SOKOBAN..............
..................................
...........#.new game.#...........
..................................
.............continue.............
..................................
arrow keys to move................
x to action.......................
z to undo, r to restart...........
*/


var RandomGen = new RNG();

var intro_template = [
	"..................................",
	"..................................",
	"..................................",
	"......Puzzle Script Terminal......",
	"..............v 1.7...............",
	"..................................",
	"..................................",
	"..................................",
	".........insert cartridge.........",
	"..................................",
	"..................................",
	"..................................",
	".................................."
];

var messagecontainer_template = [
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..........X to continue...........",
	"..................................",
	".................................."
];

var titletemplate_firstgo = [
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..........#.start game.#..........",
	"..................................",
	"..................................",
	".arrow keys to move...............",
	".X to action......................",
	".Z to undo, R to restart..........",
	".................................."];

var titletemplate_select0 = [
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"...........#.new game.#...........",
	"..................................",
	".............continue.............",
	"..................................",
	".arrow keys to move...............",
	".X to action......................",
	".Z to undo, R to restart..........",
	".................................."];

var titletemplate_select1 = [
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	".............new game.............",
	"..................................",
	"...........#.continue.#...........",
	"..................................",
	".arrow keys to move...............",
	".X to action......................",
	".Z to undo, R to restart..........",
	".................................."];


var titletemplate_firstgo_selected = [
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"###########.start game.###########",
	"..................................",
	"..................................",
	".arrow keys to move...............",
	".X to action......................",
	".Z to undo, R to restart..........",
	".................................."];

var titletemplate_select0_selected = [
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"############.new game.############",
	"..................................",
	".............continue.............",
	"..................................",
	".arrow keys to move...............",
	".X to action......................",
	".Z to undo, R to restart..........",
	".................................."];

var titletemplate_select1_selected = [
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	"..................................",
	".............new game.............",
	"..................................",
	"############.continue.############",
	"..................................",
	".arrow keys to move...............",
	".X to action......................",
	".Z to undo, R to restart..........",
	"................................."];

var titleImage = [];
var titleWidth = titletemplate_select1[0].length;
var titleHeight = titletemplate_select1.length;
var textMode = true;
var titleScreen = true;
var titleMode = 0;//1 means there are options
var titleSelection = 0;
var titleSelected = false;

function unloadGame() {
	state = introstate;
	level = new Level(0, 5, 5, 2, null);
	level.objects = new Int32Array(0);
	generateTitleScreen();
	canvasResize();
	redraw();
}

function generateTitleScreen() {
	titleMode = (curlevel > 0 || curlevelTarget !== null) ? 1 : 0;

	if (state.levels.length === 0) {
		titleImage = intro_template;
		return;
	}

	var title = "PuzzleScript Game";
	if (state.metadata.title !== undefined) {
		title = state.metadata.title;
	}

	if (titleMode === 0) {
		if (titleSelected) {
			titleImage = deepClone(titletemplate_firstgo_selected);
		} else {
			titleImage = deepClone(titletemplate_firstgo);
		}
	} else {
		if (titleSelection === 0) {
			if (titleSelected) {
				titleImage = deepClone(titletemplate_select0_selected);
			} else {
				titleImage = deepClone(titletemplate_select0);
			}
		} else {
			if (titleSelected) {
				titleImage = deepClone(titletemplate_select1_selected);
			} else {
				titleImage = deepClone(titletemplate_select1);
			}
		}
	}

	var noAction = 'noaction' in state.metadata;
	var noUndo = 'noundo' in state.metadata;
	var noRestart = 'norestart' in state.metadata;
	if (noUndo && noRestart) {
		titleImage[11] = "..............................................";
	} else if (noUndo) {
		titleImage[11] = ".......R to restart...........................";
	} else if (noRestart) {
		titleImage[11] = ".Z to undo.....................";
	}
	if (noAction) {
		titleImage[10] = ".......X to select............................";
	}
	for (var i = 0; i < titleImage.length; i++) {
		titleImage[i] = titleImage[i].replace(/\./g, ' ');
	}

	var width = titleImage[0].length;
	var titlelines = wordwrap(title, titleImage[0].length);
	if (state.metadata.author !== undefined) {
		if (titlelines.length > 3) {
			titlelines.splice(3);
			logWarning("Game title is too long to fit on screen, truncating to three lines.", undefined, true);
		}
	} else {
		if (titlelines.length > 5) {
			titlelines.splice(5);
			logWarning("Game title is too long to fit on screen, truncating to five lines.", undefined, true);
		}

	}
	for (var i = 0; i < titlelines.length; i++) {
		var titleline = titlelines[i];
		var titleLength = titleline.length;
		var lmargin = ((width - titleLength) / 2) | 0;
		var rmargin = width - titleLength - lmargin;
		var row = titleImage[1 + i];
		titleImage[1 + i] = row.slice(0, lmargin) + titleline + row.slice(lmargin + titleline.length);
	}
	if (state.metadata.author !== undefined) {
		var attribution = "by " + state.metadata.author;
		var attributionsplit = wordwrap(attribution, titleImage[0].length);
		if (attributionsplit[0].length < titleImage[0].length) {
			attributionsplit[0] = " " + attributionsplit[0];
		}
		if (attributionsplit.length > 3) {
			attributionsplit.splice(3);
			logWarning("Author list too long to fit on screen, truncating to three lines.", undefined, true);
		}
		for (var i = 0; i < attributionsplit.length; i++) {
			var line = attributionsplit[i] + " ";
			if (line.length > width) {
				line = line.slice(0, width);
			}
			var row = titleImage[3 + i];
			titleImage[3 + i] = row.slice(0, width - line.length) + line;
		}
	}

}

var introstate = {
	title: "EMPTY GAME",
	attribution: "increpare",
	objectCount: 2,
	metadata: [],
	levels: [],
	bgcolor: "#000000",
	fgcolor: "#FFFFFF"
};

var state = introstate;

function deepClone(item) {
	if (!item) { return item; } // null, undefined values check

	var types = [Number, String, Boolean],
		result;

	// normalizing primitives if someone did new String('aaa'), or new Number('444');
	types.forEach(function (type) {
		if (item instanceof type) {
			result = type(item);
		}
	});

	if (typeof result == "undefined") {
		if (Object.prototype.toString.call(item) === "[object Array]") {
			result = [];
			item.forEach(function (child, index, array) {
				result[index] = deepClone(child);
			});
		} else if (typeof item == "object") {
			// testing that this is DOM
			if (item.nodeType && typeof item.cloneNode == "function") {
				var result = item.cloneNode(true);
			} else if (!item.prototype) { // check that this is a literal
				if (item instanceof Date) {
					result = new Date(item);
				} else {
					// it is an object literal
					result = {};
					for (var i in item) {
						result[i] = deepClone(item[i]);
					}
				}
			} else {
                // depending what you would like here,
                // just keep the reference, or create new object
/*                if (false && item.constructor) {
                    // would not advice to do that, reason? Read below
                    result = new item.constructor();
                } else */{
					result = item;
				}
			}
		} else {
			result = item;
		}
	}

	return result;
}

function wordwrap(str, width) {

	width = width || 75;
	var cut = true;

	if (!str) { return str; }

	var regex = '.{1,' + width + '}(\\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');

	return str.match(RegExp(regex, 'g'));

}

var splitMessage = [];

function drawMessageScreen() {
	titleMode = 0;
	textMode = true;
	titleImage = deepClone(messagecontainer_template);

	for (var i = 0; i < titleImage.length; i++) {
		titleImage[i] = titleImage[i].replace(/\./g, ' ');
	}

	var emptyLineStr = titleImage[9];
	var xToContinueStr = titleImage[10];

	titleImage[10] = emptyLineStr;

	var width = titleImage[0].length;

	var message;
	if (messagetext === "") {
		var leveldat = state.levels[curlevel];
		message = leveldat.message.trim();
	} else {
		message = messagetext;
	}

	splitMessage = wordwrap(message, titleImage[0].length);


	var offset = 5 - ((splitMessage.length / 2) | 0);
	if (offset < 0) {
		offset = 0;
	}

	var count = Math.min(splitMessage.length, 12);
	for (var i = 0; i < count; i++) {
		var m = splitMessage[i];
		var row = offset + i;
		var messageLength = m.length;
		var lmargin = ((width - messageLength) / 2) | 0;
		var rmargin = width - messageLength - lmargin;
		var rowtext = titleImage[row];
		titleImage[row] = rowtext.slice(0, lmargin) + m + rowtext.slice(lmargin + m.length);
	}

	var endPos = 10;
	if (count >= 10) {
		if (count < 12) {
			endPos = count + 1;
		} else {
			endPos = 12;
		}
	}
	if (quittingMessageScreen) {
		titleImage[endPos] = emptyLineStr;
	} else {
		titleImage[endPos] = xToContinueStr;
	}

	canvasResize();
}

window.setLevel = function (lv) {
	window.level = level = lv;
}

window.setState = function (st) {
	window.state = state = st;
}

var loadedLevelSeed = 0;

function loadLevelFromLevelDat(state, leveldat, randomseed) {
	if (randomseed == null) {
		randomseed = (Math.random() + Date.now()).toString();
	}
	loadedLevelSeed = randomseed;
	RandomGen = new RNG(loadedLevelSeed);
	forceRegenImages = true;
	titleScreen = false;
	titleMode = (curlevel > 0 || curlevelTarget !== null) ? 1 : 0;
	titleSelection = (curlevel > 0 || curlevelTarget !== null) ? 1 : 0;
	titleSelected = false;
	againing = false;
	window.againing = againing;
	if (leveldat === undefined) {
		consolePrint("Trying to access a level that doesn't exist.", true);
		goToTitleScreen();
		return;
	}
	if (leveldat.message === undefined) {
		titleMode = 0;
		textMode = false;
		window.level = level = leveldat.clone();
		RebuildLevelArrays();


		if (state !== undefined) {
			if (state.metadata.flickscreen !== undefined) {
				oldflickscreendat = [
					0,
					0,
					Math.min(state.metadata.flickscreen[0], level.width),
					Math.min(state.metadata.flickscreen[1], level.height)
				];
			} else if (state.metadata.zoomscreen !== undefined) {
				oldflickscreendat = [
					0,
					0,
					Math.min(state.metadata.zoomscreen[0], level.width),
					Math.min(state.metadata.zoomscreen[1], level.height)
				];
			}
		}

		backups = []
		restartTarget = backupLevel();
		keybuffer = [];

		if ('run_rules_on_level_start' in state.metadata) {
			runrulesonlevelstart_phase = true;
			processInput(-1, true);
			runrulesonlevelstart_phase = false;
		}
	} else {
		tryPlayShowMessageSound();
		drawMessageScreen();
		canvasResize();
	}

	clearInputHistory();
}

function loadLevelFromStateTarget(state, levelindex, target, randomseed) {
	var leveldat = target;
	curlevel = levelindex;
	curlevelTarget = target;
	if (leveldat.message === undefined) {
		if (levelindex === 0) {
			tryPlayStartLevelSound();
		} else {
			tryPlayStartLevelSound();
		}
	}
	loadLevelFromLevelDat(state, state.levels[levelindex], randomseed);
	restoreLevel(target);
	restartTarget = target;
}

function loadLevelFromState(state, levelindex, randomseed) {
	var leveldat = state.levels[levelindex];
	curlevel = levelindex;
	curlevelTarget = null;
	if (leveldat !== undefined && leveldat.message === undefined) {
		if (levelindex === 0) {
			tryPlayStartLevelSound();
		} else {
			tryPlayStartLevelSound();
		}
	}
	loadLevelFromLevelDat(state, leveldat, randomseed);
}

window.loadLevelFromState = loadLevelFromState;

var sprites = [
	{
		color: '#423563',
		dat: [
			[1, 1, 1, 1, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 1, 1, 1, 1]
		]
	},
	{
		color: '#252342',
		dat: [
			[0, 0, 1, 0, 0],
			[1, 1, 1, 1, 1],
			[0, 0, 1, 0, 0],
			[0, 1, 1, 1, 0],
			[0, 1, 0, 1, 0]
		]
	}
];


generateTitleScreen();
if (titleMode > 0) {
	titleSelection = 1;
}

// canvasResize();

function tryPlaySimpleSound(soundname) {
	if (state.sfx_Events[soundname] !== undefined) {
		var seed = state.sfx_Events[soundname];
		playSound(seed);
	}
}
function tryPlayTitleSound() {
	tryPlaySimpleSound("titlescreen");
}

function tryPlayStartGameSound() {
	tryPlaySimpleSound("startgame");
}

function tryPlayEndGameSound() {
	tryPlaySimpleSound("endgame");
}

function tryPlayCancelSound() {
	tryPlaySimpleSound("cancel");
}

function tryPlayStartLevelSound() {
	tryPlaySimpleSound("startlevel");
}

function tryPlayEndLevelSound() {
	tryPlaySimpleSound("endlevel");
}

function tryPlayUndoSound() {
	tryPlaySimpleSound("undo");
}

function tryPlayRestartSound() {
	tryPlaySimpleSound("restart");
}

function tryPlayShowMessageSound() {
	tryPlaySimpleSound("showmessage");
}

function tryPlayCloseMessageSound() {
	tryPlaySimpleSound("closemessage");
}

var backups = [];
var restartTarget;

function backupLevel() {
	var ret = {
		dat: new Int32Array(level.objects),
		width: level.width,
		height: level.height,
		oldflickscreendat: oldflickscreendat.concat([])
	};
	return ret;
}

function level4Serialization() {
	var ret = {
		dat: Array.from(level.objects),
		width: level.width,
		height: level.height,
		oldflickscreendat: oldflickscreendat.concat([])
	};
	return ret;
}


function tryDeactivateYoutube() {
	var youtubeFrame = document.getElementById("youtubeFrame");
	if (youtubeFrame) {
		document.body.removeChild(youtubeFrame);
	}
}

function tryActivateYoutube() {
	var youtubeFrame = document.getElementById("youtubeFrame");
	if (youtubeFrame) {
		return;
	}
	if (canYoutube) {
		if ('youtube' in state.metadata) {
			var youtubeid = state.metadata['youtube'];
			var url = "https://www.youtube.com/embed/" + youtubeid + "?autoplay=1&loop=1&playlist=" + youtubeid;
			ifrm = document.createElement("IFRAME");
			ifrm.setAttribute("src", url);
			ifrm.setAttribute("id", "youtubeFrame");
			ifrm.style.visibility = "hidden";
			ifrm.style.width = "500px";
			ifrm.style.height = "500px";
			ifrm.style.position = "absolute";
			ifrm.style.top = "-1000px";
			ifrm.style.left = "-1000px";
			document.body.appendChild(ifrm);
		}
	}
}

window.winning = false;

function setGameState(_state, command, randomseed) {
	oldflickscreendat = [];
	timer = 0;
	autotick = 0;
	window.winning = winning = false;
	againing = false;
	window.againing = againing;
	messageselected = false;
	STRIDE_MOV = _state.STRIDE_MOV;
	STRIDE_OBJ = _state.STRIDE_OBJ;

	sfxCreateMask = new BitVec(STRIDE_OBJ);
	sfxDestroyMask = new BitVec(STRIDE_OBJ);

	if (command === undefined) {
		command = ["restart"];
	}
	if ((state.levels.length === 0 || _state.levels.length === 0) && command.length > 0 && command[0] === "rebuild") {
		command = ["restart"];
	}
	if (randomseed === undefined) {
		randomseed = null;
	}
	RandomGen = new RNG(randomseed);

	state = _state;

	if (command[0] !== "rebuild") {
		backups = [];
	}
	//set sprites
	sprites = [];
	for (var n in state.objects) {
		if (state.objects.hasOwnProperty(n)) {
			var object = state.objects[n];
			var sprite = {
				colors: object.colors,
				dat: object.spritematrix,
				name:n
			};
			sprites[object.id] = sprite;
		}
	}
	state.sprites = sprites;
	if (state.metadata.realtime_interval !== undefined) {
		autotick = 0;
		autotickinterval = state.metadata.realtime_interval * 1000;
	} else {
		autotick = 0;
		autotickinterval = 0;
	}

	if (state.metadata.key_repeat_interval !== undefined) {
		repeatinterval = state.metadata.key_repeat_interval * 1000;
	} else {
		repeatinterval = 150;
	}

	if (state.metadata.again_interval !== undefined) {
		againinterval = state.metadata.again_interval * 1000;
	} else {
		againinterval = 150;
	}
	window.againinterval = againinterval;
	if (throttle_movement && autotickinterval === 0) {
		logWarning("throttle_movement is designed for use in conjunction with realtime_interval. Using it in other situations makes games gross and unresponsive, broadly speaking.  Please don't.");
	}
	norepeat_action = state.metadata.norepeat_action !== undefined;

	switch (command[0]) {
		case "restart":
			{
				if (restarting == true) {
					logWarning('A "restart" command is being triggered in the "run_rules_on_level_start" section of level creation, which would cause an infinite loop if it was actually triggered, but it\'s being ignored, so it\'s not.');
					break;
				}
				window.winning = winning = false;
				timer = 0;
				titleScreen = true;
				tryPlayTitleSound();
				textMode = true;
				titleSelection = (curlevel > 0 || curlevelTarget !== null) ? 1 : 0;
				titleSelected = false;
				quittingMessageScreen = false;
				quittingTitleScreen = false;
				messageselected = false;
				titleMode = 0;
				if ((curlevel > 0 || curlevelTarget !== null)) {
					titleMode = 1;
				}
				generateTitleScreen();
				break;
			}
		case "rebuild":
			{
				//do nothing
				break;
			}
		case "loadFirstNonMessageLevel": {
			for (var i = 0; i < state.levels.length; i++) {
				if (state.levels[i].hasOwnProperty("message")) {
					continue;
				}
				var targetLevel = i;
				curlevel = i;
				window.winning = winning = false;
				timer = 0;
				titleScreen = false;
				textMode = false;
				titleSelection = (curlevel > 0 || curlevelTarget !== null) ? 1 : 0;
				titleSelected = false;
				quittingMessageScreen = false;
				quittingTitleScreen = false;
				messageselected = false;
				titleMode = 0;
				loadLevelFromState(state, targetLevel, randomseed);
				break;
			}
			break;
		}
		case "loadLevel":
			{
				var targetLevel = command[1];
				curlevel = i;
				window.winning = winning = false;
				timer = 0;
				titleScreen = false;
				textMode = false;
				titleSelection = (curlevel > 0 || curlevelTarget !== null) ? 1 : 0;
				titleSelected = false;
				quittingMessageScreen = false;
				quittingTitleScreen = false;
				messageselected = false;
				titleMode = 0;
				loadLevelFromState(state, targetLevel, randomseed);
				break;
			}
		case "levelline":
			{
				var targetLine = command[1];
				for (var i = state.levels.length - 1; i >= 0; i--) {
					var level = state.levels[i];
					if (level.lineNumber <= targetLine + 1) {
						curlevel = i;
						window.winning = winning = false;
						timer = 0;
						titleScreen = false;
						textMode = false;
						titleSelection = (curlevel > 0 || curlevelTarget !== null) ? 1 : 0;
						titleSelected = false;
						quittingMessageScreen = false;
						quittingTitleScreen = false;
						messageselected = false;
						titleMode = 0;
						loadLevelFromState(state, i);
						break;
					}
				}
				break;
			}
	}

	if (command[0] !== "rebuild") {
		clearInputHistory();
	}
	canvasResize();


	if (state.sounds.length == 0 && state.metadata.youtube == null) {
		killAudioButton();
	} else {
		showAudioButton();
	}

}

function RebuildLevelArrays() {
	level.movements = new Int32Array(level.n_tiles * STRIDE_MOV);

	level.rigidMovementAppliedMask = [];
	level.rigidGroupIndexMask = [];
	level.rowCellContents = [];
	level.colCellContents = [];
	level.mapCellContents = new BitVec(STRIDE_OBJ);
	_movementVecs = [new BitVec(STRIDE_MOV), new BitVec(STRIDE_MOV), new BitVec(STRIDE_MOV)];

	_o1 = new BitVec(STRIDE_OBJ);
	_o2 = new BitVec(STRIDE_OBJ);
	_o2_5 = new BitVec(STRIDE_OBJ);
	_o3 = new BitVec(STRIDE_OBJ);
	_o4 = new BitVec(STRIDE_OBJ);
	_o5 = new BitVec(STRIDE_OBJ);
	_o6 = new BitVec(STRIDE_OBJ);
	_o7 = new BitVec(STRIDE_OBJ);
	_o8 = new BitVec(STRIDE_OBJ);
	_o9 = new BitVec(STRIDE_OBJ);
	_o10 = new BitVec(STRIDE_OBJ);
	_o11 = new BitVec(STRIDE_OBJ);
	_o12 = new BitVec(STRIDE_OBJ);
	_m1 = new BitVec(STRIDE_MOV);
	_m2 = new BitVec(STRIDE_MOV);
	_m3 = new BitVec(STRIDE_MOV);


	for (var i = 0; i < level.height; i++) {
		level.rowCellContents[i] = new BitVec(STRIDE_OBJ);
	}
	for (var i = 0; i < level.width; i++) {
		level.colCellContents[i] = new BitVec(STRIDE_OBJ);
	}

	for (var i = 0; i < level.n_tiles; i++) {
		level.rigidMovementAppliedMask[i] = new BitVec(STRIDE_MOV);
		level.rigidGroupIndexMask[i] = new BitVec(STRIDE_MOV);
	}
}

var messagetext = "";
function restoreLevel(lev) {
	oldflickscreendat = lev.oldflickscreendat.concat([]);

	level.objects = new Int32Array(lev.dat);

	if (level.width !== lev.width || level.height !== lev.height) {
		level.width = lev.width;
		level.height = lev.height;
		level.n_tiles = lev.width * lev.height;
		RebuildLevelArrays();
		//regenerate all other stride-related stuff
	}
	else {
		// layercount doesn't change

		for (var i = 0; i < level.n_tiles; i++) {
			level.movements[i] = 0;
			level.rigidMovementAppliedMask[i] = 0;
			level.rigidGroupIndexMask[i] = 0;
		}

		for (var i = 0; i < level.height; i++) {
			var rcc = level.rowCellContents[i];
			rcc.setZero();
		}
		for (var i = 0; i < level.width; i++) {
			var ccc = level.colCellContents[i];
			ccc.setZero();
		}
	}

	againing = false;
	window.againing = againing;
	level.commandQueue = [];
	level.commandQueueSourceRules = [];
}

var zoomscreen = false;
var flickscreen = false;
var screenwidth = 0;
var screenheight = 0;

function DoRestart(force) {
	if (restarting === true) {
		return;
	}
	if (force !== true && ('norestart' in state.metadata)) {
		return;
	}
	restarting = true;
	if (force !== true) {
		backups.push(backupLevel());
	}

	if (verbose_logging) {
		consolePrint("--- restarting ---", true);
	}

	restoreLevel(restartTarget);
	tryPlayRestartSound();

	if ('run_rules_on_level_start' in state.metadata) {
		processInput(-1, true);
	}

	level.commandQueue = [];
	level.commandQueueSourceRules = [];
	restarting = false;
}

window.DoRestart = DoRestart;

function backupDiffers() {
	if (backups.length == 0) {
		return true;
	}
	var bak = backups[backups.length - 1];
	for (var i = 0; i < level.objects.length; i++) {
		if (level.objects[i] !== bak.dat[i]) {
			return true;
		}
	}
	return false;
}

function DoUndo(force, ignoreDuplicates) {
	if ((!levelEditorOpened) && ('noundo' in state.metadata && force !== true)) {
		return;
	}
	if (verbose_logging) {
		consolePrint("--- undoing ---", true);
	}

	if (ignoreDuplicates) {
		while (backupDiffers() == false) {
			backups.pop();
		}
	}

	if (backups.length > 0) {
		var torestore = backups[backups.length - 1];
		restoreLevel(torestore);
		backups = backups.splice(0, backups.length - 1);
		if (!force) {
			tryPlayUndoSound();
		}
	}
}

window.DoUndo = DoUndo;

function getPlayerPositions() {
	var result = [];
	var playerMask = state.playerMask;
	for (i = 0; i < level.n_tiles; i++) {
		level.getCellInto(i, _o11);
		if (playerMask.anyBitsInCommon(_o11)) {
			result.push(i);
		}
	}
	return result;
}

window["getPlayerPositions"] = getPlayerPositions;

function getLayersOfMask(cellMask) {
	var layers = [];
	for (var i = 0; i < state.objectCount; i++) {
		if (cellMask.get(i)) {
			var n = state.idDict[i];
			var o = state.objects[n];
			layers.push(o.layer)
		}
	}
	return layers;
}

function moveEntitiesAtIndex(positionIndex, entityMask, dirMask) {
	var cellMask = level.getCell(positionIndex);
	cellMask.iand(entityMask);
	var layers = getLayersOfMask(cellMask);

	var movementMask = level.getMovements(positionIndex);
	for (var i = 0; i < layers.length; i++) {
		movementMask.ishiftor(dirMask, 5 * layers[i]);
	}
	level.setMovements(positionIndex, movementMask);
}


function startMovement(dir) {
	var movedany = false;
	var playerPositions = getPlayerPositions();
	for (var i = 0; i < playerPositions.length; i++) {
		var playerPosIndex = playerPositions[i];
		moveEntitiesAtIndex(playerPosIndex, state.playerMask, dir);
	}
	return playerPositions;
}

var dirMasksDelta = {
	1: [0, -1],//up
	2: [0, 1],//'down'  : 
	4: [-1, 0],//'left'  : 
	8: [1, 0],//'right' : 
	15: [0, 0],//'?' : 
	16: [0, 0],//'action' : 
	3: [0, 0]//'no'
};

var dirMaskName = {
	1: 'up',
	2: 'down',
	4: 'left',
	8: 'right',
	15: '?',
	16: 'action',
	3: 'no'
};

var seedsToPlay_CanMove = [];
var seedsToPlay_CantMove = [];

function repositionEntitiesOnLayer(positionIndex, layer, dirMask) {
	var delta = dirMasksDelta[dirMask];

	var dx = delta[0];
	var dy = delta[1];
	var tx = ((positionIndex / level.height) | 0);
	var ty = ((positionIndex % level.height));
	var maxx = level.width - 1;
	var maxy = level.height - 1;

	if ((tx === 0 && dx < 0) || (tx === maxx && dx > 0) || (ty === 0 && dy < 0) || (ty === maxy && dy > 0)) {
		return false;
	}

	var targetIndex = (positionIndex + delta[1] + delta[0] * level.height);

	var layerMask = state.layerMasks[layer];
	var targetMask = level.getCellInto(targetIndex, _o7);
	var sourceMask = level.getCellInto(positionIndex, _o8);

	if (layerMask.anyBitsInCommon(targetMask) && (dirMask != 16)) {
		return false;
	}

	for (var i = 0; i < state.sfx_MovementMasks.length; i++) {
		var o = state.sfx_MovementMasks[i];
		var objectMask = o.objectMask;
		if (objectMask.anyBitsInCommon(sourceMask)) {
			var movementMask = level.getMovements(positionIndex);
			var directionMask = o.directionMask;
			if (movementMask.anyBitsInCommon(directionMask) && seedsToPlay_CanMove.indexOf(o.seed) === -1) {
				seedsToPlay_CanMove.push(o.seed);
			}
		}
	}

	var movingEntities = sourceMask.clone();
	sourceMask.iclear(layerMask);
	movingEntities.iand(layerMask);
	targetMask.ior(movingEntities);

	level.setCell(positionIndex, sourceMask);
	level.setCell(targetIndex, targetMask);

	var colIndex = (targetIndex / level.height) | 0;
	var rowIndex = (targetIndex % level.height);
	level.colCellContents[colIndex].ior(movingEntities);
	level.rowCellContents[rowIndex].ior(movingEntities);
	level.mapCellContents.ior(movingEntities);
	return true;
}

function repositionEntitiesAtCell(positionIndex) {
	var movementMask = level.getMovements(positionIndex);
	if (movementMask.iszero())
		return false;

	var moved = false;
	for (var layer = 0; layer < level.layerCount; layer++) {
		var layerMovement = movementMask.getshiftor(0x1f, 5 * layer);
		if (layerMovement !== 0) {
			var thismoved = repositionEntitiesOnLayer(positionIndex, layer, layerMovement);
			if (thismoved) {
				movementMask.ishiftclear(layerMovement, 5 * layer);
				moved = true;
			}
		}
	}

	level.setMovements(positionIndex, movementMask);

	return moved;
}


function Level(lineNumber, width, height, layerCount, objects) {
	this.lineNumber = lineNumber;
	this.width = width;
	this.height = height;
	this.n_tiles = width * height;
	this.objects = objects;
	this.layerCount = layerCount;
	this.commandQueue = [];
	this.commandQueueSourceRules = [];
}

Level.prototype.clone = function () {
	var clone = new Level(this.lineNumber, this.width, this.height, this.layerCount, null);
	clone.objects = new Int32Array(this.objects);
	return clone;
}

Level.prototype.getCell = function (index) {
	return new BitVec(this.objects.subarray(index * STRIDE_OBJ, index * STRIDE_OBJ + STRIDE_OBJ));
}

Level.prototype.getCellInto = function (index, targetarray) {
	for (var i = 0; i < STRIDE_OBJ; i++) {
		targetarray.data[i] = this.objects[index * STRIDE_OBJ + i];
	}
	return targetarray;
}

Level.prototype.setCell = function (index, vec) {
	for (var i = 0; i < vec.data.length; ++i) {
		this.objects[index * STRIDE_OBJ + i] = vec.data[i];
	}
}

var _movementVecs;
var _movementVecIndex = 0;
Level.prototype.getMovements = function (index) {
	var _movementsVec = _movementVecs[_movementVecIndex];
	_movementVecIndex = (_movementVecIndex + 1) % _movementVecs.length;

	for (var i = 0; i < STRIDE_MOV; i++) {
		_movementsVec.data[i] = this.movements[index * STRIDE_MOV + i];
	}
	return _movementsVec;
}

Level.prototype.setMovements = function (index, vec) {
	for (var i = 0; i < vec.data.length; ++i) {
		this.movements[index * STRIDE_MOV + i] = vec.data[i];
	}
}

var ellipsisPattern = ['ellipsis'];

function BitVec(init) {
	this.data = new Int32Array(init);
	return this;
}

BitVec.prototype.cloneInto = function (target) {
	for (var i = 0; i < this.data.length; ++i) {
		target.data[i] = this.data[i];
	}
	return target;
}
BitVec.prototype.clone = function () {
	return new BitVec(this.data);
}

BitVec.prototype.iand = function (other) {
	for (var i = 0; i < this.data.length; ++i) {
		this.data[i] &= other.data[i];
	}
}


BitVec.prototype.inot = function () {
	for (var i = 0; i < this.data.length; ++i) {
		this.data[i] = ~this.data[i];
	}
}

BitVec.prototype.ior = function (other) {
	for (var i = 0; i < this.data.length; ++i) {
		this.data[i] |= other.data[i];
	}
}

BitVec.prototype.iclear = function (other) {
	for (var i = 0; i < this.data.length; ++i) {
		this.data[i] &= ~other.data[i];
	}
}

BitVec.prototype.ibitset = function (ind) {
	this.data[ind >> 5] |= 1 << (ind & 31);
}

BitVec.prototype.ibitclear = function (ind) {
	this.data[ind >> 5] &= ~(1 << (ind & 31));
}

BitVec.prototype.get = function (ind) {
	return (this.data[ind >> 5] & 1 << (ind & 31)) !== 0;
}

BitVec.prototype.getshiftor = function (mask, shift) {
	var toshift = shift & 31;
	var ret = this.data[shift >> 5] >>> (toshift);
	if (toshift) {
		ret |= this.data[(shift >> 5) + 1] << (32 - toshift);
	}
	return ret & mask;
}

BitVec.prototype.ishiftor = function (mask, shift) {
	var toshift = shift & 31;
	var low = mask << toshift;
	this.data[shift >> 5] |= low;
	if (toshift) {
		var high = mask >> (32 - toshift);
		this.data[(shift >> 5) + 1] |= high;
	}
}

BitVec.prototype.ishiftclear = function (mask, shift) {
	var toshift = shift & 31;
	var low = mask << toshift;
	this.data[shift >> 5] &= ~low;
	if (toshift) {
		var high = mask >> (32 - (shift & 31));
		this.data[(shift >> 5) + 1] &= ~high;
	}
}

BitVec.prototype.equals = function (other) {
	if (this.data.length !== other.data.length)
		return false;
	for (var i = 0; i < this.data.length; ++i) {
		if (this.data[i] !== other.data[i])
			return false;
	}
	return true;
}

BitVec.prototype.setZero = function () {
	for (var i = 0; i < this.data.length; ++i) {
		this.data[i] = 0;
	}
}

BitVec.prototype.iszero = function () {
	for (var i = 0; i < this.data.length; ++i) {
		if (this.data[i])
			return false;
	}
	return true;
}

BitVec.prototype.bitsSetInArray = function (arr) {
	for (var i = 0; i < this.data.length; ++i) {
		if ((this.data[i] & arr[i]) !== this.data[i]) {
			return false;
		}
	}
	return true;
}

BitVec.prototype.bitsClearInArray = function (arr) {
	for (var i = 0; i < this.data.length; ++i) {
		if (this.data[i] & arr[i]) {
			return false;
		}
	}
	return true;
}

BitVec.prototype.anyBitsInCommon = function (other) {
	return !this.bitsClearInArray(other.data);
}

var call1List = [];
var call1Count = 0;

window.compaireCallList = function () {
	for (let i = 0; i < call1List.length; i++) {
		if (call1List[i] != call2List[i]) {
			console.error("????", i, call1List[i], call2List[i]);
		}
	}
}

function Rule(rule) {
	this.direction = rule[0]; 		/* direction rule scans in */
	this.patterns = rule[1];		/* lists of CellPatterns to match */
	this.hasReplacements = rule[2];
	this.lineNumber = rule[3];		/* rule source for debugging */
	this.isEllipsis = rule[4];		/* true if pattern has ellipsis */
	this.groupNumber = rule[5];		/* execution group number of rule */
	this.isRigid = rule[6];
	this.commands = rule[7];		/* cancel, restart, sfx, etc */
	this.isRandom = rule[8];
	this.cellRowMasks = rule[9];
	this.cellRowMatches = [];
	let _this = this;
	for (var i = 0; i < this.patterns.length; i++) {
		this.cellRowMatches.push((function () {
			if (window.hasEval) {
				let call = _this.generateCellRowMatchesFunction(_this.patterns[i], _this.isEllipsis[i]);
				return function () {
					call1Count++;
					let res = call.apply(_this, arguments);
					call1List.push(res);
					return res;
				}
			} else {
				let call = _this.generateCellRowMatchesFunction2(_this.patterns[i], _this.isEllipsis[i]);
				return function () {
					call1Count++;
					let res = call.apply(_this, arguments);
					call1List.push(res);
					return res;
				}
			}
		})());
	}
	// if (!window.hasEval) {
	// 	for (var i = 0; i < this.patterns.length; i++) {
	// 		this.cellRowMatches.push(this.generateCellRowMatchesFunction2(this.patterns[i], this.isEllipsis[i]));
	// 	}
	// } else {
	// 	for (var i = 0; i < this.patterns.length; i++) {
	// 		this.cellRowMatches.push(this.generateCellRowMatchesFunction(this.patterns[i], this.isEllipsis[i]));
	// 	}
	// }
	/* TODO: eliminate isRigid, groupNumber, isRandom
	from this class by moving them up into a RuleGroup class */
}



function zz(cellRow, i) {
	var d = 1 + 0 * level.height;
	var cellObjects0 = level.objects[i];
	var cellMovements0 = level.movements[i];
	return (true && (0 | (cellObjects0 & 48))) && cellRow[1].matches((i + 1 * d))
}


window.hasEval = false;

Rule.prototype.generateCellRowMatchesFunction2 = function (cellRow, hasEllipsis) {
	if (hasEllipsis == false) {
		var sobj = STRIDE_OBJ;
		var smov = STRIDE_MOV;
		var cell0Call = cellRow[0].generateMatchString2('0_')
		var delta = dirMasksDelta[this.direction];
		var d0 = delta[0];
		var d1 = delta[1];
		var cr_l = cellRow.length;
		return (cellRow2, j, kmax, kmin) => {
			var d = d1 + d0 * level.height;
			var cellObjects = [];
			if (sobj === 1) {
				for (var i = 0; i < sobj; ++i) {
					cellObjects[i] = level.objects[j];
				}
			} else {
				for (var i = 0; i < sobj; ++i) {
					cellObjects[i] = level.objects[j * sobj + i];
				}
			}
			var cellMovements = [];
			if (smov === 1) {
				for (var i = 0; i < smov; ++i) {
					cellMovements[i] = level.movements[j];
				}
			} else {
				for (var i = 0; i < smov; ++i) {
					cellMovements[i] = level.movements[j * smov + i];
				}
			}
			let flag = cell0Call(cellObjects, cellMovements);
			if (!flag) return false;
			for (var cellIndex = 1; cellIndex < cr_l; cellIndex++) {
				if (!cellRow2[cellIndex].matches(j + cellIndex * d)) return false;
			}
			return true;
		}
	} else {
		var delta = dirMasksDelta[this.direction];
		var d0 = delta[0];
		var d1 = delta[1];
		var cr_l = cellRow.length;
		return (cellRow2, j, kmax, kmin) => {
			var d = d1 + d0 * level.height;
			var result = [];
			var cond = cellRow2[0].matches(j);
			var cellIndex = 1;
			for (; cellRow[cellIndex] !== ellipsisPattern; cellIndex++) {
				cond = cond && cellRow[cellIndex].matches(j + cellIndex * d);
			}
			cellIndex++;
			if (cond) {
				for (var k = kmin; k < kmax; k++) {
					cond = cellRow2[cellIndex].matches((i + d * (k + (cellIndex - 1))));
					cellIndex++;
					for (; cellIndex < cr_l; cellIndex++) {
						cond = cond && cellRow[cellIndex].matches((i + d * (k + (cellIndex - 1))));
					}
					if (cond) {
						result.push([i, k]);
					}
				}
			}
			return result;
		}
	}
}

Rule.prototype.generateCellRowMatchesFunction = function (cellRow, hasEllipsis) {
	if (hasEllipsis == false) {
		var delta = dirMasksDelta[this.direction];
		var d0 = delta[0];
		var d1 = delta[1];
		var cr_l = cellRow.length;

		/*
		hard substitute in the first one - if I substitute in all of them, firefox chokes.
		*/
		var fn = "var d = " + d1 + "+" + d0 + "*level.height;\n";
		var mul = STRIDE_OBJ === 1 ? '' : '*' + STRIDE_OBJ;
		for (var i = 0; i < STRIDE_OBJ; ++i) {
			fn += 'var cellObjects' + i + ' = level.objects[i' + mul + (i ? '+' + i : '') + '];\n';
		}
		mul = STRIDE_MOV === 1 ? '' : '*' + STRIDE_MOV;
		for (var i = 0; i < STRIDE_MOV; ++i) {
			fn += 'var cellMovements' + i + ' = level.movements[i' + mul + (i ? '+' + i : '') + '];\n';
		}
		fn += "return " + cellRow[0].generateMatchString('0_');// cellRow[0].matches(i)";
		for (var cellIndex = 1; cellIndex < cr_l; cellIndex++) {
			fn += "&&cellRow[" + cellIndex + "].matches((i+" + cellIndex + "*d))";
		}
		fn += ";";

		if (fn in matchCache) {
			return matchCache[fn];
		}
		//console.log(fn.replace(/\s+/g, ' '));
		return matchCache[fn] = new Function("cellRow", "i", fn);
	} else {
		var delta = dirMasksDelta[this.direction];
		var d0 = delta[0];
		var d1 = delta[1];
		var cr_l = cellRow.length;


		var fn = "var d = " + d1 + "+" + d0 + "*level.height;\n";
		fn += "var result = [];\n"
		fn += "if(cellRow[0].matches(i)";
		var cellIndex = 1;
		for (; cellRow[cellIndex] !== ellipsisPattern; cellIndex++) {
			fn += "&&cellRow[" + cellIndex + "].matches((i+" + cellIndex + "*d))";
		}
		cellIndex++;
		fn += ") {\n";
		fn += "\tfor (var k=kmin;k<kmax;k++) {\n"
		fn += "\t\tif(cellRow[" + cellIndex + "].matches((i+d*(k+" + (cellIndex - 1) + ")))";
		cellIndex++;
		for (; cellIndex < cr_l; cellIndex++) {
			fn += "&&cellRow[" + cellIndex + "].matches((i+d*(k+" + (cellIndex - 1) + ")))";
		}
		fn += "){\n";
		fn += "\t\t\tresult.push([i,k]);\n";
		fn += "\t\t}\n"
		fn += "\t}\n";
		fn += "}\n";
		fn += "return result;"


		if (fn in matchCache) {
			return matchCache[fn];
		}
		//console.log(fn.replace(/\s+/g, ' '));
		return matchCache[fn] = new Function("cellRow", "i", "kmax", "kmin", fn);
	}
	//say cellRow has length 3, with a split in the middle
	/*
	function cellRowMatchesWildcardFunctionGenerate(direction,cellRow,i, maxk, mink) {
	
		var result = [];
		var matchfirsthalf = cellRow[0].matches(i);
		if (matchfirsthalf) {
			for (var k=mink;k<maxk;k++) {
				if (cellRow[2].matches((i+d*(k+0)))) {
					result.push([i,k]);
				}
			}
		}
		return result;
	}
	*/


}


Rule.prototype.toJSON = function () {
	/* match construction order for easy deserialization */
	return [
		this.direction, this.patterns, this.hasReplacements, this.lineNumber, this.isEllipsis,
		this.groupNumber, this.isRigid, this.commands, this.isRandom, this.cellRowMasks
	];
};

var STRIDE_OBJ = 1;
var STRIDE_MOV = 1;

var call2Count = 0;
var call2List = [];

function CellPattern(row) {
	this.objectsPresent = row[0];
	this.objectsMissing = row[1];
	this.anyObjectsPresent = row[2];
	this.movementsPresent = row[3];
	this.movementsMissing = row[4];
	let _this = this;
	this.matches = (function () {
		if (window.hasEval) {
			let call = _this.generateMatchFunction();
			return function () {
				call2Count++;
				let res = call.apply(_this, arguments);
				call2List.push(res);
				return res;
			}
		} else {
			let call = _this.generateMatchFunction2();
			return function () {
				call2Count++;
				let res = call.apply(_this, arguments);
				call2List.push(res);
				return res;
			}
		}
	})();
	// if (!window.hasEval) {
	// 	this.matches = this.generateMatchFunction2();
	// } else {
	// 	this.matches = this.generateMatchFunction();
	// }
	this.replacement = row[5];
};

function CellReplacement(row) {
	this.objectsClear = row[0];
	this.objectsSet = row[1];
	this.movementsClear = row[2];
	this.movementsSet = row[3];
	this.movementsLayerMask = row[4];
	this.randomEntityMask = row[5];
	this.randomDirMask = row[6];
};


var matchCache = {};


CellPattern.prototype.generateMatchString2 = function () {
	var ops = [];
	var oms = [];
	var mps = [];
	var mms = [];
	var max = Math.max(STRIDE_OBJ, STRIDE_MOV);
	for (var i = 0; i < max; ++i) {
		ops[i] = this.objectsPresent.data[i];
		oms[i] = this.objectsMissing.data[i];
		mps[i] = this.movementsPresent.data[i];
		mms[i] = this.movementsMissing.data[i];
	}
	var alen = this.anyObjectsPresent.length;
	var sobj = STRIDE_OBJ;
	var apji = [];
	for (var j = 0; j < this.anyObjectsPresent.length; j++) {
		apji[j] = [];
		for (var i = 0; i < STRIDE_OBJ; ++i) {
			apji[j][i] = this.anyObjectsPresent[j].data[i];
		}
	}
	return (cellObjects, cellMovements) => {
		let val = true;
		for (var i = 0; i < max; ++i) {
			var co = cellObjects[i];
			var cm = cellMovements[i];
			var op = ops[i];
			var om = oms[i];
			var mp = mps[i];
			var mm = mms[i];
			if (op) {
				if (op & (op - 1))
					val = val && ((co & op) === op);
				else
					val = val && (co & op);
			}
			if (om)
				val = val && !(co & om);
			if (mp) {
				if (mp & (mp - 1))
					val = val && ((cm & mp) === mp);
				else
					val = val && (cm & mp);
			}
			if (mm)
				val = val && !(cm & mm);
		}
		for (var j = 0; j < alen; j++) {
			let v = 0;
			for (var i = 0; i < sobj; ++i) {
				var aop = apji[j][i];
				if (aop) {
					v = v | (cellObjects[i] & aop);
				}
			}
			val = val && v;
		}
		return val;
	}
}

CellPattern.prototype.generateMatchString = function () {
	var fn = "(true";
	for (var i = 0; i < Math.max(STRIDE_OBJ, STRIDE_MOV); ++i) {
		var co = 'cellObjects' + i;
		var cm = 'cellMovements' + i;
		var op = this.objectsPresent.data[i];
		var om = this.objectsMissing.data[i];
		var mp = this.movementsPresent.data[i];
		var mm = this.movementsMissing.data[i];
		if (op) {
			if (op & (op - 1))
				fn += '\t\t&& ((' + co + '&' + op + ')===' + op + ')\n';
			else
				fn += '\t\t&& (' + co + '&' + op + ')\n';
		}
		if (om)
			fn += '\t\t&& !(' + co + '&' + om + ')\n';
		if (mp) {
			if (mp & (mp - 1))
				fn += '\t\t&& ((' + cm + '&' + mp + ')===' + mp + ')\n';
			else
				fn += '\t\t&& (' + cm + '&' + mp + ')\n';
		}
		if (mm)
			fn += '\t\t&& !(' + cm + '&' + mm + ')\n';
	}
	for (var j = 0; j < this.anyObjectsPresent.length; j++) {
		fn += "\t\t&& (0";
		for (var i = 0; i < STRIDE_OBJ; ++i) {
			var aop = this.anyObjectsPresent[j].data[i];
			if (aop)
				fn += "|(cellObjects" + i + "&" + aop + ")";
		}
		fn += ")";
	}
	fn += '\t)';
	return fn;
}


// "	var cellObjects0 = level.objects[i];
// 	var cellMovements0 = level.movements[i];
// return (true		&& (0|(cellObjects0&48))	);"
CellPattern.prototype.generateMatchFunction2 = function () {
	var call = this.generateMatchString2();
	var sobj = STRIDE_OBJ;
	var smov = STRIDE_MOV;
	return (j) => {
		var cellObjects = [];
		var cellMovements = [];
		if (sobj === 1) {
			for (var i = 0; i < sobj; ++i) {
				cellObjects[i] = level.objects[j];
			}
		} else {
			for (var i = 0; i < sobj; ++i) {
				cellObjects[i] = level.objects[j * sobj + i];
			}
		}
		if (smov === 1) {
			for (var i = 0; i < smov; ++i) {
				cellMovements[i] = level.movements[j];
			}
		} else {
			for (var i = 0; i < smov; ++i) {
				cellMovements[i] = level.movements[j * smov + i];
			}
		}
		return call(cellObjects, cellMovements);
	}
}

CellPattern.prototype.generateMatchFunction = function () {
	var i;
	var fn = '';
	var mul = STRIDE_OBJ === 1 ? '' : '*' + STRIDE_OBJ;
	for (var i = 0; i < STRIDE_OBJ; ++i) {
		fn += '\tvar cellObjects' + i + ' = level.objects[i' + mul + (i ? '+' + i : '') + '];\n';
	}
	mul = STRIDE_MOV === 1 ? '' : '*' + STRIDE_MOV;
	for (var i = 0; i < STRIDE_MOV; ++i) {
		fn += '\tvar cellMovements' + i + ' = level.movements[i' + mul + (i ? '+' + i : '') + '];\n';
	}
	fn += "return " + this.generateMatchString() + ';';
	if (fn in matchCache) {
		return matchCache[fn];
	}
	//console.log(fn.replace(/\s+/g, ' '));
	return matchCache[fn] = new Function("i", fn);
}

CellPattern.prototype.toJSON = function () {
	return [
		this.movementMask, this.cellMask, this.nonExistenceMask,
		this.moveNonExistenceMask, this.moveStationaryMask, this.randomDirOrEntityMask,
		this.movementsToRemove
	];
};

var _o1, _o2, _o2_5, _o3, _o4, _o5, _o6, _o7, _o8, _o9, _o10, _o11, _o12;
var _m1, _m2, _m3;

CellPattern.prototype.replace = function (rule, currentIndex) {
	var replace = this.replacement;

	if (replace === null) {
		return false;
	}

	var replace_RandomEntityMask = replace.randomEntityMask;
	var replace_RandomDirMask = replace.randomDirMask;

	var objectsSet = replace.objectsSet.cloneInto(_o1);
	var objectsClear = replace.objectsClear.cloneInto(_o2);

	var movementsSet = replace.movementsSet.cloneInto(_m1);
	var movementsClear = replace.movementsClear.cloneInto(_m2);
	movementsClear.ior(replace.movementsLayerMask);

	if (!replace_RandomEntityMask.iszero()) {
		var choices = [];
		for (var i = 0; i < 32 * STRIDE_OBJ; i++) {
			if (replace_RandomEntityMask.get(i)) {
				choices.push(i);
			}
		}
		var rand = choices[Math.floor(RandomGen.uniform() * choices.length)];
		var n = state.idDict[rand];
		var o = state.objects[n];
		objectsSet.ibitset(rand);
		objectsClear.ior(state.layerMasks[o.layer]);
		movementsClear.ishiftor(0x1f, 5 * o.layer);
	}
	if (!replace_RandomDirMask.iszero()) {
		for (var layerIndex = 0; layerIndex < level.layerCount; layerIndex++) {
			if (replace_RandomDirMask.get(5 * layerIndex)) {
				var randomDir = Math.floor(RandomGen.uniform() * 4);
				movementsSet.ibitset(randomDir + 5 * layerIndex);
			}
		}
	}

	var curCellMask = level.getCellInto(currentIndex, _o2_5);
	var curMovementMask = level.getMovements(currentIndex);

	var oldCellMask = curCellMask.cloneInto(_o3);
	var oldMovementMask = curMovementMask.cloneInto(_m3);

	curCellMask.iclear(objectsClear);
	curCellMask.ior(objectsSet);

	curMovementMask.iclear(movementsClear);
	curMovementMask.ior(movementsSet);

	var rigidchange = false;
	var curRigidGroupIndexMask = 0;
	var curRigidMovementAppliedMask = 0;
	if (rule.isRigid) {
		var rigidGroupIndex = state.groupNumber_to_RigidGroupIndex[rule.groupNumber];
		rigidGroupIndex++;//don't forget to -- it when decoding :O
		var rigidMask = new BitVec(STRIDE_MOV);
		for (var layer = 0; layer < level.layerCount; layer++) {
			rigidMask.ishiftor(rigidGroupIndex, layer * 5);
		}
		rigidMask.iand(replace.movementsLayerMask);
		curRigidGroupIndexMask = level.rigidGroupIndexMask[currentIndex] || new BitVec(STRIDE_MOV);
		curRigidMovementAppliedMask = level.rigidMovementAppliedMask[currentIndex] || new BitVec(STRIDE_MOV);

		if (!rigidMask.bitsSetInArray(curRigidGroupIndexMask.data) &&
			!replace.movementsLayerMask.bitsSetInArray(curRigidMovementAppliedMask.data)) {
			curRigidGroupIndexMask.ior(rigidMask);
			curRigidMovementAppliedMask.ior(replace.movementsLayerMask);
			rigidchange = true;

		}
	}

	var result = false;

	//check if it's changed
	if (!oldCellMask.equals(curCellMask) || !oldMovementMask.equals(curMovementMask) || rigidchange) {
		result = true;
		if (rigidchange) {
			level.rigidGroupIndexMask[currentIndex] = curRigidGroupIndexMask;
			level.rigidMovementAppliedMask[currentIndex] = curRigidMovementAppliedMask;
		}

		var created = curCellMask.cloneInto(_o4);
		created.iclear(oldCellMask);
		sfxCreateMask.ior(created);
		var destroyed = oldCellMask.cloneInto(_o5);
		destroyed.iclear(curCellMask);
		sfxDestroyMask.ior(destroyed);

		level.setCell(currentIndex, curCellMask);
		level.setMovements(currentIndex, curMovementMask);

		var colIndex = (currentIndex / level.height) | 0;
		var rowIndex = (currentIndex % level.height);
		level.colCellContents[colIndex].ior(curCellMask);
		level.rowCellContents[rowIndex].ior(curCellMask);
		level.mapCellContents.ior(curCellMask);
	}

	return result;
}


//say cellRow has length 5, with a split in the middle
/*
function cellRowMatchesWildcardFunctionGenerate(direction,cellRow,i, maxk, mink) {
	
	var result = [];
	var matchfirsthalf = cellRow[0].matches(i)&&cellRow[1].matches((i+d)%level.n_tiles);
	if (matchfirsthalf) {
		for (var k=mink,kmaxk;k++) {
			if (cellRow[2].matches((i+d*(k+0))%level.n_tiles)&&cellRow[2].matches((i+d*(k+1))%level.n_tiles)) {
				result.push([i,k]);
			}
		}
	}
	return result;
}
*/

function DoesCellRowMatchWildCard(direction, cellRow, i, maxk, mink) {
	if (mink === undefined) {
		mink = 0;
	}

	var cellPattern = cellRow[0];

	//var result=[];

	if (cellPattern.matches(i)) {
		var delta = dirMasksDelta[direction];
		var d0 = delta[0] * level.height;
		var d1 = delta[1];
		var targetIndex = i;

		for (var j = 1; j < cellRow.length; j += 1) {
			targetIndex = (targetIndex + d1 + d0);

			var cellPattern = cellRow[j]
			if (cellPattern === ellipsisPattern) {
				//BAM inner loop time
				for (var k = mink; k < maxk; k++) {
					var targetIndex2 = targetIndex;
					targetIndex2 = (targetIndex2 + (d1 + d0) * (k) + level.n_tiles) % level.n_tiles;
					for (var j2 = j + 1; j2 < cellRow.length; j2++) {
						cellPattern = cellRow[j2];
						if (!cellPattern.matches(targetIndex2)) {
							break;
						}
						targetIndex2 = (targetIndex2 + d1 + d0);
					}

					if (j2 >= cellRow.length) {
						return true;
						//result.push([i,k]);
					}
				}
				break;
			} else if (!cellPattern.matches(targetIndex)) {
				break;
			}
		}
	}
	return false;
}

//say cellRow has length 3
/*
CellRow Matches can be specialized to look something like:
function cellRowMatchesFunctionGenerate(direction,cellRow,i) {
	var delta = dirMasksDelta[direction];
	var d = delta[1]+delta[0]*level.height;
	return cellRow[0].matches(i)&&cellRow[1].matches((i+d)%level.n_tiles)&&cellRow[2].matches((i+2*d)%level.n_tiles);
}
*/

function DoesCellRowMatch(direction, cellRow, i, k) {
	var cellPattern = cellRow[0];
	if (cellPattern.matches(i)) {

		var delta = dirMasksDelta[direction];
		var d0 = delta[0] * level.height;
		var d1 = delta[1];
		var cr_l = cellRow.length;

		var targetIndex = i;
		for (var j = 1; j < cr_l; j++) {
			targetIndex = (targetIndex + d1 + d0);
			cellPattern = cellRow[j];
			if (cellPattern === ellipsisPattern) {
				//only for once off verifications
				targetIndex = (targetIndex + (d1 + d0) * k);
			}
			if (!cellPattern.matches(targetIndex)) {
				break;
			}
		}

		if (j >= cellRow.length) {
			return true;
		}

	}
	return false;
}

function matchCellRow(direction, cellRowMatch, cellRow, cellRowMask) {
	var result = [];

	if ((!cellRowMask.bitsSetInArray(level.mapCellContents.data))) {
		return result;
	}

	var xmin = 0;
	var xmax = level.width;
	var ymin = 0;
	var ymax = level.height;

	var len = cellRow.length;

	switch (direction) {
		case 1://up
			{
				ymin += (len - 1);
				break;
			}
		case 2: //down 
			{
				ymax -= (len - 1);
				break;
			}
		case 4: //left
			{
				xmin += (len - 1);
				break;
			}
		case 8: //right
			{
				xmax -= (len - 1);
				break;
			}
		default:
			{
				window.console.log("EEEP " + direction);
			}
	}

	var horizontal = direction > 2;
	if (horizontal) {
		for (var y = ymin; y < ymax; y++) {
			if (!cellRowMask.bitsSetInArray(level.rowCellContents[y].data)) {
				continue;
			}

			for (var x = xmin; x < xmax; x++) {
				var i = x * level.height + y;
				if (cellRowMatch(cellRow, i)) {
					result.push(i);
				}
			}
		}
	} else {
		for (var x = xmin; x < xmax; x++) {
			if (!cellRowMask.bitsSetInArray(level.colCellContents[x].data)) {
				continue;
			}

			for (var y = ymin; y < ymax; y++) {
				var i = x * level.height + y;
				if (cellRowMatch(cellRow, i)) {
					result.push(i);
				}
			}
		}
	}

	return result;
}


function matchCellRowWildCard(direction, cellRowMatch, cellRow, cellRowMask) {
	var result = [];
	if ((!cellRowMask.bitsSetInArray(level.mapCellContents.data))) {
		return result;
	}
	var xmin = 0;
	var xmax = level.width;
	var ymin = 0;
	var ymax = level.height;

	var len = cellRow.length - 1;//remove one to deal with wildcard
	switch (direction) {
		case 1://up
			{
				ymin += (len - 1);
				break;
			}
		case 2: //down 
			{
				ymax -= (len - 1);
				break;
			}
		case 4: //left
			{
				xmin += (len - 1);
				break;
			}
		case 8: //right
			{
				xmax -= (len - 1);
				break;
			}
		default:
			{
				window.console.log("EEEP2 " + direction);
			}
	}



	var horizontal = direction > 2;
	if (horizontal) {
		for (var y = ymin; y < ymax; y++) {
			if (!cellRowMask.bitsSetInArray(level.rowCellContents[y].data)) {
				continue;
			}

			for (var x = xmin; x < xmax; x++) {
				var i = x * level.height + y;
				var kmax;

				if (direction === 4) { //left
					kmax = x - len + 2;
				} else if (direction === 8) { //right
					kmax = level.width - (x + len) + 1;
				} else {
					window.console.log("EEEP2 " + direction);
				}

				result.push.apply(result, cellRowMatch(cellRow, i, kmax, 0));
			}
		}
	} else {
		for (var x = xmin; x < xmax; x++) {
			if (!cellRowMask.bitsSetInArray(level.colCellContents[x].data)) {
				continue;
			}

			for (var y = ymin; y < ymax; y++) {
				var i = x * level.height + y;
				var kmax;

				if (direction === 2) { // down
					kmax = level.height - (y + len) + 1;
				} else if (direction === 1) { // up
					kmax = y - len + 2;
				} else {
					window.console.log("EEEP2 " + direction);
				}
				result.push.apply(result, cellRowMatch(cellRow, i, kmax, 0));
			}
		}
	}

	return result;
}

function generateTuples(lists) {
	var tuples = [[]];

	for (var i = 0; i < lists.length; i++) {
		var row = lists[i];
		var newtuples = [];
		for (var j = 0; j < row.length; j++) {
			var valtoappend = row[j];
			for (var k = 0; k < tuples.length; k++) {
				var tuple = tuples[k];
				var newtuple = tuple.concat([valtoappend]);
				newtuples.push(newtuple);
			}
		}
		tuples = newtuples;
	}
	return tuples;
}

var rigidBackups = []

function commitPreservationState(ruleGroupIndex) {
	var propagationState = {
		ruleGroupIndex: ruleGroupIndex,
		objects: new Int32Array(level.objects),
		movements: new Int32Array(level.movements),
		rigidGroupIndexMask: level.rigidGroupIndexMask.concat([]),
		rigidMovementAppliedMask: level.rigidMovementAppliedMask.concat([]),
		bannedGroup: level.bannedGroup.concat([]),
		commandQueue: level.commandQueue.concat([]),
		commandQueueSourceRules: level.commandQueueSourceRules.concat([])
	};
	rigidBackups[ruleGroupIndex] = propagationState;
	return propagationState;
}

function restorePreservationState(preservationState) {
	;
	//don't need to concat or anythign here, once something is restored it won't be used again.
	level.objects = new Int32Array(preservationState.objects);
	level.movements = new Int32Array(preservationState.movements);
	level.rigidGroupIndexMask = preservationState.rigidGroupIndexMask.concat([]);
	level.rigidMovementAppliedMask = preservationState.rigidMovementAppliedMask.concat([]);
	level.commandQueue = preservationState.commandQueue.concat([]);
	level.commandQueueSourceRules = preservationState.commandQueueSourceRules.concat([]);
	sfxCreateMask.setZero();
	sfxDestroyMask.setZero();
	consolePrint("Rigid movement application failed, rolling back");

	//	rigidBackups = preservationState.rigidBackups;
}

Rule.prototype.findMatches = function () {
	var matches = [];
	var cellRowMasks = this.cellRowMasks;
	for (var cellRowIndex = 0; cellRowIndex < this.patterns.length; cellRowIndex++) {
		var cellRow = this.patterns[cellRowIndex];
		var matchFunction = this.cellRowMatches[cellRowIndex];
		if (this.isEllipsis[cellRowIndex]) {//if ellipsis     
			var match = matchCellRowWildCard(this.direction, matchFunction, cellRow, cellRowMasks[cellRowIndex]);
		} else {
			var match = matchCellRow(this.direction, matchFunction, cellRow, cellRowMasks[cellRowIndex]);
		}
		if (match.length === 0) {
			return [];
		} else {
			matches.push(match);
		}
	}
	return matches;
};

Rule.prototype.directional = function () {
	//Check if other rules in its rulegroup with the same line number.
	for (var i = 0; i < state.rules.length; i++) {
		var rg = state.rules[i];
		var copyCount = 0;
		for (var j = 0; j < rg.length; j++) {
			if (this.lineNumber === rg[j].lineNumber) {
				copyCount++;
			}
			if (copyCount > 1) {
				return true;
			}
		}
	}

	return false;
}

Rule.prototype.applyAt = function (delta, tuple, check) {
	var rule = this;
	//have to double check they apply
	//Q: why?
	if (check) {
		var ruleMatches = true;
		for (var cellRowIndex = 0; cellRowIndex < rule.patterns.length; cellRowIndex++) {
			if (rule.isEllipsis[cellRowIndex]) {//if ellipsis
				if (DoesCellRowMatchWildCard(rule.direction, rule.patterns[cellRowIndex], tuple[cellRowIndex][0],
					tuple[cellRowIndex][1] + 1, tuple[cellRowIndex][1]) === false) { /* pass mink to specify */
					ruleMatches = false;
					break;
				}
			} else {
				if (DoesCellRowMatch(rule.direction, rule.patterns[cellRowIndex], tuple[cellRowIndex]) === false) {
					ruleMatches = false;
					break;
				}
			}
		}
		if (ruleMatches === false) {
			return false;
		}
	}
	var result = false;

	//APPLY THE RULE
	var d0 = delta[0] * level.height;
	var d1 = delta[1];
	for (var cellRowIndex = 0; cellRowIndex < rule.patterns.length; cellRowIndex++) {
		var preRow = rule.patterns[cellRowIndex];

		var currentIndex = rule.isEllipsis[cellRowIndex] ? tuple[cellRowIndex][0] : tuple[cellRowIndex];
		for (var cellIndex = 0; cellIndex < preRow.length; cellIndex++) {
			var preCell = preRow[cellIndex];

			if (preCell === ellipsisPattern) {
				var k = tuple[cellRowIndex][1];
				currentIndex = (currentIndex + (d1 + d0) * k);
				continue;
			}

			result = preCell.replace(rule, currentIndex) || result;

			currentIndex = (currentIndex + d1 + d0);
		}
	}

	if (verbose_logging && result) {
		var ruleDirection = dirMaskName[rule.direction];
		if (!rule.directional()) {
			ruleDirection = "";
		}

		var logString = '<font color="green">Rule <a onclick="jumpToLine(' + rule.lineNumber + ');"  href="javascript:void(0);">' + rule.lineNumber + '</a> ' +
			ruleDirection + ' applied.</font>';
		consolePrint(logString);
	}

	return result;
};

Rule.prototype.tryApply = function () {
	var delta = dirMasksDelta[this.direction];

	//get all cellrow matches
	var matches = this.findMatches();
	if (matches.length === 0) {
		return false;
	}

	var result = false;
	if (this.hasReplacements) {
		var tuples = generateTuples(matches);
		for (var tupleIndex = 0; tupleIndex < tuples.length; tupleIndex++) {
			var tuple = tuples[tupleIndex];
			var shouldCheck = tupleIndex > 0;
			var success = this.applyAt(delta, tuple, shouldCheck);
			result = success || result;
		}
	}

	if (matches.length > 0) {
		this.queueCommands();
	}
	return result;
};

Rule.prototype.queueCommands = function () {
	var commands = this.commands;
	for (var i = 0; i < commands.length; i++) {
		var command = commands[i];
		var already = false;
		if (level.commandQueue.indexOf(command[0]) >= 0) {
			continue;
		}
		level.commandQueue.push(command[0]);
		level.commandQueueSourceRules.push(this);

		if (verbose_logging) {
			var lineNumber = this.lineNumber;
			var ruleDirection = dirMaskName[this.direction];
			var logString = '<font color="green">Rule <a onclick="jumpToLine(' + lineNumber.toString() + ');"  href="javascript:void(0);">' + lineNumber.toString() + '</a> triggers command ' + command[0] + '.</font>';
			consolePrint(logString, true);
		}

		if (command[0] === 'message') {
			messagetext = command[1];
		}
	}
};

function showTempMessage() {
	keybuffer = [];
	textMode = true;
	titleScreen = false;
	quittingMessageScreen = false;
	messageselected = false;
	tryPlayShowMessageSound();
	drawMessageScreen();
	canvasResize();
}

function processOutputCommands(commands) {
	for (var i = 0; i < commands.length; i++) {
		var command = commands[i];
		if (command.charAt(1) === 'f') {//identifies sfxN
			tryPlaySimpleSound(command);
		}
		if (unitTesting === false) {
			if (command === 'message') {
				showTempMessage();
			}
		}
	}
}

function applyRandomRuleGroup(ruleGroup) {
	var propagated = false;

	var matches = [];
	for (var ruleIndex = 0; ruleIndex < ruleGroup.length; ruleIndex++) {
		var rule = ruleGroup[ruleIndex];
		var ruleMatches = rule.findMatches();
		if (ruleMatches.length > 0) {
			var tuples = generateTuples(ruleMatches);
			for (var j = 0; j < tuples.length; j++) {
				var tuple = tuples[j];
				matches.push([ruleIndex, tuple]);
			}
		}
	}

	if (matches.length === 0) {
		return false;
	}

	var match = matches[Math.floor(RandomGen.uniform() * matches.length)];
	var ruleIndex = match[0];
	var rule = ruleGroup[ruleIndex];
	var delta = dirMasksDelta[rule.direction];
	var tuple = match[1];
	var check = false;
	var modified = rule.applyAt(delta, tuple, check);

	rule.queueCommands();

	return modified;
}

function applyRuleGroup(ruleGroup) {
	if (ruleGroup[0].isRandom) {
		return applyRandomRuleGroup(ruleGroup);
	}

	var loopPropagated = false;
	var propagated = true;
	var loopcount = 0;
	while (propagated) {
		loopcount++;
		if (loopcount > 200) {
			logErrorCacheable("Got caught looping lots in a rule group :O", ruleGroup[0].lineNumber, true);
			break;
		}
		propagated = false;
		for (var ruleIndex = 0; ruleIndex < ruleGroup.length; ruleIndex++) {
			var rule = ruleGroup[ruleIndex];
			propagated = rule.tryApply() || propagated;
		}
		if (propagated) {
			loopPropagated = true;
		}
	}

	return loopPropagated;
}

function applyRules(rules, loopPoint, startRuleGroupindex, bannedGroup) {
	//for each rule
	//try to match it

	//when we're going back in, let's loop, to be sure to be sure
	var loopPropagated = startRuleGroupindex > 0;
	var loopCount = 0;
	for (var ruleGroupIndex = startRuleGroupindex; ruleGroupIndex < rules.length;) {
		if (bannedGroup && bannedGroup[ruleGroupIndex]) {
			//do nothing
		} else {
			var ruleGroup = rules[ruleGroupIndex];
			loopPropagated = applyRuleGroup(ruleGroup) || loopPropagated;
		}
		if (loopPropagated && loopPoint[ruleGroupIndex] !== undefined) {
			ruleGroupIndex = loopPoint[ruleGroupIndex];
			loopPropagated = false;
			loopCount++;
			if (loopCount > 200) {
				var ruleGroup = rules[ruleGroupIndex];
				logErrorCacheable("got caught in an endless startloop...endloop vortex, escaping!", ruleGroup[0].lineNumber, true);
				break;
			}
		} else {
			ruleGroupIndex++;
			if (ruleGroupIndex === rules.length) {
				if (loopPropagated && loopPoint[ruleGroupIndex] !== undefined) {
					ruleGroupIndex = loopPoint[ruleGroupIndex];
					loopPropagated = false;
					loopCount++;
					if (loopCount > 200) {
						var ruleGroup = rules[ruleGroupIndex];
						logErrorCacheable("got caught in an endless startloop...endloop vortex, escaping!", ruleGroup[0].lineNumber, true);
						break;
					}
				}
			}
		}
	}
}


//if this returns!=null, need to go back and reprocess
function resolveMovements(dir) {
	var moved = true;
	while (moved) {
		moved = false;
		for (var i = 0; i < level.n_tiles; i++) {
			moved = repositionEntitiesAtCell(i) || moved;
		}
	}
	var doUndo = false;

	for (var i = 0; i < level.n_tiles; i++) {
		var cellMask = level.getCellInto(i, _o6);
		var movementMask = level.getMovements(i);
		if (!movementMask.iszero()) {
			var rigidMovementAppliedMask = level.rigidMovementAppliedMask[i];
			if (rigidMovementAppliedMask !== 0) {
				movementMask.iand(rigidMovementAppliedMask);
				if (!movementMask.iszero()) {
					//find what layer was restricted
					for (var j = 0; j < level.layerCount; j++) {
						var layerSection = movementMask.getshiftor(0x1f, 5 * j);
						if (layerSection !== 0) {
							//this is our layer!
							var rigidGroupIndexMask = level.rigidGroupIndexMask[i];
							var rigidGroupIndex = rigidGroupIndexMask.getshiftor(0x1f, 5 * j);
							rigidGroupIndex--;//group indices start at zero, but are incremented for storing in the bitfield
							var groupIndex = state.rigidGroupIndex_to_GroupIndex[rigidGroupIndex];
							level.bannedGroup[groupIndex] = true;
							//backtrackTarget = rigidBackups[rigidGroupIndex];
							doUndo = true;
							break;
						}
					}
				}
			}
			for (var j = 0; j < state.sfx_MovementFailureMasks.length; j++) {
				var o = state.sfx_MovementFailureMasks[j];
				var objectMask = o.objectMask;
				if (objectMask.anyBitsInCommon(cellMask)) {
					var directionMask = o.directionMask;
					if (movementMask.anyBitsInCommon(directionMask) && seedsToPlay_CantMove.indexOf(o.seed) === -1) {
						seedsToPlay_CantMove.push(o.seed);
					}
				}
			}
		}

		for (var j = 0; j < STRIDE_MOV; j++) {
			level.movements[j + i * STRIDE_MOV] = 0;
		}
		level.rigidGroupIndexMask[i] = 0;
		level.rigidMovementAppliedMask[i] = 0;
	}
	return doUndo;
}

var sfxCreateMask = null;
var sfxDestroyMask = null;

function calculateRowColMasks() {
	for (var i = 0; i < level.mapCellContents.length; i++) {
		level.mapCellContents[i] = 0;
	}

	for (var i = 0; i < level.width; i++) {
		var ccc = level.colCellContents[i];
		ccc.setZero();
	}

	for (var i = 0; i < level.height; i++) {
		var rcc = level.rowCellContents[i];
		rcc.setZero();
	}

	for (var i = 0; i < level.width; i++) {
		for (var j = 0; j < level.height; j++) {
			var index = j + i * level.height;
			var cellContents = level.getCellInto(index, _o9);
			level.mapCellContents.ior(cellContents);
			level.rowCellContents[j].ior(cellContents);
			level.colCellContents[i].ior(cellContents);
		}
	}
}

/* returns a bool indicating if anything changed */
function processInput(dir, dontDoWin, dontModify) {
	againing = false;
	window.againing = againing;

	if (verbose_logging) {
		if (dir === -1) {
			consolePrint('Turn starts with no input.')
		} else {
			consolePrint('=======================');
			consolePrint('Turn starts with input of ' + ['up', 'left', 'down', 'right', 'action'][dir] + '.');
		}
	}

	var bak = backupLevel();

	var playerPositions = [];
	if (dir <= 4) {
		if (dir >= 0) {
			switch (dir) {
				case 0://up
					{
						dir = parseInt('00001', 2);;
						break;
					}
				case 1://left
					{
						dir = parseInt('00100', 2);;
						break;
					}
				case 2://down
					{
						dir = parseInt('00010', 2);;
						break;
					}
				case 3://right
					{
						dir = parseInt('01000', 2);;
						break;
					}
				case 4://action
					{
						dir = parseInt('10000', 2);;
						break;
					}
			}
			playerPositions = startMovement(dir);
		}

		var i = 0;
		level.bannedGroup = [];
		rigidBackups = [];
		level.commandQueue = [];
		level.commandQueueSourceRules = [];
		var startRuleGroupIndex = 0;
		var rigidloop = false;
		var startState = commitPreservationState();
		sfxCreateMask.setZero();
		sfxDestroyMask.setZero();

		seedsToPlay_CanMove = [];
		seedsToPlay_CantMove = [];

		calculateRowColMasks();

		do {
			//not particularly elegant, but it'll do for now - should copy the world state and check
			//after each iteration
			rigidloop = false;
			i++;

			if (verbose_logging) { consolePrint('applying rules'); }

			applyRules(state.rules, state.loopPoint, startRuleGroupIndex, level.bannedGroup);
			var shouldUndo = resolveMovements();

			if (shouldUndo) {
				rigidloop = true;
				restorePreservationState(startState);
				startRuleGroupIndex = 0;//rigidGroupUndoDat.ruleGroupIndex+1;
			} else {
				if (verbose_logging) { consolePrint('applying late rules'); }
				applyRules(state.lateRules, state.lateLoopPoint, 0);
				startRuleGroupIndex = 0;
			}
		} while (i < 50 && rigidloop);

		if (i >= 50) {
			consolePrint("looped through 50 times, gave up.  too many loops!");
		}


		if (playerPositions.length > 0 && state.metadata.require_player_movement !== undefined) {
			var somemoved = false;
			for (var i = 0; i < playerPositions.length; i++) {
				var pos = playerPositions[i];
				var val = level.getCell(pos);
				if (state.playerMask.bitsClearInArray(val.data)) {
					somemoved = true;
					break;
				}
			}
			if (somemoved === false) {
				if (verbose_logging) {
					consolePrint('require_player_movement set, but no player movement detected, so cancelling turn.');
					consoleCacheDump();
				}
				backups.push(bak);
				DoUndo(true, false);
				return false;
			}
			//play player cantmove sounds here
		}



		if (level.commandQueue.indexOf('cancel') >= 0) {
			if (verbose_logging) {
				consoleCacheDump();
				var r = level.commandQueueSourceRules[level.commandQueue.indexOf('cancel')];
				consolePrintFromRule('CANCEL command executed, cancelling turn.', r, true);
			}
			processOutputCommands(level.commandQueue);
			backups.push(bak);
			messagetext = "";
			DoUndo(true, false);
			tryPlayCancelSound();
			return false;
		}

		if (level.commandQueue.indexOf('restart') >= 0) {
			if (verbose_logging) {
				var r = level.commandQueueSourceRules[level.commandQueue.indexOf('restart')];
				consolePrintFromRule('RESTART command executed, reverting to restart state.', r);
				consoleCacheDump();
			}
			processOutputCommands(level.commandQueue);
			backups.push(bak);
			messagetext = "";
			DoRestart(true);
			return true;
		}


		var modified = false;
		for (var i = 0; i < level.objects.length; i++) {
			if (level.objects[i] !== bak.dat[i]) {
				if (dontModify) {
					if (verbose_logging) {
						consoleCacheDump();
					}
					backups.push(bak);
					DoUndo(true, false);
					return true;
				} else {
					if (dir !== -1) {
						backups.push(bak);
					}
					modified = true;
				}
				break;
			}
		}

		if (dontModify && level.commandQueue.indexOf('win') >= 0) {
			return true;
		}

		if (dontModify) {
			if (verbose_logging) {
				consoleCacheDump();
			}
			return false;
		}

		for (var i = 0; i < seedsToPlay_CantMove.length; i++) {
			playSound(seedsToPlay_CantMove[i]);
		}

		for (var i = 0; i < seedsToPlay_CanMove.length; i++) {
			playSound(seedsToPlay_CanMove[i]);
		}

		for (var i = 0; i < state.sfx_CreationMasks.length; i++) {
			var entry = state.sfx_CreationMasks[i];
			if (sfxCreateMask.anyBitsInCommon(entry.objectMask)) {
				playSound(entry.seed);
			}
		}

		for (var i = 0; i < state.sfx_DestructionMasks.length; i++) {
			var entry = state.sfx_DestructionMasks[i];
			if (sfxDestroyMask.anyBitsInCommon(entry.objectMask)) {
				playSound(entry.seed);
			}
		}

		processOutputCommands(level.commandQueue);

		if (textMode === false) {
			if (verbose_logging) {
				consolePrint('Checking win condition.');
			}
			if (dontDoWin === undefined) {
				dontDoWin = false;
			}
			checkWin(dontDoWin);
		}

		if (!winning) {
			if (level.commandQueue.indexOf('checkpoint') >= 0) {
				if (verbose_logging) {
					var r = level.commandQueueSourceRules[level.commandQueue.indexOf('checkpoint')];
					consolePrintFromRule('CHECKPOINT command executed, saving current state to the restart state.', r);
				}
				restartTarget = level4Serialization();
				hasUsedCheckpoint = true;
				var backupStr = JSON.stringify(restartTarget);
				if (!!window.localStorage) {
					localStorage[document.URL + '_checkpoint'] = backupStr;
					localStorage[document.URL] = curlevel;
				}
			}

			if (level.commandQueue.indexOf('again') >= 0 && modified) {

				var r = level.commandQueueSourceRules[level.commandQueue.indexOf('again')];

				//first have to verify that something's changed
				var old_verbose_logging = verbose_logging;
				var oldmessagetext = messagetext;
				verbose_logging = false;
				if (processInput(-1, true, true)) {
					verbose_logging = old_verbose_logging;

					if (verbose_logging) {
						consolePrintFromRule('AGAIN command executed, with changes detected - will execute another turn.', r);
					}

					againing = true;
					window.againing = againing;
					timer = 0;
				} else {
					verbose_logging = old_verbose_logging;
					if (verbose_logging) {
						consolePrintFromRule('AGAIN command not executed, it wouldn\'t make any changes.', r);
					}
				}
				verbose_logging = old_verbose_logging;
				messagetext = oldmessagetext;
			}
		}


		level.commandQueue = [];
		level.commandQueueSourceRules = [];

	}

	if (verbose_logging) {
		consoleCacheDump();
	}

	if (winning) {
		againing = false;
		window.againing = againing;
	}

	return modified;
}

window.processInput = processInput;

function checkWin(dontDoWin) {

	if (levelEditorOpened) {
		dontDoWin = true;
	}

	if (level.commandQueue.indexOf('win') >= 0) {
		if (runrulesonlevelstart_phase) {
			consolePrint("Win Condition Satisfied (However this is in the run_rules_on_level_start rule pass, so I'm going to ignore it for you.  Why would you want to complete a level before it's already started?!)");
		} else {
			consolePrint("Win Condition Satisfied");
		}
		if (!dontDoWin) {
			DoWin();
		}
		return;
	}

	var won = false;
	if (state.winconditions.length > 0) {
		var passed = true;
		for (var wcIndex = 0; wcIndex < state.winconditions.length; wcIndex++) {
			var wincondition = state.winconditions[wcIndex];
			var filter1 = wincondition[1];
			var filter2 = wincondition[2];
			var rulePassed = true;
			switch (wincondition[0]) {
				case -1://NO
					{
						for (var i = 0; i < level.n_tiles; i++) {
							var cell = level.getCellInto(i, _o10);
							if ((!filter1.bitsClearInArray(cell.data)) &&
								(!filter2.bitsClearInArray(cell.data))) {
								rulePassed = false;
								break;
							}
						}

						break;
					}
				case 0://SOME
					{
						var passedTest = false;
						for (var i = 0; i < level.n_tiles; i++) {
							var cell = level.getCellInto(i, _o10);
							if ((!filter1.bitsClearInArray(cell.data)) &&
								(!filter2.bitsClearInArray(cell.data))) {
								passedTest = true;
								break;
							}
						}
						if (passedTest === false) {
							rulePassed = false;
						}
						break;
					}
				case 1://ALL
					{
						for (var i = 0; i < level.n_tiles; i++) {
							var cell = level.getCellInto(i, _o10);
							if ((!filter1.bitsClearInArray(cell.data)) &&
								(filter2.bitsClearInArray(cell.data))) {
								rulePassed = false;
								break;
							}
						}
						break;
					}
			}
			if (rulePassed === false) {
				passed = false;
			}
		}
		won = passed;
	}

	if (won) {
		if (runrulesonlevelstart_phase) {
			consolePrint("Win Condition Satisfied (However this is in the run_rules_on_level_start rule pass, so I'm going to ignore it for you.  Why would you want to complete a level before it's already started?!)");
		} else {
			consolePrint("Win Condition Satisfied");
		}
		if (!dontDoWin) {
			DoWin();
		}
	}
}

window.setWin = function (val) {
	window["winning"] = winning = val;
}

function DoWin() {
	if (winning) {
		return;
	}
	againing = false;
	window.againing = againing;
	tryPlayEndLevelSound();
	if (unitTesting) {
		nextLevel();
		return;
	}

	window.winning = winning = true;
	timer = 0;
}

/*
//this function isn't valid after refactoring, but also isn't used.
function anyMovements() {	
		for (var i=0;i<level.movementMask.length;i++) {
				if (level.movementMask[i]!==0) {
					return true;
				}
		}
		return false;
}*/


function nextLevel() {
	againing = false;
	window.againing = againing;
	messagetext = "";
	if (state && state.levels && (curlevel > state.levels.length)) {
		curlevel = state.levels.length - 1;
	}

	if (titleScreen) {
		if (titleSelection === 0) {
			//new game
			curlevel = 0;
			curlevelTarget = null;
		}
		if (curlevelTarget !== null) {
			loadLevelFromStateTarget(state, curlevel, curlevelTarget);
		} else {
			loadLevelFromState(state, curlevel);
		}
	} else {
		if (hasUsedCheckpoint) {
			curlevelTarget = null;
			hasUsedCheckpoint = false;
		}
		if (curlevel < (state.levels.length - 1)) {
			curlevel++;
			textMode = false;
			titleScreen = false;
			quittingMessageScreen = false;
			messageselected = false;

			if (curlevelTarget !== null) {
				loadLevelFromStateTarget(state, curlevel, curlevelTarget);
			} else {
				loadLevelFromState(state, curlevel);
			}
		} else {
			try {
				if (!!window.localStorage) {

					localStorage.removeItem(document.URL);
					localStorage.removeItem(document.URL + '_checkpoint');
				}
			} catch (ex) {

			}

			curlevel = 0;
			curlevelTarget = null;
			goToTitleScreen();
			tryPlayEndGameSound();
		}
		//continue existing game
	}
	try {
		if (!!window.localStorage) {
			localStorage[document.URL] = curlevel;
			if (curlevelTarget !== null) {
				restartTarget = level4Serialization();
				var backupStr = JSON.stringify(restartTarget);
				localStorage[document.URL + '_checkpoint'] = backupStr;
			} else {
				localStorage.removeItem(document.URL + "_checkpoint");
			}
		}
	} catch (ex) {

	}

	if (state !== undefined && state.metadata.flickscreen !== undefined) {
		oldflickscreendat = [0, 0, Math.min(state.metadata.flickscreen[0], level.width), Math.min(state.metadata.flickscreen[1], level.height)];
	}
	canvasResize();
	clearInputHistory();
}

function goToTitleScreen() {
	againing = false;
	window.againing = againing;
	messagetext = "";
	titleScreen = true;
	textMode = true;
	doSetupTitleScreenLevelContinue();
	titleSelection = (curlevel > 0 || curlevelTarget !== null) ? 1 : 0;
	generateTitleScreen();
}



//////////File Source js/parser.js
/*
credits

brunt of the work by increpare (www.increpare.com)

all open source mit license blah blah

testers:
none, yet

code used

colors used
color values for named colours from arne, mostly (and a couple from a 32-colour palette attributed to him)
http://androidarts.com/palette/16pal.htm

the editor is a slight modification of codemirro (codemirror.net), which is crazy awesome.

for post-launch credits, check out activty on github.com/increpare/PuzzleScript

*/

var compiling = false;
var errorStrings = [];//also stores warning strings
var errorCount=0;//only counts errors

function logErrorCacheable(str, lineNumber,urgent) {
    if (compiling||urgent) {
        if (lineNumber === undefined) {
            return logErrorNoLine(str,urgent);
        }
        var errorString = '<a onclick="jumpToLine(' + lineNumber.toString() + ');"  href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + lineNumber.toString() + '</span></a> : ' + '<span class="errorText">' + str + '</span>';
         if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
            //do nothing, duplicate error
         } else {
            consolePrint(errorString);
            errorStrings.push(errorString);
            errorCount++;
        }
    }
}

function logError(str, lineNumber,urgent) {
    if (compiling||urgent) {
        if (lineNumber === undefined) {
            return logErrorNoLine(str,urgent);
        }
        var errorString = '<a onclick="jumpToLine(' + lineNumber.toString() + ');"  href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + lineNumber.toString() + '</span></a> : ' + '<span class="errorText">' + str + '</span>';
         if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
            //do nothing, duplicate error
         } else {
            consolePrint(errorString,true);
            errorStrings.push(errorString);
            errorCount++;
        }
    }
}

function logWarning(str, lineNumber,urgent) {
    if (compiling||urgent) {
        if (lineNumber === undefined) {
            return logWarningNoLine(str,urgent);
        }
        var errorString = '<a onclick="jumpToLine(' + lineNumber.toString() + ');"  href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + lineNumber.toString() + '</span></a> : ' + '<span class="warningText">' + str + '</span>';
         if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
            //do nothing, duplicate error
         } else {
            consolePrint(errorString,true);
            errorStrings.push(errorString);
        }
    }
}

function logWarningNoLine(str,urgent) {
    if (compiling||urgent) {
        var errorString = '<span class="warningText">' + str + '</span>';
         if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
            //do nothing, duplicate error
         } else {
            consolePrint(errorString,true);
            errorStrings.push(errorString);
        }
        errorCount++;
    }
}


function logErrorNoLine(str,urgent) {
    if (compiling||urgent) {
        var errorString = '<span class="errorText">' + str + '</span>';
         if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
            //do nothing, duplicate error
         } else {
            consolePrint(errorString,true);
            errorStrings.push(errorString);
        }
        errorCount++;
    }
}



function logBetaMessage(str,urgent){
    if (compiling||urgent) {
        var errorString = '<span class="betaText">' + str + '</span>';
         if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
            //do nothing, duplicate error
         } else {
            consoleError(errorString);
            errorStrings.push(errorString);
        }
    }  
}

function blankLineHandle(state) {
    if (state.section === 'levels') {
            if (state.levels[state.levels.length - 1].length > 0)
            {
                state.levels.push([]);
            }
    } else if (state.section === 'objects') {
        state.objects_section = 0;
    }
}

//for IE support
if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      // We must check against these specific cases.
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
 
      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

var codeMirrorFn = function() {
    'use strict';


    function searchStringInArray(str, strArray) {
        for (var j = 0; j < strArray.length; j++) {
            if (strArray[j] === str) { return j; }
        }
        return -1;
    }

    function isMatrixLine(str) {
        for (var j = 0; j < str.length; j++) {
            if (str.charAt(j) !== '.' && str.charAt(j) !== '0') {
                return false;
            }
        }
        return true;
    }

    function checkNameNew(state,candname) {
        if (state.objects[candname] !== undefined) {
            logError('Object "' + candname.toUpperCase() + '" defined multiple times.', state.lineNumber);
            return 'ERROR';
        }
        for (var i=0;i<state.legend_synonyms.length;i++) {
            var entry = state.legend_synonyms[i];
            if (entry[0]==candname) {
                logError('Name "' + candname.toUpperCase() + '" already in use.', state.lineNumber);                                        
            }
        }
        for (var i=0;i<state.legend_aggregates.length;i++) {
            var entry = state.legend_aggregates[i];
            if (entry[0]==candname) {
                logError('Name "' + candname.toUpperCase() + '" already in use.', state.lineNumber);                                        
            }
        }
        for (var i=0;i<state.legend_properties.length;i++) {
            var entry = state.legend_properties[i];
            if (entry[0]==candname) {
                logError('Name "' + candname.toUpperCase() + '" already in use.', state.lineNumber);                                        
            }
        }
    }
    var absolutedirs = ['up', 'down', 'right', 'left'];
    var relativedirs = ['^', 'v', '<', '>', 'moving','stationary','parallel','perpendicular', 'no'];
    var logicWords = ['all', 'no', 'on', 'some'];
    var sectionNames = ['objects', 'legend', 'sounds', 'collisionlayers', 'rules', 'winconditions', 'levels'];
	var commandwords = ["sfx0","sfx1","sfx2","sfx3","sfx4","sfx5","sfx6","sfx7","sfx8","sfx9","sfx10","cancel","checkpoint","restart","win","message","again"];
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
    var keyword_array = ['checkpoint','objects', 'collisionlayers', 'legend', 'sounds', 'rules', '...','winconditions', 'levels','|','[',']','up', 'down', 'left', 'right', 'late','rigid', '^','v','\>','\<','no','randomdir','random', 'horizontal', 'vertical','any', 'all', 'no', 'some', 'moving','stationary','parallel','perpendicular','action','message'];

    //  var keywordRegex = new RegExp("\\b(("+cons.join(")|(")+"))$", 'i');

    var fullSpriteMatrix = [
        '00000',
        '00000',
        '00000',
        '00000',
        '00000'
    ];

    return {
        copyState: function(state) {
            var objectsCopy = {};
            for (var i in state.objects) {
              if (state.objects.hasOwnProperty(i)) {
                var o = state.objects[i];
                objectsCopy[i] = {
                  colors: o.colors.concat([]),
                  lineNumber : o.lineNumber,
                  spritematrix: o.spritematrix.concat([])
                }
              }
            }

            var collisionLayersCopy = [];
            for (var i = 0; i < state.collisionLayers.length; i++) {
              collisionLayersCopy.push(state.collisionLayers[i].concat([]));
            }

            var legend_synonymsCopy = [];
            var legend_aggregatesCopy = [];
            var legend_propertiesCopy = [];
            var soundsCopy = [];
            var levelsCopy = [];
            var winConditionsCopy = [];

            for (var i = 0; i < state.legend_synonyms.length; i++) {
              legend_synonymsCopy.push(state.legend_synonyms[i].concat([]));
            }
            for (var i = 0; i < state.legend_aggregates.length; i++) {
              legend_aggregatesCopy.push(state.legend_aggregates[i].concat([]));
            }
            for (var i = 0; i < state.legend_properties.length; i++) {
              legend_propertiesCopy.push(state.legend_properties[i].concat([]));
            }
            for (var i = 0; i < state.sounds.length; i++) {
              soundsCopy.push(state.sounds[i].concat([]));
            }
            for (var i = 0; i < state.levels.length; i++) {
              levelsCopy.push(state.levels[i].concat([]));
            }
            for (var i = 0; i < state.winconditions.length; i++) {
              winConditionsCopy.push(state.winconditions[i].concat([]));
            }

            var original_case_namesCopy = Object.assign({},state.original_case_names);
            
            var nstate = {
              lineNumber: state.lineNumber,

              objects: objectsCopy,
              collisionLayers: collisionLayersCopy,

              commentLevel: state.commentLevel,
              section: state.section,
              visitedSections: state.visitedSections.concat([]),

              objects_candname: state.objects_candname,
              objects_section: state.objects_section,
              objects_spritematrix: state.objects_spritematrix.concat([]),

              tokenIndex: state.tokenIndex,
              legend_synonyms: legend_synonymsCopy,
              legend_aggregates: legend_aggregatesCopy,
              legend_properties: legend_propertiesCopy,

              sounds: soundsCopy,

              rules: state.rules.concat([]),

              names: state.names.concat([]),

              winconditions: winConditionsCopy,

              original_case_names : original_case_namesCopy,

              abbrevNames: state.abbrevNames.concat([]),

              metadata : state.metadata.concat([]),

              levels: levelsCopy,

              STRIDE_OBJ : state.STRIDE_OBJ,
              STRIDE_MOV : state.STRIDE_MOV
            };

            return nstate;        
        },
        blankLine: function(state) {
            if (state.section === 'levels') {
                    if (state.levels[state.levels.length - 1].length > 0)
                    {
                        state.levels.push([]);
                    }
            }
        },
        token: function(stream, state) {
           	var mixedCase = stream.string;
            var sol = stream.sol();
            if (sol) {
                stream.string = stream.string.toLowerCase();
                state.tokenIndex=0;
                /*   if (state.lineNumber==undefined) {
                        state.lineNumber=1;
                }
                else {
                    state.lineNumber++;
                }*/

            }

            function registerOriginalCaseName(candname){

                function escapeRegExp(str) {
                  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                }

                var nameFinder =  new RegExp("\\b"+escapeRegExp(candname)+"\\b","i")
                var match = mixedCase.match(nameFinder);
                if (match!=null){
                    state.original_case_names[candname] = match[0];
                }
            }

            stream.eatWhile(/[ \t]/);

            ////////////////////////////////
            // COMMENT PROCESSING BEGIN
            ////////////////////////////////

            //NESTED COMMENTS
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

            //  if (sol)
            {

                //MATCH '==="s AT START OF LINE
                if (sol && stream.match(reg_equalsrow, true)) {
                    return 'EQUALSBIT';
                }

                //MATCH SECTION NAME
                if (sol && stream.match(reg_sectionNames, true)) {
                    state.section = stream.string.slice(0, stream.pos).trim();
                    if (state.visitedSections.indexOf(state.section) >= 0) {
                        logError('cannot duplicate sections (you tried to duplicate \"' + state.section.toUpperCase() + '").', state.lineNumber);
                    }
                    state.visitedSections.push(state.section);
                    var sectionIndex = sectionNames.indexOf(state.section);
                    if (sectionIndex == 0) {
                        state.objects_section = 0;
                        if (state.visitedSections.length > 1) {
                            logError('section "' + state.section.toUpperCase() + '" must be the first section', state.lineNumber);
                        }
                    } else if (state.visitedSections.indexOf(sectionNames[sectionIndex - 1]) == -1) {
                        if (sectionIndex===-1) {
                            logError('no such section as "' + state.section.toUpperCase() + '".', state.lineNumber);
                        } else {
                            logError('section "' + state.section.toUpperCase() + '" is out of order, must follow  "' + sectionNames[sectionIndex - 1].toUpperCase() + '" (or it could be that the section "'+sectionNames[sectionIndex - 1].toUpperCase()+`"is just missing totally.  You have to include all section headings, even if the section itself is empty).`, state.lineNumber);                            
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
                    }
                    else if (state.section === 'levels') {
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
                } else {
                    if (state.section === undefined) {
                        logError('must start with section "OBJECTS"', state.lineNumber);
                    }
                }

                if (stream.eol()) {
                    return null;
                }

                //if color is set, try to set matrix
                //if can't set matrix, try to parse name
                //if color is not set, try to parse color
                switch (state.section) {
                case 'objects':
                    {
						var tryParseName = function() {
                            //LOOK FOR NAME
                            var match_name = sol ? stream.match(reg_name, true) : stream.match(/[^\p{Z}\s\()]+[\p{Z}\s]*/u,true);
                            if (match_name == null) {
                                stream.match(reg_notcommentstart, true);
                                if (stream.pos>0){                                
                                    logWarning('Unknown junk in object section (possibly: sprites have to be 5 pixels wide and 5 pixels high exactly. Or maybe: the main names for objects have to be words containing only the letters a-z0.9 - if you want to call them something like ",", do it in the legend section).',state.lineNumber);
                                }
                                return 'ERROR';
                            } else {
                            	var candname = match_name[0].trim();
                                if (state.objects[candname] !== undefined) {
                                    logError('Object "' + candname.toUpperCase() + '" defined multiple times.', state.lineNumber);
                                    return 'ERROR';
                                }
                                for (var i=0;i<state.legend_synonyms.length;i++) {
                                	var entry = state.legend_synonyms[i];
                                	if (entry[0]==candname) {
                                    	logError('Name "' + candname.toUpperCase() + '" already in use.', state.lineNumber);                                		
                                	}
                                }
                                if (keyword_array.indexOf(candname)>=0) {
                                    logWarning('You named an object "' + candname.toUpperCase() + '", but this is a keyword. Don\'t do that!', state.lineNumber);
                                }

                                if (sol) {
                                	state.objects_candname = candname;
                                    registerOriginalCaseName(candname);
                                	state.objects[state.objects_candname] = {
										                                	lineNumber: state.lineNumber,
										                                	colors: [],
										                                	spritematrix: []
										                                };

								} else {
									//set up alias
                                    registerOriginalCaseName(candname);
									var synonym = [candname,state.objects_candname];
									synonym.lineNumber = state.lineNumber;
									state.legend_synonyms.push(synonym);
								}
                                state.objects_section = 1;
                                return 'NAME';
                            }
                        };

                        if (sol && state.objects_section == 2) {
                            state.objects_section = 3;
                        }

                        if (sol && state.objects_section == 1) {
                            state.objects_section = 2;
                        }

                        switch (state.objects_section) {
                        case 0:
                        case 1:
                            {
                                state.objects_spritematrix = [];
                                return tryParseName();
                                break;
                            }
                        case 2:
                            {
                                //LOOK FOR COLOR
                                state.tokenIndex = 0;

                                var match_color = stream.match(reg_color, true);
                                if (match_color == null) {
                                    var str = stream.match(reg_name, true) || stream.match(reg_notcommentstart, true);
                                    logError('Was looking for color for object ' + state.objects_candname.toUpperCase() + ', got "' + str + '" instead.', state.lineNumber);
                                    return null;
                                } else {
                                    if (state.objects[state.objects_candname].colors === undefined) {
                                        state.objects[state.objects_candname].colors = [match_color[0].trim()];
                                    } else {
                                        state.objects[state.objects_candname].colors.push(match_color[0].trim());
                                    }

                                    var candcol = match_color[0].trim().toLowerCase();
                                    if (candcol in colorPalettes.arnecolors) {
                                        return 'COLOR COLOR-' + candcol.toUpperCase();
                                    } else if (candcol==="transparent") {
                                        return 'COLOR FADECOLOR';
                                    } else {
                                        return 'MULTICOLOR'+match_color[0];
                                    }
                                }
                                break;
                            }
                        case 3:
                            {
                                var ch = stream.eat(/[.\d]/);
                                var spritematrix = state.objects_spritematrix;
                                if (ch === undefined) {
                                    if (spritematrix.length === 0) {
                                        return tryParseName();
                                    }
                                    logError('Unknown junk in spritematrix for object ' + state.objects_candname.toUpperCase() + '.', state.lineNumber);
                                    stream.match(reg_notcommentstart, true);
                                    return null;
                                }

                                if (sol) {
                                    spritematrix.push('');
                                }

                                var o = state.objects[state.objects_candname];

                                spritematrix[spritematrix.length - 1] += ch;
                                if (spritematrix[spritematrix.length-1].length>5){
                                    logError('Sprites must be 5 wide and 5 high.', state.lineNumber);
                                    stream.match(reg_notcommentstart, true);
                                    return null;
                                }
                                o.spritematrix = state.objects_spritematrix;
                                if (spritematrix.length === 5 && spritematrix[spritematrix.length - 1].length == 5) {
                                    state.objects_section = 0;
                                }

                                if (ch!=='.') {
                                    var n = parseInt(ch);
                                    if (n>=o.colors.length) {
                                        logError("Trying to access color number "+n+" from the color palette of sprite " +state.objects_candname.toUpperCase()+", but there are only "+o.colors.length+" defined in it.",state.lineNumber);
                                        return 'ERROR';
                                    }
                                    if (isNaN(n)) {
                                        logError('Invalid character "' + ch + '" in sprite for ' + state.objects_candname.toUpperCase(), state.lineNumber);
                                        return 'ERROR';
                                    }
                                    return 'COLOR BOLDCOLOR COLOR-' + o.colors[n].toUpperCase();
                                }
                                return 'COLOR FADECOLOR';
                            }
                        default:
                        	{
                        	window.console.logError("EEK shouldn't get here.");
                        	}
                        }
                        break;
                    }
                case 'sounds':
                    {
                        if (sol) {
                            var ok = true;
                            var splits = reg_notcommentstart.exec(stream.string)[0].split(/[\p{Z}\s]/u).filter(function(v) {return v !== ''});                          
                            splits.push(state.lineNumber);
                            state.sounds.push(splits);
                        }
                        candname = stream.match(reg_soundverbs, true);
                        if (candname!==null) {
                        	return 'SOUNDVERB';
                        }
                        candname = stream.match(reg_sounddirectionindicators,true);
                        if (candname!==null) {
                        	return 'DIRECTION';
                        }
                        candname = stream.match(reg_soundseed, true);
                        if (candname !== null)
                        {
                            state.tokenIndex++;
                            return 'SOUND';
                        } 
                       	candname = stream.match(/[^\[\|\]\p{Z}\s]*/u, true);
                       	if (candname!== null ) {
                       		var m = candname[0].trim();
                       		if (state.names.indexOf(m)>=0) {
                       			return 'NAME';
                       		}
                       	}

                        candname = stream.match(reg_notcommentstart, true);
                        logError('unexpected sound token "'+candname+'".' , state.lineNumber);
                        stream.match(reg_notcommentstart, true);
                        return 'ERROR';
                        break;
                    }
                case 'collisionlayers':
                    {
                        if (sol) {
                            //create new collision layer
                            state.collisionLayers.push([]);
                            state.tokenIndex=0;
                        }

                        var match_name = stream.match(reg_name, true);
                        if (match_name === null) {
                            //then strip spaces and commas
                            var prepos=stream.pos;
                            stream.match(reg_csv_separators, true);
                            if (stream.pos==prepos) {
                                logError("error detected - unexpected character " + stream.peek(),state.lineNumber);
                                stream.next();
                            }
                            return null;
                        } else {
                            //have a name: let's see if it's valid
                            var candname = match_name[0].trim();

                            var substitutor = function(n) {
                            	n = n.toLowerCase();
                            	if (n in state.objects) {
                            		return [n];
                            	} 


                                for (var i=0;i<state.legend_synonyms.length;i++) {
                                    var a = state.legend_synonyms[i];
                                    if (a[0]===n) {           
                                        return substitutor(a[1]);
                                    }
                                }

                            	for (var i=0;i<state.legend_aggregates.length;i++) {
                            		var a = state.legend_aggregates[i];
                            		if (a[0]===n) {           
                            			logError('"'+n+'" is an aggregate (defined using "and"), and cannot be added to a single layer because its constituent objects must be able to coexist.', state.lineNumber);
                            			return [];         
                            		}
                            	}
                            	for (var i=0;i<state.legend_properties.length;i++) {
                            		var a = state.legend_properties[i];
                            		if (a[0]===n) {  
                                        var result = [].concat.apply([],a.slice(1).map(substitutor));
                            			return result;
                            		}
                            	}
                            	logError('Cannot add "' + candname.toUpperCase() + '" to a collision layer; it has not been declared.', state.lineNumber);                                
                            	return [];
                            };
                            if (candname==='background' ) {
                                if (state.collisionLayers.length>0&&state.collisionLayers[state.collisionLayers.length-1].length>0) {
                                    logError("Background must be in a layer by itself.",state.lineNumber);
                                }
                                state.tokenIndex=1;
                            } else if (state.tokenIndex!==0) {
                                logError("Background must be in a layer by itself.",state.lineNumber);
                            }

                            var ar = substitutor(candname);

                            if (state.collisionLayers.length===0) {
                                logError("no layers found.",state.lineNumber);
                                return 'ERROR';
                            }
                            
                            var foundOthers=[];
                            for (var i=0;i<ar.length;i++){
                                var candname = ar[i];
                                for (var j=0;j<=state.collisionLayers.length-1;j++){
                                    var clj = state.collisionLayers[j];
                                    if (clj.indexOf(candname)>=0){
                                        if (j!=state.collisionLayers.length-1){
                                            foundOthers.push(j);
                                        }
                                    }
                                }
                            }
                            if (foundOthers.length>0){
                                var warningStr = 'Object "'+candname.toUpperCase()+'" included in multiple collision layers ( layers ';
                                for (var i=0;i<foundOthers.length;i++){
                                    warningStr+=foundOthers[i]+", ";
                                }
                                warningStr+=state.collisionLayers.length-1;
                                logWarning(warningStr +'). You should fix this!',state.lineNumber);                                        
                            }

                            state.collisionLayers[state.collisionLayers.length - 1] = state.collisionLayers[state.collisionLayers.length - 1].concat(ar);
                            if (ar.length>0) {
                            	return 'NAME';                            
                            } else {
                            	return 'ERROR';
                            }
                        }
                        break;
                    }
                case 'legend':
                    {
                        if (sol) {


                            //step 1 : verify format
                            var longer = stream.string.replace('=', ' = ');
                            longer = reg_notcommentstart.exec(longer)[0];

                            var splits = longer.split(/[\p{Z}\s]/u).filter(function(v) {
                                return v !== '';
                            });
                            var ok = true;

                        	if (splits.length>0) {
                        		var candname = splits[0].toLowerCase();
	                            if (keyword_array.indexOf(candname)>=0) {
	                                logWarning('You named an object "' + candname.toUpperCase() + '", but this is a keyword. Don\'t do that!', state.lineNumber);
	                            }
                                if (splits.indexOf(candname, 2)>=2) {
                                    logError("You can't define object " + candname.toUpperCase() + " in terms of itself!", state.lineNumber);
                                    ok = false;
                                }
                                checkNameNew(state,candname);
                        	}

                            if (!ok) {
                            } else if (splits.length < 3) {
                                ok = false;
                            } else if (splits[1] !== '=') {
                                ok = false;
                            } /*else if (splits[0].charAt(splits[0].length - 1) == 'v') {
                                logError('names cannot end with the letter "v", because it\'s is used as a direction.', state.lineNumber);
                                stream.match(reg_notcommentstart, true);
                                return 'ERROR';
                            } */ else if (splits.length === 3) {
                                var synonym = [splits[0], splits[2].toLowerCase()];
                                synonym.lineNumber = state.lineNumber;

                                registerOriginalCaseName(splits[0]);
                                state.legend_synonyms.push(synonym);
                            } else if (splits.length % 2 === 0) {
                                ok = false;
                            } else {
                                var lowertoken = splits[3].toLowerCase();
                                if (lowertoken === 'and') {

	                                var substitutor = function(n) {
	                                	n = n.toLowerCase();
	                                	if (n in state.objects) {
	                                		return [n];
	                                	} 
	                                	for (var i=0;i<state.legend_synonyms.length;i++) {
	                                		var a = state.legend_synonyms[i];
	                                		if (a[0]===n) {   
	                                			return substitutor(a[1]);
	                                		}
	                                	}
	                                	for (var i=0;i<state.legend_aggregates.length;i++) {
	                                		var a = state.legend_aggregates[i];
	                                		if (a[0]===n) {                                			
	                                			return [].concat.apply([],a.slice(1).map(substitutor));
	                                		}
	                                	}
	                                	for (var i=0;i<state.legend_properties.length;i++) {
	                                		var a = state.legend_properties[i];
	                                		if (a[0]===n) {         
	                                			logError("Cannot define an aggregate (using 'and') in terms of properties (something that uses 'or').", state.lineNumber);
	                                			ok=false;
	                                			return [n];
	                                		}
	                                	}
	                                	return [n];
	                                };

                                    for (var i = 5; i < splits.length; i += 2) {
                                        if (splits[i].toLowerCase() !== 'and') {
                                            ok = false;
                                            break;
                                        }
                                    }
                                    if (ok) {
                                        var newlegend = [splits[0]].concat(substitutor(splits[2])).concat(substitutor(splits[4]));
                                        for (var i = 6; i < splits.length; i += 2) {
                                            newlegend = newlegend.concat(substitutor(splits[i]));
                                        }
                                        newlegend.lineNumber = state.lineNumber;

                                        registerOriginalCaseName(newlegend[0]);
                                        state.legend_aggregates.push(newlegend);
                                    }
                                } else if (lowertoken === 'or') {

	                                var substitutor = function(n) {
	                                	n = n.toLowerCase();
	                                	if (n in state.objects) {
	                                		return [n];
	                                	} 

	                                	for (var i=0;i<state.legend_synonyms.length;i++) {
	                                		var a = state.legend_synonyms[i];
	                                		if (a[0]===n) {   
	                                			return substitutor(a[1]);
	                                		}
	                                	}
	                                	for (var i=0;i<state.legend_aggregates.length;i++) {
	                                		var a = state.legend_aggregates[i];
	                                		if (a[0]===n) {           
	                                			logError("Cannot define a property (using 'or') in terms of aggregates (something that uses 'and').", state.lineNumber);
	                                			ok=false;          
	                                		}
	                                	}
	                                	for (var i=0;i<state.legend_properties.length;i++) {
	                                		var a = state.legend_properties[i];
	                                		if (a[0]===n) {  
	                                			return [].concat.apply([],a.slice(1).map(substitutor));
	                                		}
	                                	}
	                                	return [n];
	                                };

                                    for (var i = 5; i < splits.length; i += 2) {
                                        if (splits[i].toLowerCase() !== 'or') {
                                            ok = false;
                                            break;
                                        }
                                    }
                                    if (ok) {
                                        var newlegend = [splits[0]].concat(substitutor(splits[2])).concat(substitutor(splits[4]));
                                        for (var i = 6; i < splits.length; i += 2) {
                                            newlegend.push(splits[i].toLowerCase());
                                        }
                                        newlegend.lineNumber = state.lineNumber;

                                        registerOriginalCaseName(newlegend[0]);
                                        state.legend_properties.push(newlegend);
                                    }
                                } else {
                                    ok = false;
                                }
                            }

                            if (ok === false) {
                                logError('incorrect format of legend - should be one of A = B, A = B or C ( or D ...), A = B and C (and D ...)', state.lineNumber);
                                stream.match(reg_notcommentstart, true);
                                return 'ERROR';
                            }

                            state.tokenIndex = 0;
                        }

                        if (state.tokenIndex === 0) {
                            stream.match(/[^=]*/, true);
                            state.tokenIndex++;
                            return 'NAME';
                        } else if (state.tokenIndex === 1) {
                            stream.next();
                            stream.match(/[\p{Z}\s]*/u, true);
                            state.tokenIndex++;
                            return 'ASSSIGNMENT';
                        } else {
                            var match_name = stream.match(reg_name, true);
                            if (match_name === null) {
                                logError("Something bad's happening in the LEGEND", state.lineNumber);
                                stream.match(reg_notcommentstart, true);
                                return 'ERROR';
                            } else {
                                var candname = match_name[0].trim();

                                if (state.tokenIndex % 2 === 0) {

	                                var wordExists = function(n) {
	                                	n = n.toLowerCase();
	                                	if (n in state.objects) {
	                                		return true;
	                                	} 
	                                	for (var i=0;i<state.legend_aggregates.length;i++) {
	                                		var a = state.legend_aggregates[i];
	                                		if (a[0]===n) {                                			
	                                			return true;
	                                		}
	                                	}
	                                	for (var i=0;i<state.legend_properties.length;i++) {
	                                		var a = state.legend_properties[i];
	                                		if (a[0]===n) {  
	                                			return true;
	                                		}
	                                	}
	                                	for (var i=0;i<state.legend_synonyms.length;i++) {
	                                		var a = state.legend_synonyms[i];
	                                		if (a[0]===n) {  
	                                			return true;
	                                		}
	                                	}
	                                	return false;
	                                };


                                    if (wordExists(candname)===false) {
                                            logError('Cannot reference "' + candname.toUpperCase() + '" in the LEGEND section; it has not been defined yet.', state.lineNumber);
                                            state.tokenIndex++;
                                            return 'ERROR';
                                    } else {
                                            state.tokenIndex++;
                                            return 'NAME';
                                    }
                                } else {
                                        state.tokenIndex++;
                                        return 'LOGICWORD';
                                }
                            }
                        }
                        break;
                    }
                case 'rules':
                    {                    	
                        if (sol) {
                            var rule = reg_notcommentstart.exec(stream.string)[0];
                            state.rules.push([rule, state.lineNumber, mixedCase]);
                            state.tokenIndex = 0;//in rules, records whether bracket has been found or not
                        }

                        if (state.tokenIndex===-4) {
                        	stream.skipToEnd();
                        	return 'MESSAGE';
                        }
                        if (stream.match(/[\p{Z}\s]*->[\p{Z}\s]*/u, true)) {
                            return 'ARROW';
                        }
                        if (ch === '[' || ch === '|' || ch === ']' || ch==='+') {
                        	if (ch!=='+') {
                            	state.tokenIndex = 1;
                            }
                            stream.next();
                            stream.match(/[\p{Z}\s]*/u, true);
                            return 'BRACKET';
                        } else {
                            var m = stream.match(/[^\[\|\]\p{Z}\s]*/u, true)[0].trim();

                            if (state.tokenIndex===0&&reg_loopmarker.exec(m)) {
                            	return 'BRACKET';
                            } else if (state.tokenIndex === 0 && reg_ruledirectionindicators.exec(m)) {
                                stream.match(/[\p{Z}\s]*/u, true);
                                return 'DIRECTION';
                            } else if (state.tokenIndex === 1 && reg_directions.exec(m)) {
                                stream.match(/[\p{Z}\s]*/u, true);
                                return 'DIRECTION';
                            } else {
                                if (state.names.indexOf(m) >= 0) {
                                    if (sol) {
                                        logError('Identifiers cannot appear outside of square brackets in rules, only directions can.', state.lineNumber);
                                        return 'ERROR';
                                    } else {
                                        stream.match(/[\p{Z}\s]*/u, true);
                                        return 'NAME';
                                    }
                                } else if (m==='...') {
                                    return 'DIRECTION';
                                } else if (m==='rigid') {
                                    return 'DIRECTION';
                                } else if (m==='random') {
                                    return 'DIRECTION';
                                } else if (commandwords.indexOf(m)>=0) {
									if (m==='message') {
										state.tokenIndex=-4;
									}                                	
                                	return 'COMMAND';
                                } else {
                                    logError('Name "' + m + '", referred to in a rule, does not exist.', state.lineNumber);
                                    return 'ERROR';
                                }
                            }
                        }

                        break;
                    }
                case 'winconditions':
                    {
                        if (sol) {
                        	var tokenized = reg_notcommentstart.exec(stream.string);
                        	var splitted = tokenized[0].split(/[\p{Z}\s]/u);
                        	var filtered = splitted.filter(function(v) {return v !== ''});
                            filtered.push(state.lineNumber);
                            
                            state.winconditions.push(filtered);
                            state.tokenIndex = -1;
                        }
                        state.tokenIndex++;

                        var match = stream.match(/[\p{Z}\s]*[\p{L}\p{N}_]+[\p{Z}\s]*/u);
                        if (match === null) {
                                logError('incorrect format of win condition.', state.lineNumber);
                                stream.match(reg_notcommentstart, true);
                                return 'ERROR';

                        } else {
                            var candword = match[0].trim();
                            if (state.tokenIndex === 0) {
                                if (reg_winconditionquantifiers.exec(candword)) {
                                    return 'LOGICWORD';
                                }
                                else {
                                    return 'ERROR';
                                }
                            }
                            else if (state.tokenIndex === 2) {
                                if (candword != 'on') {
                                    return 'ERROR';
                                } else {
                                    return 'LOGICWORD';
                                }
                            }
                            else if (state.tokenIndex === 1 || state.tokenIndex === 3) {
                                if (state.names.indexOf(candword)===-1) {
                                    logError('Error in win condition: "' + candword.toUpperCase() + '" is not a valid object name.', state.lineNumber);
                                    return 'ERROR';
                                } else {
                                    return 'NAME';
                                }
                            }
                        }
                        break;
                    }
                case 'levels':
                    {
                        if (sol)
                        {
                            if (stream.match(/[\p{Z}\s]*message\b[\p{Z}\s]*/u, true)) {
                                state.tokenIndex = 1;//1/2 = message/level
                                var newdat = ['\n', mixedCase.slice(stream.pos).trim(),state.lineNumber];
                                if (state.levels[state.levels.length - 1].length == 0) {
                                    state.levels.splice(state.levels.length - 1, 0, newdat);
                                } else {
                                    state.levels.push(newdat);
                                }
                                return 'MESSAGE_VERB';//a duplicate of the previous section as a legacy thing for #589 
                            } else if (stream.match(/[\p{Z}\s]*message[\p{Z}\s]*/u, true)) {//duplicating previous section because of #589
                                logWarning("You probably meant to put a space after 'message' innit.  That's ok, I'll still interpret it as a message, but you probably want to put a space there.",state.lineNumber);
                                state.tokenIndex = 1;//1/2 = message/level
                                var newdat = ['\n', mixedCase.slice(stream.pos).trim(),state.lineNumber];
                                if (state.levels[state.levels.length - 1].length == 0) {
                                    state.levels.splice(state.levels.length - 1, 0, newdat);
                                } else {
                                    state.levels.push(newdat);
                                }
                                return 'MESSAGE_VERB';
                            } else {
                                var line = stream.match(reg_notcommentstart, false)[0].trim();
                                state.tokenIndex = 2;
                                var lastlevel = state.levels[state.levels.length - 1];
                                if (lastlevel[0] == '\n') {
                                    state.levels.push([state.lineNumber,line]);
                                } else {
                                    if (lastlevel.length==0)
                                    {
                                        lastlevel.push(state.lineNumber);
                                    }
                                    lastlevel.push(line);  

                                    if (lastlevel.length>1) 
                                    {
                                        if (line.length!=lastlevel[1].length) {
                                            logWarning("Maps must be rectangular, yo (In a level, the length of each row must be the same).",state.lineNumber);
                                        }
                                    }
                                }
                                
                            }
                        } else {
                            if (state.tokenIndex == 1) {
                                stream.skipToEnd();
                               	return 'MESSAGE';
                            }
                        }

                        if (state.tokenIndex === 2 && !stream.eol()) {
                            var ch = stream.peek();
                            stream.next();
                            if (state.abbrevNames.indexOf(ch) >= 0) {
                                return 'LEVEL';
                            } else {
                                logError('Key "' + ch.toUpperCase() + '" not found. Do you need to add it to the legend, or define a new object?', state.lineNumber);
                                return 'ERROR';
                            }
                        }
                        break;
                    }
	                
	                default://if you're in the preamble
	                {
	            		if (sol) {
	            			state.tokenIndex=0;
	            		}
	            		if (state.tokenIndex==0) {
		                    var match = stream.match(/[\p{Z}\s]*[\p{L}\p{N}_]+[\p{Z}\s]*/u);	                    
		                    if (match!==null) {
		                    	var token = match[0].trim();
		                    	if (sol) {
		                    		if (['title','author','homepage','background_color','text_color','key_repeat_interval','realtime_interval','again_interval','flickscreen','zoomscreen','color_palette','youtube'].indexOf(token)>=0) {
		                    			
                                        if (token==='youtube' || token==='author' || token==='homepage' || token==='title') {
                                            stream.string=mixedCase;
                                        }
                                        
                                        var m2 = stream.match(reg_notcommentstart, false);
                                        
		                    			if(m2!=null) {
                                            state.metadata.push(token);
		                    				state.metadata.push(m2[0].trim());                                            
		                    			} else {
		                    				logError('MetaData "'+token+'" needs a value.',state.lineNumber);
		                    			}
		                    			state.tokenIndex=1;
		                    			return 'METADATA';
		                    		} else if ( ['run_rules_on_level_start','norepeat_action','require_player_movement','debug','verbose_logging','throttle_movement','noundo','noaction','norestart','scanline'].indexOf(token)>=0) {
		                    			state.metadata.push(token);
		                    			state.metadata.push("true");
		                    			state.tokenIndex=-1;
		                    			return 'METADATA';
		                    		} else  {
		                    			logError('Unrecognised stuff in the prelude.', state.lineNumber);
		                    			return 'ERROR';
		                    		}
		                    	} else if (state.tokenIndex==-1) {
	                   				logError('MetaData "'+token+'" has no parameters.',state.lineNumber);
		                    		return 'ERROR';
		                    	}
		                    	return 'METADATA';
		                    }       
		               	} else {
		               		stream.match(reg_notcommentstart, true);
		               		return "METADATATEXT";
		               	}
	                	break;
	                }
	            }
            };

            if (stream.eol()) {
                return null;
            }
            if (!stream.eol()) {
                stream.next();
                return null;
            }
        },
        startState: function() {
            return {
                /*
                    permanently useful
                */
                objects: {},

                /*
                    for parsing
                */
                lineNumber: 0,

                commentLevel: 0,

                section: '',
                visitedSections: [],

                objects_candname: '',
                objects_section: 0, //whether reading name/color/spritematrix
                objects_spritematrix: [],

                collisionLayers: [],

                tokenIndex: 0,

                legend_synonyms: [],
                legend_aggregates: [],
                legend_properties: [],

                sounds: [],
                rules: [],

                names: [],

                winconditions: [],
                metadata: [],

                original_case_names: {},

                abbrevNames: [],

                levels: [[]],

                subsection: ''
            };
        }
    };
};

// window.CodeMirror.defineMode('puzzle', codeMirrorFn);

//////////File Source js/editor.js
var code = document.getElementById('code');
var _editorDirty = false;
var _editorCleanState = "";

var fileToOpen=getParameterByName("demo");
if (fileToOpen!==null&&fileToOpen.length>0) {
	tryLoadFile(fileToOpen);
	code.value = "loading...";
} else {
	var gistToLoad=getParameterByName("hack");
	if (gistToLoad!==null&&gistToLoad.length>0) {
		var id = gistToLoad.replace(/[\\\/]/,"");
		tryLoadGist(id);
		code.value = "loading...";
	} else {
		try {
			if (localStorage!==undefined && localStorage['saves']!==undefined) {
					var curSaveArray = JSON.parse(localStorage['saves']);
					var sd = curSaveArray[curSaveArray.length-1];
					code.value = sd.text;
					var loadDropdown = document.getElementById('loadDropDown');
					loadDropdown.selectedIndex=0;
			}
		} catch(ex) {
			
		}
	}
}


// var editor = window.CodeMirror.fromTextArea(code, {
// //	viewportMargin: Infinity,
// 	lineWrapping: true,
// 	lineNumbers: true,
// 	styleActiveLine: true,
// 	extraKeys: {
// 		"Ctrl-/": "toggleComment",
// 		"Cmd-/": "toggleComment",
// 		"Esc":CodeMirror.commands.clearSearch
// 		}
// 	});
	
// editor.on('mousedown', function(cm, event) {
//   if (event.target.className == 'cm-SOUND') {
//     var seed = parseInt(event.target.innerHTML);
//     playSound(seed);
//   } else if (event.target.className == 'cm-LEVEL') {
//     if (event.ctrlKey||event.metaKey) {
// 	  document.activeElement.blur();  // unfocus code panel
// 	  editor.display.input.blur();
//       prevent(event);         // prevent refocus
//       compile(["levelline",cm.posFromMouse(event).line]);
//     }
//   }
// });

// _editorCleanState = editor.getValue();

function checkEditorDirty() {
	var saveLink = document.getElementById('saveClickLink');

	if (_editorCleanState !== editor.getValue()) {
		_editorDirty = true;
		if(saveLink) {
			saveLink.innerHTML = 'SAVE*';
		}
	} else {
		_editorDirty = false;
		if(saveLink) {
			saveLink.innerHTML = 'SAVE';
		}
	}
}

function setEditorClean() {
	_editorCleanState = editor.getValue();
	if (_editorDirty===true) {
		var saveLink = document.getElementById('saveClickLink');
		if(saveLink) {
			saveLink.innerHTML = 'SAVE';
		}
		_editorDirty = false;
	}
}

/* https://github.com/ndrake/PuzzleScript/commit/de4ac2a38865b74e66c1d711a25f0691079a290d */
// editor.on('change', function(cm, changeObj) {
//   // editor is dirty
//   checkEditorDirty();
// });

var mapObj = {
   parallel:"&#8741;",
   perpendicular:"&#8869;"
};

/*
editor.on("beforeChange", function(instance, change) {
    var startline = 
    for (var i = 0; i < change.text.length; ++i)
      text.push(change.text[i].replace(/parallel|perpendicular/gi, function(matched){ 
        return mapObj[matched];
      }));

    change.update(null, null, text);
});*/


// code.editorreference = editor;
// editor.setOption('theme', 'midnight');

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function tryLoadGist(id) {
	var githubURL = 'https://api.github.com/gists/'+id;

	consolePrint("Contacting GitHub",true);
	var githubHTTPClient = new XMLHttpRequest();
	githubHTTPClient.open('GET', githubURL);
	githubHTTPClient.onreadystatechange = function() {
	
		if(githubHTTPClient.readyState!=4) {
			return;
		}

		if (githubHTTPClient.responseText==="") {
			consoleError("GitHub request returned nothing.  A connection fault, maybe?");
		}

		var result = JSON.parse(githubHTTPClient.responseText);
		if (githubHTTPClient.status===403) {
			consoleError(result.message);
		} else if (githubHTTPClient.status!==200&&githubHTTPClient.status!==201) {
			consoleError("HTTP Error "+ githubHTTPClient.status + ' - ' + githubHTTPClient.statusText);
		} else {
			var code=result["files"]["script.txt"]["content"];
			editor.setValue(code);
			editor.clearHistory();
			setEditorClean();
			unloadGame();
			compile(["restart"],code);
		}
	}
	githubHTTPClient.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	githubHTTPClient.send();
}

function tryLoadFile(fileName) {
	var fileOpenClient = new XMLHttpRequest();
	fileOpenClient.open('GET', 'demo/'+fileName+".txt");
	fileOpenClient.onreadystatechange = function() {
		
  		if(fileOpenClient.readyState!=4) {
  			return;
  		}
  		
		editor.setValue(fileOpenClient.responseText);
		setEditorClean();
		unloadGame();
		compile(["restart"]);
	}
	fileOpenClient.send();
}

function canExit() {
 	if(!_editorDirty) {
 		return true;
 	}
 
 	return confirm("You haven't saved your game! Are you sure you want to lose your unsaved changes?")
}
 
function dropdownChange() {
	if(!canExit()) {
 		this.selectedIndex = 0;
 		return;
 	}

	tryLoadFile(this.value);
	this.selectedIndex=0;
}

// editor.on('keyup', function (editor, event) {
// 	if (!CodeMirror.ExcludedIntelliSenseTriggerKeys[(event.keyCode || event.which).toString()])
// 	{
// 		var dosuggest=true;
// 		if (editor.doc.sel.ranges.length>0){
// 			console.log(editor.getRange(editor.doc.sel.ranges[0].anchor, {line:53,ch:59}));
// 		}

// 		if (dosuggest){
// 			CodeMirror.commands.autocomplete(editor, null, { completeSingle: false });
// 		}
// 	}
// });

//////////File Source js/compiler.js
'use strict';


function isColor(str) {
    str = str.trim();
    if (str in colorPalettes.arnecolors)
        return true;
    if (/^#([0-9A-F]{3}){1,2}$/i.test(str))
        return true;
    if (str === "transparent")
        return true;
    return false;
}

function colorToHex(palette, str) {
    str = str.trim();
    if (str in palette) {
        return palette[str];
    }

    return str;
}


function generateSpriteMatrix(dat) {

    var result = [];
    for (var i = 0; i < dat.length; i++) {
        var row = [];
        for (var j = 0; j < dat.length; j++) {
            var ch = dat[i].charAt(j);
            if (ch == '.') {
                row.push(-1);
            } else {
                row.push(ch);
            }
        }
        result.push(row);
    }
    return result;
}

var debugMode;
var colorPalette;

function generateExtraMembers(state) {

    if (state.collisionLayers.length === 0) {
        logError("No collision layers defined.  All objects need to be in collision layers.");
    }

    //annotate objects with layers
    //assign ids at the same time
    state.idDict = {};
    var idcount = 0;
    for (var layerIndex = 0; layerIndex < state.collisionLayers.length; layerIndex++) {
        for (var j = 0; j < state.collisionLayers[layerIndex].length; j++) {
            var n = state.collisionLayers[layerIndex][j];
            if (n in state.objects) {
                var o = state.objects[n];
                o.layer = layerIndex;
                o.id = idcount;
                state.idDict[idcount] = n;
                idcount++;
            }
        }
    }

    //set object count
    state.objectCount = idcount;

    //calculate blank mask template
    var layerCount = state.collisionLayers.length;
    var blankMask = [];
    for (var i = 0; i < layerCount; i++) {
        blankMask.push(-1);
    }

    // how many words do our bitvecs need to hold?
    STRIDE_OBJ = Math.ceil(state.objectCount / 32) | 0;
    STRIDE_MOV = Math.ceil(layerCount / 5) | 0;
    state.STRIDE_OBJ = STRIDE_OBJ;
    state.STRIDE_MOV = STRIDE_MOV;

    //get colorpalette name
    debugMode = false;
    verbose_logging = false;
    throttle_movement = false;
    colorPalette = colorPalettes.arnecolors;
    for (var i = 0; i < state.metadata.length; i += 2) {
        var key = state.metadata[i];
        var val = state.metadata[i + 1];
        if (key === 'color_palette') {
            if (val in colorPalettesAliases) {
                val = colorPalettesAliases[val];
            }
            if (colorPalettes[val] === undefined) {
                logError('Palette "' + val + '" not found, defaulting to arnecolors.', 0);
            } else {
                colorPalette = colorPalettes[val];
            }
        } else if (key === 'debug') {
            debugMode = true;
            cache_console_messages = true;
        } else if (key === 'verbose_logging') {
            verbose_logging = true;
            cache_console_messages = true;
        } else if (key === 'throttle_movement') {
            throttle_movement = true;
        }
    }

    //convert colors to hex
    for (var n in state.objects) {
        if (state.objects.hasOwnProperty(n)) {
            //convert color to hex
            var o = state.objects[n];
            if (o.colors.length > 10) {
                logError("a sprite cannot have more than 10 colors.  Why you would want more than 10 is beyond me.", o.lineNumber + 1);
            }
            for (var i = 0; i < o.colors.length; i++) {
                var c = o.colors[i];
                if (isColor(c)) {
                    c = colorToHex(colorPalette, c);
                    o.colors[i] = c;
                } else {
                    logError('Invalid color specified for object "' + n + '", namely "' + o.colors[i] + '".', o.lineNumber + 1);
                    o.colors[i] = '#ff00ff'; // magenta error color
                }
            }
        }
    }

    //generate sprite matrix
    for (var n in state.objects) {
        if (state.objects.hasOwnProperty(n)) {
            var o = state.objects[n];
            if (o.colors.length == 0) {
                logError('color not specified for object "' + n + '".', o.lineNumber);
                o.colors = ["#ff00ff"];
            }
            if (o.spritematrix.length === 0) {
                o.spritematrix = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ];
            } else {
                if (o.spritematrix.length !== 5 || o.spritematrix[0].length !== 5 || o.spritematrix[1].length !== 5 || o.spritematrix[2].length !== 5 || o.spritematrix[3].length !== 5 || o.spritematrix[4].length !== 5) {
                    logWarning("Sprite graphics must be 5 wide and 5 high exactly.", o.lineNumber);
                }
                o.spritematrix = generateSpriteMatrix(o.spritematrix);
            }
        }
    }


    //calculate glyph dictionary
    var glyphDict = {};
    for (var n in state.objects) {
        if (state.objects.hasOwnProperty(n)) {
            var o = state.objects[n];
            var mask = blankMask.concat([]);
            mask[o.layer] = o.id;
            glyphDict[n] = mask;
        }
    }
    var added = true;
    while (added) {
        added = false;

        //then, synonyms
        for (var i = 0; i < state.legend_synonyms.length; i++) {
            var dat = state.legend_synonyms[i];
            var key = dat[0];
            var val = dat[1];
            if ((!(key in glyphDict) || (glyphDict[key] === undefined)) && (glyphDict[val] !== undefined)) {
                added = true;
                glyphDict[key] = glyphDict[val];
            }
        }

        //then, aggregates
        for (var i = 0; i < state.legend_aggregates.length; i++) {
            var dat = state.legend_aggregates[i];
            var key = dat[0];
            var vals = dat.slice(1);
            var allVallsFound = true;
            for (var j = 0; j < vals.length; j++) {
                var v = vals[j];
                if (glyphDict[v] === undefined) {
                    allVallsFound = false;
                    break;
                }
            }
            if ((!(key in glyphDict) || (glyphDict[key] === undefined)) && allVallsFound) {
                var mask = blankMask.concat([]);

                for (var j = 1; j < dat.length; j++) {
                    var n = dat[j];
                    var o = state.objects[n];
                    if (o == undefined) {
                        logError('Object not found with name ' + n, state.lineNumber);
                    }
                    if (mask[o.layer] == -1) {
                        mask[o.layer] = o.id;
                    } else {
                        if (o.layer === undefined) {
                            logError('Object "' + n.toUpperCase() + '" has been defined, but not assigned to a layer.', dat.lineNumber);
                        } else {
                            var n1 = n.toUpperCase();
                            var n2 = state.idDict[mask[o.layer]].toUpperCase();
                            if (n1 !== n2) {
                                logError(
                                    'Trying to create an aggregate object (defined in the legend) with both "' +
                                    n1 + '" and "' + n2 + '", which are on the same layer and therefore can\'t coexist.',
                                    dat.lineNumber
                                );
                            }
                        }
                    }
                }
                added = true;
                glyphDict[dat[0]] = mask;
            }
        }
    }
    state.glyphDict = glyphDict;

    var aggregatesDict = {};
    for (var i = 0; i < state.legend_aggregates.length; i++) {
        var entry = state.legend_aggregates[i];
        aggregatesDict[entry[0]] = entry.slice(1);
    }
    state.aggregatesDict = aggregatesDict;

    var propertiesDict = {};
    for (var i = 0; i < state.legend_properties.length; i++) {
        var entry = state.legend_properties[i];
        propertiesDict[entry[0]] = entry.slice(1);
    }
    state.propertiesDict = propertiesDict;

    //calculate lookup dictionaries
    var synonymsDict = {};
    for (var i = 0; i < state.legend_synonyms.length; i++) {
        var entry = state.legend_synonyms[i];
        var key = entry[0];
        var value = entry[1];
        if (value in aggregatesDict) {
            aggregatesDict[key] = aggregatesDict[value];
        } else if (value in propertiesDict) {
            propertiesDict[key] = propertiesDict[value];
        } else if (key !== value) {
            synonymsDict[key] = value;
        }
    }
    state.synonymsDict = synonymsDict;

    var modified = true;
    while (modified) {
        modified = false;
        for (var n in synonymsDict) {
            if (synonymsDict.hasOwnProperty(n)) {
                var value = synonymsDict[n];
                if (value in propertiesDict) {
                    delete synonymsDict[n];
                    propertiesDict[n] = propertiesDict[value];
                    modified = true;
                } else if (value in aggregatesDict) {
                    delete aggregatesDict[n];
                    aggregatesDict[n] = aggregatesDict[value];
                    modified = true;
                } else if (value in synonymsDict) {
                    synonymsDict[n] = synonymsDict[value];
                }
            }
        }

        for (var n in propertiesDict) {
            if (propertiesDict.hasOwnProperty(n)) {
                var values = propertiesDict[n];
                for (var i = 0; i < values.length; i++) {
                    var value = values[i];
                    if (value in synonymsDict) {
                        values[i] = synonymsDict[value];
                        modified = true;
                    } else if (value in propertiesDict) {
                        values.splice(i, 1);
                        var newvalues = propertiesDict[value];
                        for (var j = 0; j < newvalues.length; j++) {
                            var newvalue = newvalues[j];
                            if (values.indexOf(newvalue) === -1) {
                                values.push(newvalue);
                            }
                        }
                        modified = true;
                    }
                    if (value in aggregatesDict) {
                        logError('Trying to define property "' + n.toUpperCase() + '" in terms of aggregate "' + value.toUpperCase() + '".');
                    }
                }
            }
        }


        for (var n in aggregatesDict) {
            if (aggregatesDict.hasOwnProperty(n)) {
                var values = aggregatesDict[n];
                for (var i = 0; i < values.length; i++) {
                    var value = values[i];
                    if (value in synonymsDict) {
                        values[i] = synonymsDict[value];
                        modified = true;
                    } else if (value in aggregatesDict) {
                        values.splice(i, 1);
                        var newvalues = aggregatesDict[value];
                        for (var j = 0; j < newvalues.length; j++) {
                            var newvalue = newvalues[j];
                            if (values.indexOf(newvalue) === -1) {
                                values.push(newvalue);
                            }
                        }
                        modified = true;
                    }
                    if (value in propertiesDict) {
                        logError('Trying to define aggregate "' + n.toUpperCase() + '" in terms of property "' + value.toUpperCase() + '".');
                    }
                }
            }
        }
    }

    /* determine which properties specify objects all on one layer */
    state.propertiesSingleLayer = {};
    for (var key in propertiesDict) {
        if (propertiesDict.hasOwnProperty(key)) {
            var values = propertiesDict[key];
            var sameLayer = true;
            for (var i = 1; i < values.length; i++) {
                if ((state.objects[values[i - 1]].layer !== state.objects[values[i]].layer)) {
                    sameLayer = false;
                    break;
                }
            }
            if (sameLayer) {
                state.propertiesSingleLayer[key] = state.objects[values[0]].layer;
            }
        }
    }

    if (state.idDict[0] === undefined && state.collisionLayers.length > 0) {
        logError('You need to have some objects defined');
    }

    //set default background object
    var backgroundid;
    var backgroundlayer;
    if (state.objects.background === undefined) {
        if ('background' in state.synonymsDict) {
            var n = state.synonymsDict['background'];
            var o = state.objects[n];
            backgroundid = o.id;
            backgroundlayer = o.layer;
        } else if ('background' in state.propertiesDict) {
            var n = state.propertiesDict['background'][0];
            var o = state.objects[n];
            backgroundid = o.id;
            backgroundlayer = o.layer;
        } else if ('background' in state.aggregatesDict) {
            var o = state.objects[state.idDict[0]];
            backgroundid = o.id;
            backgroundlayer = o.layer;
            logError("background cannot be an aggregate (declared with 'and'), it has to be a simple type, or property (declared in terms of others using 'or').");
        } else {
            var o = state.objects[state.idDict[0]];
            backgroundid = o.id;
            backgroundlayer = o.layer;
            logError("you have to define something to be the background");
        }
    } else {
        backgroundid = state.objects.background.id;
        backgroundlayer = state.objects.background.layer;
    }
    state.backgroundid = backgroundid;
    state.backgroundlayer = backgroundlayer;
}

Level.prototype.calcBackgroundMask = function(state) {
    if (state.backgroundlayer === undefined) {
        logError("you have to have a background layer");
    }

    var backgroundMask = state.layerMasks[state.backgroundlayer];
    for (var i = 0; i < this.n_tiles; i++) {
        var cell = this.getCell(i);
        cell.iand(backgroundMask);
        if (!cell.iszero()) {
            return cell;
        }
    }
    cell = new BitVec(STRIDE_OBJ);
    cell.ibitset(state.backgroundid);
    return cell;
}

function levelFromString(state, level) {
    var backgroundlayer = state.backgroundlayer;
    var backgroundid = state.backgroundid;
    var backgroundLayerMask = state.layerMasks[backgroundlayer];
    var o = new Level(level[0], level[1].length, level.length - 1, state.collisionLayers.length, null);
    o.objects = new Int32Array(o.width * o.height * STRIDE_OBJ);

    for (var i = 0; i < o.width; i++) {
        for (var j = 0; j < o.height; j++) {
            var ch = level[j + 1].charAt(i);
            if (ch.length == 0) {
                ch = level[j + 1].charAt(level[j + 1].length - 1);
            }
            var mask = state.glyphDict[ch];

            if (mask == undefined) {
                if (state.propertiesDict[ch] === undefined) {
                    logError('Error, symbol "' + ch + '", used in map, not found.', level[0] + j);
                } else {
                    logError('Error, symbol "' + ch + '" is defined using \'or\', and therefore ambiguous - it cannot be used in a map. Did you mean to define it in terms of \'and\'?', level[0] + j);
                }

            }

            var maskint = new BitVec(STRIDE_OBJ);
            if(!mask) {
                console.error("??")
            }
            mask = mask.concat([]);
            for (var z = 0; z < o.layerCount; z++) {
                if (mask[z] >= 0) {
                    maskint.ibitset(mask[z]);
                }
            }
            for (var w = 0; w < STRIDE_OBJ; ++w) {
                o.objects[STRIDE_OBJ * (i * o.height + j) + w] = maskint.data[w];
            }
        }
    }

    var levelBackgroundMask = o.calcBackgroundMask(state);
    for (var i = 0; i < o.n_tiles; i++) {
        var cell = o.getCell(i);
        if (!backgroundLayerMask.anyBitsInCommon(cell)) {
            cell.ior(levelBackgroundMask);
            o.setCell(i, cell);
        }
    }
    return o;
}
//also assigns glyphDict
function levelsToArray(state) {
    var levels = state.levels;
    var processedLevels = [];

    for (var levelIndex = 0; levelIndex < levels.length; levelIndex++) {
        var level = levels[levelIndex];
        if (level.length == 0) {
            continue;
        }
        if (level[0] == '\n') {

            var o = {
                message: level[1]
            };
            splitMessage = wordwrap(o.message, intro_template[0].length);
            if (splitMessage.length > 12) {
                logWarning('Message too long to fit on screen.', level[2]);
            }

            processedLevels.push(o);
        } else {
            var o = levelFromString(state, level);
            processedLevels.push(o);
        }

    }

    state.levels = processedLevels;
}

var directionaggregates = {
    'horizontal': ['left', 'right'],
    'vertical': ['up', 'down'],
    'moving': ['up', 'down', 'left', 'right', 'action'],
    'orthogonal': ['up', 'down', 'left', 'right'],
    'perpendicular': ['^', 'v'],
    'parallel': ['<', '>']
};

var relativeDirections = ['^', 'v', '<', '>', 'horizontal', 'vertical'];
var simpleAbsoluteDirections = ['up', 'down', 'left', 'right'];
var simpleRelativeDirections = ['^', 'v', '<', '>'];
var reg_directions_only = /^(\>|\<|\^|v|up|down|left|right|moving|stationary|no|randomdir|random|horizontal|vertical|orthogonal|perpendicular|parallel|action)$/;
//redeclaring here, i don't know why
var commandwords = ["sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "cancel", "checkpoint", "restart", "win", "message", "again"];


function directionalRule(rule) {
    for (var i = 0; i < rule.lhs.length; i++) {
        var cellRow = rule.lhs[i];
        if (cellRow.length > 1) {
            return true;
        }
        for (var j = 0; j < cellRow.length; j++) {
            var cell = cellRow[j];
            for (var k = 0; k < cell.length; k += 2) {
                if (relativeDirections.indexOf(cell[k]) >= 0) {
                    return true;
                }
            }
        }
    }
    for (var i = 0; i < rule.rhs.length; i++) {
        var cellRow = rule.rhs[i];
        if (cellRow.length > 1) {
            return true;
        }
        for (var j = 0; j < cellRow.length; j++) {
            var cell = cellRow[j];
            for (var k = 0; k < cell.length; k += 2) {
                if (relativeDirections.indexOf(cell[k]) >= 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

function findIndexAfterToken(str, tokens, tokenIndex) {
    str = str.toLowerCase();
    var curIndex = 0;
    for (var i = 0; i <= tokenIndex; i++) {
        var token = tokens[i];
        curIndex = str.indexOf(token, curIndex) + token.length;
    }
    return curIndex;
}

function processRuleString(rule, state, curRules) {
    /*

    	intermediate structure
    		dirs: Directions[]
    		pre : CellMask[]
    		post : CellMask[]

    		//pre/post pairs must have same lengths
    	final rule structure
    		dir: Direction
    		pre : CellMask[]
    		post : CellMask[]
    */
    var line = rule[0];
    var lineNumber = rule[1];
    var origLine = rule[2];

    // STEP ONE, TOKENIZE
    line = line.replace(/\[/g, ' [ ').replace(/\]/g, ' ] ').replace(/\|/g, ' | ').replace(/\-\>/g, ' -> ');
    line = line.trim();
    if (line[0] === '+') {
        line = line.substring(0, 1) + " " + line.substring(1, line.length);
    }
    var tokens = line.split(/\s/).filter(function(v) { return v !== '' });

    if (tokens.length == 0) {
        logError('Spooky error!  Empty line passed to rule function.', lineNumber);
    }


    // STEP TWO, READ DIRECTIONS
    /*
    	STATE
    	0 - scanning for initial directions
    	LHS
    	1 - reading cell contents LHS
    	2 - reading cell contents RHS
    */
    var parsestate = 0;
    var directions = [];

    var curcell = null; // [up, cat, down mouse]
    var curcellrow = []; // [  [up, cat]  [ down, mouse ] ]

    var incellrow = false;

    var appendGroup = false;
    var rhs = false;
    var lhs_cells = [];
    var rhs_cells = [];
    var late = false;
    var rigid = false;
    var groupNumber = lineNumber;
    var commands = [];
    var randomRule = false;

    if (tokens.length === 1) {
        if (tokens[0] === "startloop") {
            rule_line = {
                bracket: 1
            }
            return rule_line;
        } else if (tokens[0] === "endloop") {
            rule_line = {
                bracket: -1
            }
            return rule_line;
        }
    }

    if (tokens.indexOf('->') == -1) {
        logError("A rule has to have an arrow in it.  There's no arrow here! Consider reading up about rules - you're clearly doing something weird", lineNumber);
    }

    var curcell = [];
    var bracketbalance = 0;
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        switch (parsestate) {
            case 0:
                {
                    //read initial directions
                    if (token === '+') {
                        if (groupNumber === lineNumber) {
                            if (curRules.length == 0) {
                                logError('The "+" symbol, for joining a rule with the group of the previous rule, needs a previous rule to be applied to.');
                            }
                            if (i !== 0) {
                                logError('The "+" symbol, for joining a rule with the group of the previous rule, must be the first symbol on the line ');
                            }
                            groupNumber = curRules[curRules.length - 1].groupNumber;
                        } else {
                            logError('Two "+"s ("append to previous rule group" symbol) applied to the same rule.', lineNumber);
                        }
                    } else if (token in directionaggregates) {
                        directions = directions.concat(directionaggregates[token]);
                    } else if (token === 'late') {
                        late = true;
                    } else if (token === 'rigid') {
                        rigid = true;
                    } else if (token === 'random') {
                        randomRule = true;
                    } else if (simpleAbsoluteDirections.indexOf(token) >= 0) {
                        directions.push(token);
                    } else if (simpleRelativeDirections.indexOf(token) >= 0) {
                        logError('You cannot use relative directions (\"^v<>\") to indicate in which direction(s) a rule applies.  Use absolute directions indicators (Up, Down, Left, Right, Horizontal, or Vertical, for instance), or, if you want the rule to apply in all four directions, do not specify directions', lineNumber);
                    } else if (token == '[') {
                        if (directions.length == 0) {
                            directions = directions.concat(directionaggregates['orthogonal']);
                        }
                        parsestate = 1;
                        i--;
                    } else {
                        logError("The start of a rule must consist of some number of directions (possibly 0), before the first bracket, specifying in what directions to look (with no direction specified, it applies in all four directions).  It seems you've just entered \"" + token.toUpperCase() + '\".', lineNumber);
                    }
                    break;
                }
            case 1:
                {
                    if (token == '[') {
                        bracketbalance++;
                        if (bracketbalance > 1) {
                            logWarning("Multiple opening brackets without closing brackets.  Something fishy here.  Every '[' has to be closed by a ']', and you can't nest them.", lineNumber);
                        }
                        if (curcell.length > 0) {
                            logError('Error, malformed cell rule - encountered a "["" before previous bracket was closed', lineNumber);
                        }
                        incellrow = true;
                        curcell = [];
                    } else if (reg_directions_only.exec(token)) {
                        if (curcell.length % 2 == 1) {
                            logError("Error, an item can only have one direction/action at a time, but you're looking for several at once!", lineNumber);
                        } else if (!incellrow) {
                            logWarning("Invalid syntax. Directions should be placed at the start of a rule.", lineNumber);
                        } else {
                            curcell.push(token);
                        }
                    } else if (token == '|') {
                        if (!incellrow) {
                            logWarning('Janky syntax.  "|" should only be used inside cell rows (the square brackety bits).', lineNumber);
                        } else if (curcell.length % 2 == 1) {
                            logError('In a rule, if you specify a force, it has to act on an object.', lineNumber);
                        } else {
                            curcellrow.push(curcell);
                            curcell = [];
                        }
                    } else if (token === ']') {

                        bracketbalance--;
                        if (bracketbalance < 0) {
                            logWarning("Multiple closing brackets without corresponding opening brackets.  Something fishy here.  Every '[' has to be closed by a ']', and you can't nest them.", lineNumber);
                        }

                        if (curcell.length % 2 == 1) {
                            if (curcell[0] === '...') {
                                logError('Cannot end a rule with ellipses.', lineNumber);
                            } else {
                                logError('In a rule, if you specify a force, it has to act on an object.', lineNumber);
                            }
                        } else {
                            curcellrow.push(curcell);
                            curcell = [];
                        }

                        if (rhs) {
                            rhs_cells.push(curcellrow);
                        } else {
                            lhs_cells.push(curcellrow);
                        }
                        curcellrow = [];
                        incellrow = false;
                    } else if (token === '->') {
                        if (incellrow) {
                            logError('Encountered an unexpected "->" inside square brackets.  It\'s used to separate states, it has no place inside them >:| .', lineNumber);
                        } else if (rhs) {
                            logError('Error, you can only use "->" once in a rule; it\'s used to separate before and after states.', lineNumber);
                        } else {
                            rhs = true;
                        }
                    } else if (state.names.indexOf(token) >= 0) {
                        if (!incellrow) {
                            logWarning("Invalid token " + token.toUpperCase() + ". Object names should only be used within cells (square brackets).", lineNumber);
                        } else if (curcell.length % 2 == 0) {
                            curcell.push('');
                            curcell.push(token);
                        } else if (curcell.length % 2 == 1) {
                            curcell.push(token);
                        }
                    } else if (token === '...') {
                        if (!incellrow) {
                            logWarning("Invalid syntax, ellipses should only be used within cells (square brackets).", lineNumber);
                        } else {
                            curcell.push(token);
                            curcell.push(token);
                        }
                    } else if (commandwords.indexOf(token) >= 0) {
                        if (rhs === false) {
                            logError("Commands cannot appear on the left-hand side of the arrow.", lineNumber);
                        }
                        if (token === 'message') {
                            var messageIndex = findIndexAfterToken(origLine, tokens, i);
                            var messageStr = origLine.substring(messageIndex).trim();
                            if (messageStr === "") {
                                messageStr = " ";
                                //needs to be nonempty or the system gets confused and thinks it's a whole level message rather than an interstitial.
                            }
                            commands.push([token, messageStr]);
                            i = tokens.length;
                        } else {
                            commands.push([token]);
                        }
                    } else {
                        logError('Error, malformed cell rule - was looking for cell contents, but found "' + token + '".  What am I supposed to do with this, eh, please tell me that.', lineNumber);
                    }
                }

        }
    }

    if (lhs_cells.length != rhs_cells.length) {
        if (commands.length > 0 && rhs_cells.length == 0) {
            //ok
        } else {
            logError('Error, when specifying a rule, the number of matches (square bracketed bits) on the left hand side of the arrow must equal the number on the right', lineNumber);
        }
    } else {
        for (var i = 0; i < lhs_cells.length; i++) {
            if (lhs_cells[i].length != rhs_cells[i].length) {
                logError('In a rule, each pattern to match on the left must have a corresponding pattern on the right of equal length (number of cells).', lineNumber);
            }
            if (lhs_cells[i].length == 0) {
                logError("You have an totally empty pattern on the left-hand side.  This will match *everything*.  You certainly don't want this.");
            }
        }
    }

    if (lhs_cells.length == 0) {
        logError('This rule refers to nothing.  What the heck? :O', lineNumber);
    }

    var rule_line = {
        directions: directions,
        lhs: lhs_cells,
        rhs: rhs_cells,
        lineNumber: lineNumber,
        late: late,
        rigid: rigid,
        groupNumber: groupNumber,
        commands: commands,
        randomRule: randomRule
    };

    if (directionalRule(rule_line) === false) {
        rule_line.directions = ['up'];
    }

    //next up - replace relative directions with absolute direction

    return rule_line;
}

function deepCloneHS(HS) {
    var cloneHS = HS.map(function(arr) { return arr.map(function(deepArr) { return deepArr.slice(); }); });
    return cloneHS;
}

function deepCloneRule(rule) {
    var clonedRule = {
        direction: rule.direction,
        lhs: deepCloneHS(rule.lhs),
        rhs: deepCloneHS(rule.rhs),
        lineNumber: rule.lineNumber,
        late: rule.late,
        rigid: rule.rigid,
        groupNumber: rule.groupNumber,
        commands: rule.commands,
        randomRule: rule.randomRule
    };
    return clonedRule;
}

function rulesToArray(state) {
    var oldrules = state.rules;
    var rules = [];
    var loops = [];
    for (var i = 0; i < oldrules.length; i++) {
        var lineNumber = oldrules[i][1];
        var newrule = processRuleString(oldrules[i], state, rules);
        if (newrule.bracket !== undefined) {
            loops.push([lineNumber, newrule.bracket]);
            continue;
        }
        rules.push(newrule);
    }
    state.loops = loops;

    //now expand out rules with multiple directions
    var rules2 = [];
    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        var ruledirs = rule.directions;
        for (var j = 0; j < ruledirs.length; j++) {
            var dir = ruledirs[j];
            if (dir in directionaggregates && directionalRule(rule)) {
                var dirs = directionaggregates[dir];
                for (var k = 0; k < dirs.length; k++) {
                    var modifiedrule = deepCloneRule(rule);
                    modifiedrule.direction = dirs[k];
                    rules2.push(modifiedrule);
                }
            } else {
                var modifiedrule = deepCloneRule(rule);
                modifiedrule.direction = dir;
                rules2.push(modifiedrule);
            }
        }
    }

    for (var i = 0; i < rules2.length; i++) {
        var rule = rules2[i];
        //remove relative directions
        convertRelativeDirsToAbsolute(rule);
        //optional: replace up/left rules with their down/right equivalents
        rewriteUpLeftRules(rule);
        //replace aggregates with what they mean
        atomizeAggregates(state, rule);
        //replace synonyms with what they mean
        rephraseSynonyms(state, rule);
    }

    var rules3 = [];
    //expand property rules
    for (var i = 0; i < rules2.length; i++) {
        var rule = rules2[i];
        rules3 = rules3.concat(concretizeMovingRule(state, rule, rule.lineNumber));
    }

    var rules4 = [];
    for (var i = 0; i < rules3.length; i++) {
        var rule = rules3[i];
        rules4 = rules4.concat(concretizePropertyRule(state, rule, rule.lineNumber));

    }

    state.rules = rules4;
}

function containsEllipsis(rule) {
    for (var i = 0; i < rule.lhs.length; i++) {
        for (var j = 0; j < rule.lhs[i].length; j++) {
            if (rule.lhs[i][j][1] === '...')
                return true;
        }
    }
    return false;
}

function rewriteUpLeftRules(rule) {
    if (containsEllipsis(rule)) {
        return;
    }

    if (rule.direction == 'up') {
        rule.direction = 'down';
    } else if (rule.direction == 'left') {
        rule.direction = 'right';
    } else {
        return;
    }

    for (var i = 0; i < rule.lhs.length; i++) {
        rule.lhs[i].reverse();
        if (rule.rhs.length > 0) {
            rule.rhs[i].reverse();
        }
    }
}

function getPropertiesFromCell(state, cell) {
    var result = [];
    for (var j = 0; j < cell.length; j += 2) {
        var dir = cell[j];
        var name = cell[j + 1];
        if (dir == "random") {
            continue;
        }
        if (name in state.propertiesDict) {
            result.push(name);
        }
    }
    return result;
}

//returns you a list of object names in that cell that're moving
function getMovings(state, cell) {
    var result = [];
    for (var j = 0; j < cell.length; j += 2) {
        var dir = cell[j];
        var name = cell[j + 1];
        if (dir in directionaggregates) {
            result.push([name, dir]);
        }
    }
    return result;
}

function concretizePropertyInCell(cell, property, concreteType) {
    for (var j = 0; j < cell.length; j += 2) {
        if (cell[j + 1] === property && cell[j] !== "random") {
            cell[j + 1] = concreteType;
        }
    }
}

function concretizeMovingInCell(cell, ambiguousMovement, nameToMove, concreteDirection) {
    for (var j = 0; j < cell.length; j += 2) {
        if (cell[j] === ambiguousMovement && cell[j + 1] === nameToMove) {
            cell[j] = concreteDirection;
        }
    }
}

function concretizeMovingInCellByAmbiguousMovementName(cell, ambiguousMovement, concreteDirection) {
    for (var j = 0; j < cell.length; j += 2) {
        if (cell[j] === ambiguousMovement) {
            cell[j] = concreteDirection;
        }
    }
}

function expandNoPrefixedProperties(state, cell) {
    var expanded = [];
    for (var i = 0; i < cell.length; i += 2) {
        var dir = cell[i];
        var name = cell[i + 1];

        if (dir === 'no' && (name in state.propertiesDict)) {
            var aliases = state.propertiesDict[name];
            for (var j = 0; j < aliases.length; j++) {
                var alias = aliases[j];
                expanded.push(dir);
                expanded.push(alias);
            }
        } else {
            expanded.push(dir);
            expanded.push(name);
        }
    }
    return expanded;
}

function concretizePropertyRule(state, rule, lineNumber) {

    //step 1, rephrase rule to change "no flying" to "no cat no bat"
    for (var i = 0; i < rule.lhs.length; i++) {
        var cur_cellrow_l = rule.lhs[i];
        for (var j = 0; j < cur_cellrow_l.length; j++) {
            cur_cellrow_l[j] = expandNoPrefixedProperties(state, cur_cellrow_l[j]);
            if (rule.rhs.length > 0)
                rule.rhs[i][j] = expandNoPrefixedProperties(state, rule.rhs[i][j]);
        }
    }

    //are there any properties we could avoid processing?
    // e.g. [> player | movable] -> [> player | > movable],
    // 		doesn't need to be split up (assuming single-layer player/block aggregates)

    // we can't manage this if they're being used to disambiguate
    var ambiguousProperties = {};

    for (var j = 0; j < rule.rhs.length; j++) {
        var row_l = rule.lhs[j];
        var row_r = rule.rhs[j];
        for (var k = 0; k < row_r.length; k++) {
            var properties_l = getPropertiesFromCell(state, row_l[k]);
            var properties_r = getPropertiesFromCell(state, row_r[k]);
            for (var prop_n = 0; prop_n < properties_r.length; prop_n++) {
                var property = properties_r[prop_n];
                if (properties_l.indexOf(property) == -1) {
                    ambiguousProperties[property] = true;
                }
            }
        }
    }

    var shouldremove;
    var result = [rule];
    var modified = true;
    while (modified) {
        modified = false;
        for (var i = 0; i < result.length; i++) {
            //only need to iterate through lhs
            var cur_rule = result[i];
            shouldremove = false;
            for (var j = 0; j < cur_rule.lhs.length && !shouldremove; j++) {
                var cur_rulerow = cur_rule.lhs[j];
                for (var k = 0; k < cur_rulerow.length && !shouldremove; k++) {
                    var cur_cell = cur_rulerow[k];
                    var properties = getPropertiesFromCell(state, cur_cell);
                    for (var prop_n = 0; prop_n < properties.length; ++prop_n) {
                        var property = properties[prop_n];

                        if (state.propertiesSingleLayer.hasOwnProperty(property) &&
                            ambiguousProperties[property] !== true) {
                            // we don't need to explode this property
                            continue;
                        }

                        var aliases = state.propertiesDict[property];

                        shouldremove = true;
                        modified = true;

                        //just do the base property, let future iterations take care of the others

                        for (var l = 0; l < aliases.length; l++) {
                            var concreteType = aliases[l];
                            var newrule = deepCloneRule(cur_rule);
                            newrule.propertyReplacement = {};
                            for (var prop in cur_rule.propertyReplacement) {
                                if (cur_rule.propertyReplacement.hasOwnProperty(prop)) {
                                    var propDat = cur_rule.propertyReplacement[prop];
                                    newrule.propertyReplacement[prop] = [propDat[0], propDat[1]];
                                }
                            }

                            concretizePropertyInCell(newrule.lhs[j][k], property, concreteType);
                            if (newrule.rhs.length > 0) {
                                concretizePropertyInCell(newrule.rhs[j][k], property, concreteType); //do for the corresponding rhs cell as well
                            }

                            if (newrule.propertyReplacement[property] === undefined) {
                                newrule.propertyReplacement[property] = [concreteType, 1];
                            } else {
                                newrule.propertyReplacement[property][1] = newrule.propertyReplacement[property][1] + 1;
                            }

                            result.push(newrule);
                        }

                        break;
                    }
                }
            }
            if (shouldremove) {
                result.splice(i, 1);
                i--;
            }
        }
    }


    for (var i = 0; i < result.length; i++) {
        //for each rule
        var cur_rule = result[i];
        if (cur_rule.propertyReplacement === undefined) {
            continue;
        }

        //for each property replacement in that rule
        for (var property in cur_rule.propertyReplacement) {
            if (cur_rule.propertyReplacement.hasOwnProperty(property)) {
                var replacementInfo = cur_rule.propertyReplacement[property];
                var concreteType = replacementInfo[0];
                var occurrenceCount = replacementInfo[1];
                if (occurrenceCount === 1) {
                    //do the replacement
                    for (var j = 0; j < cur_rule.rhs.length; j++) {
                        var cellRow_rhs = cur_rule.rhs[j];
                        for (var k = 0; k < cellRow_rhs.length; k++) {
                            var cell = cellRow_rhs[k];
                            concretizePropertyInCell(cell, property, concreteType);
                        }
                    }
                }
            }
        }
    }

    //if any properties remain on the RHSes, bleep loudly
    var rhsPropertyRemains = '';
    for (var i = 0; i < result.length; i++) {
        var cur_rule = result[i];
        delete result.propertyReplacement;
        for (var j = 0; j < cur_rule.rhs.length; j++) {
            var cur_rulerow = cur_rule.rhs[j];
            for (var k = 0; k < cur_rulerow.length; k++) {
                var cur_cell = cur_rulerow[k];
                var properties = getPropertiesFromCell(state, cur_cell);
                for (var prop_n = 0; prop_n < properties.length; prop_n++) {
                    if (ambiguousProperties.hasOwnProperty(properties[prop_n])) {
                        rhsPropertyRemains = properties[prop_n];
                    }
                }
            }
        }
    }


    if (rhsPropertyRemains.length > 0) {
        logError('This rule has a property on the right-hand side, \"' + rhsPropertyRemains.toUpperCase() + "\", that can't be inferred from the left-hand side.  (either for every property on the right there has to be a corresponding one on the left in the same cell, OR, if there's a single occurrence of a particular property name on the left, all properties of the same name on the right are assumed to be the same).", lineNumber);
    }

    return result;
}


function concretizeMovingRule(state, rule, lineNumber) {

    var shouldremove;
    var result = [rule];
    var modified = true;
    while (modified) {
        modified = false;
        for (var i = 0; i < result.length; i++) {
            //only need to iterate through lhs
            var cur_rule = result[i];
            shouldremove = false;
            for (var j = 0; j < cur_rule.lhs.length; j++) {
                var cur_rulerow = cur_rule.lhs[j];
                for (var k = 0; k < cur_rulerow.length; k++) {
                    var cur_cell = cur_rulerow[k];
                    var movings = getMovings(state, cur_cell);
                    if (movings.length > 0) {
                        shouldremove = true;
                        modified = true;

                        //just do the base property, let future iterations take care of the others
                        var cand_name = movings[0][0];
                        var ambiguous_dir = movings[0][1];
                        var concreteDirs = directionaggregates[ambiguous_dir];
                        for (var l = 0; l < concreteDirs.length; l++) {
                            var concreteDirection = concreteDirs[l];
                            var newrule = deepCloneRule(cur_rule);

                            newrule.movingReplacement = {};
                            for (var moveTerm in cur_rule.movingReplacement) {
                                if (cur_rule.movingReplacement.hasOwnProperty(moveTerm)) {
                                    var moveDat = cur_rule.movingReplacement[moveTerm];
                                    newrule.movingReplacement[moveTerm] = [moveDat[0], moveDat[1], moveDat[2]];
                                }
                            }

                            concretizeMovingInCell(newrule.lhs[j][k], ambiguous_dir, cand_name, concreteDirection);
                            if (newrule.rhs.length > 0) {
                                concretizeMovingInCell(newrule.rhs[j][k], ambiguous_dir, cand_name, concreteDirection); //do for the corresponding rhs cell as well
                            }

                            if (newrule.movingReplacement[cand_name] === undefined) {
                                newrule.movingReplacement[cand_name] = [concreteDirection, 1, ambiguous_dir];
                            } else {
                                newrule.movingReplacement[cand_name][1] = newrule.movingReplacement[cand_name][1] + 1;
                            }

                            result.push(newrule);
                        }
                    }
                }
            }
            if (shouldremove) {
                result.splice(i, 1);
                i--;
            }
        }
    }


    for (var i = 0; i < result.length; i++) {
        //for each rule
        var cur_rule = result[i];
        if (cur_rule.movingReplacement === undefined) {
            continue;
        }
        var ambiguous_movement_dict = {};
        //strict first - matches movement direction to objects
        //for each property replacement in that rule
        for (var cand_name in cur_rule.movingReplacement) {
            if (cur_rule.movingReplacement.hasOwnProperty(cand_name)) {
                var replacementInfo = cur_rule.movingReplacement[cand_name];
                var concreteMovement = replacementInfo[0];
                var occurrenceCount = replacementInfo[1];
                var ambiguousMovement = replacementInfo[2];
                if ((ambiguousMovement in ambiguous_movement_dict) || (occurrenceCount !== 1)) {
                    ambiguous_movement_dict[ambiguousMovement] = "INVALID";
                } else {
                    ambiguous_movement_dict[ambiguousMovement] = concreteMovement
                }

                if (occurrenceCount === 1) {
                    //do the replacement
                    for (var j = 0; j < cur_rule.rhs.length; j++) {
                        var cellRow_rhs = cur_rule.rhs[j];
                        for (var k = 0; k < cellRow_rhs.length; k++) {
                            var cell = cellRow_rhs[k];
                            concretizeMovingInCell(cell, ambiguousMovement, cand_name, concreteMovement);
                        }
                    }
                }
            }
        }

        //for each ambiguous word, if there's a single ambiguous movement specified in the whole lhs, then replace that wholesale
        for (var ambiguousMovement in ambiguous_movement_dict) {
            if (ambiguous_movement_dict.hasOwnProperty(ambiguousMovement) && ambiguousMovement !== "INVALID") {
                concreteMovement = ambiguous_movement_dict[ambiguousMovement];
                if (concreteMovement === "INVALID") {
                    continue;
                }
                for (var j = 0; j < cur_rule.rhs.length; j++) {
                    var cellRow_rhs = cur_rule.rhs[j];
                    for (var k = 0; k < cellRow_rhs.length; k++) {
                        var cell = cellRow_rhs[k];
                        concretizeMovingInCellByAmbiguousMovementName(cell, ambiguousMovement, concreteMovement);
                    }
                }
            }
        }
    }

    //if any properties remain on the RHSes, bleep loudly
    var rhsAmbiguousMovementsRemain = '';
    for (var i = 0; i < result.length; i++) {
        var cur_rule = result[i];
        delete result.movingReplacement;
        for (var j = 0; j < cur_rule.rhs.length; j++) {
            var cur_rulerow = cur_rule.rhs[j];
            for (var k = 0; k < cur_rulerow.length; k++) {
                var cur_cell = cur_rulerow[k];
                var movings = getMovings(state, cur_cell);
                if (movings.length > 0) {
                    rhsAmbiguousMovementsRemain = movings[0][1];
                }
            }
        }
    }


    if (rhsAmbiguousMovementsRemain.length > 0) {
        logError('This rule has an ambiguous movement on the right-hand side, \"' + rhsAmbiguousMovementsRemain + "\", that can't be inferred from the left-hand side.  (either for every ambiguous movement associated to an entity on the right there has to be a corresponding one on the left attached to the same entity, OR, if there's a single occurrence of a particular ambiguous movement on the left, all properties of the same movement attached to the same object on the right are assumed to be the same (or something like that)).", lineNumber);
    }

    return result;
}

function rephraseSynonyms(state, rule) {
    for (var i = 0; i < rule.lhs.length; i++) {
        var cellrow_l = rule.lhs[i];
        var cellrow_r = rule.rhs[i];
        for (var j = 0; j < cellrow_l.length; j++) {
            var cell_l = cellrow_l[j];
            for (var k = 1; k < cell_l.length; k += 2) {
                var name = cell_l[k];
                if (name in state.synonymsDict) {
                    cell_l[k] = state.synonymsDict[cell_l[k]];
                }
            }
            if (rule.rhs.length > 0) {
                var cell_r = cellrow_r[j];
                for (var k = 1; k < cell_r.length; k += 2) {
                    var name = cell_r[k];
                    if (name in state.synonymsDict) {
                        cell_r[k] = state.synonymsDict[cell_r[k]];
                    }
                }
            }
        }
    }
}

function atomizeAggregates(state, rule) {
    for (var i = 0; i < rule.lhs.length; i++) {
        var cellrow = rule.lhs[i];
        for (var j = 0; j < cellrow.length; j++) {
            var cell = cellrow[j];
            atomizeCellAggregates(state, cell, rule.lineNumber);
        }
    }
    for (var i = 0; i < rule.rhs.length; i++) {
        var cellrow = rule.rhs[i];
        for (var j = 0; j < cellrow.length; j++) {
            var cell = cellrow[j];
            atomizeCellAggregates(state, cell, rule.lineNumber);
        }
    }
}

function atomizeCellAggregates(state, cell, lineNumber) {
    for (var i = 0; i < cell.length; i += 2) {
        var dir = cell[i];
        var c = cell[i + 1];
        if (c in state.aggregatesDict) {
            if (dir === 'no') {
                logError("You cannot use 'no' to exclude the aggregate object " + c.toUpperCase() + " (defined using 'AND'), only regular objects, or properties (objects defined using 'OR').  If you want to do this, you'll have to write it out yourself the long way.", lineNumber);
            }
            var equivs = state.aggregatesDict[c];
            cell[i + 1] = equivs[0];
            for (var j = 1; j < equivs.length; j++) {
                cell.push(cell[i]); //push the direction
                cell.push(equivs[j]);
            }
        }
    }
}

function convertRelativeDirsToAbsolute(rule) {
    var forward = rule.direction;
    for (var i = 0; i < rule.lhs.length; i++) {
        var cellrow = rule.lhs[i];
        for (var j = 0; j < cellrow.length; j++) {
            var cell = cellrow[j];
            absolutifyRuleCell(forward, cell);
        }
    }
    for (var i = 0; i < rule.rhs.length; i++) {
        var cellrow = rule.rhs[i];
        for (var j = 0; j < cellrow.length; j++) {
            var cell = cellrow[j];
            absolutifyRuleCell(forward, cell);
        }
    }
}

var relativeDirs = ['^', 'v', '<', '>', 'parallel', 'perpendicular']; //used to index the following
var relativeDict = {
    'right': ['up', 'down', 'left', 'right', 'horizontal', 'vertical'],
    'up': ['left', 'right', 'down', 'up', 'vertical', 'horizontal'],
    'down': ['right', 'left', 'up', 'down', 'vertical', 'horizontal'],
    'left': ['down', 'up', 'right', 'left', 'horizontal', 'vertical']
};

function absolutifyRuleCell(forward, cell) {
    for (var i = 0; i < cell.length; i += 2) {
        var c = cell[i];
        var index = relativeDirs.indexOf(c);
        if (index >= 0) {
            cell[i] = relativeDict[forward][index];
        }
    }
}
/*
	direction mask
	UP parseInt('%1', 2);
	DOWN parseInt('0', 2);
	LEFT parseInt('0', 2);
	RIGHT parseInt('0', 2);
	?  parseInt('', 2);

*/

var dirMasks = {
    'up': parseInt('00001', 2),
    'down': parseInt('00010', 2),
    'left': parseInt('00100', 2),
    'right': parseInt('01000', 2),
    'moving': parseInt('01111', 2),
    'no': parseInt('00011', 2),
    'randomdir': parseInt('00101', 2),
    'random': parseInt('10010', 2),
    'action': parseInt('10000', 2),
    '': parseInt('00000', 2)
};

function rulesToMask(state) {
    /*

    */
    var layerCount = state.collisionLayers.length;
    var layerTemplate = [];
    for (var i = 0; i < layerCount; i++) {
        layerTemplate.push(null);
    }

    for (var i = 0; i < state.rules.length; i++) {
        var rule = state.rules[i];
        for (var j = 0; j < rule.lhs.length; j++) {
            var cellrow_l = rule.lhs[j];
            var cellrow_r = rule.rhs[j];
            for (var k = 0; k < cellrow_l.length; k++) {
                var cell_l = cellrow_l[k];
                var layersUsed_l = layerTemplate.concat([]);
                var objectsPresent = new BitVec(STRIDE_OBJ);
                var objectsMissing = new BitVec(STRIDE_OBJ);
                var anyObjectsPresent = [];
                var movementsPresent = new BitVec(STRIDE_MOV);
                var movementsMissing = new BitVec(STRIDE_MOV);

                var objectlayers_l = new BitVec(STRIDE_MOV);
                for (var l = 0; l < cell_l.length; l += 2) {
                    var object_dir = cell_l[l];
                    if (object_dir === '...') {
                        objectsPresent = ellipsisPattern;
                        if (cell_l.length !== 2) {
                            logError("You can't have anything in with an ellipsis. Sorry.", rule.lineNumber);
                        } else if ((k === 0) || (k === cellrow_l.length - 1)) {
                            logError("There's no point in putting an ellipsis at the very start or the end of a rule", rule.lineNumber);
                        } else if (rule.rhs.length > 0) {
                            var rhscell = cellrow_r[k];
                            if (rhscell.length !== 2 || rhscell[0] !== '...') {
                                logError("An ellipsis on the left must be matched by one in the corresponding place on the right.", rule.lineNumber);
                            }
                        }
                        break;
                    } else if (object_dir === 'random') {
                        logError("'random' cannot be matched on the left-hand side, it can only appear on the right", rule.lineNumber);
                        continue;
                    }

                    var object_name = cell_l[l + 1];
                    var object = state.objects[object_name];
                    var objectMask = state.objectMasks[object_name];
                    if (object) {
                        var layerIndex = object.layer | 0;
                    } else {
                        var layerIndex = state.propertiesSingleLayer[object_name];
                    }

                    if (typeof(layerIndex) === "undefined") {
                        logError("Oops!  " + object_name.toUpperCase() + " not assigned to a layer.", rule.lineNumber);
                    }

                    if (object_dir === 'no') {
                        objectsMissing.ior(objectMask);
                    } else {
                        var existingname = layersUsed_l[layerIndex];
                        if (existingname !== null) {
                            rule.discard = [object_name.toUpperCase(), existingname.toUpperCase()];
                        }

                        layersUsed_l[layerIndex] = object_name;

                        if (object) {
                            objectsPresent.ior(objectMask);
                            objectlayers_l.ishiftor(0x1f, 5 * layerIndex);
                        } else {
                            anyObjectsPresent.push(objectMask);
                        }

                        if (object_dir === 'stationary') {
                            movementsMissing.ishiftor(0x1f, 5 * layerIndex);
                        } else {
                            movementsPresent.ishiftor(dirMasks[object_dir], 5 * layerIndex);
                        }
                    }
                }

                if (rule.rhs.length > 0) {
                    var rhscell = cellrow_r[k];
                    var lhscell = cellrow_l[k];
                    if (rhscell[0] === '...' && lhscell[0] !== '...') {
                        logError("An ellipsis on the right must be matched by one in the corresponding place on the left.", rule.lineNumber);
                    }
                    for (var l = 0; l < rhscell.length; l += 2) {
                        var content = rhscell[l];
                        if (content === '...') {
                            if (rhscell.length !== 2) {
                                logError("You can't have anything in with an ellipsis. Sorry.", rule.lineNumber);
                            }
                        }
                    }
                }

                if (objectsPresent === ellipsisPattern) {
                    cellrow_l[k] = ellipsisPattern;
                    continue;
                } else {
                    cellrow_l[k] = new CellPattern([objectsPresent, objectsMissing, anyObjectsPresent, movementsPresent, movementsMissing, null]);
                }

                if (rule.rhs.length === 0) {
                    continue;
                }

                var cell_r = cellrow_r[k];
                var layersUsed_r = layerTemplate.concat([]);
                var layersUsedRand_r = layerTemplate.concat([]);

                var objectsClear = new BitVec(STRIDE_OBJ);
                var objectsSet = new BitVec(STRIDE_OBJ);
                var movementsClear = new BitVec(STRIDE_MOV);
                var movementsSet = new BitVec(STRIDE_MOV);

                var objectlayers_r = new BitVec(STRIDE_MOV);
                var randomMask_r = new BitVec(STRIDE_OBJ);
                var postMovementsLayerMask_r = new BitVec(STRIDE_MOV);
                var randomDirMask_r = new BitVec(STRIDE_MOV);
                for (var l = 0; l < cell_r.length; l += 2) {
                    var object_dir = cell_r[l];
                    var object_name = cell_r[l + 1];

                    if (object_dir === '...') {
                        //logError("spooky ellipsis found! (should never hit this)");
                        break;
                    } else if (object_dir === 'random') {
                        if (object_name in state.objectMasks) {
                            var mask = state.objectMasks[object_name];
                            randomMask_r.ior(mask);
                            var values;
                            if (state.propertiesDict.hasOwnProperty(object_name)) {
                                values = state.propertiesDict[object_name];
                            } else {
                                values = [object_name];
                            }
                            for (var m = 0; m < values.length; m++) {
                                var subobject = values[m];
                                var layerIndex = state.objects[subobject].layer | 0;
                                var existingname = layersUsed_r[layerIndex];
                                if (existingname !== null) {
                                    var o1 = subobject.toUpperCase();
                                    var o2 = existingname.toUpperCase();
                                    if (o1 !== o2) {
                                        logWarning("This rule may try to spawn a " + o1 + " with random, but also requires a " + o2 + " be here, which is on the same layer - they shouldn't be able to coexist!", rule.lineNumber);
                                    }
                                }

                                layersUsedRand_r[layerIndex] = subobject;
                            }

                        } else {
                            logError('You want to spawn a random "' + object_name.toUpperCase() + '", but I don\'t know how to do that', rule.lineNumber);
                        }
                        continue;
                    }

                    var object = state.objects[object_name];
                    var objectMask = state.objectMasks[object_name];
                    if (object) {
                        var layerIndex = object.layer | 0;
                    } else {
                        var layerIndex = state.propertiesSingleLayer[object_name];
                    }


                    if (object_dir == 'no') {
                        objectsClear.ior(objectMask);
                    } else {
                        var existingname = layersUsed_r[layerIndex];
                        if (existingname === null) {
                            existingname = layersUsedRand_r[layerIndex];
                        }

                        if (existingname !== null) {
                            if (rule.hasOwnProperty('discard')) {

                            } else {
                                logError('Rule matches object types that can\'t overlap: "' + object_name.toUpperCase() + '" and "' + existingname.toUpperCase() + '".', rule.lineNumber);
                            }
                        }

                        layersUsed_r[layerIndex] = object_name;

                        if (object_dir.length > 0) {
                            postMovementsLayerMask_r.ishiftor(0x1f, 5 * layerIndex);
                        }

                        var layerMask = state.layerMasks[layerIndex];

                        if (object) {
                            objectsSet.ibitset(object.id);
                            objectsClear.ior(layerMask);
                            objectlayers_r.ishiftor(0x1f, 5 * layerIndex);
                        } else {
                            // shouldn't need to do anything here...
                        }
                        if (object_dir === 'stationary') {
                            movementsClear.ishiftor(0x1f, 5 * layerIndex);
                        }
                        if (object_dir === 'randomdir') {
                            randomDirMask_r.ishiftor(dirMasks[object_dir], 5 * layerIndex);
                        } else {
                            movementsSet.ishiftor(dirMasks[object_dir], 5 * layerIndex);
                        };
                    }
                }

                if (!(objectsPresent.bitsSetInArray(objectsSet.data))) {
                    objectsClear.ior(objectsPresent); // clear out old objects
                }
                if (!(movementsPresent.bitsSetInArray(movementsSet.data))) {
                    movementsClear.ior(movementsPresent); // ... and movements
                }

                for (var l = 0; l < layerCount; l++) {
                    if (layersUsed_l[l] !== null && layersUsed_r[l] === null) {
                        // a layer matched on the lhs, but not on the rhs
                        objectsClear.ior(state.layerMasks[l]);
                        postMovementsLayerMask_r.ishiftor(0x1f, 5 * l);
                    }
                }

                objectlayers_l.iclear(objectlayers_r);

                postMovementsLayerMask_r.ior(objectlayers_l);
                if (objectsClear || objectsSet || movementsClear || movementsSet || postMovementsLayerMask_r) {
                    // only set a replacement if something would change
                    cellrow_l[k].replacement = new CellReplacement([objectsClear, objectsSet, movementsClear, movementsSet, postMovementsLayerMask_r, randomMask_r, randomDirMask_r]);
                }
            }
        }
    }
}

function cellRowMasks(rule) {
    var ruleMasks = [];
    var lhs = rule[1];
    for (var i = 0; i < lhs.length; i++) {
        var cellRow = lhs[i];
        var rowMask = new BitVec(STRIDE_OBJ);
        for (var j = 0; j < cellRow.length; j++) {
            if (cellRow[j] === ellipsisPattern)
                continue;
            rowMask.ior(cellRow[j].objectsPresent);
        }
        ruleMasks.push(rowMask);
    }
    return ruleMasks;
}

function collapseRules(groups) {
    for (var gn = 0; gn < groups.length; gn++) {
        var rules = groups[gn];
        for (var i = 0; i < rules.length; i++) {
            var oldrule = rules[i];
            var newrule = [0, [], oldrule.rhs.length > 0, oldrule.lineNumber /*ellipses,group number,rigid,commands,randomrule,[cellrowmasks]*/ ];
            var ellipses = [];
            for (var j = 0; j < oldrule.lhs.length; j++) {
                ellipses.push(false);
            }

            newrule[0] = dirMasks[oldrule.direction];
            for (var j = 0; j < oldrule.lhs.length; j++) {
                var cellrow_l = oldrule.lhs[j];
                for (var k = 0; k < cellrow_l.length; k++) {
                    if (cellrow_l[k] === ellipsisPattern) {
                        if (ellipses[j]) {
                            logError("You can't use two ellipses in a single cell match pattern.  If you really want to, please implement it yourself and send me a patch :) ", oldrule.lineNumber);
                        }
                        ellipses[j] = true;
                    }
                }
                newrule[1][j] = cellrow_l;
            }
            newrule.push(ellipses);
            newrule.push(oldrule.groupNumber);
            newrule.push(oldrule.rigid);
            newrule.push(oldrule.commands);
            newrule.push(oldrule.randomRule);
            newrule.push(cellRowMasks(newrule));
            rules[i] = new Rule(newrule);
        }
    }
    matchCache = {}; // clear match cache so we don't slowly leak memory
}

function ruleGroupRandomnessTest(ruleGroup) {
    if (ruleGroup.length === 0)
        return;
    var firstLineNumber = ruleGroup[0].lineNumber;
    for (var i = 1; i < ruleGroup.length; i++) {
        var rule = ruleGroup[i];
        if (rule.lineNumber === firstLineNumber) // random [A | B] gets turned into 4 rules, skip
            continue;
        if (rule.randomRule) {
            logError("A rule-group can only be marked random by the first rule", rule.lineNumber);
        }
    }
}

function ruleGroupDiscardOverlappingTest(ruleGroup) {
    if (ruleGroup.length === 0)
        return;
    var firstLineNumber = ruleGroup[0].lineNumber;
    var allbad = true;
    var example = null;
    for (var i = 0; i < ruleGroup.length; i++) {
        var rule = ruleGroup[i];
        if (rule.hasOwnProperty('discard')) {
            example = rule['discard'];
            ruleGroup.splice(i, 1);
            i--;
        } else {
            allbad = false;
        }
    }
    if (allbad) {
        logError(example[0] + ' and ' + example[1] + ' can never overlap, but this rule requires that to happen.', firstLineNumber);
    }
}

function arrangeRulesByGroupNumber(state) {
    var aggregates = {};
    var aggregates_late = {};
    for (var i = 0; i < state.rules.length; i++) {
        var rule = state.rules[i];
        var targetArray = aggregates;
        if (rule.late) {
            targetArray = aggregates_late;
        }

        if (targetArray[rule.groupNumber] == undefined) {
            targetArray[rule.groupNumber] = [];
        }
        targetArray[rule.groupNumber].push(rule);
    }

    var result = [];
    for (var groupNumber in aggregates) {
        if (aggregates.hasOwnProperty(groupNumber)) {
            var ruleGroup = aggregates[groupNumber];
            ruleGroupRandomnessTest(ruleGroup);
            ruleGroupDiscardOverlappingTest(ruleGroup);
            if (ruleGroup.length > 0) {
                result.push(ruleGroup);
            }
        }
    }
    var result_late = [];
    for (var groupNumber in aggregates_late) {
        if (aggregates_late.hasOwnProperty(groupNumber)) {
            var ruleGroup = aggregates_late[groupNumber];
            ruleGroupRandomnessTest(ruleGroup);
            ruleGroupDiscardOverlappingTest(ruleGroup);
            if (ruleGroup.length > 0) {
                result_late.push(ruleGroup);
            }
        }
    }
    state.rules = result;

    //check that there're no late movements with direction requirements on the lhs
    state.lateRules = result_late;
}


function checkNoLateRulesHaveMoves(state) {
    for (var ruleGroupIndex = 0; ruleGroupIndex < state.lateRules.length; ruleGroupIndex++) {
        var lateGroup = state.lateRules[ruleGroupIndex];
        for (var ruleIndex = 0; ruleIndex < lateGroup.length; ruleIndex++) {
            var rule = lateGroup[ruleIndex];
            for (var cellRowIndex = 0; cellRowIndex < rule.patterns.length; cellRowIndex++) {
                var cellRow_l = rule.patterns[cellRowIndex];
                for (var cellIndex = 0; cellIndex < cellRow_l.length; cellIndex++) {
                    var cellPattern = cellRow_l[cellIndex];
                    if (cellPattern === ellipsisPattern) {
                        continue;
                    }
                    var moveMissing = cellPattern.movementsMissing;
                    var movePresent = cellPattern.movementsPresent;
                    if (!moveMissing.iszero() || !movePresent.iszero()) {
                        logError("Movements cannot appear in late rules.", rule.lineNumber);
                        return;
                    }

                    if (cellPattern.replacement != null) {
                        var movementsClear = cellPattern.replacement.movementsClear;
                        var movementsSet = cellPattern.replacement.movementsSet;

                        if (!movementsClear.iszero() || !movementsSet.iszero()) {
                            logError("Movements cannot appear in late rules.", rule.lineNumber);
                            return;
                        }
                    }
                }
            }
        }
    }
}

function generateRigidGroupList(state) {
    var rigidGroupIndex_to_GroupIndex = [];
    var groupIndex_to_RigidGroupIndex = [];
    var groupNumber_to_GroupIndex = [];
    var groupNumber_to_RigidGroupIndex = [];
    var rigidGroups = [];
    for (var i = 0; i < state.rules.length; i++) {
        var ruleset = state.rules[i];
        var rigidFound = false;
        for (var j = 0; j < ruleset.length; j++) {
            var rule = ruleset[j];
            if (rule.isRigid) {
                rigidFound = true;
            }
        }
        rigidGroups[i] = rigidFound;
        if (rigidFound) {
            var groupNumber = ruleset[0].groupNumber;
            groupNumber_to_GroupIndex[groupNumber] = i;
            var rigid_group_index = rigidGroupIndex_to_GroupIndex.length;
            groupIndex_to_RigidGroupIndex[i] = rigid_group_index;
            groupNumber_to_RigidGroupIndex[groupNumber] = rigid_group_index;
            rigidGroupIndex_to_GroupIndex.push(i);
        }
    }
    if (rigidGroupIndex_to_GroupIndex.length > 30) {
        logError("There can't be more than 30 rigid groups (rule groups containing rigid members).", rules[0][0][3]);
    }

    state.rigidGroups = rigidGroups;
    state.rigidGroupIndex_to_GroupIndex = rigidGroupIndex_to_GroupIndex;
    state.groupNumber_to_RigidGroupIndex = groupNumber_to_RigidGroupIndex;
    state.groupIndex_to_RigidGroupIndex = groupIndex_to_RigidGroupIndex;
}

function getMaskFromName(state, name) {
    var objectMask = new BitVec(STRIDE_OBJ);
    if (name in state.objects) {
        var o = state.objects[name];
        objectMask.ibitset(o.id);
    }

    if (name in state.aggregatesDict) {
        var objectnames = state.aggregatesDict[name];
        for (var i = 0; i < objectnames.length; i++) {
            var n = objectnames[i];
            var o = state.objects[n];
            objectMask.ibitset(o.id);
        }
    }

    if (name in state.propertiesDict) {
        var objectnames = state.propertiesDict[name];
        for (var i = 0; i < objectnames.length; i++) {
            var n = objectnames[i];
            var o = state.objects[n];
            objectMask.ibitset(o.id);
        }
    }

    if (name in state.synonymsDict) {
        var n = state.synonymsDict[name];
        var o = state.objects[n];
        objectMask.ibitset(o.id);
    }

    if (objectMask.iszero()) {
        logErrorNoLine("error, didn't find any object called player, either in the objects section, or the legends section. there must be a player!");
    }
    return objectMask;
}

function generateMasks(state) {
    state.playerMask = getMaskFromName(state, 'player');

    var layerMasks = [];
    var layerCount = state.collisionLayers.length;
    for (var layer = 0; layer < layerCount; layer++) {
        var layerMask = new BitVec(STRIDE_OBJ);
        for (var j = 0; j < state.objectCount; j++) {
            var n = state.idDict[j];
            var o = state.objects[n];
            if (o.layer == layer) {
                layerMask.ibitset(o.id);
            }
        }
        layerMasks.push(layerMask);
    }
    state.layerMasks = layerMasks;

    var objectMask = {};
    for (var n in state.objects) {
        if (state.objects.hasOwnProperty(n)) {
            var o = state.objects[n];
            objectMask[n] = new BitVec(STRIDE_OBJ);
            objectMask[n].ibitset(o.id);
        }
    }

    // Synonyms can depend on properties, and properties can depend on synonyms.
    // Process them in order by combining & sorting by linenumber.

    var synonyms_and_properties = state.legend_synonyms.concat(state.legend_properties);
    synonyms_and_properties.sort(function(a, b) {
        return a.lineNumber - b.lineNumber;
    });

    for (var i = 0; i < synonyms_and_properties.length; i++) {
        var synprop = synonyms_and_properties[i];
        if (synprop.length == 2) {
            // synonym (a = b)
            objectMask[synprop[0]] = objectMask[synprop[1]];
        } else {
            // property (a = b or c)
            var val = new BitVec(STRIDE_OBJ);
            for (var j = 1; j < synprop.length; j++) {
                var n = synprop[j];
                val.ior(objectMask[n]);
            }
            objectMask[synprop[0]] = val;
        }
    }

    //use \n as a delimeter for internal-only objects
    var all_obj = new BitVec(STRIDE_OBJ);
    all_obj.inot();
    objectMask["\nall\n"] = all_obj;

    state.objectMasks = objectMask;
}

function checkObjectsAreLayered(state) {
    for (var n in state.objects) {
        if (state.objects.hasOwnProperty(n)) {
            var found = false;
            for (var i = 0; i < state.collisionLayers.length; i++) {
                var layer = state.collisionLayers[i];
                for (var j = 0; j < layer.length; j++) {
                    if (layer[j] === n) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
            if (found === false) {
                var o = state.objects[n];
                logError('Object "' + n.toUpperCase() + '" has been defined, but not assigned to a layer.', o.lineNumber);
            }
        }
    }
}

function twiddleMetaData(state) {
    var newmetadata = {};
    for (var i = 0; i < state.metadata.length; i += 2) {
        var key = state.metadata[i];
        var val = state.metadata[i + 1];
        newmetadata[key] = val;
    }

    if (newmetadata.flickscreen !== undefined) {
        var val = newmetadata.flickscreen;
        var coords = val.split('x');
        var intcoords = [parseInt(coords[0]), parseInt(coords[1])];
        newmetadata.flickscreen = intcoords;
    }
    if (newmetadata.zoomscreen !== undefined) {
        var val = newmetadata.zoomscreen;
        var coords = val.split('x');
        var intcoords = [parseInt(coords[0]), parseInt(coords[1])];
        newmetadata.zoomscreen = intcoords;
    }

    state.metadata = newmetadata;
}

function processWinConditions(state) {
    //	[-1/0/1 (no,some,all),ob1,ob2] (ob2 is background by default)
    var newconditions = [];
    for (var i = 0; i < state.winconditions.length; i++) {
        var wincondition = state.winconditions[i];
        if (wincondition.length == 0) {
            return;
        }
        var num = 0;
        switch (wincondition[0]) {
            case 'no':
                { num = -1; break; }
            case 'all':
                { num = 1; break; }
        }

        var lineNumber = wincondition[wincondition.length - 1];

        var n1 = wincondition[1];
        var n2;
        if (wincondition.length == 5) {
            n2 = wincondition[3];
        } else {
            n2 = '\nall\n';
        }

        var mask1 = 0;
        var mask2 = 0;
        if (n1 in state.objectMasks) {
            mask1 = state.objectMasks[n1];
        } else {
            logError('unwelcome term "' + n1 + '" found in win condition. Win conditions objects have to be objects or properties (defined using "or", in terms of other properties)', lineNumber);
        }
        if (n2 in state.objectMasks) {
            mask2 = state.objectMasks[n2];
        } else {
            logError('unwelcome term "' + n2 + '" found in win condition. Win conditions objects have to be objects or properties (defined using "or", in terms of other properties)', lineNumber);
        }
        var newcondition = [num, mask1, mask2, lineNumber];
        newconditions.push(newcondition);
    }
    state.winconditions = newconditions;
}

function printCellRow(cellRow) {
    var result = "[ ";
    for (var i = 0; i < cellRow.length; i++) {
        if (i > 0) {
            result += "| ";
        }
        var cell = cellRow[i];
        for (var j = 0; j < cell.length; j += 2) {
            var direction = cell[j];
            var object = cell[j + 1]
            if (direction === "...") {
                result += direction + " ";
            } else {
                result += direction + " " + object + " ";
            }
        }
    }
    result += "] ";
    return result;
}

function cacheRuleStringRep(rule) {
    var result = "(<a onclick=\"jumpToLine('" + rule.lineNumber.toString() + "');\"  href=\"javascript:void(0);\">" + rule.lineNumber + "</a>) " + rule.direction.toString().toUpperCase() + " ";
    if (rule.rigid) {
        result = "RIGID " + result + " ";
    }
    if (rule.randomRule) {
        result = "RANDOM " + result + " ";
    }
    if (rule.late) {
        result = "LATE " + result + " ";
    }
    for (var i = 0; i < rule.lhs.length; i++) {
        var cellRow = rule.lhs[i];
        result = result + printCellRow(cellRow);
    }
    result = result + "-> ";
    for (var i = 0; i < rule.rhs.length; i++) {
        var cellRow = rule.rhs[i];
        result = result + printCellRow(cellRow);
    }
    for (var i = 0; i < rule.commands.length; i++) {
        var command = rule.commands[i];
        if (command.length === 1) {
            result = result + command[0].toString();
        } else {
            result = result + '(' + command[0].toString() + ", " + command[1].toString() + ') ';
        }
    }
    //print commands next
    rule.stringRep = result;
}

function cacheAllRuleNames(state) {

    for (var i = 0; i < state.rules.length; i++) {
        var rule = state.rules[i];
        cacheRuleStringRep(rule);
    }
}

function printRules(state) {
    var output = "";
    var loopIndex = 0;
    var loopEnd = -1;
    var discardcount = 0;
    for (var i = 0; i < state.rules.length; i++) {
        var rule = state.rules[i];
        if (loopIndex < state.loops.length) {
            if (state.loops[loopIndex][0] < rule.lineNumber) {
                output += "STARTLOOP<br>";
                loopIndex++;
                if (loopIndex < state.loops.length) { // don't die with mismatched loops
                    loopEnd = state.loops[loopIndex][0];
                    loopIndex++;
                }
            }
        }
        if (loopEnd !== -1 && loopEnd < rule.lineNumber) {
            output += "ENDLOOP<br>";
            loopEnd = -1;
        }
        if (rule.hasOwnProperty('discard')) {
            discardcount++;
        } else {
            output += rule.stringRep + "<br>";
        }
    }
    if (loopEnd !== -1) { // no more rules after loop end
        output += "ENDLOOP<br>";
    }
    output += "===========<br>";
    output = "<br>Rule Assembly : (" + (state.rules.length - discardcount) + " rules)<br>===========<br>" + output;
    consolePrint(output);
}

function removeDuplicateRules(state) {
    var record = {};
    var newrules = [];
    var lastgroupnumber = -1;
    for (var i = state.rules.length - 1; i >= 0; i--) {
        var r = state.rules[i];
        var groupnumber = r.groupNumber;
        if (groupnumber !== lastgroupnumber) {
            record = {};
        }
        var r_string = r.stringRep;
        if (record.hasOwnProperty(r_string)) {
            state.rules.splice(i, 1);
        } else {
            record[r_string] = true;
        }
        lastgroupnumber = groupnumber;
    }
}

function generateLoopPoints(state) {
    var loopPoint = {};
    var loopPointIndex = 0;
    var outside = true;
    var source = 0;
    var target = 0;
    if (state.loops.length % 2 === 1) {
        logErrorNoLine("have to have matching number of  'startLoop' and 'endLoop' loop points.");
    }

    for (var j = 0; j < state.loops.length; j++) {
        var loop = state.loops[j];
        for (var i = 0; i < state.rules.length; i++) {
            var ruleGroup = state.rules[i];

            var firstRule = ruleGroup[0];
            var lastRule = ruleGroup[ruleGroup.length - 1];

            var firstRuleLine = firstRule.lineNumber;
            var lastRuleLine = lastRule.lineNumber;

            if (outside) {
                if (firstRuleLine >= loop[0]) {
                    target = i;
                    outside = false;
                    if (loop[1] === -1) {
                        logErrorNoLine("Need have to have matching number of  'startLoop' and 'endLoop' loop points.");
                    }
                    break;
                }
            } else {
                if (firstRuleLine >= loop[0]) {
                    source = i - 1;
                    loopPoint[source] = target;
                    outside = true;
                    if (loop[1] === 1) {
                        logErrorNoLine("Need have to have matching number of  'startLoop' and 'endLoop' loop points.");
                    }
                    break;
                }
            }
        }
    }
    if (outside === false) {
        var source = state.rules.length;
        loopPoint[source] = target;
    } else {}
    state.loopPoint = loopPoint;

    loopPoint = {};
    outside = true;
    for (var j = 0; j < state.loops.length; j++) {
        var loop = state.loops[j];
        for (var i = 0; i < state.lateRules.length; i++) {
            var ruleGroup = state.lateRules[i];

            var firstRule = ruleGroup[0];
            var lastRule = ruleGroup[ruleGroup.length - 1];

            var firstRuleLine = firstRule.lineNumber;
            var lastRuleLine = lastRule.lineNumber;

            if (outside) {
                if (firstRuleLine >= loop[0]) {
                    target = i;
                    outside = false;
                    if (loop[1] === -1) {
                        logErrorNoLine("Need have to have matching number of  'startLoop' and 'endLoop' loop points.");
                    }
                    break;
                }
            } else {
                if (firstRuleLine >= loop[0]) {
                    source = i - 1;
                    loopPoint[source] = target;
                    outside = true;
                    if (loop[1] === 1) {
                        logErrorNoLine("Need have to have matching number of  'startLoop' and 'endLoop' loop points.");
                    }
                    break;
                }
            }
        }
    }
    if (outside === false) {
        var source = state.lateRules.length;
        loopPoint[source] = target;
    } else {}
    state.lateLoopPoint = loopPoint;
}

var soundEvents = ["titlescreen", "startgame", "cancel", "endgame", "startlevel", "undo", "restart", "endlevel", "showmessage", "closemessage", "sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10"];
var soundMaskedEvents = ["create", "destroy", "move", "cantmove", "action"];
var soundVerbs = soundEvents.concat(soundMaskedEvents);


function validSeed(seed) {
    return /^\s*\d+\s*$/.exec(seed) !== null;
}


var soundDirectionIndicatorMasks = {
    'up': parseInt('00001', 2),
    'down': parseInt('00010', 2),
    'left': parseInt('00100', 2),
    'right': parseInt('01000', 2),
    'horizontal': parseInt('01100', 2),
    'vertical': parseInt('00011', 2),
    'orthogonal': parseInt('01111', 2),
    '___action____': parseInt('10000', 2)
};

var soundDirectionIndicators = ["up", "down", "left", "right", "horizontal", "vertical", "orthogonal", "___action____"];


function generateSoundData(state) {
    var sfx_Events = {};
    var sfx_CreationMasks = [];
    var sfx_DestructionMasks = [];
    var sfx_MovementMasks = [];
    var sfx_MovementFailureMasks = [];

    for (var i = 0; i < state.sounds.length; i++) {
        var sound = state.sounds[i];
        if (sound.length <= 1) {
            continue;
        }
        var lineNumber = sound[sound.length - 1];

        if (sound.length === 2) {
            logError('incorrect sound declaration.', lineNumber);
            continue;
        }

        if (soundEvents.indexOf(sound[0]) >= 0) {
            if (sound.length > 4) {
                logError("too much stuff to define a sound event.", lineNumber);
            }
            var seed = sound[1];
            if (validSeed(seed)) {
                if (sfx_Events[sound[0]] !== undefined) {
                    logWarning(sound[0].toUpperCase() + " already declared.", lineNumber);
                }
                sfx_Events[sound[0]] = sound[1];
            } else {
                logError("Expecting sfx data, instead found \"" + sound[1] + "\".", lineNumber);
            }
        } else {
            var target = sound[0].trim();
            var verb = sound[1].trim();
            var directions = sound.slice(2, sound.length - 2);
            if (directions.length > 0 && (verb !== 'move' && verb !== 'cantmove')) {
                logError('incorrect sound declaration.', lineNumber);
            }

            if (verb === 'action') {
                verb = 'move';
                directions = ['___action____'];
            }

            if (directions.length == 0) {
                directions = ["orthogonal"];
            }
            var seed = sound[sound.length - 2];

            if (target in state.aggregatesDict) {
                logError('cannot assign sound events to aggregate objects (declared with "and"), only to regular objects, or properties, things defined in terms of "or" ("' + target + '").', lineNumber);
            } else if (target in state.objectMasks) {

            } else {
                logError('Object "' + target + '" not found.', lineNumber);
            }

            var objectMask = state.objectMasks[target];

            var directionMask = 0;
            for (var j = 0; j < directions.length; j++) {
                directions[j] = directions[j].trim();
                var direction = directions[j];
                if (soundDirectionIndicators.indexOf(direction) === -1) {
                    logError('Was expecting a direction, instead found "' + direction + '".', lineNumber);
                } else {
                    var soundDirectionMask = soundDirectionIndicatorMasks[direction];
                    directionMask |= soundDirectionMask;
                }
            }


            var targets = [target];
            var modified = true;
            while (modified) {
                modified = false;
                for (var k = 0; k < targets.length; k++) {
                    var t = targets[k];
                    if (t in state.synonymsDict) {
                        targets[k] = state.synonymsDict[t];
                        modified = true;
                    } else if (t in state.propertiesDict) {
                        modified = true;
                        var props = state.propertiesDict[t];
                        targets.splice(k, 1);
                        k--;
                        for (var l = 0; l < props.length; l++) {
                            targets.push(props[l]);
                        }
                    }
                }
            }

            if (verb === 'move' || verb === 'cantmove') {
                for (var j = 0; j < targets.length; j++) {
                    var targetName = targets[j];
                    var targetDat = state.objects[targetName];
                    var targetLayer = targetDat.layer;
                    var shiftedDirectionMask = new BitVec(STRIDE_MOV);
                    shiftedDirectionMask.ishiftor(directionMask, 5 * targetLayer);

                    var o = {
                        objectMask: objectMask,
                        directionMask: shiftedDirectionMask,
                        seed: seed
                    };

                    if (verb === 'move') {
                        sfx_MovementMasks.push(o);
                    } else {
                        sfx_MovementFailureMasks.push(o);
                    }
                }
            }


            if (!validSeed(seed)) {
                logError("Expecting sfx data, instead found \"" + seed + "\".", lineNumber);
            }

            var targetArray;
            switch (verb) {
                case "create":
                    {
                        var o = {
                            objectMask: objectMask,
                            seed: seed
                        }
                        sfx_CreationMasks.push(o);
                        break;
                    }
                case "destroy":
                    {
                        var o = {
                            objectMask: objectMask,
                            seed: seed
                        }
                        sfx_DestructionMasks.push(o);
                        break;
                    }
            }
        }
    }

    state.sfx_Events = sfx_Events;
    state.sfx_CreationMasks = sfx_CreationMasks;
    state.sfx_DestructionMasks = sfx_DestructionMasks;
    state.sfx_MovementMasks = sfx_MovementMasks;
    state.sfx_MovementFailureMasks = sfx_MovementFailureMasks;
}


function formatHomePage(state) {
    if ('background_color' in state.metadata) {
        state.bgcolor = colorToHex(colorPalette, state.metadata.background_color);
    } else {
        state.bgcolor = "#000000";
    }
    if ('text_color' in state.metadata) {
        state.fgcolor = colorToHex(colorPalette, state.metadata.text_color);
    } else {
        state.fgcolor = "#FFFFFF";
    }

    if (isColor(state.fgcolor) === false) {
        logError("text_color in incorrect format - found " + state.fgcolor + ", but I expect a color name (like 'pink') or hex-formatted color (like '#1412FA').  Defaulting to white.")
        state.fgcolor = "#FFFFFF";
    }
    if (isColor(state.bgcolor) === false) {
        logError("background_color in incorrect format - found " + state.bgcolor + ", but I expect a color name (like 'pink') or hex-formatted color (like '#1412FA').  Defaulting to black.")
        state.bgcolor = "#000000";
    }

    if (canSetHTMLColors) {

        if ('background_color' in state.metadata) {
            document.body.style.backgroundColor = state.bgcolor;
        }

        if ('text_color' in state.metadata) {
            var separator = document.getElementById("separator");
            if (separator != null) {
                separator.style.color = state.fgcolor;
            }

            var h1Elements = document.getElementsByTagName("a");
            for (var i = 0; i < h1Elements.length; i++) {
                h1Elements[i].style.color = state.fgcolor;
            }

            var h1Elements = document.getElementsByTagName("h1");
            for (var i = 0; i < h1Elements.length; i++) {
                h1Elements[i].style.color = state.fgcolor;
            }
        }
    }

    if ('homepage' in state.metadata) {
        var url = state.metadata['homepage'];
        url = url.replace("http://", "");
        url = url.replace("https://", "");
        state.metadata['homepage'] = url;
    }
}

var MAX_ERRORS = 5;

function loadFile(str) {
    var processor = new codeMirrorFn();
    var state = processor.startState();

    var lines = str.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        state.lineNumber = i + 1;
        var ss = new CodeMirror.StringStream(line, 4);
        do {
            processor.token(ss, state);

            if (errorCount > MAX_ERRORS) {
                consolePrint("too many errors, aborting compilation");
                return;
            }
        }
        while (ss.eol() === false);
    }

    delete state.lineNumber;

    generateExtraMembers(state);
    generateMasks(state);
    levelsToArray(state);
    rulesToArray(state);

    cacheAllRuleNames(state);

    removeDuplicateRules(state);

    rulesToMask(state);


    if (debugMode) {
        printRules(state);
    }

    arrangeRulesByGroupNumber(state);
    collapseRules(state.rules);
    collapseRules(state.lateRules);

    checkNoLateRulesHaveMoves(state);

    generateRigidGroupList(state);

    processWinConditions(state);
    checkObjectsAreLayered(state);

    twiddleMetaData(state);

    generateLoopPoints(state);

    generateSoundData(state);

    formatHomePage(state);

    delete state.commentLevel;
    delete state.names;
    delete state.abbrevNames;
    delete state.objects_candname;
    delete state.objects_section;
    delete state.objects_spritematrix;
    delete state.section;
    delete state.subsection;
    delete state.tokenIndex;
    delete state.visitedSections;
    delete state.loops;
    /*
    var lines = stripComments(str);
    window.console.log(lines);
    var sections = generateSections(lines);
    window.console.log(sections);
    var sss = generateSemiStructuredSections(sections);*/
    return state;
}

var ifrm;

function compile(command, text, randomseed) {
    matchCache = {};
    forceRegenImages = true;
    if (command === undefined) {
        command = ["restart"];
    }
    if (randomseed === undefined) {
        randomseed = null;
    }
    lastDownTarget = canvas;

    if (text === undefined) {
        var code = window.form1.code;

        var editor = code.editorreference;

        text = editor.getValue() + "\n";
    }
    if (canDump === true) {
        compiledText = text;
    }

    errorCount = 0;
    compiling = true;
    errorStrings = [];
    consolePrint('=================================');
    try {
        var state = loadFile(text);
        //		consolePrint(JSON.stringify(state));
    } finally {
        compiling = false;
    }

    if (state && state.levels && state.levels.length === 0) {
        logError('No levels found.  Add some levels!', undefined, true);
    }

    if (errorCount > MAX_ERRORS) {
        return;
    }
    /*catch(err)
    {
    	if (anyErrors===false) {
    		logErrorNoLine(err.toString());
    	}
    }*/

    if (errorCount > 0) {
        consoleError('<span class="systemMessage">Errors detected during compilation; the game may not work correctly.</span>');
    } else {
        var ruleCount = 0;
        for (var i = 0; i < state.rules.length; i++) {
            ruleCount += state.rules[i].length;
        }
        for (var i = 0; i < state.lateRules.length; i++) {
            ruleCount += state.lateRules[i].length;
        }
        if (command[0] == "restart") {
            consolePrint('<span class="systemMessage">Successful Compilation, generated ' + ruleCount + ' instructions.</span>');
        } else {
            consolePrint('<span class="systemMessage">Successful live recompilation, generated ' + ruleCount + ' instructions.</span>');

        }
    }
    setGameState(state, command, randomseed);

    clearInputHistory();

    consoleCacheDump();

    return state;
}

window["compile"] = compile;


function qualifyURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.href;
}
//////////File Source js/soundbar.js

var audio;


function newSound(instrument) {
	var seed = instrument + 100 * ((Math.random() * 1000000) | 1);
	//document.getElementById('sounddat').value = seed;

	var frame = parent.frames[4];
	var code = document.getElementById('consoletextarea');
	consolePrint(generatorNames[instrument] + ' : ' + '<span class="cm-SOUND" onclick="playSound(' + seed.toString() + ')">' + seed.toString() + '</span>',true);
	var params = generateFromSeed(seed);
	params.sound_vol = SOUND_VOL;
	params.sample_rate = SAMPLE_RATE;
	params.bit_depth = BIT_DEPTH;
	var sound = SoundEffect.generate(params);
	sound.play();
}

function buttonPress() {
	var generatortype = 3;
	var seed = document.getElementById('sounddat').value;
	var params = generateFromSeed(seed);
	params.sound_vol = SOUND_VOL;
	params.sample_rate = SAMPLE_RATE;
	params.bit_depth = BIT_DEPTH;
	var sound = SoundEffect.generate(params);
	sound.play();
}

//////////File Source js/toolbar.js
// The client ID of a GitHub OAuth app registered at https://github.com/settings/developers.
// The “callback URL” of that app points to https://www.puzzlescript.net/auth.html.
// If you’re running from another host name, sharing might not work.


function runClick() {
	clearConsole();
	compile(["restart"]);
}

function dateToReadable(title,time) {
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	var date1 = time.getDate();
	var hour = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();

	if (month < 10) {
    	month = "0"+month;
	}
	if (date1 < 10) {
		date1 = "0"+date1;
	}
	if (hour < 10) {
		hour = "0"+hour;
	}
	if (minutes < 10) {
		minutes = "0"+minutes;
	}
	if (seconds < 10) {
		seconds = "0"+seconds;
	}

	var result = hour+":"+minutes+" "+year + "-" + month+"-"+date1+" "+title;
	return result;
}

function saveClick() {
	var title = "Untitled";
	if (state.metadata.title!==undefined) {
		title=state.metadata.title;
	}
	var text=editor.getValue();
	var saveDat = {
		title:title,
		text:text,
		date: new Date()
	}

	var curSaveArray = [];
	if (localStorage['saves']===undefined) {

	} else {
		var curSaveArray = JSON.parse(localStorage.saves);
	}

	if (curSaveArray.length>19) {
		curSaveArray.splice(0,1);
	}
	curSaveArray.push(saveDat);
	var savesDatStr = JSON.stringify(curSaveArray);
	localStorage['saves']=savesDatStr;

	repopulateSaveDropdown(curSaveArray);

	var loadDropdown = document.getElementById('loadDropDown');
	loadDropdown.selectedIndex=0;

	setEditorClean();

	consolePrint("saved file to local storage",true);

	if (window.location.href.indexOf("?hack")>=0){
		var currURL= window.location.href; 
		var afterDomain= currURL.substring(currURL.lastIndexOf('/') + 1);
		var beforeQueryString= afterDomain.split("?")[0];  
 
		window.history.pushState({}, document.title, "./" +beforeQueryString);
	}
	//clear parameters from url bar if any present

}

window.addEventListener( "pageshow", function ( event ) {
	var historyTraversal = event.persisted || 
						   ( typeof window.performance != "undefined" && 
								window.performance.navigation.type === 2 );
	if ( historyTraversal ) {
	  // Handle page restore.
	  window.location.reload();
	}
  });

window.addEventListener("popstate", function(event){
	console.log("hey");
	location.reload();
});

function loadDropDownChange() {

	if(!canExit()) {
 		this.selectedIndex = 0;
 		return;
 	}

	var saveString = localStorage['saves'];
	if (saveString===undefined) {
			consolePrint("Eek, trying to load a file, but there's no local storage found. Eek!",true);
	} 

	saves = JSON.parse(saveString);
	
	for (var i=0;i<saves.length;i++) {
		var sd = saves[i];
	    var key = dateToReadable(sd.title,new Date(sd.date));
	    if (key==this.value) {

	    	var saveText = sd.text;
			editor.setValue(saveText);
			setEditorClean();
			var loadDropdown = document.getElementById('loadDropDown');
			loadDropdown.selectedIndex=0;
			unloadGame();
			compile(["restart"]);
			return;
	    }
	}		

	consolePrint("Eek, trying to load a save, but couldn't find it. :(",true);
}


function repopulateSaveDropdown(saves) {
	var loadDropdown = document.getElementById('loadDropDown');
	loadDropdown.options.length = 0;

	if (saves===undefined) {
		try {
			if (localStorage['saves']===undefined) {
				return;
			} else {
				saves = JSON.parse(localStorage["saves"]);
			}
		} catch (ex) {
			return;
		}
	}

    var optn = document.createElement("OPTION");
    optn.text = "Load";
    optn.value = "Load";
    loadDropdown.options.add(optn);  

	for (var i=saves.length-1;i>=0;i--) {			
		var sd = saves[i];
	    var optn = document.createElement("OPTION");
	    var key = dateToReadable(sd.title,new Date(sd.date));
	    optn.text = key;
	    optn.value = key;
	    loadDropdown.options.add(optn);  
	}
	loadDropdown.selectedIndex=0;
}

// repopulateSaveDropdown();
// var loadDropdown = document.getElementById('loadDropDown');
// loadDropdown.selectedIndex=0;

function levelEditorClick_Fn() {
	if (textMode || state.levels.length===0) {
		compile(["loadLevel",0]);
		levelEditorOpened=true;
    	canvasResize();
	} else {
		levelEditorOpened=!levelEditorOpened;
    	canvasResize();
    }
    lastDownTarget=canvas;	
}

OAUTH_CLIENT_ID = "211570277eb588cddf44";

function getAuthURL(){
	var randomState = window.btoa(Array.prototype.map.call(
		window.crypto.getRandomValues(new Uint8Array(24)),
		function(x) { return String.fromCharCode(x); }).join(""));

	var authUrl = "https://github.com/login/oauth/authorize"
		+ "?client_id=" + OAUTH_CLIENT_ID
		+ "&scope=gist"
		+ "&state=" + randomState
		+ "&allow_signup=true";

	return authUrl;
}

function printUnauthorized(){

	var authUrl = getAuthURL();
	consolePrint(
			"<br>" +
			"PuzzleScript needs permission to share games through GitHub:<br>" +
			"<ul>" +
			"<li><a target=\"_blank\" href=\"" + authUrl + "\">Give PuzzleScript permission</a></li>" +
			"</ul>",true);
}

function shareClick() {
	var oauthAccessToken = window.localStorage.getItem("oauth_access_token");
	if (typeof oauthAccessToken !== "string") {
		// Generates 32 letters of random data, like "liVsr/e+luK9tC02fUob75zEKaL4VpQn".
		printUnauthorized();
		return;
	}

	consolePrint("<br>Sending code to github...",true)
	var title = "Untitled PuzzleScript Script";
	if (state.metadata.title!==undefined) {
		title=state.metadata.title + " (PuzzleScript Script)";
	}
	
	compile(["rebuild"]);


	var source=editor.getValue();

	var gistToCreate = {
		"description" : title,
		"public" : true,
		"files": {
			"readme.txt" : {
				"content": "Play this game by pasting the script in http://www.puzzlescript.net/editor.html"
			},
			"script.txt" : {
				"content": source
			}
		}
	};

	var githubURL = 'https://api.github.com/gists';
	var githubHTTPClient = new XMLHttpRequest();
	githubHTTPClient.open('POST', githubURL);
	githubHTTPClient.onreadystatechange = function() {		
		if(githubHTTPClient.readyState!=4) {
			return;
		}		
		var result = JSON.parse(githubHTTPClient.responseText);
		if (githubHTTPClient.status===403) {
			consoleError(result.message);
		} else if (githubHTTPClient.status!==200&&githubHTTPClient.status!==201) {
			if (githubHTTPClient.statusText==="Unauthorized"){
				consoleError("Authorization check failed.  You have to log back into GitHub (or give it permission again or something).");
				window.localStorage.removeItem("oauth_access_token");
			} else {
				consoleError("HTTP Error "+ githubHTTPClient.status + ' - ' + githubHTTPClient.statusText);
				consoleError("Try giving puzzlescript permission again, that might fix things...");
			}

			printUnauthorized();
		} else {
			var id = result.id;
			var url = "play.html?p="+id;
			url=qualifyURL(url);

			var editurl = "editor.html?hack="+id;
			editurl=qualifyURL(editurl);
			var sourceCodeLink = "Link to source code:<br><a target=\"_blank\"  href=\""+editurl+"\">"+editurl+"</a>";


			consolePrint('GitHub (<a onclick="githubLogOut();"  href="javascript:void(0);">log out</a>) submission successful.<br>',true);

			consolePrint('<br>'+sourceCodeLink,true);


			if (errorCount>0) {
				consolePrint("<br>Cannot link directly to playable game, because there are compiler errors.",true);
			} else {
				consolePrint("<br>The game can now be played at this url:<br><a target=\"_blank\" href=\""+url+"\">"+url+"</a>",true);
			} 

		}
	}
	githubHTTPClient.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	githubHTTPClient.setRequestHeader("Authorization","token "+oauthAccessToken);
	var stringifiedGist = JSON.stringify(gistToCreate);
	githubHTTPClient.send(stringifiedGist);
    lastDownTarget=canvas;	
}

function githubLogOut(){
	window.localStorage.removeItem("oauth_access_token");

	var authUrl = getAuthURL();
	consolePrint(
		"<br>Logged out of Github.<br>" +
		"<ul>" +
		"<li><a target=\"_blank\" href=\"" + authUrl + "\">Give PuzzleScript permission</a></li>" +
		"</ul>"
				,true);
}

function rebuildClick() {
	clearConsole();
	compile(["rebuild"]);
}

function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

function exportClick() {
	var sourceCode = editor.getValue();

	compile("restart");

	var sourceString = JSON.stringify(sourceCode);
	
	buildStandalone(sourceString);
}




//////////File Source js/layout.js
var soundbarwidth = 100;
// var lowerbarheight = document.getElementById("soundbar").clientHeight;
// var upperbarheight = document.getElementById("uppertoolbar").clientHeight;
var winwidth = window.innerWidth;
var winheight = window.innerHeight;
// var verticaldragbarWidth = document.getElementById("verticaldragbar").clientWidth;
// var horizontaldragbarHeight = document.getElementById("horizontaldragbar").clientHeight;
var minimumDimension = 100;

function resize_widths(verticaldragbarX){
	document.getElementById("leftpanel").style.width = verticaldragbarX + "px";
	document.getElementById("righttophalf").style.left = verticaldragbarX + verticaldragbarWidth + "px";
	document.getElementById("rightbottomhalf").style.left = verticaldragbarX + verticaldragbarWidth + "px";
	document.getElementById("horizontaldragbar").style.left = verticaldragbarX + verticaldragbarWidth + "px";
	document.getElementById("verticaldragbar").style.left = verticaldragbarX + "px";
	canvasResize();
}

function resize_heights(horizontaldragbarY){
	document.getElementById("leftpanel").style.height = (window.innerHeight - upperbarheight) + "px";
	document.getElementById("verticaldragbar").style.height = (window.innerHeight - upperbarheight) + "px";
	
	document.getElementById("righttophalf").style.height = horizontaldragbarY - upperbarheight + "px";
	document.getElementById("rightbottomhalf").style.top = horizontaldragbarY + horizontaldragbarHeight + "px";
	document.getElementById("horizontaldragbar").style.top = horizontaldragbarY + "px";
	canvasResize();
}

function resize_all(e){
	smallmovelimit = 100;
	
	hdiff = window.innerWidth - winwidth;
	verticaldragbarX = parseInt(document.getElementById("verticaldragbar").style.left.replace("px",""));
	
	if(hdiff > -smallmovelimit && hdiff < smallmovelimit){
		verticaldragbarX += hdiff;
	} else {
		verticaldragbarX *= window.innerWidth/winwidth;
	};
	
	if ((verticaldragbarX <= minimumDimension)){
		verticaldragbarX = minimumDimension;
	} else if ((window.innerWidth - verticaldragbarX) < soundbarwidth){
		verticaldragbarX = window.innerWidth - soundbarwidth;
	};
	resize_widths(verticaldragbarX);
	
	
	
	horizontaldragbarY = parseInt(document.getElementById("horizontaldragbar").style.top.replace("px",""));
	vdiff = window.innerHeight - winheight;
	
	if(vdiff > -smallmovelimit && vdiff < smallmovelimit){
		horizontaldragbarY += vdiff;
	} else {
		horizontaldragbarY *= window.innerHeight/winheight;
	};
	
	if ((horizontaldragbarY <= upperbarheight + minimumDimension)){
		horizontaldragbarY = upperbarheight + minimumDimension;
	} else if ((window.innerHeight - horizontaldragbarY) < (lowerbarheight + minimumDimension)){
		horizontaldragbarY = window.innerHeight - (lowerbarheight + minimumDimension + 5);
	};
	resize_heights(horizontaldragbarY);
	
	winwidth = window.innerWidth;
	winheight = window.innerHeight;
};

function verticalDragbarMouseDown(e) {
	e.preventDefault();
	document.body.style.cursor = "col-resize";
	window.addEventListener("mousemove", verticalDragbarMouseMove, false);
	window.addEventListener("mouseup", verticalDragbarMouseUp, false);
};

function verticalDragbarMouseMove(e) {
	if (e.pageX <= minimumDimension){
		resize_widths(minimumDimension);
	} else if ((window.innerWidth - e.pageX) > soundbarwidth){
		resize_widths(e.pageX - 1);
	} else {
		resize_widths(window.innerWidth - soundbarwidth);
	};
};

function verticalDragbarMouseUp(e) {
	document.body.style.cursor = "";
	window.removeEventListener("mousemove", verticalDragbarMouseMove, false);
};

function horizontalDragbarMouseDown(e) {
	e.preventDefault();
	document.body.style.cursor = "row-resize";
	window.addEventListener("mousemove", horizontalDragbarMouseMove, false);
	window.addEventListener("mouseup", horizontalDragbarMouseUp, false);
};

function horizontalDragbarMouseMove(e) {
	if (e.pageY <= (upperbarheight + minimumDimension)) {
		resize_heights(upperbarheight + minimumDimension);
	} else if ((window.innerHeight - e.pageY) > (lowerbarheight + minimumDimension)){
		resize_heights(e.pageY - 1);
	} else {
		resize_heights(window.innerHeight - lowerbarheight - minimumDimension);
	}
};

function horizontalDragbarMouseUp(e) {
	document.body.style.cursor = "";
	window.removeEventListener("mousemove", horizontalDragbarMouseMove, false);
};

function reset_panels(){
	resize_widths(Math.floor(window.innerWidth/2));
	resize_heights(Math.floor(window.innerHeight/2));
	winwidth = window.innerWidth;
	winheight = window.innerHeight;
};
//////////File Source js/addlisteners.js


    onmousemove="mouseMove(event)" 
    onmouseout="mouseOut()"

// var el = document.getElementById("gameCanvas");
// if (el.addEventListener) {
//     el.addEventListener("contextmenu", rightClickCanvas, false);
//     el.addEventListener("mousemove", mouseMove, false);
//     el.addEventListener("mouseout", mouseOut, false);
// } else {
//     el.attachEvent('oncontextmenu', rightClickCanvas);
//     el.attachEvent('onmousemove', mouseMove);
//     el.attachEvent('onmouseout', mouseOut);
// }  

//////////File Source js/addlisteners_editor.js

// for (var i=0;i<10;i++) {
// 	var idname = "newsound"+i;
// 	var el = document.getElementById(idname);
//     el.addEventListener("click", (function(n){return function(){return newSound(n);};})(i), false);
// }

// //var soundButtonPress = document.getElementById("soundButtonPress");
// //soundButtonPress.addEventListener("click", buttonPress, false);

// var runClickLink = document.getElementById("runClickLink");
// runClickLink.addEventListener("click", runClick, false);

// var saveClickLink = document.getElementById("saveClickLink");
// saveClickLink.addEventListener("click", saveClick, false);

// var rebuildClickLink = document.getElementById("rebuildClickLink");
// rebuildClickLink.addEventListener("click", rebuildClick, false);

// var shareClickLink = document.getElementById("shareClickLink");
// shareClickLink.addEventListener("click", shareClick, false);

// var levelEditorClickLink = document.getElementById("levelEditorClickLink");
// levelEditorClickLink.addEventListener("click", levelEditorClick_Fn, false);

// var exportClickLink = document.getElementById("exportClickLink");
// exportClickLink.addEventListener("click", exportClick, false);

// var exampleDropdown = document.getElementById("exampleDropdown");
// exampleDropdown.addEventListener("change", dropdownChange, false);

// var loadDropDown = document.getElementById("loadDropDown");
// loadDropDown.addEventListener("change", loadDropDownChange, false);

// var horizontalDragbar = document.getElementById("horizontaldragbar");
// horizontalDragbar.addEventListener("mousedown", horizontalDragbarMouseDown, false);

// var verticalDragbar = document.getElementById("verticaldragbar");
// verticalDragbar.addEventListener("mousedown", verticalDragbarMouseDown, false);

// window.addEventListener("resize", resize_all, false);
// window.addEventListener("load", reset_panels, false);

// /* https://github.com/ndrake/PuzzleScript/commit/de4ac2a38865b74e66c1d711a25f0691079a290d */
// window.onbeforeunload = function (e) {
//   var e = e || window.event;
//   var msg = 'You have unsaved changes!';

//   if(_editorDirty) {      

//     // For IE and Firefox prior to version 4
//     if (e) {
//       e.returnValue = msg;
//     }

//     // For Safari
//     return msg;
//   }
// };

// var gestureHandler = Mobile.enable();
// if (gestureHandler) {
//     gestureHandler.setFocusElement(document.getElementById('gameCanvas'));
// }


//////////File Source js/makegif.js
function makeGIF() {
	var randomseed = RandomGen.seed;
	levelEditorOpened=false;
	var targetlevel=curlevel;
	var gifcanvas = document.createElement('canvas');
	gifcanvas.width=screenwidth*cellwidth;
	gifcanvas.height=screenheight*cellheight;
	gifcanvas.style.width=screenwidth*cellwidth;
	gifcanvas.style.height=screenheight*cellheight;

	var gifctx = gifcanvas.getContext('2d');

	var inputDat = inputHistory.concat([]);
	

	unitTesting=true;
	levelString=compiledText;



	var encoder = new GIFEncoder();
	encoder.setRepeat(0); //auto-loop
	encoder.setDelay(200);
	encoder.start();

	compile(["loadLevel",curlevel],levelString,randomseed);
	canvasResize();
	redraw();
	gifctx.drawImage(canvas,-xoffset,-yoffset);
  	encoder.addFrame(gifctx);
	var autotimer=0;

  	for(var i=0;i<inputDat.length;i++) {
  		var realtimeframe=false;
		var val=inputDat[i];
		if (val==="undo") {
			DoUndo(false,true);
		} else if (val==="restart") {
			DoRestart();
		} else if (val=="tick") {			
			processInput(-1);
			realtimeframe=true;
		} else {
			processInput(val);
		}
		redraw();
		gifctx.drawImage(canvas,-xoffset,-yoffset);
		encoder.addFrame(gifctx);
		encoder.setDelay(realtimeframe?autotickinterval:repeatinterval);
		autotimer+=repeatinterval;

		while (againing) {
			processInput(-1);		
			redraw();
			encoder.setDelay(againinterval);
			gifctx.drawImage(canvas,-xoffset,-yoffset);
	  		encoder.addFrame(gifctx);	
		}
	}

	encoder.finish();
	const data_url = 'data:image/gif;base64,'+btoa(encoder.stream().getData());
	consolePrint('<img class="generatedgif" src="'+data_url+'">');
	consolePrint('<a href="'+data_url+'" download>Download GIF</a>');
  	
  	unitTesting = false;

        inputHistory = inputDat;
}
