const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const fixture = require("./comics.fixture")

const expect = chai.expect;

chai.use(chaiHttp);

const createFakeServer = () => {
    const app = express();
    const apiPort = 30001;
    const result = fixture.comicsFixture;

    app.get('/', (req, res) => {
        res.send(result)
    });

    app.listen(apiPort);

    return app
};


describe("Comics", () => {
    describe("/GET comics", () => {

        let fakeServer;

        beforeEach(() => {
            fakeServer = createFakeServer()
        });

        it("it should GET comics from Marvel API", (done) => {
            chai.request(fakeServer)
                .get("/")
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.property('results');
                    expect(res.body).to.deep.equal({
                        data: {
                            results: [
                                {
                                    title: 'Star Wars (2015) #1',
                                    thumbnail: {
                                        path: "http://i.annihil.us/u/prod/marvel/i/mg/1/20/567083a7957b5",
                                        extension: "jpg"
                                    },
                                },
                                {
                                    title: 'Star Wars (2015) #2',
                                    thumbnail: {
                                        path: "http://i.annihil.us/u/prod/marvel/i/mg/e/d0/54a2fda8ace40",
                                        extension: "jpg"
                                    },
                                },
                                {
                                    title: 'Star Wars (2015) #3',
                                    thumbnail: {
                                        path: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5536b138dd044",
                                        extension: "jpg"
                                    },
                                },
                            ]
                        }
                    });
                    done()
                });
        });
    })
});


