
# 2. KEYWORDS.CSV - SEO Keywords
keywords_data = [
    ["keyword", "search_intent", "priority", "estimated_volume", "target_page"],
    ["Adi Kailash yatra", "Transactional", "High", "Medium", "Home, Packages"],
    ["Adi Kailash tour package", "Transactional", "High", "Medium", "Packages"],
    ["Adi Kailash Om Parvat yatra", "Transactional", "High", "Medium", "Packages"],
    ["how to reach Adi Kailash", "Informational", "High", "Medium", "How to Reach"],
    ["Adi Kailash yatra cost", "Commercial", "High", "Medium", "Packages, Cost"],
    ["best time to visit Adi Kailash", "Informational", "High", "Medium", "Best Time, Home"],
    ["Adi Kailash permit", "Informational", "High", "Medium", "Permits"],
    ["Adi Kailash inner line permit", "Informational", "High", "Medium", "Permits"],
    ["Adi Kailash trek difficulty", "Informational", "Medium", "Low", "Preparation"],
    ["Adi Kailash package from Kathgodam", "Transactional", "High", "Low", "Packages"],
    ["Adi Kailash package from Delhi", "Transactional", "High", "Low", "Packages"],
    ["Chhota Kailash yatra", "Transactional", "Medium", "Low", "About, Home"],
    ["Adi Kailash altitude", "Informational", "Medium", "Low", "About, Itinerary"],
    ["Om Parvat darshan", "Informational", "Medium", "Medium", "Itinerary, Blog"],
    ["Parvati Sarovar Adi Kailash", "Informational", "Low", "Low", "Itinerary"],
    ["Adi Kailash accommodation", "Commercial", "Medium", "Low", "Accommodation"],
    ["Adi Kailash yatra itinerary", "Informational", "High", "Medium", "Itinerary"],
    ["Adi Kailash road route", "Informational", "Medium", "Low", "How to Reach"],
    ["Dharchula to Adi Kailash", "Informational", "Medium", "Low", "How to Reach"],
    ["Adi Kailash vs Mount Kailash", "Informational", "Low", "Low", "About, Blog"],
    ["Panch Kailash pilgrimage", "Informational", "Medium", "Low", "About"],
    ["Adi Kailash group tour", "Transactional", "High", "Low", "Packages"],
    ["Adi Kailash solo trip", "Commercial", "Medium", "Low", "Packages, Blog"],
    ["Adi Kailash medical certificate", "Informational", "Medium", "Low", "Permits, Preparation"],
    ["Adi Kailash packing list", "Informational", "Medium", "Low", "Preparation, Blog"],
    ["Kumaon pilgrimage tour", "Transactional", "Medium", "Low", "Packages"],
    ["Uttarakhand pilgrimage sites", "Informational", "Medium", "Medium", "Blog"],
    ["high altitude pilgrimage India", "Informational", "Low", "Medium", "Blog"],
    ["Adi Kailash safety tips", "Informational", "Medium", "Low", "Preparation"],
    ["Adi Kailash weather", "Informational", "Medium", "Low", "Best Time"],
    ["Adi Kailash trek booking", "Transactional", "High", "Low", "Packages"],
    ["Adi Kailash September", "Transactional", "Medium", "Low", "Best Time, Packages"],
    ["Adi Kailash June", "Transactional", "Medium", "Low", "Best Time, Packages"],
    ["Pithoragarh Adi Kailash", "Informational", "Low", "Low", "How to Reach"],
    ["Adi Kailash for beginners", "Informational", "Medium", "Low", "Blog"],
    ["Adi Kailash family tour", "Commercial", "Medium", "Low", "Packages"],
    ["Jolingkong base camp", "Informational", "Low", "Low", "Itinerary"],
    ["Gunji village Uttarakhand", "Informational", "Low", "Low", "Itinerary"],
    ["Kailash Mansarovar alternative", "Informational", "Medium", "Medium", "About, Home"],
    ["Lord Shiva pilgrimage India", "Informational", "Medium", "Medium", "Blog, Home"]
]

with open('keywords.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerows(keywords_data)

print("✅ Created: keywords.csv")
