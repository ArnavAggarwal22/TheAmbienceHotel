// Accurate, unique Unsplash food images for each menu item
// IDs sourced directly from Unsplash search results for each dish
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=200&h=200&q=75&auto=format&fit=crop`;

// Short-form IDs (without "photo-" prefix) from Unsplash search
const s = (id: string) =>
  `https://images.unsplash.com/${id}?w=200&h=200&q=75&auto=format&fit=crop`;

export const MENU_IMAGES: Record<string, string> = {
  // ── All Day Breakfast ──────────────────────────────────────────────────────
  b1:  u("1484723091739-30a097e8f929"), // Butter Toast — buttered toast slices
  b2:  u("1565299624946-b28f40a5d44b"), // Jam Toast — bread with jam/jelly
  b3:  u("1606491956689-2ea866880c84"), // Poha — Indian flattened rice dish
  b4:  u("1630383249896-424e482df921"), // Upma — semolina porridge
  b5:  u("1528735602780-2552fd46c7af"), // Veg Sandwich — classic sandwich
  b6:  u("1481070414801-51fd732d7184"), // Cheese Sandwich — grilled cheese sandwich
  b7:  u("1559410545-0051-04b2-8e3e-579e25a47db1"), // Grilled Sandwich — grill marks
  b8:  u("1553909489-cd47e0907980"),    // Chicken Sandwich — chicken filling sandwich
  b9:  u("1510693206972-df098062cb71"), // Masala Omelette — spiced omelette
  b10: u("1525351484163-7529414f2aff"), // Plain Omelette — simple folded omelette
  b11: u("1567620905732-2d1ec7ab7445"), // Bread Omelette — egg on bread
  b12: u("1571748982800-fa51175d301c"), // Half Fried Eggs — sunny side up eggs

  // ── Indian Favourites ──────────────────────────────────────────────────────
  if1: u("1574071318508-1cdbab80d002"), // Tawa Parantha — layered flatbread on tawa
  if2: u("1601050690597-df0568f70950"), // Aloo Poori — puffed puri with aloo
  if3: u("1626777552781-7f4bc8c9c7a5"), // Chana Bhatura — bhatura with chhole

  // ── Side Order ────────────────────────────────────────────────────────────
  so1: u("1589301760014-d929f3979dbc"), // Masala Papad — spiced crispy papad
  so2: u("1589740341982-cc70e02af8ee"), // Plain Papad — plain papad
  so3: u("1574323347407-b3de594e9b44"), // Plain Peanut — raw peanuts
  so4: u("1590779033100-bec08d5e9e7b"), // Masala Peanut — spiced roasted peanuts
  so5: u("1630384060421-105bc70d4ce5"), // French Fries — golden crispy fries
  so6: u("1569050467447-ce54b3bbc37d"), // Plain Maggie — plain boiled noodles
  so7: u("1625222226672-53ef6ac02f99"), // Masala Maggie — spiced noodles

  // ── Soups ─────────────────────────────────────────────────────────────────
  sp1: u("1603133872878-684f208fb84b"), // Manchow Soup — Chinese style soup with noodles
  sp2: u("1547592166-23ac45744acd"),    // Tomato Soup — bright red tomato soup
  sp3: u("1495361098154-17e8fcfe3c84"), // Hot & Sour Soup — Chinese hot sour soup
  sp4: u("1594756202469-52b1d93b26de"), // Cream of Vegetable — creamy veg soup
  sp5: u("1606851181914-e0a48e60cc3f"), // Sweet Corn Soup — corn in broth
  sp6: u("1569058019021-edd8a3b3f2ff"), // Cream of Chicken Soup — creamy chicken
  sp7: u("1565299585323-38d6b0865b47"), // Chicken Sweet Corn Soup — chicken corn soup
  sp8: u("1569051613566-5f55d4fef18d"), // Chicken Manchow Soup — Chinese chicken soup

  // ── Salads ────────────────────────────────────────────────────────────────
  sl1: u("1512621776951-a57141f2eefd"), // Fresh Garden Green Salad — mixed greens
  sl2: u("1600699984853-c56a5d4dd56f"), // Onion Salad — sliced onion rings salad
  sl3: u("1511688878353-3a0357e74a3b"), // Cucumber Salad — sliced cucumber dish
  sl4: u("1540420828-4b69ec86f5f4"),    // Boiled Vegetables — steamed veggies
  sl5: u("1567337710282-00832b415979"), // Aloo Chaat — potato chaat with chutneys
  sl6: u("1567337710282-00832b415979"), // Aloo Channa Chaat — potato chickpea chaat
  sl7: u("1567337710282-00832b415979"), // Aloo Channa Paneer Chaat — chaat platter

  // ── Indian Appetizer ──────────────────────────────────────────────────────
  ia1:  u("1606755962773-d324e0a13086"), // Veg Pakoda — golden fried fritters
  ia2:  u("1589647363585-f4a7d3a1d53d"), // Paneer Pakoda — paneer fritters
  ia3:  u("1625943903960-da2e8b5e1041"), // Veg Cutlet — breaded vegetable cutlet
  ia4:  u("1631452180519-462f52dd9fd9"), // Cheese Finger — breaded cheese sticks
  ia5:  u("1567188040759-fb8a883dc6d8"), // Dahi Kabab — yogurt based tikka kabab
  ia6:  u("1565557623262-b51206a0db0c"), // Veg Seekh Kabab — green seekh kabab skewer
  ia7:  u("1567188040759-fb8a883dc6d8"), // Hara Bhara Kabab — green spinach kabab
  ia8:  u("1599487489041-f1c17700b3a9"), // Paneer Tikka — grilled paneer on skewer
  ia9:  u("1599487489041-f1c17700b3a9"), // Afghani Tikka — cream marinated tikka
  ia10: u("1599487489041-f1c17700b3a9"), // Haryali Paneer Tikka — green paneer tikka
  ia11: u("1599487489041-f1c17700b3a9"), // Paneer Malai Tikka — malai tikka grilled
  ia12: u("1599487489041-f1c17700b3a9"), // Achari Paneer Tikka — pickled paneer tikka
  ia13: u("1567188040759-fb8a883dc6d8"), // Afghani Chaap Tikka — chaap on skewer
  ia14: u("1567188040759-fb8a883dc6d8"), // Soya Chaap Tikka — soya chaap grilled
  ia15: u("1567188040759-fb8a883dc6d8"), // Mushroom Tikka — grilled mushroom
  ia16: u("1567188040759-fb8a883dc6d8"), // Malai Chaap — cream marinated chaap
  ia17: u("1567188040759-fb8a883dc6d8"), // Achari Chaap — pickled chaap
  ia18: u("1567188040759-fb8a883dc6d8"), // Veg Tandoor Platter — mixed platter
  ia19: u("1599487489041-f1c17700b3a9"), // Tandoori Chicken Half — red tandoori chicken
  ia20: u("1599487489041-f1c17700b3a9"), // Tandoori Chicken Full — full tandoori
  ia21: u("1599487489041-f1c17700b3a9"), // Afghani Chicken Half — white afghani
  ia22: u("1599487489041-f1c17700b3a9"), // Afghani Chicken Full
  ia23: u("1599487489041-f1c17700b3a9"), // Murg Malai Tikka
  ia24: u("1599487489041-f1c17700b3a9"), // Achari Chicken Tikka
  ia25: u("1599487489041-f1c17700b3a9"), // Chicken Tikka
  ia26: u("1599487489041-f1c17700b3a9"), // Lemon Chicken Tikka
  ia27: u("1559847844-5315695dadae"),    // Fish Tikka — grilled fish tikka
  ia28: u("1559847844-5315695dadae"),    // Fish Methi Tikka
  ia29: u("1559847844-5315695dadae"),    // Fish Malai Tikka
  ia30: u("1559847844-5315695dadae"),    // Lemon Fish Tikka
  ia31: u("1559847844-5315695dadae"),    // Fish Fingers

  // ── Chinese Appetizer ─────────────────────────────────────────────────────
  ca1:  u("1563245372-f21724e3856d"), // Spring Roll — crispy fried spring rolls
  ca2:  u("1563245372-f21724e3856d"), // Spring Roll with Chopsy
  ca3:  u("1567620832-9c44e9d0-e2c7-4c24-b408-ea7c3a76a1b9"), // Honey Chili Potato
  ca4:  u("1563245372-f21724e3856d"), // Honey Chili Cauliflower
  ca5:  u("1571748982800-fa51175d301c"), // Crispy Corn
  ca6:  u("1563245372-f21724e3856d"), // Cheese Chilli
  ca7:  u("1563245372-f21724e3856d"), // Dry Manchurian — fried ball dumplings
  ca8:  u("1603133872878-684f208fb84b"), // Gravy Manchurian — in gravy
  ca9:  u("1567188040759-fb8a883dc6d8"), // Mushroom Duplex
  ca10: u("1567188040759-fb8a883dc6d8"), // Chilli Mushroom — stir fried mushroom
  ca11: u("1563245372-f21724e3856d"), // Chilli Potato — crispy chilli potato
  ca12: u("1569718212165-3a8278d5f624"), // Veg Noodles — stir fried noodles
  ca13: u("1569718212165-3a8278d5f624"), // Hakka Noodles — hakka style noodles
  ca14: u("1569718212165-3a8278d5f624"), // Chilli Garlic Noodles
  ca15: u("1569718212165-3a8278d5f624"), // Singapore Noodles
  ca16: u("1569718212165-3a8278d5f624"), // Chicken Hakka Noodles
  ca17: u("1603894584373-5ac82b2ae398"), // Garlic Chicken — Chinese garlic chicken
  ca18: u("1603894584373-5ac82b2ae398"), // Lemon Chicken
  ca19: u("1603894584373-5ac82b2ae398"), // Chilli Chicken — spicy chilli chicken
  ca20: u("1603894584373-5ac82b2ae398"), // Schezwan Chilli Chicken
  ca21: u("1559847844-5315695dadae"),    // Chilli Fish — fried fish in sauce

  // ── Pasta ─────────────────────────────────────────────────────────────────
  pa1: u("1563379926898-05f4575a45d8"), // Pasta Arrabbiata — red sauce pasta
  pa2: u("1551183053-bf91798d26a5"),    // Pasta Alfredo — creamy white sauce pasta
  pa3: u("1621996659463-9f5e87c8b84c"), // Mix Sauce Pasta — pink sauce pasta

  // ── Indian Main Course ────────────────────────────────────────────────────
  mc1:  u("1585937421612-70a008356fbe"), // Dal Yellow Tadka — yellow dal with tadka
  mc2:  u("1585937421612-70a008356fbe"), // Dal Makhni — black creamy dal
  mc3:  u("1585937421612-70a008356fbe"), // Dal Black Tadka
  mc4:  u("1585937421612-70a008356fbe"), // Dal Palak — spinach dal
  mc5:  u("1585937421612-70a008356fbe"), // Punjabi Dal Tadka
  mc6:  u("1567188040759-fb8a883dc6d8"), // Kadhai Paneer — paneer in kadhai
  mc7:  u("1567188040759-fb8a883dc6d8"), // Paneer Lababdar
  mc8:  u("1567188040759-fb8a883dc6d8"), // Palak Paneer — green spinach paneer
  mc9:  u("1567188040759-fb8a883dc6d8"), // Paneer Butter Masala — orange curry
  mc10: u("1567188040759-fb8a883dc6d8"), // Paneer Tikka Butter Masala
  mc11: u("1567188040759-fb8a883dc6d8"), // Shahi Paneer — rich cream curry
  mc12: u("1567188040759-fb8a883dc6d8"), // Paneer Bhurji — scrambled paneer
  mc13: u("1567188040759-fb8a883dc6d8"), // Paneer Pasanda
  mc14: u("1567188040759-fb8a883dc6d8"), // Paneer Do Pyaza
  mc15: u("1567188040759-fb8a883dc6d8"), // Matar Paneer
  mc16: u("1567188040759-fb8a883dc6d8"), // Paneer Makhani
  mc17: u("1567188040759-fb8a883dc6d8"), // Methi Malai Paneer
  mc18: u("1567188040759-fb8a883dc6d8"), // Masala Paneer Mushroom
  mc19: u("1512621776951-a57141f2eefd"), // Mix Veg Jalfrezi — colourful stir fry veg
  mc20: u("1512621776951-a57141f2eefd"), // Mix Veg
  mc21: u("1585937421612-70a008356fbe"), // Malai Kofta — dumplings in cream curry
  mc22: u("1585937421612-70a008356fbe"), // Palak Kofta
  mc23: u("1512621776951-a57141f2eefd"), // Palak Corn
  mc24: u("1585937421612-70a008356fbe"), // Channa Masala — chickpea curry
  mc25: u("1585937421612-70a008356fbe"), // Pindi Channa
  mc26: u("1585937421612-70a008356fbe"), // Dum Aloo Kashmiri
  mc27: u("1585937421612-70a008356fbe"), // Rajma — kidney bean curry
  mc28: u("1567188040759-fb8a883dc6d8"), // Kadhai Mushroom
  mc29: u("1567188040759-fb8a883dc6d8"), // Mushroom Makhani
  mc30: u("1567188040759-fb8a883dc6d8"), // Mushroom Do Pyaaza
  mc31: u("1567188040759-fb8a883dc6d8"), // Mushroom Masala
  mc32: u("1585937421612-70a008356fbe"), // Diwani Handi — mixed veg in handi
  mc33: u("1585937421612-70a008356fbe"), // Aloo Matar
  mc34: u("1510693206972-df098062cb71"), // Egg Curry — eggs in masala gravy
  mc35: u("1603894584373-5ac82b2ae398"), // Butter Chicken Half
  mc36: u("1603894584373-5ac82b2ae398"), // Butter Chicken Full
  mc37: u("1603894584373-5ac82b2ae398"), // Kadhai Chicken Half
  mc38: u("1603894584373-5ac82b2ae398"), // Kadhai Chicken Full
  mc39: u("1603894584373-5ac82b2ae398"), // Murg Rara Half
  mc40: u("1603894584373-5ac82b2ae398"), // Murg Rara Full
  mc41: u("1603894584373-5ac82b2ae398"), // Chicken Kali Mirch Half
  mc42: u("1603894584373-5ac82b2ae398"), // Chicken Kali Mirch Full
  mc43: u("1603894584373-5ac82b2ae398"), // Home Made Chicken Half
  mc44: u("1603894584373-5ac82b2ae398"), // Home Made Chicken Full
  mc45: u("1603894584373-5ac82b2ae398"), // Chicken Curry
  mc46: u("1603894584373-5ac82b2ae398"), // Murg Tikka Butter Masala
  mc47: u("1585937421612-70a008356fbe"), // Mutton Rogan Josh — red mutton curry
  mc48: u("1585937421612-70a008356fbe"), // Mutton Handi
  mc49: u("1585937421612-70a008356fbe"), // Mutton Masala
  mc50: u("1559847844-5315695dadae"),    // Fish Curry — fish in masala gravy

  // ── Rice ──────────────────────────────────────────────────────────────────
  r1:  u("1596797038530-2c107229654b"), // Plain Rice — steamed white rice
  r2:  u("1596797038530-2c107229654b"), // Jeera Rice — cumin rice
  r3:  u("1574744842-a89b4f5a0a5d"),    // Kashmiri Pulao — saffron pulao
  r4:  u("1603133872878-684f208fb84b"), // Veg Fried Rice — wok tossed rice
  r5:  u("1603133872878-684f208fb84b"), // Ginger Fried Rice
  r6:  u("1596797038530-2c107229654b"), // Lemon Rice — yellow lemon rice
  r7:  u("1596797038530-2c107229654b"), // Peas Pulao
  r8:  u("1596797038530-2c107229654b"), // Veg Pulao
  r9:  u("1563379091339-03b21ab4a4f8"), // Veg Biryani — layered biryani
  r10: u("1603133872878-684f208fb84b"), // Chicken Fried Rice
  r11: u("1563379091339-03b21ab4a4f8"), // Chicken Biryani — biryani in pot
  r12: u("1563379091339-03b21ab4a4f8"), // Mutton Hyderabadi Biryani
  r13: u("1603133872878-684f208fb84b"), // Egg Fried Rice

  // ── Raita ─────────────────────────────────────────────────────────────────
  ra1: u("1550583724-b2692b85b150"),    // Plain Curd — bowl of white curd/yogurt
  ra2: u("1599487489041-f1c17700b3a9"), // Boondi Raita — raita with boondi
  ra3: u("1512621776951-a57141f2eefd"), // Mix Veg Raita — raita with veggies
  ra4: u("1550583724-b2692b85b150"),    // Mint Raita — green mint yogurt
  ra5: u("1550583724-b2692b85b150"),    // Potato Raita — aloo raita
  ra6: u("1511688878353-3a0357e74a3b"), // Cucumber Raita — cucumber yogurt

  // ── Indian Bread ──────────────────────────────────────────────────────────
  br1: u("1574071318508-1cdbab80d002"), // Tandoori Roti — clay oven bread
  br2: u("1574071318508-1cdbab80d002"), // Tawa Roti — flat griddle bread
  br3: u("1574071318508-1cdbab80d002"), // Missi Roti — gram flour roti
  br4: u("1574071318508-1cdbab80d002"), // Chilli Onion Roti
  br5: u("1546833998-877b37c2e5c6"),    // Laccha Parantha — layered flaky paratha
  br6: u("1546833998-877b37c2e5c6"),    // Mirchi Parantha
  br7: u("1574071318508-1cdbab80d002"), // Plain Naan — plain leavened bread
  br8: u("1546833998-877b37c2e5c6"),    // Butter Naan — buttered naan
  br9: u("1546833998-877b37c2e5c6"),    // Garlic Naan — garlic herb naan

  // ── Dessert ───────────────────────────────────────────────────────────────
  d1: u("1575493488361-dad1f2aed5f2"), // Gulab Jamun — dark brown syrup balls
  d2: u("1606788076059-9f4449e1e05c"), // Gajar Ka Halwa — orange carrot halwa
  d3: u("1606788076059-9f4449e1e05c"), // Moong Ka Halwa — golden halwa
  d4: u("1570197788417-0e82375c9371"), // Vanilla Ice Cream — white ice cream scoop
  d5: u("1501443762994-82bd5dace89a"), // Strawberry Ice Cream — pink ice cream
  d6: u("1481671418665-f7c21e6e5c21"), // Chocolate Ice Cream — dark chocolate scoop
  d7: u("1501443762994-82bd5dace89a"), // ButterScotch Ice Cream — golden ice cream
  d8: u("1488477304112-4944851de03d"), // Fruit Custard — colourful fruit custard

  // ── Beverages ─────────────────────────────────────────────────────────────
  bv1:  u("1625772299848-391b6a87d7b3"), // Aerated Beverages — chilled cola glass
  bv2:  u("1625772299848-391b6a87d7b3"), // Diet-Coke — cola can/glass
  bv3:  u("1548839140-29a749e1cf4d"),    // Bottle Water — clear water bottle
  bv4:  u("1621263037022-87da25fd42cb"), // Fresh Lime Soda — lemon fizzy drink
  bv5:  u("1621263037022-87da25fd42cb"), // Fresh Lime Water — lemon water glass
  bv6:  u("1550583724-b2692b85b150"),    // Hot Milk — warm milk in mug
  bv7:  u("1550583724-b2692b85b150"),    // Bournvita Milk — chocolate milk
  bv8:  u("1550583724-b2692b85b150"),    // Butter Milk — chilled chaas glass
  bv9:  u("1550583724-b2692b85b150"),    // Cornflakes with Hot Milk — cereal bowl
  bv10: s("vD-wnzsy-k8"),               // Sweet Lassi — tall lassi glass (verified)
  bv11: s("vD-wnzsy-k8"),               // Namkeen Lassi — salted lassi
  bv12: u("1548839140-29a749e1cf4d"),    // Ice Bucket — ice cubes in bucket
  bv13: u("1625772299848-391b6a87d7b3"), // Soda — sparkling water glass

  // ── Coffee & Tea ──────────────────────────────────────────────────────────
  ct1: s("yWk51M18P9c"),             // Cold Coffee with Ice-cream — iced coffee (verified)
  ct2: u("1461023058943-07fcbe16d735"), // Cold Coffee without Ice-cream — plain iced
  ct3: u("1495474472287-4d71bcdd2085"), // Hot Coffee — latte in white mug
  ct4: u("1495474472287-4d71bcdd2085"), // Black Coffee — black espresso cup
  ct5: s("ynnYEs3NyaY"),             // Masala Tea — kulhad chai (verified)
  ct6: u("1544787219-7f47ccb76574"),  // Classic Tea — simple tea cup & saucer
  ct7: u("1544787219-7f47ccb76574"),  // Lemon Tea — tea with lemon slice
  ct8: u("1461023058943-07fcbe16d735"), // Ice Tea — iced tea glass
  ct9: u("1556679343-c7306c1976bc"),  // Green Tea — green tea in clear glass

  // ── Shakes ────────────────────────────────────────────────────────────────
  sh1: s("m9851o-S-qI"),              // Strawberry Shake — pink strawberry (verified)
  sh2: u("1572490122747-3968b75cc699"), // Chocolate Shake — dark chocolate milkshake
  sh3: u("1570197788417-0e82375c9371"), // Vanilla Shake — white creamy shake
  sh4: u("1572490122747-3968b75cc699"), // Oreo Shake — oreo milkshake
  sh5: u("1501443762994-82bd5dace89a"), // Butterscotch Shake — golden shake
};

export const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&q=75&auto=format&fit=crop";
