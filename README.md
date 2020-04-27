# MyEatsScheduler
Food planner WebApp

# ...

## Backend

### API Docs
Assuming you are in development server, the API docs are at http://127.0.0.1:8000/api/docs/

### Instalation
Clone this repo. 

Create a virtual environment with Python installed. This project was made with Python version 3.8.2.

Once your virtual environment is created and activated, install the needed dependencies running:

```
pip install -r requirements.txt
```

Run migrations:
```
python manage.py migrate
```

If you want to create an admin account, create it and run makemigrations and migrations again:
```
python manage.py createsuperuser
```

```
python manage.py makemigrations
```

```
python manage.py migrate
```

Then, you can start the development server:
```
python manage.py runserver
```

# Licence
 The MIT License (MIT)

Copyright © 2020 Zeppelin17

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.