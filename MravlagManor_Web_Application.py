import os, os.path
import random
import string

import cherrypy


class Webscene(object):
    @cherrypy.expose
    def index(self):
        return open('MravlagManor_index.html')


if __name__ == '__main__':
    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './static'
        }
    }
    webapp = Webscene()
    cherrypy.quickstart(webapp, '/', conf)
