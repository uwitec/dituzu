#! C:\Python27\python.exe
import cgi
import cgitb
cgitb.enable()
print 'Content-type: text/html\n'
print 'Hello world!'
form=cgi.FieldStorage()
#print form.keys()
if form:
  print form.keys()
  if form.has_key('file'):
    f=form.getvalue('file')
    if isinstance(f,file):
      file2=open('a.txt','w+')
      #print f.readlines()
      file2.write(f.read())
    else:
      print f
else:
  print 'no forms'
