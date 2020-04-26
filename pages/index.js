import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Ingredients from "../components/Ingredients";
import {
  getRecipeService,
  getRecipeById,
  getRandomRecipe
} from "../utils/getRecipeService";
import {
  Button,
  Flex,
  Input,
  Spinner,
  Text,
  Box,
  Image
} from "@chakra-ui/core";

const Index = () => {
  const [keyword, setKeyword] = useState("");
  const [number, setNumber] = useState(2);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState({ summary: "", id: "" });
  const [loading, setLoading] = useState(false);
  const [random, setRandom] = useState({});

  useEffect(() => {
    setLoading(true);
    getRandomRecipe().then(data => {
      if (data) {
        setRandom(data);
        setLoading(false);
      }
    });
  }, []);

  console.log(random);

  const updateIngredient = ingredient => {
    setKeyword(ingredient);
  };

  const updateResults = event => {
    setLoading(true);
    getRecipeService(keyword, number).then(data => {
      if (data) {
        setResults(data);
      }
      setLoading(false);
    });
    event.preventDefault();
  };

  const getRecipeDetail = id => {
    setLoading(true);
    getRecipeById(id).then(data => {
      if (data) {
        setSummary({ summary: data.summary, id: data.id });
      }
      setLoading(false);
    });
  };

  const RecipeLists = () => {
    return (
      <Box w="100%" p={4}>
        {results.map((e, index) => (
          <Box w="100%" p={4}>
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
              <Text fontSize="md" fontWeight="bold" mt={4} mb={4}>
                {e.title}
              </Text>
              <img src={e.image} />
            </a>
            <div
              dangerouslySetInnerHTML={{
                __html: summary.id === e.id ? summary.summary : ""
              }}
            />
          </Box>
        ))}
      </Box>
    );
  };

  const RenderRandomRecipe = () => {
    return (
      <Box>
        {random.recipes &&
          random.recipes.map(recipes => (
            <Flex align="baseline" mt={2}>
              <Image rounded="sm" src={recipes.image} />
              <Text ml={2} fontSize="sm" fontWeight="bold">
                {recipes.title}
              </Text>
            </Flex>
          ))}
      </Box>
    );
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={updateResults}>
        <div>
          <Input
            type="text"
            borderColor="red"
            onChange={event => setKeyword(event.target.value)}
            value={keyword}
          />
        </div>
        <Ingredients updateIngredient={updateIngredient} />
        <Flex mt={2} mb={1}>
          <Button variantColor="green" size="md" onClick={updateResults}>
            Go
          </Button>
        </Flex>
      </form>
      {loading && <Spinner />}
      <RenderRandomRecipe />
      <RecipeLists />
      {results.length > 0 && (
        <Button
          variantColor="green"
          onClick={() => {
            setNumber(5);
          }}
        >
          More
        </Button>
      )}
    </div>
  );
};

export default Layout(Index);
