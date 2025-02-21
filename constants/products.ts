import wendy_burger from "../assets/products/wendy's_burger.png";
import veggie_burger from "../assets/products/veggie_burger.png";
import chicken_burger from "../assets/products/chicken_burger.png";
import fried_chicken_burger from "../assets/products/fried_chicken_burger.png";
import { ImageSourcePropType } from "react-native";

export interface IProduct {
    id: number;
    name: string;
    type: string;
    description: string;
    rating: number;
    price: number;
    image: ImageSourcePropType;
}
export const products:IProduct[] = [
  {
    id: 1,
    name: "Cheeseburger",
    type: " Wendy's Burger",
    description:
      "The Cheeseburger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, ripe tomato, and crunchy pickles.",
    rating: 4.9,
    price: 8.24,
    image: wendy_burger,
  },
  {
    id: 2,
    name: "Hamburger",
    type: "Veggie Burger",
    description:
      "Enjoy our delicious Hamburger Veggie Burger, made with a savory blend of fresh vegetables and herbs, topped with crisp lettuce, juicy tomatoes, and tangy pickles, all served on a soft, toasted bun. ",
    rating: 4.8,
    price: 9.99,
    image: veggie_burger,
  },
  {
    id: 3,
    name: "Hamburger",
    type: "Chicken Burger",
    description:
      "Our chicken burger is a delicious and healthier alternative to traditional beef burgers, perfect for those looking for a lighter meal option. Try it today and experience the mouth-watering flavors of our Hamburger Chicken Burger!",
    rating: 4.6,
    price: 8.34,
    image: chicken_burger,
  },
  {
    id: 4,
    name: "Hamburger",
    type: "Fried Chicken Burger",
    description:
      "Indulge in our crispy and savory Fried Chicken Burger, made with a juicy chicken patty, hand-breaded and deep-fried to perfection, served on a warm bun with lettuce, tomato, and a creamy sauce.",
    rating: 4.2,
    price: 8.24,
    image: fried_chicken_burger,
  },
];
