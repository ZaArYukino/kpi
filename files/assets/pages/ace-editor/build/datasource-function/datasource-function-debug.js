/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add('datasource-function', function(Y) {

/**
 * Provides a DataSource implementation which can be used to retrieve data from a custom function.
 *
 * @module datasource
 * @submodule datasource-function
 */

/**
 * Function subclass for the DataSource Utility.
 * @class DataSource.Function
 * @extends DataSource.Local
 * @constructor
 */    
var LANG = Y.Lang,

    DSFn = function() {
        DSFn.superclass.constructor.apply(this, arguments);
    };
    

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.Function static properties
    //
    /////////////////////////////////////////////////////////////////////////////
Y.mix(DSFn, {
    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static     
     * @final
     * @value "dataSourceFunction"
     */
    NAME: "dataSourceFunction",


    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.Function Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        /**
        * @attribute source
        * @description Pointer to live data.
        * @type MIXED
        * @default null
        */
        source: {
            validator: LANG.isFunction
        }
    }
});
    
Y.extend(DSFn, Y.DataSource.Local, {
    /**
     * Passes query string to IO. Fires <code>response</code> event when
     * response is received asynchronously.
     *
     * @method _defRequestFn
     * @param e {Event.Facade} Event Facade with the following properties:
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
     * </dl>
     * @protected
     */
    _defRequestFn: function(e) {
        var fn = this.get("source"),
            payload = e.details[0];
            
        if (fn) {
            try {
                payload.data = fn(e.request, this, e);
            } catch (ex) {
                Y.log("Function execution failure", "error", "datasource-function");
                payload.error = ex;
            }
        } else {
            Y.log("Function data failure", "error", "datasource-function");
            payload.error = new Error("Function data failure");
        }

        this.fire("data", payload);
            
        return e.tId;
    }
});
  
Y.DataSource.Function = DSFn;


}, '3.4.0' ,{requires:['datasource-local']});
