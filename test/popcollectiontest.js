var expect = chai.expect;

describe('Pop Artists', function() {
    var popArtists = new PopArtistCollection('artists');

    describe('constructor', function() {
        it('should load pop artists data', function() {
            expect(popArtists).to.be.an.instanceof(PopArtistCollection);
            expect(popArtists.name).to.equal('artists');
            expect(popArtists.size).to.equal(999);
        });
    });

    describe('#age', function() {
        it('should return artists filtered by age range', function() {
            expect(popArtists.age(35, 40).exec()).to.have.length(105);
        });
    });

    describe('#age', function() {
        it('should throw error if missing minimum age', function() {
            expect(popArtists.age).to.throw(Error, /Please specify a minimum value/);
        });
    });

    describe('#rate', function() {
        it('should return artists filtered by rate range', function() {
            expect(popArtists.rate(12, 13).exec()).to.have.length(37);
        });
    });

    describe('#gender', function() {
        it('should return artists filtered by gender', function() {
            expect(popArtists.gender('F').exec()).to.have.length(500);
            expect(popArtists.gender('M').exec()).to.have.length(499);
        });
    });

    describe('#age#rate', function() {
        it('should return artists filtered by age and rate range', function() {
            var artists = popArtists.age(35, 40).rate(12, 13).exec();
            for (var i in artists) {
                expect(artists[i].age).within(35, 40);
                expect(artists[i].rate).within(12, 13);
            }
        });
    });

    describe('#gender#age', function() {
        it('should return artists filtered by gender and age range', function() {
            var artists = popArtists.gender('M').age(25, 30).exec();
            for (var i in artists) {
                expect(artists[i].gender).to.equal('M');
                expect(artists[i].age).within(25, 30);
            }
        });
    });

    describe('#rate#gender', function() {
        it('should return artists filtered by rate range and gender', function() {
            var artists = popArtists.rate(20.00, 29.99).gender('F').exec();
            for (var i in artists) {
                expect(artists[i].rate).within(20.00, 29.99);
                expect(artists[i].gender).to.equal('F');
            }
        });
    });

    describe('#age#rate#gender', function() {
        it('should return artists filtered by combination of age, rate and gender', function() {
            var artists = popArtists.age(20, 30).gender('F').rate(36, 40).exec();
            for (var i in artists) {
                expect(artists[i].age).within(20, 30);
                expect(artists[i].gender).to.equal('F');
                expect(artists[i].rate).within(36, 39.97);
            }
        });
    });
});