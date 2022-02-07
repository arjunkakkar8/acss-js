import csv
import json
 
# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
     
    # create an empty array
    data = []
     
    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
         
        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
            entry = { "_id": rows['_id'], "scores": [rows['K.2'], rows['K.4'], rows['K.5'], rows['K.6'], rows['K.9']]}
            data.append(entry)
 
    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, separators=(',', ':')))
         


csvFilePath = r'data/acss_data.csv'
jsonFilePath = r'data/acss_data.json'
 
 
make_json(csvFilePath, jsonFilePath)