
NX.AbstractManager = NX.extend(Object, {

    typeName: 'type',

    constructor: function(config) {

        NX.apply(this, config || {});

        this.all = new NX.util.MixedCollection();

        this.types = {};
    },

    get : function(id) {
        return this.all.get(id);
    },

    register: function(item) {
        this.all.add(item);
    },

    unregister: function(item) {
        this.all.remove(item);
    },

    registerType : function(type, cls) {
        this.types[type] = cls;
        cls[this.typeName] = type;
    },

    isRegistered : function(type){
        return this.types[type] !== undefined;
    },

    create: function(config, defaultType) {

        var type        = config[this.typeName] || config.type || defaultType,
            Constructor = this.types[type];

        if (Constructor == undefined) {
            throw new Error(NX.util.Format.format("The '{0}' type has not been registered with this manager", type));
        }

        return new Constructor(config);
    },

    onAvailable : function(id, fn, scope){
        var all = this.all;

        all.on("add", function(index, o){
            if (o.id == id) {
                fn.call(scope || o, o);
                all.un("add", fn, scope);
            }
        });
    }
});

