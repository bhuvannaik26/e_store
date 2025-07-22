const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');

dotenv.config();

const products = [
  {
    name: "Apple iPhone 14 Pro Max",
    description: "6.7‑inch Super Retina XDR display, A16 Bionic chip, 48MP main camera",
    price: 139999,
    image: "https://m.media-amazon.com/images/I/61nzPMNY8zL._SL1500_.jpg",
    isFeatured: true,
    countInStock: 15,
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    description: "6.8-inch QHD+ AMOLED display, Snapdragon 8 Gen 2, 200MP camera",
    price: 124999,
    image: "https://m.media-amazon.com/images/I/61VfL-aiToL._SL1500_.jpg",
    isFeatured: true,
    countInStock: 10,
  },
  {
    name: "OnePlus 11 5G",
    description: "6.7-inch AMOLED, Snapdragon 8 Gen 2, 5000mAh battery, 100W SuperVOOC",
    price: 61999,
    image: "https://m.media-amazon.com/images/I/61amb0CfMGL._SL1500_.jpg",
    isFeatured: true,
    countInStock: 8,
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling wireless headphones with 30hr battery",
    price: 29990,
    image: "https://m.media-amazon.com/images/I/51jD77xUe-L._SL1500_.jpg",
    isFeatured: true,
    countInStock: 20,
  },
  {
    name: "Apple MacBook Air M2",
    description: "13.6-inch Liquid Retina, 8GB RAM, 256GB SSD, 18hr battery life",
    price: 114900,
    image: "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SL1500_.jpg",
    isFeatured: true,
    countInStock: 6,
  },
  {
    name: "ASUS ROG Zephyrus G14",
    description: "Ryzen 9, RTX 4060, 16GB RAM, 1TB SSD, 14-inch 165Hz QHD display",
    price: 139990,
    image: "https://m.media-amazon.com/images/I/71s1LRpaprL._SL1500_.jpg",
    isFeatured: true,
    countInStock: 5,
  },
  {
    name: "Samsung Galaxy Watch 6",
    description: "1.5-inch Super AMOLED, ECG, 40mm LTE smartwatch",
    price: 33999,
    image: "https://m.media-amazon.com/images/I/71oe53S1sPL._SL1500_.jpg",
    isFeatured: false,
    countInStock: 18,
  },
  {
    name: "boAt Airdopes 141",
    description: "42H Playtime, ENx tech, 8mm drivers, Type-C fast charging",
    price: 1299,
    image: "https://m.media-amazon.com/images/I/61KNJav3S9L._SL1500_.jpg",
    isFeatured: false,
    countInStock: 25,
  },
  {
    name: "Canon EOS 200D DSLR",
    description: "24.1MP CMOS sensor, Dual Pixel AF, DIGIC 8, 4K video",
    price: 52999,
    image: "https://m.media-amazon.com/images/I/71EWRyqzw0L._SL1500_.jpg",
    isFeatured: false,
    countInStock: 7,
  },
  {
    name: "Mi 4A Horizon Edition Smart TV",
    description: "32-inch HD Ready, Android TV 9.0, Dolby Audio",
    price: 13499,
    image: "https://m.media-amazon.com/images/I/81FG64t5hgL._SL1500_.jpg",
    isFeatured: false,
    countInStock: 12,
  },
  {
    name: "Realme Pad X",
    description: "Snapdragon 695, 11-inch 2K display, Dolby Atmos quad speakers",
    price: 25999,
    image: "https://m.media-amazon.com/images/I/71vFKBpKakL._SL1500_.jpg",
    isFeatured: false,
    countInStock: 9,
  },
  {
    name: "HP Pavilion x360",
    description: "14-inch FHD Touch, i5 12th Gen, 16GB RAM, 512GB SSD",
    price: 68990,
    image: "https://m.media-amazon.com/images/I/71Zf9uUp+GL._SL1500_.jpg",
    isFeatured: false,
    countInStock: 6,
  },
  {
    name: "Lenovo Legion 5 Pro",
    description: "Ryzen 7, RTX 3070, 16GB RAM, 1TB SSD, 16-inch QHD 165Hz",
    price: 129990,
    image: "https://m.media-amazon.com/images/I/61uD2aS8U-L._SL1500_.jpg",
    isFeatured: false,
    countInStock: 4,
  },
  {
    name: "Apple iPad 9th Gen",
    description: "10.2-inch Retina, A13 Bionic chip, 64GB Wi-Fi",
    price: 29900,
    image: "https://m.media-amazon.com/images/I/61NGnpjoRDL._SL1500_.jpg",
    isFeatured: false,
    countInStock: 15,
  },
  {
    name: "Echo Dot 5th Gen",
    description: "Smart speaker with Alexa, enhanced bass and voice control",
    price: 4999,
    image: "https://m.media-amazon.com/images/I/61RW5bVO0+L._SL1500_.jpg",
    isFeatured: false,
    countInStock: 21,
  },
  {
    name: "Samsung T7 1TB SSD",
    description: "Portable external SSD with USB 3.2 Gen 2, 1050MB/s",
    price: 8999,
    image: "https://m.media-amazon.com/images/I/61kDW5tXGCL._SL1500_.jpg",
    isFeatured: false,
    countInStock: 13,
  },
  {
    name: "Logitech MX Master 3S",
    description: "Advanced wireless mouse with 8K DPI, MagSpeed scroll",
    price: 9995,
    image: "https://m.media-amazon.com/images/I/61cP+ZRY3hL._SL1500_.jpg",
    isFeatured: false,
    countInStock: 17,
  },
  {
    name: "Acer Nitro 5 Gaming Laptop",
    description: "Intel i5 12th Gen, RTX 3050, 16GB RAM, 512GB SSD",
    price: 78990,
    image: "https://m.media-amazon.com/images/I/71P1zK5xD-L._SL1500_.jpg",
    isFeatured: false,
    countInStock: 5,
  },
  {
    name: "Redmi Note 12 Pro+ 5G",
    description: "120W charger, 200MP camera, 6.67-inch AMOLED display",
    price: 29999,
    image: "https://m.media-amazon.com/images/I/81VN3eKAA8L._SL1500_.jpg",
    isFeatured: false,
    countInStock: 10,
  },
  {
    name: "Fire-Boltt Smartwatch",
    description: "Bluetooth calling, 1.96'' HD display, 123 sports modes",
    price: 1999,
    image: "https://m.media-amazon.com/images/I/61Y3sfp7d0L._SL1500_.jpg",
    isFeatured: false,
    countInStock: 30,
  },
  // ➕ Add more to make 30
];

while (products.length < 30) {
  products.push({
    name: `Gadget ${products.length + 1}`,
    description: `High-quality electronic gadget with powerful specs.`,
    price: Math.floor(Math.random() * 50000) + 1000,
    image: `https://m.media-amazon.com/images/I/71${Math.floor(Math.random() * 10)}rNqKbpML._SL1500_.jpg`,
    isFeatured: false,
    countInStock: Math.floor(Math.random() * 20) + 1,
  });
}

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    const created = await Product.insertMany(products);
    console.log(`✅ Seeded ${created.length} products successfully`);
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding products:', err);
    process.exit(1);
  }
};

seedProducts();
