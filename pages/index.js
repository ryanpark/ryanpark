import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getRecipeService, getRecipeById } from "../utils/getRecipeService";
import { ThemeProvider, theme, Button, Flex } from "@chakra-ui/core";

const Index = () => {
  const [keyword, setKeyword] = useState("");
  const [number, setNumber] = useState(2);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState({ summary: "", id: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    console.log("here is my bitch");
  }, [number]);

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

  const ReceipeLists = () => {
    const lists = [];
    results.map(function(e) {
      lists.push(
        <div>
          <a
            id={e.id}
            title={e.title}
            href="#"
            onClick={event => {
              getRecipeDetail(e.id);
              event.preventDefault();
            }}
          >
            <p>{e.title}</p>
            <img src={e.image} />
          </a>
          <div
            dangerouslySetInnerHTML={{
              __html: summary.id === e.id ? summary.summary : ""
            }}
          />
        </div>
      );
    });
    return <>{lists}</>;
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {loading && <div>Loading.... </div>}
        <p>Hello Receipe</p>
        <form
          className="test"
          noValidate
          autoComplete="off"
          onSubmit={updateResults}
        >
          <div>
            <input
              type="text"
              onChange={event => setKeyword(event.target.value)}
            />
          </div>
          <Flex mt={2} mb={1}>
            <Button variantColor="green" size="md">
              Go
            </Button>
          </Flex>
        </form>
        <div>
          <ReceipeLists />
        </div>
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
    </ThemeProvider>
  );
};

export default Layout(Index);
