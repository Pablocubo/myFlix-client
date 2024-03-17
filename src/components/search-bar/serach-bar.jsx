import React from "react";
import { Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export const SearchBar = ({ query, handleSearch }) => {
  return (
    <Row>
      <Form.Control
        type="text"
        value={query}
        onChange={(e) => handleSearch(e)}
        placeholder="Search"
        className="mr-sm-2"
      />
    </Row>
  );
};
SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
};