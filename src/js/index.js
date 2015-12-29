(function($, PopArtistCollection) {
    'use strict';

    var popArtists = new PopArtistCollection('artists');
    var allArtists = popArtists.age(16, 74).exec();
    var $tbody = $('tbody');
    var $searchInputs = $('th>input');
    var opts = {};

    function _list(artists, i) {
        if (i >= artists.length) return;
        var art = artists[i];
        $tbody.append('<tr><td>' + art.uuid + '</td><td>' + art.gender + '</td><td>' + art.age + '</td><td>' + art.rate + '</td></tr>');
        _list(artists, ++i);
    }

    function _sort(src, className, compare) {
        allArtists = allArtists.sort(compare);
        $tbody.empty();
        _list(allArtists, 0);
        $(src).removeClass().addClass(className);
    }

    $('th.age')
    .on('click', '.sort, .sort-desc', function(e) {
        _sort(this, 'sort-asc', function(a, b) {
            return parseInt(a.age) - parseInt(b.age);
        });
    })
    .on('click', '.sort-asc', function(e) {
        _sort(this, 'sort-desc', function(a, b) {
            return parseInt(b.age) - parseInt(a.age);
        });
    });

    $('th.rate')
    .on('click', '.sort, .sort-desc', function() {
        _sort(this, 'sort-asc', function(a, b) {
            return a.rate - b.rate;
        });
    })
    .on('click', '.sort-asc', function() {
        _sort(this, 'sort-desc', function(a, b) {
            return b.rate - a.rate;
        });
    });

    $searchInputs.keypress(function(e) {
        var val, results;

        if (e.which != 13) return;

        $searchInputs.each(function(i, e) {
            if (i == 0) {
                opts.gender = $(e).val();
            }
            else if (i == 1) {
                var minmax = $(e).val().trim().split(',');
                opts.age = {'min': parseInt(minmax[0]), 'max': parseInt(minmax[1])};
            }
            else if (i == 2) {
                var minmax = $(e).val().trim().split(',');
                opts.rate = {'min': parseInt(minmax[0]), 'max': parseInt(minmax[1])};
            }
        });

        if (opts.age && opts.age.min) {
            popArtists.age(opts.age.min, opts.age.max);
        }
        if (opts.rate && opts.rate.min) {
            popArtists.rate(opts.rate.min, opts.rate.max);
        }
        if (opts.gender) {
            popArtists.gender(opts.gender.toUpperCase());
        }

        $tbody.empty();
        allArtists = popArtists.exec();
        _list(allArtists, 0);
    });

    _list(allArtists, 0);

})(jQuery, PopArtistCollection);