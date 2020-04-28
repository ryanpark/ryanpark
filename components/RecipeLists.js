import { Flex, Text, Image, Spinner } from "@chakra-ui/core";
import { useState } from "react";
import { getRecipeById } from "../utils/getRecipeService";
const RecipeLists = results => {
  const [summary, setSummary] = useState({ summary: "", id: "" });
  const [loading, setLoading] = useState(false);
  const getRecipeDetail = id => {
    setLoading(true);
    getRecipeById(id).then(data => {
      if (data) {
        setSummary({ summary: data.summary, id: data.id });
      }
      setLoading(false);
    });
  };

  return (
    <>
      {loading && <Spinner pos="absolute" top="150px" left="50%" />}
      {results.map((e, index) => (
        <Flex
          align="baseline"
          mt={2}
          flexDirection="column"
          border="1px"
          borderRadius="md"
          borderColor="gray.200"
        >
          <a
            id={e.id}
            title={e.title}
            href="#"
            key={index}
            onClick={event => {
              getRecipeDetail(e.id);
              event.preventDefault();
            }}
          >
            <Image rounded="sm" src={e.image} />
            <Text fontSize="md" fontWeight="bold" mt={4} mb={4}>
              {e.title}
            </Text>
          </a>
          <div
            dangerouslySetInnerHTML={{
              __html: summary.id === e.id ? summary.summary : ""
            }}
          />
        </Flex>
      ))}
    </>
  );
};

export default RecipeLists;
