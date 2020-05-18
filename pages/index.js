import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Ingredients from "../components/Ingredients";
import RenderRandomRecipe from "../components/RenderRandomRecipe";
import RecipeLists from "../components/RecipeLists";
import AsyncSelect from "react-select/async";

import { getRecipeService, getRandomRecipe } from "../utils/getRecipeService";
import { Button, Flex, Input, Spinner, Grid } from "@chakra-ui/core";
import { flavourOptions } from "../data/data";

const Index = () => {
  const [keyword, setKeyword] = useState([]);
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
    setKeyword(prevIngredient => [...prevIngredient, ingredient]);
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

  const filterIngrdients = inputValue => {
    return flavourOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleInputChange = (select, action) => {
    const isRemoved = action.action === "remove-value";
    if (isRemoved) {
      setKeyword(keyword.filter(item => item !== action.removedValue.value));
    } else {
      setKeyword(prevIngredient => [...prevIngredient, action.option.value]);
    }
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterIngrdients(inputValue));
    }, 1000);
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
          <AsyncSelect
            isMulti
            defaultOptions
            loadOptions={loadOptions}
            onChange={handleInputChange}
          />
        </div>
        <Ingredients updateIngredient={updateIngredient} />
        <Flex mt={2} mb={1}>
          <Button variantColor="green" size="md" onClick={updateResults}>
            Find
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
