import {
  Image,
  Container,
  Title,
  Text,
  SimpleGrid,
} from "@mantine/core";
import image from "./image.svg";
import classes from "./NotFoundImage.module.css";

export function NotFound() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the server is not currently available. If you think
            this is an error please contact support.
          </Text>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
