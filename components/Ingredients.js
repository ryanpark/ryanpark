import { Badge, Stack, Flex } from "@chakra-ui/core";
const meats = ["Chicken", "Salmon", "Pork"];
const vegies = ["tomato", "onion", "carrots"];
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

  const vegiesList = vegies.map((vegie, index) => {
    return (
      <Badge
        variant="outline"
        variantColor="green"
        key={index}
        cursor="pointer"
        mr={2}
        onClick={() => props.updateIngredient(vegie)}
      >
        {vegie}
      </Badge>
    );
  });

  return (
    <Stack isInline>
      <Flex align="baseline" mt={4} mb={4}>
        {meatList}
        {vegiesList}
      </Flex>
    </Stack>
  );
};

export default Ingredients;
