from itools.html import HTMLParser
from itools.xml import START_ELEMENT, END_ELEMENT, TEXT
from BeautifulSoup import BeautifulSoup as Soup


filename = "/Users/khinester/Downloads/Regiones_metropolitanas_de_Francia.svg"
try:
	handler = open(filename).read()
except IOError:
	print "File %s does not exist!" % filename



soup = Soup(handler)

for path in soup.findAll('path'):
	print path