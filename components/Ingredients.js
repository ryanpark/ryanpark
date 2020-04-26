import { Badge, Stack, Flex } from "@chakra-ui/core";
const meats = ["Chicken", "Salmon", "Pork"];
const Ingredients = props => {
  const meatList = meats.map((meat, index) => {
    return (
      <Badge
        variant="outline"
        variantColor="green"
        key={index}
        cursor="pointer"
        mr={2}
        onClick={() => props.updateIngredient(meat)}
      >
        {meat}
      </Badge>
    );
  });

  return (
    <Stack isInline>
      <Flex align="baseline" mt={4} mb={4}>
        {meatList}
      </Flex>
    </Stack>
  );
};

export default Ingredients;
