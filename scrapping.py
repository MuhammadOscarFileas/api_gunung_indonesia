import requests
from bs4 import BeautifulSoup

# URL yang ingin di-scrape
url = 'https://datagunung.com/basecamp'

# Mengirim request ke URL
response = requests.get(url)

# Mengecek apakah request berhasil
if response.status_code == 200:
    print("Successfully retrieved the page!")
else:
    print("Failed to retrieve the page. Status code:", response.status_code)

# Menggunakan BeautifulSoup untuk parsing HTML
soup = BeautifulSoup(response.text, 'html.parser')

# Mencari tabel atau elemen yang berisi data basecamp
# Berdasarkan struktur halaman, kita mencari elemen yang sesuai
basecamp_data = []

# Ganti selector ini sesuai dengan struktur HTML halaman
basecamp_rows = soup.find_all('tr')  # Menemukan semua row dalam tabel

for row in basecamp_rows:
    cells = row.find_all('td')  # Mengambil semua kolom di dalam row
    if len(cells) > 2:  # Pastikan row ini valid
        basecamp_name = cells[0].text.strip()
        mountain_name = cells[1].text.strip()
        basecamp_height = cells[2].text.strip()

        basecamp_data.append({
            'Basecamp': basecamp_name,
            'Gunung': mountain_name,
            'Ketinggian (m)': basecamp_height
        })

# Menampilkan hasil
for basecamp in basecamp_data:
    print(basecamp)

