(function(exports) {
    'use strict';

    /** @private */
    var _artistIdIndexer = {};
    /** @private */
    var _artistAgeIndexer = {};
    /** @private */
    var _artistRateIndexer = {};
    /** @private */
    var _artistGenderIndexer = {};
    /** @private */
    var _results = [];
    /** @private */
    var _filteredIds = undefined;

    /**
     * @private
     */
    function _loadJson (callback) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', '../resource/artists.json', false);
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == "200") {
            callback(xhr.responseText);
          }
        };
        xhr.send(null);
    }

    /**
     * @private
     */
    function _index (data) {
        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i];
            var strAge = '' + item.age;
            var strRate = '' + item.rate;

            _artistIdIndexer[item.uuid] = item;

            if (!_artistAgeIndexer[strAge]) {
                _artistAgeIndexer[strAge] = [];
            }
            _artistAgeIndexer[strAge].push(item.uuid);

            if (!_artistRateIndexer[strRate]) {
                _artistRateIndexer[strRate] = [];
            }
            _artistRateIndexer[strRate].push(item.uuid);

            if (!_artistGenderIndexer[item.gender]) {
                _artistGenderIndexer[item.gender] = [];
            }
            _artistGenderIndexer[item.gender].push(item.uuid);
        }
    }

    /**
     * @private
     */
    function _findByFilteredIds () {
        for (var j = 0, len = _filteredIds.length; j < len; j++) {
            _results.push(_artistIdIndexer[_filteredIds[j]]);
        }
    }

    /**
     * @private
     */
    function _findIntersected (ids) {
        var intersected = [];

        for (var j = 0, len = ids.length; j < len; j++) {
            var id = ids[j];
            if (_filteredIds.indexOf(id) != -1) {
                intersected.push(id);
            }
        }

        _filteredIds = intersected;
    }

    /**
     * @private
     */
    function _combineGenderFilter (g) {
        var ids = [];
        ids.push.apply(ids, _artistGenderIndexer[g]);
        _findIntersected(ids);
    }

    /**
     * @private
     */
    function _initialRangeFilter (min, max, indexer, increment) {
        _filteredIds = [];
        for (var i = min; i >= min && i <= max; i = increment(i) ) {
            _filteredIds.push.apply(_filteredIds, indexer[''+i]);
        }
    }

    /**
     * @private
     */
    function _combineRangeFilter (min, max, indexer, increment) {
        var ids = [];

        if (_filteredIds.length == 0) {
            return;
        }

        for (var i = min; i >= min && i <= max; i = increment(i)) {
            ids.push.apply(ids, indexer[''+i]);
        }

        _findIntersected(ids);
    }

    /**
     * @private
     */
    function _range (min, max, indexer, increment) {
        if (!min) {
            throw new Error('Please specify a minimum value.');
        }

        if (!max) {
            max = min;
        }

        if (_filteredIds === undefined) {
            _initialRangeFilter(min, max, indexer, increment);
        } else {
            _combineRangeFilter(min, max, indexer, increment);
        }
    }

    /**
     * @constructor
     */
    function PopArtistCollection(name) {
        var self = this;
        self.name = name;
        _loadJson(function(data) {
            var jsonData = JSON.parse(data);
            self.size = jsonData.artists.length;
            _index(jsonData.artists);
        });
    }

    PopArtistCollection.prototype = {
        age: function(min, max) {
            _range(min, max, _artistAgeIndexer, function(i) { return ++i; });
            return this;
        },
        rate: function(min, max) {
            _range(min, max, _artistRateIndexer, function(i) { return (Math.round(i*100)+1)/100 });
            return this;
        },
        gender: function(g) {
            if (_filteredIds === undefined) {
                _filteredIds = [];
                _filteredIds.push.apply(_filteredIds, _artistGenderIndexer[g]);
            } else {
                _combineGenderFilter(g);
            }
            return this;
        },
        exec: function() {
            for (var j = 0, len = _filteredIds.length; j < len; j++) {
                _results.push(_artistIdIndexer[_filteredIds[j]]);
            }
            _filteredIds = undefined;
            return _results.splice(0, _results.length);
        }
    };

    exports.PopArtistCollection = PopArtistCollection;

})(this);