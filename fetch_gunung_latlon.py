import pandas as pd
import requests
import time
import json

EXCEL_FILE = 'Final_Expanded_Gunung_Data_with_Detailed_Harga_Registrasi.xlsx'
OUTPUT_JSON = 'gunung_lat_lon_lokasi.json'

def get_lat_lon_location(place_name):
    url = 'https://nominatim.openstreetmap.org/search'
    params = {
        'q': f'Gunung {place_name}, Indonesia',
        'format': 'json',
        'limit': 1,
        'addressdetails': 1,  # ini agar dapat detail lokasi
        'countrycodes': 'id',
    }
    headers = {'User-Agent': 'Mozilla/5.0'}
    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()
        if data:
            lat = float(data[0]['lat'])
            lon = float(data[0]['lon'])
            address = data[0].get('address', {})
            state = address.get('state', None)
            county = address.get('county', None)
            return lat, lon, state, county
        else:
            return None, None, None, None
    except Exception as e:
        print(f"Error for {place_name}: {e}")
        return None, None, None, None

def main():
    df = pd.read_excel(EXCEL_FILE)
    gunung_list = df['Gunung'].str.replace('gunung ', '', case=False).str.strip().drop_duplicates().tolist()

    results = {}
    total = len(gunung_list)
    for i, gunung in enumerate(gunung_list, 1):
        lat, lon, state, county = get_lat_lon_location(gunung)
        results[gunung] = {
            'latitude': lat,
            'longitude': lon,
            'state': state,
            'county': county,
        }
        print(f"{i}/{total} - {gunung}: {lat}, {lon}, {state}, {county}")
        time.sleep(1)  # rate limit 1 detik

    with open(OUTPUT_JSON, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"Saved coordinates and locations to {OUTPUT_JSON}")

if __name__ == "__main__":
    main()
