import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Ingredients from "../components/Ingredients";
import RenderRandomRecipe from "../components/RenderRandomRecipe";
import RecipeLists from "../components/RecipeLists";

import { getRecipeService, getRandomRecipe } from "../utils/getRecipeService";
import { Button, Flex, Input, Spinner, Grid } from "@chakra-ui/core";

const Index = () => {
  const [keyword, setKeyword] = useState("");
  const [number, setNumber] = useState(6);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [random, setRandom] = useState({});
  const [updateRecipe, setUpdateRecipe] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRandomRecipe().then(data => {
      if (data) {
        setRandom(data);
        setLoading(false);
      }
    });
  }, []);

  const updateIngredient = ingredient => {
    setKeyword(ingredient);
  };

  const updateResults = event => {
    setLoading(true);

    getRecipeService(keyword, number).then(data => {
      if (data) {
        setResults(data);
      }
      setUpdateRecipe(true);
      setLoading(false);
    });
    event.preventDefault();
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
            placeholder="Add your ingredients"
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
      {!updateRecipe && (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {RenderRandomRecipe(random)}
        </Grid>
      )}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {RecipeLists(results)}
      </Grid>
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
