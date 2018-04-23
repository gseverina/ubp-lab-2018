from bottle import Bottle, route, run, get, template, post, request

app = Bottle()


class Credentials:
    """Users credentials class"""
    users = []

    def __init__(self):
        self.users = []

    def add_user(self, user):
        self.users.append(user)

    def get_credentials(self):
        return self.users

    def find(self, data):
        return data in self.users


u1 = {'username': 'user1', 'password': '123'}
u2 = {'username': 'user2', 'password': '123'}
CREDENTIALS = Credentials()
CREDENTIALS.add_user(u1)
CREDENTIALS.add_user(u2)


@app.route('/hello', method="GET")
def hello():
    return "Hello World!"


@app.get('/')
@app.get('/hello/<name>', method="GET")
@app.get('/hello/<name>/<surname>')
def greet(name='Stranger', surname='NOSE'):
    return template('Hello {{name}} {{surname}}', name=name, surname=surname)


@app.post('/param')
def hello_json():
    data = request.json
    ret = {"status": "OK", "param": data['param']}
    return ret


@app.get('/credentials')
def get_credentials():
    ret = { \
        'status': 'OK', \
        'credentials': CREDENTIALS.get_credentials() \
    }
    return ret


@app.post('/login')
def login():
    ret = {}
    data = request.json
    if CREDENTIALS.find(data):
        ret = { "status": "OK" }
    else:
        ret = { "status": "ERROR" }
    
    return ret


@app.post('/register')
def register():
    data = request.json
    CREDENTIALS.add_user(data)
    return { "status": "OK" }


run(app, host='127.0.0.1', port=8081)
