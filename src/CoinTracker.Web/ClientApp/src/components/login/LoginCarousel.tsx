import { Carousel } from "@mantine/carousel";
import { Center, Text, Image, Space } from "@mantine/core";
import Slider1 from "../../assets/images/image1.png";
import Slider2 from "../../assets/images/image2.png";
import Slider3 from "../../assets/images/image3.png";
import Slider4 from "../../assets/images/image4.png";
import "./style.css";

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  return (
    <>
      <Image src={image} />
      <Center>
        <div>
          <Text size="lg">{title}</Text>
          <Space h="xs" />
          <Text size="sm" c="dimmed">
            {category}
          </Text>
        </div>
      </Center>
    </>
  );
}

const data = [
  {
    image: Slider1,
    title: "Track Your Spending",
    category: "Small changes add up! Know where your money goes.",
  },
  {
    image: Slider2,
    title: "Budget, Budget, Budget",
    category: "Create a plan for your income and stick with it.",
  },
  {
    image: Slider3,
    title: "Save Consistently",
    category: "Even a little at a time builds a safety net.",
  },
  {
    image: Slider4,
    title: "Tackle Debt Head-On",
    category: "Develop a plan to reduce what you owe and free up your future income",
  },
];

export function LoginCarousel() {
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      style={{ maxWidth: 600}}
      mx="auto"
      loop
      height={630}
      withIndicators
    >
      {slides}
    </Carousel>
  );
}
