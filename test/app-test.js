const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Hackerbay-Microservice-Test', () => {
    let token;

    describe('/POST authentication', () => {
        
        const mockDetails = { username: 'mefff', password: 'iCode77ff6' };
        
        it('it should not POST details if they do not meet requirements', (done) => {
            chai.request(app)
                .post('/api/auth/sign-in')
                .send({username: '', password: 'mefef'})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        });

        it('it should POST details with the JWT', (done) => {
            chai.request(app)
                .post('/api/auth/sign-in')
                .send(mockDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('isAuthorized');
                    token = res.body.jwtToken;
                    console.log('Post token:', token);
                    done();
                })
        });
    })

    describe('/PATCH json-patch-object', () => {
        const objectToPatch = '{ "user": { "firstName": "Albert", "lastName": "Einstein" } }';
        const patch = '[{"op": "replace", "path": "/user/firstName", "value": "Leonado"}, {"op": "replace", "path": "/user/lastName", "value": "Da Vinci"}]';

        it('it should not patch json object if token is not verified', (done) => {
            chai.request(app)
                .patch('/api/patchedObject')
                .set('token', '')
                .send({objectToPatch, patch})
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        });

        it('it should patch json object ', (done) => {
            chai.request(app)
                .patch('/api/patchedObject')
                .set('token', token)
                .send({objectToPatch, patch})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
    })
})