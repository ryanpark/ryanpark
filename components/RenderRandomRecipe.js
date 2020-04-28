import { Flex, Text, Image } from "@chakra-ui/core";

const RenderRandomRecipe = random => {
  return (
    <>
      {random.recipes &&
        random.recipes.map(recipes => (
          <Flex
            align="baseline"
            mt={2}
            flexDirection="column"
            border="1px"
            borderRadius="md"
            borderColor="gray.200"
          >
            <Image rounded="sm" src={recipes.image} />
            <Text m={2} fontSize="md" fontWeight="bold">
              {recipes.title}
            </Text>
            <Text m={2} fontSize="sm">
              {recipes.summary}
            </Text>
          </Flex>
        ))}
    </>
  );
};

export default RenderRandomRecipe;
