
# 9. SITEMAP.JSON
sitemap = {
    "site_name": "Adi Kailash Yatra",
    "base_url": "https://[DOMAIN].com",
    "pages": [
        {
            "page_id": "home",
            "title": "Home",
            "url": "/",
            "priority": 1.0,
            "sections": [
                {
                    "section_id": "hero",
                    "heading": "Welcome to Adi Kailash - Lord Shiva's Sacred Abode",
                    "microcopy": "Embark on a spiritual journey to India's most revered Himalayan pilgrimage",
                    "cta": "Plan Your Journey",
                    "cta_link": "/packages",
                    "priority": 1
                },
                {
                    "section_id": "why-choose",
                    "heading": "Why Choose Adi Kailash",
                    "microcopy": "Experience the divine replica of Mount Kailash without crossing borders",
                    "cta": "View Packages",
                    "cta_link": "/packages",
                    "priority": 2
                },
                {
                    "section_id": "sacred-sites",
                    "heading": "Sacred Sites Await",
                    "microcopy": "Om Parvat, Parvati Sarovar, and ancient temples in the Trans-Himalaya",
                    "cta": "Explore Destinations",
                    "cta_link": "/itinerary",
                    "priority": 3
                },
                {
                    "section_id": "testimonials",
                    "heading": "Testimonials",
                    "microcopy": "Stories from 25,000+ pilgrims who found peace and divinity",
                    "cta": "Read Reviews",
                    "cta_link": "#testimonials",
                    "priority": 4
                }
            ]
        },
        {
            "page_id": "about",
            "title": "About Adi Kailash",
            "url": "/about",
            "priority": 0.9,
            "sections": [
                {
                    "section_id": "intro",
                    "heading": "The Second of Panch Kailash",
                    "microcopy": "Standing at 5,945m, Adi Kailash holds supreme spiritual significance",
                    "cta": "Learn the Legend",
                    "priority": 1
                },
                {
                    "section_id": "mythology",
                    "heading": "Mythology & History",
                    "microcopy": "Where Ravana meditated and Pandavas found refuge during exile",
                    "cta": "Discover Stories",
                    "priority": 2
                },
                {
                    "section_id": "geography",
                    "heading": "Geography & Climate",
                    "microcopy": "Remote Kumaon Himalayas near the Indo-Tibet-Nepal tri-junction",
                    "cta": "View Map",
                    "priority": 3
                }
            ]
        },
        {
            "page_id": "packages",
            "title": "Tour Packages",
            "url": "/packages",
            "priority": 1.0,
            "sections": [
                {
                    "section_id": "overview",
                    "heading": "Choose Your Sacred Journey",
                    "microcopy": "Flexible itineraries from 5 to 14 days for every traveler",
                    "cta": "Compare Packages",
                    "priority": 1
                },
                {
                    "section_id": "group-custom",
                    "heading": "Group & Customized Tours",
                    "microcopy": "Join fixed departures or design your private pilgrimage",
                    "cta": "Request Quote",
                    "cta_link": "/contact",
                    "priority": 2
                },
                {
                    "section_id": "inclusions",
                    "heading": "Inclusions & Amenities",
                    "microcopy": "Transport, meals, permits, guides, and accommodation included",
                    "cta": "See What's Covered",
                    "priority": 3
                }
            ]
        },
        {
            "page_id": "itinerary",
            "title": "Itineraries",
            "url": "/itinerary",
            "priority": 0.9
        },
        {
            "page_id": "permits",
            "title": "Permits & Documentation",
            "url": "/permits",
            "priority": 0.9
        },
        {
            "page_id": "how-to-reach",
            "title": "How to Reach",
            "url": "/how-to-reach",
            "priority": 0.8
        },
        {
            "page_id": "accommodation",
            "title": "Accommodation",
            "url": "/accommodation",
            "priority": 0.7
        },
        {
            "page_id": "preparation",
            "title": "Preparation Guide",
            "url": "/preparation",
            "priority": 0.8
        },
        {
            "page_id": "gallery",
            "title": "Gallery",
            "url": "/gallery",
            "priority": 0.6
        },
        {
            "page_id": "blog",
            "title": "Blog",
            "url": "/blog",
            "priority": 0.7
        },
        {
            "page_id": "faq",
            "title": "FAQ",
            "url": "/faq",
            "priority": 0.8
        },
        {
            "page_id": "contact",
            "title": "Contact Us",
            "url": "/contact",
            "priority": 0.9
        }
    ],
    "navigation": {
        "main_menu": [
            {"label": "Home", "link": "/"},
            {"label": "About", "link": "/about"},
            {"label": "Packages", "link": "/packages", "highlight": True},
            {"label": "Itinerary", "link": "/itinerary"},
            {"label": "Permits", "link": "/permits"},
            {"label": "How to Reach", "link": "/how-to-reach"},
            {"label": "Blog", "link": "/blog"},
            {"label": "Contact", "link": "/contact", "button": True}
        ],
        "footer_menu": {
            "quick_links": [
                {"label": "About Adi Kailash", "link": "/about"},
                {"label": "Tour Packages", "link": "/packages"},
                {"label": "FAQ", "link": "/faq"},
                {"label": "Gallery", "link": "/gallery"}
            ],
            "resources": [
                {"label": "Preparation Guide", "link": "/preparation"},
                {"label": "Packing List", "link": "/preparation#packing"},
                {"label": "Medical Requirements", "link": "/preparation#medical"},
                {"label": "Permits & Documents", "link": "/permits"}
            ],
            "company": [
                {"label": "Contact Us", "link": "/contact"},
                {"label": "Terms & Conditions", "link": "/terms"},
                {"label": "Privacy Policy", "link": "/privacy"},
                {"label": "Cancellation Policy", "link": "/cancellation"}
            ]
        }
    }
}

with open('sitemap.json', 'w', encoding='utf-8') as f:
    json.dump(sitemap, f, indent=2, ensure_ascii=False)

print("✅ Created: sitemap.json")
