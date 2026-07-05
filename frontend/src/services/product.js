const products = [
  {
    "name": "Classic Oxford Button-Down Shirt",
    "description": "This classic Oxford shirt is tailored for a polished yet casual look. Crafted from high-quality cotton, it features a button-down collar and a comfortable, slightly relaxed fit. Perfect for both formal and casual occasions, it comes with long sleeves, a button placket, and a yoke at the back. The shirt is finished with a gently rounded hem and adjustable button cuffs.",
    "price": 39.99,
    "discountPrice": 34.99,
    "countInStock": 20,
    "sku": "OX-SH-001",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/2179241/pexels-photo-2179241.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Classic Oxford Button-Down Shirt Front View"
      },
      {
        "url": "https://images.pexels.com/photos/752819/pexels-photo-752819.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Classic Oxford Button-Down Shirt Back View"
      }
    ],
    "rating": 4.5,
    "numReviews": 12
  },
  {
    "name": "Slim-Fit Stretch Shirt",
    "description": "A versatile slim-fit shirt perfect for business or evening events. Designed with a fitted silhouette, the added stretch provides maximum comfort throughout the day. Features a crisp turn-down collar, button placket, and adjustable cuffs.",
    "price": 29.99,
    "discountPrice": 24.99,
    "countInStock": 35,
    "sku": "SLIM-SH-002",
    "category": "Top Wear",
    "brand": "Modern Fit",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Navy Blue",
      "Burgundy"
    ],
    "collections": "Formal Wear",
    "material": "Cotton Blend",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/2451566/pexels-photo-2451566.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Slim-Fit Stretch Shirt Front View"
      },
      {
        "url": "https://images.pexels.com/photos/935969/pexels-photo-935969.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Slim-Fit Stretch Shirt Back View"
      }
    ],
    "rating": 4.8,
    "numReviews": 15
  },
  {
    "name": "Casual Denim Shirt",
    "description": "This casual denim shirt is made from lightweight cotton denim. It features a regular fit, snap buttons, and a straight hem. With Western-inspired details, this shirt is perfect for layering or wearing solo.",
    "price": 49.99,
    "discountPrice": 44.99,
    "countInStock": 15,
    "sku": "CAS-DEN-003",
    "category": "Top Wear",
    "brand": "Street Style",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Light Blue",
      "Dark Wash"
    ],
    "collections": "Casual Wear",
    "material": "Denim",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1019768/pexels-photo-1019768.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Casual Denim Shirt Front View"
      },
      {
        "url": "https://images.pexels.com/photos/10004175/pexels-photo-10004175.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Casual Denim Shirt Back View"
      }
    ],
    "rating": 4.6,
    "numReviews": 8
  },
  {
    "name": "Printed Resort Shirt",
    "description": "Designed for summer, this printed resort shirt is perfect for vacation or weekend getaways. It features a relaxed fit, short sleeves, and a camp collar. The all-over tropical print adds a playful vibe.",
    "price": 29.99,
    "discountPrice": 22.99,
    "countInStock": 25,
    "sku": "PRNT-RES-004",
    "category": "Top Wear",
    "brand": "Beach Breeze",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Tropical Print",
      "Navy Palms"
    ],
    "collections": "Vacation Wear",
    "material": "Viscose",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/19410931/pexels-photo-19410931.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Printed Resort Shirt Front View"
      },
      {
        "url": "https://images.pexels.com/photos/20562563/pexels-photo-20562563.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Printed Resort Shirt Back View"
      }
    ],
    "rating": 4.4,
    "numReviews": 10
  },
  {
    "name": "Slim-Fit Easy-Iron Shirt",
    "description": "A slim-fit, easy-iron shirt in woven cotton fabric with a fitted silhouette. Features a turn-down collar, classic button placket, and a yoke at the back. Long sleeves and adjustable button cuffs with a rounded hem.",
    "price": 34.99,
    "discountPrice": 29.99,
    "countInStock": 30,
    "sku": "SLIM-EIR-005",
    "category": "Top Wear",
    "brand": "Urban Chic",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Gray"
    ],
    "collections": "Business Wear",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/926390/pexels-photo-926390.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Slim-Fit Easy-Iron Shirt Front View"
      },
      {
        "url": "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Slim-Fit Easy-Iron Shirt Front View"
      }
    ],
    "rating": 5,
    "numReviews": 14
  },
  {
    "name": "Polo T-Shirt with Ribbed Collar",
    "description": "A wardrobe classic, this polo t-shirt features a ribbed collar and cuffs. Made from 100% cotton, it offers breathability and comfort throughout the day. Tailored in a slim fit with a button placket at the neckline.",
    "price": 24.99,
    "discountPrice": 19.99,
    "countInStock": 50,
    "sku": "POLO-TSH-006",
    "category": "Top Wear",
    "brand": "Polo Classics",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Navy",
      "Red"
    ],
    "collections": "Casual Wear",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/7593962/pexels-photo-7593962.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Polo T-Shirt Front View"
      },
      {
        "url": "https://images.pexels.com/photos/1472761/pexels-photo-1472761.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Polo T-Shirt Back View"
      }
    ],
    "rating": 4.3,
    "numReviews": 22
  },
  {
    "name": "Oversized Graphic T-Shirt",
    "description": "An oversized graphic t-shirt that combines comfort with street style. Featuring bold prints across the chest, this relaxed fit tee offers a modern vibe, perfect for pairing with jeans or joggers.",
    "price": 19.99,
    "discountPrice": 15.99,
    "countInStock": 40,
    "sku": "OVS-GRF-007",
    "category": "Top Wear",
    "brand": "Street Vibes",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Gray"
    ],
    "collections": "Streetwear",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/14428678/pexels-photo-14428678.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Oversized Graphic T-Shirt Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 30
  },
  {
    "name": "Regular-Fit Henley Shirt",
    "description": "A modern take on the classic Henley shirt, this regular-fit style features a buttoned placket and ribbed cuffs. Made from a soft cotton blend with a touch of elastane for stretch.",
    "price": 22.99,
    "discountPrice": 18.99,
    "countInStock": 35,
    "sku": "REG-HEN-008",
    "category": "Top Wear",
    "brand": "Heritage Wear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Heather Gray",
      "Olive",
      "Black"
    ],
    "collections": "Casual Wear",
    "material": "Cotton Blend",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/11513332/pexels-photo-11513332.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Regular-Fit Henley Shirt Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 25
  },
  {
    "name": "Long-Sleeve Thermal Tee",
    "description": "Stay warm with this long-sleeve thermal tee, made from soft cotton with a waffle-knit texture. Ideal for layering in cooler months, the slim-fit design ensures a snug yet comfortable fit.",
    "price": 27.99,
    "discountPrice": 22.99,
    "countInStock": 20,
    "sku": "LST-THR-009",
    "category": "Top Wear",
    "brand": "Winter Basics",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Charcoal",
      "Dark Green",
      "Navy"
    ],
    "collections": "Winter Essentials",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/4070386/pexels-photo-4070386.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Long-Sleeve Thermal Tee Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 18
  },
  {
    "name": "V-Neck Classic T-Shirt",
    "description": "A classic V-neck t-shirt for everyday wear. This regular-fit tee is made from breathable cotton and features a clean, simple design with a flattering V-neckline. Lightweight fabric and soft texture make it perfect for casual looks.",
    "price": 14.99,
    "discountPrice": 11.99,
    "countInStock": 60,
    "sku": "VNECK-CLS-010",
    "category": "Top Wear",
    "brand": "Everyday Comfort",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Black",
      "Navy"
    ],
    "collections": "Basics",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1561011/pexels-photo-1561011.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "V-Neck Classic T-Shirt Front View"
      }
    ],
    "rating": 4.7,
    "numReviews": 28
  },
  {
    "name": "Slim Fit Joggers",
    "description": "Slim-fit joggers with an elasticated drawstring waist. Features ribbed hems and side pockets. Ideal for casual outings or workouts.",
    "price": 40,
    "discountPrice": 35,
    "countInStock": 20,
    "sku": "BW-001",
    "category": "Bottom Wear",
    "brand": "ActiveWear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Gray",
      "Navy"
    ],
    "collections": "Casual Collection",
    "material": "Cotton Blend",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/18393502/pexels-photo-18393502.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Slim Fit Joggers Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 12
  },
  {
    "name": "Cargo Joggers",
    "description": "Relaxed-fit cargo joggers featuring multiple pockets for functionality. Drawstring waist and cuffed hems for a modern look.",
    "price": 45,
    "discountPrice": 40,
    "countInStock": 15,
    "sku": "BW-002",
    "category": "Bottom Wear",
    "brand": "UrbanStyle",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Olive",
      "Black"
    ],
    "collections": "Urban Collection",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/19461558/pexels-photo-19461558.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Cargo Joggers Front View"
      }
    ],
    "rating": 4.7,
    "numReviews": 20
  },
  {
    "name": "Tapered Sweatpants",
    "description": "Tapered sweatpants designed for comfort. Elastic waistband with adjustable drawstring, perfect for lounging or athletic activities.",
    "price": 35,
    "discountPrice": 30,
    "countInStock": 25,
    "sku": "BW-003",
    "category": "Bottom Wear",
    "brand": "ChillZone",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Gray",
      "Charcoal",
      "Blue"
    ],
    "collections": "Lounge Collection",
    "material": "Fleece",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/11089686/pexels-photo-11089686.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Tapered Sweatpants Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 18
  },
  {
    "name": "Denim Jeans",
    "description": "Classic slim-fit denim jeans with a slight stretch for comfort. Features a zip fly and five-pocket styling for a timeless look.",
    "price": 60,
    "discountPrice": 50,
    "countInStock": 30,
    "sku": "BW-004",
    "category": "Bottom Wear",
    "brand": "DenimCo",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Dark Blue",
      "Light Blue"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Denim Jeans Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 22
  },
  {
    "name": "Chino Pants",
    "description": "Slim-fit chino pants made from stretch cotton twill. Features a button closure and front and back pockets. Ideal for both casual and semi-formal wear.",
    "price": 55,
    "discountPrice": 48,
    "countInStock": 40,
    "sku": "BW-005",
    "category": "Bottom Wear",
    "brand": "CasualLook",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Beige",
      "Navy",
      "Black"
    ],
    "collections": "Smart Casual Collection",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/12056637/pexels-photo-12056637.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Chino Pants Front View"
      }
    ],
    "rating": 4.8,
    "numReviews": 15
  },
  {
    "name": "Track Pants",
    "description": "Comfortable track pants with an elasticated waistband and tapered leg. Features side stripes for a sporty look. Ideal for athletic and casual wear.",
    "price": 40,
    "discountPrice": 35,
    "countInStock": 20,
    "sku": "BW-006",
    "category": "Bottom Wear",
    "brand": "SportX",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Red",
      "Blue"
    ],
    "collections": "Activewear Collection",
    "material": "Polyester",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/2827479/pexels-photo-2827479.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Track Pants Front View"
      }
    ],
    "rating": 4.2,
    "numReviews": 17
  },
  {
    "name": "Slim Fit Trousers",
    "description": "Tailored slim-fit trousers with belt loops and a hook-and-eye closure. Suitable for formal occasions or smart-casual wear.",
    "price": 65,
    "discountPrice": 55,
    "countInStock": 15,
    "sku": "BW-007",
    "category": "Bottom Wear",
    "brand": "ExecutiveStyle",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Office Wear",
    "material": "Polyester",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3756884/pexels-photo-3756884.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Slim Fit Trousers Front View"
      }
    ],
    "rating": 4.7,
    "numReviews": 10
  },
  {
    "name": "Cargo Pants",
    "description": "Loose-fit cargo pants with multiple utility pockets. Features adjustable ankle cuffs and a drawstring waist for versatility and comfort.",
    "price": 50,
    "discountPrice": 45,
    "countInStock": 25,
    "sku": "BW-008",
    "category": "Bottom Wear",
    "brand": "StreetWear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Olive",
      "Brown",
      "Black"
    ],
    "collections": "Street Style Collection",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/19461558/pexels-photo-19461558.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Cargo Pants Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 13
  },
  {
    "name": "Relaxed Fit Sweatpants",
    "description": "Relaxed-fit sweatpants made from soft fleece fabric. Features an elastic waist and adjustable drawstring for a custom fit.",
    "price": 35,
    "discountPrice": 30,
    "countInStock": 35,
    "sku": "BW-009",
    "category": "Bottom Wear",
    "brand": "LoungeWear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Gray",
      "Black",
      "Navy"
    ],
    "collections": "Lounge Collection",
    "material": "Fleece",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/18393502/pexels-photo-18393502.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Relaxed Fit Sweatpants Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 14
  },
  {
    "name": "Formal Dress Pants",
    "description": "Classic formal dress pants with a slim fit. Made from lightweight, wrinkle-resistant fabric for a polished look at the office or formal events.",
    "price": 70,
    "discountPrice": 60,
    "countInStock": 20,
    "sku": "BW-010",
    "category": "Bottom Wear",
    "brand": "ElegantStyle",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Navy"
    ],
    "collections": "Formal Collection",
    "material": "Polyester",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.pexels.com/photos/28426637/pexels-photo-28426637.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Formal Dress Pants Front View"
      }
    ],
    "rating": 4.9,
    "numReviews": 8
  },
  {
    "name": "High-Waist Skinny Jeans",
    "description": "High-waist skinny jeans in stretch denim with a button and zip fly. Features a flattering fit that hugs your curves and enhances your silhouette.",
    "price": 50,
    "discountPrice": 45,
    "countInStock": 30,
    "sku": "BW-W-001",
    "category": "Bottom Wear",
    "brand": "DenimStyle",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Dark Blue",
      "Black",
      "Light Blue"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/2285500/pexels-photo-2285500.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "High-Waist Skinny Jeans"
      }
    ],
    "rating": 4.8,
    "numReviews": 20
  },
  {
    "name": "Wide-Leg Trousers",
    "description": "Flowy, wide-leg trousers with a high waist and side pockets. Perfect for an elegant look that combines comfort and style.",
    "price": 60,
    "discountPrice": 55,
    "countInStock": 25,
    "sku": "BW-W-002",
    "category": "Bottom Wear",
    "brand": "ElegantWear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "collections": "Formal Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1034950/pexels-photo-1034950.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Wide-Leg Trousers Front View"
      }
    ],
    "rating": 4.7,
    "numReviews": 15
  },
  {
    "name": "Stretch Leggings",
    "description": "Soft, stretch leggings in a high-rise style. Perfect for lounging, working out, or casual wear, with a smooth fit that flatters your body.",
    "price": 25,
    "discountPrice": 20,
    "countInStock": 40,
    "sku": "BW-W-003",
    "category": "Bottom Wear",
    "brand": "ComfyFit",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Gray",
      "Navy"
    ],
    "collections": "Activewear Collection",
    "material": "Cotton Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/11401524/pexels-photo-11401524.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Stretch Leggings Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 30
  },
  {
    "name": "Pleated Midi Skirt",
    "description": "Elegant pleated midi skirt with a high waistband and soft fabric that drapes beautifully. Ideal for both formal and casual occasions.",
    "price": 55,
    "discountPrice": 50,
    "countInStock": 20,
    "sku": "BW-W-004",
    "category": "Bottom Wear",
    "brand": "ChicStyle",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Pink",
      "Navy",
      "Black"
    ],
    "collections": "Spring Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/12072164/pexels-photo-12072164.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Pleated Midi Skirt Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 18
  },
  {
    "name": "Flared Palazzo Pants",
    "description": "High-waist palazzo pants with a loose, flowing fit. Comfortable and stylish, making them perfect for casual outings or beach days.",
    "price": 45,
    "discountPrice": 40,
    "countInStock": 35,
    "sku": "BW-W-005",
    "category": "Bottom Wear",
    "brand": "BreezyVibes",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Beige",
      "Light Blue"
    ],
    "collections": "Summer Collection",
    "material": "Linen Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/17025108/pexels-photo-17025108.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Flared Palazzo Pants Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 22
  },
  {
    "name": "High-Rise Joggers",
    "description": "Comfortable high-rise joggers with an elastic waistband and drawstring for a perfect fit. Great for lounging or working out.",
    "price": 40,
    "discountPrice": 35,
    "countInStock": 30,
    "sku": "BW-W-006",
    "category": "Bottom Wear",
    "brand": "ActiveWear",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Black",
      "Gray",
      "Pink"
    ],
    "collections": "Loungewear Collection",
    "material": "Cotton Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/13137745/pexels-photo-13137745.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "High-Rise Joggers Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 25
  },
  {
    "name": "Paperbag Waist Shorts",
    "description": "Stylish paperbag waist shorts with a belted waist and wide legs. Perfect for summer outings and keeping cool in style.",
    "price": 35,
    "discountPrice": 30,
    "countInStock": 20,
    "sku": "BW-W-007",
    "category": "Bottom Wear",
    "brand": "SunnyStyle",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "White",
      "Khaki",
      "Blue"
    ],
    "collections": "Summer Collection",
    "material": "Cotton",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3304941/pexels-photo-3304941.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Paperbag Waist Shorts Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 19
  },
  {
    "name": "Stretch Denim Shorts",
    "description": "Comfortable stretch denim shorts with a high-waisted fit and raw hem. Perfect for pairing with your favorite tops during warmer months.",
    "price": 40,
    "discountPrice": 35,
    "countInStock": 25,
    "sku": "BW-W-008",
    "category": "Bottom Wear",
    "brand": "DenimStyle",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Blue",
      "Black",
      "White"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/11461442/pexels-photo-11461442.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Stretch Denim Shorts Front View"
      }
    ],
    "rating": 4.7,
    "numReviews": 15
  },
  {
    "name": "Culottes",
    "description": "Wide-leg culottes with a flattering high waist and cropped length. The perfect blend of comfort and style for any casual occasion.",
    "price": 50,
    "discountPrice": 45,
    "countInStock": 30,
    "sku": "BW-W-009",
    "category": "Bottom Wear",
    "brand": "ChicStyle",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Olive"
    ],
    "collections": "Casual Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/17025108/pexels-photo-17025108.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Culottes Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 23
  },
  {
    "name": "Classic Pleated Trousers",
    "description": "Timeless pleated trousers with a tailored fit. A wardrobe essential for workwear or formal occasions.",
    "price": 70,
    "discountPrice": 65,
    "countInStock": 25,
    "sku": "BW-W-010",
    "category": "Bottom Wear",
    "brand": "ElegantWear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Navy",
      "Black",
      "Gray"
    ],
    "collections": "Formal Collection",
    "material": "Wool Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1034950/pexels-photo-1034950.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Classic Pleated Trousers Front View"
      }
    ],
    "rating": 4.8,
    "numReviews": 20
  },
  {
    "name": "Knitted Cropped Top",
    "description": "A stylish knitted cropped top with a flattering fitted silhouette. Perfect for pairing with high-waisted jeans or skirts for a casual look.",
    "price": 40,
    "discountPrice": 35,
    "countInStock": 25,
    "sku": "TW-W-001",
    "category": "Top Wear",
    "brand": "ChicKnit",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "collections": "Knits Collection",
    "material": "Cotton Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/6274493/pexels-photo-6274493.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Knitted Cropped Top"
      }
    ],
    "rating": 4.6,
    "numReviews": 15
  },
  {
    "name": "Boho Floral Blouse",
    "description": "Flowy boho blouse with floral patterns, featuring a relaxed fit and balloon sleeves. Ideal for casual summer days.",
    "price": 50,
    "discountPrice": 45,
    "countInStock": 30,
    "sku": "TW-W-002",
    "category": "Top Wear",
    "brand": "BohoVibes",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Pink"
    ],
    "collections": "Summer Collection",
    "material": "Viscose",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/19317559/pexels-photo-19317559.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Boho Floral Blouse"
      }
    ],
    "rating": 4.7,
    "numReviews": 20
  },
  {
    "name": "Casual T-Shirt",
    "description": "A soft, breathable casual t-shirt with a classic fit. Features a round neckline and short sleeves, perfect for everyday wear.",
    "price": 25,
    "discountPrice": 20,
    "countInStock": 50,
    "sku": "TW-W-003",
    "category": "Top Wear",
    "brand": "ComfyTees",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Gray"
    ],
    "collections": "Essentials",
    "material": "Cotton",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/6786614/pexels-photo-6786614.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Casual T-Shirt"
      }
    ],
    "rating": 4.5,
    "numReviews": 25
  },
  {
    "name": "Off-Shoulder Top",
    "description": "An elegant off-shoulder top with ruffled sleeves and a flattering fit. Ideal for adding a touch of femininity to your outfit.",
    "price": 45,
    "discountPrice": 40,
    "countInStock": 35,
    "sku": "TW-W-004",
    "category": "Top Wear",
    "brand": "Elegance",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Red",
      "White",
      "Blue"
    ],
    "collections": "Evening Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3375235/pexels-photo-3375235.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Off-Shoulder Top"
      }
    ],
    "rating": 4.7,
    "numReviews": 18
  },
  {
    "name": "Lace-Trimmed Cami Top",
    "description": "A delicate cami top with lace trim and adjustable straps. The lightweight fabric makes it perfect for layering or wearing alone during warmer weather.",
    "price": 35,
    "discountPrice": 30,
    "countInStock": 40,
    "sku": "TW-W-005",
    "category": "Top Wear",
    "brand": "DelicateWear",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Lingerie-Inspired",
    "material": "Silk Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1055424/pexels-photo-1055424.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Lace-Trimmed Cami Top"
      }
    ],
    "rating": 4.8,
    "numReviews": 22
  },
  {
    "name": "Graphic Print Tee",
    "description": "A trendy graphic print tee with a relaxed fit. Pair it with jeans or skirts for a cool and casual look.",
    "price": 30,
    "discountPrice": 25,
    "countInStock": 45,
    "sku": "TW-W-006",
    "category": "Top Wear",
    "brand": "StreetStyle",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Black"
    ],
    "collections": "Urban Collection",
    "material": "Cotton",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1861907/pexels-photo-1861907.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Graphic Print Tee"
      }
    ],
    "rating": 4.6,
    "numReviews": 30
  },
  {
    "name": "Ribbed Long-Sleeve Top",
    "description": "A cozy ribbed long-sleeve top that offers comfort and style. Perfect for layering during cooler months.",
    "price": 55,
    "discountPrice": 50,
    "countInStock": 30,
    "sku": "TW-W-007",
    "category": "Top Wear",
    "brand": "ComfortFit",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Gray",
      "Pink",
      "Brown"
    ],
    "collections": "Fall Collection",
    "material": "Cotton Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/15236218/pexels-photo-15236218.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Ribbed Long-Sleeve Top"
      }
    ],
    "rating": 4.7,
    "numReviews": 26
  },
  {
    "name": "Ruffle-Sleeve Blouse",
    "description": "A lightweight ruffle-sleeve blouse with a flattering fit. Perfect for a feminine touch to any outfit.",
    "price": 45,
    "discountPrice": 40,
    "countInStock": 20,
    "sku": "TW-W-008",
    "category": "Top Wear",
    "brand": "FeminineWear",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "White",
      "Navy",
      "Lavender"
    ],
    "collections": "Summer Collection",
    "material": "Viscose",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/9172606/pexels-photo-9172606.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Ruffle-Sleeve Blouse"
      }
    ],
    "rating": 4.5,
    "numReviews": 19
  },
  {
    "name": "Classic Button-Up Shirt",
    "description": "A versatile button-up shirt that can be dressed up or down. Made from soft fabric with a tailored fit, it's perfect for both casual and formal occasions.",
    "price": 60,
    "discountPrice": 55,
    "countInStock": 25,
    "sku": "TW-W-009",
    "category": "Top Wear",
    "brand": "ClassicStyle",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Light Blue",
      "Black"
    ],
    "collections": "Office Collection",
    "material": "Cotton",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/4458424/pexels-photo-4458424.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Classic Button-Up Shirt"
      }
    ],
    "rating": 4.8,
    "numReviews": 25
  },
  {
    "name": "V-Neck Wrap Top",
    "description": "A chic v-neck wrap top with a tie waist. Its elegant style makes it perfect for both casual and semi-formal occasions.",
    "price": 50,
    "discountPrice": 45,
    "countInStock": 30,
    "sku": "TW-W-010",
    "category": "Top Wear",
    "brand": "ChicWrap",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Red",
      "Black",
      "White"
    ],
    "collections": "Evening Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "V-Neck Wrap Top"
      }
    ],
    "rating": 4.7,
    "numReviews": 22
  },
  {
    "name": "Plaid Flannel Shirt",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Heritage Wear",
    "description": "A warm, soft plaid flannel shirt with a relaxed regular fit. Brushed cotton fabric keeps you cozy on cool days, with a classic button-front placket and chest pocket.",
    "price": 32.99,
    "discountPrice": 27.99,
    "countInStock": 28,
    "sku": "MT-011",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Red Plaid",
      "Green Plaid",
      "Blue Plaid"
    ],
    "collections": "Fall Essentials",
    "material": "Cotton Flannel",
    "images": [
      {
        "url": "https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Plaid Flannel Shirt Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 16
  },
  {
    "name": "Casual Denim Jacket",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Street Style",
    "description": "A timeless denim jacket with a button front, chest flap pockets, and a slightly relaxed fit. Layers easily over tees and shirts for an instant streetwear upgrade.",
    "price": 64.99,
    "discountPrice": 54.99,
    "countInStock": 18,
    "sku": "MT-012",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Light Wash",
      "Dark Wash"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "images": [
      {
        "url": "https://images.pexels.com/photos/2815417/pexels-photo-2815417.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Casual Denim Jacket Front View"
      }
    ],
    "rating": 4.7,
    "numReviews": 21
  },
  {
    "name": "Leather Biker Jacket",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "description": "A sleek faux-leather biker jacket with an asymmetric zip front and quilted shoulder detailing. Adds an edgy finish to any casual outfit.",
    "price": 89.99,
    "discountPrice": 74.99,
    "countInStock": 12,
    "sku": "MT-013",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black"
    ],
    "collections": "Streetwear",
    "material": "Faux Leather",
    "images": [
      {
        "url": "https://images.pexels.com/photos/977796/pexels-photo-977796.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Leather Biker Jacket Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 14
  },
  {
    "name": "Quilted Puffer Vest",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Winter Basics",
    "description": "A lightweight quilted puffer vest with a fur-trimmed hood and zip closure. Traps warmth without weighing you down, perfect for layering in cold weather.",
    "price": 54.99,
    "discountPrice": 46.99,
    "countInStock": 20,
    "sku": "MT-014",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Navy"
    ],
    "collections": "Winter Essentials",
    "material": "Polyester Fill",
    "images": [
      {
        "url": "https://images.pexels.com/photos/11274805/pexels-photo-11274805.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Quilted Puffer Vest Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 11
  },
  {
    "name": "Crew Neck Pullover Sweater",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Modern Fit",
    "description": "A soft knit crew neck sweater with ribbed cuffs and hem. A versatile layering piece that pairs equally well with jeans or chinos.",
    "price": 42.99,
    "discountPrice": 36.99,
    "countInStock": 25,
    "sku": "MT-015",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Charcoal"
    ],
    "collections": "Fall Essentials",
    "material": "Wool Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3316931/pexels-photo-3316931.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Crew Neck Pullover Sweater Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 19
  },
  {
    "name": "Striped Crew Sweater",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Heritage Wear",
    "description": "A fine-knit sweater with a subtle striped pattern and crew neckline. Lightweight enough for layering, warm enough to wear alone.",
    "price": 39.99,
    "discountPrice": 33.99,
    "countInStock": 22,
    "sku": "MT-016",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Navy Stripe",
      "Gray Stripe"
    ],
    "collections": "Smart Casual",
    "material": "Cotton Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/6748636/pexels-photo-6748636.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Striped Crew Sweater Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 9
  },
  {
    "name": "Pullover Hoodie",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Street Vibes",
    "description": "A relaxed-fit pullover hoodie with a soft fleece interior, kangaroo pocket, and adjustable drawstring hood. A streetwear staple for everyday comfort.",
    "price": 36.99,
    "discountPrice": 29.99,
    "countInStock": 40,
    "sku": "MT-017",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Gray",
      "Black",
      "Navy"
    ],
    "collections": "Streetwear",
    "material": "Cotton Fleece",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3492383/pexels-photo-3492383.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Pullover Hoodie Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 33
  },
  {
    "name": "Classic Turtleneck Sweater",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Urban Chic",
    "description": "A fine-gauge turtleneck sweater that layers cleanly under jackets or stands alone for a refined, minimalist look.",
    "price": 47.99,
    "discountPrice": 39.99,
    "countInStock": 16,
    "sku": "MT-018",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Brown",
      "Black"
    ],
    "collections": "Business Casual",
    "material": "Merino Wool",
    "images": [
      {
        "url": "https://images.pexels.com/photos/6643012/pexels-photo-6643012.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Classic Turtleneck Sweater Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 13
  },
  {
    "name": "Ringer Graphic Tee",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Street Vibes",
    "description": "A retro-inspired ringer tee with contrast trim at the neckline and sleeves. Soft cotton jersey with a relaxed everyday fit.",
    "price": 18.99,
    "discountPrice": 14.99,
    "countInStock": 45,
    "sku": "MT-019",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Black"
    ],
    "collections": "Basics",
    "material": "Cotton",
    "images": [
      {
        "url": "https://images.pexels.com/photos/8217536/pexels-photo-8217536.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Ringer Graphic Tee Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 27
  },
  {
    "name": "Athletic Tank Top",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "ActiveWear",
    "description": "A breathable sleeveless tank built for workouts or warm-weather lounging. Moisture-wicking fabric keeps you cool and dry.",
    "price": 16.99,
    "discountPrice": 13.99,
    "countInStock": 38,
    "sku": "MT-020",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Black",
      "Heather Gray"
    ],
    "collections": "Activewear Collection",
    "material": "Cotton Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/8475093/pexels-photo-8475093.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Athletic Tank Top Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 20
  },
  {
    "name": "Linen Casual Shirt",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Beach Breeze",
    "description": "A breathable linen-blend shirt with long sleeves and a relaxed fit. Ideal for warm climates and easygoing weekends.",
    "price": 44.99,
    "discountPrice": 37.99,
    "countInStock": 24,
    "sku": "MT-021",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Beige"
    ],
    "collections": "Vacation Wear",
    "material": "Linen",
    "images": [
      {
        "url": "https://images.pexels.com/photos/5747669/pexels-photo-5747669.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Linen Casual Shirt Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 17
  },
  {
    "name": "Striped Rugby Polo",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Polo Classics",
    "description": "A heavyweight rugby-style polo with bold stripes and a ribbed collar. Sporty and durable for everyday wear.",
    "price": 34.99,
    "discountPrice": 28.99,
    "countInStock": 30,
    "sku": "MT-022",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black/White",
      "Navy/Red"
    ],
    "collections": "Casual Wear",
    "material": "Cotton",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3215733/pexels-photo-3215733.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Striped Rugby Polo Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 15
  },
  {
    "name": "Varsity Bomber Jacket",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Street Style",
    "description": "A varsity-inspired bomber jacket with ribbed collar, cuffs, and hem. A bold statement piece for cooler days.",
    "price": 69.99,
    "discountPrice": 58.99,
    "countInStock": 14,
    "sku": "MT-023",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Navy/Cream"
    ],
    "collections": "Streetwear",
    "material": "Polyester Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/5553560/pexels-photo-5553560.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Varsity Bomber Jacket Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 10
  },
  {
    "name": "Quarter-Zip Pullover",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "Modern Fit",
    "description": "A smart-casual quarter-zip pullover in soft brushed fabric. Easy to dress up or down for the office or weekend.",
    "price": 41.99,
    "discountPrice": 35.99,
    "countInStock": 26,
    "sku": "MT-024",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Navy",
      "Charcoal"
    ],
    "collections": "Smart Casual",
    "material": "Cotton Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/170171/pexels-photo-170171.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Quarter-Zip Pullover Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 12
  },
  {
    "name": "Muscle Fit Sleeveless Tee",
    "gender": "Men",
    "category": "Top Wear",
    "brand": "ActiveWear",
    "description": "A fitted sleeveless tee designed to move with you. Lightweight, breathable fabric for training days or hot summer outings.",
    "price": 17.99,
    "discountPrice": 14.99,
    "countInStock": 33,
    "sku": "MT-025",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Activewear Collection",
    "material": "Cotton Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/26839464/pexels-photo-26839464.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Muscle Fit Sleeveless Tee Front View"
      }
    ],
    "rating": 4.2,
    "numReviews": 8
  },
  {
    "name": "Bermuda Shorts",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "CasualLook",
    "description": "Knee-length Bermuda shorts with a tailored fit and side pockets. A smart-casual alternative to standard shorts.",
    "price": 36.99,
    "discountPrice": 31.99,
    "countInStock": 28,
    "sku": "BW-011",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Brown",
      "Khaki",
      "Navy"
    ],
    "collections": "Summer Collection",
    "material": "Cotton Twill",
    "images": [
      {
        "url": "https://images.pexels.com/photos/9558898/pexels-photo-9558898.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Bermuda Shorts Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 12
  },
  {
    "name": "Linen Drawstring Pants",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "Beach Breeze",
    "description": "Breathable linen-blend pants with an elastic drawstring waist. Lightweight and relaxed, built for warm weather comfort.",
    "price": 48.99,
    "discountPrice": 41.99,
    "countInStock": 20,
    "sku": "BW-012",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Beige"
    ],
    "collections": "Vacation Wear",
    "material": "Linen Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/2709563/pexels-photo-2709563.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Linen Drawstring Pants Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 14
  },
  {
    "name": "Relaxed Straight Jeans",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "DenimCo",
    "description": "Straight-leg jeans with a relaxed fit through the hip and thigh. Classic five-pocket styling in durable denim.",
    "price": 58.99,
    "discountPrice": 49.99,
    "countInStock": 32,
    "sku": "BW-013",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Mid Blue",
      "Dark Blue"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "images": [
      {
        "url": "https://images.pexels.com/photos/9775489/pexels-photo-9775489.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Relaxed Straight Jeans Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 24
  },
  {
    "name": "Bootcut Jeans",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "DenimCo",
    "description": "Slight flare at the hem gives these bootcut jeans a retro edge while keeping the rest of the leg streamlined.",
    "price": 56.99,
    "discountPrice": 47.99,
    "countInStock": 18,
    "sku": "BW-014",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Dark Blue"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "images": [
      {
        "url": "https://images.pexels.com/photos/4206427/pexels-photo-4206427.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Bootcut Jeans Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 9
  },
  {
    "name": "Utility Cargo Shorts",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "StreetWear",
    "description": "Durable cargo shorts with multiple utility pockets and an adjustable waistband. Built for function without sacrificing style.",
    "price": 39.99,
    "discountPrice": 33.99,
    "countInStock": 25,
    "sku": "BW-015",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Olive",
      "Black"
    ],
    "collections": "Street Style Collection",
    "material": "Cotton",
    "images": [
      {
        "url": "https://images.pexels.com/photos/19461558/pexels-photo-19461558.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Utility Cargo Shorts Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 16
  },
  {
    "name": "Corduroy Trousers",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "CasualLook",
    "description": "Soft corduroy trousers with a tailored straight leg. A textured update on a smart-casual classic.",
    "price": 52.99,
    "discountPrice": 44.99,
    "countInStock": 19,
    "sku": "BW-016",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Beige",
      "Brown"
    ],
    "collections": "Fall Essentials",
    "material": "Corduroy",
    "images": [
      {
        "url": "https://images.pexels.com/photos/12056637/pexels-photo-12056637.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Corduroy Trousers Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 11
  },
  {
    "name": "Wool Dress Trousers",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "ElegantStyle",
    "description": "Tailored wool-blend dress trousers with a sharp crease and clean silhouette. A staple for business and formal occasions.",
    "price": 74.99,
    "discountPrice": 64.99,
    "countInStock": 15,
    "sku": "BW-017",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Charcoal",
      "Navy"
    ],
    "collections": "Formal Collection",
    "material": "Wool Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1450114/pexels-photo-1450114.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Wool Dress Trousers Front View"
      }
    ],
    "rating": 4.8,
    "numReviews": 13
  },
  {
    "name": "Performance Golf Pants",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "SportX",
    "description": "Stretch-woven golf pants engineered for full mobility on the course. Moisture-wicking finish keeps you comfortable all day.",
    "price": 49.99,
    "discountPrice": 42.99,
    "countInStock": 22,
    "sku": "BW-018",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Gray"
    ],
    "collections": "Activewear Collection",
    "material": "Performance Stretch",
    "images": [
      {
        "url": "https://images.pexels.com/photos/18516993/pexels-photo-18516993.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Performance Golf Pants Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 10
  },
  {
    "name": "Lounge Joggers",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "LoungeWear",
    "description": "Ultra-soft lounge joggers with an elastic waistband and tapered ankle cuffs. Made for relaxing at home.",
    "price": 33.99,
    "discountPrice": 28.99,
    "countInStock": 35,
    "sku": "BW-019",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Beige",
      "Gray"
    ],
    "collections": "Lounge Collection",
    "material": "Cotton Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/18393502/pexels-photo-18393502.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Lounge Joggers Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 18
  },
  {
    "name": "Heavyweight Track Joggers",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "SportX",
    "description": "Heavyweight fleece joggers with ribbed cuffs and a drawstring waist. Built for warmth on cold-weather runs or rest days.",
    "price": 44.99,
    "discountPrice": 37.99,
    "countInStock": 21,
    "sku": "BW-020",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Activewear Collection",
    "material": "Fleece",
    "images": [
      {
        "url": "https://images.pexels.com/photos/11089686/pexels-photo-11089686.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Heavyweight Track Joggers Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 14
  },
  {
    "name": "Khaki Cargo Shorts",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "StreetWear",
    "description": "Classic khaki cargo shorts with side pockets and an adjustable waist tab. A warm-weather essential.",
    "price": 37.99,
    "discountPrice": 32.99,
    "countInStock": 27,
    "sku": "BW-021",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Khaki",
      "Olive"
    ],
    "collections": "Summer Collection",
    "material": "Cotton",
    "images": [
      {
        "url": "https://images.pexels.com/photos/9558898/pexels-photo-9558898.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Khaki Cargo Shorts Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 9
  },
  {
    "name": "Slim Stretch Denim",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "DenimStyle",
    "description": "Slim-fit denim with added stretch for all-day comfort. A modern silhouette that pairs with everything.",
    "price": 54.99,
    "discountPrice": 46.99,
    "countInStock": 29,
    "sku": "BW-022",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Mid Blue",
      "Black"
    ],
    "collections": "Denim Collection",
    "material": "Stretch Denim",
    "images": [
      {
        "url": "https://images.pexels.com/photos/9775489/pexels-photo-9775489.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Slim Stretch Denim Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 22
  },
  {
    "name": "Classic Straight-Leg Jeans",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "DenimCo",
    "description": "A no-fuss straight-leg jean in durable rigid denim. Five-pocket styling and a timeless fit.",
    "price": 53.99,
    "discountPrice": 45.99,
    "countInStock": 24,
    "sku": "BW-023",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Dark Blue",
      "Black"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "images": [
      {
        "url": "https://images.pexels.com/photos/4206427/pexels-photo-4206427.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Classic Straight-Leg Jeans Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 17
  },
  {
    "name": "Pleated Wool Trousers",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "ExecutiveStyle",
    "description": "Front-pleated wool-blend trousers with a relaxed thigh and tapered leg. A refined option for the office.",
    "price": 67.99,
    "discountPrice": 58.99,
    "countInStock": 16,
    "sku": "BW-024",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Gray",
      "Navy"
    ],
    "collections": "Office Wear",
    "material": "Wool Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3756884/pexels-photo-3756884.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Pleated Wool Trousers Front View"
      }
    ],
    "rating": 4.7,
    "numReviews": 11
  },
  {
    "name": "Stretch Twill Chinos",
    "gender": "Men",
    "category": "Bottom Wear",
    "brand": "CasualLook",
    "description": "Everyday chinos in stretch cotton twill with a tapered leg. Smart enough for the office, comfortable enough for the weekend.",
    "price": 46.99,
    "discountPrice": 39.99,
    "countInStock": 31,
    "sku": "BW-025",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Navy",
      "Stone",
      "Black"
    ],
    "collections": "Smart Casual Collection",
    "material": "Cotton Twill",
    "images": [
      {
        "url": "https://images.pexels.com/photos/28426637/pexels-photo-28426637.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Stretch Twill Chinos Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 19
  },
  {
    "name": "Mom Jeans",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "DenimStyle",
    "description": "High-waisted mom jeans with a relaxed, slightly tapered leg. A retro-inspired fit that's comfortable all day long.",
    "price": 52.99,
    "discountPrice": 46.99,
    "countInStock": 28,
    "sku": "BW-W-011",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Light Blue",
      "Dark Blue"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "images": [
      {
        "url": "https://images.pexels.com/photos/8651787/pexels-photo-8651787.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Mom Jeans Front View"
      }
    ],
    "rating": 4.7,
    "numReviews": 24
  },
  {
    "name": "Maxi Skirt",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "BohoVibes",
    "description": "A flowing floor-length maxi skirt with a comfortable elastic waist. Effortlessly elegant for both day and evening.",
    "price": 47.99,
    "discountPrice": 41.99,
    "countInStock": 22,
    "sku": "BW-W-012",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Rust Orange",
      "Black"
    ],
    "collections": "Summer Collection",
    "material": "Viscose",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3012325/pexels-photo-3012325.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Maxi Skirt Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 18
  },
  {
    "name": "Denim Mini Skirt",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "DenimStyle",
    "description": "A classic denim mini skirt with a button front and raw hem. An easy throw-on for warm-weather outfits.",
    "price": 38.99,
    "discountPrice": 33.99,
    "countInStock": 26,
    "sku": "BW-W-013",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Light Blue",
      "Black"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "images": [
      {
        "url": "https://images.pexels.com/photos/18064331/pexels-photo-18064331.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Denim Mini Skirt Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 20
  },
  {
    "name": "Pencil Skirt",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "ElegantWear",
    "description": "A fitted pencil skirt with a back vent for ease of movement. Polished and professional for the office.",
    "price": 49.99,
    "discountPrice": 43.99,
    "countInStock": 19,
    "sku": "BW-W-014",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Beige"
    ],
    "collections": "Office Collection",
    "material": "Polyester Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/15240413/pexels-photo-15240413.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Pencil Skirt Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 15
  },
  {
    "name": "Harem Pants",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "BreezyVibes",
    "description": "Relaxed harem pants with a dropped crotch and elastic cuffs. Effortless comfort with a boho-inspired silhouette.",
    "price": 41.99,
    "discountPrice": 36.99,
    "countInStock": 24,
    "sku": "BW-W-015",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Beige",
      "Olive"
    ],
    "collections": "Summer Collection",
    "material": "Viscose Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/17025108/pexels-photo-17025108.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Harem Pants Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 13
  },
  {
    "name": "Bike Shorts",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "ComfyFit",
    "description": "Snug-fitting bike shorts with four-way stretch fabric. Equally suited to workouts or worn as a layering piece.",
    "price": 22.99,
    "discountPrice": 18.99,
    "countInStock": 36,
    "sku": "BW-W-016",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Navy"
    ],
    "collections": "Activewear Collection",
    "material": "Stretch Spandex",
    "images": [
      {
        "url": "https://images.pexels.com/photos/719033/pexels-photo-719033.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Bike Shorts Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 21
  },
  {
    "name": "A-Line Skirt",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "ChicStyle",
    "description": "A flattering A-line skirt that flares gently from the waist. A versatile piece that moves easily from desk to dinner.",
    "price": 44.99,
    "discountPrice": 38.99,
    "countInStock": 23,
    "sku": "BW-W-017",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Black",
      "Navy"
    ],
    "collections": "Spring Collection",
    "material": "Polyester",
    "images": [
      {
        "url": "https://images.pexels.com/photos/12072164/pexels-photo-12072164.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "A-Line Skirt Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 16
  },
  {
    "name": "Wide-Leg Linen Pants",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "ElegantWear",
    "description": "Breathable wide-leg pants in a soft linen blend. A relaxed, elevated staple for warm-weather dressing.",
    "price": 56.99,
    "discountPrice": 49.99,
    "countInStock": 18,
    "sku": "BW-W-018",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Black"
    ],
    "collections": "Summer Collection",
    "material": "Linen Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1034950/pexels-photo-1034950.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Wide-Leg Linen Pants Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 12
  },
  {
    "name": "High-Waisted Bermuda Shorts",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "SunnyStyle",
    "description": "Tailored high-waisted Bermuda shorts that sit at the natural waist with a longer, knee-grazing length.",
    "price": 36.99,
    "discountPrice": 31.99,
    "countInStock": 25,
    "sku": "BW-W-019",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "White",
      "Khaki"
    ],
    "collections": "Summer Collection",
    "material": "Cotton",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3304941/pexels-photo-3304941.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "High-Waisted Bermuda Shorts Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 14
  },
  {
    "name": "Cropped Wide-Leg Pants",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "ActiveWear",
    "description": "Ankle-length wide-leg pants with a comfortable elastic waistband. Easy to dress up or wear casually with sneakers.",
    "price": 45.99,
    "discountPrice": 39.99,
    "countInStock": 21,
    "sku": "BW-W-020",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Loungewear Collection",
    "material": "Cotton Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/13137745/pexels-photo-13137745.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Cropped Wide-Leg Pants Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 17
  },
  {
    "name": "Stretch Skinny Jeans",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "DenimStyle",
    "description": "Second-skin skinny jeans in stretch denim with a high rise. Designed to hold its shape all day.",
    "price": 49.99,
    "discountPrice": 43.99,
    "countInStock": 30,
    "sku": "BW-W-021",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Dark Blue"
    ],
    "collections": "Denim Collection",
    "material": "Stretch Denim",
    "images": [
      {
        "url": "https://images.pexels.com/photos/2285500/pexels-photo-2285500.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Stretch Skinny Jeans Front View"
      }
    ],
    "rating": 4.7,
    "numReviews": 23
  },
  {
    "name": "Boyfriend Jeans",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "DenimStyle",
    "description": "Loose, slouchy boyfriend jeans with a slightly cropped leg. Effortlessly cool with a relaxed mid-rise fit.",
    "price": 51.99,
    "discountPrice": 45.99,
    "countInStock": 20,
    "sku": "BW-W-022",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Light Blue"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "images": [
      {
        "url": "https://images.pexels.com/photos/4100717/pexels-photo-4100717.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Boyfriend Jeans Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 15
  },
  {
    "name": "Casual Utility Shorts",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "SunnyStyle",
    "description": "Relaxed utility shorts with patch pockets and a drawstring waist. A go-to for errands or weekend outings.",
    "price": 34.99,
    "discountPrice": 29.99,
    "countInStock": 27,
    "sku": "BW-W-023",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Khaki",
      "Black"
    ],
    "collections": "Casual Collection",
    "material": "Cotton",
    "images": [
      {
        "url": "https://images.pexels.com/photos/15977164/pexels-photo-15977164.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Casual Utility Shorts Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 12
  },
  {
    "name": "Denim Capri Pants",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "DenimStyle",
    "description": "Cropped denim capris that hit just below the knee. A breezy alternative to full-length jeans for warmer days.",
    "price": 42.99,
    "discountPrice": 36.99,
    "countInStock": 19,
    "sku": "BW-W-024",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Light Blue",
      "Black"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "images": [
      {
        "url": "https://images.pexels.com/photos/11461442/pexels-photo-11461442.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Denim Capri Pants Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 10
  },
  {
    "name": "Soft Jersey Lounge Pants",
    "gender": "Women",
    "category": "Bottom Wear",
    "brand": "ComfyFit",
    "description": "Buttery-soft jersey lounge pants with a relaxed straight leg and elastic waistband. Designed purely for comfort.",
    "price": 29.99,
    "discountPrice": 24.99,
    "countInStock": 33,
    "sku": "BW-W-025",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Gray",
      "Black",
      "Pink"
    ],
    "collections": "Loungewear Collection",
    "material": "Cotton Jersey",
    "images": [
      {
        "url": "https://images.pexels.com/photos/11401524/pexels-photo-11401524.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Soft Jersey Lounge Pants Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 19
  },
  {
    "name": "Classic Turtleneck Sweater",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "ComfortFit",
    "description": "A fitted turtleneck sweater in fine-gauge knit. Layers perfectly under blazers or stands alone for cozy minimalism.",
    "price": 44.99,
    "discountPrice": 38.99,
    "countInStock": 24,
    "sku": "TW-W-011",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Black",
      "Camel"
    ],
    "collections": "Fall Collection",
    "material": "Wool Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3941172/pexels-photo-3941172.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Classic Turtleneck Sweater Front View"
      }
    ],
    "rating": 4.7,
    "numReviews": 22
  },
  {
    "name": "Cozy Knit Cardigan",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "ChicKnit",
    "description": "An open-front knit cardigan with a relaxed drape. Throw it over any outfit for an instant layer of warmth.",
    "price": 49.99,
    "discountPrice": 43.99,
    "countInStock": 21,
    "sku": "TW-W-012",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Brown",
      "Beige"
    ],
    "collections": "Knits Collection",
    "material": "Cotton Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/6609103/pexels-photo-6609103.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Cozy Knit Cardigan Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 17
  },
  {
    "name": "Classic Denim Jacket",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "DenimStyle",
    "description": "A cropped denim jacket with button cuffs and chest pockets. An easy layer for transitional weather.",
    "price": 58.99,
    "discountPrice": 51.99,
    "countInStock": 19,
    "sku": "TW-W-013",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Light Wash",
      "Dark Wash"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "images": [
      {
        "url": "https://images.pexels.com/photos/11653295/pexels-photo-11653295.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Classic Denim Jacket Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 14
  },
  {
    "name": "Halter Top",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "BohoVibes",
    "description": "A breezy halter top with a tie-neck closure and relaxed fit. Pairs effortlessly with high-waisted bottoms.",
    "price": 32.99,
    "discountPrice": 27.99,
    "countInStock": 26,
    "sku": "TW-W-014",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Green",
      "White"
    ],
    "collections": "Summer Collection",
    "material": "Viscose",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1376594/pexels-photo-1376594.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Halter Top Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 16
  },
  {
    "name": "Ribbed Turtleneck Top",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "ComfortFit",
    "description": "A fitted ribbed turtleneck top, lightweight enough for layering yet warm enough to wear on its own.",
    "price": 28.99,
    "discountPrice": 23.99,
    "countInStock": 30,
    "sku": "TW-W-015",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Red",
      "Black"
    ],
    "collections": "Fall Collection",
    "material": "Cotton Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3220360/pexels-photo-3220360.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Ribbed Turtleneck Top Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 18
  },
  {
    "name": "Floral Print Blouse",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "Elegance",
    "description": "A lightweight blouse in a delicate floral print, finished with a soft tie at the neckline. Romantic and easy to wear.",
    "price": 39.99,
    "discountPrice": 34.99,
    "countInStock": 23,
    "sku": "TW-W-016",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Blue Floral"
    ],
    "collections": "Spring Collection",
    "material": "Polyester",
    "images": [
      {
        "url": "https://images.pexels.com/photos/8031943/pexels-photo-8031943.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Floral Print Blouse Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 15
  },
  {
    "name": "Crop Top Tee",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "ComfyTees",
    "description": "A simple cropped tee in soft cotton jersey. Pairs perfectly with high-waisted jeans or skirts.",
    "price": 19.99,
    "discountPrice": 16.99,
    "countInStock": 40,
    "sku": "TW-W-017",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "White",
      "Black"
    ],
    "collections": "Essentials",
    "material": "Cotton",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1766665/pexels-photo-1766665.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Crop Top Tee Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 24
  },
  {
    "name": "Denim-Trim Crop Top",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "StreetStyle",
    "description": "A casual crop top with denim-inspired detailing. Easy to layer or wear solo on warm days.",
    "price": 24.99,
    "discountPrice": 20.99,
    "countInStock": 28,
    "sku": "TW-W-018",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Urban Collection",
    "material": "Cotton Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/11539775/pexels-photo-11539775.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Denim-Trim Crop Top Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 11
  },
  {
    "name": "Tailored Blouse",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "ClassicStyle",
    "description": "A structured blouse with a clean collar and tailored seams. Polished enough for the boardroom, comfortable all day.",
    "price": 46.99,
    "discountPrice": 40.99,
    "countInStock": 20,
    "sku": "TW-W-019",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Light Blue"
    ],
    "collections": "Office Collection",
    "material": "Cotton",
    "images": [
      {
        "url": "https://images.pexels.com/photos/8651009/pexels-photo-8651009.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Tailored Blouse Front View"
      }
    ],
    "rating": 4.7,
    "numReviews": 19
  },
  {
    "name": "Puff Sleeve Blouse",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "FeminineWear",
    "description": "A romantic blouse with statement puff sleeves and a fitted waist. A feminine touch for both work and weekends.",
    "price": 41.99,
    "discountPrice": 36.99,
    "countInStock": 18,
    "sku": "TW-W-020",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Blue",
      "White"
    ],
    "collections": "Spring Collection",
    "material": "Polyester",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3250628/pexels-photo-3250628.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Puff Sleeve Blouse Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 13
  },
  {
    "name": "Satin Cami Top",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "DelicateWear",
    "description": "A silky satin camisole with adjustable straps. Smooth and lightweight, perfect for layering or evening wear.",
    "price": 27.99,
    "discountPrice": 23.99,
    "countInStock": 29,
    "sku": "TW-W-021",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Champagne",
      "Black"
    ],
    "collections": "Evening Collection",
    "material": "Satin",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1055424/pexels-photo-1055424.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Satin Cami Top Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 17
  },
  {
    "name": "Striped Boatneck Top",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "ClassicStyle",
    "description": "A breton-inspired striped top with a wide boatneck and three-quarter sleeves. A nautical classic with year-round appeal.",
    "price": 31.99,
    "discountPrice": 26.99,
    "countInStock": 25,
    "sku": "TW-W-022",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Navy/White"
    ],
    "collections": "Essentials",
    "material": "Cotton",
    "images": [
      {
        "url": "https://images.pexels.com/photos/9172606/pexels-photo-9172606.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Striped Boatneck Top Front View"
      }
    ],
    "rating": 4.4,
    "numReviews": 14
  },
  {
    "name": "Cold-Shoulder Top",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "Elegance",
    "description": "A flattering top with cut-out cold-shoulder detailing and flowy sleeves. Adds a hint of drama to any outfit.",
    "price": 35.99,
    "discountPrice": 30.99,
    "countInStock": 22,
    "sku": "TW-W-023",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "White",
      "Red"
    ],
    "collections": "Evening Collection",
    "material": "Polyester",
    "images": [
      {
        "url": "https://images.pexels.com/photos/3375235/pexels-photo-3375235.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Cold-Shoulder Top Front View"
      }
    ],
    "rating": 4.5,
    "numReviews": 16
  },
  {
    "name": "Sleeveless Shell Top",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "ChicKnit",
    "description": "A minimalist sleeveless shell top with a clean crew neckline. A versatile basic for layering under blazers or cardigans.",
    "price": 22.99,
    "discountPrice": 18.99,
    "countInStock": 34,
    "sku": "TW-W-024",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Beige",
      "Black"
    ],
    "collections": "Essentials",
    "material": "Cotton Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/6274493/pexels-photo-6274493.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "Sleeveless Shell Top Front View"
      }
    ],
    "rating": 4.3,
    "numReviews": 12
  },
  {
    "name": "V-Neck Pullover Sweater",
    "gender": "Women",
    "category": "Top Wear",
    "brand": "ChicWrap",
    "description": "A soft v-neck pullover with a relaxed fit. Easy to dress up with tailored trousers or down with denim.",
    "price": 38.99,
    "discountPrice": 33.99,
    "countInStock": 27,
    "sku": "TW-W-025",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Blue",
      "Cream"
    ],
    "collections": "Fall Collection",
    "material": "Cotton Blend",
    "images": [
      {
        "url": "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=600",
        "altText": "V-Neck Pullover Sweater Front View"
      }
    ],
    "rating": 4.6,
    "numReviews": 20
  }
];

export default products;