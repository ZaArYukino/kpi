/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add('sortable-scroll', function(Y) {

    
    /**
     * Plugin for sortable to handle scrolling lists.
     * @module sortable
     * @submodule sortable-scroll
     */
    /**
     * Plugin for sortable to handle scrolling lists.
     * @class SortScroll
     * @extends Base
     * @constructor
     * @namespace Plugin     
     */
    
    var SortScroll = function() {
        SortScroll.superclass.constructor.apply(this, arguments);
    };

    Y.extend(SortScroll, Y.Base, {
        initializer: function() {
            var host = this.get('host');
            host.plug(Y.Plugin.DDNodeScroll, {
                node: host.get('container')
            });
            host.delegate.on('drop:over', function(e) {
                if (this.dd.nodescroll && e.drag.nodescroll) {
                    e.drag.nodescroll.set('parentScroll', Y.one(this.get('container')));
                }
            });
        }
    }, {
        ATTRS: {
            host: {
                value: ''
            }
        },
        /**
        * @property NAME
        * @default SortScroll
        * @readonly
        * @protected
        * @static
        * @description The name of the class.
        * @type {String}
        */
        NAME: 'SortScroll',
        /**
        * @property NS
        * @default scroll
        * @readonly
        * @protected
        * @static
        * @description The scroll instance.
        * @type {String}
        */
        NS: 'scroll'
    });


    Y.namespace('Y.Plugin');
    Y.Plugin.SortableScroll = SortScroll;



}, '3.4.0' ,{requires:['sortable', 'dd-scroll']});
