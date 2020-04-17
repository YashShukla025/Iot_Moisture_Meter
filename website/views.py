from django.shortcuts import render
from django.shortcuts import render,redirect
from django.http import HttpResponse,HttpResponseRedirect
from django.urls import reverse

import json
from sklearn.naive_bayes import BernoulliNB
from sklearn.metrics import accuracy_score
import pandas as pd
from sklearn.model_selection import train_test_split
from firebase import firebase 
from datetime import datetime 
# Create your views here.
firebase =firebase.FirebaseApplication("https://mays-a01c6.firebaseio.com/",None)


def index(request):
    return render(request,'index.html')

def transform_training(data):
    for i in range(len(data['season'])):
        if (data['season'][i]=='Winter'):
            data['season'][i]=0
        
        elif (data['season'][i]=='Spring'):
            data['season'][i]=1
            
        elif (data['season'][i]=='Summer'):
            data['season'][i]=2
            
        elif (data['season'][i]=='Rainy'):
            data['season'][i]=3
        
    
    for i in range(len(data['location'])):
        if (data['location'][i]=='Mumbai'):
            data['location'][i]=0
            
        elif (data['location'][i]=='Delhi'):
            data['location'][i]=1
            
        elif (data['location'][i]=='Chennai'):
            data['location'][i]=2
            
        
    for i in range(len(data['humidity'])):
        if (data['humidity'][i] in range(30,46)):
            data['humidity'][i]=0
            
        elif (data['humidity'][i] in range(46,61)):
            data['humidity'][i]=1
            
        elif (data['humidity'][i] in range(61,80)):
            data['humidity'][i]=2
def transform_test(data):            
    for i in range(len(data['moisture'])):
        if (data['moisture'][i] <=14):
            data['moisture'][i]="NO"
            
        elif (data['moisture'][i] >=15):
            data['moisture'][i]="Yes"
        
        

def predict(request):

    loc=request.POST['location']
    sesn=request.POST['season']
    temp=request.POST['temperature']
    hum=request.POST['humidity']

    result1={}
    month = str(datetime.now().month)
    year =datetime.now().year
    while(True):
        year=year-1
        year1=str(year)
        path_retrive='/'+year1+'/'+month
        result=firebase.get(path_retrive,'')
        if(result):
            result1.update(result)
            
        else:
            break

    result2=[]


    for keyID in result1:
        microbitdata = result1[keyID]
        result2.append(microbitdata)
        

    with open('Data.json', 'w') as fp:
        json.dump(result2, fp)

    df = pd.read_json ('Data.json')
    df.to_csv ('Grain_Data.csv', index = None)


    # Machine Learning Algorithm (Naive bayes Bernoulli)


    data = pd.read_csv('Grain_Data.csv')

    transform_training(data)    
    transform_test(data)       

    ee= {'location': [], 'season': [], 'temp': [], 'humidity': []}
    ee['location'].append(loc)
    ee['season'].append(sesn)
    ee['temp'].append(int(temp))
    ee['humidity'].append(int(hum))
    transform_training(ee)
    ee=pd.DataFrame.from_dict(ee)
    data_x = data[['location', 'season', 'temp', 'humidity']]
    data_y = data['moisture']

    model = BernoulliNB()
    model.fit(data_x,data_y)
    predict = model.predict(ee)
   # print("Alert generate:  ",predict[0])
    val=predict[0]
    #val = accuracy_score(ytest,predict1,normalize=True) *100
    return render(request,'index.html',{'val':val})