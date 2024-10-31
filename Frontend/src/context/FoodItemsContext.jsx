

// FoodContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the FoodContext
const FoodContext = createContext();



// Create a provider component
export const FoodProvider = ({ children }) => {
    const [foodItems, setFoodItems] = useState([]);
    const fetchFoodItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/admin/food/find`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFoodItems(data.foodItems);  // Assuming `data` is an array of food items
                console.log("Food items loaded successfully");
            } else {
                const errorData = await response.json();
                console.error("Error fetching food items:", errorData.error);
                alert("Failed to load food items. Please try again.");
            }
        } catch (err) {
            console.log("Error:", err);
            alert("An error occurred. Please check the backend connection.");
        }
    };

    // Fetch food items on component mount
    useEffect(() => {
        fetchFoodItems();
    }, []);



    return (
        <FoodContext.Provider value={{ foodItems, setFoodItems }}>
            {children}
        </FoodContext.Provider>
    );
};

// Custom hook to use the FoodContext
export const useFood = () => {
    return useContext(FoodContext);
};






























// // Utility function to generate random prices based on food category
// const generateRandomPrice = (category) => {
//     switch (category) {
//         case "biryani":
//             return Math.floor(Math.random() * (300 - 150) + 150); // Price between 150 and 300
//         case "fish":
//             return Math.floor(Math.random() * (400 - 200) + 200); // Price between 200 and 400
//         case "chicken":
//             return Math.floor(Math.random() * (350 - 150) + 150); // Price between 150 and 350
//         case "mutton":
//             return Math.floor(Math.random() * (500 - 300) + 300); // Price between 300 and 500
//         case "momos":
//             return Math.floor(Math.random() * (150 - 50) + 50);   // Price between 50 and 150
//         case "paneer":
//             return Math.floor(Math.random() * (300 - 100) + 100); // Price between 100 and 300
//         case "dosa":
//             return Math.floor(Math.random() * (200 - 100) + 100); // Price between 100 and 200
//         case "dal":
//             return Math.floor(Math.random() * (250 - 100) + 100); // Price between 100 and 250
//         case "chaat":
//             return Math.floor(Math.random() * (100 - 50) + 50);   // Price between 50 and 100
//         case "samosa":
//             return Math.floor(Math.random() * (50 - 20) + 20);    // Price between 20 and 50
//         case "pav bhaji":
//             return Math.floor(Math.random() * (150 - 80) + 80);   // Price between 80 and 150
//         case "thali":
//             return Math.floor(Math.random() * (350 - 200) + 200); // Price between 200 and 350
//         case "kebab":
//             return Math.floor(Math.random() * (400 - 250) + 250); // Price between 250 and 400
//         default:
//             return Math.floor(Math.random() * (200 - 100) + 100); // Default price range
//     }
// };
// ([
//     {
//         restaurantName: "Biryani House",
//         stars: 4.5,
//         address: "123 Biryani Street, Food City",
//         foodImage: pizza,
//         categoryofFood: "biryani",
//         price: generateRandomPrice("biryani"),
//         description: "Aromatic basmati rice cooked with tender chicken, served with raita and salad. Includes 1 boiled egg and a spicy gravy on the side. Perfect for a hearty meal."
//     },
//     {
//         restaurantName: "Biryani Delight",
//         stars: 4.2,
//         address: "456 Spice Lane, Food City",
//         foodImage: pizza,
//         categoryofFood: "biryani",
//         price: generateRandomPrice("biryani"),
//         description: "Flavored rice slow-cooked with mutton pieces, served with tangy salad and refreshing raita. Comes with a boiled egg and spicy salan (gravy) for a complete experience."
//     },
//     {
//         restaurantName: "Fish Curry Corner",
//         stars: 4.0,
//         address: "789 Fish Lane, Food City",
//         foodImage: pizza,
//         categoryofFood: "fish",
//         price: generateRandomPrice("fish"),
//         description: "Succulent pieces of fresh fish cooked in a tangy, spiced curry, served with steamed rice. Accompanied by a side of fried fish and a lemon wedge for extra zest."
//     },
//     {
//         restaurantName: "Seafood Paradise",
//         stars: 4.3,
//         address: "321 Seafood Avenue, Food City",
//         foodImage: pizza,
//         categoryofFood: "fish",
//         price: generateRandomPrice("fish"),
//         description: "A seafood lover’s dream! Includes a generous portion of fish curry, a side of grilled prawns, and served with fragrant basmati rice and a slice of lime."
//     },
//     {
//         restaurantName: "Chicken Tandoori Palace",
//         stars: 3.5,
//         address: "654 Chicken Road, Food City",
//         foodImage: pizza,
//         categoryofFood: "chicken",
//         price: generateRandomPrice("chicken"),
//         description: "Four pieces of juicy tandoori chicken, marinated in a blend of spices and cooked to perfection. Served with mint chutney, onion rings, and butter naan."
//     },
//     {
//         restaurantName: "Grilled Chicken Hub",
//         stars: 4.1,
//         address: "987 Grilled Lane, Food City",
//         foodImage: pizza,
//         categoryofFood: "chicken",
//         price: generateRandomPrice("chicken"),
//         description: "A platter of grilled chicken breast, served with roasted vegetables and garlic bread. Comes with a creamy dipping sauce and a side of fresh salad."
//     },
//     {
//         restaurantName: "Mutton Kitchen",
//         stars: 4.2,
//         address: "111 Mutton Avenue, Food City",
//         foodImage: pizza,
//         categoryofFood: "mutton",
//         price: generateRandomPrice("mutton"),
//         description: "Tender mutton cooked in a rich, spicy gravy, served with hot parathas and a side of onions and lemon wedges. Perfect for lovers of bold flavors."
//     },
//     {
//         restaurantName: "Mutton Rogan Josh",
//         stars: 4.0,
//         address: "222 Rogan Street, Food City",
//         foodImage: pizza,
//         categoryofFood: "mutton",
//         price: generateRandomPrice("mutton"),
//         description: "Kashmiri-style Rogan Josh with juicy mutton pieces simmered in a thick yogurt-based curry. Served with basmati rice, mint raita, and fresh salad."
//     },
//     {
//         restaurantName: "Momo Delight",
//         stars: 4.7,
//         address: "333 Momo Place, Food City",
//         foodImage: pizza,
//         categoryofFood: "momos",
//         price: generateRandomPrice("momos"),
//         description: "Six pieces of steamed momos stuffed with a mix of chicken and herbs. Served with spicy tomato chutney and clear soup for dipping. A street-food classic!"
//     },
//     {
//         restaurantName: "Steamed Momo Center",
//         stars: 2,
//         address: "444 Steamed Lane, Food City",
//         foodImage: pizza,
//         categoryofFood: "momos",
//         price: generateRandomPrice("momos"),
//         description: "Deliciously steamed momos with a choice of chicken or vegetarian fillings. Accompanied by spicy red chutney and a hot clear soup for that perfect bite."
//     },
//     {
//         restaurantName: "Paneer Express",
//         stars: 4.0,
//         address: "555 Paneer Road, Food City",
//         foodImage: pizza,
//         categoryofFood: "paneer",
//         price: generateRandomPrice("paneer"),
//         description: "Soft paneer cubes grilled in a tandoor, served with a side of mint chutney, butter naan, and fresh salad. A must-try for paneer lovers."
//     },
//     {
//         restaurantName: "Paneer Tikka Spot",
//         stars: 4.5,
//         address: "666 Tikka Avenue, Food City",
//         foodImage: pizza,
//         categoryofFood: "paneer",
//         price: generateRandomPrice("paneer"),
//         description: "Four pieces of marinated paneer tikka, grilled to perfection and served with mint chutney, salad, and buttered naan. A perfect vegetarian delight!"
//     },
//     {
//         restaurantName: "Dosa Spot",
//         stars: 4.3,
//         address: "777 Dosa Lane, Food City",
//         foodImage: pizza,
//         categoryofFood: "dosa",
//         price: generateRandomPrice("dosa"),
//         description: "Crispy masala dosa filled with spiced potato filling, served with coconut chutney and tangy sambar. A South Indian treat that's light yet filling."
//     },
//     {
//         restaurantName: "Masala Dosa Corner",
//         stars: 4.6,
//         address: "888 Masala Street, Food City",
//         foodImage: pizza,
//         categoryofFood: "dosa",
//         price: generateRandomPrice("dosa"),
//         description: "Golden brown masala dosa with spicy potato filling, paired with tangy sambar and fresh coconut chutney. Perfect for breakfast or lunch."
//     },
//     {
//         restaurantName: "Dal Makhani Hub",
//         stars: 4.1,
//         address: "999 Dal Makhani Street, Food City",
//         foodImage: pizza,
//         categoryofFood: "dal",
//         price: generateRandomPrice("dal"),
//         description: "Rich and creamy dal makhani made with slow-cooked black lentils, served with butter naan and a side of salad. A comforting meal packed with flavor."
//     },
//     {
//         restaurantName: "Chaat Junction",
//         stars: 3.8,
//         address: "123 Chaat Lane, Food City",
//         foodImage: pizza,
//         categoryofFood: "chaat",
//         price: generateRandomPrice("chaat"),
//         description: "Crispy puris filled with spicy chickpeas and topped with tangy chutneys, yogurt, and crunchy sev. An explosion of flavors in every bite!"
//     },
//     {
//         restaurantName: "Chaat & More",
//         stars: 4.0,
//         address: "456 Chaat Avenue, Food City",
//         foodImage: pizza,
//         categoryofFood: "chaat",
//         price: generateRandomPrice("chaat"),
//         description: "A mix of crispy papri, potatoes, and chickpeas topped with sweet and spicy chutneys, curd, and a sprinkle of sev. A must-try street snack!"
//     },
//     {
//         restaurantName: "Samosa Stop",
//         stars: 4.4,
//         address: "777 Samosa Street, Food City",
//         foodImage: pizza,
//         categoryofFood: "samosa",
//         price: generateRandomPrice("samosa"),
//         description: "Two crispy samosas filled with a spicy potato mix, served with tamarind chutney and mint chutney on the side. The perfect savory snack!"
//     },
//     {
//         restaurantName: "Samosa and Chai",
//         stars: 4.3,
//         address: "888 Samosa Lane, Food City",
//         foodImage: pizza,
//         categoryofFood: "samosa",
//         price: generateRandomPrice("samosa"),
//         description: "Three freshly fried samosas served with a cup of masala chai. Accompanied by tangy tamarind chutney for dipping."
//     },
//     {
//         restaurantName: "Pav Bhaji Paradise",
//         stars: 4.2,
//         address: "999 Pav Bhaji Road, Food City",
//         foodImage: pizza,
//         categoryofFood: "pav bhaji",
//         price: generateRandomPrice("pav bhaji"),
//         description: "A flavorful mix of mashed vegetables cooked with butter and served with soft pav buns. Comes with a side of onions, lemon, and extra butter."
//     },
//     {
//         restaurantName: "Pav Bhaji & Snacks",
//         stars: 4.1,
//         address: "101 Pav Bhaji Lane, Food City",
//         foodImage: pizza,
//         categoryofFood: "pav bhaji",
//         price: generateRandomPrice("pav bhaji"),
//         description: "Delicious pav bhaji served with toasted buttered buns, a generous portion of mashed veggies, and topped with a dollop of butter."
//     },
//     {
//         restaurantName: "Thali Point",
//         stars: 4.0,
//         address: "202 Thali Place, Food City",
//         foodImage: pizza,
//         categoryofFood: "thali",
//         price: generateRandomPrice("thali"),
//         description: "A traditional Indian thali with a variety of dishes including dal, curry, rice, roti, and a sweet. Perfect for a full, wholesome meal."
//     },
//     {
//         restaurantName: "Thali House",
//         stars: 3.9,
//         address: "303 Thali Lane, Food City",
//         foodImage: pizza,
//         categoryofFood: "thali",
//         price: generateRandomPrice("thali"),
//         description: "A North Indian thali offering dal, paneer curry, sabzi, rice, roti, and dessert. A complete meal for those who want variety on their plate."
//     },
//     {
//         restaurantName: "Kebab & Rolls",
//         stars: 4.5,
//         address: "404 Kebab Street, Food City",
//         foodImage: pizza,
//         categoryofFood: "kebab",
//         price: generateRandomPrice("kebab"),
//         description: "Juicy chicken kebabs served with onion rings, lemon wedges, and a side of mint chutney. Also includes a butter naan or tandoori roti."
//     },
//     {
//         restaurantName: "Kebab Delight",
//         stars: 4.3,
//         address: "505 Kebab Avenue, Food City",
//         foodImage: pizza,
//         categoryofFood: "kebab",
//         price: generateRandomPrice("kebab"),
//         description: "Four pieces of succulent mutton kebabs, perfectly spiced and grilled. Served with mint chutney, onions, and a side of butter naan."
//     },
// ]
// );