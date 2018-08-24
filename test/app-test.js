const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Hackerbay-Microservice-Test', () => {
    

    describe('/POST authentication', () => {
        
        const mockDetails = { username: 'me', password: 'iCode' };
        let token;
        
        it('it should not POST details if they do not meet requirements', (done) => {
            chai.request(app)
                .post('/api/auth/sign-in')
                .send({username: 'me', password: ''})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        })

        it('it should POST details with the JWT', (done) => {
            chai.request(app)
                .post('/api/auth/sign-in')
                .send(mockDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('isAuthorized');
                    token = res.body.token;
                    done();
                })
        })
    })
})