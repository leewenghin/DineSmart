##############################################
### Phase 1 - Python Install
##############################################
### Step 1 - Choose version and install pyhton 
# REFER
# https://www.youtube.com/watch?v=Uq7TkegTXRU
# https://www.python.org/downloads/windows/

## Please using python 3.11.6 
## Django no support pyhton new version by 3.12.0 (install in October 16, 2023)
## The lasted Django version(4.2.6 in October 16, 2023) at lesesat need (Nov 01, 2023) to supoort it
## https://docs.djangoproject.com/en/4.2/releases/4.2.7/
## https://forum.djangoproject.com/t/django-4-2-lts-compatibility-with-python-3-12/24508/2

# Open powershell checking python version (cannot using cmd i also don't why)
python --version

### Step 2 - Setup Environment
# REFER
# https://www.youtube.com/watch?v=LQTMqGns7Co&t=7s

## Go to cmd
# Go to your directory and create a new folder
cd /xxxx/
python -m venv env

# Comfirm inside have env file
dir 

# activite the python enviroment 
D:\Learning\django_app\env\Scripts\activate


########################################################
### Phase 2 -  Install Django 
########################################################

# REFER
#   

## Step 1
pip install django

## Step 2 
django-admin startproject my_django_app
cd my_django_app



## Step 3 
# Test your Django application locally 
# Starting development server at http://127.0.0.1:8000/
cd django_run_win
python manage.py runserver

## Step 4
# Applies the pending migrations to your database, synchronizing the database schema with your models.
python manage.py migrate

## Step 5 
# Create a new database (sqlite)
python manage.py createsuperuser

## Step 6
python manage.py makemigrations my_django_app

# When change any model need doing step 4 and step 5

########################################################
### Phase 3 -  Setup Phpmyadmin
########################################################
pip install mysql_connector
pip install mysql
pip install djangorestframework 
pip install Pillow
pip install django-cors-headers


########################################################
#Tan 
## Backend
###Open wamps
D:\dinesmart\DineSmart\backend\env\Scripts\activate
cd D:\dinesmart\DineSmart\backend\my_django_app
python manage.py runserver

## Frontend
cd D:\dinesmart\DineSmart\frontend
npm run dev