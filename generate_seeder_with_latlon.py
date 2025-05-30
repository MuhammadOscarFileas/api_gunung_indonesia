import pandas as pd
import json

EXCEL_FILE = 'Final_Expanded_Gunung_Data_with_Detailed_Harga_Registrasi.xlsx'
COORDINATES_JSON = 'gunung_lat_lon_lokasi.json'
OUTPUT_SEEDER = '20250529-seeder-gunung-with-latlon.js'

def convert_height(height_str):
    import re
    if pd.isna(height_str):
        return None
    match = re.search(r'(\d+)', str(height_str))
    if match:
        return int(match.group(1))
    return None

def generate_seeder_js(data_list):
    lines = [
        "'use strict';",
        "",
        "module.exports = {",
        "  up: async (queryInterface, Sequelize) => {",
        f"    await queryInterface.bulkInsert('gunung', ["
    ]

    for item in data_list:
        props = []
        for k, v in item.items():
            if v is None:
                props.append(f"{k}: null")
            elif isinstance(v, str) and v.startswith("new Date()"):
                props.append(f"{k}: {v}")
            elif isinstance(v, str):
                escaped = v.replace('"', '\\"')
                props.append(f'{k}: "{escaped}"')
            else:
                props.append(f"{k}: {v}")
        obj_text = "{ " + ", ".join(props) + " },"
        lines.append("      " + obj_text)

    lines.extend([
        "    ]);",
        "  },",
        "",
        "  down: async (queryInterface, Sequelize) => {",
        f"    await queryInterface.bulkDelete('gunung', null, {{}});",
        "  }",
        "};"
    ])
    return "\n".join(lines)

def main():
    df = pd.read_excel(EXCEL_FILE)
    coords = json.load(open(COORDINATES_JSON))

    gunung_unique = df[['Gunung', 'Ketinggian_Gunung']].drop_duplicates().reset_index(drop=True)
    gunung_unique['height'] = gunung_unique['Ketinggian_Gunung'].apply(convert_height)
    gunung_unique['name'] = gunung_unique['Gunung'].str.replace('gunung ', '', case=False).str.strip()

    data_for_seeder = []
    for idx, row in gunung_unique.iterrows():
        name = row['name']
        coord = coords.get(name, {})
        lat = coord.get('latitude')
        lon = coord.get('longitude')
        state = coord.get('state')
        county = coord.get('county')
        # Gabungkan lokasi state dan county jika ada
        location = None
        if state and county:
            location = f"{county}, {state}"
        elif state:
            location = state
        elif county:
            location = county

        data_for_seeder.append({
            'id': idx + 1,
            'name': name,
            'height': int(row['height']) if not pd.isna(row['height']) else None,
            'location': location,
            'latitude': lat,
            'longitude': lon,
            'description': None,
            'createdAt': 'new Date()',
            'updatedAt': 'new Date()',
        })

    seeder_code = generate_seeder_js(data_for_seeder)
    with open(OUTPUT_SEEDER, 'w') as f:
        f.write(seeder_code)

    print(f"Seeder gunung with lat/lon and location generated to {OUTPUT_SEEDER}")

if __name__ == "__main__":
    main()
